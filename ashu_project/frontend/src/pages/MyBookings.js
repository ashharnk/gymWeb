import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


function importAll(r) {
  return r.keys().map(r);
}
const bannerImages = importAll(require.context('../../image', false, /\.(png|jpe?g|svg)$/));

const Home = () => {
  const [classes, setClasses] = useState([]);
  const [bannerIndex, setBannerIndex] = useState(0);

  useEffect(() => {

    const token = localStorage.getItem('token');
    // Fetch classes
    axios.get('http://localhost:4598/api/bookings/my', { headers: { Authorization: token } })
      .then(res => setClasses(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen text-white py-10">
      <div className="container mx-auto px-4">

        <h1 className="text-4xl font-bold mb-8 text-center">My Bookings</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {classes.map(cls => (
            <div
              key={cls._id}
              className="bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
            >
              <h2 className="text-2xl font-bold mb-2">{cls.classId.title}</h2>
              <p className="mb-4 text-gray-300">{cls.description}</p>
              <p className="mb-2">
                <span className="font-semibold">Classes On:</span> {new Date(cls.classId.date).toLocaleString()}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Status:</span> {cls.status}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Amount:</span> ${cls.classId.amount ? cls.classId.amount : 0}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Payment ID:</span> ${cls.paymentIntentId}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
