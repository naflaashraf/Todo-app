import React, { useState } from 'react';
import './Project.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Project() {
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3001/api/v1/project/create',
        { title },
        { withCredentials: true } // Send cookies for authentication
      );
      navigate('/dashboard');
      console.log(response.data);
      // Handle success response
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // User is not logged in
        console.error('User is not logged in');
        // Show alert message
        window.alert('User is not logged in. Please log in.');
        // Navigate to login page
        navigate('/login');
      } else {
        // Other error occurred
        console.error('Error creating project:', error);
        // Handle other errors
      }
    }
};

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div className='project'>
      <div className="card">
        <h3 className='text-center'>Create Project</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleTitleChange}
            placeholder="Title"
            className='my-3'
            required
          />
          <button type="submit" className='rounded'>Create</button>
        </form>
      </div>
    </div>
  );
}

export default Project;
