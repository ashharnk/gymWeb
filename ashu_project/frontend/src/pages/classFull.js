
import React from 'react';
import { Link } from 'react-router-dom';

const ClassFull = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold text-red-500 mb-4">Class is Full</h1>
      <p className="text-gray-300 text-lg mb-6">
        Unfortunately, this class has reached its maximum capacity and cannot accept more bookings.
      </p>
      <Link to="/">
        <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition duration-200">
          Browse Other Classes
        </button>
      </Link>
    </div>
  );
};

export default ClassFull;
