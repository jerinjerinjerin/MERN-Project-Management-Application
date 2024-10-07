import React from 'react'

const Navbar = () => {
  return (
    <div className='w-full h-[100px] py-5 z-10 sticky bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 border-b border-black'>
       <div className="container md:px-10 px-5 w-full h-full mx-auto my-auto">
        <div className="flex justify-center items-center">
             <h1 className="text-white  font-semibold md:font-bold text-[20px] md:text-[40px]">Task Management Application</h1>    
        </div>
       </div>
    </div>
  )
}

export default Navbar