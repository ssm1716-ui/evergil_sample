import { useState } from 'react';
import Compressor from 'compressorjs';

const ImageCompressor = () => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [sizeInfo, setSizeInfo] = useState({ original: 0, compressed: 0 });

  // 📦 이미지 압축 함수
  const compressImage = (file) => {
    new Compressor(file, {
      quality: 1,
      maxWidth: 900,
      maxHeight: 1000,
      mimeType: 'image/jpeg',
      convertSize: Infinity,
      preserveHeaders: true,
      colorSpace: 'srgb',
      strict: true,
      checkOrientation: true,
      resize: 'contain',
      success(result) {
        setPreviewUrl(URL.createObjectURL(result));
        setSizeInfo({
          original: (file.size / 1024).toFixed(2),
          compressed: (result.size / 1024).toFixed(2),
        });

        console.log('✅ 압축 성공:', result);
      },
      error(err) {
        console.error('🚨 압축 실패:', err.message);
      },
    });
  };

  // 📤 파일 선택 핸들러
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const isHeic =
      file.type === 'image/heic' ||
      file.name.endsWith('.heic') ||
      file.name.endsWith('.HEIC');

    compressImage(file);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>📦 이미지 업로드 & 압축 (392x392)</h3>
      <input type="file" accept="image/*" onChange={handleFileChange} />

      {previewUrl && (
        <div style={{ marginTop: '20px' }}>
          <p>🔍 원본 크기: {sizeInfo.original} KB</p>
          <p>📉 압축 후: {sizeInfo.compressed} KB</p>
          <img
            src={previewUrl}
            alt="압축된 이미지"
            style={{
              width: '392px',
              height: '392px',
              objectFit: 'cover',
              border: '1px solid #ccc',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageCompressor;
