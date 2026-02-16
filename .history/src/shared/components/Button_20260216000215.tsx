import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`bg-[#F1DC5B] text-gray-800 font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-[#e6ca2c] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#F1DC5B] focus:ring-offset-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
