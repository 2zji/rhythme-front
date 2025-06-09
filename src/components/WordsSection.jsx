import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/WordsSection.css';

const WordsSection = ({ userId }) => {
  const [loadingWords, setLoadingWords] = useState(true);
  const [recentWords, setRecentWords] = useState([]);

  useEffect(() => {
    if (!userId) return;

    const fetchRecentWords = async () => {
      try {
        setLoadingWords(true);
        const response = await axios.get(`/api/users/${userId}/recent-words`);
        setRecentWords(response.data);
      } catch (error) {
        console.error('Error fetching recent words:', error);
        setRecentWords([]);
      } finally {
        setLoadingWords(false);
      }
    };

    fetchRecentWords();
  }, [userId]);

  return (
    <section className="word-section">
      <h3>가장 최근 학습한 단어</h3>
      {loadingWords ? (
        <p>단어를 불러오는 중입니다...</p>
      ) : recentWords.length > 0 ? (
        <div className="word-grid">
          {recentWords.map((word, index) => (
            <div className="word-card" key={index}>
              {word}
            </div>
          ))}
        </div>
      ) : (
        <p className="null-text">최근 학습한 단어가 없습니다.</p>
      )}
    </section>
  );
};

export default WordsSection;