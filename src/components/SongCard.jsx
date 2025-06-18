import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "../styles/SongCard.css";

const SongCard = ({ songId, title, artist, imageUrl }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/learn/${songId}`);
    console.log("songId in SongCard:", songId);
  };

  return (
    <div
      className="song-card"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <img src={imageUrl} alt="cover" className="song-image" />
      <div className="song-info">
        <h2 className="song-title">{title}</h2>
        <p className="song-artist">{artist}</p>
      </div>
    </div>
  );
};

SongCard.propTypes = {
  songId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  imageUrl: PropTypes.string, // null 허용
};

export default SongCard;
