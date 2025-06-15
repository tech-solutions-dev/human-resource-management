import React, { useState } from "react";
import EmployeeLayout from "../../layouts/EmployeeLayout";

function TransferRequest() {
  const [form, setForm] = useState({
    to_department_id: "",
    reason: ""
  });
  const [submitted, setSubmitted] = useState(false);

  // Dummy department options
  const departmentOptions = [
    { value: "2", label: "Product" },
    { value: "3", label: "HR" },
    { value: "4", label: "Finance" }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // TODO: Replace with real API call
    console.log("Submitting transfer request:", form);
  };

  return (
    <EmployeeLayout>
      <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow mt-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Transfer Request</h2>
        {submitted && (
          <div className="mb-4 text-green-700 bg-green-100 p-2 rounded-md">
            (Dummy) Transfer request submitted!
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">To Department</label>
            <select
              name="to_department_id"
              value={form.to_department_id}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            >
              <option value="">Select Department</option>
              {departmentOptions.map((d) => (
                <option key={d.value} value={d.value}>{d.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Reason</label>
            <textarea
              name="reason"
              value={form.reason}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800"
          >
            Submit Request
          </button>
        </form>
        {/* TODO: Integrate with real API */}
      </div>
    </EmployeeLayout>
  );
}

export default TransferRequest;
