import React, { useState } from 'react';
import { UserPlus, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

const SignUpPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign up logic here
    console.log('Sign up submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-amber-50 py-12 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-amber-100 p-8 rounded-2xl shadow-lg">
          <div className="text-center mb-8">
            <UserPlus className="h-12 w-12 text-amber-700 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-amber-800 mb-2">Create Account</h1>
            <p className="text-amber-700">Join LegalClarify and start simplifying legal documents today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-amber-800 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-transparent bg-amber-50"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-amber-800 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-transparent bg-amber-50"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-amber-800 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-transparent bg-amber-50"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-amber-800 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-12 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-transparent bg-amber-50"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-amber-600 hover:text-amber-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-amber-800 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-transparent bg-amber-50"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-amber-700 text-amber-50 py-3 px-6 rounded-lg hover:bg-amber-800 transition-colors duration-200 font-semibold"
            >
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-amber-700">
              Already have an account?{' '}
              <Link to="/login" className="text-amber-700 hover:text-amber-800 font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;