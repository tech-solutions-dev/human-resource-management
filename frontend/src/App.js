import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminPannel from "./routes/AdminPannel";
import EmployeePannel from "./routes/EmployeePannel";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard*" element={<AdminPannel />} />
        <Route path="/employeeDashboard*" element={<EmployeePannel />} />
      </Routes>
    </Router>
  );
}

export default App;
