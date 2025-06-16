import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  FileText,
  Bell,
  Send,
  Settings,
  User,
  Users,
  Building,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function SideBar({ isOpen, setIsOpen }) {
  const location = useLocation();
  // Only one dropdown open at a time
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

  const dropdown = (key, label, icon, children) => (
    <div className="space-y-1">
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
        <div className="ml-8 space-y-1 transition-all duration-300">{children}</div>
      )}
    </div>
  );

  return (
    <div
      className={`min-h-screen ${
        isOpen ? "w-64" : "w-16"
      } bg-blue-800 text-white transition-all duration-300 flex flex-col`}
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
        {navLink("/employeeDashboard", "Dashboard", <Home size={20} />)}
        {navLink(
          "/employeeDashboard/notifications",
          "Notifications",
          <Bell size={20} />
        )}
        {dropdown(
          "leave",
          "Leave Management",
          <FileText size={20} />, // FileText for leave
          <>
            {navLink(
              "/employeeDashboard/leaves",
              "My Leaves",
              <FileText size={18} />
            )}
            {navLink(
              "/employeeDashboard/leave-application",
              "Apply Leave",
              <FileText size={18} />
            )}
          </>
        )}
        {dropdown(
          "transfer",
          "Transfer Management",
          <Send size={20} />, // Send for transfer
          <>
            {navLink(
              "/employeeDashboard/transfers",
              "My Transfers",
              <Send size={18} />
            )}
            {navLink(
              "/employeeDashboard/transfer-request",
              "Request Transfer",
              <Send size={18} />
            )}
          </>
        )}
        {dropdown(
          "account",
          "Account Management",
          <Settings size={20} />, // Settings for account
          <>
            {navLink(
              "/employeeDashboard/profile-edit",
              "Edit Profile",
              <User size={18} />
            )}
            {navLink(
              "/employeeDashboard/change-password",
              "Change Password",
              <Settings size={18} />
            )}
          </>
        )}
        {navLink("/employeeDashboard/profile", "Profile", <User size={20} />)}
        {navLink(
          "/employeeDashboard/departments",
          "Departments",
          <Building size={20} />
        )}
        {navLink("/employeeDashboard/users", "Users", <Users size={20} />)}
      </nav>
    </div>
  );
}
