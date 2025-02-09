import { Link } from 'react-router-dom';

import defaultLogo from '@/assets/images/header-logo.png';
import footerIconYoutube from '@/assets/images/footer-icon-youtube.png';
import footerIconInstagram from '@/assets/images/footer-icon-instagram.png';
import footerIconNaver from '@/assets/images/footer-icon-naver.png';
import footerIconShare from '@/assets/images/footer-icon-share.png';
import footerIconKakao from '@/assets/images/footer-icon-kakao.png';

const Footer = () => {
  return (
    <>
      <footer
        className="bg-very-light-gray pb-50px sm-pt-20px xs-pb-30px background-repeat background-position-center sm-background-image-none"
        // style="background-image: url('images/vertical-center-line-bg-dark.svg')"
      >
        <div className="container">
          <div className="row justify-content-center mb-4">
            <div className="col-xl-6 col-lg-8 col-md-10 text-center">
              <h3 className="text-dark-gray ls-minus-2px fw-400 mb-40px xs-mb-30px w-80 xs-w-100 mx-auto">
                Remember it forever with Everlink.
              </h3>
            </div>
          </div>

          <div className="row row-cols-3 row-cols-lg-5 row-cols-sm-3 align-items-center justify-content-center mb-4 md-mb-50px xs-mb-40px instagram-follow-api position-relative">
            <div className="absolute-middle-center z-index-1 w-auto">
              <a
                href="https://www.instagram.com"
                target="_blank"
                className="btn btn-large btn-switch-text btn-white btn-rounded left-icon btn-box-shadow instagram-button"
              >
                <span>
                  <span>
                    <i className="fa-brands fa-instagram text-base-color"></i>
                  </span>
                  <span className="btn-double-text" data-text="EverLink">
                    EverLink
                  </span>
                </span>
              </a>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-xl-3 col-sm-6 text-center text-sm-start last-paragraph-no-margin fs-15 order-3 order-md-1">
              <p>
                © Copyright 2025
                <Link
                  to="/"
                  className="text-decoration-line-bottom text-dark-gray fw-500"
                >
                  EverLink
                </Link>
              </p>
            </div>
            <div className="col-xl-6 text-center lg-mt-10px sm-mt-0 sm-mb-10px order-1 order-xl-2 order-md-3">
              <ul className="footer-navbar fs-17 fw-600">
                <li className="nav-item active">
                  <Link to="/about" className="nav-link">
                    회사소개
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="terms" className="nav-link">
                    이용약관
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="privacy-policy" className="nav-link">
                    개인정보처리방침
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/contact" className="nav-link">
                    고객센터
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-xl-3 col-sm-6 position-relative text-center text-sm-end elements-social social-text-style-01 order-2 order-xl-3 xs-mb-10px ">
              <ul className="fs-16 dark fw-600 d-flex justify-content-end align-items-center">
                <li>
                  <Link
                    className="facebook"
                    href="https://www.facebook.com/"
                    target="_blank"
                  >
                    <img src={footerIconYoutube} alt="" />
                  </Link>
                </li>
                <li>
                  <Link
                    className="dribbble"
                    href="http://www.dribbble.com"
                    target="_blank"
                  >
                    <img src={footerIconInstagram} alt="" />
                  </Link>
                </li>
                <li>
                  <Link
                    className="twitter"
                    href="http://www.twitter.com"
                    target="_blank"
                  >
                    <img src={footerIconNaver} alt="" />
                  </Link>
                </li>
                <li>
                  <Link
                    className="behance"
                    href="http://www.behance.com/"
                    target="_blank"
                  >
                    <img src={footerIconKakao} alt="" />
                  </Link>
                </li>
                <li>
                  <Link
                    className="behance"
                    href="http://www.behance.com/"
                    target="_blank"
                  >
                    <img src={footerIconShare} alt="" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
