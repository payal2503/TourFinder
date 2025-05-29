import React, { useState } from "react";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import background from "../assets/images/Home.webp";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5555/login", formData);
      onLogin(formData.username);
      localStorage.setItem("token", response.data.token);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid username or password");
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
      console.log("Google credential received:", credential); // 👈
  
      const response = await fetch("http://localhost:5555/google-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: credential }),
      });
  
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Failed to login with Google");
      }
  
      const data = await response.json();
      alert("Google login successful.");
      localStorage.setItem("token", data.token);
      const user = JSON.parse(atob(data.token.split('.')[1]));
      localStorage.setItem("username", user.username);
      onLogin(user.username);
      navigate("/");
    } catch (error) {
      console.error("Google login failed", error);
      setError(error.message || "Google login failed");
    }
  };
  
  

  return (
    <div
      className="h-screen absolute top-0 w-full flex bg-center items-center justify-center bg-cover"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="bg-white/10 backdrop-blur rounded-lg p-8 shadow-lg max-w-sm w-full">
        <h2 className="text-3xl font-semibold text-white text-center mb-6">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-200 mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-white"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-white"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Login
          </button>
        </form>

        <div className="my-4 flex items-center justify-center text-white">or</div>

        <div className="flex justify-center">
          <GoogleLogin onSuccess={handleGoogleLoginSuccess} onError={() => setError("Google login failed")} />
        </div>

        <div className="mt-4 text-center text-sm text-gray-300">
          <p>
            Don&apos;t have an account?{" "}
            <a href="/register" className="text-blue-400 hover:underline">
              Register
            </a>
          </p>
          <p>
            Forgot your password?{" "}
            <a href="#forgot" className="text-blue-400 hover:underline">
              Reset it
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
