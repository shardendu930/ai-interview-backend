import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

import api from "../services/api";

function Login() {
  const navigate = useNavigate();
  const { checkAuth } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/login", {
        email,
        password,
      });

      await checkAuth();

      toast.success("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login Failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >
        <h1 className="text-3xl font-bold text-center mb-2">
          AI Interview Platform
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Login to continue
        </p>

        <input
          type="email"
          placeholder="Enter Email"
          className="w-full border p-3 rounded mb-4 outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="w-full border p-3 rounded mb-6 outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>

        <p className="mt-5 text-center text-gray-600">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;