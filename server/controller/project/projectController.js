const Project = require('../../model/Projects')
const User = require('../../model/Users')

 
const createProjectCntrl = async (req, res) => {
    if (req.session.userId===null||req.session.userId==undefined) {
        return res.status(401).json({ message: "Unauthorized: User not logged in" });
    }
    else{
        const userId = req.session.userId;
        // Receive project data from the request body
        const { title } = req.body;
    
    
        try {
            // Create a new project instance associated with the logged-in user
            const newProject = new Project({
                title,
                user: userId // Assign the logged-in user's ID to the 'user' field
            });
    
            // Save the project to the database
            await newProject.save();
    
            // Return success response
            res.status(201).json({ message: "Project created successfully", project: newProject });
        } catch (error) {
            console.error("Error creating project:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    };
    
    }

    // Extract the logged-in user's ID from the session
   


const allProjectCntrl=async(req,res)=>{
    if (!req.session.userId) {
        return res.status(401).json({ message: "Unauthorized: User not logged in" });
    }

    // Extract the logged-in user's ID from the session
    const userId = req.session.userId;

    try {
        // Find all projects created by the logged-in user
        const projects = await Project.find({ user: userId }).populate({path: 'todos',
        model: 'Todo'});

        // Return the projects as a response
        res.status(200).json({ projects });
    } catch (error) {
        console.error("Error fetching projects:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
const singleProjectCntrl= async(req,res)=>{
    if (!req.session.userId) {
        return res.status(401).json({ message: "Unauthorized: User not logged in" });
    }

    // Extract the logged-in user's ID from the session
    const userId = req.session.userId;

    try {
        // Extract the project ID from the request parameters
        const projectId = req.params.projectid;

        // Find the project by ID and ensure it belongs to the logged-in user
        const project = await Project.findById({ _id: projectId }).populate('todos');

        // If the project is not found or doesn't belong to the user, return a 404 Not Found response
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        // Return the project as a response
        res.status(200).json({ project });
    } catch (error) {
        console.error("Error fetching project:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
const updateProjectCntrl = async(req,res)=>{
    try {
        const projectId = req.params.projectid; // Assuming project ID is passed as a route parameter
        const updateFields = req.body; // Fields to be updated
        
        // Find the project by ID and update it
        const updatedProject = await Project.findByIdAndUpdate(projectId, updateFields, { new: true }).populate('todos');
        if (!updatedProject) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json({ message: "Project updated successfully", project: updatedProject });
    } catch (error) {
        console.error("Error updating project:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
const deleteProjectCntrl= async(req,res)=>{
    try {
        const projectId = req.params.projectid; // Assuming project ID is passed as a route parameter
        
        // Find the project by ID and delete it
        const deletedProject = await Project.findByIdAndDelete(projectId);

        if (!deletedProject) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json({ message: "Project deleted successfully", project: deletedProject });
    } catch (error) {
        console.error("Error deleting project:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
module.exports = {
   createProjectCntrl,
   allProjectCntrl,
   singleProjectCntrl,
   updateProjectCntrl,
   deleteProjectCntrl
   
}