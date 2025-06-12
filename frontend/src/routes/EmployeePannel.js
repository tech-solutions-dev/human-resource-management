import React from "react";
import { Routes, Route } from "react-router-dom";
import EmployeeDashboard from "../pages/employees/EmployeeDashboard";
function EmployeePannel() {
  return (
    <Routes>
      <Route path="/" element={<EmployeeDashboard />} />
    </Routes>
  );
}

export default EmployeePannel;
