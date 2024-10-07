import Task from "../models/taskModel.js";
import moment from 'moment';

// Create task
export const createTask = async (req, res) => {
    try {
        const { title, description, deadline, status } = req.body;

        // Validate required fields
        if (!title || !description || !deadline) {
            return res.status(400).json({ message: 'Title, description, and deadline are required' });
        }

        // Validate status if provided (it should be one of the allowed enum values)
        const validStatuses = ['Pending', 'In Progress', 'Completed'];
        if (status && !validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        // Parse the deadline (convert from "DD-MM-YYYY" to valid Date object)
        const parsedDeadline = moment(deadline, 'DD-MM-YYYY').toDate();

        if (!parsedDeadline || isNaN(parsedDeadline.getTime())) {
            return res.status(400).json({ message: 'Invalid deadline date format' });
        }

        // Create a new task with default status if not provided
        const newTask = new Task({
            title,
            description,
            deadline:parsedDeadline,
            status: status || 'Pending',  // Defaults to 'Pending'
        });

        // Save the task to the database
        await newTask.save();

        // Return success response
        return res.status(201).json({
            message: 'Task created successfully',
            task: newTask
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error while creating task' });
    }
};

//get single task

export const getSingleTask = async (req, res) => {
    try {
        const {id} = req.params

        const task = await Task.findById(id);

        if(!task){
            return res.status(404).json({ message: 'Task not found' });
        }

        return res.json({  task });
    } catch (error) {
        
    }
}

//get all tasks

export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();

        // Return success response
        return res.json({ tasks });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error while getting all tasks' });
    }
};


// Update task
export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, deadline, status } = req.body;

        // Validate status if provided (it should be one of the allowed enum values)
        const validStatuses = ['Pending', 'In Progress', 'Completed'];
        if (status && !validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        // Parse and validate deadline if provided
        let parsedDeadline;
        if (deadline) {
            parsedDeadline = moment(deadline, 'DD-MM-YYYY').toDate();
            if (!parsedDeadline || isNaN(parsedDeadline.getTime())) {
                return res.status(400).json({ message: 'Invalid deadline date format, use DD-MM-YYYY' });
            }
        }

        // Find task by ID
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Update task fields if they are provided in the request
        if (title) task.title = title;
        if (description) task.description = description;
        if (parsedDeadline) task.deadline = parsedDeadline;
        if (status) task.status = status;

        // Save the updated task to the database
        const updatedTask = await task.save();

        // Return success response
        return res.status(200).json({
            message: 'Task updated successfully',
            task: updatedTask
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error while updating task' });
    }
};

//delete task

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        // Find task by ID
        const task = await Task.findByIdAndDelete(id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Return success response
        return res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error while deleting task' });
    }
};
