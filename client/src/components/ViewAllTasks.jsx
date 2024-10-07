import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from './ui/button'; // Assumes you're using shadcn/ui
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'; // Import popover from shadcn
import { getAllTasks } from '../redux/features/taskSlice';
import Loader from './Loader';
import { Delete, Edit, Eye, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import moment from 'moment'; // Import moment for date formatting

const ViewAllTasks = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5; // Show 5 tasks per page
  
  // Filter and sort state
  const [selectedStatus, setSelectedStatus] = useState('All'); // Status filter
  const [sortByDeadline, setSortByDeadline] = useState('none'); // Deadline sort: 'asc' or 'desc'

  useEffect(() => {
    // Dispatch the async thunk to fetch tasks when the component mounts
    dispatch(getAllTasks());
  }, [dispatch]);

  if (loading) {
    return (
      <div className='flex items-center justify-center w-full h-screen'>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error state if any
  }

  // Filter tasks by selected status
  const filteredTasks = tasks.filter(task => {
    if (selectedStatus === 'All') return true;
    return task.status === selectedStatus;
  });

  // Sort tasks based on deadline
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortByDeadline === 'asc') {
      return new Date(a.deadline) - new Date(b.deadline);
    } else if (sortByDeadline === 'desc') {
      return new Date(b.deadline) - new Date(a.deadline);
    }
    return 0;
  });

  // Logic to get current tasks based on the current page
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = sortedTasks.slice(indexOfFirstTask, indexOfLastTask);

  // Handle page navigation
  const nextPage = () => {
    if (currentPage < Math.ceil(sortedTasks.length / tasksPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getStatusColor = (status) => {
    if (status === 'Pending') {
      return 'bg-red-500 text-white'; // Red for Pending
    } else if (status === 'Completed') {
      return 'bg-green-500 text-white'; // Green for Completed
    } else {
      return 'bg-blue-500 text-white rounded'; // Blue for other statuses
    }
  };

  return (
    <div className='p-4 w-screen'>
      <div className="container w-full mx-auto">
        {/* Filter and Sort Buttons */}
        <div className='flex justify-start gap-4 mb-4'>
          {/* Status Button with Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="secondary">
                Status <ChevronDown className='ml-1'/>
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="p-2">
                <ul className="space-y-2">
                  <li onClick={() => setSelectedStatus('All')} className={`cursor-pointer ${selectedStatus === 'All' ? 'font-bold' : ''}`}>All</li>
                  <li onClick={() => setSelectedStatus('Pending')} className={`cursor-pointer ${selectedStatus === 'Pending' ? 'font-bold' : ''}`}>Pending</li>
                  <li onClick={() => setSelectedStatus('Completed')} className={`cursor-pointer ${selectedStatus === 'Completed' ? 'font-bold' : ''}`}>Completed</li>
                  <li onClick={() => setSelectedStatus('In Progress')} className={`cursor-pointer ${selectedStatus === 'In Progress' ? 'font-bold' : ''}`}>In Progress</li>
                </ul>
              </div>
            </PopoverContent>
          </Popover>

          {/* Deadline Button with Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="secondary">
                Deadline <ChevronDown className='ml-1'/>
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="p-2">
                <ul className="space-y-2">
                  <li onClick={() => setSortByDeadline('asc')} className={`cursor-pointer ${sortByDeadline === 'asc' ? 'font-bold' : ''}`}>Closest First</li>
                  <li onClick={() => setSortByDeadline('desc')} className={`cursor-pointer ${sortByDeadline === 'desc' ? 'font-bold' : ''}`}>Furthest First</li>
                  <li onClick={() => setSortByDeadline('none')} className={`cursor-pointer ${sortByDeadline === 'none' ? 'font-bold' : ''}`}>Clear Sorting</li>
                </ul>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {sortedTasks.length > 0 ? (
          <>
            <div className="overflow-x-auto"> {/* Make table horizontally scrollable */}
              <table className='table-auto w-full text-left border-collapse border border-gray-300'>
                <thead>
                  <tr className='bg-gray-100'>
                    <th className='border border-gray-300 px-4 py-2'>S.No</th>
                    <th className='border border-gray-300 px-4 py-2'>Task Title</th>
                    <th className='border border-gray-300 px-4 py-2'>Task Description</th>
                    <th className='border border-gray-300 px-4 py-2'>Task Status</th>
                    <th className='border border-gray-300 px-4 py-2'>Task Deadline</th>
                    <th className='border border-gray-300 px-4 py-2'>Edit</th>
                    <th className='border border-gray-300 px-4 py-2'>Delete</th>
                    <th className='border border-gray-300 px-4 py-2'>View</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTasks.map((task, index) => (
                    <tr key={task._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className='border border-gray-300 px-4 py-2'>{indexOfFirstTask + index + 1}</td>
                      <td className='border border-gray-300 px-4 py-2'>{task.title}</td>
                      <td className='border border-gray-300 px-4 py-2'>{task.description}</td>
                      <td className={`border border-gray-300 px-4 py-2 ${getStatusColor(task.status)}`}>
                        {task.status}
                      </td>
                      <td className='border border-gray-300 px-4 py-2'>
                        {moment(task.deadline).format('MMMM Do YYYY, h:mm A')} {/* Format the deadline using moment */}
                      </td>
                      <td className='border border-gray-300 px-4 py-2'>
                        <Link to={`/update-task/${task._id}`}>
                          <Button variant={"edit"}>Update {" "}
                            <span>
                              <Edit className='size-4 ml-1'/>
                            </span>
                          </Button>
                        </Link>
                      </td>
                      <td className='border border-gray-300 px-4 py-2'>
                        <Link to={`/delete-task/${task._id}`}>
                          <Button variant={"destructive"}>Delete {" "}
                            <span>
                              <Delete className='size-4 ml-1'/>
                            </span>
                          </Button>
                        </Link>
                      </td>
                      <td className='border border-gray-300 px-4 py-2'>
                        <Link to={`/view-task/${task._id}`}>
                          <Button variant={"outline"}>View {" "}
                            <span>
                              <Eye className='size-4 ml-1'/>
                            </span>
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className='flex justify-between mt-4 px-5 md:px-10 lg:px-0'>
              <Button onClick={prevPage} disabled={currentPage === 1}>Previous</Button>
              <Button onClick={nextPage} disabled={currentPage >= Math.ceil(sortedTasks.length / tasksPerPage)}>Next</Button>
            </div>
          </>
        ) : (
          <p>No tasks available.</p>
        )}
      </div>
    </div>
  );
};

export default ViewAllTasks;
