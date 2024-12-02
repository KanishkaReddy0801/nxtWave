import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../api/apiService';

const ThankYouPage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const email = sessionStorage.getItem('email');
      if (!email) {
        navigate('/'); // Redirect if no email is found (not logged in)
        return;
      }

      try {
        const response = await apiService.getUserDetails(email);
        setUserDetails(response.data); // Set user details
      } catch (error) {
        console.error('Error fetching user details:', error.response?.data?.error || error.message);
        navigate('/error');
      }
    };

    fetchUserDetails();
  }, [navigate]);

  const handleDeleteAccount = async () => {
    try {
      const response = await apiService.deleteAccount({ email: userDetails.email });
      if (response.status === 200) {
        alert(response.data.message);
        sessionStorage.removeItem('email'); // Clear email from storage
        navigate('/'); // Redirect to the homepage or login page
      }
    } catch (error) {
      console.error('Error deleting account:', error.response?.data?.error || error.message);
      alert('Failed to delete account. Please try again.');
    }
  };

  if (!userDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Thank You</h2>
      <p>Welcome to the application!</p>
      <p>Your email: {userDetails.email}</p>
      <p>Your name: {userDetails.name}</p>
      <p>Company Name: {userDetails.companyName}</p>
      <p>Age: {userDetails.age}</p>
      <p>Date of Birth: {userDetails.dob}</p>
      {userDetails.profileImage && (
        <div>
          <h3>Profile Image:</h3>
          <img
            src={`data:image/jpeg;base64,${userDetails.profileImage}`}
            alt="Profile"
            style={{ width: '150px', height: '150px', borderRadius: '50%' }}
          />
        </div>
      )}
      <button onClick={handleDeleteAccount}>Remove Account</button>
    </div>
  );
};

export default ThankYouPage;
