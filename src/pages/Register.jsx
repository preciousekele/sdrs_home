import React, { useState } from 'react';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'boxicons';
import "boxicons/css/boxicons.min.css";

const Register = () => {
    const [values, setValues] = useState({
        name: '',  
        email: '',
        password: '',
        role: 'user'
    });
    
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);  
    const [err, setError] = useState(null);  // New success message state
    const navigate = useNavigate();

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleChanges = (e) => {
        const { name, value } = e.target;
        setValues(prev => ({
            ...prev,
            [name]: value
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
        setError('');
    
        try {
            const response = await axios.post(
                'http://localhost:5000/api/auth/register',
                values,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
    
            if (response.data.success) {
                navigate('/check-email');
            }
        } catch (err) {
            let errorMessage = "Registration failed. Please try again.";
    
            if (err.response) {
                errorMessage = err.response.data?.error || err.response.data?.message || `Server error (${err.response.status})`;
            } else if (err.request) {
                errorMessage = "No response from server. Check your connection.";
            } else {
                errorMessage = err.message;
            }
    
            setError(errorMessage);
            console.error("Registration Error Details:", {
                error: err,
                response: err.response?.data,
                status: err.response?.status
            });
        } finally {
            setIsLoading(false);
        }
    }
    

    return (
        <div className="register-container">
            <div className="register-form">
            {err && <div className="error-message">{err}</div>}
                <form onSubmit={handleSubmit}>
                    <h4>Register</h4>                
                    <div className="input-box">
                        <label htmlFor="name">Full Name</label>
                        <input 
                            type="text" 
                            className="input-field" 
                            id="name" 
                            placeholder="Enter your Full Name" 
                            name="name" 
                            onChange={handleChanges} 
                            value={values.name}
                        />
                        <i className="bx bx-user"></i>
                    </div>
                    
                    <div className="input-box">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            className="input-field" 
                            id="email" 
                            placeholder="Enter your Email" 
                            name="email" 
                            onChange={handleChanges} 
                            value={values.email}
                        />
                        <i className='bx bx-envelope mt-3'></i>
                    </div>
                    
                    <div className="input-box password-box">
                        <label htmlFor="password">Password</label>
                        <input 
                            type={showPassword ? "text" : "password"}  
                            className="input-field" 
                            id="password" 
                            placeholder="Enter your Password" 
                            name="password" 
                            onChange={handleChanges} 
                            value={values.password}
                        />
                        <i className="bx bx-lock-alt"></i>
                        <i 
                            className={`bx ${showPassword ? 'bx-hide' : 'bx-show'} toggle-password`} 
                            onClick={togglePassword}
                        ></i> 
                    </div>

                    <div className='role-selection'>
                        <label className='role'>Role</label>
                        <input type="radio" id="admin" name="role" value="admin" checked={values.role === "admin"} onChange={handleChanges} required /> 
                        <label htmlFor="admin">Admin</label>
                        <input type="radio" id="user" name="role" value="user" checked={values.role === "user"} onChange={handleChanges} required /> 
                        <label htmlFor="user">User</label>
                    </div>
                    
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Registering...' : 'Sign Up'}
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
