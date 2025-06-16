import React from 'react';

const dummyDepartments = [
  {
    department_id: 1,
    name: 'Engineering',
    code: 'ENG',
    description: 'Handles all engineering tasks',
    manager: { first_name: 'John', last_name: 'Doe' },
    location: 'Block A',
    is_active: true,
  },
  {
    department_id: 2,
    name: 'Marketing',
    code: 'MKT',
    description: 'Marketing and advertising',
    manager: { first_name: 'Jane', last_name: 'Smith' },
    location: 'Block B',
    is_active: true,
  },
];

export default function DepartmentList() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Departments</h2>
      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Code</th>
            <th className="py-2 px-4">Description</th>
            <th className="py-2 px-4">Manager</th>
            <th className="py-2 px-4">Location</th>
          </tr>
        </thead>
        <tbody>
          {dummyDepartments.map((dept) => (
            <tr key={dept.department_id}>
              <td className="py-2 px-4">{dept.name}</td>
              <td className="py-2 px-4">{dept.code}</td>
              <td className="py-2 px-4">{dept.description}</td>
              <td className="py-2 px-4">{dept.manager.first_name} {dept.manager.last_name}</td>
              <td className="py-2 px-4">{dept.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
