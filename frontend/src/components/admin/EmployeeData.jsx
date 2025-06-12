import React from "react";
import { Pencil, Trash2 } from "lucide-react";

const employees = [
  {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    department: "Engineering",
    position: "Frontend Developer",
  },
  {
    id: 2,
    first_name: "Jane",
    last_name: "Smith",
    department: "HR",
    position: "Recruiter",
  },
  {
    id: 3,
    first_name: "Mustapha",
    last_name: "Adams",
    department: "IT",
    position: "System Admin",
  },
];

function EmployeeData() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Employee List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-xl">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">First Name</th>
              <th className="py-3 px-4 text-left">Last Name</th>
              <th className="py-3 px-4 text-left">Department</th>
              <th className="py-3 px-4 text-left">Position</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} className="border-t">
                <td className="py-2 px-4">{emp.first_name}</td>
                <td className="py-2 px-4">{emp.last_name}</td>
                <td className="py-2 px-4">{emp.department}</td>
                <td className="py-2 px-4">{emp.position}</td>
                <td className="py-2 px-4 flex justify-center gap-4">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Pencil size={18} />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeData;
