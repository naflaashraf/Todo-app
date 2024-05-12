import React, { useState, useEffect } from 'react';
import './Todoupdate.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function TodoUpdates() {
    const navigate = useNavigate();
    const { todoId } = useParams(); // Get the todoId from the URL params

    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make an HTTP request to update the todo
            await axios.put(`http://localhost:3001/api/v1/todos/${todoId}`, { description, status });
            // Provide feedback to the user (optional)
            console.log('Todo updated successfully');
            // Navigate back to the Dashboard or any other desired route
            navigate('/dashboard');
        } catch (error) {
            // Handle errors if any
            console.error('Error updating todo:', error);
        }
    };

    return (
        <div className='update'>
            <div className='card'>
                <h3>Update Todo</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        id='description'
                        name='description'
                        placeholder='Description'
                        className='my-2'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <select
                        className='my-1'
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value='Pending'>Pending</option>
                        <option value='Completed'>Completed</option>
                    </select>
                    <button type='submit' className='my-4 rounded'>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default TodoUpdates;
