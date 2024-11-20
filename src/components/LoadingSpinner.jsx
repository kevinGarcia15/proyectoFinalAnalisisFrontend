import React from 'react';

const LoadingSpinner = ({ size = 24, color = "#3b82f6", message = "Cargando..." }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div
        style={{
          width: `${size}px`,
          height: `${size}px`,
          border: "4px solid",
          borderColor: `${color} transparent ${color} transparent`,
        }}
        className="rounded-full animate-spin"
      ></div>
      {message && <p className="text-gray-500 text-sm">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
