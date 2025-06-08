import { useNavigate } from 'react-router-dom';
import '../styles/LearnActionCard.css';

const LearnActionCard = ({ status, songId, onStartVocab, onStartTest, onViewWordbook }) => {
  const navigate = useNavigate();

  const handleStartVocab = () => {
    navigate(`/learn/quiz/${songId}`);
  };

  if (!status) return null;

  return (
    <div className="learn-card">
      <h3>학습하기</h3>

      <button className="learn-button" onClick={handleStartVocab}>
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
