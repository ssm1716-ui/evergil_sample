import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import jsQR from 'jsqr';
import { getLastPathSegment } from '@/utils/utils';
import defaultLogo from '@/assets/images/evergil_logo_pc.png';

const QRScanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const [videoStyle, setVideoStyle] = useState({
    width: '100%',
    height: 'calc(100vh - 63px)',
    objectFit: 'cover',
    objectPosition: 'center',
    position: 'absolute',
    top: '63px',
    left: 0,
    zIndex: 1,
    backgroundColor: '#000'
  });
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

  // 삼성 브라우저 감지 (최소한의 최적화만)
  const isSamsungBrowser = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    return userAgent.includes('samsungbrowser') || 
           (userAgent.includes('android') && userAgent.includes('samsung'));
  };

  // 카메라 비율 조정 함수
  const adjustVideoStyle = (video) => {
    if (!video) return;
    
    const videoAspectRatio = video.videoWidth / video.videoHeight;
    const screenAspectRatio = window.innerWidth / (window.innerHeight - 63);
    
    let objectFit = 'cover';
    let objectPosition = 'center';
    
    if (videoAspectRatio > screenAspectRatio) {
      // 카메라가 화면보다 가로가 긴 경우
      objectFit = 'cover';
      objectPosition = 'center';
    } else {
      // 카메라가 화면보다 세로가 긴 경우
      objectFit = 'cover';
      objectPosition = 'center';
    }
    
    setVideoStyle({
      width: '100%',
      height: 'calc(100vh - 63px)',
      objectFit,
      objectPosition,
      position: 'absolute',
      top: '63px',
      left: 0,
      zIndex: 1,
      backgroundColor: '#000'
    });
  };

  useEffect(() => {
    let animationId;
    let stream;

    const startCamera = async () => {
      try {
        // 기본 카메라 설정 (모든 브라우저에서 안정적)
        const constraints = {
          video: { 
            facingMode: 'environment',
            // 삼성 브라우저에서만 해상도 제한
            ...(isSamsungBrowser() && {
              width: { ideal: 1280 },
              height: { ideal: 720 }
            })
          }
        };

        stream = await navigator.mediaDevices.getUserMedia(constraints);

        const video = videoRef.current;
        video.srcObject = stream;
        video.setAttribute('playsinline', true);
        
        // 비디오 메타데이터 로드 후 스타일 조정
        video.addEventListener('loadedmetadata', () => {
          adjustVideoStyle(video);
        });
        
        await video.play();

        const scanLoop = () => {
          const canvas = canvasRef.current;
          if (!video || !canvas) return;

          const ctx = canvas.getContext('2d');
          
          // 삼성 브라우저에서만 해상도 조정
          const scale = isSamsungBrowser() ? 0.7 : 1;
          const width = video.videoWidth * scale;
          const height = video.videoHeight * scale;
          
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(video, 0, 0, width, height);

          const imageData = ctx.getImageData(0, 0, width, height);
          const data = imageData.data;

          // 반전 처리 (모든 브라우저에서 동일)
          for (let i = 0; i < data.length; i += 4) {
            data[i] = 255 - data[i];
            data[i + 1] = 255 - data[i + 1];
            data[i + 2] = 255 - data[i + 2];
          }

          const code = jsQR(data, width, height);

          if (code?.data) {
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

        scanLoop();
      } catch (err) {
        console.error('카메라 실행 실패:', err);
        // 폴백: 기본 설정으로 재시도
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' }
          });
          
          const video = videoRef.current;
          video.srcObject = stream;
          video.setAttribute('playsinline', true);
          
          video.addEventListener('loadedmetadata', () => {
            adjustVideoStyle(video);
          });
          
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
        } catch (fallbackErr) {
          console.error('폴백 카메라 실행도 실패:', fallbackErr);
        }
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
        <video 
          ref={videoRef} 
          style={videoStyle}
        />

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
