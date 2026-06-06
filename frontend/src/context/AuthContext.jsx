import {
    useEffect,
    useState
} from "react";
import api from "../services/api";
import { AuthContext } from "./AuthContextValue";

function getSavedUser() {
    try {
        const savedUser = localStorage.getItem("user");

        return savedUser
            ? JSON.parse(savedUser)
            : null;
    } catch {
        localStorage.removeItem("user");
        return null;
    }
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(getSavedUser);

    const [token, setToken] = useState(() =>
        localStorage.getItem("token")
    );

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }, [token]);

    useEffect(() => {
        if (user) {
            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    const login = async (email, password) => {
        const response = await api.post(
            "/auth/login",
            {
                email,
                password
            }
        );

        localStorage.setItem(
            "token",
            response.data.token
        );
        localStorage.setItem(
            "user",
            JSON.stringify(response.data.user)
        );

        setToken(response.data.token);
        setUser(response.data.user);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
