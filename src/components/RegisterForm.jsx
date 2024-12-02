import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../api/apiService';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    companyName: '',
    age: '',
    dob: '',
    profileImage: null, // For file upload (optional)
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, profileImage: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // Append form data to FormData object
    Object.keys(formData).forEach((key) => {
      if (key === 'profileImage') {
        data.append(key, formData[key]); // Append the file separately
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      // Send the FormData object
      await apiService.register(data);
      navigate('/');
    } catch (error) {
      alert('Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleChange}
        value={formData.name}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        value={formData.email}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        value={formData.password}
        required
      />
      <input
        type="text"
        name="companyName"
        placeholder="Company Name"
        onChange={handleChange}
        value={formData.companyName}
        required
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        onChange={handleChange}
        value={formData.age}
        required
      />
      <input
        type="date"
        name="dob"
        placeholder="Date of Birth"
        onChange={handleChange}
        value={formData.dob}
        required
      />
      <input
        type="file"
        name="profileImage"
        onChange={handleChange}
      />
      <button type="submit">Register</button>
      <button onClick={() => navigate('/')}>Login</button>

    </form>
  );
};

export default RegisterForm;
