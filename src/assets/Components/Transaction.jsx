import React, { useState, useRef, useEffect, useMemo } from 'react'



const Transaction = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isExportOpen, setIsExportOpen] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [filterMonth, setFilterMonth] = useState('all');

    const filterRef = useRef(null);
    const exportRef = useRef(null);

    // Mock Data
    const [transactions] = useState([
        { id: '001', category: 'Food', source: 'Salary', amount: 1000.00, date: '2022-01-01', time: '09:00 AM', type: 'income' },
        { id: '002', category: 'Transport', source: 'Savings', amount: -50.00, date: '2022-01-02', time: '14:30 PM', type: 'expense' },
        { id: '003', category: 'Shopping', source: 'Pocket Money', amount: -120.00, date: '2022-02-15', time: '18:15 PM', type: 'expense' },
        { id: '004', category: 'Health', source: 'Investment', amount: 500.00, date: '2022-03-10', time: '11:00 AM', type: 'income' },
        { id: '005', category: 'Entertainment', source: 'Bonus', amount: 200.00, date: '2022-01-20', time: '20:00 PM', type: 'income' },
        { id: '006', category: 'Others', source: 'Freelance', amount: 450.00, date: '2022-02-05', time: '10:30 AM', type: 'income' },
    ]);

    // Close menus when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setIsFilterOpen(false);
            }
            if (exportRef.current && !exportRef.current.contains(event.target)) {
                setIsExportOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Filtering Logic optimized with useMemo
    const filteredTransactions = useMemo(() => {
        return transactions.filter(transaction => {
            const searchLower = searchQuery.toLowerCase();
            const matchesSearch =
                transaction.source.toLowerCase().includes(searchLower) ||
                transaction.category.toLowerCase().includes(searchLower) ||
                transaction.type.toLowerCase().includes(searchLower);

            const matchesType = filterType === 'all' || transaction.type === filterType;

            // Fix: ensure date parsing is consistent
            const d = new Date(transaction.date);
            const transactionMonth = d.toLocaleString('default', { month: 'long' }).toLowerCase();
            const matchesMonth = filterMonth === 'all' || transactionMonth === filterMonth;

            return matchesSearch && matchesType && matchesMonth;
        });
    }, [transactions, searchQuery, filterType, filterMonth]);

    const exportOptions = [
        { label: 'Excel', icon: 'bi-file-earmark-excel', color: 'text-green-600' },
        { label: 'CSV', icon: 'bi-filetype-csv', color: 'text-blue-600' },
        { label: 'PDF', icon: 'bi-file-earmark-pdf', color: 'text-red-600' }
    ];

    const getCategoryStyles = (category) => {
        const styles = {
            food: 'bg-orange-50 text-[#fca311] border-orange-100',
            transport: 'bg-blue-50 text-blue-600 border-blue-100',
            shopping: 'bg-pink-50 text-pink-600 border-pink-100',
            health: 'bg-green-50 text-green-600 border-green-100',
            entertainment: 'bg-purple-50 text-purple-600 border-purple-100',
            others: 'bg-gray-50 text-gray-600 border-gray-100'
        };
        return styles[category.toLowerCase()] || styles.others;
    };

    return (
        <div className='min-h-screen p-4 md:p-6 flex flex-col gap-6' style={{ backgroundColor: '#e5e5e5' }}>
            <div className="p-4 md:p-8 rounded-2xl shadow-lg border border-gray-100" style={{ backgroundColor: '#ffffff' }}>
                <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8'>
                    <div>
                        <h2 className='text-2xl md:text-3xl font-extrabold text-[#14213d] tracking-tight'>Recent Transactions</h2>
                        <p className='text-gray-500 text-sm mt-1'>Monitor your latest financial activities</p>
                    </div>
                    <div className='flex gap-3'>
                        {/* Filter Button & Popup */}
                        <div className='relative' ref={filterRef}>
                            <button
                                className={`flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-xl font-semibold transition-all active:scale-95 ${isFilterOpen ? 'bg-[#14213d] text-white shadow-inner' : 'bg-[#fca311] hover:bg-orange-600 text-[#14213d]'}`}
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                            >
                                <i className="bi bi-filter-left text-lg"></i> Filter
                            </button>

                            {isFilterOpen && (
                                <>
                                    {/* Backdrop for mobile */}
                                    <div className='fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40 md:hidden animate-in fade-in duration-200' onClick={() => setIsFilterOpen(false)}></div>

                                    <div className='fixed inset-x-4 top-1/2 -translate-y-1/2 md:absolute md:right-0 md:top-full md:translate-y-0 md:inset-auto md:mt-3 w-auto md:w-80 bg-white rounded-3xl md:rounded-2xl shadow-2xl border border-gray-100 z-50 p-6 md:p-5 animate-in fade-in zoom-in duration-200'>
                                        <div className='flex justify-between items-center mb-5 md:mb-4'>
                                            <h3 className='font-bold text-xl md:text-base text-[#14213d]'>Filter Transactions</h3>
                                            <button onClick={() => { setSearchQuery(''); setFilterType('all'); setFilterMonth('all'); }} className='text-sm md:text-xs text-[#fca311] font-bold hover:underline bg-orange-50 px-2 py-1 rounded-lg md:bg-transparent md:p-0'>Reset All</button>
                                        </div>

                                        <div className='space-y-5 md:space-y-4'>
                                            <div>
                                                <label className='text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block'>Search Keywords</label>
                                                <div className='relative'>
                                                    <i className="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                                    <input
                                                        type="text"
                                                        placeholder="Source, category, type..."
                                                        className='w-full pl-10 pr-4 py-3 md:py-2 bg-gray-50 border border-gray-100 rounded-xl md:rounded-lg text-sm focus:outline-none focus:ring-4 focus:ring-[#fca311]/20 focus:border-[#fca311] transition-all'
                                                        value={searchQuery}
                                                        onChange={(e) => setSearchQuery(e.target.value)}
                                                    />
                                                </div>
                                            </div>

                                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-3'>
                                                <div>
                                                    <label className='text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block'>Transaction Type</label>
                                                    <select
                                                        className='w-full p-3 md:p-2 bg-gray-50 border border-gray-100 rounded-xl md:rounded-lg text-sm focus:outline-none focus:ring-4 focus:ring-[#fca311]/20 transition-all cursor-pointer appearance-none'
                                                        value={filterType}
                                                        onChange={(e) => setFilterType(e.target.value)}
                                                        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%239ca3af\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem' }}
                                                    >
                                                        <option value="all">Any Type</option>
                                                        <option value="income">Income Only</option>
                                                        <option value="expense">Expense Only</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className='text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block'>Month Selection</label>
                                                    <select
                                                        className='w-full p-3 md:p-2 bg-gray-50 border border-gray-100 rounded-xl md:rounded-lg text-sm focus:outline-none focus:ring-4 focus:ring-[#fca311]/20 transition-all cursor-pointer appearance-none'
                                                        value={filterMonth}
                                                        onChange={(e) => setFilterMonth(e.target.value)}
                                                        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%239ca3af\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem' }}
                                                    >
                                                        <option value="all">All Months</option>
                                                        {months.map(m => <option key={m} value={m.toLowerCase()}>{m}</option>)}
                                                    </select>
                                                </div>
                                            </div>

                                            <button
                                                className='w-full py-3 bg-[#14213d] text-white rounded-xl font-bold md:hidden shadow-lg'
                                                onClick={() => setIsFilterOpen(false)}
                                            >
                                                Apply Filters
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Export Button & Dropdown */}
                        <div className='relative' ref={exportRef}>
                            <button
                                className={`flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-xl font-semibold transition-all shadow-md active:scale-95 ${isExportOpen ? 'bg-orange-50 text-[#fca311] ring-2 ring-[#fca311]' : 'bg-[#14213d] hover:bg-[#1d2d50] text-white'}`}
                                onClick={() => setIsExportOpen(!isExportOpen)}
                            >
                                <i className="bi bi-file-earmark-arrow-down text-lg"></i> Export
                            </button>

                            {isExportOpen && (
                                <div className='absolute right-0 mt-3 w-56 md:w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200'>
                                    <div className='px-4 py-3 bg-gray-50 border-b border-gray-100'>
                                        <p className='text-xs font-bold text-gray-400 uppercase tracking-wider'>Download as</p>
                                    </div>
                                    <div className='p-2'>
                                        {exportOptions.map((opt) => (
                                            <button
                                                key={opt.label}
                                                className='w-full flex items-center gap-3 px-3 py-3 md:py-2.5 hover:bg-gray-50 rounded-xl md:rounded-lg transition-colors group'
                                                onClick={() => setIsExportOpen(false)}
                                            >
                                                <i className={`bi ${opt.icon} text-xl md:text-lg ${opt.color}`}></i>
                                                <span className='font-semibold text-[#14213d] group-hover:text-black'>{opt.label}</span>
                                                <i className="bi bi-chevron-right ml-auto text-xs text-gray-300 group-hover:text-gray-500"></i>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className='overflow-x-auto rounded-2xl border border-gray-200 shadow-sm'>
                    <table className='w-full text-left border-collapse'>
                        <thead className='bg-[#14213d] text-white'>
                            <tr>
                                <th className='px-6 py-4 font-bold uppercase text-xs tracking-widest'>ID</th>
                                <th className='px-6 py-4 font-bold uppercase text-xs tracking-widest'>Category</th>
                                <th className='px-6 py-4 font-bold uppercase text-xs tracking-widest'>Source</th>
                                <th className='px-6 py-4 font-bold uppercase text-xs tracking-widest'>Amount</th>
                                <th className='px-6 py-4 font-bold uppercase text-xs tracking-widest'>Date & Time</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-100 bg-white text-gray-700'>
                            {filteredTransactions.length > 0 ? (
                                filteredTransactions.map((transaction) => (
                                    <tr key={transaction.id} className='hover:bg-gray-50/80 transition-colors duration-200 group'>
                                        <td className='px-6 py-5 whitespace-nowrap text-sm font-medium text-gray-500'>#{transaction.id}</td>
                                        <td className='px-6 py-5 whitespace-nowrap text-sm'>
                                            <span className={`px-3 py-1 rounded-lg font-bold text-xs uppercase tracking-wider border ${getCategoryStyles(transaction.category)}`}>
                                                {transaction.category}
                                            </span>
                                        </td>
                                        <td className='px-6 py-5 whitespace-nowrap text-sm text-[#14213d] font-medium'>{transaction.source}</td>
                                        <td className={`px-6 py-5 whitespace-nowrap text-sm font-bold ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            {transaction.amount >= 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                        </td>
                                        <td className='px-6 py-5 whitespace-nowrap text-sm text-gray-500'>
                                            <div className='flex flex-col'>
                                                <span className='font-medium text-gray-700'>{transaction.date}</span>
                                                <span className='text-xs opacity-70'>{transaction.time}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className='px-6 py-12 text-center text-gray-400'>
                                        <i className="bi bi-search text-4xl mb-3 block"></i>
                                        <p className='text-lg font-medium'>No transactions found</p>
                                        <p className='text-sm'>Try adjusting your filters or search query</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default Transaction