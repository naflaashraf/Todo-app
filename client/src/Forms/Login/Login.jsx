import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making HTTP requests

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  axios.defaults=true
  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!email || !password) {
      setErrorMessage('Please fill all fields.');
      return;
    }

    try {
      // Send login request to backend
      const response = await axios.post('http://localhost:3001/api/v1/user/login', { email, password },{
        withCredentials:true
      });

      // Handle success response
      setErrorMessage(null);
      // Store the user's ID in localStorage or sessionStorage
      localStorage.setItem('userId', response.data.userId); // You can change 'userId' to any key you prefer
      navigate('/dashboard');
    } catch (error) {
      // Handle error response
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className='signup'>
      <div className="card">
        <h3>Sign in to your account</h3>
        <form className='' onSubmit={handleSubmit}>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="email"
            className='my-2'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className='my-1'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className='my-4 rounded'>
            Login
          </button>
          {errorMessage && <p className='error'>{errorMessage}</p>}
          <p>Not a registered user yet? <a href="/register">Sign up</a></p>
        </form>
      </div>
    </div>
  );
}

export default Login;
