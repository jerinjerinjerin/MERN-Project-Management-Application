import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API URL (fixed comment)
const TASKS_API_URL = `${import.meta.env.VITE_SERVER_BASE_URL}/task`;

// Async thunk to create a new task
export const createTask = createAsyncThunk('/task/createTask', async (task, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${TASKS_API_URL}/createTask`, task);  // POST request to create task
    return response.data;  // Assumes the new task is returned in the response
  } catch (error) {
    return rejectWithValue(error.response?.data || "An error occurred");
  }
});

// Async thunk to fetch all tasks
export const getAllTasks = createAsyncThunk('/task/getAllTasks', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${TASKS_API_URL}/getAllTasks`);  // GET request to fetch all tasks
    return response.data;  // Assumes the list of tasks is returned in the response
  } catch (error) {
    return rejectWithValue(error.response?.data || "An error occurred while fetching tasks");
  }
});

// Async thunk to fetch a single task by ID
export const getSingleTask = createAsyncThunk('/task/getSingleTask', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${TASKS_API_URL}/getSingleTask/${id}`);  // GET request to fetch single task
    console.log('redux fetch data', response.data)
    return response.data;  // Assumes the single task is returned in the response
  } catch (error) {
    return rejectWithValue(error.response?.data || `Failed to fetch task with ID: ${id}`);
  }
});

// Async thunk to update a task by ID
export const updateTask = createAsyncThunk('/task/updateTask', async ({ id, updatedTask }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${TASKS_API_URL}/updateTask/${id}`, updatedTask);  // PUT request to update task
    return response.data;  // Assumes the updated task is returned in the response
  } catch (error) {
    return rejectWithValue(error.response?.data || `Failed to update task with ID: ${id}`);
  }
});

//delete
export const deleteTask = createAsyncThunk('/task/deleteTask', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${TASKS_API_URL}/deleteTask/${id}`);  // Correctly formatted DELETE request
    return id;  // Return the deleted task ID
  } catch (error) {
    return rejectWithValue(error.response?.data || `Failed to delete task with ID: ${id}`);
  }
});


// Initial state
const initialState = {
  tasks: [],
  loading: false,
  error: null,
  selectedTask: null,  // Store the single task
};

// Task slice
const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedTask: (state) => {
      state.selectedTask = null; // Clear selected task when necessary
    }
  },
  extraReducers: (builder) => {
    builder
      // Create Task Reducers
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);  // Add the new task to the task list
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create task";
      })

      // Get All Tasks Reducers
      .addCase(getAllTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTasks.fulfilled, (state, action) => {
        console.log('Tasks fetched successfully:', action.payload); // Log fetched tasks
        state.loading = false;
        state.tasks = action.payload.tasks;  // Replace task list with fetched tasks
      })
      .addCase(getAllTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch tasks";
      })

      // Get Single Task Reducers
      .addCase(getSingleTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleTask.fulfilled, (state, action) => {
        console.log('Single task fetched successfully:', action.payload); // Log fetched single task
        state.loading = false;
        state.selectedTask = action.payload;  // Store the fetched task
      })
      .addCase(getSingleTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch single task";
      })

      // Update Task Reducers
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tasks.findIndex(task => task._id === action.payload._id);
        if (index !== -1) {
          state.tasks[index] = action.payload;  // Update the task in the state with the updated task
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update task";
      })

      // Delete Task Reducers
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);  // Remove the deleted task
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete task";
      });
  },
});

export const { clearError, clearSelectedTask } = taskSlice.actions;

export default taskSlice.reducer;
