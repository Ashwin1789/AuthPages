import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Auth.css';

const Auth = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSwitchAuthMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({
      fullName: '',
      email: '',
      password: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isSignUp
      ? 'http://localhost:5000/api/auth/signup'
      : 'http://localhost:5000/api/auth/signin';

    try {
      const response = await axios.post(url, formData);

      if (isSignUp) {
        toast.success(response.data.message || 'Account created successfully!', {
          position: "top-right",
          autoClose: 1000,
        });

        setTimeout(() => {
          handleSwitchAuthMode();
        }, 1000);
      } else {
        localStorage.setItem('token', response.data.token);
        toast.success('Signed in successfully!', {
          position: "top-right",
          autoClose: 1000,
        });

        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Something went wrong. Please try again!',
        { position: "top-right", autoClose: 3000 }
      );
    }
  };

  return (
    <div className="auth-page">
      <ToastContainer />
      <div className="auth-container">
        <h2>{isSignUp ? 'Create an Account' : 'Sign In to Your Account'}</h2>
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="auth-btn">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
        <p>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span onClick={handleSwitchAuthMode}>
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
