import React, { useState } from "react";
import AdminLayout from "../layouts/AdminLayout";

// Dummy user profile data (matches GET /api/auth/profile response)
const dummyProfile = {
  user_id: 101,
  username: "john.doe",
  email: "john.doe@company.com",
  first_name: "John",
  last_name: "Doe",
  role: "employee",
  department: { department_id: 1, name: "Engineering" },
  employment_type: "full-time",
  salary: 50000,
  phone: "+1234567890",
  address: "123 Main St",
  is_active: true
};

function ProfileEdit() {
  const [form, setForm] = useState({
    first_name: dummyProfile.first_name,
    last_name: dummyProfile.last_name,
    phone: dummyProfile.phone,
    address: dummyProfile.address
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
    console.log("Updating profile:", form);
  };

  return (
    <AdminLayout>
      <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow mt-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Profile</h2>
        {submitted && (
          <div className="mb-4 text-green-700 bg-green-100 p-2 rounded-md">
            (Dummy) Profile updated successfully!
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">First Name</label>
            <input
              type="text"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Phone</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Address</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800"
          >
            Save Changes
          </button>
        </form>
        {/* TODO: Integrate with real API */}
      </div>
    </AdminLayout>
  );
}

export default ProfileEdit;
