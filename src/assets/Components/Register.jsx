import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);

    const calculatePasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[^a-zA-Z\d]/.test(password)) strength++;
        return strength;
    };

    const getPasswordStrengthLabel = (strength) => {
        const labels = ['Weak', 'Fair', 'Good', 'Strong'];
        const colors = ['#ef4444', '#f59e0b', '#10b981', '#059669'];
        return { label: labels[strength - 1] || 'Weak', color: colors[strength - 1] || '#ef4444' };
    };

    const validateForm = () => {
        const newErrors = {};

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Full name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

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

        // Confirm password validation
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        // Terms validation
        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = 'You must agree to the terms and conditions';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;

        setFormData(prev => ({
            ...prev,
            [name]: newValue
        }));

        // Calculate password strength
        if (name === 'password') {
            setPasswordStrength(calculatePasswordStrength(value));
        }

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
            // Check if user already exists
            const users = JSON.parse(localStorage.getItem('fintrack_users') || '[]');
            const existingUser = users.find(u => u.email === formData.email);

            if (existingUser) {
                setErrors({ submit: 'An account with this email already exists. Please login instead.' });
                setIsLoading(false);
                return;
            }

            // Create new user
            const newUser = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                createdAt: new Date().toISOString()
            };

            users.push(newUser);
            localStorage.setItem('fintrack_users', JSON.stringify(users));

            // Auto login - create session
            const session = {
                user: {
                    name: newUser.name,
                    email: newUser.email
                },
                timestamp: new Date().toISOString()
            };
            localStorage.setItem('fintrack_session', JSON.stringify(session));

            // Redirect to home
            navigate('/home');
        }, 1000);
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Illustration */}
            <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 relative overflow-hidden" style={{ backgroundColor: '#14213d' }}>
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: 'radial-gradient(circle at 20% 50%, #fca311 0%, transparent 50%), radial-gradient(circle at 80% 80%, #fca311 0%, transparent 50%)'
                }}></div>

                <div className="relative z-10 max-w-lg text-center">
                    <div className="mb-8">
                        <div className="inline-block p-6 rounded-full mb-6" style={{ backgroundColor: 'rgba(252, 163, 17, 0.2)' }}>
                            <i className="bi bi-wallet2 text-6xl" style={{ color: '#fca311' }}></i>
                        </div>
                    </div>
                    <h2 className="text-4xl font-bold mb-4 text-white">
                        Start Your Financial Journey Today
                    </h2>
                    <p className="text-xl mb-8" style={{ color: '#e5e5e5' }}>
                        Join thousands of users who are taking control of their finances with FinTrack.
                    </p>
                    <div className="space-y-4">
                        {[
                            { icon: 'bi-check-circle-fill', text: 'Free forever, no credit card required' },
                            { icon: 'bi-check-circle-fill', text: 'Track unlimited transactions' },
                            { icon: 'bi-check-circle-fill', text: 'Beautiful analytics and insights' },
                            { icon: 'bi-check-circle-fill', text: 'Payment reminders via email' }
                        ].map((item, index) => (
                            <div key={index} className="flex items-center gap-3 text-left">
                                <i className={`${item.icon} text-2xl`} style={{ color: '#fca311' }}></i>
                                <span className="text-lg" style={{ color: '#e5e5e5' }}>{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
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
                            Create Account
                        </h1>
                        <p className="text-gray-600">
                            Start managing your finances in 30 seconds
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold mb-2" style={{ color: '#14213d' }}>
                                Full Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <i className="bi bi-person text-gray-400"></i>
                                </div>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 transition-all focus:outline-none ${errors.name ? 'border-red-500' : 'border-gray-200 focus:border-orange-500'
                                        }`}
                                    placeholder="John Doe"
                                />
                            </div>
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                    <i className="bi bi-exclamation-circle"></i>
                                    {errors.name}
                                </p>
                            )}
                        </div>

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
                                    placeholder="Create a strong password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                                >
                                    <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                                </button>
                            </div>
                            {formData.password && (
                                <div className="mt-2">
                                    <div className="flex gap-1 mb-1">
                                        {[1, 2, 3, 4].map((level) => (
                                            <div
                                                key={level}
                                                className="h-1 flex-1 rounded-full transition-all"
                                                style={{
                                                    backgroundColor: passwordStrength >= level
                                                        ? getPasswordStrengthLabel(passwordStrength).color
                                                        : '#e5e5e5'
                                                }}
                                            ></div>
                                        ))}
                                    </div>
                                    <p className="text-xs" style={{ color: getPasswordStrengthLabel(passwordStrength).color }}>
                                        Password strength: {getPasswordStrengthLabel(passwordStrength).label}
                                    </p>
                                </div>
                            )}
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                    <i className="bi bi-exclamation-circle"></i>
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-2" style={{ color: '#14213d' }}>
                                Confirm Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <i className="bi bi-lock-fill text-gray-400"></i>
                                </div>
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    className={`w-full pl-12 pr-12 py-3 rounded-lg border-2 transition-all focus:outline-none ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200 focus:border-orange-500'
                                        }`}
                                    placeholder="Re-enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                                >
                                    <i className={`bi ${showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                    <i className="bi bi-exclamation-circle"></i>
                                    {errors.confirmPassword}
                                </p>
                            )}
                        </div>

                        {/* Terms Checkbox */}
                        <div>
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="agreeToTerms"
                                    checked={formData.agreeToTerms}
                                    onChange={handleInputChange}
                                    className={`mt-1 w-4 h-4 rounded border-gray-300 focus:ring-2 focus:ring-orange-500 ${errors.agreeToTerms ? 'border-red-500' : ''
                                        }`}
                                    style={{ accentColor: '#fca311' }}
                                />
                                <span className="text-sm text-gray-700">
                                    I agree to the{' '}
                                    <button type="button" className="font-semibold hover:underline" style={{ color: '#fca311' }}>
                                        Terms of Service
                                    </button>
                                    {' '}and{' '}
                                    <button type="button" className="font-semibold hover:underline" style={{ color: '#fca311' }}>
                                        Privacy Policy
                                    </button>
                                </span>
                            </label>
                            {errors.agreeToTerms && (
                                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                    <i className="bi bi-exclamation-circle"></i>
                                    {errors.agreeToTerms}
                                </p>
                            )}
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
                                    Creating account...
                                </>
                            ) : (
                                <>
                                    Create Account
                                    <i className="bi bi-arrow-right"></i>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Login Link */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <button
                                onClick={() => navigate('/login')}
                                className="font-bold hover:underline"
                                style={{ color: '#fca311' }}
                            >
                                Sign in
                            </button>
                        </p>
                    </div>

                    {/* Back to Landing */}
                    <div className="mt-4 text-center">
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
        </div>
    );
};

export default Register;
