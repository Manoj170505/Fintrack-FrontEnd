import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { format, parseISO, isBefore, addMonths, addYears } from 'date-fns';

const Reminders = () => {
    const navigate = useNavigate();
    const [reminders, setReminders] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        amount: '',
        dueDate: '',
        recurrence: 'once', // 'once', 'monthly', 'quarterly', 'yearly'
        emailEnabled: true,
        userEmail: ''
    });

    // EmailJS Configuration - User needs to set these up
    const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'; // Replace with your EmailJS service ID
    const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // Replace with your EmailJS template ID
    const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Replace with your EmailJS public key

    // Load reminders from localStorage on mount
    useEffect(() => {
        const savedReminders = localStorage.getItem('fintrack_reminders');
        if (savedReminders) {
            setReminders(JSON.parse(savedReminders));
        }
    }, []);

    // Save reminders to localStorage whenever they change
    useEffect(() => {
        if (reminders.length > 0) {
            localStorage.setItem('fintrack_reminders', JSON.stringify(reminders));
        }
    }, [reminders]);

    // Check for due reminders and send emails
    useEffect(() => {
        const checkReminders = () => {
            const now = new Date();
            reminders.forEach(reminder => {
                if (reminder.emailEnabled && !reminder.emailSent) {
                    const dueDate = parseISO(reminder.dueDate);
                    // Send email if due date is today or past
                    if (isBefore(dueDate, now) || format(dueDate, 'yyyy-MM-dd') === format(now, 'yyyy-MM-dd')) {
                        sendReminderEmail(reminder);
                    }
                }
            });
        };

        checkReminders();
        // Check every hour
        const interval = setInterval(checkReminders, 3600000);
        return () => clearInterval(interval);
    }, [reminders]);

    const sendReminderEmail = async (reminder) => {
        if (!reminder.userEmail || EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID') {
            console.log('Email not configured or no email address provided');
            return;
        }

        try {
            const templateParams = {
                to_email: reminder.userEmail,
                reminder_title: reminder.title,
                reminder_description: reminder.description,
                reminder_amount: reminder.amount ? `$${reminder.amount}` : 'N/A',
                reminder_date: format(parseISO(reminder.dueDate), 'MMMM dd, yyyy'),
                recurrence: reminder.recurrence
            };

            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                templateParams,
                EMAILJS_PUBLIC_KEY
            );

            // Mark email as sent
            setReminders(prev => prev.map(r =>
                r.id === reminder.id ? { ...r, emailSent: true } : r
            ));

            console.log('Reminder email sent successfully');
        } catch (error) {
            console.error('Failed to send reminder email:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.title || !formData.dueDate) {
            alert('Please fill in required fields (Title and Due Date)');
            return;
        }

        if (editingId) {
            // Update existing reminder
            setReminders(prev => prev.map(r =>
                r.id === editingId ? { ...formData, id: editingId, emailSent: false } : r
            ));
            setEditingId(null);
        } else {
            // Add new reminder
            const newReminder = {
                ...formData,
                id: Date.now().toString(),
                emailSent: false,
                createdAt: new Date().toISOString()
            };
            setReminders(prev => [...prev, newReminder]);
        }

        // Reset form
        setFormData({
            title: '',
            description: '',
            amount: '',
            dueDate: '',
            recurrence: 'once',
            emailEnabled: true,
            userEmail: ''
        });
        setIsFormOpen(false);
    };

    const handleEdit = (reminder) => {
        setFormData(reminder);
        setEditingId(reminder.id);
        setIsFormOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this reminder?')) {
            setReminders(prev => prev.filter(r => r.id !== id));
            localStorage.setItem('fintrack_reminders', JSON.stringify(reminders.filter(r => r.id !== id)));
        }
    };

    const getUrgencyColor = (dueDate) => {
        const now = new Date();
        const due = parseISO(dueDate);
        const daysUntilDue = Math.ceil((due - now) / (1000 * 60 * 60 * 24));

        if (daysUntilDue < 0) return 'border-red-500 bg-red-50';
        if (daysUntilDue <= 3) return 'border-orange-500 bg-orange-50';
        return 'border-green-500 bg-green-50';
    };

    const getRecurrenceLabel = (recurrence) => {
        const labels = {
            once: 'One-time',
            monthly: 'Monthly',
            quarterly: 'Quarterly',
            yearly: 'Yearly'
        };
        return labels[recurrence] || recurrence;
    };

    return (
        <div className="min-h-screen p-6 flex flex-col gap-6" style={{ backgroundColor: '#e5e5e5' }}>
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold" style={{ color: '#14213d' }}>
                        Payment Reminders
                    </h1>
                    <p className="text-gray-600 mt-1">Manage your payment reminders and notifications</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => navigate('/')}
                        className="px-4 py-2 rounded-lg font-semibold transition-colors hover:opacity-90 flex items-center gap-2"
                        style={{ backgroundColor: '#14213d', color: '#ffffff' }}
                    >
                        <i className="bi bi-house-door"></i> Home
                    </button>
                    <button
                        onClick={() => setIsFormOpen(true)}
                        className="px-4 py-2 rounded-lg font-semibold transition-colors hover:opacity-90 flex items-center gap-2"
                        style={{ backgroundColor: '#fca311', color: '#ffffff' }}
                    >
                        <i className="bi bi-plus-circle"></i> Add Reminder
                    </button>
                </div>
            </div>

            {/* Email Configuration Notice */}
            {EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' && (
                <div className="p-4 rounded-lg border-l-4 border-orange-500" style={{ backgroundColor: '#fff3cd' }}>
                    <div className="flex items-start gap-3">
                        <i className="bi bi-exclamation-triangle text-xl text-orange-600 mt-1"></i>
                        <div>
                            <h3 className="font-bold text-orange-800">Email Service Not Configured</h3>
                            <p className="text-sm text-orange-700 mt-1">
                                To enable email notifications, please set up EmailJS:
                            </p>
                            <ol className="text-sm text-orange-700 mt-2 ml-4 list-decimal">
                                <li>Create a free account at <a href="https://www.emailjs.com/" target="_blank" rel="noopener noreferrer" className="underline font-semibold">emailjs.com</a></li>
                                <li>Create an email service and template</li>
                                <li>Update the configuration in Reminders.jsx with your Service ID, Template ID, and Public Key</li>
                            </ol>
                        </div>
                    </div>
                </div>
            )}

            {/* Reminders List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {reminders.length === 0 ? (
                    <div className="col-span-full p-12 rounded-lg shadow-md text-center" style={{ backgroundColor: '#ffffff' }}>
                        <i className="bi bi-bell-slash text-5xl text-gray-300 mb-4 block"></i>
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No Reminders Yet</h3>
                        <p className="text-gray-500 mb-4">Click "Add Reminder" to create your first payment reminder</p>
                        <button
                            onClick={() => setIsFormOpen(true)}
                            className="px-6 py-3 rounded-lg font-semibold transition-colors hover:opacity-90"
                            style={{ backgroundColor: '#fca311', color: '#ffffff' }}
                        >
                            <i className="bi bi-plus-circle mr-2"></i> Create Reminder
                        </button>
                    </div>
                ) : (
                    reminders.map(reminder => (
                        <div
                            key={reminder.id}
                            className={`p-6 rounded-lg shadow-md border-l-4 transition-all hover:shadow-lg ${getUrgencyColor(reminder.dueDate)}`}
                        >
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="text-lg font-bold" style={{ color: '#14213d' }}>
                                    {reminder.title}
                                </h3>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(reminder)}
                                        className="p-1 hover:opacity-70 transition-opacity"
                                    >
                                        <i className="bi bi-pencil text-blue-600"></i>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(reminder.id)}
                                        className="p-1 hover:opacity-70 transition-opacity"
                                    >
                                        <i className="bi bi-trash text-red-600"></i>
                                    </button>
                                </div>
                            </div>

                            {reminder.description && (
                                <p className="text-sm text-gray-600 mb-3">{reminder.description}</p>
                            )}

                            <div className="space-y-2">
                                {reminder.amount && (
                                    <div className="flex items-center gap-2 text-sm">
                                        <i className="bi bi-cash text-green-600"></i>
                                        <span className="font-semibold">${reminder.amount}</span>
                                    </div>
                                )}

                                <div className="flex items-center gap-2 text-sm">
                                    <i className="bi bi-calendar-event" style={{ color: '#14213d' }}></i>
                                    <span>{format(parseISO(reminder.dueDate), 'MMM dd, yyyy')}</span>
                                </div>

                                <div className="flex items-center gap-2 text-sm">
                                    <i className="bi bi-arrow-repeat" style={{ color: '#14213d' }}></i>
                                    <span>{getRecurrenceLabel(reminder.recurrence)}</span>
                                </div>

                                {reminder.emailEnabled && (
                                    <div className="flex items-center gap-2 text-sm">
                                        <i className={`bi ${reminder.emailSent ? 'bi-check-circle-fill text-green-600' : 'bi-envelope'}`} style={{ color: reminder.emailSent ? '#10b981' : '#14213d' }}></i>
                                        <span className={reminder.emailSent ? 'text-green-600 font-semibold' : ''}>
                                            {reminder.emailSent ? 'Email Sent' : 'Email Enabled'}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Add/Edit Reminder Modal */}
            {isFormOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold" style={{ color: '#14213d' }}>
                                    {editingId ? 'Edit Reminder' : 'Add New Reminder'}
                                </h2>
                                <button
                                    onClick={() => {
                                        setIsFormOpen(false);
                                        setEditingId(null);
                                        setFormData({
                                            title: '',
                                            description: '',
                                            amount: '',
                                            dueDate: '',
                                            recurrence: 'once',
                                            emailEnabled: true,
                                            userEmail: ''
                                        });
                                    }}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <i className="bi bi-x-lg text-xl"></i>
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-2" style={{ color: '#14213d' }}>
                                        Title <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Electricity Bill"
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2" style={{ color: '#14213d' }}>
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        placeholder="Additional details..."
                                        rows="3"
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2" style={{ color: '#14213d' }}>
                                        Amount ($)
                                    </label>
                                    <input
                                        type="number"
                                        name="amount"
                                        value={formData.amount}
                                        onChange={handleInputChange}
                                        placeholder="0.00"
                                        step="0.01"
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2" style={{ color: '#14213d' }}>
                                        Due Date <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="dueDate"
                                        value={formData.dueDate}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2" style={{ color: '#14213d' }}>
                                        Recurrence
                                    </label>
                                    <select
                                        name="recurrence"
                                        value={formData.recurrence}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    >
                                        <option value="once">One-time</option>
                                        <option value="monthly">Monthly</option>
                                        <option value="quarterly">Quarterly</option>
                                        <option value="yearly">Yearly</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2" style={{ color: '#14213d' }}>
                                        Your Email (for notifications)
                                    </label>
                                    <input
                                        type="email"
                                        name="userEmail"
                                        value={formData.userEmail}
                                        onChange={handleInputChange}
                                        placeholder="your.email@example.com"
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                </div>

                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        name="emailEnabled"
                                        id="emailEnabled"
                                        checked={formData.emailEnabled}
                                        onChange={handleInputChange}
                                        className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                                    />
                                    <label htmlFor="emailEnabled" className="text-sm font-medium" style={{ color: '#14213d' }}>
                                        Send email notification when due
                                    </label>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsFormOpen(false);
                                            setEditingId(null);
                                            setFormData({
                                                title: '',
                                                description: '',
                                                amount: '',
                                                dueDate: '',
                                                recurrence: 'once',
                                                emailEnabled: true,
                                                userEmail: ''
                                            });
                                        }}
                                        className="flex-1 px-4 py-3 rounded-lg font-semibold transition-colors hover:opacity-90"
                                        style={{ backgroundColor: '#e5e5e5', color: '#14213d' }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-4 py-3 rounded-lg font-semibold transition-colors hover:opacity-90"
                                        style={{ backgroundColor: '#fca311', color: '#ffffff' }}
                                    >
                                        {editingId ? 'Update' : 'Add'} Reminder
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Reminders;
