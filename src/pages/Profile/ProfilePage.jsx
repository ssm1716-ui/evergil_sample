import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Button from '@/components/common/Button/Button';

import sampleProfile1 from '@/assets/images/sample/sample_profile1.png';
import sampleProfile2 from '@/assets/images/sample/sample_profile2.png';
import sampleProfile3 from '@/assets/images/sample/sample_profile3.png';

const ProfilePage = () => {
  return (
    <section className="">
      <section className="big-section">
        <div className="container">
          <div className="row justify-content-center mt-5 mb-5">
            <div className="col-xxl-5 col-xl-6 col-lg-8 col-md-10 text-center text-base-color">
              <h3 className="fw-800 ls-minus-1px md-ls-0px ">My Everlinks</h3>
              <p className="fs-24">추모페이지 프로필 설정</p>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-12 position-relative swiper-light-pagination">
              {/* Swiper 설정 */}
              <Swiper
                modules={[Navigation, Pagination, Autoplay, Keyboard]}
                slidesPerView={3}
                spaceBetween={30}
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
                  480: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  992: { slidesPerView: 3 },
                }}
              >
                {/* Swiper 슬라이드 이미지 */}
                {[
                  sampleProfile2,
                  sampleProfile1,
                  sampleProfile3,
                  sampleProfile1,
                  sampleProfile2,
                  sampleProfile3,
                ].map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      className="w-100"
                      src={image}
                      alt={`Slide ${index + 1}`}
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
                <i className="fa-solid fa-circle-plus align-middle icon-extra-super-double-large text-extra-medium-gray"></i>
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
    </section>
  );
};

export default ProfilePage;
