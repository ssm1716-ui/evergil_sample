import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/state/slices/authSlices';
import { useNavigate } from 'react-router-dom';
import { signLogout } from '@/api/memberApi';

import defaultLogo from '@/assets/images/header-logo.png';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux 상태에서 로그인 여부와 사용자 정보 가져오기
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = async () => {
    await signLogout();
    dispatch(logout());
    navigate('/signin'); // 로그아웃 후 로그인 페이지로 이동
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg header-light bg-white center-logo header-reverse">
        <div className="container-fluid">
          <div className="menu-logo">
            <Link to="/" className="navbar-brand">
              <img
                src={defaultLogo}
                data-at2x="images/demo-hotel-and-resort-logo@2x.png"
                alt=""
                className="default-logo"
              />
              <img
                src={defaultLogo}
                data-at2x="images/demo-hotel-and-resort-logo@2x.png"
                alt=""
                className="alt-logo"
              />
              <img
                src={defaultLogo}
                data-at2x="images/demo-hotel-and-resort-logo@2x.png"
                alt=""
                className="mobile-logo"
              />
            </Link>
          </div>
          <div className="col-auto col-xl-12 col-lg-12 menu-order">
            <button
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
              <ul className="navbar-nav navbar-left justify-content-end">
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    메인페이지
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/shop" className="nav-link">
                    구매하기
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/about" className="nav-link">
                    회사소개
                  </Link>
                </li>
                {!isAuthenticated ? (
                  <li className="nav-item">
                    <Link to="/contact" className="nav-link">
                      문의하기
                    </Link>
                  </li>
                ) : (
                  <li className="nav-item">
                    <Link to="/profile" className="nav-link">
                      My Everlinks
                    </Link>
                  </li>
                )}
              </ul>
              <ul className="navbar-nav navbar-right justify-content-start">
                {!isAuthenticated ? (
                  <li className="nav-item">
                    <Link to="/signin" className="nav-link">
                      로그인
                    </Link>
                  </li>
                ) : (
                  <li className="nav-item">
                    <Link className="nav-link" onClick={handleLogout}>
                      로그아웃
                    </Link>
                  </li>
                )}
                {isAuthenticated && (
                  <li className="nav-item">
                    <Link to="/mypage/order-list" className="nav-link">
                      마이페이지
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <Link to="/cart" className="nav-link">
                    장바구니
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
