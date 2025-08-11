import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/state/slices/authSlices';
import { useNavigate } from 'react-router-dom';
import { signLogout } from '@/api/memberApi';

import defaultLogo_pc from '@/assets/images/evergil_logo_pc.png';
import defaultLogo_mobile from '@/assets/images/evergil_logo_mobile.png';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux 상태에서 로그인 여부와 사용자 정보 가져오기
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // 메뉴 닫기 버튼 Ref
  const navbarTogglerRef = useRef(null);

  const handleLogout = async () => {
    await signLogout();
    dispatch(logout());
    navigate('/signin'); // 로그아웃 후 로그인 페이지로 이동
    closeMenu();
  };

  //메뉴 닫기 함수
  const closeMenu = () => {
    const isMenuOpen = document.querySelector('.navbar-collapse.show');

    if (navbarTogglerRef.current && window.innerWidth < 992 && isMenuOpen) {
      // 메뉴가 열려 있는 경우에만 클릭으로 닫기
      navbarTogglerRef.current.click();
    }

    // 스크롤 맨 위로 (약간의 지연 필요)
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }, 300); // 메뉴 애니메이션이 있을 수 있으므로 약간 지연
  };

  return (
    <header>
      <nav className="navbar navbar-expand-sm navbar-expand-lg  header-light bg-white center-logo header-reverse">
        <div className="container-fluid">
          <div className="menu-logo">
            <Link
              to="/"
              className="navbar-brand ps-0 md-ps-15px"
              onClick={closeMenu}
            >
              <img src={defaultLogo_pc} alt="" className="default-logo" />

              <img src={defaultLogo_mobile} alt="" className="mobile-logo" />
            </Link>
          </div>
          <div className="col-auto col-xl-12 col-lg-12 menu-order">
            <button
              ref={navbarTogglerRef}
              className="navbar-toggler float-end"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-line"></span>
              <span className="navbar-toggler-line"></span>
              <span className="navbar-toggler-line"></span>
              <span className="navbar-toggler-line"></span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-between"
              id="navbarNav"
            >
              <ul className="navbar-nav navbar-left justify-content-start">
                <li className="nav-item">
                  <Link to="/" className="nav-link w-100" onClick={closeMenu}>
                    홈
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/about" className="nav-link w-100" onClick={closeMenu}>
                    회사소개
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/store" className="nav-link w-100" onClick={closeMenu}>
                    쇼핑
                  </Link>
                </li>

                {!isAuthenticated ? (
                  <li className="nav-item">
                    <Link
                      to="/contact"
                      className="nav-link w-100"
                      onClick={closeMenu}
                    >
                      문의하기
                    </Link>
                  </li>
                ) : (
                  <li className="nav-item">
                    <Link
                      to="/profile"
                      className="nav-link w-100"
                      onClick={closeMenu}
                    >
                      My Profiles
                    </Link>
                  </li>
                )}
              </ul>
              <ul className="navbar-nav navbar-right justify-content-end">
                {!isAuthenticated ? (
                  <li className="nav-item">
                    <button
                      className="nav-link feature-box border-0 bg-transparent"
                      onClick={() => {
                        const currentPath = window.location.pathname + window.location.search;
                        const redirectPath = currentPath === '/contact' ? '/mypage/my-contact' : currentPath;
                        localStorage.setItem('redirectAfterLogin', redirectPath);
                        closeMenu();
                        navigate('/signin');
                      }}
                    >
                      <div className="feature-box-icon mb-5px d-lg-flex header-box-icon">
                        <i className="feather icon-feather-log-in align-middle icon-extra-medium"></i>
                      </div>
                      <div className="feature-box-content header-box-content">
                        <span className="d-inline-block">로그인</span>
                      </div>
                    </button>
                  </li>
                ) : (
                  <li className="nav-item">
                    <Link
                      className="nav-link feature-box"
                      onClick={handleLogout}
                    >
                      <div className="feature-box-icon mb-5px d-lg-flex header-box-icon">
                        <i className="feather icon-feather-log-out align-middle icon-extra-medium"></i>
                      </div>
                      <div className="feature-box-content header-box-content">
                        <span className="d-inline-block">로그아웃</span>
                      </div>
                    </Link>
                  </li>
                )}
                {isAuthenticated && (
                  <li className="nav-item">
                    <Link
                      to="/mypage/order-list"
                      className="nav-link feature-box"
                      onClick={closeMenu}
                    >
                      <div className="feature-box-icon mb-5px d-lg-flex header-box-icon">
                        <i className="feather icon-feather-user align-middle icon-extra-medium"></i>
                      </div>
                      <div className="feature-box-content header-box-content">
                        <span className="d-inline-block">마이페이지</span>
                      </div>
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <Link
                    to="/cart"
                    className="nav-link feature-box"
                    onClick={closeMenu}
                  >
                    <div className="feature-box-icon mb-5px d-lg-flex header-box-icon">
                      <i className="feather icon-feather-shopping-cart align-middle icon-extra-medium"></i>
                    </div>
                    <div className="feature-box-content header-box-content">
                      <span className="d-inline-block">장바구니</span>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
