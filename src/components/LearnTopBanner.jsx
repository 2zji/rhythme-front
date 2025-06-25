import React from 'react';
import '../styles/LearnTopBanner.css';

const LearnTopBanner = ({ title, artist, progress, imageUrl }) => {
  // 조건부 이미지 경로 설정
//   const bannerImage = title === 'What Makes You Beautiful' ? '/img/A.png' : imageUrl;

    let bannerImage;

    if (title === 'What Makes You Beautiful') {
      bannerImage = '/img/A.png';
    } else if(title === 'Anti_Hero'){
        bannerImage = '/img/B.jpg';
        }
    else if(title === 'Pink Pony Club'){
        bannerImage = '/img/PinkBack.jpg';
        }
    else {
      bannerImage = imageUrl;
}

  return (
    <div className="learn-banner" style={{ backgroundImage: `url(${bannerImage})` }}>
      <div className="learn-banner-overlay">
        <div className="song-text">
          <h1>{title}</h1>
          <h3>{artist}</h3>
        </div>
      </div>
    </div>
  );
};

export default LearnTopBanner;
