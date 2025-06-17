import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "../styles/SongCard.css";
import whatMakesYouBeautiful from "../assets/What Makes You Beautiful.png";

const SongCard = ({ title, artist, imageUrl, progress, songId }) => {
  const navigate = useNavigate();

  console.log(
    "title",
    title,
    "artist",
    artist,
    "img",
    imageUrl,
    progress,
    songId
  );

  const imageMap = {
    "What Makes You Beautiful.png": whatMakesYouBeautiful,
  };

  const showProgress = progress !== undefined && progress !== null;

  const handleClick = () => {
    navigate(`/learn/${songId}`);
    console.log("songId in SongCard:", songId);
  };

  const getImage = (filename) => {
    return imageMap[filename];
  };

  return (
    <div
      className="song-card"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <img src={getImage(imageUrl)} alt="cover" className="song-image" />
      <div className="song-info">
        <h2 className="song-title">{title}</h2>
        <p className="song-artist">{artist}</p>
        {showProgress && (
          <>
            <div className="progress-bar-container">
              <div
                className="progress-bar-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="progress-text">{progress}%</div>
          </>
        )}
      </div>
    </div>
  );
};

export default SongCard;
