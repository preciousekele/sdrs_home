        const verifyEmail = async () => {
            try {
                await axios.get(`https://sdars-backend.onrender.com/api/auth/verify-email?token=${token}`);
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
