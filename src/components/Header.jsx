import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  const handleLogoClick = () => {
    if (username) {
      navigate('/Index');
    }
    else{
        navigate('/');
    }
  };

  return (
    <div className="menu">
      <div className="menu-left">
        <h1 onClick={handleLogoClick} className="home-link">Rhythme</h1>
      </div>
      {username && <span className="username">{username}</span>}
    </div>
  );
};

export default Header;
