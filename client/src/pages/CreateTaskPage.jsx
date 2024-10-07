import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../components/Input";
import Select from "../components/SelectStatus";
import { Button } from "../components/ui/button";
import Label from "../components/Label";
import { createTask } from "../redux/features/taskSlice";
import { Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CreateTaskPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  // State variables for form inputs
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("");
  const [errorInput, setErrorInput] = useState("");

  // Redux state for loading and error messages
  const { loading, error } = useSelector((state) => state.tasks);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      return setErrorInput("Task Title is required");
    }

    if (!description.trim()) {
      return setErrorInput("Task Description is required");
    }

    if (!deadline.trim()) {
      return setErrorInput("Task Deadline is required");
    }

    if (!status.trim()) {
      return setErrorInput("Task Status is required");
    }

    setErrorInput(""); // Clear any previous error message

    // Dispatch the createTask action with the form data
    const taskData = {
      title,
      description,
      deadline,
      status,
    };
    dispatch(createTask(taskData));
    toast.success('Task created successfully')
    navigate('/');
  };

  return (
    <div className="container mx-auto h-screen">
      <div className="flex items-center justify-center py-5">
        <h1 className="text-gray-600 font-semibold md:font-bold md:text-[30px] text-[20px]">
          Create Your Task
        </h1>
      </div>

      <div className="px-5 md:w-1/2 w-full mx-auto">
        <form onSubmit={handleSubmit} className="py-5">
          {/* Task Title Input */}
          <Label htmlFor="TaskTitle">Task Title</Label>
          <Input
            type="text"
            placeholder="Enter Task Title"
            value={title}
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
              { label: "Select Task Status", value: "" },
              { label: "Pending", value: "Pending" },
              { label: "In Progress", value: "In Progress" },
              { label: "Completed", value: "Completed" },
            ]}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />

          {/* Display loading or error messages */}
          {error && <p className="text-red-500 py-5">{error}</p>}
          {errorInput && <p className="text-red-500 py-5">{errorInput}</p>}

          <Button disabled={loading} variant="ghost" type="submit" className="w-full py-5">
            {loading ? <Loader2 className="size-4 animate-spin" /> : "Create Task"}
          </Button>
         
          
        </form>
        <Link to={'/'}>
           <Button className="w-full">Go Back</Button>
          </Link>
      </div>
    </div>
  );
};

export default CreateTaskPage;
