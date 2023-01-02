import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import RegisterPage from './pages/RegisterPage';
import LogInPage from './pages/LogInPage';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import AuthenticationContext from './context/authentication';
import { loadUserInformation } from './services/authentication';
import NotesList from './pages/NotesList';

const App = () => {
  const [user, setUser] = useState(null);

  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem('darkmode')) || false
  );

  useEffect(() => {
    loadUserInformation().then((data) => {
      setUser(data.user);
    });
    localStorage.setItem('darkmode', JSON.stringify(darkMode));

    // getMode().then((data) => {
    //   console.log(data);
    //   setDarkMode(data);
    // });
  }, [darkMode]);

  return (
    <div className={darkMode && 'dark-mode'}>
      <div className="container">
        <AuthenticationContext.Provider value={{ user, setUser }}>
          <BrowserRouter>
            <Navbar darkMode={darkMode} handleDarkMode={setDarkMode} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/notes" element={<NotesList />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/log-in" element={<LogInPage />} />
            </Routes>
          </BrowserRouter>
        </AuthenticationContext.Provider>
      </div>
    </div>
  );
};

export default App;
