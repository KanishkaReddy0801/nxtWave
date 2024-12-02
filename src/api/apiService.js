import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const apiService = {
  login: (data) => axios.post(`${API_BASE_URL}/auth/login`, data),
  register: (data) => axios.post(`${API_BASE_URL}/auth/register`, data),
  verifyOtp: (data) => axios.post(`${API_BASE_URL}/auth/verify-otp`, data),
  getUserDetails: (email) => axios.get(`${API_BASE_URL}/auth/user/${email}`),
  deleteAccount: (data) => axios.post(`${API_BASE_URL}/auth/delete-account`, data),
};

export default apiService;
