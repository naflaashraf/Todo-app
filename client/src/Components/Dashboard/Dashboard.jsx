import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import edit from '../../Assets/edit.png';
import del from '../../Assets/delete.png';
import viewTodo from '../../Assets/file.png';

function Dashboard() {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [todos, setTodos] = useState([]);
    const [editedTitle, setEditedTitle] = useState('');
    const [editingProjectId, setEditingProjectId] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:3001/api/v1/project/',
                    { withCredentials: true }
                );
                setProjects(response.data.projects);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, []);

    const handleCreateProject = () => {
        navigate('/createproject');
    };

    const handleDeleteProject = async (projectId) => {
        try {
            await axios.delete(`http://localhost:3001/api/v1/project/${projectId}`, { withCredentials: true });
            setProjects(projects.filter(project => project._id !== projectId));
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    const handleEditProject = (projectId, currentTitle) => {
        setEditedTitle(currentTitle);
        setEditingProjectId(projectId);
    };

    const handleUpdateProject = async () => {
        try {
            await axios.put(`http://localhost:3001/api/v1/project/${editingProjectId}`, { title: editedTitle }, { withCredentials: true });
            setProjects(projects.map(project => project._id === editingProjectId ? { ...project, title: editedTitle } : project));
            setEditedTitle('');
            setEditingProjectId(null);
        } catch (error) {
            console.error('Error updating project:', error);
        }
    };

    const handleViewTodo = async (projectId) => {
        try {
            const response = await axios.get(
                `http://localhost:3001/api/v1/todos/${projectId}`,
                { withCredentials: true }
            );
            setTodos(response.data.todos);
        } catch (error) {
            console.error('Error fetching todos:', error);
            setTodos([]);
        }
    };

    const handleNavigateToCreateTodo = (projectId) => {
        navigate(`/createtodo/${projectId}`);
    };

    const handleToggleStatus = (todoId) => {
        setTodos(todos.map(todo => todo._id === todoId ? { ...todo, showStatus: !todo.showStatus } : todo));
    };
    const handleDeleteTodo = async ( todoId) => {
      try {
        // Make an HTTP request to delete the todo
        await axios.delete(`http://localhost:3001/api/v1/todos/${todoId}`, { withCredentials: true });
    
        // Update the state to remove the deleted todo from the UI
        setTodos(prevTodos => prevTodos.filter(todo => todo._id !== todoId));
    
        // Provide feedback to the user that the todo was deleted (optional)
        console.log("Todo deleted successfully");
    
      } catch (error) {
        // Handle errors if any
        console.error("Error deleting todo:", error);
      }
    };

    return (
        <div className="row">
            <div className="col-12 d-flex">
                <div className="sidebar d-flex">
                    <div>
                        <h1 className='text-center'>Projects</h1>
                        <ul>
                            {projects.map(project => (
                                <div key={project._id} className="project-box">
                                    <li className='project-item'>
                                        {editingProjectId === project._id ? (
                                            <div>
                                                <input
                                                    type="text"
                                                    value={editedTitle}
                                                    onChange={(e) => setEditedTitle(e.target.value)}
                                                />
                                                <button onClick={handleUpdateProject} className='sav-btn'>Save</button>
                                            </div>
                                        ) : (
                                            <div  title="Rename Project" style={{cursor:'pointer'}} onClick={() => handleEditProject(project._id, project.title)}>{project.title}</div>
                                        )}
                                        <div className="icons">
                                            <img src={edit} alt="Edit" className='edit' title="Create Todo" onClick={() => handleNavigateToCreateTodo(project._id)} />
                                            <img src={viewTodo} alt="view todo" className='edit'  title="View Todo" onClick={() => handleViewTodo(project._id)} />
                                            <img src={del} alt="Delete" className='edit'  title="Delete Project" onClick={() => handleDeleteProject(project._id)} />
                                        </div>
                                    </li>
                                </div>
                            ))}
                        </ul>
                    </div>
                    <button className='butn rounded m-3' onClick={handleCreateProject}>
                        Create Project
                    </button>
                </div>
                <div className='d-flex flex-column align-items-center m-5 p-3 todos'>
                    <h1 className='p-2'>Todos</h1>
                    <ul style={{ listStyle: 'none', padding: 0 }} className='d-flex flex-wrap'>
                        {todos.length > 0 ? (
                            todos.map((todo) => (
                                <li key={todo._id} style={{ marginBottom: '10px' }}>
                                    <div style={{ position: 'relative' }}>
                                        <div
                                            style={{
                                                position: 'relative',
                                                borderRadius: '4px',
                                                padding: '8px',
                                                paddingRight: '30px',
                                            }}
                                        >
                                            <input
                                                type="text"
                                                value={todo.description}
                                                readOnly
                                                style={{
                                                    width: 'calc(120% - 0px)',
                                                    border: '2px solid grey',
                                                    outline: 'none',
                                                    background: 'none',
                                                }}
                                            />
                                            <Link to={`/updatetodo/${todo._id}`}>
                                                <img
                                                    src={edit}
                                                    alt="Edit"
                                                    className='edit'
                                                    style={{
                                                        position: 'absolute',
                                                        top: '50%',
                                                        right: '70px',
                                                        transform: 'translateY(-50%)',
                                                        cursor: 'pointer',
                                                       
                                                    }}
                                
                                                />
                                            </Link>
                                            <img
                                                src={del}
                                                alt="Delete"
                                                className='delete'
                                                style={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    right: '30px',
                                                    transform: 'translateY(-50%)',
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => handleDeleteTodo(todo._id)}
                                            />
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    right: '10px',
                                                    transform: 'translateY(-50%)',
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => handleToggleStatus(todo._id)}
                                            >
                                                <span>&#x25BE;</span>
                                            </div>
                                        </div>
                                    </div>
                                    {todo.showStatus && (
                                         <div style={{ paddingLeft: '2rem' }}>
                                         <input
                                             type="checkbox"
                                             checked={todo.status === 'Completed'} // Check if todo status is 'Completed'
                                             readOnly
                                         />
                                         <label style={{ marginLeft: '0.5rem', color: todo.status === 'Completed' ? 'green' : 'red' }}>
                                             {todo.status}
                                         </label>
                                     </div>
                                    )}
                                </li>
                            ))
                        ) : (
                            <li>No todos available</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
