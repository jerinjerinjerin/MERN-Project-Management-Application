import React from 'react'
import { Button } from '../components/ui/button'
import { Link } from 'react-router-dom'
import ViewAllTasks from '../components/ViewAllTasks'

const HomePage = () => {
  return (
    <div className='w-screen h-full py-5'>
      <div className="container  w-full">
        <div className="flex items-center md:px-24 md:justify-between justify-center md:flex-row flex-col gap-3">
            <Link to={'/create-task'}>
              <Button className="" >Create Task</Button>
            </Link>
            <h1 className="md:text-4xl text-2xl md:font-bold font-semibold text-gray-900">View All Task</h1>
        </div>
        <div className="py-5">
            <ViewAllTasks/>
        </div>
      </div>
    </div>
  )
}

export default HomePage