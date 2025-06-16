import React from 'react';

const dummyUsers = [
  {
    user_id: 1,
    username: 'jdoe',
    email: 'jdoe@example.com',
    first_name: 'John',
    last_name: 'Doe',
    role: 'admin',
    department: { name: 'Engineering' },
  },
  {
    user_id: 2,
    username: 'asmith',
    email: 'asmith@example.com',
    first_name: 'Alice',
    last_name: 'Smith',
    role: 'hr',
    department: { name: 'HR' },
  },
];

export default function UserList() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4">Username</th>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Role</th>
            <th className="py-2 px-4">Department</th>
          </tr>
        </thead>
        <tbody>
          {dummyUsers.map((user) => (
            <tr key={user.user_id}>
              <td className="py-2 px-4">{user.username}</td>
              <td className="py-2 px-4">{user.first_name} {user.last_name}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4">{user.role}</td>
              <td className="py-2 px-4">{user.department.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
