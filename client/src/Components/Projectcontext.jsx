import React, { createContext, useContext, useState } from 'react';

// Create a new context
const ProjectContext = createContext();

// Custom hook to use the project context
export const useProjectContext = () => useContext(ProjectContext);

// Project context provider component
export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);

  const addProjectToList = (newProject) => {
    setProjects([...projects, newProject]);
  };

  return (
    <ProjectContext.Provider value={{ projects, addProjectToList }}>
      {children}
    </ProjectContext.Provider>
  );
};
