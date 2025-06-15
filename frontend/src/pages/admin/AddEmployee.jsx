import React, { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import EmployeeForm from "../../components/admin/EmployeeForm";

function AddEmployee() {
  return (
    <AdminLayout>
          <EmployeeForm />
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

export default AddEmployee;
