import axios from "axios";
import React, { useState, useEffect } from "react";

function EmployeeForm() {
  const department_id = localStorage.getItem("department_id");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    role: "",
    department_id: parseInt(department_id),
    employment_type: "",
    salary: "",
    phone: "",
    address: "",
    user_image: null,
    gender: "",
    date_of_birth: "", // Ensure department_id is a number
  });

  const [departmentOptions, setDepartmentOptions] = useState([
    { value: "", label: "Loading..." },
  ]);

  // Simulate fetching departments from API
  useEffect(() => {
    // Simulate async API call
    setTimeout(() => {
      const dummyDepartments = [
        { value: "1", label: "Engineering" },
        { value: "2", label: "HR" },
        { value: "3", label: "IT" },
      ];
      setDepartmentOptions([
        { value: "", label: "Select Department" },
        ...dummyDepartments,
      ]);
    }, 1000);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "user_image") {
      setFormData({ ...formData, user_image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const response = axios.post(
        "http://localhost:3001/api/auth/register",
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const { success, message } = response.data;
      if (success) {
        alert(message || "Employee added successfully");
        return;
      }
    } catch (error) {
      console.error("Error adding employee:", error);
      alert("Failed to add employee. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Employee</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium">First Name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
              className="mt-1 w-full p-2 border rounded"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
              className="mt-1 w-full p-2 border rounded"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="mt-1 w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="mt-1 w-full p-2 border rounded"
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="hr">HR</option>
            <option value="manager">Manager</option>
            <option value="employee">Employee</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Department</label>
          <select
            name="department_id"
            value={formData.department_id}
            onChange={handleChange}
            required
            className="mt-1 w-full p-2 border rounded"
          >
            {departmentOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Employment Type</label>
          <select
            name="employment_type"
            value={formData.employment_type}
            onChange={handleChange}
            required
            className="mt-1 w-full p-2 border rounded"
          >
            <option value="">Select Type</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="intern">Intern</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Salary</label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            required
            className="mt-1 w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="mt-1 w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="mt-1 w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="mt-1 w-full p-2 border rounded"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Date of Birth</label>
          <input
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
            required
            className="mt-1 w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Upload Image</label>
          <input
            type="file"
            name="user_image"
            accept="image/*"
            onChange={handleChange}
            className="mt-1 w-full"
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Save Employee
        </button>
      </form>
    </div>
  );
}

export default EmployeeForm;
