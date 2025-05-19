// components/JsqrReverseScanner.jsx
import { useEffect, useRef, useState } from 'react';
import jsQR from 'jsqr';

const JsqrReverseScanner = ({ onDetected }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [error, setError] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    let animationId;

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        });

        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute('playsinline', true);
        await videoRef.current.play();

        const scanLoop = () => {
          if (!videoRef.current || !canvasRef.current) return;

          const video = videoRef.current;
          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d');

          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;

          // ✅ 반전 처리
          for (let i = 0; i < data.length; i += 4) {
            data[i] = 255 - data[i]; // R
            data[i + 1] = 255 - data[i + 1]; // G
            data[i + 2] = 255 - data[i + 2]; // B
          }

          const code = jsQR(data, canvas.width, canvas.height);
          if (code) {
            setResult(code.data);
            if (onDetected) onDetected(code.data);

            cancelAnimationFrame(animationId);
            const tracks = video.srcObject.getTracks();
            tracks.forEach((track) => track.stop());
            return;
          }

          animationId = requestAnimationFrame(scanLoop);
        };

        scanLoop();
      } catch (err) {
        console.error(err);
        setError('카메라 접근 실패');
      }
    };

    startCamera();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
      }
    };
  }, [onDetected]);

  return (
    <div>
      <video ref={videoRef} style={{ display: 'none' }} />
      <canvas ref={canvasRef} style={{ width: '100%' }} />
      {result && <p>✅ 인식 결과: {result}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default JsqrReverseScanner;
