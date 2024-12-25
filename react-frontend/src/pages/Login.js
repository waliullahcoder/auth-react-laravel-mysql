import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store'; // Import login action from store
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', {
        email,
        password,
      });

      const { access_token, is_superadmin } = response.data;

      // Save token in localStorage to persist login
      localStorage.setItem('token', access_token);

      // Dispatch the token and user role info to Redux store
      dispatch(
        login({
          token: access_token,
          isSuperAdmin: is_superadmin === 1, // Assuming 1 represents super admin
        })
      );

      // Redirect to the dashboard
      if (is_superadmin === 1) {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }

      
    } catch (error) {
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <div>
        <label>Email:</label>
        <input type="email" name="email" required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
