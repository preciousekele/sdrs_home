import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ConfirmEmail = () => {
  const [message, setMessage] = useState('Confirming email...');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let called = false;

    const confirm = async () => {
      const queryParams = new URLSearchParams(location.search);
      const token = queryParams.get('token');

      if (!token) {
        setMessage('');
        return;
      }
      
      if (called) return; // Prevent multiple calls
      called = true;

      try {
        const res = await axios.post('https://sdars-backend.onrender.com/api/auth/confirm-email', { token });

        setMessage('Email confirmed! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } catch (err) {
        const errorMsg = err.response?.data?.error || 'Email confirmation failed.';
        setMessage(errorMsg);
      }
    };

    confirm();
    return () => { called = true; };
  }, [location, navigate]);

  return (
    <div className="confirm-email-page" style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{
        textAlign: 'center',
        fontSize: '1.5rem',
        fontWeight: 'normal',
        margin: 0
      }}>
        {message}
      </h2>
    </div>
  );
};

export default ConfirmEmail;