import { useState } from "react";
import {
    Link,
    useNavigate
} from "react-router-dom";
import api from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "AGENT"
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
                "/auth/register",
                formData
            );

            alert("User created. You can login now.");

            navigate("/", {
                state: {
                    email: formData.email
                }
            });
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Registration Failed"
            );
        }
    };

    return (
        <div className="auth-page">
                    <div className="auth-card auth-card-wide">
                        <p className="page-kicker">
                            Access
                        </p>
                        <h1 className="auth-title">
                            Create user
                        </h1>
                        <p className="auth-copy">
                            Add an admin, manager, or agent account.
                        </p>

                        <form onSubmit={handleSubmit}>
                            <input
                                name="name"
                                className="form-control mb-3"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />

                            <input
                                name="email"
                                type="email"
                                className="form-control mb-3"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                            <input
                                name="password"
                                type="password"
                                className="form-control mb-3"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />

                            <select
                                name="role"
                                className="form-select mb-3"
                                value={formData.role}
                                onChange={handleChange}
                            >
                                <option value="AGENT">
                                    Agent
                                </option>
                                <option value="MANAGER">
                                    Manager
                                </option>
                                <option value="ADMIN">
                                    Admin
                                </option>
                            </select>

                            <button className="btn btn-success w-100">
                                Create User
                            </button>
                        </form>

                        <div className="text-center mt-3">
                            <Link to="/">
                                Back to login
                            </Link>
                        </div>
                    </div>
        </div>
    );
}

export default Register;
