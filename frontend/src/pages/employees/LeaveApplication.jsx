import React, { useState } from "react";
import EmployeeLayout from "../../layouts/EmployeeLayout";

function LeaveApplication() {
  const [form, setForm] = useState({
    leave_type: "annual",
    start_date: "",
    end_date: "",
    reason: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // TODO: Replace with real API call
    console.log("Submitting leave application:", form);
  };

  return (
    <EmployeeLayout>
      <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow mt-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Leave Application</h2>
        {submitted && (
          <div className="mb-4 text-green-700 bg-green-100 p-2 rounded-md">
            (Dummy) Leave application submitted!
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Leave Type</label>
            <select
              name="leave_type"
              value={form.leave_type}
              onChange={handleChange}
              className="w-full border rounded p-2"
            >
              <option value="annual">Annual</option>
              <option value="sick">Sick</option>
              <option value="casual">Casual</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Start Date</label>
            <input
              type="date"
              name="start_date"
              value={form.start_date}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">End Date</label>
            <input
              type="date"
              name="end_date"
              value={form.end_date}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
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
            Submit Application
          </button>
        </form>
        {/* TODO: Integrate with real API */}
      </div>
    </EmployeeLayout>
  );
}

export default LeaveApplication;
