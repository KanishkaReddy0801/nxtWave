import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Sorry, we can't log you in.</h2>
      <button onClick={() => navigate('/')}>Back to Login</button>
    </div>
  );
};

export default ErrorPage;
