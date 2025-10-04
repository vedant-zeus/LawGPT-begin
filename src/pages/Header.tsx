import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Scale, HelpCircle, Mail, UserPlus, LogIn, User, LogOut } from 'lucide-react';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
}

interface HeaderProps {
  user: UserProfile | null;
  setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
}

const Header: React.FC<HeaderProps> = ({ user, setUser }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <header className="bg-amber-50 shadow-sm border-b border-amber-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Scale className="h-8 w-8 text-amber-700" />
            <span className="text-xl font-bold text-amber-800">LegalClarify</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/help"
              className="flex items-center space-x-1 text-amber-700 hover:text-amber-800 transition-colors duration-200"
            >
              <HelpCircle className="h-4 w-4" />
              <span>Help</span>
            </Link>
            <Link
              to="/contact"
              className="flex items-center space-x-1 text-amber-700 hover:text-amber-800 transition-colors duration-200"
            >
              <Mail className="h-4 w-4" />
              <span>Contact</span>
            </Link>
            {/* Conditional rendering based on user prop */}
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center space-x-1 text-amber-700 hover:text-amber-800 transition-colors duration-200"
                >
                  <User className="h-4 w-4" />
                  <span>{user.firstName}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 border border-amber-700 text-amber-700 px-4 py-2 rounded-lg hover:bg-amber-100 transition-colors duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="flex items-center space-x-1 bg-amber-700 text-amber-50 px-4 py-2 rounded-lg hover:bg-amber-800 transition-colors duration-200"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Sign Up</span>
                </Link>
                <Link
                  to="/login"
                  className="flex items-center space-x-1 border border-amber-700 text-amber-700 px-4 py-2 rounded-lg hover:bg-amber-100 transition-colors duration-200"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Link>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-amber-700 hover:text-amber-800 transition-colors">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;