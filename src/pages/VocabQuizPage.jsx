import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/VocabQuizPage.css';

const VocabQuizPage = () => {
  const { songId } = useParams();

  return (
    <div className="vocab-quiz-container">
      <h2>단어 퀴즈 (노래 ID: {songId})</h2>

      <div className="quiz-box">
        <p>I __ You</p>
        <button>love</button>
        <button>hate</button>
        <button>sad</button>
        <button>siryeon</button>
        <br />
        <button>🔊 단어 듣기</button>
      </div>
    </div>
  );
};

export default VocabQuizPage;
