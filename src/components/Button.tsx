import React from "react";

interface ButtonProps {
  text: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-white dark:bg-dark-5 border-dark dark:border-dark-4 border rounded-full inline-flex items-center justify-center py-4 px-7 text-center text-base font-medium text-blue-950 hover:bg-body-color hover:border-body-color disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5"
    >
      {text}
    </button>
  );
};

export default Button;
