import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/VocabQuizPage.css';

const VocabQuizPage = () => {
  const { songId } = useParams();
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [correctMeaning, setCorrectMeaning] = useState('');
  const [choices, setChoices] = useState([]);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState('none');
  const [progress, setProgress] = useState(0);
  const [randomChoices, setRandomChoices] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const audioRef = useRef(null);

  // 1. 단어 퀴즈 데이터 불러오기
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const res = await axios.get(`/api/vocab-quiz/${songId}`);
        setQuizData(res.data);
      } catch (err) {
        console.error('퀴즈 데이터를 불러오는 중 오류 발생:', err);
      }
    };
    fetchQuizData();
  }, [songId]);

  // 2. 매 문제마다 새로운 랜덤 단어 3개 불러오기
  useEffect(() => {
    const fetchRandomWords = async () => {
      try {
        const res = await axios.get('/api/words/random');
        setRandomChoices(res.data.map(wordObj => wordObj.word));
      } catch (err) {
        console.error('랜덤 단어를 불러오는 중 오류 발생:', err);
      }
    };
    if (!isCompleted) {
      fetchRandomWords();
    }
  }, [quizIndex, isCompleted]);

  // 3. 문제 설정
  useEffect(() => {
    if (quizData.length === 0 || quizIndex >= quizData.length) return;

    const data = quizData[quizIndex];
    const currentChoices = randomChoices || [];

    const allChoices = [...currentChoices, data.correct_word];
    const shuffled = allChoices.sort(() => Math.random() - 0.5);

    setQuestion(data.sentence);
    setCorrectAnswer(data.correct_word);
    setCorrectMeaning(data.meaning);
    setChoices(shuffled);
    setSelected(null);
    setFeedback('none');
    setProgress(Math.floor((quizIndex / quizData.length) * 100));
  }, [quizData, quizIndex, randomChoices]);

  // 4. 선택 처리
  const handleClick = (word) => {
    if (selected) return;
    setSelected(word);
    setFeedback(word === correctAnswer ? 'correct' : 'wrong');

    setTimeout(() => {
      if (quizIndex + 1 < quizData.length) {
        setQuizIndex(quizIndex + 1);
      } else {
        setIsCompleted(true);
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

  const handleRetry = () => {
    setQuizIndex(0);
    setIsCompleted(false);
  };

  const goToTest = () => {
    navigate('/test');
  };

  return (
    <div className="vocab-quiz-container">
      <div className="quiz-box">
        {isCompleted ? (
          <>
            <div className="quiz-header complete">🎉 학습을 완료하였습니다!</div>
            <button className="retry-btn" onClick={handleRetry}>🔁 다시 학습하기</button>
            <button className="test-btn" onClick={goToTest}>✅ 테스트 하러 가기</button>
          </>
        ) : (
          <>
            <div className={`quiz-header ${feedback}`}>
              {feedback === 'correct' && '정답입니다!'}
              {feedback === 'wrong' && '오답입니다!'}
            </div>

            <p className="quiz-sentence">{question}</p>

            <div className="choices">
              {choices.map((word, index) => {
                const isCorrectWord = word === correctAnswer;
                const isSelected = selected === word;
                let displayWord = word;
                if (selected && isCorrectWord) {
                  displayWord = correctMeaning || word;
                }

                return (
                  <button
                    key={index}
                    className={getButtonClass(word)}
                    onClick={() => handleClick(word)}
                    disabled={!!selected}
                  >
                    {displayWord}
                  </button>
                );
              })}
            </div>

            <button className="sound-btn" onClick={playSound}>🎵 노래 듣기</button>
            <audio ref={audioRef} src="/audio/sample.mp3" preload="auto" />

            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VocabQuizPage;
