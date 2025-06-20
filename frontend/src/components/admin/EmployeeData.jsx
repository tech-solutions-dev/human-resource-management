import React, { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import axios from "axios";

function EmployeeData() {
  const baseURL = process.env.REACT_APP_API_BASE_URL;

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          setEmployees(response.data.users);
        } else {
          console.error("Failed to fetch employees:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, [baseURL]);

  const HandleDeleteEmployee = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) {
      return;
    }
    try {
      const response = await axios.delete(`${baseURL}/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        setEmployees((prevEmployees) =>
          prevEmployees.filter((emp) => emp.user_id !== id)
        );
        alert(response.data.message || "Employee deleted successfully");
      } else {
        console.error("Failed to delete employee:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Employee List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-xl">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">First Name</th>
              <th className="py-3 px-4 text-left">Last Name</th>
              <th className="py-3 px-4 text-left">Position</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.user_id} className="border-t">
                <td className="py-2 px-4">{emp.first_name}</td>
                <td className="py-2 px-4">{emp.last_name}</td>
                <td className="py-2 px-4">{emp.role}</td>
                <td className="py-2 px-4 flex justify-center gap-4">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Pencil size={18} />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => HandleDeleteEmployee(emp.user_id)} // ✅ Fixed
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {employees.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-4 text-gray-500 italic"
                >
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeData;
