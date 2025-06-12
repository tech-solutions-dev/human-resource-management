import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminPannel from "./routes/AdminPannel";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard*" element={<AdminPannel />} />
      </Routes>
    </Router>
  );
}

export default App;
