import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
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
        "https://sdars-backend.onrender.com/api/auth/login",
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.data?.token) {
        throw new Error("No token received");
      }

      // Store auth data locally for fallback
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Brief delay to ensure storage completes
      await new Promise((resolve) => setTimeout(resolve, 50));

      // Create URL with token and user data as parameters
      const token = encodeURIComponent(response.data.token);
      const user = encodeURIComponent(JSON.stringify(response.data.user));

      const targetUrl =
        response.data.user?.role === "admin"
        ? `https://mcu-sdars-admin.vercel.app/?token=${token}&user=${user}`
        : `https://mcu-sdars-user.vercel.app/?token=${token}&user=${user}`;

      console.log("Redirecting to:", targetUrl);

      // Use window.location.replace for better redirect behavior
      window.location.replace(targetUrl);
    } catch (err) {
      let errorMessage = "Login failed. Please try again.";

      if (err.response && err.response.data?.error) {
        errorMessage = err.response.data.error;
      }

      setError(errorMessage);
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="header_text">
          <div className="text">Login</div>
          <div className="underline"></div>
        </div>

        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}

          <div className="input-box">
            <i className="bx bx-envelope"></i>
            <input
              type="email"
              className="input-field"
              placeholder="Email"
              name="email"
              value={values.email}
              onChange={handleChanges}
              required
              autoComplete="email"
            />
          </div>

          <div className="input-box-password-box">
            <i className="bx bx-lock-alt"></i>
            <input
              type={showPassword ? "text" : "password"}
              className="input-field"
              placeholder="Password"
              name="password"
              value={values.password}
              onChange={handleChanges}
              required
              autoComplete="current-password"
            />

            <i
              className={`bx ${
                showPassword ? "bx-hide" : "bx-show"
              } toggle-password`}
              onClick={togglePassword}
              aria-label={showPassword ? "Hide password" : "Show password"}
            ></i>
          </div>

          <button type="submit" disabled={isLoading} aria-busy={isLoading}>
            {isLoading ? (
              <>
                <span className="spinner"></span> Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="login-link">
          <p>Don't have an account?</p>
          <Link to="/register">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
