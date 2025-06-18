import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/WordsSection.css";

const WordsSection = ({ username }) => {
  const [loadingWords, setLoadingWords] = useState(true);
  const [recentWords, setRecentWords] = useState([]);
  const [flipped, setFlipped] = useState([]);

  useEffect(() => {
    if (!username) return;

    const fetchRecentWords = async () => {
      try {
        setLoadingWords(true);

        // 1. 최신 학습한 노래 정보 가져오기
        const songRes = await axios.get(`/api/users/${username}/latest-song`);
        const songId = songRes.data.songId;
        console.log(songId);

        // 2. 해당 노래의 단어장 불러오기
        const wordRes = await axios.get(`/api/vocab-quiz/${songId}`);
        const wordList = wordRes.data.map((item) => ({
          en: item.correct_word,
          ko: item.meaning,
        }));

        setRecentWords(wordList);
        setFlipped(Array(wordList.length).fill(false));
      } catch (error) {
        console.error("최근 단어 불러오기 실패:", error);
        setRecentWords([]);
        setFlipped([]);
      } finally {
        setLoadingWords(false);
      }
    };

    fetchRecentWords();
  }, [username]);

  const handleFlip = (index) => {
    const newFlipped = [...flipped];
    newFlipped[index] = !newFlipped[index];
    setFlipped(newFlipped);
  };

  return (
    <section className="word-section">
      <h3>가장 최근 학습한 단어</h3>
      {loadingWords ? (
        <p>단어를 불러오는 중입니다...</p>
      ) : recentWords.length > 0 ? (
        <div className="word-grid">
          {recentWords.map((word, index) => (
            <div
              key={index}
              className={`word-card ${flipped[index] ? "flipped" : ""}`}
              onClick={() => handleFlip(index)}
            >
              {flipped[index] ? word.ko : word.en}
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
