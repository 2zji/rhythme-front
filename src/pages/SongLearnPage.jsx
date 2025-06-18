import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LearnTopBanner from '../components/LearnTopBanner';
import LearningPanel from '../components/LearnActionCard';
import '../styles/SongLearnPage.css';

const SongLearnPage = () => {
  const { songId } = useParams(); // URL에서 songId 추출
  console.log("useParams songId:", songId);
  const [songData, setSongData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSongData = async () => {
      try {
        const res = await axios.get(`/api/songs/${songId}`);
        console.log('API 응답 데이터:', res.data);
        setSongData(res.data);
      } catch (err) {
        console.error('노래 정보를 불러오는 데 실패했습니다:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSongData();
  }, [songId]);

  if (loading) return <div>로딩 중...</div>;
  if (!songData) return <div>해당하는 노래 정보를 찾을 수 없습니다</div>;

  return (
    <div className="song-detail-container">
      <LearnTopBanner
        title={songData.title}
        artist={songData.artist}
        imageUrl={songData.imageUrl} // imageUrl은 DB 필드 그대로
      />

      <div className="content-grid">
        <LearningPanel
          songId={songData.songId}  // 백엔드 필드명에 맞춤
          status={{
            vocabProgress: songData.vocabProgress,  // 이건 백엔드에 없으면 undefined 가능
            testStatus: songData.testStatus
          }}
          onStartVocab={() => console.log('단어 학습 시작')}
          onViewWordbook={() => console.log('단어장 보기')}
        />
      </div>
    </div>
  );
};

export default SongLearnPage;
