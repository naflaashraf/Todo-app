import React, { useState } from 'react';
import './Register.css';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'


function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    if ( !/^\S+@\S+\.\S+$/.test(email)) {
      setRegistrationStatus('emailError');
      return;
    }
    // if (!username || !password || !email) {
    //   setRegistrationStatus('fieldError');
    // }
  

    try {
      const response = await axios.post('http://localhost:3001/api/v1/user/register', {
        email: email,
        username: username,
        password: password
      });
      console.log(response.data); // Assuming backend sends a response
      setRegistrationStatus('success',navigate('/login'));
    } catch (error) {
      console.error('Error registering:', error.response ? error.response.data.message : error.message);
      if (error.response && error.response.data.message === 'User already exists') {
        setRegistrationStatus('userExist');
      } else if (error.response && error.response.data.message === 'Please fill all the data') {
        setRegistrationStatus('errorfield');
      } else {
        setRegistrationStatus('error');
      }
    }
  };

  return (
    <div className='register'>
      <div className="card">
        <h2>Register for an account</h2>
        <div className='form1'>
          <input type="email" id="email" name="email" placeholder="email" className='my-2' onChange={(e) => setEmail(e.target.value)} required />
          <input type='text' id="fullname" name='fullname' placeholder='fullname' className='my-2' onChange={(e) => setUsername(e.target.value)} required/>
          <input type="password" id="password" name="password" placeholder="password" className='my-2' onChange={(e) => setPassword(e.target.value)} required />
          <button className='my-3 rounded' onClick={handleSubmit}>Register</button>
          {registrationStatus === 'success' && <p>Registration successful! Redirecting to login page...</p>}
          {registrationStatus === 'userExist' && <p>User already exists. Please use a different email.</p>}
          {registrationStatus === 'error' && <p>Error registering.</p>}
          {registrationStatus === 'errorfield' && <p>Error registering. Please fill all the data </p>}
          {registrationStatus === 'emailError' && <p>Please enter a valid email address.</p>}

          <p>Already have an account? <Link to="/login">Signup</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Register;

