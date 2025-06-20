import React, { useState, useEffect } from "react";
import AdminLayout from "../layouts/AdminLayout";
import axios from "axios";

function ProfileEdit() {
  const employee_id = localStorage.getItem("user_id");
  const baseURL = process.env.REACT_APP_API_BASE_URL;

  const [employee, setEmployee] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/api/users/${employee_id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setEmployee(response.data.user); // Adjust if backend uses "users"
        } else {
          console.error("Failed to fetch employee:", response.data.message);
          setError("Could not load profile data.");
        }
      } catch (error) {
        console.error("Error fetching employee:", error);
        setError("Server error while loading profile.");
      }
    };

    fetchEmployee();
  }, [baseURL, employee_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(false);
    setError("");

    try {
      const response = await axios.put(
        `${baseURL}/api/users/${employee_id}`,
        employee,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setSubmitted(true);
      } else {
        setError("Failed to update profile.");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("An error occurred while updating profile.");
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow mt-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Profile</h2>

        {error && (
          <div className="mb-4 text-red-700 bg-red-100 p-2 rounded-md">
            {error}
          </div>
        )}

        {submitted && (
          <div className="mb-4 text-green-700 bg-green-100 p-2 rounded-md">
            Profile updated successfully!
          </div>
        )}

        {employee ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">First Name</label>
              <input
                type="text"
                name="first_name"
                value={employee.first_name}
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
                value={employee.last_name}
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
                value={employee.phone || ""}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Address</label>
              <input
                type="text"
                name="address"
                value={employee.address || ""}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800"
            >
              Save Changes
            </button>
          </form>
        ) : (
          <p className="text-center text-gray-600">Loading profile...</p>
        )}
      </div>
    </AdminLayout>
  );
}

export default ProfileEdit;
