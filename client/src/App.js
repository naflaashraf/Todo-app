import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Register from './Forms/Register/Register';
import { ProjectProvider } from './Components/Projectcontext';
import Login from './Forms/Login/Login';
import Project from './Forms/Project/Project';
import Todo from './Forms/Todo/Todo';
import Navbar1 from './Components/Navbar/Navbar';
import HomeNavbar from './Components/Navbar/HomeNavbar';
import ScreenPage from './Components/Screen/ScreenPage'; // Import ScreenPage component
import Dashboard from './Components/Dashboard/Dashboard';
import TodoUpdates from './Forms/Todo/TodoUpdates';

function App() {
  const location = useLocation();

  // Determine whether to show the Navbar1 component based on the current route path
  const showNavbar1 = location.pathname === '/' || 
                      location.pathname === '/login' || 
                      location.pathname === '/register';

  // Determine whether to show the HomeNavbar component based on the current route path
  const showHomeNavbar = location.pathname === '/dashboard' || 
                         location.pathname === '/createproject' || 
                         location.pathname.startsWith('/createtodo/'); // Use startsWith for create todo route

  return (
    <div className="App">
      {showNavbar1 && <Navbar1 />}
      {showHomeNavbar && <HomeNavbar />}
      <ProjectProvider> {/* Wrap your app with ProjectProvider */}
        <Routes>
          <Route path='/' element={<ScreenPage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/createproject' element={<Project />} />
          <Route path='/createtodo/:projectId' element={<Todo />} /> {/* Adjust the route to include projectId */}
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/updatetodo/:todoId' element={<TodoUpdates />} />
        </Routes>
      </ProjectProvider> {/* Close the ProjectProvider */}
    </div>
  );
}

export default App;

