import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function AddUsers() {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  });

  const { name, username, email, password, phone } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make POST request to save user
      await axios.post("http://localhost:8080/user", user);
      // After successful submission, navigate to the home page
      navigate("/");
    } catch (error) {
      console.error("Error submitting the form", error);
      alert('There was an error saving the user. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center mb-4">Register Yourself</h2>

          <form onSubmit={onSubmit}>
            <div className="mb-3 text-start">
              <label htmlFor="name" className="form-label fw-bold">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Enter full name"
                value={name}
                onChange={onInputChange}
                required
              />
            </div>

            <div className="mb-3 text-start">
              <label htmlFor="username" className="form-label fw-bold">User Name</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                placeholder="Enter user name"
                value={username}
                onChange={onInputChange}
                required
              />
            </div>

            <div className="mb-3 text-start">
              <label htmlFor="email" className="form-label fw-bold">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter email address"
                value={email}
                onChange={onInputChange}
                required
              />
            </div>

            <div className="mb-3 text-start">
              <label htmlFor="password" className="form-label fw-bold">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Enter password"
                value={password}
                onChange={onInputChange}
                required
              />
            </div>

            <div className="mb-3 text-start">
              <label htmlFor="phone" className="form-label fw-bold">Phone</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                placeholder="Enter number"
                value={phone}
                onChange={onInputChange}
                required
              />
            </div>

            <div className="d-flex justify-content-between">
              {/* Submit button for saving user */}
              <button type="submit" className="btn btn-primary">Save</button>
              {/* Cancel button with Link */}
              <Link className="btn btn-danger" to="/">Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
