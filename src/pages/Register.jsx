import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "boxicons";
import "boxicons/css/boxicons.min.css";

const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setError] = useState(null);
  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!values.name || !values.email || !values.password || !values.role) {
      setError("Please fill in all required fields.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://sdars-backend.onrender.com/api/auth/register",
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        navigate("/check-email");
      }
    } catch (err) {
      let errorMessage = "Registration failed. Please try again.";

      if (err.response) {
        errorMessage =
          err.response.data?.error ||
          err.response.data?.message ||
          `Server error (${err.response.status})`;
      } else if (err.request) {
        errorMessage = "No response from server. Check your connection.";
      } else {
        errorMessage = err.message;
      }

      setError(errorMessage);
      console.error("Registration Error Details:", {
        error: err,
        response: err.response?.data,
        status: err.response?.status,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <div className="header_text">
          <div className="text">Sign Up</div>
          <div className="underline"></div>
        </div>
        {err && <div className="error-message">{err}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <i className="bx bx-user"></i>
            <input
              type="text"
              className="input-field"
              id="name"
              placeholder="Username"
              name="name"
              onChange={handleChanges}
              value={values.name}
            />
          </div>

          <div className="input-box">
             <i className="bx bx-envelope"></i>
            <input
              type="email"
              className="input-field"
              id="email"
              placeholder="Email"
              name="email"
              onChange={handleChanges}
              value={values.email}
            />
          </div>

          <div className="input-box-password-box">
           <i className="bx bx-lock-alt"></i>
            <input
              type={showPassword ? "text" : "password"}
              className="input-field"
              id="password"
              placeholder="Password"
              name="password"
              onChange={handleChanges}
              value={values.password}
            />

            <i
              className={`bx ${
                showPassword ? "bx-hide" : "bx-show"
              } toggle-password`}
              onClick={togglePassword}
            ></i>
          </div>

          <div className="role-selection">
            <label className="role">Role</label>
            <input
              type="radio"
              id="admin"
              name="role"
              value="admin"
              checked={values.role === "admin"}
              onChange={handleChanges}
              required
            />
            <label htmlFor="admin">Admin</label>
            <input
              type="radio"
              id="user"
              name="role"
              value="user"
              checked={values.role === "user"}
              onChange={handleChanges}
              required
            />
            <label htmlFor="user">User</label>
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Registering..." : "Sign Up"}
          </button>
        </form>

        <div className="login-link">
          <p>Already have an account?</p>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
