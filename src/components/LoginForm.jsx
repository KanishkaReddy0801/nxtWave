import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../api/apiService';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State for error messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
    try {
      const response = await apiService.login({ email, password });
      if (response.data.otp) {
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('otp', response.data.otp);
        console.log("response", response.data);
        navigate('/otp');
      }
    } catch (error) {
      // Handle different error responses
      if (error.response) {
        if (error.response.status === 404) {
          setError('Email is not registered.');
        } else if (error.response.status === 401) {
          setError('Password is incorrect.');
        } else {
          setError('Something went wrong. Please try again.');
        }
      } else {
        setError('Unable to connect to the server. Please try again later.');
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <button type="button" onClick={() => navigate('/register')}>Create Account</button>
      </form>
    </div>
  );
};

export default LoginForm;
