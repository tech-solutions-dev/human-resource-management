import React, { useState } from "react";
import { Home, Users, Settings, ChevronDown, ChevronUp } from "lucide-react";

export default function SideBar({ isOpen, setIsOpen }) {
  const [showEmployeeMenu, setShowEmployeeMenu] = useState(false);

  return (
    <div
      className={`min-h-screen ${
        isOpen ? "w-64" : "w-16"
      } bg-gray-800 text-white transition-all duration-300 flex flex-col`}
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
        <SidebarLink
          icon={<Home size={20} />}
          text="Dashboard"
          isOpen={isOpen}
        />

        {/* Dropdown Menu */}
        <div className="space-y-1">
          <div
            className="flex items-center justify-between p-2 hover:bg-blue-700 rounded cursor-pointer"
            onClick={() => setShowEmployeeMenu(!showEmployeeMenu)}
          >
            <div className="flex items-center space-x-3">
              <Users size={20} />
              {isOpen && <span>Employees</span>}
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
              <DropdownLink text="Employee List" />
              <DropdownLink text="Add Employee" />
              <DropdownLink text="Attendance" />
            </div>
          )}
        </div>

        <SidebarLink
          icon={<Settings size={20} />}
          text="Settings"
          isOpen={isOpen}
        />
      </nav>
    </div>
  );
}

function SidebarLink({ icon, text, isOpen }) {
  return (
    <div
      className="flex items-center space-x-3 p-2 hover:bg-blue-700 rounded cursor-pointer"
      title={!isOpen ? text : undefined}
    >
      <span>{icon}</span>
      {isOpen && <span>{text}</span>}
    </div>
  );
}

function DropdownLink({ text }) {
  return (
    <div className="pl-2 py-1 hover:bg-blue-600 rounded cursor-pointer">
      {text}
    </div>
  );
}
