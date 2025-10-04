import React from 'react';
import LoggedInHeader from './headers/LoggedInHeader';
import LoggedOutHeader from './headers/LoggedOutHeader';

// Define a type for the user prop
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
  return user ? (
    <LoggedInHeader user={user} setUser={setUser} />
  ) : (
    <LoggedOutHeader />
  );
};

export default Header;