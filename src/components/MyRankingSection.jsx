// src/components/MyRankingSection.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // useNavigate import

const MyRankingSection = ({ userId }) => {
  const [loadingRanking, setLoadingRanking] = useState(true);
  const [rankingData, setRankingData] = useState(null);

  const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
    // userId가 없으면 랭킹 데이터를 가져오지 않음
    if (!userId) {
      setLoadingRanking(false);
      return;
    }

    const fetchRankingData = async () => {
      try {
        setLoadingRanking(true);
        const response = await axios.get(`/api/users/${userId}/ranking`);
        setRankingData(response.data);
      } catch (error) {
        console.error('Error fetching ranking data:', error);
        setRankingData(null);
      } finally {
        setLoadingRanking(false);
      }
    };

    fetchRankingData();
  }, [userId]); // userId가 변경될 때마다 데이터를 다시 가져오도록 의존성 추가

  const handleGoToRankingPage = () => {
    // 랭킹 페이지로 이동하는 로직 (예: /ranking 경로)
    navigate('/ranking'); // 실제 랭킹 페이지 경로에 맞춰 수정하세요
  };

  return (
    <section className="ranking-section">
      <h3>나의 랭킹</h3>
      {loadingRanking ? (
        <p>랭킹 정보를 불러오는 중입니다...</p>
      ) : (
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
              <td>{rankingData ? rankingData.rank : 'N/A'}</td>
              <td>{userId}</td>
              <td>{rankingData ? rankingData.score : 'N/A'}</td>
              <td>{rankingData ? rankingData.time : 'N/A'}</td>
            </tr>
          </tbody>
        </table>
      )}
      <button className="primary-button" onClick={handleGoToRankingPage}>
        랭킹장 바로가기
      </button>
    </section>
  );
};

export default MyRankingSection;