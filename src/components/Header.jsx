import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/index');
  };

  return (
    <div className="menu">
      <div className="menu-left">
        <h1 onClick={handleLogoClick} className="home-link">Rhythme</h1>
      </div>
    </div>
  );
};

export default Header;
