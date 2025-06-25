import React, { useEffect, useState } from "react";
import axios from "axios";
import SongCard from "../components/SongCard";
import "../styles/AllSongsPage.css";

const AllSongsPage = () => {
  const [allSongs, setAllSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllSongs = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/songs/all");
        const songDataWithImage = response.data.map((song) => {
          // 🔁 노래 제목에 따라 이미지 경로 지정
          let imageUrl = null;
          if (song.title === "What Makes You Beautiful") {
            imageUrl = "/img/WMYB.png";
          }
          else if(song.title === "Anti_Hero"){
              imageUrl = "/img/AntiHero.png";
          }
            else if(song.title === "Pink Pony Club"){
                imageUrl = "/img/Pink.png";
                }
          return { ...song, imageUrl };
        });

        setAllSongs(songDataWithImage);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 204) {
          console.log("No songs available.");
          setAllSongs([]);
        } else {
          console.error("Error fetching all songs:", error);
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
      <h2 className="all-songs-title">모든 학습 가능한 노래</h2>
      <section className="all-songs-section">
        {loading ? (
          <p>노래 목록을 불러오는 중입니다...</p>
        ) : allSongs.length > 0 ? (
          <div className="song-list">
            {allSongs.map((song) => (
              <SongCard
                key={song.songId}
                songId={song.songId}
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
