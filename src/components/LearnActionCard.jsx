import { useNavigate } from 'react-router-dom';
import '../styles/LearnActionCard.css';

const LearnActionCard = ({ status, songId }) => {
  const navigate = useNavigate();

  const handleStartVocab = () => {
    navigate(`/learn/quiz/${songId}`);
  };

  const handleViewWordbook = () => {
    navigate(`/learn/wordbook/${songId}`);
  };

  if (!status) return null;

  return (
    <div className="learn-card">
      <h3>학습하기</h3>

      <button className="learn-button" onClick={handleStartVocab}>
        단어 학습
      </button>

      <button className="learn-button" onClick={handleViewWordbook}>
        단어장
      </button>
    </div>
  );
};

export default LearnActionCard;
