import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = formData;
    if (!username || !password) {
      setError("User and password are required.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        formData
      );
      const { success, message, data } = response.data;
      if (!success) {
        setError(message || "Login failed. Please try again.");
        return;
      }
      const { token, user } = data;

      if (user?.user_id) {
        localStorage.setItem("user_id", user.user_id);
      } else {
        console.warn("No user ID found in user object.");
      }

      localStorage.setItem("token", token);

      localStorage.setItem("token", token);

      if (user.role === "admin") {
        navigate("/dashboard");
      } else if (user.role === "employee") {
        navigate("/employeeDashboard");
      } else {
        setError("Invalid user role.");
        return;
      }
      setError("");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Invalid username or password.");
      } else {
        setError("An error occurred while logging in. Please try again.");
      }
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 sm:px-6 ">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg sm:max-w-md md:max-w-lg  sm:p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          HRM System Login
        </h2>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-100 p-2 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="text"
              name="username"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.username}
              onChange={handleChange}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.password}
                name="password"
                onChange={handleChange}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-gray-500 text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600 text-center">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Forget Password
          </Link>
        </p>
      </div>
    </div>
  );
}
