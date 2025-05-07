import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Html5Qrcode } from 'html5-qrcode';
import { useVerifyQrKey } from '@/hooks/useVerifyQrKey';

import defaultLogo from '@/assets/images/header-logo.png';

const QRScanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const scannerRef = useRef(null);
  const qrCodeInstanceRef = useRef(null); // ← 인스턴스 저장용
  const isScanningRef = useRef(false); // ← 상태 추적용
  const navigate = useNavigate();
  const { verify } = useVerifyQrKey();

  useEffect(() => {
    let lastErrorTime = 0;
    const html5QrCode = new Html5Qrcode('qr-reader');
    qrCodeInstanceRef.current = html5QrCode;
    isScanningRef.current = true;

    const config = {
      fps: 10,
      qrbox: (vw, vh) => {
        const size = Math.floor(Math.min(vw, vh) * 0.6);
        return { width: size, height: size };
      },
      rememberLastUsedCamera: true,
    };

    html5QrCode
      .start(
        { facingMode: 'environment' },
        config,
        async (key) => {
          setScanResult(key);
          if (isScanningRef.current) {
            await html5QrCode.stop();
            isScanningRef.current = false;
          }

          onQrScanned(key);
        },
        (errorMessage) => {
          const now = Date.now();
          if (now - lastErrorTime > 3000) {
            console.log('QR Code Scan Error: ', errorMessage);
            lastErrorTime = now;
          }
        }
      )
      .catch((err) => {
        console.error('Unable to start scanning', err);
      });

    return () => {
      if (isScanningRef.current && qrCodeInstanceRef.current) {
        qrCodeInstanceRef.current
          .stop()
          .then(() => {
            isScanningRef.current = false;
          })
          .catch((err) => {
            console.warn('QR 스캐너 종료 중 에러 (무시 가능):', err);
          });
      }
    };
  }, []);

  const handleBack = async () => {
    if (isScanningRef.current && qrCodeInstanceRef.current) {
      await qrCodeInstanceRef.current.stop().catch(() => {});
      isScanningRef.current = false;
    }
    navigate('/profile');
  };

  // QR코드 스캔 후
  const onQrScanned = async (qrKey) => {
    console.log('Scanned:', qrKey);
    await verify(qrKey);
  };

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
        <div
          id="qr-reader"
          ref={scannerRef}
          style={{
            height: 'calc(100vh - 63px)',
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
