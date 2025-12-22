import React, { useState } from 'react';

const Home = () => {
    const [isInput, setIsInput] = useState(false);

    const handleInput = () => {
        setIsInput(!isInput);
    };

    const inputStyle = {
        padding: '10px 20px',
        width: '120px',
        border: 'none',
        borderRadius: '15px',
        fontSize: '16px',
        cursor: 'pointer',
        backgroundColor: isInput ? '#28a745' : '#ffc107',
        color: 'white',
        transition: 'background-color 0.3s ease',
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Header Section */}
            <div className="flex flex-row justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    HELLO!<br />
                    <span className="text-blue-600">USER</span>
                </h1>
                <nav className="flex flex-row gap-4">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Theme
                    </button>
                    <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                        Settings
                    </button>
                </nav>
            </div>

            {/* Toggle and Form Section */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <nav className="mb-4">
                    <button onClick={handleInput} style={inputStyle} className="hover:opacity-80">
                        {isInput ? 'Income' : 'Expense'}
                    </button>
                </nav>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                            Amount
                        </label>
                        <input
                            id="amount"
                            type="number"
                            placeholder="Enter Amount"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-1">
                            Source
                        </label>
                        <input
                            id="source"
                            type="text"
                            placeholder="Enter Source"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Add {isInput ? 'Income' : 'Expense'}
                    </button>
                </form>
            </div>

            {/* Transactions List Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Transactions</h2>
                <ul className="space-y-4">
                    <li className="flex justify-between items-center p-4 bg-gray-50 rounded-md">
                        <div>
                            <h4 className="font-medium text-gray-900">Category: Food</h4>
                            <p className="text-sm text-gray-600">Amount: $50</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-600">Date: 2023-10-01</p>
                            <p className="text-sm text-gray-600">Time: 14:30</p>
                        </div>
                    </li>
                    {/* Add more list items as needed */}
                </ul>
            </div>
        </div>
    );
};

export default Home;