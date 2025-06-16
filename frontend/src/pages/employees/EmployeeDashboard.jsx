import React, { useState } from "react";

// Dummy leave data (matches GET /api/leaves/my response)
const dummyLeaves = [
  {
    leave_id: 1,
    leave_type: "annual",
    start_date: "2024-06-01",
    end_date: "2024-06-10",
    reason: "Family vacation",
    status: "approved",
    year: "2024",
  },
  {
    leave_id: 2,
    leave_type: "sick",
    start_date: "2024-05-15",
    end_date: "2024-05-17",
    reason: "Flu",
    status: "rejected",
    year: "2024",
  },
];

function EmployeeDashboard() {
  const [leaves] = useState(dummyLeaves);

  return (
    <>
      {/* Content */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Employee Dashboard</h1>
        {/* Example: Grid cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card title="Total Leaves" count={leaves.length} />
          <Card title="Approved" count={leaves.filter((l) => l.status === "approved").length} />
          <Card title="Rejected" count={leaves.filter((l) => l.status === "rejected").length} />
        </div>
        {/* Recent Leaves Table */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-2">Recent Leave Applications</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow rounded-xl">
              <thead className="bg-blue-800 text-white">
                <tr>
                  <th className="py-2 px-4 text-left">Type</th>
                  <th className="py-2 px-4 text-left">Start</th>
                  <th className="py-2 px-4 text-left">End</th>
                  <th className="py-2 px-4 text-left">Reason</th>
                  <th className="py-2 px-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((leave) => (
                  <tr key={leave.leave_id} className="border-t">
                    <td className="py-2 px-4">{leave.leave_type}</td>
                    <td className="py-2 px-4">{leave.start_date}</td>
                    <td className="py-2 px-4">{leave.end_date}</td>
                    <td className="py-2 px-4">{leave.reason}</td>
                    <td className="py-2 px-4 capitalize">{leave.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    </>
  );
}

function Card({ title, count }) {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      <p className="text-2xl font-bold text-blue-600 mt-2">{count}</p>
    </div>
  );
}

export default EmployeeDashboard;
