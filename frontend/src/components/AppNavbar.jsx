import { useContext } from "react";
import {
    Link,
    useNavigate
} from "react-router-dom";
import { AuthContext } from "../context/AuthContextValue";

function AppNavbar() {

    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav className="navbar navbar-expand app-navbar">
            <div className="container">
                <Link
                    className="navbar-brand brand-mark"
                    to="/dashboard"
                >
                    <span className="brand-icon">
                        L
                    </span>
                    Lead Management
                </Link>

                <div className="navbar-nav me-auto">
                    <Link
                        className="nav-link"
                        to="/dashboard"
                    >
                        Dashboard
                    </Link>
                    <Link
                        className="nav-link"
                        to="/leads"
                    >
                        Leads
                    </Link>
                    <Link
                        className="nav-link"
                        to="/agents"
                    >
                        Agents
                    </Link>
                </div>

                <div className="d-flex align-items-center gap-3">
                    {
                        user && (
                            <span className="user-chip small">
                                {user.name} - {user.role}
                            </span>
                        )
                    }

                    <button
                        className="btn btn-outline-danger btn-sm"
                        type="button"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default AppNavbar;
