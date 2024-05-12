import React, { useState } from 'react';
import './Todo.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Todo() {
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();
  const { projectId } = useParams(); // Get the project ID from the URL params

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(
            `http://localhost:3001/api/v1/project/${projectId}/createtodo`, // Use the project ID from URL params
            { description, status },
            { withCredentials: true }
        );
        const createdTodo = response.data.todo; // Access the entire todo object
        console.log(createdTodo); // Log the entire todo object
        navigate('/dashboard');
    } catch (error) {
        console.error('Error creating todo:', error);
    }
};


  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  return (
    <div className='signup'>
      <div className="card">
        <h3>Create Todo</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="description"
            name="description"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Description"
            className='my-2'
            required
          />
          <select
            value={status}
            onChange={handleStatusChange}
            className='my-1'
            defaultValue='Pending'
          >
            <option value=''>Select status</option>
            <option value='Pending'>Pending</option>
            <option value='Completed'>Completed</option>
          </select>
          <button type="submit" className='my-4 rounded'>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Todo;
