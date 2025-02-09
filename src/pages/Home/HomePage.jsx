import AnimatedSection from '@/components/AnimatedSection';

import FaqComponents from '@/components/Faq/FaqComponents';
import mainBannerImage from '@/assets/images/main-banner.png';
import mainSubImage1 from '@/assets/images/main-sub-image1.png';
import mainSubImage2 from '@/assets/images/main-sub-image2.png';
import mainSubImage3 from '@/assets/images/demo-travel-agency-about-02.jpg';
import mainSubImage4 from '@/assets/images/demo-travel-agency-about-03.jpg';
import mainSubImage5 from '@/assets/images/demo-travel-agency-about-04.jpg';
import mainSubBgImage from '@/assets/images/demo-branding-agency-pattern.svg';

const HomeSubPage = () => {
  return (
    <>
      <AnimatedSection>
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
                  Everlink
                </div>
                <div className="mb-30px">
                  <a
                    href="#"
                    className="btn btn-extra-large btn-switch-text bg-base-color text-white fw-700 btn-round-edge btn-box-shadow"
                  >
                    <span>
                      <span className="btn-double-text" data-text="시작">
                        구경하러 가기
                      </span>
                      <span>
                        <i className="fa-solid fa-arrow-right fs-14"></i>
                      </span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="background-position-center background-repeat"
          // style="background-image: url('images/vertical-center-line-bg.svg')"
        >
          <div className="container">
            <div className="row align-items-center mb-12 md-mb-17 xs-mb-25">
              <div
                className="col-lg-5 md-mb-50px p-0"
                data-anime='{ "el": "childs", "opacity": [0, 1], "rotateY": [-90, 0], "rotateZ": [-10, 0], "translateY": [80, 0], "translateZ": [50, 0], "staggervalue": 200, "duration": 800, "delay": 200, "easing": "easeOutCirc" }'
              >
                <h2 className="text-dark-gray ls-minus-2px">에버링크 QR</h2>
                <span className="mb-10px text-base-color fw-500 d-block">
                  납골당과 묘지 둘 다 사용이 가능합니다.
                </span>
                <p className="w-100 xl-w-100 mb-35px xs-mb-10px">
                  추모 페이지에 사랑하는 사람의 사진과 영상을 업로드 할 수
                  있습니다.
                  <br />
                  또한 가족들이 방문할 때 마다 추모페이지에서 하늘편지를 남기실
                  수 있습니다.
                  <br /> 평생동안 사랑하는 사람의 기억을 보관할 수 있는
                  추모페이지를 사용해보세요.
                </p>
                <p className="w-100 xl-w-100 mb-35px xs-mb-10px">
                  우리의 사명은 사랑하는 사람들이 영원히 기억되는 것 입니다.
                  <br />
                  대부분 2-3세대가 지나면 사람들은 우리가 존재했다는 사실조차
                  기억하지 못할 것입니다. <br />
                  확실한 건 시간이 지나면 기억은 희미해집니다.
                  <br /> 우리는 사랑하는 사람을 기억하고,그들과의 추억을
                  보존하고,
                  <br />
                  그들을 평생 기억할 수 있는 플랫폼을 제공할 것입니다.
                </p>
                <div className="d-inline-block w-100">
                  <a
                    href="demo-hotel-and-resort-about-us.html"
                    className="btn btn-extra-large btn-switch-text btn-dark-gray btn-box-shadow btn-round-edge d-inline-block align-middle me-30px xs-me-10px xs-mt-20px"
                  >
                    <span>
                      <span
                        className="btn-double-text"
                        data-text="About resort"
                      >
                        구매하러 가기
                      </span>
                    </span>
                  </a>
                  <div className="fs-20 fw-600 d-inline-block align-middle text-dark-gray xs-mt-20px">
                    <a href="tel:010-5922-1221">
                      <i className="bi bi-telephone-outbound text-medium-gray icon-small me-10px"></i>
                      010-5922-1221
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 position-relative offset-lg-1">
                {/* <span
                  className="fs-90 position-absolute left-60px md-left-100px sm-left-70px xs-left-10px top-90px xs-top-50px text-dark-gray fw-700 z-index-1"
                  data-bottom-top="transform: translateY(50px) scale(1,1)"
                  data-top-bottom="transform: translateY(-50px) scale(1,1)"
                  data-anime='{ "opacity": [0,1], "duration": 600, "delay": 1500, "staggervalue": 300, "easing": "easeOutQuad" }'
                >
                  <span className="fs-15 fw-600 d-table lh-16 text-uppercase text-medium-gray">
                    Started in
                  </span>
                  1995
                </span> */}
                <div
                  className="w-75 position-relative xs-w-80 border-radius-4px float-end"
                  // data-anime='{ "effect": "slide", "color": "#A0875B", "direction":"rl", "easing": "easeOutQuad", "duration": 600, "delay":400}'
                  data-anime='{ "opacity": [0,1], "duration": 600, "delay": 1500, "staggervalue": 300, "easing": "easeOutQuad" }'
                >
                  <img className="w-100" src={mainSubImage1} alt="" />
                </div>
                <div
                  className="position-absolute left-minus-70px md-left-15px bottom-minus-50px w-55"
                  data-bottom-top="transform: translateY(50px)"
                  data-top-bottom="transform: translateY(-50px)"
                  // data-anime='{ "effect": "slide", "color": "#ffffff", "direction":"lr", "easing": "easeOutQuad", "duration": 600, "delay":500}'
                  data-anime='{ "opacity": [0,1], "duration": 600, "delay": 1500, "staggervalue": 300, "easing": "easeOutQuad" }'
                >
                  <img
                    className="w-100 border-radius-4px"
                    src={mainSubImage1}
                    alt=""
                  />
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
                    <p>사랑하는 사람들의 소중한 기억을 모두 보관하세요.</p>
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
                    <p>에버링크를 볼 수 있는 사용자를 결정할 수 있습니다.</p>
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
                    <p>
                      에버링크를 도난당하거나 분실하면 즉시 교체할 수 있습니다.
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
                    <p>숨겨진 비용이나 구독이 없는 평생 서비스</p>
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
          className="big-section bg-dark-gray"
          style={{ backgroundImage: `url(${mainSubBgImage})` }}
        >
          <div className="container">
            <div
              className="row row-cols-1 row-cols-lg-3 row-cols-md-2 justify-content-center"
              data-anime='{"el": "childs", "translateY": [0, 0], "perspective": [1000,1200], "scale": [1.1, 1], "rotateX": [50, 0], "opacity": [0,1], "duration": 800, "delay": 200, "staggervalue": 300, "easing": "easeOutQuad" }'
            >
              <div className="col interactive-banner-style-03 transition-inner-all md-mb-30px">
                <div className="position-relative overflow-hidden border-radius-6px last-paragraph-no-margin">
                  <figure className="m-0">
                    <div className="bg-gradient-gray-light-dark-transparent position-absolute top-0px left-0px w-100 h-100 z-index-1"></div>
                    <img src={mainSubImage3} alt="" />
                    <figcaption className="d-flex flex-column w-100 h-100 p-60px lg-p-35px z-index-1">
                      <span className="mb-auto fs-24 text-white text-white-hover w-90 lg-w-100">
                        Preferred style of accommodation.
                      </span>
                      <a
                        href="#"
                        className="align-self-start fs-15 fw-500 ls-1px text-uppercase text-white"
                      >
                        <i className="bi bi-bookmark-heart align-middle icon-extra-medium me-10px"></i>
                        Superior service
                      </a>
                    </figcaption>
                  </figure>
                </div>
              </div>
              <div className="col interactive-banner-style-03 transition-inner-all md-mb-30px">
                <div className="position-relative overflow-hidden border-radius-6px last-paragraph-no-margin">
                  <figure className="m-0">
                    <div className="bg-gradient-gray-light-dark-transparent position-absolute top-0px left-0px w-100 h-100 z-index-1"></div>
                    <img src={mainSubImage4} alt="" />
                    <figcaption className="d-flex flex-column w-100 h-100 p-60px lg-p-35px z-index-1">
                      <span className="mb-auto fs-24 text-white text-white-hover w-90 lg-w-100">
                        Our local guides and tour directors.
                      </span>
                      <a
                        href="#"
                        className="align-self-start fs-15 fw-500 ls-1px text-uppercase text-white"
                      >
                        <i className="bi bi-award align-middle icon-extra-medium me-10px"></i>
                        Greatest guides
                      </a>
                    </figcaption>
                  </figure>
                </div>
              </div>
              <div className="col interactive-banner-style-03 transition-inner-all">
                <div className="position-relative overflow-hidden border-radius-6px last-paragraph-no-margin">
                  <figure className="m-0">
                    <div className="bg-gradient-gray-light-dark-transparent position-absolute top-0px left-0px w-100 h-100 z-index-1"></div>
                    <img src={mainSubImage5} alt="" />
                    <figcaption className="d-flex flex-column w-100 h-100 p-60px lg-p-35px z-index-1">
                      <span className="mb-auto fs-24 text-white text-white-hover w-90 lg-w-100">
                        The best consumer protection plan.
                      </span>
                      <a
                        href="#"
                        className="align-self-start fs-15 fw-500 ls-1px text-uppercase text-white"
                      >
                        <i className="bi bi-shield-check align-middle icon-extra-medium me-10px"></i>
                        Fully protected
                      </a>
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
          className="background-position-center background-repeat overlap-height position-relative bg-very-light-gray pb-0"
          // style="background-image: url('images/vertical-center-line-bg.svg')"
        >
          <div className="container">
            <div
              className="row justify-content-center mb-5 xs-mb-7"
              data-anime='{ "el": "childs", "translateY": [30, 0], "opacity": [0,1], "duration": 1000, "delay": 1000, "staggervalue": 300, "easing": "easeOutQuad" }'
            >
              <div className="col-md-8 text-center">
                <h2 className="mb-5px text-dark-gray ls-minus-2px">
                  에버링크 이용가이드
                </h2>
                <span className="d-inline-block">
                  프로필 설정부터 추모페이지 수정 등 단계별 영상으로 설명
                </span>
              </div>
              <section
                className="big-section cover-background pt-5"
                // style="background-image: url(https://via.placeholder.com/1920x1080)"
              >
                <div className="opacity-extra-medium"></div>
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-12 col-xl-10 text-center z-index-1">
                      <span className="text-black fs-20 mb-15px d-inline-block w-100">
                        에버링크 영상
                      </span>
                      <a
                        href="https://www.youtube.com/watch?v=cfXHhfNy7tU"
                        className="btn btn-extra-large btn-base-color text-transform-none btn-rounded btn-hover-animation-switch popup-youtube"
                        target="_blank"
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
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>

        <section
          className="background-position-center background-repeat"
          // style=background-image: url('images/vertical-center-line-bg.svg')"
        >
          <div className="container">
            <div className="row justify-content-center mb-5 xs-mb-7">
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
      </AnimatedSection>
    </>
  );
};

export default HomeSubPage;
