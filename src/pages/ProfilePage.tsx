import React, { useEffect, useState } from 'react';
import { User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Define a type for the user data to ensure type safety
interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
}

const ProfilePage: React.FC = () => {
  // State to hold the user's data
  const [user, setUser] = useState<UserProfile | null>(null);
  // State to handle the loading state
  const [loading, setLoading] = useState(true);
  // Hook to navigate programmatically
  const navigate = useNavigate();

  // useEffect hook to fetch user data when the component mounts
  useEffect(() => {
    const fetchUserProfile = async () => {
      // Get the token from local storage
      const token = localStorage.getItem('token');
      
      // If no token is found, redirect to the login page
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        // Make a GET request to the protected profile endpoint
        const res = await fetch('http://localhost:5000/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Send the token in the Authorization header
            'Content-Type': 'application/json'
          },
        });

        const data = await res.json();
        
        // If the response is successful, set the user data
        if (res.ok) {
          setUser(data);
        } else {
          // If the token is invalid or expired, remove it and redirect to login
          localStorage.removeItem('token');
          navigate('/login');
        }
      } catch (err) {
        console.error('Failed to fetch profile:', err);
        // On a network or other error, clear the token and redirect
        localStorage.removeItem('token');
        navigate('/login');
      } finally {
        // Set loading to false once the fetch is complete
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]); // navigate is a dependency to prevent a linting warning

  // Function to handle user logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the JWT token
    navigate('/login'); // Redirect to the login page
  };

  // Display a loading message while fetching data
  if (loading) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center text-amber-800">
        <p className="text-xl font-semibold animate-pulse">Loading profile...</p>
      </div>
    );
  }

  // Display a message if user data could not be loaded
  if (!user) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center text-amber-800">
        <p className="text-xl font-semibold">Could not load profile. Please log in again.</p>
      </div>
    );
  }

  // Render the profile page with the user's data
  return (
    <div className="min-h-screen bg-amber-50 py-12 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-amber-100 p-8 rounded-2xl shadow-lg text-center">
          <User className="h-12 w-12 text-amber-700 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-amber-800 mb-2">Hello, {user.firstName}!</h1>
          <p className="text-amber-700 mb-6">Welcome to your profile page. ✨</p>
          
          <div className="text-left space-y-4">
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <h2 className="text-lg font-semibold text-amber-800 flex items-center">
                <span className="mr-2">👤</span> Full Name
              </h2>
              <p className="text-amber-700">{user.firstName} {user.lastName}</p>
            </div>
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <h2 className="text-lg font-semibold text-amber-800 flex items-center">
                <span className="mr-2">📧</span> Email Address
              </h2>
              <p className="text-amber-700">{user.email}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="mt-8 w-full bg-red-700 text-amber-50 py-3 px-6 rounded-lg hover:bg-red-800 transition-colors duration-200 font-semibold flex items-center justify-center"
          >
            <LogOut className="h-5 w-5 mr-2" /> Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;