import React, { useState } from 'react';

const dummyTransfers = [
  {
    transfer_id: 1,
    from_department_id: 1,
    to_department_id: 2,
    reason: 'Seeking new challenges',
    status: 'pending',
  },
  {
    transfer_id: 2,
    from_department_id: 2,
    to_department_id: 3,
    reason: 'Closer to home',
    status: 'approved',
  },
];

export default function TransferList() {
  const [transfers, setTransfers] = useState(dummyTransfers);

  const handleCancel = (id) => {
    setTransfers((prev) =>
      prev.map((transfer) =>
        transfer.transfer_id === id ? { ...transfer, status: 'cancelled' } : transfer
      )
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Transfers</h2>
      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-100">
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
              <td className="py-2 px-4">{transfer.from_department_id}</td>
              <td className="py-2 px-4">{transfer.to_department_id}</td>
              <td className="py-2 px-4">{transfer.reason}</td>
              <td className="py-2 px-4">{transfer.status}</td>
              <td className="py-2 px-4">
                {transfer.status === 'pending' && (
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleCancel(transfer.transfer_id)}
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
