import React, { useState } from "react";
import SideBar from "../../components/admin/dashboard/SideBar";
import Navbar from "../../components/admin/dashboard/Navbar";
import DepartmentData from "../../components/admin/DepartmentData";

function DepartmentList() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [department, setDepartment] = useState({
    department_name: "",
    department_code: "",
    department_description: "",
    budget: "",
    manager_id: "",
  });

  const handleChange = (e) => {
    setDepartment({
      ...department,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
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
                value={department.department_name}
                name="department_name"
                onChange={handleChange}
                placeholder="Department name"
                required
                className="w-full border border-gray-300 p-2 rounded"
              />
              <input
                type="text"
                value={department.department_code}
                name="department_code"
                onChange={handleChange}
                placeholder="Department code"
                required
                className="w-full border border-gray-300 p-2 rounded"
              />
              <input
                type="number"
                value={department.budget}
                name="budget"
                onChange={handleChange}
                placeholder="budget"
                required
                className="w-full border border-gray-300 p-2 rounded"
              />
              <select
                name=""
                className="w-full border border-gray-300 p-2 rounded"
                id=""
              >
                <option value="" name="manager_id" onChange={handleChange}>
                  Select Department Head
                </option>
                <option value="1">John Doe</option>
                <option value="2">Jane Smith</option>
                <option value="3">Alice Johnson</option>
                <option value="4">Bob Brown</option>
              </select>
              <textarea
                type="text"
                value={department.department_description}
                name="department_description"
                onChange={handleChange}
                rows="3"
                placeholder="Department Description"
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
