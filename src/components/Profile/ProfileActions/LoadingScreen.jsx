import React from 'react';

const LoadingScreen = () => {
  return (
    <>
      <div className="blur-overlay"></div>
      <div className="loading-container">
        <div className="spinner"></div>
        <p>프로필을 불러오는 중...</p>
      </div>
    </>
  );
};

export default LoadingScreen;