import { Link } from 'react-router-dom';

import defaultLogo from '@/assets/images/header-logo.png';
import footerIconYoutube from '@/assets/images/footer-icon-youtube.png';
import footerIconInstagram from '@/assets/images/footer-icon-instagram.png';
import footerIconNaver from '@/assets/images/footer-icon-naver.png';
import footerIconShare from '@/assets/images/footer-icon-share.png';
import footerIconKakao from '@/assets/images/footer-icon-kakao.png';

const Footer = () => {
  return (
    <footer className="bg-very-light-gray pb-50px sm-pt-20px xs-pb-30px background-repeat background-position-center sm-background-image-none">
      <div className="container">
        <div className="row row-cols-3 row-cols-lg-5 row-cols-sm-3 align-items-center justify-content-center mb-8 md-mb-50px xs-mb-40px instagram-follow-api position-relative">
          <div className="col-xl-6 text-center lg-mt-10px sm-mt-0 sm-mb-10px order-1 order-xl-2 order-md-3 w-100">
            <ul className="footer-navbar d-flex justify-content-around">
              <li className="nav-item">
                <Link to="/about" className="nav-link">
                  회사소개
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/terms" className="nav-link">
                  이용약관
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/privacy-policy" className="nav-link">
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
        </div>
        <div className="row align-items-center">
          <div className="col-xl-4 col-sm-12 text-center text-sm-start last-paragraph-no-margin fs-15 order-3 order-md-1">
            <div className="col-auto text-sm-center pr-15px pb-15px">
              <a className="navbar-brand" href="/">
                <img src={defaultLogo} alt="" className="default-logo" />
              </a>
            </div>
          </div>
          <div className="col-xl-4 col-sm-12 text-center text-sm-center last-paragraph-no-margin fs-15 order-3 order-md-1 pb-15px">
            <p>
              주소: 경기 부천시 오정구 오정로211번길 35-24 (우)14441 지번:
              오정동 387-15 대표: 전경아 사업자 등록번호: 136-04-69494
              통신판매업신고: 12345-000 호스팅서비스:
            </p>
          </div>
          <div className="col-xl-4 col-sm-12 text-center text-sm-center last-paragraph-no-margin fs-15 order-3 order-md-1 pb-15px">
            <p>고객센터: 010-5922-1221 이메일: everlink@everlink.com</p>
          </div>
        </div>
        <div className="row align-items-center w-100">
          <div className="position-relative text-end text-sm-center elements-social social-text-style-01 order-2 order-xl-3 xs-mb-10px">
            <ul className="fs-16 dark fw-600 d-flex align-items-center justify-content-xl-end justify-content-center">
              <li>
                <a className="dribbble" href="#" target="_blank">
                  <img
                    src={footerIconInstagram}
                    alt=""
                    className="default-logo"
                  />
                </a>
              </li>
              <li>
                <a className="facebook" href="#" target="_blank">
                  <img
                    src={footerIconYoutube}
                    alt=""
                    className="default-logo"
                  />
                </a>
              </li>
              <li>
                <a className="naver" href="#" target="_blank">
                  <img src={footerIconNaver} alt="" className="default-logo" />
                </a>
              </li>
              <li>
                <a className="kakao" href="#" target="_blank">
                  <img src={footerIconKakao} alt="" className="default-logo" />
                </a>
              </li>
              <li>
                <a className="" href="share" target="_blank">
                  <img src={footerIconShare} alt="" className="default-logo" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
