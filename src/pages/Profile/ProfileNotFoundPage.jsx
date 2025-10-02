import { Link } from 'react-router-dom';
import Button from '@/components/common/Button/Button';
import defaultLogo from '@/assets/images/evergil_logo_pc.png';

const ProfileNotFoundPage = () => {
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg header-light bg-white center-logo header-reverse">
          <div className="container-fluid">
            <div className="menu-logo">
              <Link to="/" className="navbar-brand ps-0 md-ps-15px">
                <img src={defaultLogo} alt="" className="default-logo" />
                <img src={defaultLogo} alt="" className="alt-logo" />
                <img src={defaultLogo} alt="" className="mobile-logo" />
              </Link>
            </div>
            <div className="col-auto col-xl-12 col-lg-12 menu-order">
              <div
                className="collapse navbar-collapse justify-content-between"
                id="navbarNav"
              >
                <ul className="navbar-nav navbar-left justify-content-start"></ul>
                <ul className="navbar-nav navbar-right justify-content-end">
                  <li className="nav-item">
                    <Link to="/cart" className="nav-link feature-box"></Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <section
          className="cover-background full-screen ipad-top-space-margin md-h-550px"
        >
          <div className="container h-100">
            <div className="row align-items-center justify-content-center h-100">
              <div
                className="col-12 col-xl-6 col-lg-7 col-md-9 text-center"
                data-anime='{ "el": "childs", "translateY": [50, 0], "opacity": [0,1], "duration": 600, "delay": 0, "staggervalue": 300, "easing": "easeOutQuad" }'
              >
                <h4 className="text-dark-gray fw-600 sm-fs-22 mb-10px ls-minus-1px mb-10">
                  프로필을 찾을 수 없습니다.
                </h4>
                <p className="mb-30px lh-28 sm-mb-30px w-100 md-w-80 sm-w-95 mx-auto">
                  요청하신 프로필이 존재하지 않거나 삭제되었습니다.
                </p>
                <Button
                  radiusOn="radius-on"
                  className="btn btn-large btn-base-color btn-box-shadow btn-round-edge"
                  onClick={() => window.location.href = '/'}
                >
                  홈으로 돌아가기
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ProfileNotFoundPage; 