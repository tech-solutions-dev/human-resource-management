import React, { useState } from 'react';

const dummyTransfers = [
  {
    transfer_id: 1,
    user_id: 101,
    from_department_id: 1,
    to_department_id: 2,
    reason: 'Seeking new challenges',
    status: 'pending',
    user: { first_name: 'John', last_name: 'Doe' },
  },
  {
    transfer_id: 2,
    user_id: 102,
    from_department_id: 2,
    to_department_id: 3,
    reason: 'Closer to home',
    status: 'approved',
    user: { first_name: 'Alice', last_name: 'Smith' },
  },
];

export default function TransferManagement() {
  const [transfers, setTransfers] = useState(dummyTransfers);

  const handleApprove = (id) => {
    setTransfers((prev) =>
      prev.map((transfer) =>
        transfer.transfer_id === id ? { ...transfer, status: 'approved' } : transfer
      )
    );
  };
  const handleReject = (id) => {
    setTransfers((prev) =>
      prev.map((transfer) =>
        transfer.transfer_id === id ? { ...transfer, status: 'rejected' } : transfer
      )
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Transfer Management</h2>
      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4">Employee</th>
            <th className="py-2 px-4">From Dept</th>
            <th className="py-2 px-4">To Dept</th>
            <th className="py-2 px-4">Reason</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {transfers.map((transfer) => (
            <tr key={transfer.transfer_id}>
              <td className="py-2 px-4">{transfer.user.first_name} {transfer.user.last_name}</td>
              <td className="py-2 px-4">{transfer.from_department_id}</td>
              <td className="py-2 px-4">{transfer.to_department_id}</td>
              <td className="py-2 px-4">{transfer.reason}</td>
              <td className="py-2 px-4">{transfer.status}</td>
              <td className="py-2 px-4 flex gap-2">
                {transfer.status === 'pending' && (
                  <>
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded"
                      onClick={() => handleApprove(transfer.transfer_id)}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => handleReject(transfer.transfer_id)}
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
