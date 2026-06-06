import { useEffect, useState } from "react";
import api from "../services/api";

function Agents() {

    const [agents, setAgents] = useState([]);
    const [editingAgent, setEditingAgent] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const fetchAgents = async () => {
        try {
            const response = await api.get("/auth/agents");
            setAgents(response.data);
        } catch (error) {
            console.error(error);
        }
    };

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

    const startEdit = (agent) => {
        setEditingAgent(agent);
        setFormData({
            name: agent.name,
            email: agent.email,
            password: ""
        });
    };

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
                `/auth/agents/${editingAgent.id}`,
                formData
            );

            alert("Agent Updated");
            setEditingAgent(null);
            setFormData({
                name: "",
                email: "",
                password: ""
            });
            fetchAgents();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Agent update failed"
            );
        }
    };

    return (
        <div className="container app-container">
            <div className="page-header">
                <div>
                    <p className="page-kicker">
                        Team
                    </p>
                    <h1 className="page-title">
                        Agents
                    </h1>
                    <p className="page-subtitle">
                        Update agent profiles and keep assignment options current.
                    </p>
                </div>

                <a
                    href="/register"
                    className="btn btn-success"
                >
                    Add Agent
                </a>
            </div>

            <div className="row g-3">
                <div className="col-md-7">
                    <div className="content-panel">
                        <div className="table-responsive">
                            <table className="table table-hover align-middle">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        agents.length > 0 ? (
                                            agents.map((agent) => (
                                                <tr key={agent.id}>
                                                    <td>{agent.id}</td>
                                                    <td>{agent.name}</td>
                                                    <td>{agent.email}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-warning btn-sm"
                                                            type="button"
                                                            onClick={() =>
                                                                startEdit(agent)
                                                            }
                                                        >
                                                            Edit
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="4"
                                                    className="empty-state"
                                                >
                                                    No agents found
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="col-md-5">
                    {
                        editingAgent && (
                            <div className="form-panel">
                                <h2 className="h4 mb-3">
                                    Edit Agent
                                </h2>

                                <form onSubmit={handleSubmit}>
                                    <label className="form-label">
                                        Name
                                    </label>
                                    <input
                                        name="name"
                                        className="form-control mb-3"
                                        placeholder="Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />

                                    <label className="form-label">
                                        Email
                                    </label>
                                    <input
                                        name="email"
                                        type="email"
                                        className="form-control mb-3"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />

                                    <label className="form-label">
                                        Password
                                    </label>
                                    <input
                                        name="password"
                                        type="password"
                                        className="form-control mb-3"
                                        placeholder="New password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />

                                    <div className="d-flex gap-2">
                                        <button className="btn btn-primary">
                                            Update Agent
                                        </button>

                                        <button
                                            className="btn btn-outline-secondary"
                                            type="button"
                                            onClick={() =>
                                                setEditingAgent(null)
                                            }
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )
                    }

                    {
                        !editingAgent && (
                            <div className="form-panel">
                                <h2 className="h4 mb-2">
                                    Select an agent
                                </h2>
                                <p className="page-subtitle mb-0">
                                    Choose Edit from the table to update agent details.
                                </p>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Agents;
