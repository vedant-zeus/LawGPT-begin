import React, { useState } from 'react';
import { LogIn, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-amber-50 py-12 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-amber-100 p-8 rounded-2xl shadow-lg">
          <div className="text-center mb-8">
            <LogIn className="h-12 w-12 text-amber-700 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-amber-800 mb-2">Welcome Back</h1>
            <p className="text-amber-700">Sign in to your LegalClarify account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 text-amber-700 focus:ring-amber-700 border-amber-300 rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-amber-700">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-amber-700 hover:text-amber-800">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-amber-700 text-amber-50 py-3 px-6 rounded-lg hover:bg-amber-800 transition-colors duration-200 font-semibold"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-amber-700">
              Don't have an account?{' '}
              <Link to="/signup" className="text-amber-700 hover:text-amber-800 font-semibold">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;