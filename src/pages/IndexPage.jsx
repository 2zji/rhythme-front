import React, { useEffect, useState } from 'react';
import TopBanner from '../components/TopBanner';
import '../styles/IndexPage.css';

const IndexPage = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedId = localStorage.getItem('username');
    if (!storedId) {
      alert('로그인 후 이용해주세요.');
      window.location.href = '/';
    } else {
      setUserId(storedId);
    }
  }, []);

  return (
    <div className="index-container">
        <TopBanner />
      <section className="song-section">
        <h3>오늘의 추천 학습 노래</h3>
        <h2>Song Title - HISOKA</h2>
        <div className="progress-box">
          <div className="progress-bar" style={{ width: '46%' }}></div>
        </div>
        <button className="primary-button">모든 노래 보러가기</button>
      </section>

      <section className="ranking-section">
        <h3>나의 랭킹</h3>
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
              <td>5</td>
              <td>{userId}</td>
              <td>7/10</td>
              <td>5:20</td>
            </tr>
          </tbody>
        </table>
        <button className="primary-button">랭킹장 바로가기</button>
      </section>

      <section className="word-section">
        <h3>가장 최근 학습한 단어</h3>
        <div className="word-grid">
          {Array.from({ length: 10 }).map((_, i) => (
            <div className="word-card" key={i}>
              {i === 0 ? 'yeongAu' : '영어 단어 1'}
            </div>
          ))}
        </div>
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
