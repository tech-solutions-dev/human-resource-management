import React, { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import axios from "axios";

function DepartmentData() {
  const baseURL = process.env.REACT_APP_API_BASE_URL;
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/departments/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // Save actual department data (with id and name)
        setDepartments(response.data.departments || []);
      } catch (error) {
        console.error("Failed to fetch departments:", error);
        setDepartments([]);
      }
    };

    fetchDepartments();
  }, [baseURL]);

  const handleDeleteDepartment = async (departmentId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this department? This action cannot be undone."
    );

    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `${baseURL}/api/departments/${departmentId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        alert(response.data.message || "Department deleted successfully.");
        // Refresh list after delete
        setDepartments((prev) =>
          prev.filter((dept) => dept.department_id !== departmentId)
        );
      }
    } catch (error) {
      console.error("Error deleting department:", error);
      alert("Failed to delete department. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Department List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-xl">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Department Name</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dep) => (
              <tr key={dep.department_id} className="border-t">
                <td className="py-2 px-4">{dep.department_id}</td>
                <td className="py-2 px-4">{dep.name}</td>
                <td className="py-2 px-4 flex justify-center gap-4">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Pencil size={18} />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDeleteDepartment(dep.department_id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}

            {departments.length === 0 && (
              <tr>
                <td
                  colSpan="3"
                  className="text-center text-gray-500 py-4 italic"
                >
                  No departments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DepartmentData;
