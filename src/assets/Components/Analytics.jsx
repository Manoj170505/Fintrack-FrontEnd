import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    PieChart, Pie, Cell, BarChart, Bar, LineChart, Line,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear, parseISO } from 'date-fns';

const Analytics = () => {
    const navigate = useNavigate();
    const [filterPeriod, setFilterPeriod] = useState('month'); // 'week', 'month', 'year'

    // Mock transaction data - in real app, this would come from props or context
    const transactions = [
        { id: '001', category: 'Food', source: 'Salary', amount: 1000.00, date: '2026-01-01', time: '09:00 AM', type: 'income' },
        { id: '002', category: 'Food', source: 'Groceries', amount: -150.00, date: '2026-01-02', time: '14:30 PM', type: 'expense' },
        { id: '003', category: 'Transport', source: 'Uber', amount: -50.00, date: '2026-01-03', time: '18:15 PM', type: 'expense' },
        { id: '004', category: 'Shopping', source: 'Amazon', amount: -120.00, date: '2026-01-04', time: '11:00 AM', type: 'expense' },
        { id: '005', category: 'Entertainment', source: 'Netflix', amount: -20.00, date: '2026-01-05', time: '20:00 PM', type: 'expense' },
        { id: '006', category: 'Health', source: 'Gym', amount: -80.00, date: '2026-01-06', time: '10:30 AM', type: 'expense' },
        { id: '007', category: 'Education', source: 'Course', amount: -200.00, date: '2026-01-07', time: '15:00 PM', type: 'expense' },
        { id: '008', category: 'Others', source: 'Freelance', amount: 500.00, date: '2025-12-28', time: '16:00 PM', type: 'income' },
        { id: '009', category: 'Food', source: 'Restaurant', amount: -75.00, date: '2025-12-25', time: '19:00 PM', type: 'expense' },
        { id: '010', category: 'Transport', source: 'Gas', amount: -60.00, date: '2025-12-20', time: '08:00 AM', type: 'expense' },
    ];

    // Filter transactions based on selected period
    const filteredTransactions = useMemo(() => {
        const now = new Date();
        let startDate, endDate;

        switch (filterPeriod) {
            case 'week':
                startDate = startOfWeek(now);
                endDate = endOfWeek(now);
                break;
            case 'month':
                startDate = startOfMonth(now);
                endDate = endOfMonth(now);
                break;
            case 'year':
                startDate = startOfYear(now);
                endDate = endOfYear(now);
                break;
            default:
                startDate = startOfMonth(now);
                endDate = endOfMonth(now);
        }

        return transactions.filter(t => {
            const transactionDate = parseISO(t.date);
            return transactionDate >= startDate && transactionDate <= endDate;
        });
    }, [filterPeriod]);

    // Calculate totals
    const { totalIncome, totalExpense, balance } = useMemo(() => {
        const income = filteredTransactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);
        const expense = Math.abs(filteredTransactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0));
        return {
            totalIncome: income,
            totalExpense: expense,
            balance: income - expense
        };
    }, [filteredTransactions]);

    // Prepare data for Pie Chart (Expense by Category)
    const expenseByCategory = useMemo(() => {
        const categoryMap = {};
        filteredTransactions
            .filter(t => t.type === 'expense')
            .forEach(t => {
                const category = t.category;
                categoryMap[category] = (categoryMap[category] || 0) + Math.abs(t.amount);
            });
        return Object.entries(categoryMap).map(([name, value]) => ({ name, value }));
    }, [filteredTransactions]);

    // Prepare data for Bar Chart (Income vs Expense)
    const incomeVsExpense = [
        { name: 'Income', amount: totalIncome, fill: '#10b981' },
        { name: 'Expense', amount: totalExpense, fill: '#ef4444' }
    ];

    // Prepare data for Line Chart (Trends over time)
    const trendData = useMemo(() => {
        const dateMap = {};
        filteredTransactions.forEach(t => {
            const date = t.date;
            if (!dateMap[date]) {
                dateMap[date] = { date, income: 0, expense: 0 };
            }
            if (t.type === 'income') {
                dateMap[date].income += t.amount;
            } else {
                dateMap[date].expense += Math.abs(t.amount);
            }
        });
        return Object.values(dateMap).sort((a, b) => new Date(a.date) - new Date(b.date));
    }, [filteredTransactions]);

    // Colors for Pie Chart
    const COLORS = ['#fca311', '#14213d', '#ef4444', '#10b981', '#8b5cf6', '#ec4899', '#6b7280'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="font-bold text-xs">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div className="min-h-screen p-6 flex flex-col gap-6" style={{ backgroundColor: '#e5e5e5' }}>
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold" style={{ color: '#14213d' }}>
                        Financial Analytics
                    </h1>
                    <p className="text-gray-600 mt-1">Visualize your income and expenses</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => navigate('/')}
                        className="px-4 py-2 rounded-lg font-semibold transition-colors hover:opacity-90 flex items-center gap-2"
                        style={{ backgroundColor: '#14213d', color: '#ffffff' }}
                    >
                        <i className="bi bi-house-door"></i> Home
                    </button>
                </div>
            </div>

            {/* Filter Controls */}
            <div className="p-6 rounded-lg shadow-md" style={{ backgroundColor: '#ffffff' }}>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h2 className="text-xl font-semibold" style={{ color: '#14213d' }}>
                        Filter by Period
                    </h2>
                    <div className="flex gap-2">
                        {['week', 'month', 'year'].map(period => (
                            <button
                                key={period}
                                onClick={() => setFilterPeriod(period)}
                                className={`px-6 py-2 rounded-lg font-semibold transition-colors capitalize ${filterPeriod === period
                                        ? 'text-white'
                                        : 'text-gray-700 hover:opacity-80'
                                    }`}
                                style={{
                                    backgroundColor: filterPeriod === period ? '#fca311' : '#e5e5e5'
                                }}
                            >
                                {period}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-6 rounded-lg shadow-md" style={{ backgroundColor: '#ffffff' }}>
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-medium text-gray-600">Total Income</h3>
                            <p className="text-3xl font-bold text-green-600 mt-2">
                                ${totalIncome.toFixed(2)}
                            </p>
                        </div>
                        <div className="p-3 rounded-full bg-green-100">
                            <i className="bi bi-arrow-up-circle text-2xl text-green-600"></i>
                        </div>
                    </div>
                </div>
                <div className="p-6 rounded-lg shadow-md" style={{ backgroundColor: '#ffffff' }}>
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-medium text-gray-600">Total Expense</h3>
                            <p className="text-3xl font-bold text-red-600 mt-2">
                                ${totalExpense.toFixed(2)}
                            </p>
                        </div>
                        <div className="p-3 rounded-full bg-red-100">
                            <i className="bi bi-arrow-down-circle text-2xl text-red-600"></i>
                        </div>
                    </div>
                </div>
                <div className="p-6 rounded-lg shadow-md" style={{ backgroundColor: '#ffffff' }}>
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-medium text-gray-600">Balance</h3>
                            <p className={`text-3xl font-bold mt-2 ${balance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                                ${balance.toFixed(2)}
                            </p>
                        </div>
                        <div className="p-3 rounded-full bg-blue-100">
                            <i className="bi bi-wallet2 text-2xl text-blue-600"></i>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pie Chart - Expense by Category */}
                <div className="p-6 rounded-lg shadow-md" style={{ backgroundColor: '#ffffff' }}>
                    <h3 className="text-xl font-semibold mb-4" style={{ color: '#14213d' }}>
                        Expenses by Category
                    </h3>
                    {expenseByCategory.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={expenseByCategory}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {expenseByCategory.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-[300px] flex items-center justify-center text-gray-400">
                            <div className="text-center">
                                <i className="bi bi-pie-chart text-4xl mb-2 block"></i>
                                <p>No expense data for this period</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Bar Chart - Income vs Expense */}
                <div className="p-6 rounded-lg shadow-md" style={{ backgroundColor: '#ffffff' }}>
                    <h3 className="text-xl font-semibold mb-4" style={{ color: '#14213d' }}>
                        Income vs Expense
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={incomeVsExpense}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                            <Bar dataKey="amount" fill="#fca311" radius={[8, 8, 0, 0]}>
                                {incomeVsExpense.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Line Chart - Trends */}
            <div className="p-6 rounded-lg shadow-md" style={{ backgroundColor: '#ffffff' }}>
                <h3 className="text-xl font-semibold mb-4" style={{ color: '#14213d' }}>
                    Income & Expense Trends
                </h3>
                {trendData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={trendData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="date"
                                tickFormatter={(date) => format(parseISO(date), 'MMM dd')}
                            />
                            <YAxis />
                            <Tooltip
                                formatter={(value) => `$${value.toFixed(2)}`}
                                labelFormatter={(date) => format(parseISO(date), 'MMM dd, yyyy')}
                            />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="income"
                                stroke="#10b981"
                                strokeWidth={2}
                                name="Income"
                                dot={{ fill: '#10b981', r: 4 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="expense"
                                stroke="#ef4444"
                                strokeWidth={2}
                                name="Expense"
                                dot={{ fill: '#ef4444', r: 4 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="h-[300px] flex items-center justify-center text-gray-400">
                        <div className="text-center">
                            <i className="bi bi-graph-up text-4xl mb-2 block"></i>
                            <p>No transaction data for this period</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Analytics;