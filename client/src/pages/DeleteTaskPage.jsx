import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getSingleTask, deleteTask } from '../redux/features/taskSlice';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from '../components/ui/button';

const DeleteTaskPage = () => {
  const { id } = useParams(); // Get the task ID from the URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get task data and loading/error states from Redux
  const { selectedTask, loading, error } = useSelector((state) => state.tasks);

  // Fetch the task data when the component mounts
  useEffect(() => {
    if (id) {
      dispatch(getSingleTask(id));
    }
  }, [dispatch, id]);

  const handleDelete = () => {
    // Dispatch the deleteTask action
    dispatch(deleteTask(selectedTask.task._id))
      .unwrap() // Unwrap the promise to handle success/error
      .then(() => {
        toast.success('Task deleted successfully');
        navigate('/'); // Redirect to the task list after deletion
      })
      .catch((deleteError) => {
        toast.error(deleteError || 'Failed to delete task');
      });
  };
  

  // Render loading state or error message if applicable
  if (loading) {
    return (
      <div className="flex justify-center items-center">
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

  return (
    <div className="container mx-auto px-5 md:w-1/2 w-full">
      <h1 className="text-gray-600 py-5 font-semibold md:font-bold md:text-[30px] text-[20px] mb-4">
        Delete Task
      </h1>
      <div className="bg-white text-black shadow-md rounded-lg p-5 ">
        <h2 className="text-xl font-bold">{selectedTask.task.title}</h2>
        <p className="mt-2"><strong>Description:</strong> {selectedTask.task.description}</p>
        <p className="mt-2"><strong>Deadline:</strong> {new Date(selectedTask.task.deadline).toLocaleDateString()}</p>
        <p className="mt-2"><strong>Status:</strong> {selectedTask.task.status}</p>
        <p className="mt-4 text-red-600">Are you sure you want to delete this task?</p>

        <div className="flex flex-col gap-0 py-2 w-full">

          <Button
            onClick={handleDelete}
            className="w-full"
            variant={"destructive"}
          >
            Delete Task
          </Button>
          <Link to={'/'} className='py-5'>
            <Button className="w-full">Go Back</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DeleteTaskPage;
