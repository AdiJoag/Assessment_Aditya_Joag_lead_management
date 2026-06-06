import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function EditLead() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        source: "",
        status: "",
        notes: "",
        assigned_to: ""
    });

    const [agents, setAgents] = useState([]);

    useEffect(() => {
        let ignore = false;

        api.get(`/leads/${id}`)
            .then((response) => {
                if (!ignore) {
                    setFormData({
                        ...response.data,
                        assigned_to:
                            response.data.assigned_to || ""
                    });
                }
            })
            .catch((error) => {
                console.error(error);
            });

        return () => {
            ignore = true;
        };
    }, [id]);

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

            await api.put(
                `/leads/${id}`,
                formData
            );

            alert("Lead Updated");

            navigate("/leads");

        } catch (error) {

            console.error(error);

            alert("Update Failed");

        }

    };

    return (

        <div className="container app-container">

            <div className="page-header">
                <div>
                    <p className="page-kicker">
                        Lead details
                    </p>
                    <h1 className="page-title">
                        Edit Lead
                    </h1>
                    <p className="page-subtitle">
                        Update contact, status, and assignment information.
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
                    className="form-control mb-3"
                    value={formData.name}
                    onChange={handleChange}
                />
                    </div>

                    <div>
                        <label className="form-label">
                            Email
                        </label>

                <input
                    name="email"
                    className="form-control mb-3"
                    value={formData.email}
                    onChange={handleChange}
                />
                    </div>

                    <div>
                        <label className="form-label">
                            Phone
                        </label>

                <input
                    name="phone"
                    className="form-control mb-3"
                    value={formData.phone}
                    onChange={handleChange}
                />
                    </div>

                    <div>
                        <label className="form-label">
                            Source
                        </label>

                <input
                    name="source"
                    className="form-control mb-3"
                    value={formData.source}
                    onChange={handleChange}
                />
                    </div>

                    <div>
                        <label className="form-label">
                            Status
                        </label>

                <input
                    name="status"
                    className="form-control mb-3"
                    value={formData.status}
                    onChange={handleChange}
                />
                    </div>

                    <div>
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
                        Unassigned
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
                    className="form-control mb-3"
                    value={formData.notes}
                    onChange={handleChange}
                />
                    </div>

                    <div className="full-width">
                        <button
                            className="btn btn-primary"
                        >
                            Update Lead
                        </button>
                    </div>
                </div>

            </form>

        </div>

    );

}

export default EditLead;
