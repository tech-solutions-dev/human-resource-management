import React from 'react';

const dummyProfile = {
  user_id: 15,
  username: 'employee.employee',
  email: 'employee@hrms.com',
  first_name: 'EyeAm',
  last_name: 'Employee',
  role: 'employee',
  department: {
    department_id: 2,
    name: 'Marketing',
    code: 'MKT',
    description: 'Marketing and advertising',
  },
  employment_type: 'full-time',
  salary: '30000.00',
  phone: '+1234567890',
  address: '123 Main St',
  is_active: true,
  last_login: '2025-06-15T11:30:37.000Z',
  user_image: 'default_profile.png',
  gender: 'male',
  date_of_birth: '2004-07-09',
  hire_date: '2025-06-15',
  createdAt: '2025-06-15T10:44:22.000Z',
  updatedAt: '2025-06-15T11:30:37.000Z',
};

export default function Profile() {
  const p = dummyProfile;
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-50 py-8">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-3xl flex flex-col md:flex-row gap-8">
        <div className="flex flex-col items-center md:items-start md:w-1/3">
          <img
            src={`/${p.user_image}`}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-blue-200 object-cover mb-4 shadow"
          />
          <div className="text-center md:text-left">
            <div className="text-xl font-bold text-blue-700 mb-1">
              {p.first_name} {p.last_name}
            </div>
            <div className="text-gray-500 text-sm mb-2">@{p.username}</div>
            <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold mb-2">
              {p.role}
            </div>
          </div>
        </div>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <div>
            <div className="text-gray-500 text-xs">Email</div>
            <div className="font-medium">{p.email}</div>
          </div>
          <div>
            <div className="text-gray-500 text-xs">Phone</div>
            <div className="font-medium">{p.phone}</div>
          </div>
          <div>
            <div className="text-gray-500 text-xs">Department</div>
            <div className="font-medium">{p.department.name}</div>
          </div>
          <div>
            <div className="text-gray-500 text-xs">Employment Type</div>
            <div className="font-medium">{p.employment_type}</div>
          </div>
          <div>
            <div className="text-gray-500 text-xs">Salary</div>
            <div className="font-medium">${p.salary}</div>
          </div>
          <div>
            <div className="text-gray-500 text-xs">Gender</div>
            <div className="font-medium">{p.gender}</div>
          </div>
          <div>
            <div className="text-gray-500 text-xs">Date of Birth</div>
            <div className="font-medium">{p.date_of_birth}</div>
          </div>
          <div>
            <div className="text-gray-500 text-xs">Hire Date</div>
            <div className="font-medium">{p.hire_date}</div>
          </div>
          <div className="md:col-span-2">
            <div className="text-gray-500 text-xs">Address</div>
            <div className="font-medium">{p.address}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
