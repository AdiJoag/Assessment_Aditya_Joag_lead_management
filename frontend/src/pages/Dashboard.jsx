function Dashboard() {
    return (
        <div className="container mt-5">
            <h1>Lead Management Dashboard</h1>

            <div className="row mt-4">

                <div className="col-md-3">
                    <div className="card p-3">
                        <h5>Total Leads</h5>
                        <h2>0</h2>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card p-3">
                        <h5>New Leads</h5>
                        <h2>0</h2>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card p-3">
                        <h5>Assigned Leads</h5>
                        <h2>0</h2>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card p-3">
                        <h5>Closed Leads</h5>
                        <h2>0</h2>
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
