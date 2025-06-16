import React, { useState } from 'react';

const dummyLeaves = [
  {
    leave_id: 1,
    leave_type: 'annual',
    start_date: '2024-06-01',
    end_date: '2024-06-10',
    reason: 'Family vacation',
    status: 'pending',
    year: '2024',
  },
  {
    leave_id: 2,
    leave_type: 'sick',
    start_date: '2024-05-10',
    end_date: '2024-05-12',
    reason: 'Flu',
    status: 'approved',
    year: '2024',
  },
];

export default function LeaveList() {
  const [leaves, setLeaves] = useState(dummyLeaves);

  const handleCancel = (id) => {
    setLeaves((prev) =>
      prev.map((leave) =>
        leave.leave_id === id ? { ...leave, status: 'cancelled' } : leave
      )
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Leaves</h2>
      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4">Type</th>
            <th className="py-2 px-4">Start</th>
            <th className="py-2 px-4">End</th>
            <th className="py-2 px-4">Reason</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave.leave_id}>
              <td className="py-2 px-4">{leave.leave_type}</td>
              <td className="py-2 px-4">{leave.start_date}</td>
              <td className="py-2 px-4">{leave.end_date}</td>
              <td className="py-2 px-4">{leave.reason}</td>
              <td className="py-2 px-4">{leave.status}</td>
              <td className="py-2 px-4">
                {leave.status === 'pending' && (
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleCancel(leave.leave_id)}
                  >
                    Cancel
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
