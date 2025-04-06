import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51RAoG3QNlPxXEsWKU8vn3FcvHtgdtXzgdRxMrbRnH3HMJkwSBfbi09gLOsjKv0rXFD4Zv2OHAJYry5Lbx0rgsTqo00B0yB41NN');

const BookClassForm = ({ classId }) => {
  const [classData, setClassData] = useState(null);
  const [amount] = useState(5000); // amount in cents (adjust as needed)
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();

  useEffect(() => {
    if(!localStorage.getItem('token')){
      window.location.href = "/login"
    }
    axios.get(`https://fitness-app-dr9e.onrender.com/api/classes`)
      .then(res => {
        const cls = res.data.find(c => c._id === classId);
        setClassData(cls);
      })
      .catch(err => console.error(err));
  }, [classId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    // Payment processing logic can be uncommented and integrated when ready.
    // For now, redirect directly:
    //history.push('/confirmation');

    // Example payment intent creation and booking creation:
    
    const paymentIntentRes = await axios.post(
      'https://fitness-app-dr9e.onrender.com/api/payments/create-payment-intent', 
      { amount, currency: 'usd' }, 
      { headers: { Authorization: token } }
    );
    const clientSecret = paymentIntentRes.data.clientSecret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: elements.getElement(CardElement) }
    });

    if(result.error){
      console.error(result.error.message);
      history.push('/failure');
    } else if(result.paymentIntent.status === 'succeeded'){
      await axios.post(
        'https://fitness-app-dr9e.onrender.com/api/bookings', 
        { classId, paymentIntentId: result.paymentIntent.id }, 
        { headers: { Authorization: token } }
      );

      await axios.patch(
        `https://fitness-app-dr9e.onrender.com/api/classes/${classId}/reduce`,
        {},
        { headers: { Authorization: token } }
      );

      history.push('/confirmation');
    }
    
  };

  if (!classData) {
    return <div className="text-white text-center">Loading...</div>;
  }
  if (classData.capacity <= 0) {
    history.push('/classes/full');
  }

  return (
    <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-red-500">
        Book Class: {classData.title}
      </h1>
      <p className="text-gray-300">{classData.description}</p>
      <form onSubmit={handleSubmit} className="mt-6">
        <div className="bg-gray-700 p-4 rounded mb-4">
          <CardElement
            options={{
              style: {
                base: {
                  color: '#ffffff',
                  fontSize: '16px',
                  '::placeholder': { color: '#a0aec0' },
                },
                invalid: {
                  color: '#f56565',
                },
              },
            }}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded font-bold transition duration-200"
        >
          Pay & Book
        </button>
      </form>
    </div>
  );
};

const BookClass = () => {
  const { classId } = useParams();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <Elements stripe={stripePromise}>
        <BookClassForm classId={classId} />
      </Elements>
    </div>
  );
};

export default BookClass;
