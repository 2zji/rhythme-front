import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBanner from "../components/TopBanner";
import LatestSongSection from "../components/LatestSongSection";
import WordsSection from "../components/WordsSection";

import "../styles/IndexPage.css";

const IndexPage = () => {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("username");
    const storedUserId = localStorage.getItem("userId"); // 변수명 일관성 유지
    console.log("유저정보", { userId, username });

    if (!username) {
      alert("로그인 후 이용해주세요.");
      window.location.href = "/";
      return;
    }

    setUserId(storedUserId);
    setUsername(username);
  }, []);

  const handleViewAllSongs = () => {
    navigate("/Songs");
  };

  return (
    <div className="index-container">
      <TopBanner />
      <LatestSongSection username={username} />
      <button className="primary-button" onClick={handleViewAllSongs}>
        모든 노래 보러가기
      </button>
      <WordsSection username={username} />
    </div>
  );
};

export default IndexPage;
