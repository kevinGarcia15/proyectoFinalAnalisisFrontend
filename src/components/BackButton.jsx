import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ label = "Back", className = "" }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Retrocede una página en el historial
  };

  return (
    <button
      onClick={handleBack}
      className={`flex items-center text-gray-500 hover:text-gray-700 text-sm font-medium ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-4 h-4 mr-1"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.25 19.5L8.75 12l6.5-7.5"
        />
      </svg>
      {label}
    </button>
  );
};

export default BackButton;
