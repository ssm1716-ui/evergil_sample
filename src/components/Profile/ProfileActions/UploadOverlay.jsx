import React from 'react';

const UploadOverlay = ({ isUploading }) => {
  if (!isUploading) return null;

  return (
    <div className="uploading-overlay">
      <div className="spinner" />
      <p>이미지를 업로드 중입니다...</p>
    </div>
  );
};

export default UploadOverlay;