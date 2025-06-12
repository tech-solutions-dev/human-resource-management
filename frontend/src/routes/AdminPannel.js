import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/admin/Dashboard";
import EmployeeList from "../pages/admin/EmployeeList";
import AddEmployee from "../pages/admin/AddEmployee";
import DepartmentList from "../pages/admin/DepartmentList";

function AdminPannel() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/employees" element={<EmployeeList />} />
      <Route path="/addemployee" element={<AddEmployee />} />
      <Route path="/departmentlist" element={<DepartmentList />} />
    </Routes>
  );
}

export default AdminPannel;
