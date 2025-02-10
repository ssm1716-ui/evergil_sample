import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Button from '@/components/common/Button/Button';
import AnimatedSection from '@/components/AnimatedSection';

import sampleProfile1 from '@/assets/images/sample/sample_profile1.png';
import sampleProfile2 from '@/assets/images/sample/sample_profile2.png';
import sampleProfile3 from '@/assets/images/sample/sample_profile3.png';

const ProfilePage = () => {
  return (
    <>
      <AnimatedSection>
        <section className="">
          <div className="container">
            <div className="row justify-content-center mt-5 mb-5">
              <div
                className="row align-items-center justify-content-center"
                data-anime='{ "el": "childs", "translateY": [-15, 0], "opacity": [0,1], "duration": 300, "delay": 0, "staggervalue": 200, "easing": "easeOutQuad" }'
              >
                <div className="col-12 col-xl-8 col-lg-10 text-center position-relative page-title-extra-large text-base-color">
                  <h1 className="fw-600 mb-10px">My Everlinks</h1>
                  <p className="fw-600">추모 페이지 프로필 설정</p>
                </div>
              </div>
            </div>
            <div className="row align-items-center">
              <div
                className="sm-outside-box-right-0 sm-outside-box-left-0"
                data-anime='{ "el": "childs", "translateY": [0, 0], "opacity": [0,1], "duration": 1200, "delay": 0, "staggervalue": 150, "easing": "easeOutQuad" }'
              >
                <div className="col-12 position-relative  swiper-dark-pagination swiper-line-pagination-style-01">
                  {/* Swiper 설정 */}
                  <Swiper
                    modules={[Navigation, Pagination, Autoplay, Keyboard]}
                    slidesPerView={3}
                    spaceBetween={30}
                    centeredSlides={true}
                    loop={true}
                    navigation={{
                      nextEl: '.slider-one-slide-next-02',
                      prevEl: '.slider-one-slide-prev-02',
                    }}
                    keyboard={{
                      enabled: true,
                      onlyInViewport: true,
                    }}
                    breakpoints={{
                      320: { slidesPerView: 1 },
                      480: { slidesPerView: 1 },
                      768: { slidesPerView: 3 },
                      992: { slidesPerView: 3 },
                    }}
                    effect={'slide'}
                  >
                    {/* Swiper 슬라이드 이미지 */}
                    {[
                      sampleProfile1,
                      sampleProfile1,
                      sampleProfile1,
                      sampleProfile1,
                      sampleProfile1,
                      sampleProfile1,
                      sampleProfile1,
                    ].map((image, index) => (
                      <SwiperSlide key={index}>
                        <img
                          className="w-100"
                          src={image}
                          alt={`Slide ${index + 3}`}
                        />
                        <div className="fs-24 text-center text-black">
                          <p className="pt-50px ">김코코</p>
                          <p className="">2015/04/16 - 2024/06/17</p>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  {/* 네비게이션 버튼 */}
                  <div className="slider-one-slide-prev-02 bg-transparent h-50px w-50px swiper-button-prev slider-navigation-style-03">
                    <i className="bi bi-caret-left-fill align-middle icon-large text-black"></i>
                  </div>
                  <div className="slider-one-slide-next-02 bg-transparent h-50px w-50px swiper-button-next slider-navigation-style-03">
                    <i className="bi bi-caret-right-fill align-middle icon-large text-black"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center pt-5">
              <Button
                size="medium"
                radiusOn="radius-on"
                className="w-20 mt-30px mb-10px d-block"
              >
                프로필 수정
              </Button>
            </div>

            <div className="text-center pt-12">
              <Link to="/create-profile">
                <div className="pb-2">
                  <i className="fa-solid fa-circle-plus align-middle text-extra-medium-gray fs-250"></i>
                </div>
                <Button
                  size="medium"
                  color="profile"
                  radiusOn="radius-on"
                  className="w-20 mt-30px mb-10px d-block"
                >
                  새로운 프로필 생성
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </>
  );
};

export default ProfilePage;
