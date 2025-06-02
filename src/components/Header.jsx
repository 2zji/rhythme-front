import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  return (
    <div className="menu">
      <h1>
        <Link to="/" className="home-link">Rhythme</Link>
      </h1>
    </div>
  );
};

export default Header;
