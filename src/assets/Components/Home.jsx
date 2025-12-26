import React, { useState } from 'react';
import '../CSS/Home.css'

const Home = () => {
    const [isInput, setIsInput] = useState(false);
    const [category, setCategory] = useState('');
    const [source, setSource] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [toggled, setToggled] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [reminderTime, setReminderTime] = useState('09:00');

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

    const handleToggleReminder = () => {
        if (!toggled) {
            setShowTimePicker(true);
        } else {
            setToggled(false);
        }
    };

    const handleSaveTime = () => {
        setToggled(true);
        setShowTimePicker(false);
        console.log(`Reminder set for: ${reminderTime}`);
    };

    const handleCancelTime = () => {
        setShowTimePicker(false);
    };

    return (
        <div className="min-h-screen p-6 flex flex-col gap-6" style={{ backgroundColor: '#e5e5e5' }}>
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold" style={{ color: '#000000' }}>
                    HELLO!<br />
                    <span style={{ color: '#14213d' }}>USER</span>
                </h1>
                <div className="relative">
                    <button
                        onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                        className="p-2 rounded-full hover:opacity-80 transition-opacity"
                        style={{ backgroundColor: 'transparent' }}
                    >
                        <i className="bi bi-gear-wide-connected text-3xl" style={{ color: '#14213d' }}></i>
                    </button>
                    {isSettingsOpen && (
                        <>
                            <div className="fixed inset-0 z-10" onClick={() => setIsSettingsOpen(false)}></div>
                            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-2 z-20" style={{ backgroundColor: '#ffffff', border: '1px solid #e5e5e5' }}>
                                <button
                                    onClick={handleRefresh}
                                    className="flex items-center w-full px-4 py-2 text-sm hover:opacity-80 transition-opacity"
                                    style={{ color: '#000000' }}
                                >
                                    <i className="bi bi-arrow-clockwise mr-3"></i> Refresh
                                </button>
                                <div className=" border-t my-1" style={{ borderColor: '#e5e5e5' }}></div>
                                <div className="flex">
                                    <button
                                        className="flex items-center w-full px-4 py-2 text-sm hover:opacity-80 transition-opacity"
                                        style={{ color: '#000000' }}
                                    >
                                        <i className="bi bi-alarm mr-3"></i>     Daily Reminder
                                    </button>
                                    <button
                                        className={`toggle-btn ${toggled ? 'toggled' : ''}`}
                                        onClick={handleToggleReminder}
                                    >
                                        <div className="thumb"></div>
                                    </button>
                                </div>
                                <div className="border-t my-1" style={{ borderColor: '#e5e5e5' }}></div>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center w-full px-4 py-2 text-sm hover:opacity-80 transition-opacity"
                                    style={{ color: '#fca311' }}
                                >
                                    <i className="bi bi-box-arrow-right mr-3"></i> Logout
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Add Transaction Form */}
            <div className="p-6 rounded-lg shadow-md" style={{ backgroundColor: '#ffffff' }}>
                <nav className="mb-6">
                    <button
                        onClick={handleInputToggle}
                        className="px-6 py-2 rounded-lg font-semibold text-white transition-colors hover:opacity-90"
                        style={{ backgroundColor: isInput ? '#14213d' : '#fca311' }}
                    >
                        {isInput ? 'Income' : 'Expense'}
                    </button>
                </nav>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#000000' }}>Amount</label>
                        <input
                            type="number"
                            placeholder="Enter Amount"
                            className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2"
                            style={{ border: '1px solid #e5e5e5', backgroundColor: '#ffffff', color: '#000000' }}
                        />
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-medium mb-2" style={{ color: '#000000' }}>
                            {isInput ? 'Source' : 'Category'}
                        </label>
                        <input
                            type="text"
                            placeholder={isInput ? "Enter Source" : "Search Category..."}
                            className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2"
                            style={{ border: '1px solid #e5e5e5', backgroundColor: '#ffffff', color: '#000000' }}
                            value={isInput ? source : category}
                            onChange={isInput ? handleSourceInput : handleCategoryInput}
                            onFocus={() => handleSearch(isInput ? source : category, isInput ? sources : categories)}
                            onBlur={() => setTimeout(() => setIsDropdownVisible(false), 150)}
                        />
                        {isDropdownVisible && suggestions.length > 0 && (
                            <ul className="absolute z-30 w-full mt-1 rounded-md shadow-lg max-h-40 overflow-auto" style={{ backgroundColor: '#ffffff', border: '1px solid #e5e5e5' }}>
                                {suggestions.map((item, index) => (
                                    <li
                                        key={index}
                                        className="px-4 py-2 hover:opacity-80 cursor-pointer transition-opacity"
                                        style={{ color: '#000000', backgroundColor: '#ffffff' }}
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

                    <button
                        type="submit"
                        className="w-full font-bold py-3 px-4 rounded-md transition-colors hover:opacity-90"
                        style={{ backgroundColor: '#fca311', color: '#ffffff' }}
                    >
                        Add {isInput ? 'Income' : 'Expense'}
                    </button>
                </form>
            </div>

            {/* Summary Cards */}
            <div className="p-6 rounded-lg shadow-md" style={{ backgroundColor: '#ffffff' }}>
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <h2 className="text-lg font-semibold" style={{ color: '#000000' }}>Total Income</h2>
                        <p className="text-2xl font-bold" style={{ color: '#14213d' }}>$0</p>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold" style={{ color: '#000000' }}>Total Expense</h2>
                        <p className="text-2xl font-bold" style={{ color: '#fca311' }}>$0</p>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold" style={{ color: '#000000' }}>Balance</h2>
                        <p className="text-2xl font-bold" style={{ color: '#000000' }}>$0</p>
                    </div>
                </div>
            </div>

            {/* View Analysis Button */}
            <div className="flex gap-4 ">
                <button className="font-bold py-3 px-6 rounded-md transition-colors hover:opacity-90 flex items-center justify-center gap-2 self-start" style={{ backgroundColor: '#fca311', color: '#ffffff' }}>
                    View Analysis <i className="bi bi-graph-up-arrow"></i>
                </button>
                <button className="font-bold py-3 px-6 rounded-md transition-colors hover:opacity-90 flex items-center justify-center gap-2 self-start" style={{ backgroundColor: '#14213d', color: '#ffffff' }}>
                    Add Reminders <i className="bi bi-alarm"></i>
                </button>
            </div>

            {/* Recent Transactions */}
            <div className="p-6 rounded-lg shadow-md" style={{ backgroundColor: '#ffffff' }}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold" style={{ color: '#000000' }}>Recent Transactions</h2>
                    <button className="font-bold py-2 px-4 rounded-md transition-colors hover:opacity-90" style={{ backgroundColor: '#fca311', color: '#ffffff' }}>
                        View All
                    </button>
                </div>
                <ul className="space-y-4">
                    <li className="flex justify-between items-center p-4 rounded-md" style={{ backgroundColor: '#e5e5e5', borderLeft: '4px solid #fca311' }}>
                        <div>
                            <h4 className="font-medium" style={{ color: '#000000' }}>Category: Food</h4>
                            <p className="text-sm" style={{ color: '#14213d' }}>Amount: $50</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm" style={{ color: '#14213d' }}>2023-10-01</p>
                            <p className="text-sm" style={{ color: '#14213d' }}>14:30</p>
                        </div>
                    </li>
                </ul>
            </div>

            {showTimePicker && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3 className="text-xl font-bold text-center mb-2" style={{ color: '#14213d' }}>Set Reminder Time</h3>
                        <p className="text-sm text-center text-gray-500 mb-4">Pick a time for your daily reminder</p>
                        <input
                            type="time"
                            className="time-input"
                            value={reminderTime}
                            onChange={(e) => setReminderTime(e.target.value)}
                        />
                        <div className="modal-actions">
                            <button
                                onClick={handleCancelTime}
                                className="modal-btn modal-btn-cancel hover:opacity-80"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveTime}
                                className="modal-btn modal-btn-save hover:opacity-90"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;