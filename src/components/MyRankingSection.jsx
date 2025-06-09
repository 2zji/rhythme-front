import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/MyRankingSection.css';

const MyRankingSection = ({ userId }) => {
  const [loadingRanking, setLoadingRanking] = useState(true);
  const [rankingData, setRankingData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      setLoadingRanking(false);
      return;
    }

    const fetchRankingData = async () => {
      try {
        setLoadingRanking(true);
        const response = await axios.get(`/api/users/${userId}/ranking`);
        if (response.data && Object.keys(response.data).length > 0) {
          setRankingData(response.data);
        } else {
          setRankingData(null);
        }
      } catch (error) {
        console.error('Error fetching ranking data:', error);
        setRankingData(null);
      } finally {
        setLoadingRanking(false);
      }
    };

    fetchRankingData();
  }, [userId]);

  const handleGoToRankingPage = () => {
    navigate('/ranking');
  };

  return (
    <section className="ranking-section">
      <h3>나의 랭킹</h3>
      {loadingRanking ? (
        <p>랭킹 정보를 불러오는 중입니다...</p>
      ) : rankingData ? (
        <div className="ranking-card">
          <div className="ranking-title">🎵 {rankingData.songTitle || 'Song Title'}</div>
          <table className="ranking-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>ID</th>
                <th>Score</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{rankingData.rank}</td>
                <td>{userId}</td>
                <td>{rankingData.score}</td>
                <td>{rankingData.time}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p className="no-ranking">테스트 내역이 없습니다.</p>
      )}

      <button className="primary-button" onClick={handleGoToRankingPage}>
        랭킹장 바로가기
      </button>
    </section>
  );
};

export default MyRankingSection;
