import React, { useState } from 'react';
import axios from 'axios'; // Make sure to import axios

function Login() {
  // State variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Function to handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    // Make sure email and password are not empty
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    // Make the API request to your backend for authentication
    try {
      const response = await axios.post('your-authentication-endpoint', {
        email,
        password,
      });

      // Assuming your backend returns a token upon successful login
      const token = response.data.token;

      // Perform actions after successful login, such as storing the token in localStorage
      localStorage.setItem('token', token);

      // Redirect to the admin dashboard or another protected route
      // You may use react-router-dom's useHistory hook for this
      // import { useHistory } from 'react-router-dom';
      // const history = useHistory();
      // history.push('/admin-dashboard');
    } catch (error) {
      // Handle authentication errors
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <>
      <div className='container border p-4 m-3 rounded-2 position-absolute top-50 start-50 translate-middle'>
        <div className='text-center'>
          <h1>LOGO Here</h1>
          <p>Admin Area</p>
        </div>

        <form onSubmit={handleLogin}>
          {/* Email Address */}
          <label className='text-start fw-bold'>Email Address:</label>
          <input
            type="email"
            placeholder='Email'
            className='form-control form-control-lg mb-3'
            onChange={(e) => setEmail(e.target.value)}
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
            <input type="submit" value="Login" className="btn bg-black text-white mb-3" />
          </div>

          {/* Error message */}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
    </>
  );
}

export default Login;
