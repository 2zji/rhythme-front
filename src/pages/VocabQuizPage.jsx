import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/VocabQuizPage.css';

const VocabQuizPage = () => {
  const { songId } = useParams();
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [choices, setChoices] = useState([]);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState('none'); // 'none' | 'correct' | 'wrong'
  const [progress, setProgress] = useState(0); // 0~100
  const audioRef = useRef(null);

  const quizData = [
    { question: "I ___ to the store yesterday.", correctAnswer: "went", choices: ["go", "run", "eat"] },
    { question: "He ___ his homework.", correctAnswer: "finished", choices: ["play", "open", "watch"] },
    { question: "They ___ soccer on weekends.", correctAnswer: "play", choices: ["cook", "swim", "drive"] },
  ];

  const [quizIndex, setQuizIndex] = useState(0);

  useEffect(() => {
    loadQuiz(quizIndex);
  }, [quizIndex]);

  const loadQuiz = (index) => {
    const data = quizData[index];
    const allChoices = [...data.choices, data.correctAnswer];
    const shuffled = allChoices.sort(() => Math.random() - 0.5);
    setQuestion(data.question);
    setCorrectAnswer(data.correctAnswer);
    setChoices(shuffled);
    setSelected(null);
    setFeedback('none');
    setProgress(Math.floor((index / quizData.length) * 100));
  };

  const handleClick = (word) => {
    if (selected) return;
    setSelected(word);
    if (word === correctAnswer) {
      setFeedback('correct');
    } else {
      setFeedback('wrong');
    }

    setTimeout(() => {
      if (quizIndex + 1 < quizData.length) {
        setQuizIndex(quizIndex + 1);
      } else {
        alert('퀴즈 완료!');
        // 여기서 결과 페이지로 이동할 수 있음
      }
    }, 3000);
  };

  const getButtonClass = (word) => {
    if (!selected) return 'choice';
    if (word === correctAnswer) return 'choice correct';
    if (word === selected) return 'choice wrong';
    return 'choice';
  };

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  return (
    <div className="vocab-quiz-container">
      <div className="quiz-box">
        <div className={`quiz-header ${feedback}`}>
          {feedback === 'correct' && '정답입니다!'}
          {feedback === 'wrong' && '오답입니다!'}
        </div>

        <p className="quiz-sentence">{question}</p>

        <div className="choices">
          {choices.map((word, index) => (
            <button
              key={index}
              className={getButtonClass(word)}
              onClick={() => handleClick(word)}
              disabled={!!selected}
            >
              {word}
            </button>
          ))}
        </div>

        <button className="sound-btn" onClick={playSound}>🎵 노래 듣기</button>
        <audio ref={audioRef} src="/audio/sample.mp3" preload="auto" />

        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default VocabQuizPage;
