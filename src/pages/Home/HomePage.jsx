import mainBannerImage from '@/assets/images/main-banner.png';
const HomePage = () => {
  return (
    <>
      <section
        className="p-0 md-h-600px sm-h-500px border-top position-relative"
        data-parallax-background-ratio="0.3"
        style={{
          backgroundImage: `url(${mainBannerImage})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          height: '1100px',
        }}
      >
        <div className="opacity-light bg-black"></div>
        <div className="container h-100 position-relative">
          <div className="row align-items-center h-100 justify-content-center">
            <div
              className="col-md-10 position-relative text-white d-flex flex-column justify-content-center text-center h-100"
              data-anime='{ "el": "childs", "translateY": [-15, 0], "perspective": [1200,1200], "scale": [1.1, 1], "rotateX": [50, 0], "opacity": [0,1], "duration": 600, "delay": 100, "staggervalue": 300, "easing": "easeOutQuad" }'
            >
              <h5 className="alt-font fw-400 mb-20px text-shadow-double-large">
                Luxury space that you can afford
              </h5>
              <div className="fs-225 lg-fs-200 md-fs-170 sm-fs-150 xs-fs-110 fw-700 mb-20px ls-minus-8px md-ls-minus-4px xs-ls-minus-2px text-shadow-double-large">
                Holiday
              </div>
              <div className="mb-30px">
                <a
                  href="demo-hotel-and-resort-contact.html"
                  className="btn btn-extra-large btn-switch-text btn-white fw-700 btn-round-edge btn-box-shadow"
                >
                  <span>
                    <span
                      className="btn-double-text"
                      data-text="Book your stay"
                    >
                      Book your stay
                    </span>
                    <span>
                      <i className="fa-solid fa-arrow-right fs-14"></i>
                    </span>
                  </span>
                </a>
              </div>
              <div className="position-absolute sm-position-relative bottom-80px lg-bottom-50px sm-bottom-0px left-0px right-0px d-flex justify-content-center align-items-center">
                <div className="fs-22 fw-500">
                  Perfect place to relax and
                  <div
                    className="highlight-separator"
                    data-shadow-animation="true"
                    data-animation-delay="500"
                  >
                    enjoy your rest.
                    <span>
                      <img src="images/highlight-separator.svg" alt="" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-very-light-gray half-section ps-6 pe-6">
        <div className="container-fluid">
          <div
            className="row row-cols-1 row-cols-lg-4 row-cols-md-2 justify-content-center"
            data-anime='{ "el": "childs", "translateX": [-15, 0], "opacity": [0,1], "duration": 600, "delay": 0, "staggervalue": 300, "easing": "easeOutQuad" }'
          >
            <div className="col icon-with-text-style-10 border-end border-1 sm-border-end-0 border-color-transparent-base-color md-mb-50px">
              <div className="feature-box ps-8 pe-8 xl-ps-5 xl-pe-5">
                <div className="feature-box-icon feature-box-icon-rounded w-120px h-120px rounded-circle mb-20px">
                  <i className="line-icon-Medal-2 icon-extra-large text-base-color"></i>
                </div>
                <div className="feature-box-content last-paragraph-no-margin">
                  <span className="alt-font text-dark-gray fs-22 ls-0px">
                    Five stars luxury resort
                  </span>
                  <p>Experience a unique stay.</p>
                </div>
              </div>
            </div>
            <div className="col icon-with-text-style-10 border-end border-1 md-border-end-0 border-color-transparent-base-color md-mb-50px">
              <div className="feature-box ps-8 pe-8 xl-ps-5 xl-pe-5">
                <div className="feature-box-icon feature-box-icon-rounded w-120px h-120px rounded-circle mb-20px">
                  <i className="line-icon-Moustache-Smiley icon-extra-large text-base-color"></i>
                </div>
                <div className="feature-box-content last-paragraph-no-margin">
                  <span className="alt-font text-dark-gray fs-22 ls-0px">
                    Well trained manpower
                  </span>
                  <p>Dedicated meal courses.</p>
                </div>
              </div>
            </div>
            <div className="col icon-with-text-style-10 border-end border-1 sm-border-end-0 border-color-transparent-base-color sm-mb-50px">
              <div className="feature-box ps-8 pe-8 xl-ps-5 xl-pe-5">
                <div className="feature-box-icon feature-box-icon-rounded w-120px h-120px rounded-circle mb-20px">
                  <i className="line-icon-French-Fries icon-extra-large text-base-color"></i>
                </div>
                <div className="feature-box-content last-paragraph-no-margin">
                  <span className="alt-font text-dark-gray fs-22 ls-0px">
                    Fine dining restaurants
                  </span>
                  <p>Discover a medley of flavours.</p>
                </div>
              </div>
            </div>
            <div className="col icon-with-text-style-10">
              <div className="feature-box ps-8 pe-8 xl-ps-5 xl-pe-5">
                <div className="feature-box-icon feature-box-icon-rounded w-120px h-120px rounded-circle mb-20px">
                  <i className="line-icon-Life-Safer icon-extra-large text-base-color"></i>
                </div>
                <div className="feature-box-content last-paragraph-no-margin">
                  <span className="alt-font text-dark-gray fs-22 ls-0px">
                    Large swimming pool
                  </span>
                  <p>Unwind and discover joy.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
