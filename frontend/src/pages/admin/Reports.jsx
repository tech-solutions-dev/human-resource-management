import React, { useState } from 'react';

const dummyLeaveReport = [
  { status: 'approved', count: 10 },
  { status: 'pending', count: 5 },
  { status: 'rejected', count: 2 },
];

const dummyTransferReport = [
  { status: 'approved', count: 3 },
  { status: 'pending', count: 2 },
  { status: 'rejected', count: 1 },
];

const dummyUsersByDepartment = [
  { department_id: 1, count: 5, department: { name: 'Engineering' } },
  { department_id: 2, count: 3, department: { name: 'Marketing' } },
  { department_id: 3, count: 2, department: { name: 'HR' } },
];

export default function Reports() {
  const [tab, setTab] = useState('leaves');

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Reports</h2>
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${tab === 'leaves' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setTab('leaves')}
        >
          Leave Summary
        </button>
        <button
          className={`px-4 py-2 rounded ${tab === 'transfers' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setTab('transfers')}
        >
          Transfer Summary
        </button>
        <button
          className={`px-4 py-2 rounded ${tab === 'users' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setTab('users')}
        >
          Users by Department
        </button>
      </div>
      {tab === 'leaves' && (
        <div>
          <h3 className="font-semibold mb-2">Leave Status Summary</h3>
          <table className="w-full bg-white rounded shadow">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Count</th>
              </tr>
            </thead>
            <tbody>
              {dummyLeaveReport.map((item) => (
                <tr key={item.status}>
                  <td className="py-2 px-4">{item.status}</td>
                  <td className="py-2 px-4">{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {tab === 'transfers' && (
        <div>
          <h3 className="font-semibold mb-2">Transfer Status Summary</h3>
          <table className="w-full bg-white rounded shadow">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Count</th>
              </tr>
            </thead>
            <tbody>
              {dummyTransferReport.map((item) => (
                <tr key={item.status}>
                  <td className="py-2 px-4">{item.status}</td>
                  <td className="py-2 px-4">{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {tab === 'users' && (
        <div>
          <h3 className="font-semibold mb-2">Users by Department</h3>
          <table className="w-full bg-white rounded shadow">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4">Department</th>
                <th className="py-2 px-4">Count</th>
              </tr>
            </thead>
            <tbody>
              {dummyUsersByDepartment.map((item) => (
                <tr key={item.department_id}>
                  <td className="py-2 px-4">{item.department.name}</td>
                  <td className="py-2 px-4">{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
