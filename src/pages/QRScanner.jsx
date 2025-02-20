import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const QRScanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const scannerRef = useRef(null);

  useEffect(() => {
    if (scannerRef.current) {
      const html5QrCode = new Html5Qrcode('qr-reader');

      // 카메라 설정: 후면 카메라 활성화
      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      };

      // 후면 카메라로 설정
      html5QrCode
        .start(
          { facingMode: 'environment' }, // 후면 카메라 설정
          config,
          (decodedText) => {
            setScanResult(decodedText);
            html5QrCode.stop();
            // 스캔한 URL로 자동 이동
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
    }
  }, []);

  return (
    <div>
      <h2>QR 코드 스캔</h2>
      <div
        id="qr-reader"
        ref={scannerRef}
        style={{ width: '100%', height: 'auto' }}
      />
      {scanResult && (
        <div>
          <h3>스캔 결과:</h3>
          <p>{scanResult}</p>
        </div>
      )}
    </div>
  );
};

export default QRScanner;
