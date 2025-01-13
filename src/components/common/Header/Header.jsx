import { Link } from 'react-router-dom';

import defaultLogo from '@/assets/images/header-logo.png';

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg header-light bg-white center-logo header-reverse">
        <div className="container-fluid">
          <div className="col-auto">
            <a className="navbar-brand" href="demo-hotel-and-resort.html">
              <img src={defaultLogo} alt="" className="default-logo" />
              <img src={defaultLogo} alt="" className="alt-logo" />
              <img src={defaultLogo} alt="" className="mobile-logo" />
            </a>
          </div>
          <div className="col-auto col-xl-8 col-lg-10 menu-order">
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
                <li className="nav-item dropdown dropdown-with-icon">
                  <Link to="/about" className="nav-link">
                    회사소개
                  </Link>
                </li>
                <li className="nav-item dropdown dropdown-with-icon">
                  <Link to="/contact" className="nav-link">
                    문의하기
                  </Link>
                </li>
                <li className="nav-item dropdown dropdown-with-icon d-none">
                  <a
                    href="demo-hotel-and-resort-rooms.html"
                    className="nav-link"
                  >
                    My Everlinks
                  </a>
                </li>
              </ul>
              <ul className="navbar-nav navbar-right justify-content-start">
                <li className="nav-item">
                  <Link to="/signin" className="nav-link">
                    로그인
                  </Link>
                </li>
                <li className="nav-item d-none">
                  <a
                    href="demo-hotel-and-resort-bistro.html"
                    className="nav-link"
                  >
                    로그아웃
                  </a>
                </li>
                <li className="nav-item">
                  <Link to="/cart" className="nav-link">
                    장바구니
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-auto text-end">
            <div className="d-none d-xl-flex align-items-center widget-text fw-600"></div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
