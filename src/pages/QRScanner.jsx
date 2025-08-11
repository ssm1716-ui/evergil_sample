import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import jsQR from 'jsqr';
import { getLastPathSegment } from '@/utils/utils';
import defaultLogo from '@/assets/images/evergil_logo_pc.png';

const QRScanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const [videoStyle, setVideoStyle] = useState({});
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handlePageShow = (event) => {
      if (event.persisted) {
        console.log('[QRScanner] 뒤로가기 감지 → 강제 새로고침');
        window.location.reload();
      }
    };
    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, []);

  const adjustVideoStyle = (video) => {
    if (!video) return;
    const { videoWidth, videoHeight } = video;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight - 63; // 헤더 높이 제외

    const videoAspectRatio = videoWidth / videoHeight;
    const screenAspectRatio = screenWidth / screenHeight;

    let style = {
      width: '100%',
      height: 'calc(100vh - 63px)',
      objectFit: 'cover',
      position: 'absolute',
      top: '63px',
      left: 0,
      zIndex: 1,
      backgroundColor: '#000'
    };

    if (videoAspectRatio > screenAspectRatio) {
      style.objectPosition = 'center top';
    } else {
      style.objectPosition = 'center center';
    }
    setVideoStyle(style);
  };

  useEffect(() => {
    let animationId;
    let stream;

    const startCamera = async (constraints) => {
      try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
        const video = videoRef.current;
        video.srcObject = stream;
        video.setAttribute('playsinline', true);
        
        video.onloadedmetadata = () => {
          adjustVideoStyle(video);
          video.play();
          scanLoop();
        };

      } catch (err) {
        console.error('카메라 실행 실패:', err);
        throw err; // 에러를 다시 던져서 폴백 로직이 처리하도록 함
      }
    };

    const scanLoop = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas || video.paused || video.ended) {
        animationId = requestAnimationFrame(scanLoop);
        return;
      }
    
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;
    
      // 큐알 인식 영역 (중앙 200px 정사각형) 설정
      const scanSize = 200;
      const x = (videoWidth / 2) - (scanSize / 2);
      const y = (videoHeight / 2) - (scanSize / 2);
    
      // 캔버스 크기를 인식 영역에 맞게 설정
      canvas.width = scanSize;
      canvas.height = scanSize;
    
      // 비디오에서 인식 영역만 캔버스에 그리기
      ctx.drawImage(video, x, y, scanSize, scanSize, 0, 0, scanSize, scanSize);
    
      const imageData = ctx.getImageData(0, 0, scanSize, scanSize);
      const code = jsQR(imageData.data, scanSize, scanSize);
    
      if (code) {
        console.log('QR 코드 감지:', code.data);
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

    (async () => {
      const highResConstraints = {
        video: { facingMode: 'environment', width: { ideal: 1920 }, height: { ideal: 1080 } }
      };

      try {
        await startCamera(highResConstraints);
      } catch (err) {
        console.log('고해상도 실패, 기본 해상도로 재시도');
        const basicConstraints = {
          video: { facingMode: 'environment' }
        };
        try {
          await startCamera(basicConstraints);
        } catch (fallbackErr) {
          console.error('카메라 실행에 최종적으로 실패했습니다.', fallbackErr);
        }
      }
    })();

    return () => {
      cancelAnimationFrame(animationId);
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [navigate]);

  const handleBack = () => {
    const video = videoRef.current;
    if (video?.srcObject) {
      video.srcObject.getTracks().forEach((track) => track.stop());
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
            z-index: 2;
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
        <video ref={videoRef} style={videoStyle} />

        {/* 반전 캔버스 (QR 인식용) - 숨김 처리 */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: '-9999px',
            left: '-9999px',
            width: '1px',
            height: '1px'
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