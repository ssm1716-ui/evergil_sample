import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Html5Qrcode } from 'html5-qrcode';
import defaultLogo from '@/assets/images/header-logo.png';

const QRScanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const scannerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const html5QrCode = new Html5Qrcode('qr-reader');

    const config = {
      fps: 10,
      // qrbox를 제거하거나 null로 설정하면 전체 카메라 화면 사용
      qrbox: (viewfinderWidth, viewfinderHeight) => {
        const minEdgePercentage = 0.6; // 화면의 60% 차지
        const edgeSize = Math.floor(
          Math.min(viewfinderWidth, viewfinderHeight) * minEdgePercentage
        );
        return {
          width: edgeSize,
          height: edgeSize,
        };
      },
      rememberLastUsedCamera: true,
    };

    html5QrCode
      .start(
        { facingMode: 'environment' },
        config,
        (decodedText) => {
          setScanResult(decodedText);
          html5QrCode.stop();
          if (
            decodedText.startsWith('http://') ||
            decodedText.startsWith('https://')
          ) {
            window.location.href = decodedText;
          }
        },
        (errorMessage) => {
          console.log('QR Code Scan Error: ', errorMessage);
        }
      )
      .catch((err) => {
        console.error('Unable to start scanning', err);
      });

    return () => {
      html5QrCode.stop().catch((err) => console.error(err));
    };
  }, []);

  return (
    <>
      <style>
        {`
          #qr-reader video {
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
          }
        `}
      </style>
      <div style={{ height: '100vh', overflow: 'hidden' }}>
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
              {/* 우측 돌아가기 버튼 */}
              <button
                onClick={() => navigate(-1)}
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
        <div
          id="qr-reader"
          ref={scannerRef}
          style={{
            height: 'calc(100vh - 63px)', // 헤더 높이 제외한 영역 전체 사용
            width: '100%',
            backgroundColor: 'black',
          }}
        />
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
