import React from 'react';

const Label = ({  htmlFor, ...props }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block mb-2 text-sm font-medium text-gray-800 `}
      {...props}
    >
      {htmlFor}
    </label>
  );
};

export default Label;
