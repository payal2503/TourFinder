import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Footer from './pages/Footer';
import TourCategoryPage from './pages/TourCategoryPage';
import About from './pages/About';
import Contact from './pages/Contact';
import WhychooseUs from './pages/WhychooseUs';
import Profilepage from './pages/Profilepage';
import Tickets from './pages/Tickets';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');

    if (token && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
    localStorage.setItem('username', username);
    navigate('/'); 
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login'); 
  };

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} username={username} onLogout={handleLogout} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login onLogin={handleLogin} />} />
        <Route path='/register' element={<Register />} />
        <Route path='/footer' element={<Footer />} />
        <Route path="/tours" element={<TourCategoryPage />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/whychooseus' element={<WhychooseUs />} />
        <Route path='/profile/:username' element={<Profilepage />} />
        <Route path='/ticket/:username' element={<Tickets username={username}/>} />
      </Routes>
    </>
  );
};

export default App;
