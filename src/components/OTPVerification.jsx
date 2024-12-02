import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../api/apiService';

const OTPVerification = () => {
  const [otp, setOtp] = useState('');
  const [debugOtp, setDebugOtp] = useState(''); // For displaying OTP from sessionStorage
  const email = sessionStorage.getItem('email');
  const navigate = useNavigate();

  useEffect(() => {
    // Get OTP from sessionStorage for debugging (if stored during login)
    const storedOtp = sessionStorage.getItem('otp');
    console.log(sessionStorage)
    if (storedOtp) {
      setDebugOtp(storedOtp);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiService.verifyOtp({ email, otp });
      navigate('/thank-you');
    } catch (error) {
      navigate('/error');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Enter OTP</h2>
        <input
          type="text"
          placeholder="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button type="submit">Verify OTP</button>
      </form>
      {debugOtp && <p>Your OTP: {debugOtp}</p>} {/* Display OTP for debugging */}
    </div>
  );
};

export default OTPVerification;
