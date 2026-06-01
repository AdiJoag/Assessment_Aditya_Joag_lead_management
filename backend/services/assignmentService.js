const pool = require("../config/db");

exports.getLeastLoadedAgent = async () => {

    const result = await pool.query(`
        SELECT u.id,
               COUNT(l.id) as total_leads
        FROM users u
        LEFT JOIN leads l
        ON u.id = l.assigned_to
        WHERE u.role = 'AGENT'
        GROUP BY u.id
        ORDER BY total_leads ASC
        LIMIT 1
    `);

    if (result.rows.length === 0) {
        throw new Error("No agents available");
    }

    return result.rows[0].id;
};
