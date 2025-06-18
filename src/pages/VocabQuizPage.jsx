import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/VocabQuizPage.css";

const VocabQuizPage = () => {
  const { songId } = useParams();
  const navigate = useNavigate();

  const [quizData, setQuizData] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [correctMeaning, setCorrectMeaning] = useState("");
  const [choices, setChoices] = useState([]);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState("none");
  const [progress, setProgress] = useState(0);
  const [randomChoices, setRandomChoices] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showAutoNextMsg, setShowAutoNextMsg] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);

  const audioRef = useRef(null);

  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    const storedusername = localStorage.getItem("username");
    setUserId(storedId);
    setUsername(storedusername);
  }, []);

  useEffect(() => {
    const fetchQuizDataWithSegments = async () => {
      try {
        const quizRes = await axios.get(`/api/vocab-quiz/${songId}`);
        const quizItems = quizRes.data;

        const enrichedQuiz = await Promise.all(
          quizItems.map(async (item) => {
            try {
              const segRes = await axios.get("/api/song-words/segment", {
                params: { songId: songId, wordId: item.wordId },
              });
              return {
                ...item,
                start_time_sec: segRes.data.startTimeSec,
                end_time_sec: segRes.data.endTimeSec,
              };
            } catch (segErr) {
              console.warn(
                `구간정보 불러오기 실패 (wordId: ${item.wordId}):`,
                segErr
              );
              return {
                ...item,
                start_time_sec: 0,
                end_time_sec: 0,
              };
            }
          })
        );

        setQuizData(enrichedQuiz);
        setStartTime(Date.now());
      } catch (err) {
        console.error("퀴즈 데이터 불러오기 실패:", err);
      }
    };

    fetchQuizDataWithSegments();
  }, [songId]);

  useEffect(() => {
    const fetchRandomWords = async () => {
      try {
        const res = await axios.get("/api/words/group");
        setRandomChoices(res.data.map((wordObj) => wordObj.word));
      } catch (err) {
        console.error("랜덤 단어를 불러오는 중 오류 발생:", err);
      }
    };
    if (!isCompleted) {
      fetchRandomWords();
    }
  }, [quizIndex, isCompleted]);

  useEffect(() => {
    if (quizData.length === 0 || quizIndex >= quizData.length) return;

    const data = quizData[quizIndex];
    const correct = data.correct_word;

    let filtered = (randomChoices || []).filter((w) => w !== correct);
    filtered = Array.from(new Set(filtered));

    const fetchExtraChoices = async (neededCount) => {
      try {
        const res = await axios.get("/api/words/group");
        const extra = res.data
          .map((w) => w.word)
          .filter((w) => w !== correct && !filtered.includes(w));
        return extra.slice(0, neededCount);
      } catch (err) {
        console.error("추가 단어 불러오기 실패:", err);
        return [];
      }
    };

    const setupChoices = async () => {
      let finalChoices = [...filtered];

      if (finalChoices.length < 3) {
        const needed = 3 - finalChoices.length;
        const extra = await fetchExtraChoices(needed);
        finalChoices = [...finalChoices, ...extra];
      }

      const choicesSet = [...finalChoices.slice(0, 3), correct];
      const shuffled = choicesSet.sort(() => Math.random() - 0.5);

      setChoices(shuffled);
      setQuestion(data.sentence);
      setCorrectAnswer(correct);
      setCorrectMeaning(data.meaning);
      setSelected(null);
      setFeedback("none");
      setProgress(Math.floor((quizIndex / quizData.length) * 100));
    };

    setupChoices();
  }, [quizData, quizIndex, randomChoices]);

  useEffect(() => {
    if (selected) {
      setShowAutoNextMsg(true);

      const timeout = setTimeout(() => {
        goToNextQuestion();
      }, 3000);

      const handleKeyDown = (e) => {
        if (e.code === "Space") {
          clearTimeout(timeout);
          goToNextQuestion();
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        clearTimeout(timeout);
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [selected]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      const { end_time_sec } = quizData[quizIndex] || {};
      if (end_time_sec && audio.currentTime >= end_time_sec) {
        audio.pause();
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [quizIndex, quizData]);

  useEffect(() => {
    const saveLearnedSong = async () => {
      if (!isCompleted || !username) return;

      try {
        console.log("학습 기록 저장", { username, songId });
        await axios.post(`/api/users/${username}/latest-song`, {
          songId: Number(songId),
        });
        console.log("학습 기록 저장 완료");
      } catch (err) {
        console.error("학습 기록 저장 실패:", err);
      }
    };

    saveLearnedSong();
  }, [isCompleted, username, songId]);

  const goToNextQuestion = () => {
    setShowAutoNextMsg(false);
    if (quizIndex + 1 < quizData.length) {
      setQuizIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleClick = (word) => {
    if (selected) return;
    setSelected(word);

    const isCorrect = word === correctAnswer;
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }

    setFeedback(isCorrect ? "correct" : "wrong");
  };

  const getButtonClass = (word) => {
    if (!selected) return "choice";
    if (word === correctAnswer) return "choice correct";
    if (word === selected) return "choice wrong";
    return "choice";
  };

  const playSound = () => {
    if (!audioRef.current) return;
    if (quizData.length === 0 || quizIndex >= quizData.length) return;

    const audio = audioRef.current;
    const { start_time_sec } = quizData[quizIndex];
    audio.currentTime = start_time_sec;
    audio.play();
  };

  const handleRetry = () => {
    setQuizIndex(0);
    setCorrectCount(0);
    setIsCompleted(false);
    setStartTime(Date.now());
  };

  return (
    <div className="vocab-quiz-container">
      <div className="quiz-box">
        {isCompleted ? (
          <>
            <div className="quiz-header complete">
              🎉 학습을 완료하였습니다!
            </div>
            <div className="quiz-result">
              정답 수: {correctCount} / {quizData.length}
            </div>
            <button className="retry-btn" onClick={handleRetry}>
              🔁 다시 학습하기
            </button>
            <button
              className="test-btn"
              onClick={() =>
                navigate(`/learn/wordbook/${songId}`, { state: { username } })
              }
            >
              📘 단어장 보러가기
            </button>
          </>
        ) : (
          <>
            <div className={`quiz-header ${feedback}`}>
              {feedback === "correct" && "정답입니다!"}
              {feedback === "wrong" && "오답입니다!"}
            </div>

            {feedback !== "none" && showAutoNextMsg && (
              <div className="auto-next-msg">
                3초 후 자동으로 다음 문제로 넘어갑니다... (스페이스바로 즉시
                진행 가능)
              </div>
            )}

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

            <button className="sound-btn" onClick={playSound}>
              🎵 노래 듣기
            </button>
            <audio ref={audioRef} src="/audio/A.mp3" preload="auto" />

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VocabQuizPage;
