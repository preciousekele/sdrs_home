import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "boxicons/css/boxicons.min.css";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // React Router navigate hook

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        values,
        { headers: { 'Content-Type': 'application/json' } }
      );
  
      // 1. FIRST DEBUG POINT: Verify API response
      console.log("API Response:", response.data);  // <-- Add here
  
      if (response.data?.token) {
        // 2. Store data
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
  
        // 3. SECOND DEBUG POINT: Verify storage
        console.log("Token saved:", localStorage.getItem("token")); // <-- Add here
        console.log("User saved:", localStorage.getItem("user"));   // Optional check
  
        // 4. Add slight delay to ensure storage completes
        await new Promise(resolve => setTimeout(resolve, 50));
  
        // 5. Redirect
        if (response.data.user?.role === "admin") {
          window.location.href = `http://localhost:3001?token=${encodeURIComponent(response.data.token)}&user=${encodeURIComponent(JSON.stringify(response.data.user))}`; 
        } else {
          navigate("/user-dashboard", { replace: true });
        }
      } else {
        throw new Error("No token received in response");
      }
    } catch (err) {
      let errorMessage = "An error occurred during login.";
  
      if (err.response) {
        // Handle specific error status codes
        switch (err.response.status) {
          case 400:
            errorMessage = "Invalid email or password format";
            break;
          case 401:
            errorMessage = "Invalid email or password";
            break;
          case 500:
            errorMessage = "Server error. Please try again later.";
            break;
          default:
            errorMessage = err.response.data?.message || errorMessage;
        }
      } else if (err.request) {
        errorMessage = "No response from server. Check your connection.";
      }
  
      setError(errorMessage); // Show the error message
    } finally {
      setIsLoading(false); // Set loading state to false after request completes
    }
  };
  

  return (
    <div className="login-container">
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <h4>Login</h4>
          {error && <p className="error-message">{error}</p>}
          <div className="input-box">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="input-field"
              id="email"
              placeholder="Enter your Email"
              name="email"
              value={values.email}
              onChange={handleChanges}
              required
            />
            <i className="bx bx-user"></i>
          </div>
          <div className="input-box password-box">
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="input-field"
              id="password"
              placeholder="Enter your Password"
              name="password"
              value={values.password}
              onChange={handleChanges}
              required
            />
            <i className="bx bx-lock-alt"></i>
            <i
              className={`bx ${showPassword ? "bx-hide" : "bx-show"} toggle-password`}
              onClick={togglePassword}
            ></i>
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="login-link">
          <p>Don't Have an Account?</p>
          <Link to="/register">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
