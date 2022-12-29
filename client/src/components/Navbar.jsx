import { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';
import AuthenticationContext from '../context/authentication';
import { signOutUser } from './../services/authentication';
import { MdNightlightRound } from 'react-icons/md';
import { MdOutlineWbSunny } from 'react-icons/md';

const Navbar = ({ darkMode, handleDarkMode }) => {
  const { user, setUser } = useContext(AuthenticationContext);

  const handleSignOut = () => {
    signOutUser().then(() => {
      setUser(null);
    });
  };

  return (
    <nav className="header">
      <h1>Notes</h1>
      <div className="header-options">
        <Link to="/">Home</Link>
        {(user && (
          <>
            <span>Welcome {user.name}</span>
            <button onClick={handleSignOut}>Sign Out</button>
          </>
        )) || (
          <>
            <Link to="/log-in">Log In</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {!darkMode ? (
          <MdNightlightRound
            onClick={() => handleDarkMode((prevDarkMode) => !prevDarkMode)}
            className="dark-icon"
          />
        ) : (
          <MdOutlineWbSunny
            onClick={() => handleDarkMode((prevDarkMode) => !prevDarkMode)}
            className="light-icon"
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
