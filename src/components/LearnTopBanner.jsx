import React from 'react';
import '../styles/LearnTopBanner.css';

const LearnTopBanner = ({ title, artist, progress, imageUrl }) => {
  return (
    <div className="learn-banner" style={{ backgroundImage: `url(${imageUrl})` }}>
      <div className="learn-banner-overlay">
        <div className="song-text">
          <h1>{title}</h1>
          <h3>{artist}</h3>
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>
          <span className="progress-text">{progress}%</span>
        </div>
      </div>
    </div>
  );
};

export default LearnTopBanner;
