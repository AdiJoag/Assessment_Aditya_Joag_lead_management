const pool = require("../config/db");
const assignmentService = require("../services/assignmentService");
const axios = require("axios");

/*
CREATE LEAD
*/
exports.createLead = async (req, res) => {
    try {

        const {
            name,
            email,
            phone,
            source,
            status,
            notes,
            assigned_to
        } = req.body;

        let enrichment = null;

        try {
            const response = await axios.get(
                "https://randomuser.me/api/",
                {
                    timeout: 5000
                }
            );

            const randomUser =
                response.data.results[0];

            enrichment = {
                contactName:
                    randomUser.name.first +
                    " " +
                    randomUser.name.last,

                contactEmail:
                    randomUser.email,

                country:
                    randomUser.location.country
            };
        } catch (error) {
            console.error(
                "Lead enrichment failed:",
                error.message
            );
        }

        let assignedAgent = assigned_to;

        if (assignedAgent) {
            const agentResult = await pool.query(
                `SELECT id
                 FROM users
                 WHERE id=$1 AND role='AGENT'`,
                [assignedAgent]
            );

            if (agentResult.rows.length === 0) {
                return res.status(400).json({
                    message: "Selected agent is invalid"
                });
            }
        } else {
            assignedAgent =
                await assignmentService.getLeastLoadedAgent();
        }

        const leadResult = await pool.query(
            `INSERT INTO leads
            (
                name,
                email,
                phone,
                source,
                status,
                notes,
                assigned_to,
                created_by
            )
            VALUES
            (
                $1,$2,$3,$4,$5,$6,$7,$8
            )
            RETURNING *`,
            [
                name,
                email,
                phone,
                source,
                status,
                notes,
                assignedAgent,
                req.user.id
            ]
        );

        const lead = leadResult.rows[0];

        await pool.query(
            `INSERT INTO activity_logs
            (
                lead_id,
                action,
                performed_by
            )
            VALUES
            (
                $1,$2,$3
            )`,
            [
                lead.id,
                "Lead Created",
                req.user.id
            ]
        );

        res.status(201).json({
            message: "Lead Created",
            lead,
            enrichment
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

/*
GET ALL LEADS
*/
exports.getLeads = async (req, res) => {

    try {

        const page =
            parseInt(req.query.page) || 1;

        const limit =
            parseInt(req.query.limit) || 10;

        const offset =
            (page - 1) * limit;

        const search =
            req.query.search || "";

        const status =
            req.query.status || "";

        const source =
            req.query.source || "";

        const allowedSortFields = [
            "created_at",
            "name",
            "status",
            "source"
        ];

        const sort =
            allowedSortFields.includes(req.query.sort)
                ? req.query.sort
                : "created_at";

        const order =
            req.query.order === "asc"
                ? "ASC"
                : "DESC";

        let query = `
            SELECT l.*,
                   u.name AS agent_name
            FROM leads l
            LEFT JOIN users u
            ON l.assigned_to=u.id
            WHERE 1=1
        `;

        let values = [];
        let count = 1;

        if (search) {
            query += `
                AND (
                    l.name ILIKE $${count}
                    OR l.email ILIKE $${count}
                )
            `;
            values.push(`%${search}%`);
            count++;
        }

        if (status) {
            query += `
                AND l.status=$${count}
            `;
            values.push(status);
            count++;
        }

        if (source) {
            query += `
                AND l.source=$${count}
            `;
            values.push(source);
            count++;
        }

        query += `
            ORDER BY l.${sort} ${order}
            LIMIT $${count}
            OFFSET $${count + 1}
        `;

        values.push(limit, offset);

        const result =
            await pool.query(query, values);

        res.json(result.rows);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

/*
GET LEAD BY ID
*/
exports.getLeadById = async (req, res) => {

    try {

        const result = await pool.query(
            `
            SELECT *
            FROM leads
            WHERE id=$1
            `,
            [req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Lead Not Found"
            });
        }

        res.json(result.rows[0]);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

/*
UPDATE LEAD
*/
exports.updateLead = async (req, res) => {

    try {

        const {
            name,
            email,
            phone,
            source,
            status,
            notes,
            assigned_to
        } = req.body;

        if (assigned_to) {
            const agentResult = await pool.query(
                `SELECT id
                 FROM users
                 WHERE id=$1 AND role='AGENT'`,
                [assigned_to]
            );

            if (agentResult.rows.length === 0) {
                return res.status(400).json({
                    message: "Selected agent is invalid"
                });
            }
        }

        const result = await pool.query(
            `
            UPDATE leads
            SET
                name=$1,
                email=$2,
                phone=$3,
                source=$4,
                status=$5,
                notes=$6,
                assigned_to=$7
            WHERE id=$8
            RETURNING *
            `,
            [
                name,
                email,
                phone,
                source,
                status,
                notes,
                assigned_to || null,
                req.params.id
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Lead Not Found"
            });
        }

        await pool.query(
            `
            INSERT INTO activity_logs
            (
                lead_id,
                action,
                performed_by
            )
            VALUES
            (
                $1,$2,$3
            )
            `,
            [
                req.params.id,
                "Lead Updated",
                req.user.id
            ]
        );

        res.json({
            message: "Lead Updated",
            lead: result.rows[0]
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

/*
DELETE LEAD
*/
exports.deleteLead = async (req, res) => {

    try {

        await pool.query(
            "DELETE FROM activity_logs WHERE lead_id=$1",
            [req.params.id]
        );

        const result = await pool.query(
            `
            DELETE FROM leads
            WHERE id=$1
            RETURNING *
            `,
            [req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Lead Not Found"
            });
        }

        res.json({
            message: "Lead Deleted"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: error.message
        });

    }

};

/*
GET STATS
*/
exports.getStats = async (req, res) => {

    try {

        const totalResult = await pool.query(
            "SELECT COUNT(*) FROM leads"
        );

        const newResult = await pool.query(
            "SELECT COUNT(*) FROM leads WHERE status='NEW'"
        );

        const contactedResult = await pool.query(
            "SELECT COUNT(*) FROM leads WHERE status='CONTACTED'"
        );

        const closedResult = await pool.query(
            "SELECT COUNT(*) FROM leads WHERE status='CLOSED'"
        );

        res.json({
            total: parseInt(totalResult.rows[0].count),
            new: parseInt(newResult.rows[0].count),
            contacted: parseInt(contactedResult.rows[0].count),
            closed: parseInt(closedResult.rows[0].count)
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: error.message
        });

    }

};
