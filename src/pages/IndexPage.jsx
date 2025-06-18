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
    const username = localStorage.getItem('username');
    const storedUserId = localStorage.getItem('userId');  // 변수명 일관성 유지
     console.log('유저정보', { userId, username });

    if (!storedUserId) {
      alert('로그인 후 이용해주세요.');
      window.location.href = '/';
      return;
    }

    setUserId(storedUserId);
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
