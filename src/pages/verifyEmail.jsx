import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Extract the token from the URL query parameters
        const params = new URLSearchParams(location.search);
        const token = params.get('token');

        if (!token) {
            setMessage('No verification token found.');
            setIsLoading(false);
            return;
        }

        // Make a request to verify the email with the token
        const verifyEmail = async () => {
            try {
                await axios.get(`http://localhost:5000/api/auth/verify-email?token=${token}`);
                setMessage('Email verified successfully! Redirecting to login...');
                setTimeout(() => {
                    navigate('/login');
                }, 3000); // Redirect to login page after 3 seconds
            } catch (error) {
                if (error.response) {
                    setMessage(error.response.data.error || 'Verification failed. Please try again.');
                } else {
                    setMessage('Error verifying email. Please try again later.');
                }
            } finally {
                setIsLoading(false);
            }
        };

        verifyEmail();
    }, [location, navigate]);

    return (
        <div className="verify-email-container">
            {isLoading ? (
                <p>Verifying your email...</p>
            ) : (
                <p>{message}</p>
            )}
        </div>
    );
};

export default VerifyEmail;
