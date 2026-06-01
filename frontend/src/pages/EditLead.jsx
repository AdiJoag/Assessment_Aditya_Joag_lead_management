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
        notes: ""
    });

    useEffect(() => {
        fetchLead();
    }, []);

    const fetchLead = async () => {

        try {

            const response =
                await api.get(`/leads/${id}`);

            setFormData(response.data);

        } catch (error) {

            console.error(error);

        }

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

        <div className="container mt-4">

            <h2>Edit Lead</h2>

            <form onSubmit={handleSubmit}>

                <input
                    name="name"
                    className="form-control mb-3"
                    value={formData.name}
                    onChange={handleChange}
                />

                <input
                    name="email"
                    className="form-control mb-3"
                    value={formData.email}
                    onChange={handleChange}
                />

                <input
                    name="phone"
                    className="form-control mb-3"
                    value={formData.phone}
                    onChange={handleChange}
                />

                <input
                    name="source"
                    className="form-control mb-3"
                    value={formData.source}
                    onChange={handleChange}
                />

                <input
                    name="status"
                    className="form-control mb-3"
                    value={formData.status}
                    onChange={handleChange}
                />

                <textarea
                    name="notes"
                    className="form-control mb-3"
                    value={formData.notes}
                    onChange={handleChange}
                />

                <button
                    className="btn btn-primary"
                >
                    Update Lead
                </button>

            </form>

        </div>

    );

}

export default EditLead;
