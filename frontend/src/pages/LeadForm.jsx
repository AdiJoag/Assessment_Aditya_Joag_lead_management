import { useEffect, useState } from "react";
import api from "../services/api";

function LeadForm() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        source: "",
        status: "NEW",
        notes: "",
        assigned_to: ""
    });

    const [agents, setAgents] = useState([]);

    useEffect(() => {
        let ignore = false;

        api.get("/auth/agents")
            .then((response) => {
                if (!ignore) {
                    setAgents(response.data);
                }
            })
            .catch((error) => {
                console.error(error);
            });

        return () => {
            ignore = true;
        };
    }, []);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.post(
                "/leads",
                formData
            );

            alert("Lead Created");

            window.location.href = "/leads";

        } catch (error) {

            console.error(error);

            alert("Failed");

        }

    };

    return (

        <div className="container app-container">

            <div className="page-header">
                <div>
                    <p className="page-kicker">
                        New lead
                    </p>
                    <h1 className="page-title">
                        Create Lead
                    </h1>
                    <p className="page-subtitle">
                        Capture contact details and assign ownership.
                    </p>
                </div>
            </div>

            <form
                className="form-panel"
                onSubmit={handleSubmit}
            >
                <div className="form-grid">
                    <div>
                        <label className="form-label">
                            Name
                        </label>

                <input
                    name="name"
                    placeholder="Name"
                    className="form-control mb-3"
                    onChange={handleChange}
                />
                    </div>

                    <div>
                        <label className="form-label">
                            Email
                        </label>

                <input
                    name="email"
                    placeholder="Email"
                    className="form-control mb-3"
                    onChange={handleChange}
                />
                    </div>

                    <div>
                        <label className="form-label">
                            Phone
                        </label>

                <input
                    name="phone"
                    placeholder="Phone"
                    className="form-control mb-3"
                    onChange={handleChange}
                />
                    </div>

                    <div>
                        <label className="form-label">
                            Source
                        </label>

                <input
                    name="source"
                    placeholder="Source"
                    className="form-control mb-3"
                    onChange={handleChange}
                />
                    </div>

                    <div className="full-width">
                        <label className="form-label">
                            Agent
                        </label>

                <select
                    name="assigned_to"
                    className="form-select mb-3"
                    value={formData.assigned_to}
                    onChange={handleChange}
                >
                    <option value="">
                        Auto assign agent
                    </option>
                    {
                        agents.map((agent) => (
                            <option
                                key={agent.id}
                                value={agent.id}
                            >
                                {agent.name}
                            </option>
                        ))
                    }
                </select>
                    </div>

                    <div className="full-width">
                        <label className="form-label">
                            Notes
                        </label>
                <textarea
                    name="notes"
                    placeholder="Notes"
                    className="form-control mb-3"
                    onChange={handleChange}
                />
                    </div>

                    <div className="full-width">
                        <button
                            className="btn btn-success"
                        >
                            Save Lead
                        </button>
                    </div>
                </div>

            </form>

        </div>

    );

}

export default LeadForm;
