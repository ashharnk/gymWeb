import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const AddClass = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [capacity, setCapacity] = useState('');
    const [Amount, setAmount] = useState('');
    const [error, setError] = useState('');

    const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if (!token || role !== 'trainer') {
            window.location.href = '/';
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            await axios.post(
                'http://localhost:4598/api/classes/',
                { title, description, date, amount:parseFloat(Amount) ,capacity},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            history.push('/');
        } catch (err) {
            console.error(err);
            setError(err?.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-extrabold text-center text-red-500 mb-6">Add Class</h1>
                {error && <p className="text-red-400 mb-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label className="block text-white text-lg mb-2">Title:</label>
                        <input
                            type="text"
                            className="w-full p-3 rounded border border-gray-700 focus:outline-none focus:border-red-500"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label className="block text-white text-lg mb-2">Description:</label>
                        <input
                            type="text"
                            className="w-full p-3 rounded border border-gray-700 focus:outline-none focus:border-red-500"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label className="block text-white text-lg mb-2">Date:</label>
                        <input
                            type="date"
                            className="w-full p-3 rounded border border-gray-700 focus:outline-none focus:border-red-500"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label className="block text-white text-lg mb-2">Capacity:</label>
                        <input
                            type="number"
                            className="w-full p-3 rounded border border-gray-700 focus:outline-none focus:border-red-500"
                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label className="block text-white text-lg mb-2">Amount:</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                            <input
                                type="text"
                                className="w-full pl-7 p-3 rounded border border-gray-700 focus:outline-none focus:border-red-500"
                                value={Amount}
                                onChange={(e) => {
                                    const raw = e.target.value.replace(/[^0-9.]/g, ''); // remove non-numeric
                                    setAmount(raw);
                                }}
                                required
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded font-bold transition duration-200"
                    >
                        Add Class
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddClass;
