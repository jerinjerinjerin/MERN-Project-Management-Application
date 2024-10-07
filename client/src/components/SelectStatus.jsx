import React from 'react';

const Select = ({ options = [], ...props }) => {
  return (
    <div className="relative mb-6">
      <select
        {...props}
        className="w-full pl-10 pr-10 py-2 bg-secondary 
        rounded-lg border-lg border border-gray-700 focus:border-blue-500
        focus:ring-blue-500 focus:ring-2 text-black transition duration-200"
      >
        {options.map((option, index) => (
          <option key={index} value={option.value} className="text-black">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
