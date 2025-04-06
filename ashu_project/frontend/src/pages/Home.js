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
  const role = localStorage.getItem('role') ? localStorage.getItem('role') : "user"
  useEffect(() => {
    // Fetch classes
    let url = role != 'trainer' ? 'classes' : "classes/trainer"
    let headers = {} 
    if(localStorage.getItem('token') &&  role == 'trainer' ){
      headers = {headers:{
        "Authorization": 'Bearer '+localStorage.getItem('token') 
      }}
    }
    axios.get(`http://localhost:4598/api/${url}`,headers)
      .then(res => setClasses(res.data))
      .catch(err => console.error(err));

    
    const interval = setInterval(() => {
      setBannerIndex(prevIndex => (prevIndex + 1) % bannerImages.length);
    }, 10000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="min-h-screen text-white py-10">
      <div className="container mx-auto px-4">
        {/* Banner Section */}
        <div className="mb-8 relative rounded-lg overflow-hidden">
          {bannerImages.length > 0 && (
            <img 
              src={bannerImages[bannerIndex]} 
              alt="Banner" 
              className="w-full h-80 object-cover transition duration-1000 ease-in-out"
            />
          )}
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        <h1 className="text-4xl font-bold mb-8 text-center">{ role == 'trainer' ? 'My Classes' : 'Available Classes' } { role == 'trainer' ? <span className='text-sm float-right'> <Link to={`/classes/add`} className="w-full bg-red-500 hover:bg-red-600 text-white p-2.5 rounded font-bold transition duration-200">
            Add Class
          </Link></span> : ""}</h1>
       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {classes.map(cls => (
            <div
              key={cls._id}
              className="bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
            >
              <h2 className="text-2xl font-bold mb-2">{cls.title}</h2>
              <p className="mb-4 text-gray-300">{cls.description}</p>
              <p className="mb-2">
                <span className="font-semibold">Classes On:</span> {new Date(cls.date).toLocaleString()}
              </p>
              {
                role != "trainer" ? <p className="mb-2">
                <span className="font-semibold">Trainer:</span> {cls.trainer ? cls.trainer.name : 'N/A'}
              </p> : <p className="mb-2">
                <span className="font-semibold">Capacity:</span> {cls.capacity}
                <div className="mb-2"/>
                <span className="font-semibold">Booking Count:</span> {cls.bookingCount}
              </p>
              }
              
              <p className="mb-2">
                <span className="font-semibold">Amount:</span> ${cls.amount ? cls.amount : 'N/A'}
              </p>
              {role != "trainer" ? <Link
                to={`/book/${cls._id}`}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded inline-block"
              >
                Book Now
              </Link>: ""}
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
