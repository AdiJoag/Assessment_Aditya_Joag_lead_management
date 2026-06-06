import { useEffect, useState } from "react";
import api from "../services/api";

function LeadList() {

    const [leads, setLeads] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        let ignore = false;

        api.get(`/leads?search=${search}`)
            .then((response) => {
                if (!ignore) {
                    setLeads(response.data);
                }
            })
            .catch((error) => {
                console.error(error);
            });

        return () => {
            ignore = true;
        };
    }, [search]);

    const fetchLeads = async () => {

        try {

            const response =
                await api.get(
                    `/leads?search=${search}`
                );

            setLeads(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const deleteLead = async (id) => {

        const confirmDelete =
            window.confirm(
                "Delete this lead?"
            );

        if (!confirmDelete) return;

        try {

            await api.delete(`/leads/${id}`);

            fetchLeads();

        } catch {

            alert("Delete Failed");

        }

    };

    return (

        <div className="container app-container">

            <div className="page-header">
                <div>
                    <p className="page-kicker">
                        Pipeline
                    </p>
                    <h1 className="page-title">
                        Leads
                    </h1>
                    <p className="page-subtitle">
                        Search, edit, and assign leads to the right agent.
                    </p>
                </div>

                <a
                    href="/create-lead"
                    className="btn btn-success"
                >
                    Add Lead
                </a>
            </div>

            <div className="content-panel">
                <div className="panel-toolbar">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by name or email"
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />
                </div>

                <div className="table-responsive">
                    <table className="table table-hover align-middle">

                        <thead>

                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Status</th>
                        <th>Source</th>
                        <th>Agent</th>
                        <th>Actions</th>
                    </tr>

                        </thead>

                        <tbody>

                    {
                        leads.length > 0 ? (
                            leads.map((lead) => (

                            <tr key={lead.id}>

                                <td>{lead.id}</td>
                                <td>{lead.name}</td>
                                <td>{lead.email}</td>
                                <td>{lead.phone}</td>
                                <td>
                                    <span className={`status-pill ${lead.status}`}>
                                        {lead.status}
                                    </span>
                                </td>
                                <td>{lead.source}</td>
                                <td>{lead.agent_name}</td>
                                <td>
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() =>
                                            window.location.href =
                                            `/edit-lead/${lead.id}`
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() =>
                                            deleteLead(lead.id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </td>

                            </tr>

                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="8"
                                    className="empty-state"
                                >
                                    No leads found
                                </td>
                            </tr>
                        )
                    }

                        </tbody>

                    </table>
                </div>
            </div>

        </div>

    );

}

export default LeadList;
