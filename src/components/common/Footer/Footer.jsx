import { Link } from 'react-router-dom';

import WebShareButton from '@/components/Share/WebShareButton';
import defaultLogo_pc from '@/assets/images/evergil_logo_pc.png';
import defaultLogo_mobile from '@/assets/images/evergil_logo_mobile.png';

import footerIconYoutube from '@/assets/images/footer-icon-youtube.png';
import footerIconInstagram from '@/assets/images/footer-icon-instagram.png';
import footerIconShare from '@/assets/images/footer-icon-share.png';
import footerIconKakao from '@/assets/images/footer-icon-kakao.png';

const Footer = () => {
  return (
    <>
      <footer
        className="bg-very-light-gray pt-50px pb-50px sm-pt-20px xs-pb-30px background-repeat background-position-center sm-background-image-none"
      >
        <div className="container">
          <div className="row align-items-start justify-content-evenly mb-4 md-mb-25px xs-mb-10px instagram-follow-api position-relativ">
            <div className="col-xl-4 col-sm-4 text-start text-md-center last-paragraph-no-margin fs-15 order-3 order-md-1 mb-10px">
              <img src={defaultLogo_pc} alt="" className="default-logo" />

              <img src={defaultLogo_mobile} alt="" className="mobile-logo" />
            </div>
            <div className="col-xl-5 col-sm-5 text-start text-md-start last-paragraph-no-margin fs-15 order-3 order-md-1">
              <p className="fs-14 md-fs-13 sm-fs-12">
                주소: (우)14441 경기도 부천시 오정구 오정로211번길 35-24,201호<br />(오정동, ㈜예스테크)
                <br /> 에버길(Evergil) / 대표자명:전경아 <br />
                사업자 등록번호: 136-04-69494 <br />
                통신판매업신고: 2024-경기광명-1086 <br />
              </p>
            </div>
            <div className="col-xl-3 col-sm-3 text-start text-md-start last-paragraph-no-margin fs-15 order-3 order-md-1">
              <p className="fs-14 md-fs-13 sm-fs-12">
                고객센터: 010-9291-8601
                <br />
                이메일: support@evergil.kr
              </p>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-xl-3 col-sm-3 text-center text-md-center last-paragraph-no-margin fs-15 order-3 order-md-1">
              <p className="fs-14 md-fs-13 sm-fs-12">
                © Copyright 2025
                <Link to="/" className="fw-500 ps-2">
                  Evergil.
                </Link>
              </p>
            </div>
            <div className="col-xl-6 col-sm-6 text-center sm-mt-0 sm-mb-10px order-1 order-xl-2 order-md-1">
              <ul className="footer-navbar fs-14 md-fs-13 sm-fs-12">
                <li className="nav-item">
                  <Link to="/about">회사소개</Link>
                </li>
                <li className="nav-item">
                  <Link to="terms">이용약관</Link>
                </li>
                <li className="nav-item">
                  <Link to="privacy-policy">개인정보처리방침</Link>
                </li>
                <li className="nav-item">
                  <Link to="/contact">고객센터</Link>
                </li>
              </ul>
            </div>
            <div className="col-xl-3 col-sm-3 position-relative text-center text-sm-end elements-social social-text-style-01 order-2 order-xl-3 xs-mb-10px ">
              <ul className="fs-16 dark fw-600 d-flex justify-content-center align-items-center">
                <li>
                  <a
                    className="facebook"
                    href="https://m.youtube.com/@everlinkqr"
                    target="_blank"
                  >
                    <img src={footerIconYoutube} alt="" />
                  </a>
                </li>
                <li>
                  <a
                    className="dribbble"
                    href="https://www.instagram.com/everlink.qr"
                    target="_blank"
                  >
                    <img src={footerIconInstagram} alt="" />
                  </a>
                </li>
                <li>
                  <a
                    className="behance"
                    href="http://pf.kakao.com/_jXMxfn"
                    target="_blank"
                  >
                    <img src={footerIconKakao} alt="" />
                  </a>
                </li>
                <li>
                  <WebShareButton
                    triggerElement={
                      <a className="behance">
                        <img src={footerIconShare} alt="" />
                      </a>
                    }
                    positionConfig={{ bottom: '0px', left: '70%' }}
                  />
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
