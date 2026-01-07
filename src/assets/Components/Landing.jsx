import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate();

    const features = [
        {
            icon: 'bi-wallet2',
            title: 'Track Your Finances',
            description: 'Easily monitor your income and expenses in one place with intuitive categorization.'
        },
        {
            icon: 'bi-graph-up-arrow',
            title: 'Visual Analytics',
            description: 'Beautiful charts and graphs help you understand your spending patterns at a glance.'
        },
        {
            icon: 'bi-bell',
            title: 'Payment Reminders',
            description: 'Never miss a payment with automated email reminders for your bills and subscriptions.'
        },
        {
            icon: 'bi-file-earmark-arrow-down',
            title: 'Export Data',
            description: 'Download your transaction history in Excel, CSV, or PDF format anytime.'
        }
    ];

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#e5e5e5' }}>
            {/* Navigation Bar */}
            <nav className="sticky top-0 z-50 backdrop-blur-md border-b" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderColor: '#e5e5e5' }}>
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#14213d' }}>
                                <i className="bi bi-wallet2 text-xl" style={{ color: '#fca311' }}></i>
                            </div>
                            <span className="text-2xl font-bold" style={{ color: '#14213d' }}>FinTrack</span>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => navigate('/login')}
                                className="px-6 py-2 rounded-lg font-semibold transition-all hover:opacity-90"
                                style={{ color: '#14213d', backgroundColor: 'transparent', border: '2px solid #14213d' }}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => navigate('/register')}
                                className="px-6 py-2 rounded-lg font-semibold transition-all hover:opacity-90 shadow-lg"
                                style={{ backgroundColor: '#fca311', color: '#ffffff' }}
                            >
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute inset-0 opacity-10" style={{
                    background: 'linear-gradient(135deg, #14213d 0%, #fca311 100%)'
                }}></div>

                <div className="max-w-7xl mx-auto px-6 py-20 md:py-32 relative">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div className="space-y-8">
                            <div className="inline-block px-4 py-2 rounded-full text-sm font-semibold" style={{ backgroundColor: '#fff3cd', color: '#14213d' }}>
                                <i className="bi bi-stars mr-2"></i>
                                Your Personal Finance Manager
                            </div>

                            <h1 className="text-5xl md:text-6xl font-bold leading-tight" style={{ color: '#14213d' }}>
                                Take Control of Your
                                <span className="block mt-2" style={{ color: '#fca311' }}>
                                    Financial Future
                                </span>
                            </h1>

                            <p className="text-xl text-gray-600 leading-relaxed">
                                Track expenses, visualize spending patterns, and never miss a payment.
                                FinTrack makes managing your money simple and stress-free.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={() => navigate('/register')}
                                    className="px-8 py-4 rounded-lg font-bold text-lg transition-all hover:opacity-90 hover:shadow-xl flex items-center justify-center gap-2"
                                    style={{ backgroundColor: '#fca311', color: '#ffffff' }}
                                >
                                    Start Free Today
                                    <i className="bi bi-arrow-right"></i>
                                </button>
                                <button
                                    onClick={() => {
                                        document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="px-8 py-4 rounded-lg font-bold text-lg transition-all hover:opacity-90 flex items-center justify-center gap-2"
                                    style={{ backgroundColor: '#ffffff', color: '#14213d', border: '2px solid #14213d' }}
                                >
                                    Learn More
                                    <i className="bi bi-chevron-down"></i>
                                </button>
                            </div>

                            <div className="flex items-center gap-8 pt-4">
                                <div className="flex items-center gap-2">
                                    <i className="bi bi-check-circle-fill text-2xl text-green-600"></i>
                                    <span className="text-gray-700 font-medium">No credit card required</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <i className="bi bi-check-circle-fill text-2xl text-green-600"></i>
                                    <span className="text-gray-700 font-medium">Free forever</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Content - Illustration */}
                        <div className="relative">
                            <div className="relative rounded-2xl p-8 shadow-2xl" style={{ backgroundColor: '#ffffff' }}>
                                {/* Mock Dashboard Preview */}
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center pb-4 border-b" style={{ borderColor: '#e5e5e5' }}>
                                        <h3 className="font-bold text-lg" style={{ color: '#14213d' }}>Dashboard Preview</h3>
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 rounded-lg" style={{ backgroundColor: '#f0fdf4' }}>
                                            <div className="text-sm text-gray-600 mb-1">Income</div>
                                            <div className="text-2xl font-bold text-green-600">$5,240</div>
                                        </div>
                                        <div className="p-4 rounded-lg" style={{ backgroundColor: '#fef2f2' }}>
                                            <div className="text-sm text-gray-600 mb-1">Expenses</div>
                                            <div className="text-2xl font-bold text-red-600">$3,180</div>
                                        </div>
                                    </div>

                                    <div className="space-y-3 pt-2">
                                        {[
                                            { category: 'Food', amount: 450, color: '#fca311', width: '75%' },
                                            { category: 'Transport', amount: 280, color: '#14213d', width: '60%' },
                                            { category: 'Shopping', amount: 520, color: '#ef4444', width: '85%' }
                                        ].map((item, index) => (
                                            <div key={index} className="space-y-1">
                                                <div className="flex justify-between text-sm">
                                                    <span className="font-medium" style={{ color: '#14213d' }}>{item.category}</span>
                                                    <span className="font-bold" style={{ color: item.color }}>${item.amount}</span>
                                                </div>
                                                <div className="w-full h-2 rounded-full" style={{ backgroundColor: '#e5e5e5' }}>
                                                    <div className="h-2 rounded-full transition-all" style={{ backgroundColor: item.color, width: item.width }}></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Floating Elements */}
                            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full flex items-center justify-center shadow-lg animate-bounce" style={{ backgroundColor: '#fca311' }}>
                                <i className="bi bi-graph-up text-3xl text-white"></i>
                            </div>
                            <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: '#14213d', animation: 'pulse 2s infinite' }}>
                                <i className="bi bi-bell text-2xl" style={{ color: '#fca311' }}></i>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 md:py-32" style={{ backgroundColor: '#ffffff' }}>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <div className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4" style={{ backgroundColor: '#fff3cd', color: '#14213d' }}>
                            Features
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#14213d' }}>
                            Everything You Need to
                            <span className="block mt-2" style={{ color: '#fca311' }}>Manage Your Money</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Powerful features designed to make financial management effortless and effective.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="group p-8 rounded-2xl transition-all hover:shadow-xl cursor-pointer"
                                style={{ backgroundColor: '#f8f9fa', border: '2px solid transparent' }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = '#fca311';
                                    e.currentTarget.style.transform = 'translateY(-8px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = 'transparent';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all group-hover:scale-110" style={{ backgroundColor: '#14213d' }}>
                                    <i className={`${feature.icon} text-3xl`} style={{ color: '#fca311' }}></i>
                                </div>
                                <h3 className="text-xl font-bold mb-3" style={{ color: '#14213d' }}>
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 md:py-32 relative overflow-hidden">
                <div className="absolute inset-0" style={{ backgroundColor: '#14213d' }}></div>
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: 'radial-gradient(circle at 20% 50%, #fca311 0%, transparent 50%), radial-gradient(circle at 80% 80%, #fca311 0%, transparent 50%)'
                }}></div>

                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                        Ready to Take Control of Your Finances?
                    </h2>
                    <p className="text-xl mb-8" style={{ color: '#e5e5e5' }}>
                        Join thousands of users who are already managing their money smarter with FinTrack.
                    </p>
                    <button
                        onClick={() => navigate('/register')}
                        className="px-10 py-5 rounded-lg font-bold text-lg transition-all hover:opacity-90 hover:shadow-2xl inline-flex items-center gap-3"
                        style={{ backgroundColor: '#fca311', color: '#ffffff' }}
                    >
                        Get Started for Free
                        <i className="bi bi-arrow-right-circle text-2xl"></i>
                    </button>
                    <p className="mt-6 text-sm" style={{ color: '#e5e5e5' }}>
                        No credit card required • Free forever • Get started in 30 seconds
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12" style={{ backgroundColor: '#ffffff', borderTop: '1px solid #e5e5e5' }}>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#14213d' }}>
                                <i className="bi bi-wallet2 text-xl" style={{ color: '#fca311' }}></i>
                            </div>
                            <span className="text-xl font-bold" style={{ color: '#14213d' }}>FinTrack</span>
                        </div>
                        <p className="text-gray-600">
                            © 2026 FinTrack. Your personal finance companion.
                        </p>
                        <div className="flex gap-6">
                            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                                <i className="bi bi-github text-2xl"></i>
                            </a>
                            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                                <i className="bi bi-twitter text-2xl"></i>
                            </a>
                            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                                <i className="bi bi-linkedin text-2xl"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
