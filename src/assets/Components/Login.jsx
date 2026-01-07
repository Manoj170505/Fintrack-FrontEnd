import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        // Email validation
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            // Check if user exists in localStorage
            const users = JSON.parse(localStorage.getItem('fintrack_users') || '[]');
            const user = users.find(u => u.email === formData.email && u.password === formData.password);

            if (user) {
                // Store session
                const session = {
                    user: {
                        name: user.name,
                        email: user.email
                    },
                    timestamp: new Date().toISOString()
                };
                localStorage.setItem('fintrack_session', JSON.stringify(session));

                // Redirect to home
                navigate('/home');
            } else {
                setErrors({ submit: 'Invalid email or password. Please try again or sign up.' });
                setIsLoading(false);
            }
        }, 1000);
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8" style={{ backgroundColor: '#ffffff' }}>
                <div className="w-full max-w-md">
                    {/* Logo */}
                    <div className="flex items-center gap-2 mb-8">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#14213d' }}>
                            <i className="bi bi-wallet2 text-2xl" style={{ color: '#fca311' }}></i>
                        </div>
                        <span className="text-3xl font-bold" style={{ color: '#14213d' }}>FinTrack</span>
                    </div>

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold mb-2" style={{ color: '#14213d' }}>
                            Welcome Back
                        </h1>
                        <p className="text-gray-600">
                            Enter your credentials to access your account
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold mb-2" style={{ color: '#14213d' }}>
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <i className="bi bi-envelope text-gray-400"></i>
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 transition-all focus:outline-none ${errors.email ? 'border-red-500' : 'border-gray-200 focus:border-orange-500'
                                        }`}
                                    placeholder="you@example.com"
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                    <i className="bi bi-exclamation-circle"></i>
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold mb-2" style={{ color: '#14213d' }}>
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <i className="bi bi-lock text-gray-400"></i>
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className={`w-full pl-12 pr-12 py-3 rounded-lg border-2 transition-all focus:outline-none ${errors.password ? 'border-red-500' : 'border-gray-200 focus:border-orange-500'
                                        }`}
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                                >
                                    <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                    <i className="bi bi-exclamation-circle"></i>
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={handleInputChange}
                                    className="w-4 h-4 rounded border-gray-300 focus:ring-2 focus:ring-orange-500"
                                    style={{ accentColor: '#fca311' }}
                                />
                                <span className="text-sm text-gray-700">Remember me</span>
                            </label>
                            <button
                                type="button"
                                className="text-sm font-semibold hover:underline"
                                style={{ color: '#fca311' }}
                            >
                                Forgot password?
                            </button>
                        </div>

                        {/* Submit Error */}
                        {errors.submit && (
                            <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                                <p className="text-sm text-red-600 flex items-center gap-2">
                                    <i className="bi bi-exclamation-triangle"></i>
                                    {errors.submit}
                                </p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 rounded-lg font-bold text-lg transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            style={{ backgroundColor: '#fca311', color: '#ffffff' }}
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Sign In
                                    <i className="bi bi-arrow-right"></i>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-600">
                            Don't have an account?{' '}
                            <button
                                onClick={() => navigate('/register')}
                                className="font-bold hover:underline"
                                style={{ color: '#fca311' }}
                            >
                                Sign up for free
                            </button>
                        </p>
                    </div>

                    {/* Back to Landing */}
                    <div className="mt-6 text-center">
                        <button
                            onClick={() => navigate('/landing')}
                            className="text-sm text-gray-500 hover:text-gray-700 flex items-center justify-center gap-1 mx-auto"
                        >
                            <i className="bi bi-arrow-left"></i>
                            Back to home
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Side - Illustration */}
            <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 relative overflow-hidden" style={{ backgroundColor: '#14213d' }}>
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: 'radial-gradient(circle at 20% 50%, #fca311 0%, transparent 50%), radial-gradient(circle at 80% 80%, #fca311 0%, transparent 50%)'
                }}></div>

                <div className="relative z-10 max-w-lg text-center">
                    <div className="mb-8">
                        <div className="inline-block p-6 rounded-full mb-6" style={{ backgroundColor: 'rgba(252, 163, 17, 0.2)' }}>
                            <i className="bi bi-graph-up-arrow text-6xl" style={{ color: '#fca311' }}></i>
                        </div>
                    </div>
                    <h2 className="text-4xl font-bold mb-4 text-white">
                        Track Your Financial Journey
                    </h2>
                    <p className="text-xl mb-8" style={{ color: '#e5e5e5' }}>
                        Get insights into your spending habits with beautiful visualizations and smart analytics.
                    </p>
                    <div className="flex items-center justify-center gap-8">
                        <div className="text-center">
                            <div className="text-3xl font-bold mb-1" style={{ color: '#fca311' }}>10K+</div>
                            <div className="text-sm" style={{ color: '#e5e5e5' }}>Active Users</div>
                        </div>
                        <div className="w-px h-12" style={{ backgroundColor: '#e5e5e5', opacity: 0.3 }}></div>
                        <div className="text-center">
                            <div className="text-3xl font-bold mb-1" style={{ color: '#fca311' }}>$2M+</div>
                            <div className="text-sm" style={{ color: '#e5e5e5' }}>Tracked</div>
                        </div>
                        <div className="w-px h-12" style={{ backgroundColor: '#e5e5e5', opacity: 0.3 }}></div>
                        <div className="text-center">
                            <div className="text-3xl font-bold mb-1" style={{ color: '#fca311' }}>4.9★</div>
                            <div className="text-sm" style={{ color: '#e5e5e5' }}>Rating</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
