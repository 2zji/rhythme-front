import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBanner from '../components/TopBanner';
import LatestSongSection from '../components/LatestSongSection';
import WordsSection from '../components/WordsSection';

import '../styles/IndexPage.css';

const IndexPage = () => {
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedId = localStorage.getItem('username');
    if (!storedId) {
      alert('로그인 후 이용해주세요.');
      window.location.href = '/';
      return;
    }
    setUserId(storedId);
  }, []);

  const handleViewAllSongs = () => {
    navigate('/Songs');
  };

  return (
    <div className="index-container">
      <TopBanner />
      <LatestSongSection userId={userId} />
      <button className="primary-button" onClick={handleViewAllSongs}>
        모든 노래 보러가기
      </button>

      <WordsSection userId={userId} />
    </div>
  );
};

export default IndexPage;
