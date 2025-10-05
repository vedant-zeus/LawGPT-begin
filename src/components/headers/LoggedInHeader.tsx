import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Scale, HelpCircle, Mail, User, LogOut } from 'lucide-react';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
}

interface LoggedInHeaderProps {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
}

const LoggedInHeader: React.FC<LoggedInHeaderProps> = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-[#9B4600] via-[#A14A00] to-[#6B2E00] shadow-md border-b border-[#b67a4f]/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 hover:opacity-90 transition-opacity"
          >
            <Scale className="h-8 w-8 text-[#FFD699]" />
            <span className="text-xl font-bold text-[#FFF3E0] drop-shadow-sm">
              LawGPT
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/help"
              className="flex items-center space-x-1 text-[#FFE8C2] hover:text-white hover:drop-shadow transition-colors duration-200"
            >
              <HelpCircle className="h-4 w-4" />
              <span>Help</span>
            </Link>
            <Link
              to="/contact"
              className="flex items-center space-x-1 text-[#FFE8C2] hover:text-white hover:drop-shadow transition-colors duration-200"
            >
              <Mail className="h-4 w-4" />
              <span>Contact</span>
            </Link>
            <Link
              to="/profile"
              className="flex items-center space-x-1 text-[#FFE8C2] hover:text-white hover:drop-shadow transition-colors duration-200"
            >
              <User className="h-4 w-4" />
              <span>{user.firstName}</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 border border-[#FFE8C2] text-[#FFE8C2] px-4 py-2 rounded-lg hover:bg-[#FFF3E0]/10 hover:text-white transition-colors duration-200"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-[#FFE8C2] hover:text-white transition-colors">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LoggedInHeader;
