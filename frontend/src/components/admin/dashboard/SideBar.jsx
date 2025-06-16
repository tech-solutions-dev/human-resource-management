import { Link, useLocation } from "react-router-dom";
import {
  Users,
  Building,
  Plus,
  LogOut,
  Settings,
  Home,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import React, { useState } from "react";

export default function SideBar({ isOpen, setIsOpen }) {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState("");
  const navLink = (to, label, icon) => (
    <Link
      to={to}
      className={`flex items-center space-x-3 p-2 rounded hover:bg-blue-700 transition-colors duration-200 ${
        location.pathname === to ? "bg-blue-900 text-white" : "text-white"
      }`}
    >
      {icon}
      {isOpen && <span>{label}</span>}
    </Link>
  );
  const dropdown = (label, icon, key, children) => (
    <div>
      <div
        className="flex items-center justify-between p-2 hover:bg-blue-700 rounded cursor-pointer"
        onClick={() => setOpenDropdown(openDropdown === key ? "" : key)}
      >
        <div className="flex items-center space-x-3">
          {icon}
          {isOpen && <span>{label}</span>}
        </div>
        {isOpen &&
          (openDropdown === key ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          ))}
      </div>
      {openDropdown === key && isOpen && (
        <div className="ml-8 space-y-1 transition-all duration-300">
          {children}
        </div>
      )}
    </div>
  );
  return (
    <div
      className={`min-h-screen ${isOpen ? "w-64" : "w-16"} bg-blue-800 text-white transition-all duration-300 flex flex-col`}
    >
      {/* Sidebar Header */}
      <div className="flex justify-between items-center p-4 border-b border-blue-700">
        <h1 className={`text-xl font-bold ${!isOpen && "hidden"}`}>
          HRM System
        </h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white focus:outline-none"
        >
          {isOpen ? "«" : "»"}
        </button>
      </div>
      {/* Sidebar Navigation */}
      <nav className="flex flex-col space-y-2 p-4 text-sm">
        {navLink("/dashboard", "Dashboard", <Home size={20} />)}
        {dropdown(
          "Employees",
          <Users size={20} />,
          "employees",
          <>
            {navLink(
              "/dashboard/employees",
              "Employee List",
              <Users size={18} />
            )}
            {navLink(
              "/dashboard/addemployee",
              "Add Employee",
              <Plus size={18} />
            )}
          </>
        )}
        {navLink(
          "/dashboard/departmentlist",
          "Departments",
          <Building size={20} />
        )}
        {dropdown(
          "Management",
          <Settings size={20} />,
          "management",
          <>
            {navLink(
              "/dashboard/leaves",
              "Leave Management",
              <Settings size={18} />
            )}
            {navLink(
              "/dashboard/transfers",
              "Transfer Management",
              <Settings size={18} />
            )}
            {navLink("/dashboard/reports", "Reports", <Settings size={18} />)}
          </>
        )}
        {dropdown(
          "Account",
          <Settings size={20} />,
          "account",
          <>
            {navLink(
              "/dashboard/profile-edit",
              "Profile",
              <Settings size={18} />
            )}
            {navLink(
              "/dashboard/change-password",
              "Change Password",
              <Settings size={18} />
            )}
          </>
        )}
        <button className="flex items-center space-x-3 p-2 rounded hover:bg-blue-700 transition-colors duration-200 mt-8">
          <LogOut size={20} />
          {isOpen && <span>Logout</span>}
        </button>
      </nav>
    </div>
  );
}
