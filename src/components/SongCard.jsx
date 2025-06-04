import React from 'react';
import '../styles/SongCard.css';

const SongCard = ({ title, artist, imageUrl, progress }) => {
  // progress가 undefined 또는 null이 아닐 때만 진행바를 렌더링
  const showProgress = progress !== undefined && progress !== null;

  return (
    <div className="song-card">
      <img src={imageUrl} alt="cover" className="song-image" />
      <div className="song-info">
        <h2 className="song-title">{title}</h2>
        <p className="song-artist">{artist}</p>
        {showProgress && ( // progress가 있을 때만 렌더링
          <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
        )}
        {showProgress && ( // progress가 있을 때만 렌더링
          <div className="progress-text">{progress}%</div>
        )}
      </div>
    </div>
  );
};

export default SongCard;