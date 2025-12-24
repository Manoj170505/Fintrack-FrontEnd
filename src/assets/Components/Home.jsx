import React, { useState } from 'react';

const Home = () => {
    const [isInput, setIsInput] = useState(false);
    const [category, setCategory] = useState('');
    const [source, setSource] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const categories = ['Food', 'Transport', 'Education', 'Entertainment', 'Shopping', 'Health', 'Others'];
    const sources = ['Salary', 'Pocket Money', 'Investment', 'Others'];

    const handleInputToggle = () => {
        setIsInput(!isInput);
        setCategory('');
        setSource('');
        setSuggestions([]);
        setIsDropdownVisible(false);
    };

    const handleSearch = (value, list) => {
        if (value.trim() === '') {
            setSuggestions(list);
        } else {
            const filtered = list.filter((item) =>
                item.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filtered);
        }
        setIsDropdownVisible(true);
    };

    const handleCategoryInput = (e) => {
        setCategory(e.target.value);
        handleSearch(e.target.value, categories);
    };

    const handleSourceInput = (e) => {
        setSource(e.target.value);
        handleSearch(e.target.value, sources);
    };

    const handleSelect = (item) => {
        if (isInput) setSource(item);
        else setCategory(item);
        setIsDropdownVisible(false);
    };

    const handleLogout = () => console.log("Logged out");
    const handleRefresh = () => window.location.reload();

    const inputStyle = {
        padding: '10px 20px',
        width: '120px',
        border: 'none',
        borderRadius: '50px',
        fontSize: '16px',
        cursor: 'pointer',
        backgroundColor: isInput ? '#28a745' : '#ffc107',
        color: 'white',
        transition: 'background-color 0.3s ease',
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="flex flex-row justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    HELLO!<br />
                    <span className="text-blue-600">USER</span>
                </h1>
                <div className="relative">
                    <button onClick={() => setIsSettingsOpen(!isSettingsOpen)} className="bg-none font-bold py-2 px-4 rounded focus:outline-none">
                        <i className="bi bi-gear-wide-connected text-gray-700 cursor-pointer text-3xl"></i>
                    </button>
                    {isSettingsOpen && (
                        <>
                            <div className="fixed inset-0 z-10" onClick={() => setIsSettingsOpen(false)}></div>
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl py-2 z-20 border border-gray-200">
                                <button onClick={handleRefresh} className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                                    <i className="bi bi-arrow-clockwise mr-3"></i> Refresh
                                </button>
                                <div className="border-t border-gray-100 my-1"></div>
                                <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                                    <i className="bi bi-box-arrow-right mr-3"></i> Logout
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <nav className="mb-4">
                    <button onClick={handleInputToggle} style={inputStyle} className="hover:opacity-80">
                        {isInput ? 'Income' : 'Expense'}
                    </button>
                </nav>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                        <input type="number" placeholder="Enter Amount" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">{isInput ? 'Source' : 'Category'}</label>
                        <input
                            type="text"
                            placeholder={isInput ? "Enter Source" : "Search Category..."}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={isInput ? source : category}
                            onChange={isInput ? handleSourceInput : handleCategoryInput}
                            onFocus={() => handleSearch(isInput ? source : category, isInput ? sources : categories)}
                            onBlur={() => setIsDropdownVisible(false)}
                        />
                        {isDropdownVisible && suggestions.length > 0 && (
                            <ul className="absolute z-30 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg max-h-40 overflow-auto">
                                {suggestions.map((item, index) => (
                                    <li
                                        key={index}
                                        className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-gray-700"
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                            handleSelect(item);
                                        }}
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">
                        Add {isInput ? 'Income' : 'Expense'}
                    </button>
                </form>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Transactions</h2>
                <ul className="space-y-4">
                    <li className="flex justify-between items-center p-4 bg-gray-50 rounded-md border-l-4 border-yellow-500">
                        <div>
                            <h4 className="font-medium text-gray-900">Category: Food</h4>
                            <p className="text-sm text-gray-600">Amount: $50</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-600">2023-10-01</p>
                            <p className="text-sm text-gray-600">14:30</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Home;