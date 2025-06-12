import React, { useState } from "react";
import SideBar from "../../components/admin/dashboard/SideBar";
import Navbar from "../../components/admin/dashboard/Navbar";
import DepartmentData from "../../components/admin/DepartmentData";

function DepartmentList() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [departmentName, setDepartmentName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New department:", departmentName);
    setIsModalOpen(false);
    setDepartmentName("");
    // You can add backend logic here
  };

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
        <Navbar />

        <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-700 text-white font-semibold px-4 py-2 rounded mb-4"
          >
            Add Department
          </button>

          <DepartmentData />
        </main>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-xl font-bold mb-4">Add Department</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
                placeholder="Department name"
                required
                className="w-full border border-gray-300 p-2 rounded"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DepartmentList;
