import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminPannel from "./routes/AdminPannel";
import EmployeePannel from "./routes/EmployeePannel";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard/*" element={<AdminPannel />} />
          <Route path="/employeeDashboard/*" element={<EmployeePannel />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
