import demoImage1 from '@/assets/images/sample/demo-architecture-about-01.jpg';
import demoImage2 from '@/assets/images/sample/demo-architecture-about-02.jpg';
import demoImage3 from '@/assets/images/sample/demo-architecture-about-03.jpg';

const ProfilePage = () => {
  return (
    <section className="bg-base-default-color">
      <section className="big-section bg-dark-gray">
        <div className="container">
          <div className="row justify-content-center mb-2">
            <div className="col-xxl-5 col-xl-6 col-lg-8 col-md-10 text-center">
              <h3 className="fw-600 text-white ls-minus-1px md-ls-0px">
                Carousel loop
              </h3>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-12 position-relative swiper-light-pagination">
              <div
                className="swiper"
                data-slider-options='{ "slidesPerView": 1, "spaceBetween": 30, "loop": true, "autoplay": { "delay": 1600, "disableOnInteraction": false }, "pagination": { "el": ".swiper-pagination-bullets-03", "clickable": true, "dynamicBullets": false }, "navigation": { "nextEl": ".slider-one-slide-next-02", "prevEl": ".slider-one-slide-prev-02" }, "keyboard": { "enabled": true, "onlyInViewport": true }, "breakpoints": { "992": { "slidesPerView": 3 }, "768": { "slidesPerView": 3 }, "480": { "slidesPerView": 2 }, "320": { "slidesPerView": 1 } }, "effect": "slide" }'
              >
                <div className="swiper-wrapper align-items-center">
                  <div className="swiper-slide">
                    <img
                      className="w-100"
                      src="https://via.placeholder.com/420x500"
                      alt=""
                    />
                  </div>

                  <div className="swiper-slide">
                    <img
                      className="w-100"
                      src="https://via.placeholder.com/420x500"
                      alt=""
                    />
                  </div>

                  <div className="swiper-slide">
                    <img
                      className="w-100"
                      src="https://via.placeholder.com/420x500"
                      alt=""
                    />
                  </div>

                  <div className="swiper-slide">
                    <img
                      className="w-100"
                      src="https://via.placeholder.com/420x500"
                      alt=""
                    />
                  </div>

                  <div className="swiper-slide">
                    <img
                      className="w-100"
                      src="https://via.placeholder.com/420x500"
                      alt=""
                    />
                  </div>

                  <div className="swiper-slide">
                    <img
                      className="w-100"
                      src="https://via.placeholder.com/420x500"
                      alt=""
                    />
                  </div>

                  <div className="swiper-slide">
                    <img
                      className="w-100"
                      src="https://via.placeholder.com/420x500"
                      alt=""
                    />
                  </div>

                  <div className="swiper-slide">
                    <img
                      className="w-100"
                      src="https://via.placeholder.com/410x505"
                      alt=""
                    />
                  </div>
                </div>
              </div>

              <div className="slider-one-slide-prev-02 bg-transparent border border-2 border-color-transparent-white-very-light h-50px w-50px swiper-button-prev slider-navigation-style-03">
                <i className="fa-solid fa-arrow-left text-white"></i>
              </div>
              <div className="slider-one-slide-next-02 bg-transparent border border-2 border-color-transparent-white-very-light h-50px w-50px swiper-button-next slider-navigation-style-03">
                <i className="fa-solid fa-arrow-right text-white"></i>
              </div>

              <div className="swiper-pagination swiper-pagination-bullets-03 swiper-pagination-style-01 swiper-pagination-clickable swiper-pagination-bullets position-static mt-40px sm-mt-25px"></div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default ProfilePage;
