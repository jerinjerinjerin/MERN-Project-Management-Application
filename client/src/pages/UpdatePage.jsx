import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../components/Input";
import Select from "../components/SelectStatus";
import { Button } from "../components/ui/button";
import Label from "../components/Label";
import { getSingleTask, updateTask } from "../redux/features/taskSlice";
import { Loader2 } from "lucide-react";
import { useParams, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

// UpdateTaskPage component

const UpdateTaskPage = () => {
  const { id } = useParams(); // Get taskId from the URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state for the task data and loading/error states
  const { selectedTask, loading, error } = useSelector((state) => state.tasks);

  // State variables for form inputs
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("");

  // Fetch the current task data when the component mounts
  useEffect(() => {
    if (id) {
      dispatch(getSingleTask(id));
    }
  }, [dispatch, id]);

  // Populate the form with the fetched task's data once available
  useEffect(() => {
    if (selectedTask && !loading) {
      // Populate inputs with fetched task data
      setTitle(selectedTask.title || ""); 
      setDescription(selectedTask.description || "");
      setDeadline(selectedTask.deadline || "");
      setStatus(selectedTask.status || "Pending");
    }
  }, [selectedTask, loading]); // Ensure this runs when `selectedTask` is updated

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the updated task data
    const updatedTask = {
      title,
      description,
      deadline,
      status,
    };

    // Dispatch the updateTask action
    dispatch(updateTask({ id, updatedTask }))
      .unwrap() // Unwrap the promise to catch errors
      .then(() => {
        toast.success("Task updated successfully");
        navigate("/"); // Redirect after successful update
      })
      .catch((updateError) => {
        toast.error(updateError || "Failed to update task");
      });
  };

  return (
    <div className="container mx-auto h-screen">
      <div className="flex items-center justify-center py-5">
        <h1 className="text-gray-600 font-semibold md:font-bold md:text-[30px] text-[20px]">
          Update Your Task
        </h1>
      </div>

      <div className="px-5 md:w-1/2 w-full mx-auto">
        {loading ? (
          <div className="flex justify-center">
            <Loader2 className="size-6 animate-spin" />
          </div>
        ) : selectedTask ? ( // Render form only if selectedTask is available
          <form onSubmit={handleSubmit} className="py-5">
            {/* Task Title Input */}
            <Label htmlFor="TaskTitle">Task Title</Label>
            <Input
              type="text"
              placeholder="Enter Task Title"
              value={title} // No need for fallback since setTitle already handles it
              onChange={(e) => setTitle(e.target.value)}
            />

            {/* Task Description Input */}
            <Label htmlFor="TaskDescription">Task Description</Label>
            <Input
              type="text"
              placeholder="Enter Task Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            {/* Task Deadline Input */}
            <Label htmlFor="TaskDeadline">Task Deadline</Label>
            <Input
              type="date"
              placeholder="Enter Task Deadline"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />

            {/* Task Status Select */}
            <Label htmlFor="TaskStatus">Task Status</Label>
            <Select
              options={[
                
                { label: "Pending", value: "Pending" },
                { label: "In Progress", value: "In Progress" },
                { label: "Completed", value: "Completed" },
              ]}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />

            {/* Display loading or error messages */}
            {error && <p className="text-red-500 py-5">{error}</p>}

            <Button
              disabled={loading}
              variant="ghost"
              type="submit"
              className="w-full py-5"
            >
              {loading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "Update Task"
              )}
            </Button>
          </form>
        ) : (
          <p>Task not found</p> // Fallback message if task data is missing
        )}
        <Link to={"/"}>
          <Button className="w-full py-5">Go Back</Button>
        </Link>
      </div>
    </div>
  );
};

export default UpdateTaskPage;
