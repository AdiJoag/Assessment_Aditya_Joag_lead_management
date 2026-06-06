import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import { useContext } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import LeadList from "./pages/LeadList";
import LeadForm from "./pages/LeadForm";
import EditLead from "./pages/EditLead";
import Agents from "./pages/Agents";
import AppNavbar from "./components/AppNavbar";
import { AuthContext } from "./context/AuthContextValue";

function ProtectedRoute({ children }) {

    const { token } = useContext(AuthContext);

    if (!token) {
        return <Navigate to="/" replace />;
    }

    return (
        <>
            <AppNavbar />
            {children}
        </>
    );
}

function App() {

    return (
        <BrowserRouter>
            <div className="app-shell">

            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/leads"
                    element={
                        <ProtectedRoute>
                            <LeadList />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/create-lead"
                    element={
                        <ProtectedRoute>
                            <LeadForm />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/edit-lead/:id"
                    element={
                        <ProtectedRoute>
                            <EditLead />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/agents"
                    element={
                        <ProtectedRoute>
                            <Agents />
                        </ProtectedRoute>
                    }
                />

            </Routes>
            </div>

        </BrowserRouter>
    );
}

export default App;
