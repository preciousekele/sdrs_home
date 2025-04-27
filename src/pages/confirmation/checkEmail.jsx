import React from 'react';
import { Link } from 'react-router-dom';
import './CheckEmail.css'; 

const CheckEmail = () => {
  return (
    <div className="check-email-container">
      <h2>Confirm Your Email</h2>
      <p>We've sent a confirmation link to your email. Please check your inbox.</p>
      <p>If you’ve already confirmed, <Link to="/login">click here to login</Link>.</p>
    </div>
  );
};

export default CheckEmail;
