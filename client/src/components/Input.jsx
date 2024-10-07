import React from 'react'

const Input = ({ ...props}) => {
  return (
    <div className='relative mb-6'>
       
        <input 
          {...props}
          className='w-full pl-10 pr-3 py-2 bg-secondary 
          rounded-lg border-lg border  focus:border-blue-500
          focus:ring-blue-500 focus:ring-2 text-black 
          transition duration-200'
        />
    </div>
  )
}

export default Input