import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import ReactPlayer from 'react-player/youtube';

import FaqComponents from '@/components/Faq/FaqComponents';
import mainBannerImage from '@/assets/images/main-banner.png';
import mainSubImage1 from '@/assets/images/main-sub-image1.png';
import mainSubImage2 from '@/assets/images/main-sub-image2.png';
import mainSubImage3 from '@/assets/images/demo-travel-agency-about-02.jpg';
import mainSubImage4 from '@/assets/images/demo-travel-agency-about-03.jpg';
import mainSubImage5 from '@/assets/images/demo-travel-agency-about-04.jpg';
import mainSubBgImage from '@/assets/images/demo-branding-agency-pattern.svg';

import mainLogoPc from '@/assets/images/main_logo_pc.png';
import mainLogoMobile from '@/assets/images/main_logo_mobile.png';
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
        className="p-0 top-space-margin full-screen md-h-600px sm-h-500px border-top border-4 border-color-base-color position-relative"
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
              className="col-lg-5 md-mb-50px p-0 xs-p-4"
              data-anime='{ "el": "childs", "opacity": [0, 1], "rotateY": [-90, 0], "rotateZ": [-10, 0], "translateY": [80, 0], "translateZ": [50, 0], "staggervalue": 200, "duration": 800, "delay": 200, "easing": "easeOutCirc" }'
            >
              <span className="mb-10px text-base-color fw-500 md-mb-0 d-block">
                소중한 사람들이 항상 기억될 수 있도록
              </span>
              <h6 className="text-dark-gray lh-60 md-mb-0">
                에버링크 추모페이지
              </h6>

              <p className="w-100 xl-w-100 mb-35px xs-mb-10px fs-14 md-fs-11">
                추모 페이지에 사랑하는 사람의 사진과 영상을 업로드 할 수
                있습니다.
                <br />
                또한 가족들이 방문할 때 마다 추모페이지에서 하늘편지를 남기실 수
                있습니다.
                <br />
                평생동안 사랑하는 사람의 기억을 보관할 수 있는 추모페이지를
                사용해보세요.
              </p>
              <p className="w-100 xl-w-100 mb-35px xs-mb-10px fs-14 md-fs-11">
                우리의 사명은 사랑하는 사람들이 영원히 기억되는 것 입니다.
                <br />
                대부분 2-3세대가 지나면 사람들은 우리가 존재했다는 사실조차
                <br />
                기억하지 못할 것입니다. <br />
                확실한 건 시간이 지나면 기억은 희미해집니다.
                <br /> 우리는 사랑하는 사람을 기억하고,그들과의 추억을 보존하고,
                <br />
                그들을 평생 기억할 수 있는 플랫폼을 제공할 것입니다.
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
            <div className="col-lg-7 position-relative ">
              <div className="w-75 position-relative md-w-100 border-radius-4px float-end ">
                <img className="w-100" src={mainSubImage1} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-very-light-gray half-section ps-6 pe-6">
        <div className="container-fluid">
          <div
            className="row row-cols-1 row-cols-lg-4 row-cols-md-2 justify-content-center"
            data-anime='{ "el": "childs", "translateX": [-15, 0], "opacity": [0,1], "duration": 1000, "delay": 1000, "staggervalue": 300, "easing": "easeOutQuad" }'
          >
            <div className="col icon-with-text-style-10 border-end border-1 sm-border-end-0 border-color-transparent-base-color md-mb-50px">
              <div className="feature-box ps-8 pe-8 xl-ps-5 xl-pe-5">
                <div className="feature-box-icon feature-box-icon-rounded w-120px h-120px rounded-circle mb-20px">
                  <i className="line-icon-Big-Data icon-extra-large text-base-color"></i>
                </div>
                <div className="feature-box-content last-paragraph-no-margin">
                  <span className="text-dark-gray fs-22 ls-0px">
                    무제한 저장 공간
                  </span>
                  <p className="fs-12">
                    사랑하는 사람들의 소중한 기억을 모두 보관하세요.
                  </p>
                </div>
              </div>
            </div>

            <div className="col icon-with-text-style-10 border-end border-1 sm-border-end-0 border-color-transparent-base-color sm-mb-50px">
              <div className="feature-box ps-8 pe-8 xl-ps-5 xl-pe-5">
                <div className="feature-box-icon feature-box-icon-rounded w-120px h-120px rounded-circle mb-20px">
                  <i className="bi-shield-check icon-extra-large text-base-color"></i>
                </div>
                <div className="feature-box-content last-paragraph-no-margin">
                  <span className="text-dark-gray fs-22 ls-0px">
                    데이터 보호
                  </span>
                  <p className="fs-12">
                    에버링크를 볼 수 있는 사용자를 결정할 수 있습니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="col icon-with-text-style-10 border-end border-1 sm-border-end-0 border-color-transparent-base-color sm-mb-50px">
              <div className="feature-box ps-8 pe-8 xl-ps-5 xl-pe-5">
                <div className="feature-box-icon feature-box-icon-rounded w-120px h-120px rounded-circle mb-20px">
                  <i className="ti-lock icon-extra-large text-base-color"></i>
                </div>
                <div className="feature-box-content last-paragraph-no-margin">
                  <span className="text-dark-gray fs-22 ls-0px">
                    분실 시 보안
                  </span>
                  <p className="fs-12">
                    에버링크를 도난당해도 즉시 교체할 수 있습니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="col icon-with-text-style-10">
              <div className="feature-box ps-8 pe-8 xl-ps-5 xl-pe-5">
                <div className="feature-box-icon feature-box-icon-rounded w-120px h-120px rounded-circle mb-20px">
                  <i className="line-icon-Life-Safer icon-extra-large text-base-color"></i>
                </div>
                <div className="feature-box-content last-paragraph-no-margin">
                  <span className="text-dark-gray fs-22 ls-0px">
                    일회성 결제
                  </span>
                  <p className="fs-12">
                    숨겨진 비용이나 구독이 없는 평생 서비스
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section
          className="background-position-center background-repeat"
          // style=background-image: url('images/vertical-center-line-bg.svg')"
        >
          <div className="container">
            <div className="row justify-content-center mb-5 xs-mb-7">
              <div
                className="col-md-8 text-center"
                data-anime='{ "el": "childs", "translateY": [30, 0], "opacity": [0,1], "duration": 1000, "delay": 500, "staggervalue": 300, "easing": "easeOutQuad" }'
              >
                <img src={mainSubImage2} alt="" />
              </div>
            </div>

            <div className="row justify-content-center align-items-center">
              <div
                className="col-12 text-center last-paragraph-no-margin"
                data-anime='{ "el": "childs", "translateY": [0, 0], "opacity": [0,1], "duration": 1200, "delay": 0, "staggervalue": 150, "easing": "easeOutQuad" }'
              >
                <div className="d-inline-block align-middle bg-dark-gray fw-600 text-white text-uppercase border-radius-4px ps-20px pe-20px fs-12 me-10px md-m-5px">
                  Awesome
                </div>
                <div className="d-inline-block align-middle text-dark-gray fs-20 fw-500">
                  <span className="text-decoration-line-bottom fw-600">
                    Open Get 20% discount
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section> */}

      <section
        className="big-section bg-dark-gray p-3"
        // style={{ backgroundImage: `url(${mainSubBgImage})` }}
      >
        <div className="container">
          <div
            className="row row-cols-1 row-cols-lg-3 row-cols-md-2 justify-content-center interactive-banner-container"
            data-anime='{"el": "childs", "translateY": [0, 0], "perspective": [1000,1200], "scale": [1.1, 1], "rotateX": [50, 0], "opacity": [0,1], "duration": 800, "delay": 200, "staggervalue": 300, "easing": "easeOutQuad" }'
          >
            <div className="col interactive-banner-style-03 transition-inner-all md-mb-30px">
              <div className="position-relative overflow-hidden border-radius-6px last-paragraph-no-margin">
                <figure className="m-0">
                  <div className="position-absolute top-0px left-0px w-100 h-100 z-index-1"></div>
                  <img src={guide1} alt="" />
                  <figcaption className="d-flex flex-column w-100 h-100 p-60px lg-p-35px z-index-1">
                    {/* <span className="mb-auto fs-24 text-white text-white-hover w-90 lg-w-100">
                      Preferred style of accommodation.
                    </span> */}
                    {/* <a
                      href="#"
                      className="align-self-start fs-15 fw-500 ls-1px text-uppercase text-white"
                    >
                      <i className="bi bi-bookmark-heart align-middle icon-extra-medium me-10px"></i>
                      Superior service
                    </a> */}
                  </figcaption>
                </figure>
              </div>
            </div>
            <div className="col interactive-banner-style-03 transition-inner-all md-mb-30px">
              <div className="position-relative overflow-hidden border-radius-6px last-paragraph-no-margin">
                <figure className="m-0">
                  <div className="position-absolute top-0px left-0px w-100 h-100 z-index-1"></div>
                  <img src={guide2} alt="" />
                  <figcaption className="d-flex flex-column w-100 h-100 p-60px lg-p-35px z-index-1">
                    {/* <span className="mb-auto fs-24 text-white text-white-hover w-90 lg-w-100">
                      Our local guides and tour directors.
                    </span>
                    <a
                      href="#"
                      className="align-self-start fs-15 fw-500 ls-1px text-uppercase text-white"
                    >
                      <i className="bi bi-award align-middle icon-extra-medium me-10px"></i>
                      Greatest guides
                    </a> */}
                  </figcaption>
                </figure>
              </div>
            </div>
            <div className="col interactive-banner-style-03 transition-inner-all">
              <div className="position-relative overflow-hidden border-radius-6px last-paragraph-no-margin">
                <figure className="m-0">
                  <div className="position-absolute top-0px left-0px w-100 h-100 z-index-1"></div>
                  <img src={guide3} alt="" />
                  <figcaption className="d-flex flex-column w-100 h-100 p-60px lg-p-35px z-index-1">
                    {/* <span className="mb-auto fs-24 text-white text-white-hover w-90 lg-w-100">
                      The best consumer protection plan.
                    </span>
                    <a
                      href="#"
                      className="align-self-start fs-15 fw-500 ls-1px text-uppercase text-white"
                    >
                      <i className="bi bi-shield-check align-middle icon-extra-medium me-10px"></i>
                      Fully protected
                    </a> */}
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
          <div className="row justify-content-center align-items-center pt-5">
            <div
              className="col-12 text-center last-paragraph-no-margin"
              data-anime='{ "el": "childs", "translateY": [0, 0], "opacity": [0,1], "duration": 1200, "delay": 0, "staggervalue": 150, "easing": "easeOutQuad" }'
            >
              <div className="d-inline-block align-middle bg-base-color fw-600 text-white text-uppercase border-radius-4px ps-20px pe-20px fs-12 me-10px md-m-5px">
                Awesome
              </div>
              <div className="d-inline-block align-middle text-white fs-20 fw-500">
                <span className="text-decoration-line-bottom fw-600">
                  Open Get 20% discount
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="background-position-center background-repeat overlap-height position-relative bg-very-light-gray py-5 pb-0"
        // style="background-image: url('images/vertical-center-line-bg.svg')"
      >
        <div className="container">
          <div
            className="row justify-content-center xs-mb-7"
            data-anime='{ "el": "childs", "translateY": [30, 0], "opacity": [0,1], "duration": 1000, "delay": 1000, "staggervalue": 300, "easing": "easeOutQuad" }'
          >
            <div className="col-md-8 text-center">
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
            <section
              className="cover-background pt-5 pb-3"
              // style="background-image: url(https://via.placeholder.com/1920x1080)"
            >
              <div className="opacity-extra-medium"></div>
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-12 col-xl-10 text-center z-index-1">
                    <h6 className="mb-5px text-dark-gray ls-minus-2px mb-2">
                      에버링크 영상
                    </h6>
                    {/* <a
                      href="#"
                      className="btn btn-extra-large btn-base-color text-transform-none btn-rounded btn-hover-animation-switch popup-youtube"
                      onClick={handleOpenModal}
                    >
                      <span>
                        <span className="btn-text">Open YouTube video</span>
                        <span className="btn-icon">
                          <i className="feather icon-feather-arrow-right"></i>
                        </span>
                        <span className="btn-icon">
                          <i className="feather icon-feather-arrow-right"></i>
                        </span>
                      </span>
                    </a> */}
                    <div className="col text-center fit-videos md-mb-50px sm-mb-30px">
                      <iframe
                        width="100%"
                        height="315"
                        src="https://www.youtube.com/embed/sU3FkzUKHXU?autoplay=0;&mute=1;rel=0&amp;showinfo=0"
                        allowfullscreen
                      ></iframe>
                    </div>
                  </div>
                </div>
                {/* React Modal로 모달 구현 */}
                <Modal
                  isOpen={isModalOpen}
                  onRequestClose={handleCloseModal}
                  contentLabel="YouTube Video Modal"
                  ariaHideApp={false} // 이 옵션은 기본적으로 true이며, 배경 컨텐츠 접근을 막습니다
                  shouldCloseOnOverlayClick={true} // 오버레이 클릭 시 닫기
                  onAfterOpen={() => {
                    document.body.style.overflow = 'auto'; // 모달이 열릴 때 스크롤 허용
                  }}
                  onAfterClose={() => {
                    document.body.style.overflow = ''; // 모달 닫힐 때 원상 복구
                  }}
                  style={{
                    overlay: {
                      backgroundColor: 'rgba(0, 0, 0, 1)',
                      zIndex: 9999,
                    },
                    content: {
                      position: 'relative',
                      top: '50%',
                      left: '50%',
                      right: 'auto',
                      bottom: 'auto',
                      transform: 'translate(-50%, -50%)',
                      background: '#000',
                      padding: '0',
                      border: 'none',
                      borderRadius: '10px',
                      width: '60%',
                      maxWidth: '800px',
                      height: 'auto',
                      overflow: 'hidden',
                    },
                  }}
                >
                  {/* 닫기 버튼 */}
                  {/* <button
                    onClick={handleCloseModal}
                    style={{
                      position: 'absolute',
                      top: '5px',
                      right: '0px',
                      background: 'transparent',
                      border: 'none',
                      color: '#fff',
                      fontSize: '56px',
                      cursor: 'pointer',
                    }}
                  >
                    &times;
                  </button> */}

                  {/* React Player로 유튜브 영상 삽입 */}
                  <ReactPlayer
                    url="https://www.youtube.com/watch?v=cfXHhfNy7tU"
                    controls
                    playing={isModalOpen}
                    width="100%"
                    height="450px"
                  />
                </Modal>
              </div>
            </section>
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
