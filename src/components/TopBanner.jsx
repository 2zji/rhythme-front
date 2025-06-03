import React from 'react';
import '../styles/TopBanner.css';

const TopBanner = () => {
  return (
    <div className="top-banner">
      <div className="top-banner-overlay">
        <p className="top-subtitle">오늘의 추천 학습 노래</p>
        <h2 className="top-title">Song Title - HISOKA</h2>
      </div>
    </div>
  );
};

export default TopBanner;
