import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SongCard from '../components/SongCard';
import '../styles/AllSongsPage.css';

const AllSongsPage = () => {
  const [allSongs, setAllSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllSongs = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/songs/all');
        setAllSongs(response.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 204) {
          console.log("No songs available.");
          setAllSongs([]);
        } else {
          console.error('Error fetching all songs:', error);
          setAllSongs([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAllSongs();
  }, []);

  return (
    <div className="all-songs-container">
      {/* 제목은 섹션 바깥에서 */}
      <h2 className="all-songs-title">모든 학습 가능한 노래</h2>

      {/* 카드만 박스에 담김 */}
      <section className="all-songs-section">
        {loading ? (
          <p>노래 목록을 불러오는 중입니다...</p>
        ) : allSongs.length > 0 ? (
          <div className="song-list-grid">
            {allSongs.map((song, index) => (
              <SongCard
                key={song.id || index}
                title={song.title}
                artist={song.artist}
                imageUrl={song.imageUrl}
              />
            ))}
          </div>
        ) : (
          <p>현재 등록된 학습 가능한 노래가 없습니다.</p>
        )}
      </section>
    </div>
  );
};

export default AllSongsPage;
