import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MainPage.css';

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div className="main-container">
      <div className="main-box">
        <h2>Rhythme</h2>
        <button className="main-button" onClick={() => navigate('/Login')}>로그인</button>
        <button className="main-button" onClick={() => navigate('/Sign_up')}>회원가입</button>
      </div>
    </div>
  );
};

export default MainPage;
