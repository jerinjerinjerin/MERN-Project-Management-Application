import React from 'react';

const Footer = () => {
  return (
    <div className='fixed bottom-0 left-0 w-full h-[50px] py-5 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 border-t border-black'>
      <div className="container mx-auto flex justify-center items-center h-full">
        <h1 className="text-white font-semibold md:font-bold text-xs md:text-lg">
          copyright@ yourCompany
        </h1>    
      </div>
    </div>
  );
};

export default Footer;
