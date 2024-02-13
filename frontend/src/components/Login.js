import React, { useState } from 'react';
import axios from 'axios';
import "./Login.css"

const URL = process.env.REACT_APP_URL || "http://localhost:5000";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${URL}/api/login`, { username, password });
      console.log(res.data.token); // Save token in local storage or session
      alert('Login successful');
      localStorage.setItem('token', res.data.token);
      window.location.replace('/');
    } catch (error) {
      console.error(error);
      alert('Failed to login');
    }
  };

  return (
    <>
      <div className='loginPage'>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}

export default Login;
