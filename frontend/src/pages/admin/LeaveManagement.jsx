import React, { useState } from 'react';

const dummyLeaves = [
  {
    leave_id: 1,
    user_id: 101,
    leave_type: 'annual',
    start_date: '2024-06-01',
    end_date: '2024-06-10',
    reason: 'Family vacation',
    status: 'pending',
    year: '2024',
    user: { first_name: 'John', last_name: 'Doe' },
  },
  {
    leave_id: 2,
    user_id: 102,
    leave_type: 'sick',
    start_date: '2024-05-10',
    end_date: '2024-05-12',
    reason: 'Flu',
    status: 'approved',
    year: '2024',
    user: { first_name: 'Alice', last_name: 'Smith' },
  },
];

export default function LeaveManagement() {
  const [leaves, setLeaves] = useState(dummyLeaves);

  const handleApprove = (id) => {
    setLeaves((prev) =>
      prev.map((leave) =>
        leave.leave_id === id ? { ...leave, status: 'approved' } : leave
      )
    );
  };
  const handleReject = (id) => {
    setLeaves((prev) =>
      prev.map((leave) =>
        leave.leave_id === id ? { ...leave, status: 'rejected' } : leave
      )
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Leave Management</h2>
      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4">Employee</th>
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
              <td className="py-2 px-4">{leave.user.first_name} {leave.user.last_name}</td>
              <td className="py-2 px-4">{leave.leave_type}</td>
              <td className="py-2 px-4">{leave.start_date}</td>
              <td className="py-2 px-4">{leave.end_date}</td>
              <td className="py-2 px-4">{leave.reason}</td>
              <td className="py-2 px-4">{leave.status}</td>
              <td className="py-2 px-4 flex gap-2">
                {leave.status === 'pending' && (
                  <>
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded"
                      onClick={() => handleApprove(leave.leave_id)}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => handleReject(leave.leave_id)}
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
