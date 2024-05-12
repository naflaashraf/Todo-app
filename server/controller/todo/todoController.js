const Todo = require('../../model/Todo');
const Project = require('../../model/Projects')
const createTodoCntrl = async (req, res) => {
    try {
        // Extract the todo details and the project ID from the request body
        const {  description, status } = req.body;
        const { projectId } = req.params;
        // Find the project by its ID
        const project = await Project.findById(projectId).populate('todos');
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        // Create a new todo instance associated with the found project
        const newTodo = new Todo({
            description,
            status,
            project: project._id // Assign the project ID to the 'project' field
        });

    

        await newTodo.save()
        // Add the created todo's ID to the project's todos array
        project.todos.push(newTodo);
        await project.save();
        
        // Return success response
        res.status(201).json({ message: "Todo created successfully", todo: newTodo });
    } catch (error) {
        console.error("Error creating todo:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
const allTodoCntrl = async (req, res) => {
    try {
        // Extract the project ID from the request parameters
        const projectId = req.params.projectid;

        // Query todos associated with the specified project from the database
        const todos = await Todo.find({ project: projectId });

        // Return the list of todos associated with the project as a response
        res.status(200).json({ todos });
    } catch (error) {
        console.error("Error fetching todos:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
const singleTodoCntrl = async (req, res) => {
    try {
        // Extract the project ID from the request parameters
        const projectId = req.params.projectId;
        
        // Extract the todo ID from the request parameters
        const todoId = req.params.todoId;

        // Query the database to find the todo by its ID and ensure it belongs to the specified project
        const todo = await Todo.findOne({ _id: todoId, project: projectId });

        // If the todo is not found or doesn't belong to the project, return a 404 Not Found response
        if (!todo) {
            return res.status(404).json({ message: "Todo not found in the project" });
        }

        // Return the found todo as a response
        res.status(200).json({ todo });
    } catch (error) {
        console.error("Error fetching todo:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
const updateTodoCntrl =async(req,res)=>{
    try {
        // Extract the project ID and todo ID from the request parameters
        const { todoId } = req.params;

        // Validate whether the todo exists in the specified project
        const todo = await Todo.findOne({ _id: todoId });

        if (!todo) {
            return res.status(404).json({ message: "Todo not found in the specified project" });
        }

        // Update the todo with the provided data
        const { description, status } = req.body;

        if (description) {
            todo.description = description;
        }

        if (status) {
            todo.status = status;
        }

        // Save the updated todo
        await todo.save();

        // Return a success response
        res.status(200).json({ message: "Todo updated successfully", todo });
    } catch (error) {
        console.error("Error updating todo:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
const deleteTodoCntrl = async (req, res) => {
    try {
      // Extract the project ID and todo ID from the request parameters
      const {  todoId } = req.params;
  
      // Validate whether the todo exists in the specified project
      const todo = await Todo.findOne({ _id: todoId });
  
      if (!todo) {
        return res.status(404).json({ message: "Todo not found in the specified project" });
      }
  
      // If the todo exists, remove it from the database
      await Todo.deleteOne({ _id: todoId });
  
      // Return a success response
      res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
      console.error("Error deleting todo:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
module.exports = {
    createTodoCntrl,
    allTodoCntrl,
    singleTodoCntrl,
    updateTodoCntrl,
    deleteTodoCntrl

}