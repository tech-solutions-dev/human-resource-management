import React, { useState } from "react";
import SideBar from "../components/admin/dashboard/SideBar";
import Navbar from "../components/admin/dashboard/Navbar";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`$ {
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
        <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
