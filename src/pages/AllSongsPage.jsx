import React, { useEffect, useState } from 'react';
import axios from 'axios'; // axios import 추가
import SongCard from '../components/SongCard';
import '../styles/AllSongsPage.css';

// 이미지 import (src/assets 폴더 안에 이미지가 있다고 가정)
import songCover1 from '../assets/What Makes You Beautiful.png';

const AllSongsPage = () => {
  const [allSongs, setAllSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // API 호출 함수
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


    // 임시 mock 데이터
    /* const mockSongs = [
      {
        song_id: 1,
        title: 'Mock Song 1',
        artist: 'Test Artist',
        imageUrl: songCover1,
        progress: 75,
      },
      {
        song_id: 2,
        title: 'Mock Song 2',
        artist: 'Another Artist',
        imageUrl: songCover1,
        progress: 30,
      },
    ];

    setAllSongs(mockSongs);
    setLoading(false);
  }, []); */

  return (
    <div className="all-songs-container">
      <h2 className="all-songs-title">모든 학습 가능한 노래</h2>
      <section className="all-songs-section">
        {loading ? (
          <p>노래 목록을 불러오는 중입니다...</p>
        ) : allSongs.length > 0 ? (
          <div className="song-list">
            {allSongs.map((song, index) => (
              <SongCard
                key={song.song_id || index}
                title={song.title}
                artist={song.artist}
                imageUrl={song.imageUrl}
                progress={song.progress}
                songId={song.song_id}
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
