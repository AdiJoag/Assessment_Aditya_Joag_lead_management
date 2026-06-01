import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {

    const [stats, setStats] = useState({
        total: 0,
        new: 0,
        contacted: 0,
        closed: 0
    });

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await api.get("/leads/stats");
            setStats(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mt-5">
            <h1>Lead Management Dashboard</h1>

            <div className="row mt-4">

                <div className="col-md-3">
                    <div className="card p-3">
                        <h5>Total Leads</h5>
                        <h2>{stats.total}</h2>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card p-3">
                        <h5>New Leads</h5>
                        <h2>{stats.new}</h2>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card p-3">
                        <h5>Contacted</h5>
                        <h2>{stats.contacted}</h2>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card p-3">
                        <h5>Closed Leads</h5>
                        <h2>{stats.closed}</h2>
                    </div>
                </div>

            </div>

            <a
                href="/leads"
                className="btn btn-primary mt-4"
            >
                View Leads
            </a>

        </div>
    );
}

export default Dashboard;
