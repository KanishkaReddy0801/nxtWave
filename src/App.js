import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import OTPVerification from './components/OTPVerification';
import ThankYouPage from './components/ThankYouPage';
import ErrorPage from './components/ErrorPage';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/otp" element={<OTPVerification />} />
      <Route path="/thank-you" element={<ThankYouPage />} />
      <Route path="/error" element={<ErrorPage />} />
    </Routes>
  </Router>
);

export default App;
