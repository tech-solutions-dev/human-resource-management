import React from "react";
import { Routes, Route } from "react-router-dom";
import EmployeeDashboard from "../pages/employees/EmployeeDashboard";
import LeaveApplication from "../pages/employees/LeaveApplication";
import Notifications from "../pages/employees/Notifications";
import TransferRequest from "../pages/employees/TransferRequest";
import ChangePassword from "../pages/ChangePassword";
import ProfileEdit from "../pages/ProfileEdit";
import ProtectedRoute from "./ProtectedRoute";

function EmployeePannel() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<EmployeeDashboard />} />
        <Route path="leave-application" element={<LeaveApplication />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="transfer-request" element={<TransferRequest />} />
        <Route path="change-password" element={<ChangePassword />} />
        <Route path="profile-edit" element={<ProfileEdit />} />
      </Route>
    </Routes>
  );
}

export default EmployeePannel;
