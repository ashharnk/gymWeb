import React from 'react';

const Failure = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-extrabold text-red-600 mb-4">Booking Failed!</h1>
        <p className="text-gray-300">
          Oops! Something went wrong while processing your booking. Please try again later.
        </p>
      </div>
    </div>
  );
};

export default Failure;
