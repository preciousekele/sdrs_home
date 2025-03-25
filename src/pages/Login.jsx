import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    // State to handle form inputs
    const [values, setValues] = useState({
        email: "",
        password: ""
    });

    // State for error messages
    const [error, setError] = useState("");

    const navigate = useNavigate();

    // Function to handle input changes
    const handleChanges = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors

        try {
            const response = await axios.post("http://localhost:3000/auth/login", values);

            if (response.status === 200) {
                const { token, role } = response.data;

                // Store token and role in localStorage
                localStorage.setItem("token", token);
                localStorage.setItem("role", role);

                // Redirect based on role
                if (role === "admin") {
                    navigate("/admin-dashboard");
                } else {
                    navigate("/user-dashboard");
                }
            }
        } catch (err) {
            const errorMessage =
                err.response?.data?.message || "An unexpected error occurred. Please try again.";
            
            setError(errorMessage);
            console.error("Login Error:", errorMessage);
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <form onSubmit={handleSubmit}>
                    <h4>Login</h4>
                    {error && <p className="error-message">{error}</p>} {/* Display error messages */}
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter Email"
                            name="email"
                            onChange={handleChanges}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter Password"
                            name="password"
                            onChange={handleChanges}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
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
