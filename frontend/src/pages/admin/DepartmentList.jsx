import React, { useState, useEffect } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import DepartmentData from "../../components/admin/DepartmentData";

function DepartmentList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    manager_id: "",
    budget: "",
    location: "",
    is_active: true,
  });

  const [managerOptions, setManagerOptions] = useState([
    { value: "", label: "Loading..." }
  ]);

  // Simulate fetching managers from API
  useEffect(() => {
    setTimeout(() => {
      const dummyManagers = [
        { value: "101", label: "John Doe" },
        { value: "102", label: "Jane Smith" },
        { value: "103", label: "Alice Johnson" },
      ];
      setManagerOptions([
        { value: "", label: "Select Manager" },
        ...dummyManagers,
      ]);
    }, 1000);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Replace with real API call
    alert("(Dummy) Department created/updated!");
  };

  return (
    <AdminLayout>
        <DepartmentData />
        <button
          className="mt-6 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
          onClick={() => setIsModalOpen(true)}
        >
          Add Department
        </button>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Add Department</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-1 font-medium">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Code</label>
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Manager</label>
                  <select
                    name="manager_id"
                    value={formData.manager_id}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                    required
                  >
                    {managerOptions.map((m) => (
                      <option key={m.value} value={m.value}>{m.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-1 font-medium">Budget</label>
                  <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                    required
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label className="font-medium">Active</label>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
    </AdminLayout>
  );
}

export default DepartmentList;
