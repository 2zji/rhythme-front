import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/WordbookPage.css'; // 스타일을 아래 참고해서 생성

const WordbookPage = () => {
  const { songId } = useParams();
  const [words, setWords] = useState([]);
  const [flipped, setFlipped] = useState([]);

  useEffect(() => {
    const fetchWordbook = async () => {
      try {
        const res = await axios.get(`/api/vocab-quiz/${songId}`);
        const wordList = res.data.map(item => ({
          en: item.correct_word,
          ko: item.meaning,
        }));
        setWords(wordList);
        setFlipped(Array(wordList.length).fill(false));
      } catch (err) {
        console.error('단어장 불러오기 실패:', err);
      }
    };

    fetchWordbook();
  }, [songId]);

  const handleFlip = (index) => {
    const newFlipped = [...flipped];
    newFlipped[index] = !newFlipped[index];
    setFlipped(newFlipped);
  };

  return (
    <div className="wordbook-container">
      <h2 className="wordbook-title">📘 단어장</h2>
      <div className="word-grid">
        {words.map((word, idx) => (
          <div
            key={idx}
            className={`word-card ${flipped[idx] ? 'flipped' : ''}`}
            onClick={() => handleFlip(idx)}
          >
            {flipped[idx] ? word.ko : word.en}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordbookPage;
