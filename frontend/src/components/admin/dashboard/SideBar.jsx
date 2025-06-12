import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Users,
  Settings,
  ChevronDown,
  ChevronUp,
  Repeat,
} from "lucide-react";

export default function SideBar({ isOpen, setIsOpen }) {
  const [showEmployeeMenu, setShowEmployeeMenu] = useState(false);
  const [showTransfersMenu, setShowTransfersMenu] = useState(false);
  const [showLeaveMenu, setShowLeaveMenu] = useState(false);

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
          to={"/dashboard"}
        />
        {/*Employees*/}
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
              <DropdownLink text="Employee List" to={"/dashboard/employees"} />
              <DropdownLink text="Add Employee" to={"/dashboard/addemployee"} />
              <DropdownLink text="Attendance" />
            </div>
          )}
        </div>
        {/*Transfers*/}
        <div className="space-y-1">
          <div
            className="flex items-center justify-between p-2 hover:bg-blue-700 rounded cursor-pointer"
            onClick={() => setShowTransfersMenu(!showTransfersMenu)}
          >
            <div className="flex items-center space-x-3">
              <Repeat size={20} />
              {isOpen && <span>Transfers</span>}
            </div>
            {isOpen &&
              (showTransfersMenu ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              ))}
          </div>

          {showTransfersMenu && isOpen && (
            <div className="ml-8 space-y-1 transition-all duration-300">
              <DropdownLink text="Transfer List" to={"/dashboard/transfers"} />
              <DropdownLink text="Manage Transfer" to={""} />
            </div>
          )}
        </div>

        {/*leave*/}
        <div className="space-y-1">
          <div
            className="flex items-center justify-between p-2 hover:bg-blue-700 rounded cursor-pointer"
            onClick={() => setShowLeaveMenu(!showLeaveMenu)}
          >
            <div className="flex items-center space-x-3">
              <Repeat size={20} />
              {isOpen && <span>Leave</span>}
            </div>
            {isOpen &&
              (showLeaveMenu ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              ))}
          </div>

          {showLeaveMenu && isOpen && (
            <div className="ml-8 space-y-1 transition-all duration-300">
              <DropdownLink
                text="LLeave Mnagement"
                to={"/dashboard/transfers"}
              />
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

function SidebarLink({ icon, text, isOpen, to }) {
  return (
    <Link
      className="flex items-center space-x-3 p-2 hover:bg-blue-700 rounded cursor-pointer"
      title={!isOpen ? text : undefined}
      to={to}
    >
      <span>{icon}</span>
      {isOpen && <span>{text}</span>}
    </Link>
  );
}

function DropdownLink({ text, to }) {
  return (
    <Link
      to={to}
      className="block pl-4 py-1 text-sm hover:bg-blue-600 rounded text-white"
    >
      {text}
    </Link>
  );
}
