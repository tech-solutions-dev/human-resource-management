import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
// Importing Admin routes
import Dashboard from "./pages/admin/Dashboard";
import EmployeeList from "./pages/admin/EmployeeList";
import AddEmployee from "./pages/admin/AddEmployee";
import DepartmentList from "./pages/admin/DepartmentList";
import ChangePassword from "./pages/ChangePassword";
import ProfileEdit from "./pages/ProfileEdit";
import Reports from "./pages/admin/Reports";
import LeaveManagement from "./pages/admin/LeaveManagement";
import TransferManagement from "./pages/admin/TransferManagement";
import AdminLayout from "./layouts/AdminLayout";
// Importing Employees routes
import EmployeeDashboard from "./pages/employees/EmployeeDashboard";
import LeaveApplication from "./pages/employees/LeaveApplication";
import Notifications from "./pages/employees/Notifications";
import TransferRequest from "./pages/employees/TransferRequest";
import LeaveList from "./pages/employees/LeaveList";
import TransferList from "./pages/employees/TransferList";
import Profile from "./pages/employees/Profile";
import UserList from "./pages/employees/UserList";
import EmployeeLayout from "./layouts/EmployeeLayout";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<AdminLayout />}>
           <Route index element={<Dashboard />} />
           <Route path="employees" element={<EmployeeList />} />
           <Route path="addemployee" element={<AddEmployee />} />
           <Route path="departmentlist" element={<DepartmentList />} />
           <Route path="change-password" element={<ChangePassword />} />
           <Route path="profile-edit" element={<ProfileEdit />} />
           <Route path="reports" element={<Reports />} />
           <Route path="leaves" element={<LeaveManagement />} />
           <Route path="transfers" element={<TransferManagement />} />
        </Route>
        <Route path="/employeeDashboard" element={<EmployeeLayout />}>
            <Route index element={<EmployeeDashboard />} />
            <Route path="leave-application" element={<LeaveApplication />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="transfer-request" element={<TransferRequest />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="profile-edit" element={<ProfileEdit />} />
            <Route path="leaves" element={<LeaveList />} />
            <Route path="transfers" element={<TransferList />} />
            <Route path="profile" element={<Profile />} />
            <Route path="departments" element={<DepartmentList />} />
            <Route path="users" element={<UserList />} />
        </Route>
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
