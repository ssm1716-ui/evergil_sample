import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import jsQR from 'jsqr';
import { getLastPathSegment } from '@/utils/utils';
import defaultLogo from '@/assets/images/header-logo.png';

const QRScanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  // ✅ 뒤로가기로 들어올 때 bfcache를 막고 강제로 초기화
  useEffect(() => {
    const handlePageShow = (event) => {
      const navEntry = performance.getEntriesByType('navigation')[0];
      const isBackForward =
        event.persisted || (navEntry && navEntry.type === 'back_forward');

      if (isBackForward) {
        console.log('[QRScanner] 뒤로가기 감지 → 강제 새로고침');
        window.location.reload();
      }
    };

    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, []);

  useEffect(() => {
    let animationId;
    let stream;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        });

        const video = videoRef.current;
        video.srcObject = stream;
        video.setAttribute('playsinline', true);
        await video.play();

        const scanLoop = () => {
          const canvas = canvasRef.current;
          if (!video || !canvas) return;

          const ctx = canvas.getContext('2d');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;

          // 반전 처리
          for (let i = 0; i < data.length; i += 4) {
            data[i] = 255 - data[i];
            data[i + 1] = 255 - data[i + 1];
            data[i + 2] = 255 - data[i + 2];
          }

          const code = jsQR(data, canvas.width, canvas.height);

          if (code?.data) {
            setScanResult(code.data);

            const key = code.data;
            const isPathKey = getLastPathSegment(key);

            if (!isPathKey) {
              navigate('/error?desc=유효한 QR코드 아닙니다.&pageUrl=/profile');
              return;
            }

            const tracks = video.srcObject?.getTracks();
            tracks?.forEach((track) => track.stop());
            cancelAnimationFrame(animationId);

            window.location.href = key;
            return;
          }

          animationId = requestAnimationFrame(scanLoop);
        };

        scanLoop();
      } catch (err) {
        console.error('카메라 실행 실패:', err);
      }
    };

    startCamera();

    return () => {
      cancelAnimationFrame(animationId);
      const video = videoRef.current;
      if (video?.srcObject) {
        video.srcObject.getTracks().forEach((track) => track.stop());
        video.srcObject = null;
      }
    };
  }, [navigate]);

  const handleBack = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
    navigate('/profile');
  };

  return (
    <>
      <style>
        {`
        video {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
        }

        .overlay-box {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 200px;
          height: 200px;
          transform: translate(-50%, -50%);
          box-sizing: border-box;
        }

        .overlay-box .corner {
          position: absolute;
          width: 20px;
          height: 20px;
          border: 3px solid yellow;
        }

        .overlay-box .top-left {
          top: 0;
          left: 0;
          border-right: none;
          border-bottom: none;
        }

        .overlay-box .top-right {
          top: 0;
          right: 0;
          border-left: none;
          border-bottom: none;
        }

        .overlay-box .bottom-left {
          bottom: 0;
          left: 0;
          border-right: none;
          border-top: none;
        }

        .overlay-box .bottom-right {
          bottom: 0;
          right: 0;
          border-left: none;
          border-top: none;
        }
      `}
      </style>

      <div
        style={{ height: '100vh', overflow: 'hidden', position: 'relative' }}
      >
        <header style={{ height: '63px' }}>
          <nav className="navbar navbar-expand-lg header-light bg-white center-logo header-reverse">
            <div className="container-fluid">
              <div className="menu-logo">
                <Link to="/" className="navbar-brand ps-0 md-ps-15px">
                  <img src={defaultLogo} alt="" className="default-logo" />
                  <img src={defaultLogo} alt="" className="alt-logo" />
                  <img src={defaultLogo} alt="" className="mobile-logo" />
                </Link>
              </div>
              <button
                onClick={handleBack}
                style={{
                  border: 'none',
                  background: 'none',
                  fontSize: '16px',
                  cursor: 'pointer',
                }}
              >
                ← 돌아가기
              </button>
            </div>
          </nav>
        </header>

        {/* 비디오 출력 */}
        <video ref={videoRef} style={{ display: 'none' }} />

        {/* 반전 캔버스 (QR 인식용) */}
        <canvas
          ref={canvasRef}
          style={{
            width: '100%',
            height: 'calc(100vh - 63px)',
            backgroundColor: 'black',
          }}
        />

        {/* 🔲 오버레이 (QR 가이드 박스) */}
        <div className="overlay-box">
          <div className="corner top-left" />
          <div className="corner top-right" />
          <div className="corner bottom-left" />
          <div className="corner bottom-right" />
        </div>

        {scanResult && (
          <div>
            <h3>스캔 결과:</h3>
            <p>{scanResult}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default QRScanner;
