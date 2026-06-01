import { useEffect, useState } from "react";
import api from "../services/api";

function LeadList() {

    const [leads, setLeads] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {

        fetchLeads();

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

        } catch (error) {

            alert("Delete Failed");

        }

    };

    return (

        <div className="container mt-4">

            <h2>Lead List</h2>

            <a
                href="/create-lead"
                className="btn btn-success mb-3"
            >
                Add Lead
            </a>

            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search by name or email"
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
            />

            <table className="table table-bordered">

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
                        leads.map((lead) => (

                            <tr key={lead.id}>

                                <td>{lead.id}</td>
                                <td>{lead.name}</td>
                                <td>{lead.email}</td>
                                <td>{lead.phone}</td>
                                <td>{lead.status}</td>
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
                    }

                </tbody>

            </table>

        </div>

    );

}

export default LeadList;
