const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    try {

        const { name, email, password, role } = req.body;
        const allowedRoles = ["ADMIN", "MANAGER", "AGENT"];
        const userRole = role || "AGENT";

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required"
            });
        }

        if (!allowedRoles.includes(userRole)) {
            return res.status(400).json({
                message: "Invalid role"
            });
        }

        // Check if user already exists
        const existingUser = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (existingUser.rows.length > 0) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        const result = await pool.query(
            `INSERT INTO users(name,email,password,role)
             VALUES($1,$2,$3,$4)
             RETURNING id,name,email,role`,
            [name, email, hashedPassword, userRole]
        );

        res.status(201).json({
            message: "User registered successfully",
            user: result.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;

        // Find user
        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        const user = result.rows[0];

        // Compare password
        const validPassword = await bcrypt.compare(
            password,
            user.password
        );

        if (!validPassword) {
            return res.status(400).json({
                message: "Invalid Password"
            });
        }

        // Generate JWT
        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.json({
            message: "Login Successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

exports.getAgents = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT id,name,email,role
             FROM users
             WHERE role='AGENT'
             ORDER BY name ASC`
        );

        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

exports.updateAgent = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                message: "Name and email are required"
            });
        }

        const existingUser = await pool.query(
            `SELECT id
             FROM users
             WHERE email=$1 AND id<>$2`,
            [email, req.params.id]
        );

        if (existingUser.rows.length > 0) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        let result;

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);

            result = await pool.query(
                `UPDATE users
                 SET name=$1,email=$2,password=$3
                 WHERE id=$4 AND role='AGENT'
                 RETURNING id,name,email,role`,
                [name, email, hashedPassword, req.params.id]
            );
        } else {
            result = await pool.query(
                `UPDATE users
                 SET name=$1,email=$2
                 WHERE id=$3 AND role='AGENT'
                 RETURNING id,name,email,role`,
                [name, email, req.params.id]
            );
        }

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Agent Not Found"
            });
        }

        res.json({
            message: "Agent Updated",
            agent: result.rows[0]
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};
