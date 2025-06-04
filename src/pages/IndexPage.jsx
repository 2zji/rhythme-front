// src/pages/IndexPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // useNavigate import 유지
import TopBanner from '../components/TopBanner';
import LatestSongSection from '../components/LatestSongSection';
import MyRankingSection from '../components/MyRankingSection'; // MyRankingSection import 추가

import '../styles/IndexPage.css';

const IndexPage = () => {
  const [userId, setUserId] = useState(null);
  // const [loadingRanking, setLoadingRanking] = useState(true); // MyRankingSection으로 이동
  // const [rankingData, setRankingData] = useState(null);     // MyRankingSection으로 이동
  const [loadingWords, setLoadingWords] = useState(true);
  const [recentWords, setRecentWords] = useState([]);

  const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
    const storedId = localStorage.getItem('username');
    if (!storedId) {
      alert('로그인 후 이용해주세요.');
      window.location.href = '/';
      return;
    }
    setUserId(storedId);

    // 랭킹 데이터를 가져오는 함수는 MyRankingSection으로 이동했으므로 제거
    // const fetchRankingData = async () => { ... }

    // 가장 최근 학습한 단어 데이터를 가져오는 함수
    const fetchRecentWords = async () => {
        try {
            setLoadingWords(true);
            const response = await axios.get(`/api/users/${storedId}/recent-words`);
            setRecentWords(response.data);
        } catch (error) {
            console.error('Error fetching recent words:', error);
            setRecentWords([]);
        } finally {
            setLoadingWords(false);
        }
    };

    // fetchRankingData(); // MyRankingSection에서 호출하므로 여기서는 제거
    fetchRecentWords();
  }, []); // 의존성 배열에 userId를 넣지 않음, MyRankingSection에서 userId를 prop으로 받음

  // 모든 노래 보러가기 버튼 클릭 핸들러
  const handleViewAllSongs = () => {
    navigate('/Songs'); // /Songs 경로로 이동
  };

  return (
    <div className="index-container">
      <TopBanner />

      {/* LatestSongSection은 그대로 렌더링 */}
      <LatestSongSection userId={userId} />

      {/* 모든 노래 보러가기 버튼에 onClick 핸들러 연결 */}
      <button className="primary-button" onClick={handleViewAllSongs}>
        모든 노래 보러가기
      </button>

      {/* 나의 랭킹 섹션을 분리된 컴포넌트로 렌더링 */}
      <MyRankingSection userId={userId} /> {/* userId를 prop으로 전달 */}

      {/* 가장 최근 학습한 단어 섹션 */}
      <section className="word-section">
        <h3>가장 최근 학습한 단어</h3>
        {loadingWords ? (
            <p>단어를 불러오는 중입니다...</p>
        ) : (
            <div className="word-grid">
                {recentWords.length > 0 ? (
                    recentWords.map((word, index) => (
                        <div className="word-card" key={index}>
                            {word}
                        </div>
                    ))
                ) : (
                    <p>최근 학습한 단어가 없습니다.</p>
                )}
            </div>
        )}
      </section>

      <button className="logout-button" onClick={() => {
        localStorage.removeItem('username');
        window.location.href = '/';
      }}>
        로그아웃
      </button>
    </div>
  );
};

export default IndexPage;