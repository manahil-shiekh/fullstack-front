// LoginForm Component

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../layout/Navbar';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/login', {
        email: email.trim(),
        password,
      });

      if (response.data.success) {
        alert('Login successful');
        navigate('/home');
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      alert('Invalid credentials or server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '90vh' }}>
        <div className="card p-5 shadow-lg" style={{ width: '100%', maxWidth: '400px', borderRadius: '20px' }}>
          <h3 className="text-center mb-4 text-primary">Login</h3>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>

            <div className="mb-3 text-end">
              <a href="/reset-password" className="text-decoration-none text-secondary small">Forgot Password?</a>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary rounded-pill" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
