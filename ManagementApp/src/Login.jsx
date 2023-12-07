import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import logo from './assets/tigum_logos/logopinas.png';


function Login() {
  // State variables
  const nav = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Function to handle login
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Username and password are required.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: username, password }), // Sending username instead of email
      });

      if (response.ok) {
        console.log('Login successful');
        nav('/dashboard');
        // Redirect to the dashboard or perform further actions upon successful login
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Login failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.error('Login error:', error);
    }
  };

  return (
    <>
      <div className='container border p-4 m-3 rounded-2 position-absolute top-50 start-50 translate-middle' style={{ width: '45%'}}>
        <div className='text-center'>
          <img src={logo} alt='Logo' style={{ width: '200px' }}/>
          <p>Admin Area</p>
        </div>

        <form onSubmit={handleLogin}>
          {/* Username */}
          <label className='text-start fw-bold'>Username:</label>
          <input
            type="text"
            placeholder='Username'
            className='form-control form-control-lg mb-3'
            onChange={(e) => setUsername(e.target.value)}
          />

          {/* Password */}
          <label className='text-start fw-bold mb-3'>Password:</label>
          <input
            type="password"
            placeholder='Password'
            className='form-control form-control-lg mb-3'
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Login Button */}
          <div className="d-grid">
            <button type="submit" className="btn bg-black text-white mb-3">Login</button>
          </div>

          {/* Error message */}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
    </>
  );
}

export default Login;
