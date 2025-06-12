import React, { useState } from "react";
import SideBar from "../../components/employees/dashboard/SideBar";
import Navbar from "../../components/employees/dashboard/Navbar";

function EmployeeDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-16"
        } bg-blue-800 transition-all duration-300 hidden md:block`}
      >
        <SideBar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col transition-all duration-300">
        {/* Navbar */}
        <Navbar />

        {/* Content */}
        <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Employee Dashboard
          </h1>
          {/* Example: Grid cards */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card title="Total Employees" count="120" />
            <Card title="On Leave" count="8" />
            <Card title="Pending Requests" count="4" />
          </div>
        </main>
      </div>
    </div>
  );
}

function Card({ title, count }) {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      <p className="text-2xl font-bold text-blue-600 mt-2">{count}</p>
    </div>
  );
}

export default EmployeeDashboard;
