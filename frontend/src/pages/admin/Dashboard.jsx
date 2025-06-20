import React from "react";
import AdminLayout from "../../layouts/AdminLayout";

function Dashboard() {
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Dashboard</h1>
      <p className="text-gray-600">
        Welcome to the HRM System Dashboard. Here you can manage employees,
        view reports, and configure settings.
      </p>

      {/* Example: Grid cards */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title="Total Employees" count="120" />
        <Card title="On Leave" count="8" />
        <Card title="Pending Requests" count="4" />
      </div>
    </AdminLayout>
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

export default Dashboard;
