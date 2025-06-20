import React, { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import EmployeeData from "../../components/admin/EmployeeData";

function EmployeeList() {
  return (
    <AdminLayout>
        <EmployeeData />
    </AdminLayout>
  );
}

export default EmployeeList;
