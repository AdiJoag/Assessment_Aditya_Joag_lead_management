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
        let ignore = false;

        api.get("/leads/stats")
            .then((response) => {
                if (!ignore) {
                    setStats(response.data);
                }
            })
            .catch((error) => {
                console.error(error);
            });

        return () => {
            ignore = true;
        };
    }, []);

    return (
        <div className="container app-container">
            <div className="page-header">
                <div>
                    <p className="page-kicker">
                        Overview
                    </p>
                    <h1 className="page-title">
                        Lead Management Dashboard
                    </h1>
                    <p className="page-subtitle">
                        Track lead volume and pipeline progress from one place.
                    </p>
                </div>

                <a
                    href="/create-lead"
                    className="btn btn-primary"
                >
                    Add Lead
                </a>
            </div>

            <div className="row g-3">

                <div className="col-md-3">
                    <div className="metric-card">
                        <div className="metric-label">
                            Total Leads
                        </div>
                        <div className="metric-value">
                            {stats.total}
                        </div>
                        <div className="metric-accent" />
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="metric-card">
                        <div className="metric-label">
                            New Leads
                        </div>
                        <div className="metric-value">
                            {stats.new}
                        </div>
                        <div className="metric-accent warning" />
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="metric-card">
                        <div className="metric-label">
                            Contacted
                        </div>
                        <div className="metric-value">
                            {stats.contacted}
                        </div>
                        <div className="metric-accent" />
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="metric-card">
                        <div className="metric-label">
                            Closed Leads
                        </div>
                        <div className="metric-value">
                            {stats.closed}
                        </div>
                        <div className="metric-accent success" />
                    </div>
                </div>

            </div>

            <a
                href="/leads"
                className="btn btn-outline-secondary mt-4"
            >
                View Leads
            </a>

        </div>
    );
}

export default Dashboard;
