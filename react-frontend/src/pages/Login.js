import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store';
import axios from 'axios';

const Login = () => {
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', {
        email,
        password,
      });
      dispatch(
        login({
          token: response.data.access_token,
          isSuperAdmin: response.data.is_superadmin === 1,
        })
      );
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
