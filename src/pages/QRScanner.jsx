import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BrowserMultiFormatReader, Result } from '@zxing/library';
import { getLastPathSegment } from '@/utils/utils';
import defaultLogo from '@/assets/images/evergil_logo_pc.png';

const QRScanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const [videoStyle, setVideoStyle] = useState({});
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const codeReaderRef = useRef(null);

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
    const screenHeight = window.innerHeight - 63;

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
    let stream;

    const startScanning = async () => {
      try {
        // ZXing 코드 리더 초기화
        codeReaderRef.current = new BrowserMultiFormatReader();
        
        // 카메라 설정
        const constraints = {
          video: { 
            facingMode: 'environment',
            width: { ideal: 1920 },
            height: { ideal: 1080 }
          }
        };

        // ZXing으로 스캔 시작
        const result = await codeReaderRef.current.decodeFromConstraints(
          constraints,
          videoRef.current,
          (result, error) => {
            if (result) {
              console.log('QR 코드 감지:', result.text);
              setScanResult(result.text);

              const key = result.text;
              const isPathKey = getLastPathSegment(key);
              const isEvergilDomain = key.includes('evergil.kr');

              if (!isPathKey || !isEvergilDomain) {
                navigate('/error?desc=유효한 QR코드 아닙니다.&pageUrl=/profile');
                return;
              }

              // 스캔 중지
              if (codeReaderRef.current) {
                codeReaderRef.current.reset();
              }

              window.location.href = key;
            }
            
            if (error && error.name !== 'NotFoundException') {
              console.error('스캔 오류:', error);
            }
          }
        );

        // 비디오 스타일 조정
        videoRef.current.onloadedmetadata = () => {
          adjustVideoStyle(videoRef.current);
        };

      } catch (err) {
        console.error('ZXing 스캔 시작 실패:', err);
        
        // 폴백: 기본 카메라 설정으로 재시도
        try {
          const basicConstraints = {
            video: { facingMode: 'environment' }
          };
          
          codeReaderRef.current = new BrowserMultiFormatReader();
          await codeReaderRef.current.decodeFromConstraints(
            basicConstraints,
            videoRef.current,
            (result, error) => {
              if (result) {
                console.log('QR 코드 감지 (폴백):', result.text);
                setScanResult(result.text);

                const key = result.text;
                const isPathKey = getLastPathSegment(key);
                const isEvergilDomain = key.includes('evergil.kr');

                if (!isPathKey || !isEvergilDomain) {
                  navigate('/error?desc=유효한 QR코드 아닙니다.&pageUrl=/profile');
                  return;
                }

                if (codeReaderRef.current) {
                  codeReaderRef.current.reset();
                }

                window.location.href = key;
              }
              
              if (error && error.name !== 'NotFoundException') {
                console.error('폴백 스캔 오류:', error);
              }
            }
          );

          videoRef.current.onloadedmetadata = () => {
            adjustVideoStyle(videoRef.current);
          };

        } catch (fallbackErr) {
          console.error('ZXing 폴백도 실패:', fallbackErr);
        }
      }
    };

    startScanning();

    return () => {
      if (codeReaderRef.current) {
        codeReaderRef.current.reset();
      }
    };
  }, [navigate]);

  const handleBack = () => {
    if (codeReaderRef.current) {
      codeReaderRef.current.reset();
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
            width: 300px;
            height: 300px;
            transform: translate(-50%, -50%);
            box-sizing: border-box;
            z-index: 2;
          }

          .overlay-box .corner {
            position: absolute;
            width: 30px;
            height: 30px;
            border: 3px solid #00ff00;
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

          .scan-line {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, #00ff00, transparent);
            animation: scan 2s linear infinite;
          }

          @keyframes scan {
            0% { top: 0; }
            100% { top: 100%; }
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

        {/* 🔲 오버레이 (QR 가이드 박스) */}
        <div className="overlay-box">
          <div className="corner top-left" />
          <div className="corner top-right" />
          <div className="corner bottom-left" />
          <div className="corner bottom-right" />
          <div className="scan-line" />
        </div>

        {/* {scanResult && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(0,0,0,0.8)',
            color: 'white',
            padding: '20px',
            borderRadius: '10px',
            zIndex: 3
          }}>
            <h3>스캔 결과:</h3>
            <p>{scanResult}</p>
          </div>
        )} */}
      </div>
    </>
  );
};

export default QRScanner;