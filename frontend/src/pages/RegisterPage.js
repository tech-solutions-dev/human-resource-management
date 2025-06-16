import React, { useState } from 'react';

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    role: 'employee',
    department_id: '',
    employment_type: 'full-time',
    salary: '',
    phone: '',
    address: '',
    user_image: 'default_profile.png',
    gender: 'male',
    date_of_birth: '',
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    if (form.username && form.email && form.password) {
      setSuccess(true);
      setError('');
      setTimeout(() => setSuccess(false), 2000);
    } else {
      setError('Please fill all required fields');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-6">Register</h2>
        <div className="grid grid-cols-2 gap-4">
          <input name="username" placeholder="Username" value={form.username} onChange={handleChange} className="border rounded px-2 py-1" />
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="border rounded px-2 py-1" />
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="border rounded px-2 py-1" />
          <input name="first_name" placeholder="First Name" value={form.first_name} onChange={handleChange} className="border rounded px-2 py-1" />
          <input name="last_name" placeholder="Last Name" value={form.last_name} onChange={handleChange} className="border rounded px-2 py-1" />
          <select name="role" value={form.role} onChange={handleChange} className="border rounded px-2 py-1">
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="hr">HR</option>
          </select>
          <input name="department_id" placeholder="Department ID" value={form.department_id} onChange={handleChange} className="border rounded px-2 py-1" />
          <select name="employment_type" value={form.employment_type} onChange={handleChange} className="border rounded px-2 py-1">
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
          </select>
          <input name="salary" placeholder="Salary" value={form.salary} onChange={handleChange} className="border rounded px-2 py-1" />
          <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} className="border rounded px-2 py-1" />
          <input name="address" placeholder="Address" value={form.address} onChange={handleChange} className="border rounded px-2 py-1" />
          <select name="gender" value={form.gender} onChange={handleChange} className="border rounded px-2 py-1">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <input name="date_of_birth" placeholder="Date of Birth" value={form.date_of_birth} onChange={handleChange} className="border rounded px-2 py-1" />
        </div>
        <button type="submit" className="mt-6 w-full bg-blue-600 text-white px-4 py-2 rounded">Register</button>
        {success && <div className="text-green-600 mt-2">Registration successful (simulated)</div>}
        {error && <div className="text-red-600 mt-2">{error}</div>}
      </form>
    </div>
  );
}
