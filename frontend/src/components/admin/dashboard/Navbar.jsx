import React from "react";
import { Bell, UserCircle } from "lucide-react";

export default function Navbar() {
  return (
    <div className="w-full bg-white shadow-md px-4 py-3 flex items-center justify-between">
      {/* Left: Logo/Title */}
      <div className="text-xl font-semibold text-blue-700">HRM System</div>

      {/* Right: Icons / Profile */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <button className="relative">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
            3
          </span>
        </button>

        {/* User */}
        <div className="flex items-center space-x-2 cursor-pointer">
          <UserCircle className="w-6 h-6 text-gray-600" />
          <span className="hidden sm:inline text-sm text-gray-700">Admin</span>
        </div>
      </div>
    </div>
  );
}
