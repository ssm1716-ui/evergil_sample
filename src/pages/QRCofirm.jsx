import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useVerifyQrKey } from '@/hooks/useVerifyQrKey';
import { getLastPathSegment } from '@/utils/utils';

import defaultLogo from '@/assets/images/evergil_logo_pc.png';

const QRCofirm = () => {
  const [desc, setDesc] = useState('스캔하신 QR코드 검증이 진행중에 있습니다.');
  const { verify } = useVerifyQrKey();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const url = window.location.href;
    const isPathKey = getLastPathSegment(url);
    if (!isPathKey) {
      navigate(
        `/error?desc=${'유효한 QR코드 아닙니다.'}&pageUrl=${'/profile'}`
      );
    }

    // QR코드 스캔 후 QR코드 검증 처리
    const onQrScanned = async (qrKey) => {
      await verify(qrKey);
    };
    onQrScanned(isPathKey);
  }, []);

  return (
    <>
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
            </div>
          </nav>
        </header>
        <main>
          <section className="cover-background full-screen ipad-top-space-margin md-h-550px">
            <div className="container h-100">
              <div className="row align-items-center justify-content-center h-100">
                <div
                  className="col-12 col-xl-6 col-lg-7 col-md-9 text-center"
                  data-anime='{ "el": "childs", "translateY": [50, 0], "opacity": [0,1], "duration": 600, "delay": 0, "staggervalue": 300, "easing": "easeOutQuad" }'
                >
                  <h4 className="text-dark-gray fw-600 sm-fs-22 mb-10px ls-minus-1px mb-10">
                    {desc}
                  </h4>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default QRCofirm;
