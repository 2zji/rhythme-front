// src/components/LatestSongSection.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import SongCard from "./SongCard";
import "../styles/LatestSongSection.css";

const LatestSongSection = ({ username }) => {
  const [latestSong, setLatestSong] = useState(null);
  const [loadingSong, setLoadingSong] = useState(true);
  const [imgUrl, setImgUrl] = useState(null);

  useEffect(() => {
    const fetchLatestSong = async () => {
      if (!username) {
        setLoadingSong(false);
        return;
      }

      try {
        setLoadingSong(true);
        const response = await axios.get(`/api/users/${username}/latest-song`);
        const songData = response.data;

        setLatestSong(songData);

        if (songData && songData.title === "What Makes You Beautiful") {
          setImgUrl("/img/WMYB.png");
        } else if(songData && songData.title === "Anti_Hero"){
            setImgUrl("/img/AntiHero.png");
            }
        else if(songData && songData.title === "Pink Pony Club"){
            setImgUrl("/img/Pink.png");
            }
        else {
          setImgUrl(null);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          console.error(
            "Error fetching latest song:",
            status,
            error.response?.data
          );
          if (status === 404 || status === 204) {
            setLatestSong(null);
          } else {
            setLatestSong(null);
          }
        }
        setImgUrl(null); // 에러 시 이미지도 초기화
      } finally {
        setLoadingSong(false);
      }

      console.log(">>> userId:", username);
    };

    fetchLatestSong();
  }, [username]);

  return (
    <section className="song-section">
      <h3>가장 최근 학습한 노래</h3>

      {loadingSong ? (
        <p>노래를 불러오는 중입니다...</p>
      ) : latestSong ? (
        <SongCard
          title={latestSong.title}
          artist={latestSong.artist}
          imageUrl={imgUrl}
          progress={latestSong.progress}
          songId={latestSong.songId} // song_id 맞게 바꿔주기
        />
      ) : (
        <p className="null-text">최근 학습 중인 노래가 없습니다.</p>
      )}
    </section>
  );
};

export default LatestSongSection;
