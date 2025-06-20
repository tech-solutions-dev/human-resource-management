import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  FileText,
  Bell,
  Send,
  Settings,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function SideBar({ isOpen, setIsOpen }) {
  const location = useLocation();
  const [showEmployeeMenu, setShowEmployeeMenu] = useState(false);

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

        {/* Dropdown Menu */}
        <div className="space-y-1">
          <div
            className="flex items-center justify-between p-2 hover:bg-blue-700 rounded cursor-pointer"
            onClick={() => setShowEmployeeMenu(!showEmployeeMenu)}
          >
            <div className="flex items-center space-x-3">
              <FileText size={20} />
              {isOpen && <span>Leave Management</span>}
            </div>
            {isOpen &&
              (showEmployeeMenu ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              ))}
          </div>

          {showEmployeeMenu && isOpen && (
            <div className="ml-8 space-y-1 transition-all duration-300">
              {navLink(
                "/employeeDashboard/leave-application",
                "Leave Application",
                <FileText size={20} />
              )}
              {navLink(
                "/employeeDashboard/notifications",
                "Notifications",
                <Bell size={20} />
              )}
              {navLink(
                "/employeeDashboard/transfer-request",
                "Transfer Request",
                <Send size={20} />
              )}
            </div>
          )}
        </div>

        {navLink("/employeeDashboard/profile-edit", "Profile", <Settings size={20} />)}
        {navLink("/employeeDashboard/change-password", "Change Password", <Settings size={20} />)}
      </nav>
    </div>
  );
}
