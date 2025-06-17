import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/VocabQuizPage.css';

const VocabQuizPage = () => {
  const { songId } = useParams();
  const [quizData, setQuizData] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [correctMeaning, setCorrectMeaning] = useState('');
  const [choices, setChoices] = useState([]);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState('none');
  const [progress, setProgress] = useState(0);
  const [randomChoices, setRandomChoices] = useState([]);  // 랜덤 선택지 저장
  const audioRef = useRef(null);

  // 1. 랜덤 단어 3개 불러오기
  useEffect(() => {
    const fetchRandomWords = async () => {
      try {
        const res = await axios.get('/api/words/random');
        setRandomChoices(res.data.map(wordObj => wordObj.word));
      } catch (err) {
        console.error('랜덤 단어를 불러오는 중 오류 발생:', err);
      }
    };
    fetchRandomWords();
  }, [quizIndex]);

  // 2. songId에 맞는 퀴즈 데이터 불러오기
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

  // 3. quizData, quizIndex, randomChoices가 바뀔 때 퀴즈 문제/선택지 세팅
  useEffect(() => {
    if (quizData.length === 0 || quizIndex >= quizData.length) return;

    const data = quizData[quizIndex];
    const currentChoices = randomChoices || [];
    // 정답 단어 포함해서 섞기
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

  const handleClick = (word) => {
    if (selected) return;
    setSelected(word);
    setFeedback(word === correctAnswer ? 'correct' : 'wrong');

    setTimeout(() => {
      if (quizIndex + 1 < quizData.length) {
        setQuizIndex(quizIndex + 1);
      } else {
        alert('퀴즈 완료!');
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
      </div>
    </div>
  );
};

export default VocabQuizPage;
