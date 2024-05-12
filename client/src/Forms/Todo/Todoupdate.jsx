import React, { useState } from 'react';
import './Todoupdate.css';
import axios from 'axios';

function Todoupdate({ projectId, todoId }) {
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Pending');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `http://localhost:3001/api/v1/project/${projectId}/todos/${todoId}`,
                { description, status },
                { withCredentials: true }
            );
            console.log('Todo updated successfully:', response.data);
            // Handle successful update
        } catch (error) {
            console.error('Error updating todo:', error);
            // Handle error
        }
    };

    return (
        <div className='signup'>
            <div className='card'>
                <h3>Update Todo</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        id='description'
                        name='description'
                        placeholder='Description'
                        className='my-2'
                        required
                    />
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className='my-1'
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

export default Todoupdate;
