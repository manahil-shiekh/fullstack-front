import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(''); // Clear any previous error message

    // Simple password strength check (e.g., at least 6 characters)
    if (newPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/reset-password', {
        email: email.trim(),
        newPassword: newPassword.trim(),
      });

      if (response.status === 200) {
        // Only navigate after the reset request is successful
        setEmail('');
        setNewPassword('');
        alert('Password changed successfully');
        navigate('/'); // Redirect user to login page after successful password change
      } else {
        // Handle case if server doesn't return status 200
        setErrorMessage('Error changing password');
      }
    } catch (error) {
      if (error.response) {
        // Handle error response from the server
        setErrorMessage(error.response?.data || 'Error from server');
      } else if (error.request) {
        // Handle network error (request was made but no response received)
        setErrorMessage('Network error. Please try again later.');
      } else {
        // Handle any other errors
        setErrorMessage('An unexpected error occurred: ' + error.message);
      }
    } finally {
      setLoading(false); // Set loading state to false after the request completes
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '90vh' }}>
      <div className="card p-5 shadow-lg" style={{ width: '100%', maxWidth: '400px', borderRadius: '20px' }}>
        <h3 className="text-center mb-4 text-primary">Reset Password</h3>
        <form onSubmit={handleResetPassword}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              required
            />
          </div>

          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

          <div className="d-grid">
            <button type="submit" className="btn btn-primary rounded-pill" to="/" disabled={loading}>
              {loading ? 'Changing password...' : 'Change Password' }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
