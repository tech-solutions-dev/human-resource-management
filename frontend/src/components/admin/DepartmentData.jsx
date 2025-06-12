import React from "react";
import { Pencil, Trash2 } from "lucide-react";

const employees = [
  {
    department_id: 1,
    department_name: "Engineering",
  },
  {
    department_id: 2,
    department_name: "HR",
  },
  {
    department_id: 3,
    department_name: "IT",
  },
];

function DepartmentData() {
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
            {employees.map((emp) => (
              <tr key={emp.id} className="border-t">
                <td className="py-2 px-4">{emp.department_id}</td>
                <td className="py-2 px-4">{emp.department_name}</td>
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

export default DepartmentData;
