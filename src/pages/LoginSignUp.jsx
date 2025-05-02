import React, { useState } from "react";
import "./LoginSignUp.css";

import "boxicons/css/boxicons.min.css";
import user_icon from "../asset/person.png";
import password_icon from "../asset/password.png";
import email_icon from "../asset/email.png";

const LoginSignUp = () => {
   const [values, setValues] = useState({
          name: '',  
          email: '',
          password: '',
          role: 'user'
      });

  const [action, setAction] = useState("Sign Up");

  const handleChanges = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container">
      <div className="header_text">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === "Login" ? (
          <div></div>
        ) : (
          <div className="input">
            <img src={user_icon} alt="" />
            <input 
              type="text" 
              placeholder="Username" 
              name="username"
              onChange={handleChanges}
            />
          </div>
        )}

        <div className="input">
          <img src={email_icon} alt="" />
          <input 
            type="email" 
            placeholder="Email" 
            name="email"
            onChange={handleChanges}
          />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input 
            type="password" 
            placeholder="Password" 
            name="password"
            onChange={handleChanges}
          />
        </div>
        
        {action === "Sign Up" && (
          <div className='role-selection'>
            <label className='role'>Select Role</label>
            <div className="radio-group">
              <label className={`radio-option ${values.role === "admin" ? "selected" : ""}`}>
                <input 
                  type="radio" 
                  id="admin" 
                  name="role" 
                  value="admin" 
                  checked={values.role === "admin"} 
                  onChange={handleChanges}
                  required
                /> 
                <span>Admin</span>
              </label>
              <label className={`radio-option ${values.role === "user" ? "selected" : ""}`}>
                <input 
                  type="radio" 
                  id="user" 
                  name="role" 
                  value="user" 
                  checked={values.role === "user"} 
                  onChange={handleChanges}
                  required
                /> 
                <span>User</span>
              </label>
            </div>
          </div>
        )}
      </div>
      
      {action === "Sign Up" ? (
        <div></div>
      ) : (
        <div className="forgot-password">
          Lost Password? <span>click here</span>
        </div>
      )}

      <div className="submit-container">
        
        <div
          className={action === "Login" ? "submit gray" : "submit"}
          onClick={() => {
            setAction("Sign Up");
          }}
        >
          Sign Up
        </div>
        <div
          className={action === "Sign Up" ? "submit gray" : "submit"}
          onClick={() => {
            setAction("Login");
          }}
        >
          Login
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;