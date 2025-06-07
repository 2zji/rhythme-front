import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SongCard.css';

const SongCard = ({ title, artist, imageUrl, progress, songId }) => {
  const navigate = useNavigate();

  const showProgress = progress !== undefined && progress !== null;

  const handleClick = () => {
    navigate(`/learn/${songId}`);
  };

  return (
    <div className="song-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <img src={imageUrl} alt="cover" className="song-image" />
      <div className="song-info">
        <h2 className="song-title">{title}</h2>
        <p className="song-artist">{artist}</p>
        {showProgress && (
          <>
            <div className="progress-bar-container">
              <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="progress-text">{progress}%</div>
          </>
        )}
      </div>
    </div>
  );
};

export default SongCard;
