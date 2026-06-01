import { useState } from "react";
import api from "../services/api";

function LeadForm() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        source: "",
        status: "NEW",
        notes: ""
    });

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

        <div className="container mt-4">

            <h2>Create Lead</h2>

            <form onSubmit={handleSubmit}>

                <input
                    name="name"
                    placeholder="Name"
                    className="form-control mb-3"
                    onChange={handleChange}
                />

                <input
                    name="email"
                    placeholder="Email"
                    className="form-control mb-3"
                    onChange={handleChange}
                />

                <input
                    name="phone"
                    placeholder="Phone"
                    className="form-control mb-3"
                    onChange={handleChange}
                />

                <input
                    name="source"
                    placeholder="Source"
                    className="form-control mb-3"
                    onChange={handleChange}
                />

                <textarea
                    name="notes"
                    placeholder="Notes"
                    className="form-control mb-3"
                    onChange={handleChange}
                />

                <button
                    className="btn btn-success"
                >
                    Save Lead
                </button>

            </form>

        </div>

    );

}

export default LeadForm;
