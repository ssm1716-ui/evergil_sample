import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import ReactPlayer from 'react-player/youtube';

import FaqComponents from '@/components/Faq/FaqComponents';
import mainBannerImage from '@/assets/images/main-banner.jpg';
import mainSubImage1 from '@/assets/images/main-sub-image1.jpg';

import mainLogoPc from '@/assets/images/main_logo_pc.png';
import mainLogoMobile from '@/assets/images/main_logo_mobile.png';
import main_guide from '@/assets/images/main_guide.png';
import guide1 from '@/assets/images/guide_1.jpg';
import guide2 from '@/assets/images/guide_2.jpg';
import guide3 from '@/assets/images/guide_3.jpg';

// Modal.setAppElement('#root');

const HomeSubPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달 열기
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <section
        className="p-0 top-space-margin full-screen md-h-600px sm-h-300px position-relative"
        data-parallax-background-ratio="0.3"
        style={{
          backgroundImage: `url(${mainBannerImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        <div className="opacity-light bg-black"></div>
        <div className="container h-100 position-relative">
          <div className="row align-items-center h-100 justify-content-center">
            <div
              className="col-md-10 position-relative text-white d-flex flex-column justify-content-center text-center h-100"
              data-anime='{ "el": "childs", "translateY": [-15, 0], "perspective": [1200,1200], "scale": [1.1, 1], "rotateX": [50, 0], "opacity": [0,1], "duration": 600, "delay": 100, "staggervalue": 300, "easing": "easeOutQuad" }'
            >
              {/* <h5 className="fw-400 mb-20px text-shadow-double-large">
                  Luxury space that you can afford
                </h5> */}
              <div className="fs-200 lg-fs-200 md-fs-170 sm-fs-150 xs-fs-110 fw-700 mb-20px ls-minus-8px md-ls-minus-4px xs-ls-minus-2px text-shadow-double-large">
                <img src={mainLogoPc} alt="mainlogo" />
              </div>
              <div className="mb-30px">
                <Link
                  to="/store"
                  className="btn btn-extra-large btn-switch-text bg-base-color text-white fw-700 btn-round-edge btn-box-shadow border-radius-30px"
                >
                  <span>
                    <span className="btn-double-text" data-text="시작">
                      구경하러 가기
                    </span>
                    <span>
                      <i className="fa-solid fa-arrow-right fs-14"></i>
                    </span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="background-position-center background-repeat pb-0"
        // style="background-image: url('images/vertical-center-line-bg.svg')"
      >
        <div className="container">
          <div className="row align-items-center mb-12 md-mb-17 xs-mb-25">
            <div
              className="col-lg-5 col-sm-12 md-mb-50px p-0 xs-p-2 text-lg-start text-md-center text-sm-center"
              data-anime='{ "el": "childs", "opacity": [0, 1], "rotateY": [-90, 0], "rotateZ": [-10, 0], "translateY": [80, 0], "translateZ": [50, 0], "staggervalue": 200, "duration": 800, "delay": 200, "easing": "easeOutCirc" }'
            >
              <span className="mb-10px text-base-color fw-500 md-mb-0 d-block">
                소중한 사람들이 항상 기억될 수 있도록
              </span>
              <h6 className="text-dark-gray lh-60 md-mb-0">
                에버링크 추모페이지
              </h6>

              <p className="w-100 xl-w-100 mb-35px xs-mb-10px fs-16 sm-fs-14 text-keep-all">
                Everlink 는 가족과 추억을 공유하고, 편지를 남기며,
                <br />고인을 기억할 수 있도록 만들어주는 추모페이지 입니다.
                <br />
                <br />에버링크의 사명은 사랑하는 사람들이 영원히 기억되는 것입니다.
                <br />대부분 2-3세대가 지나면 사람들은
                <br />우리의 이름조차 기억하지 못할 것입니다.
                <br />확실한 건 시간이 지나면 기억은 희미해집니다.
                <br />
                <br />우리는 사랑하는 사람을 기억하고,
                <br />고인과의 추억을 보존하고,
                <br />고인을 기억할 수 있는 플랫폼을 제공할 것입니다.
                <br />
                <br />에버링크는 신뢰할 수 있는 품질과
                <br />사랑하는 사람의 발자취를 평생 기억할 수 있는 가치
                <br />그리고 고객과 함께 나아간다는 원칙을 통해
                <br />오늘도 진심으로 정성을 다해 움직입니다.
              </p>
              <div className="d-inline-block w-100 text-center">
                <Link
                  to="/store"
                  className="btn btn-extra-large btn-switch-text btn-white btn-box-shadow btn-round-edge d-inline-block align-middle me-30px xs-me-10px xs-mt-20px border-radius-30px"
                >
                  <span>
                    <span
                      className=" btn-double-text"
                      data-text="구매하러 가기"
                    >
                      구매하러 가기
                    </span>
                  </span>
                </Link>
                {/* <div className="fs-20 fw-600 d-inline-block align-middle text-dark-gray xs-mt-20px">
                  <a href="tel:010-5922-1221">
                    <i className="bi bi-telephone-outbound text-medium-gray icon-small me-10px"></i>
                    010-5922-1221
                  </a>
                </div> */}
              </div>
            </div>
            <div className="col-lg-7 col-sm-12 position-relative md-px-0">
              <div className="w-100 position-relative md-w-100 border-radius-4px float-end ">
                <img className="w-100" src={mainSubImage1} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-very-light-gray half-section ps-6 pe-6 d-none d-lg-block">
        <div className="container-fluid">
          <div
            className="row row-cols-1 row-cols-lg-4 row-cols-md-2 justify-content-center"
            data-anime='{ "el": "childs", "translateX": [-15, 0], "opacity": [0,1], "duration": 1000, "delay": 1000, "staggervalue": 300, "easing": "easeOutQuad" }'
          >
            <div className="col icon-with-text-style-10 border-end border-1 sm-border-end-0 border-color-transparent-base-color md-mb-50px">
              <div className="feature-box ps-5 pe-5 xl-ps-5 xl-pe-5">
                <div className="feature-box-icon feature-box-icon-rounded w-120px h-120px rounded-circle mb-20px">
                  <i className="line-icon-Big-Data icon-extra-large text-base-color"></i>
                </div>
                <div className="feature-box-content last-paragraph-no-margin">
                  <span className="text-dark-gray fs-22 ls-0px">
                    무제한 저장 공간
                  </span>
                  <p className="fs-16">
                    사랑하는 사람들의 소중한 기억을 모두 보관하세요.
                  </p>
                </div>
              </div>
            </div>

            <div className="col icon-with-text-style-10 border-end border-1 sm-border-end-0 border-color-transparent-base-color sm-mb-50px">
              <div className="feature-box ps-5 pe-5 xl-ps-5 xl-pe-5">
                <div className="feature-box-icon feature-box-icon-rounded w-120px h-120px rounded-circle mb-20px">
                  <i className="bi-shield-check icon-extra-large text-base-color"></i>
                </div>
                <div className="feature-box-content last-paragraph-no-margin">
                  <span className="text-dark-gray fs-22 ls-0px">
                    데이터 보호
                  </span>
                  <p className="fs-16">
                    에버링크를 볼 수 있는 사용자를 결정할 수 있습니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="col icon-with-text-style-10 border-end border-1 sm-border-end-0 border-color-transparent-base-color sm-mb-50px">
              <div className="feature-box ps-5 pe-5 xl-ps-5 xl-pe-5">
                <div className="feature-box-icon feature-box-icon-rounded w-120px h-120px rounded-circle mb-20px">
                  <i className="ti-lock icon-extra-large text-base-color"></i>
                </div>
                <div className="feature-box-content last-paragraph-no-margin">
                  <span className="text-dark-gray fs-22 ls-0px">
                    분실 시 보안
                  </span>
                  <p className="fs-16">
                    에버링크를 도난당해도 즉시 교체할 수 있습니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="col icon-with-text-style-10">
              <div className="feature-box ps-5 pe-5 xl-ps-5 xl-pe-5">
                <div className="feature-box-icon feature-box-icon-rounded w-120px h-120px rounded-circle mb-20px">
                  <i className="line-icon-Life-Safer icon-extra-large text-base-color"></i>
                </div>
                <div className="feature-box-content last-paragraph-no-margin">
                  <span className="text-dark-gray fs-22 ls-0px">
                    일회성 결제
                  </span>
                  <p className="fs-16">
                    숨겨진 비용이나 구독이 없는 평생 서비스
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-very-light-gray px-3 d-sm-block d-lg-none">
        <div className="container-fluid p-0">
          <div
            className="features-wrapper d-flex flex-wrap flex-md-nowrap"
            style={{ scrollSnapType: 'x mandatory' }} // 옵션: 스크롤 스냅
          >
            {/* ✅ 반복 영역 */}
            <div className="flex-shrink-0 icon-with-text-style-10 min-w-50 sm-min-w-auto md-w-25 mb-10px">
              <div className="feature-box text-center">
                <div className="feature-box-icon feature-box-icon-rounded w-60px h-60px rounded-circle">
                  <i className="line-icon-Big-Data icon-medium text-base-color"></i>
                </div>
                <div className="feature-box-content last-paragraph-no-margin text-center">
                  <span className="text-dark-gray fs-14 ls-0px">저장 공간</span>
                  <p className="fs-12 sm-lh-20 px-2">
                    사랑하는 사람들의 소중한 기억을 모두 보관하세요.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 icon-with-text-style-10 min-w-50 sm-min-w-auto md-w-25 mb-10px">
              <div className="feature-box text-center">
                <div className="feature-box-icon feature-box-icon-rounded w-60px h-60px rounded-circle">
                  <i className="bi-shield-check icon-medium text-base-color"></i>
                </div>
                <div className="feature-box-content last-paragraph-no-margin text-center">
                  <span className="text-dark-gray fs-14 ls-0px">
                    데이터 보호
                  </span>
                  <p className="fs-12 sm-lh-20 px-2">
                    에버링크를 볼 수 있는 사용자를 결정할 수 있습니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 icon-with-text-style-10 min-w-50 sm-min-w-auto md-w-25 mb-10px">
              <div className="feature-box text-center">
                <div className="feature-box-icon feature-box-icon-rounded w-60px h-60px rounded-circle">
                  <i className="ti-lock icon-medium text-base-color"></i>
                </div>
                <div className="feature-box-content last-paragraph-no-margin text-center">
                  <span className="text-dark-gray fs-14 ls-0px">
                    분실 시 보안
                  </span>
                  <p className="fs-12 sm-lh-20 px-2">
                    에버링크를 도난당해도 즉시 교체할 수 있습니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 icon-with-text-style-10 min-w-50 sm-min-w-auto md-w-25 mb-10px">
              <div className="feature-box text-center">
                <div className="feature-box-icon feature-box-icon-rounded w-60px h-60px rounded-circle">
                  <i className="line-icon-Life-Safer icon-medium text-base-color"></i>
                </div>
                <div className="feature-box-content last-paragraph-no-margin text-center">
                  <span className="text-dark-gray fs-14 ls-0px">
                    일회성 결제
                  </span>
                  <p className="fs-12 sm-lh-20 px-2">
                    숨겨진 비용이나 구독이 없는 평생 서비스
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="big-section bg-white pt-3 pb-1">
        <div className="container">
          <div
            className="row row-cols-1 row-cols-lg-12 row-cols-md-2 justify-content-center interactive-banner-container"
            data-anime='{"el": "childs", "translateY": [0, 0], "perspective": [1000,1200], "scale": [1.1, 1], "rotateX": [50, 0], "opacity": [0,1], "duration": 800, "delay": 200, "staggervalue": 300, "easing": "easeOutQuad" }'
          >
            <div className="col interactive-banner-style-03 transition-inner-all w-100 sm-min-w-auto md-w-100">
              <div className="position-relative overflow-hidden border-radius-6px last-paragraph-no-margin">
                <figure className="m-0">
                  <div className="position-absolute top-0px left-0px w-100 h-100 z-index-1"></div>
                  <img
                    src={main_guide}
                    alt=""
                    style={{
                      width: '100%',
                      height: 'auto',
                      objectFit: 'contain',
                      display: 'block',
                    }}
                  />
                  <figcaption className="d-flex flex-column w-100 h-100 p-60px lg-p-35px z-index-1"></figcaption>
                </figure>
              </div>
            </div>
          </div>
          <div className="row justify-content-center align-items-center pt-2">
            <div
              className="col-12 text-center last-paragraph-no-margin"
              data-anime='{ "el": "childs", "translateY": [0, 0], "opacity": [0,1], "duration": 1200, "delay": 0, "staggervalue": 150, "easing": "easeOutQuad" }'
            >
              <div className="d-inline-block align-middle bg-base-color fw-600 text-white text-uppercase border-radius-4px ps-20px pe-20px fs-12 me-10px md-m-5px">
                Awesome
              </div>
              <div className="d-inline-block align-middle text-black fs-20 md-fs-16  sm-fs-12 fw-500">
                <span className="text-decoration-line-bottom fw-600">
                  open get 10% discount
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="background-position-center background-repeat overlap-height position-relative bg-very-light-gray py-5 pb-0">
        <div className="container">
          <div
            className="row justify-content-center xs-mb-7"
            data-anime='{ "el": "childs", "translateY": [30, 0], "opacity": [0,1], "duration": 1000, "delay": 1000, "staggervalue": 300, "easing": "easeOutQuad" }'
          >
            <section
              className="cover-background pt-3"
              // style="background-image: url(https://via.placeholder.com/1920x1080)"
            >
              <div className="opacity-extra-medium"></div>
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-12 col-xl-10 text-center z-index-1">
                    <h6 className="mb-5px text-dark-gray ls-minus-2px mb-2">
                      에버링크 영상
                    </h6>
                    <div className="col text-center fit-videos md-mb-50px sm-mb-30px">
                      <iframe
                        className="w-100 h-500px sm-h-200px"
                        width="100%"
                        height="550"
                        src="https://www.youtube.com/embed/UkTrceJi_sM?autoplay=0;&mute=1;rel=0&amp;showinfo=0"
                        allowfullscreen
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <div className="col-md-8 text-center pb-5">
              <h6 className="mb-5px text-dark-gray ls-minus-2px mb-2">
                가상 추모 페이지 <br />
                구매하기 전 미리 보기
              </h6>
              <Link
                className="btn btn-extra-large btn-base-color text-transform-none btn-rounded btn-hover-animation-switch popup-youtube"
                onClick={() => alert('준비중')}
              >
                <span>
                  <span className="btn-text">추모 페이지 미리보기</span>
                  <span className="btn-icon">
                    <i className="feather icon-feather-arrow-right"></i>
                  </span>
                  <span className="btn-icon">
                    <i className="feather icon-feather-arrow-right"></i>
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        className="background-position-center background-repeat p-3"
        // style=background-image: url('images/vertical-center-line-bg.svg')"
      >
        <div className="container">
          <div className="row justify-content-center xs-mb-7">
            <div
              className="col-md-12 text-start"
              data-anime='{ "el": "childs", "translateY": [30, 0], "opacity": [0,1], "duration": 100, "delay": 700, "staggervalue": 300, "easing": "easeOutQuad" }'
            >
              <FaqComponents />
            </div>
          </div>
        </div>
      </section>

      <div className="scroll-progress d-none d-xxl-block">
        <a href="#" className="scroll-top" aria-label="scroll">
          <span className="scroll-text">Scroll</span>
          <span className="scroll-line">
            <span className="scroll-point"></span>
          </span>
        </a>
      </div>
    </>
  );
};

export default HomeSubPage;
