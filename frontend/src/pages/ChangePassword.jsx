import React, { useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import axios from "axios";

function ChangePassword() {
  const baseURL = process.env.REACT_APP_API_BASE_URL;

  const [form, setForm] = useState({
    old_password: "",
    new_password: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    try {
      const response = await axios.post(
        `${baseURL}/api/auth/change-password`,
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.success) {
        alert(response.data.message);
        setForm({
          old_password: "",
          new_password: "",
        });
      }
    } catch (error) {
      console.log();
    }
    console.log("Changing password:", form);
  };

  return (
    <AdminLayout>
      <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow mt-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Change Password
        </h2>
        {submitted && (
          <div className="mb-4 text-green-700 bg-green-100 p-2 rounded-md">
            Password changed successfully!
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Old Password</label>
            <input
              type="password"
              name="old_password"
              value={form.old_password}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">New Password</label>
            <input
              type="password"
              name="new_password"
              value={form.new_password}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800"
          >
            Change Password
          </button>
        </form>
        {/* TODO: Integrate with real API */}
      </div>
    </AdminLayout>
  );
}

export default ChangePassword;
