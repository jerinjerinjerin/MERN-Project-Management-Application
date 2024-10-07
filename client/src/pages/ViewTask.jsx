import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getSingleTask } from '../redux/features/taskSlice';
import { Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';

const ViewTask = () => {
  const { id } = useParams(); // Get the task ID from the URL
  const dispatch = useDispatch();

  // Get task data and loading/error states from Redux
  const { selectedTask, loading, error } = useSelector((state) => state.tasks);
  console.log('selectedTask', selectedTask); // Log selectedTask

  // Fetch the task data when the component mounts
  useEffect(() => {
    if (id) {
      dispatch(getSingleTask(id));
    }
  }, [dispatch, id]);

  // Render loading state or error message if applicable
  if (loading) {
    return (
      <div className="flex justify-center">
        <Loader2 className="size-6 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  // Check if selectedTask is available
  if (!selectedTask) {
    return <p className="text-red-500">Task not found.</p>; // Show a message if no task is found
  }

  // Render task details
  return (
    <div className="container mx-auto px-5 py-5 md:w-1/2 w-full">
      <h1 className="text-gray-600 font-semibold md:font-bold md:text-[30px] text-[20px] mb-4">
        Task Details
      </h1>
      <div className="bg-white text-black shadow-md rounded-lg p-5">
        <h2 className="text-xl font-bold"><strong>Title:</strong> {selectedTask.task.title}</h2> {/* Access title from selectedTask.task */}
        <p className="mt-2"><strong>Description:</strong> {selectedTask.task.description}</p>
        <p className="mt-2"><strong>Deadline:</strong> {new Date(selectedTask.task.deadline).toLocaleDateString()}</p>
        <p className="mt-2"><strong>Status:</strong> {selectedTask.task.status}</p>
      </div>
      <Link to={'/'}>
           <Button  className="w-full">Go Back</Button>
        </Link>
    </div>
  );
};

export default ViewTask;
