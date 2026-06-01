const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const leadRoutes = require("./routes/leadRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json({
            message: "Database Connected Successfully",
            time: result.rows[0]
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Database Connection Failed"
        });
    }
});

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
