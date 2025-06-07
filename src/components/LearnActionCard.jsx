import React, { useEffect, useState } from 'react';
import '../styles/LearnActionCard.css';

// 목업 데이터 (userId와 songId에 상관없이 동일한 데이터 반환)
const mockStatusData = {
  vocabProgress: 65,
  testStatus: '완료',
};

const LearnActionCard = ({ userId, songId, onStartVocab, onStartTest, onViewWordbook }) => {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    // 목업 데이터 세팅
    if (userId && songId) {
      setStatus(mockStatusData);
    } else {
      setStatus(null);
    }

    /*
    // 실제 API 호출 (나중에 주석 해제해서 사용)
    const fetchLearnStatus = async () => {
      try {
        const res = await axios.get(`/api/users/${userId}/songs/${songId}/learn-status`);
        setStatus(res.data);
      } catch (err) {
        console.error('학습 상태 가져오기 실패:', err);
      }
    };

    if (userId && songId) {
      fetchLearnStatus();
    }
    */
  }, [userId, songId]);

  if (!status) return null;

  return (
    <div className="learn-card">
      <h3>학습하기</h3>

      <button className="learn-button" onClick={onStartVocab}>
        단어 학습
        <div className="progress-bar">
          <div className="progress" style={{ width: `${status.vocabProgress}%` }} />
        </div>
        <span className="progress-text">{status.vocabProgress}%</span>
      </button>

      <button className="learn-button" onClick={onStartTest}>
        테스트
        <span className="badge">{status.testStatus}</span>
      </button>

      <button className="learn-button" onClick={onViewWordbook}>
        단어장
      </button>
    </div>
  );
};

export default LearnActionCard;
