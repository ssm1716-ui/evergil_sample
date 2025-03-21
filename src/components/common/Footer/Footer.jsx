import { Link } from 'react-router-dom';

import defaultLogo_pc from '@/assets/images/logo_pc.png';
import defaultLogo_mobile from '@/assets/images/logo_mobile.png';
import footerIconYoutube from '@/assets/images/footer-icon-youtube.png';
import footerIconInstagram from '@/assets/images/footer-icon-instagram.png';
import footerIconNaver from '@/assets/images/footer-icon-naver.png';
import footerIconShare from '@/assets/images/footer-icon-share.png';
import footerIconKakao from '@/assets/images/footer-icon-kakao.png';

const Footer = () => {
  return (
    <>
      <footer
        className="bg-very-light-gray pt-50px pb-50px sm-pt-20px xs-pb-30px background-repeat background-position-center sm-background-image-none"
        // style="background-image: url('images/vertical-center-line-bg-dark.svg')"
      >
        <div className="container">
          {/* <div className="row justify-content-center mb-4">
            <div className="col-xl-6 col-lg-8 col-md-10 text-center">
              <img
                src={defaultLogo}
                data-at2x="images/demo-hotel-and-resort-logo@2x.png"
                alt=""
                className="default-logo"
              />
            </div>
          </div> */}

          <div className="row align-items-start justify-content-evenly mb-4 md-mb-25px xs-mb-10px instagram-follow-api position-relative">
            <div className="col-xl-4 col-sm-12 text-start text-md-center last-paragraph-no-margin fs-15 order-3 order-md-1 mb-10px">
              <img
                src={defaultLogo_pc}
                data-at2x="images/demo-hotel-and-resort-logo@2x.png"
                alt=""
                className="default-logo"
              />

              <img
                src={defaultLogo_mobile}
                data-at2x="images/demo-hotel-and-resort-logo@2x.png"
                alt=""
                className="mobile-logo"
              />
            </div>

            <div className="col-xl-4 col-sm-12 text-start text-md-start last-paragraph-no-margin fs-15 order-3 order-md-1">
              <p className="fs-14">
                주소:(우)14313 경기도 광명시 하안로 198, <br />
                210동 1401호(소하동, 동양2차아파트)
                <br />
                에버링크(everlink) / 대표자명:전경아 <br />
                사업자 등록번호: 136-04-69494 <br />
                통신판매업신고: 2024-경기광명-1086 <br />
                {/* <p className="xl-w-hidden sm-w-block fs-16">
                  고객센터: 010-5922-1221
                  <br />
                  이메일: everlink@everlink.com
                </p> */}
              </p>
            </div>
            <div className="col-xl-4 col-sm-12 text-start text-md-start last-paragraph-no-margin fs-15 order-3 order-md-1">
              <p className="fs-14">
                고객센터: 010-5922-1221
                <br />
                이메일: everlink@everlink.com
              </p>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-xl-3 col-sm-6 text-center text-md-center last-paragraph-no-margin fs-15 order-3 order-md-1">
              <p>
                © Copyright 2025
                <Link to="/" className="fw-500 ps-2">
                  EverLink
                </Link>
              </p>
            </div>
            <div className="col-xl-6 text-center lg-mt-10px sm-mt-0 sm-mb-10px order-1 order-xl-2 order-md-3">
              <ul className="footer-navbar fs-14">
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
            <div className="col-xl-3 col-sm-6 position-relative text-center text-sm-end elements-social social-text-style-01 order-2 order-xl-3 xs-mb-10px ">
              <ul className="fs-16 dark fw-600 d-flex justify-content-center align-items-center">
                <li>
                  <Link className="facebook">
                    <img src={footerIconYoutube} alt="" />
                  </Link>
                </li>
                <li>
                  <Link className="dribbble">
                    <img src={footerIconInstagram} alt="" />
                  </Link>
                </li>
                <li>
                  <Link className="twitter">
                    <img src={footerIconNaver} alt="" />
                  </Link>
                </li>
                <li>
                  <Link className="behance">
                    <img src={footerIconKakao} alt="" />
                  </Link>
                </li>
                <li>
                  <Link className="behance">
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
