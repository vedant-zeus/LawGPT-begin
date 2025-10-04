import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import HelpPage from './pages/HelpPage';
import ContactPage from './pages/ContactPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import JargonSimplifierPage from './pages/JargonSimplifierPage';

// Define a type for the user data for type safety
interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
}

function App() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const navigate = useNavigate();

  // useEffect to check for a token on app load and fetch user data
  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await fetch('http://localhost:5000/profile', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
          });
          const data = await res.json();
          if (res.ok) {
            setUser(data);
          } else {
            localStorage.removeItem('token');
            setUser(null);
            navigate('/login');
          }
        } catch (err) {
          console.error('Failed to fetch user:', err);
          localStorage.removeItem('token');
          setUser(null);
          navigate('/login');
        }
      }
    };
    fetchUserProfile();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-amber-50">
      <Header user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<DashboardPage />} />
        <Route path="/jargon-simplifier" element={<JargonSimplifierPage />} />
      </Routes>
    </div>
  );
}

export default App;