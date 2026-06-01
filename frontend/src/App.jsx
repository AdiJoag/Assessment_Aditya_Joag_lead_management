import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import LeadList from "./pages/LeadList";
import LeadForm from "./pages/LeadForm";
import EditLead from "./pages/EditLead";

function App() {

    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/leads"
                    element={<LeadList />}
                />

                <Route
                    path="/create-lead"
                    element={<LeadForm />}
                />

                <Route
                    path="/edit-lead/:id"
                    element={<EditLead />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;
