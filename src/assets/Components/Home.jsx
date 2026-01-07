import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Home.css'

const Home = () => {
    const navigate = useNavigate();
    const [isInput, setIsInput] = useState(true);
    const [category, setCategory] = useState('');
    const [source, setSource] = useState('');
    const [incomeSuggestions, setIncomeSuggestions] = useState([]);
    const [expenseSuggestions, setExpenseSuggestions] = useState([]);
    const [isIncomeDropdownVisible, setIsIncomeDropdownVisible] = useState(false);
    const [isExpenseDropdownVisible, setIsExpenseDropdownVisible] = useState(false);
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
        setIncomeSuggestions([]);
        setExpenseSuggestions([]);
        setIsIncomeDropdownVisible(false);
        setIsExpenseDropdownVisible(false);
    };

    const handleIncomeSearch = (value) => {
        if (value.trim() === '') {
            setIncomeSuggestions(sources);
        } else {
            const filtered = sources.filter((item) =>
                item.toLowerCase().includes(value.toLowerCase())
            );
            setIncomeSuggestions(filtered);
        }
        setIsIncomeDropdownVisible(true);
    };

    const handleExpenseSearch = (value) => {
        if (value.trim() === '') {
            setExpenseSuggestions(categories);
        } else {
            const filtered = categories.filter((item) =>
                item.toLowerCase().includes(value.toLowerCase())
            );
            setExpenseSuggestions(filtered);
        }
        setIsExpenseDropdownVisible(true);
    };

    const handleCategoryInput = (e) => {
        setCategory(e.target.value);
        handleExpenseSearch(e.target.value);
    };

    const handleSourceInput = (e) => {
        setSource(e.target.value);
        handleIncomeSearch(e.target.value);
    };

    const handleIncomeSelect = (item) => {
        setSource(item);
        setIsIncomeDropdownVisible(false);
    };

    const handleExpenseSelect = (item) => {
        setCategory(item);
        setIsExpenseDropdownVisible(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('fintrack_session');
        navigate('/landing');
    };
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

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Add Income Card */}
                <div className="p-6 rounded-lg shadow-md border-l-4" style={{ backgroundColor: '#ffffff', borderColor: '#10b981' }}>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#d1fae5' }}>
                            <i className="bi bi-arrow-down-circle text-2xl text-green-600"></i>
                        </div>
                        <h3 className="text-xl font-bold" style={{ color: '#14213d' }}>Add Income</h3>
                    </div>
                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label className="block text-sm font-semibold mb-2" style={{ color: '#14213d' }}>
                                Amount ($)
                            </label>
                            <input
                                type="number"
                                placeholder="0.00"
                                step="0.01"
                                className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-green-500 transition-colors"
                                style={{ border: '2px solid #e5e5e5', backgroundColor: '#ffffff', color: '#000000' }}
                            />
                        </div>

                        <div className="relative">
                            <label className="block text-sm font-semibold mb-2" style={{ color: '#14213d' }}>
                                Source
                            </label>
                            <input
                                type="text"
                                placeholder="e.g., Salary, Freelance, Investment"
                                className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-green-500 transition-colors"
                                style={{ border: '2px solid #e5e5e5', backgroundColor: '#ffffff', color: '#000000' }}
                                value={source}
                                onChange={handleSourceInput}
                                onFocus={() => handleIncomeSearch(source)}
                                onBlur={() => setTimeout(() => setIsIncomeDropdownVisible(false), 150)}
                            />
                            {isIncomeDropdownVisible && incomeSuggestions.length > 0 && (
                                <ul className="absolute z-30 w-full mt-1 rounded-lg shadow-lg max-h-40 overflow-auto border" style={{ backgroundColor: '#ffffff', borderColor: '#e5e5e5' }}>
                                    {incomeSuggestions.map((item, index) => (
                                        <li
                                            key={index}
                                            className="px-4 py-2 hover:bg-gray-50 cursor-pointer transition-colors"
                                            style={{ color: '#000000' }}
                                            onMouseDown={(e) => {
                                                e.preventDefault();
                                                handleIncomeSelect(item);
                                            }}
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2" style={{ color: '#14213d' }}>
                                Date
                            </label>
                            <input
                                type="date"
                                className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-green-500 transition-colors"
                                style={{ border: '2px solid #e5e5e5', backgroundColor: '#ffffff', color: '#000000' }}
                                defaultValue={new Date().toISOString().split('T')[0]}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full font-bold py-3 px-4 rounded-lg transition-all hover:opacity-90 flex items-center justify-center gap-2 shadow-md"
                            style={{ backgroundColor: '#10b981', color: '#ffffff' }}
                        >
                            <i className="bi bi-plus-circle"></i>
                            Add Income
                        </button>
                    </form>
                </div>

                {/* Add Expense Card */}
                <div className="p-6 rounded-lg shadow-md border-l-4" style={{ backgroundColor: '#ffffff', borderColor: '#ef4444' }}>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#fee2e2' }}>
                            <i className="bi bi-arrow-up-circle text-2xl text-red-600"></i>
                        </div>
                        <h3 className="text-xl font-bold" style={{ color: '#14213d' }}>Add Expense</h3>
                    </div>
                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label className="block text-sm font-semibold mb-2" style={{ color: '#14213d' }}>
                                Amount ($)
                            </label>
                            <input
                                type="number"
                                placeholder="0.00"
                                step="0.01"
                                className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-red-500 transition-colors"
                                style={{ border: '2px solid #e5e5e5', backgroundColor: '#ffffff', color: '#000000' }}
                            />
                        </div>

                        <div className="relative">
                            <label className="block text-sm font-semibold mb-2" style={{ color: '#14213d' }}>
                                Category
                            </label>
                            <input
                                type="text"
                                placeholder="e.g., Food, Transport, Shopping"
                                className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-red-500 transition-colors"
                                style={{ border: '2px solid #e5e5e5', backgroundColor: '#ffffff', color: '#000000' }}
                                value={category}
                                onChange={handleCategoryInput}
                                onFocus={() => handleExpenseSearch(category)}
                                onBlur={() => setTimeout(() => setIsExpenseDropdownVisible(false), 150)}
                            />
                            {isExpenseDropdownVisible && expenseSuggestions.length > 0 && (
                                <ul className="absolute z-30 w-full mt-1 rounded-lg shadow-lg max-h-40 overflow-auto border" style={{ backgroundColor: '#ffffff', borderColor: '#e5e5e5' }}>
                                    {expenseSuggestions.map((item, index) => (
                                        <li
                                            key={index}
                                            className="px-4 py-2 hover:bg-gray-50 cursor-pointer transition-colors"
                                            style={{ color: '#000000' }}
                                            onMouseDown={(e) => {
                                                e.preventDefault();
                                                handleExpenseSelect(item);
                                            }}
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2" style={{ color: '#14213d' }}>
                                Date
                            </label>
                            <input
                                type="date"
                                className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-red-500 transition-colors"
                                style={{ border: '2px solid #e5e5e5', backgroundColor: '#ffffff', color: '#000000' }}
                                defaultValue={new Date().toISOString().split('T')[0]}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full font-bold py-3 px-4 rounded-lg transition-all hover:opacity-90 flex items-center justify-center gap-2 shadow-md"
                            style={{ backgroundColor: '#ef4444', color: '#ffffff' }}
                        >
                            <i className="bi bi-plus-circle"></i>
                            Add Expense
                        </button>
                    </form>
                </div>
            </div>


            {/* Summary Cards */}
            <div className="p-6 rounded-lg shadow-md" style={{ backgroundColor: '#ffffff' }}>
                <h2 className="text-xl font-bold mb-6" style={{ color: '#14213d' }}>Financial Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 rounded-xl border-2 transition-all hover:shadow-lg" style={{ backgroundColor: '#f0fdf4', borderColor: '#10b981' }}>
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-semibold text-gray-600">Total Income</h3>
                            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#d1fae5' }}>
                                <i className="bi bi-arrow-down-circle text-xl text-green-600"></i>
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-green-600">$0.00</p>
                        <p className="text-xs text-gray-500 mt-2">This month</p>
                    </div>
                    <div className="p-6 rounded-xl border-2 transition-all hover:shadow-lg" style={{ backgroundColor: '#fef2f2', borderColor: '#ef4444' }}>
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-semibold text-gray-600">Total Expense</h3>
                            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#fee2e2' }}>
                                <i className="bi bi-arrow-up-circle text-xl text-red-600"></i>
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-red-600">$0.00</p>
                        <p className="text-xs text-gray-500 mt-2">This month</p>
                    </div>
                    <div className="p-6 rounded-xl border-2 transition-all hover:shadow-lg" style={{ backgroundColor: '#eff6ff', borderColor: '#3b82f6' }}>
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-semibold text-gray-600">Balance</h3>
                            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#dbeafe' }}>
                                <i className="bi bi-wallet2 text-xl text-blue-600"></i>
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-blue-600">$0.00</p>
                        <p className="text-xs text-gray-500 mt-2">Current balance</p>
                    </div>
                </div>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                    onClick={() => navigate('/analytics')}
                    className="p-6 rounded-lg shadow-md transition-all hover:shadow-xl hover:scale-105 flex items-center justify-between group"
                    style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5' }}
                >
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center transition-all group-hover:scale-110" style={{ backgroundColor: '#fff3cd' }}>
                            <i className="bi bi-graph-up-arrow text-2xl" style={{ color: '#fca311' }}></i>
                        </div>
                        <div className="text-left">
                            <h3 className="text-lg font-bold" style={{ color: '#14213d' }}>View Analytics</h3>
                            <p className="text-sm text-gray-600">Charts and insights</p>
                        </div>
                    </div>
                    <i className="bi bi-arrow-right text-2xl text-gray-400 group-hover:text-gray-600 transition-colors"></i>
                </button>

                <button
                    onClick={() => navigate('/reminders')}
                    className="p-6 rounded-lg shadow-md transition-all hover:shadow-xl hover:scale-105 flex items-center justify-between group"
                    style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5' }}
                >
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center transition-all group-hover:scale-110" style={{ backgroundColor: '#e0e7ff' }}>
                            <i className="bi bi-bell text-2xl" style={{ color: '#14213d' }}></i>
                        </div>
                        <div className="text-left">
                            <h3 className="text-lg font-bold" style={{ color: '#14213d' }}>Payment Reminders</h3>
                            <p className="text-sm text-gray-600">Manage your bills</p>
                        </div>
                    </div>
                    <i className="bi bi-arrow-right text-2xl text-gray-400 group-hover:text-gray-600 transition-colors"></i>
                </button>
            </div>

            {/* Recent Transactions */}
            <div className="p-6 rounded-lg shadow-md" style={{ backgroundColor: '#ffffff' }}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold" style={{ color: '#000000' }}>Recent Transactions</h2>
                    <button
                        className="font-bold py-2 px-4 rounded-md transition-colors hover:opacity-90"
                        style={{ backgroundColor: '#fca311', color: '#ffffff' }}
                        onClick={() => navigate('/transaction')}
                    >
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