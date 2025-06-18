// src/components/LatestSongSection.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SongCard from './SongCard';
import '../styles/LatestSongSection.css';

const LatestSongSection = ({ userId }) => {
  const [latestSong, setLatestSong] = useState(null);
  const [loadingSong, setLoadingSong] = useState(true);

  useEffect(() => {
    const fetchLatestSong = async () => {
      if (!userId) {
        setLoadingSong(false);
        return;
      }

      try {
        setLoadingSong(true);
        const response = await axios.get(`/api/users/${userId}/latest-song`);
        setLatestSong(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          console.error('Error fetching latest song:', status, error.response?.data);
          if (status === 404 || status === 204) {
            setLatestSong(null);
          } else {
            setLatestSong(null);
          }
        }
      } finally {
        setLoadingSong(false);
      }
    };

    fetchLatestSong();
     console.log(">>> userId:", userId);
  }, [userId]);


  return (
    <section className="song-section">
      <h3>가장 최근 학습한 노래</h3>

      {loadingSong ? (
        <p>노래를 불러오는 중입니다...</p>
      ) : (
        latestSong ? (
          <SongCard
            title={latestSong.title}
            artist={latestSong.artist}
            imageUrl={latestSong.imageUrl}
            progress={latestSong.progress}
            songId={latestSong.song_id}  // song_id 맞게 바꿔주기
          />
        ) : (
          <p className="null-text">최근 학습 중인 노래가 없습니다.</p>
        )
      )}
    </section>
  );
};

export default LatestSongSection;