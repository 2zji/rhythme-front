import { useParams } from 'react-router-dom';
import React from 'react';
import LearnTopBanner from '../components/LearnTopBanner';
import LearningPanel from '../components/LearnActionCard';
import '../styles/SongLearnPage.css';

const dummySongs = {
  '1': {
    title: 'New Jeans - Hype Boy',
    artist: 'New Jeans',
    progress: 80,
    imageUrl: '/images/hypeboy.jpg',
  },
  '2': {
    title: 'Pink Venom',
    artist: 'BLACKPINK',
    progress: 46,
    imageUrl: '/images/pinkvenom.jpg',
  },
};

const dummyStatus = {
  vocabProgress: 65,
  testStatus: '완료',
};

const SongLearnPage = () => {
  const { songId } = useParams();
  console.log('songId:', songId);

  const song = dummySongs[songId];

  if (!song) {
    return <div> 해당하는 노래 정보를 찾을 수 없습니다 (songId: {songId})</div>;
  }

  return (
    <div className="song-detail-container">
      <LearnTopBanner
        title={song.title}
        artist={song.artist}
        progress={song.progress}
        imageUrl={song.imageUrl}
      />

      <div className="content-grid">
       <LearningPanel
         songId={songId}
         status={dummyStatus}
         onStartVocab={() => console.log('단어 학습 시작')}
         onStartTest={() => console.log('테스트 시작')}
         onViewWordbook={() => console.log('단어장 보기')}
       />
      </div>
    </div>
  );
};

export default SongLearnPage;
