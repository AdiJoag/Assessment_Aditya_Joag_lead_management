import {
    useContext,
    useState
} from "react";
import {
    Link,
    useLocation,
    useNavigate
} from "react-router-dom";
import { AuthContext } from "../context/AuthContextValue";

function Login() {

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] =
        useState(location.state?.email || "");

    const [password, setPassword] =
        useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            await login(email, password);

            navigate("/dashboard");

        } catch {

            alert("Login Failed");

        }

    };

    return (
        <div className="auth-page">

                    <div className="auth-card">

                        <p className="page-kicker">
                            Lead Management
                        </p>
                        <h1 className="auth-title">
                            Welcome back
                        </h1>
                        <p className="auth-copy">
                            Sign in to manage leads, agents, and assignments.
                        </p>

                        <form
                            onSubmit={handleLogin}
                        >

                            <input
                                className="form-control mb-3"
                                placeholder="Email"
                                type="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(
                                        e.target.value
                                    )
                                }
                            />

                            <input
                                type="password"
                                className="form-control mb-3"
                                placeholder="Password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(
                                        e.target.value
                                    )
                                }
                            />

                            <button
                                className="btn btn-primary w-100"
                            >
                                Login
                            </button>

                        </form>

                        <div className="text-center mt-3">
                            <Link to="/register">
                                Create another user
                            </Link>
                        </div>

                    </div>

        </div>
    );
}

export default Login;
