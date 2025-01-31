import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

import FaqComponents from '@/components/Faq/FaqComponents';
import Button from '@/components/common/Button/Button';

import sampleImage1 from '@/assets/images/sample/demo-fashion-store-product-detail-01.jpg';
import sampleImage2 from '@/assets/images/sample/demo-fashion-store-product-detail-02.jpg';
import sampleImage3 from '@/assets/images/sample/demo-fashion-store-product-detail-03.jpg';
import sampleImage4 from '@/assets/images/sample/demo-fashion-store-product-detail-04.jpg';

import ShopDetailImage1 from '@/assets/images/shop-detail-image1.png';
import ShopDetailImage2 from '@/assets/images/shop-detail-image2.png';
import ShopDetailImage3 from '@/assets/images/shop-detail-image3.png';
import mainSubImage3 from '@/assets/images/main-sub-image3.png';

const ShopPage = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <>
      <section className="pt-15 pb-5 pb-0 md-pt-30px">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 pe-50px md-pe-15px md-mb-40px">
              <div className="row overflow-hidden position-relative">
                {/* Main Swiper for product images */}
                <div className="col-12 col-lg-10 position-relative order-lg-2 product-image ps-30px md-ps-15px">
                  <Swiper
                    spaceBetween={10}
                    loop={true}
                    autoplay={{
                      delay: 2000,
                      disableOnInteraction: false,
                    }}
                    watchOverflow={true}
                    navigation={{
                      nextEl: '.slider-product-next',
                      prevEl: '.slider-product-prev',
                    }}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[Navigation, Thumbs, Autoplay]}
                    className="product-image-slider"
                  >
                    <SwiperSlide>
                      <img
                        className="w-100"
                        src={sampleImage1}
                        alt="Product 1"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img
                        className="w-100"
                        src={sampleImage2}
                        alt="Product 2"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img
                        className="w-100"
                        src={sampleImage3}
                        alt="Product 3"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img
                        className="w-100"
                        src={sampleImage4}
                        alt="Product 4"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img
                        className="w-100"
                        src={sampleImage1}
                        alt="Product 5"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img
                        className="w-100"
                        src={sampleImage2}
                        alt="Product 6"
                      />
                    </SwiperSlide>
                  </Swiper>
                </div>

                {/* Thumbnail Swiper */}
                <div className="col-12 col-lg-2 order-lg-1 position-relative single-product-thumb">
                  <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={15}
                    slidesPerView={'auto'}
                    direction="vertical"
                    navigation={{
                      nextEl: '.swiper-thumb-next',
                      prevEl: '.swiper-thumb-prev',
                    }}
                    modules={[Navigation, Thumbs]}
                    className="product-image-thumb slider-vertical"
                  >
                    <SwiperSlide>
                      <img className="w-100" src={sampleImage1} alt="Thumb 1" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img className="w-100" src={sampleImage2} alt="Thumb 2" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img className="w-100" src={sampleImage3} alt="Thumb 3" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img className="w-100" src={sampleImage4} alt="Thumb 4" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img className="w-100" src={sampleImage1} alt="Thumb 5" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img className="w-100" src={sampleImage2} alt="Thumb 6" />
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
            </div>

            {/* Product Information Section */}
            <div className="col-12 col-lg-5 product-info">
              {/* <span className="fw-500 text-dark-gray d-block">Zalando</span> */}

              <div className="d-block d-sm-flex align-items-center mb-15px justify-content-between mb-5">
                <h4 className="text-dark-gray fw-500 mb-5px">에버링크 QR</h4>
                {/* <div className="me-10px xs-me-0">
                  <a
                    href="#tab"
                    className="section-link ls-minus-1px icon-small"
                  >
                    <i className="bi bi-star-fill text-black"></i>
                    <i className="bi bi-star-fill text-base-color"></i>
                    <i className="bi bi-star-fill text-base-color"></i>
                    <i className="bi bi-star-fill text-base-color"></i>
                    <i className="bi bi-star-fill text-base-color"></i>
                  </a>
                </div> */}
                <a
                  href="#"
                  className="me-25px text-dark-gray fw-500 section-link xs-me-0"
                >
                  <i className="bi bi-star-fill text-black me-5px"></i>
                  리뷰 10건
                </a>
                <div className="feature-box-icon me-10px">
                  <a href="#">
                    <i className="feather icon-feather-share-2 align-middle text-dark-gray"></i>
                  </a>
                </div>
                {/* <div>
                  <span className="text-dark-gray fw-500">SKU: </span>M492300
                </div> */}
              </div>
              <div className="product-price mb-15">
                <span className="text-dark-gray fs-28 xs-fs-24 fw-700 ls-minus-1px">
                  <del className="text-medium-gray me-10px fw-400">
                    60,000원
                  </del>
                  50,000원
                </span>
              </div>

              {/* <div className="d-flex align-items-center mb-20px">
                <label className="text-dark-gray me-15px fw-500">Color</label>
                <ul className="shop-color mb-0">
                  <li>
                    <input
                      className="d-none"
                      type="radio"
                      id="color-1"
                      name="color"
                    />
                    <label htmlFor="color-1">
                      <span style={{ backgroundColor: '#D4AF37' }}></span>
                    </label>
                  </li>
                  <li>
                    <input
                      className="d-none"
                      type="radio"
                      id="color-2"
                      name="color"
                    />
                    <label htmlFor="color-2">
                      <span style={{ backgroundColor: '#5881bf' }}></span>
                    </label>
                  </li>
                  <li>
                    <input
                      className="d-none"
                      type="radio"
                      id="color-3"
                      name="color"
                    />
                    <label htmlFor="color-3">
                      <span style={{ backgroundColor: '#87a968' }}></span>
                    </label>
                  </li>
                </ul>
              </div> */}
              {/* <div className="d-flex align-items-center mb-35px">
                <label className="text-dark-gray me-15px fw-500">Size</label>
                <ul className="shop-size mb-0">
                  <li>
                    <input
                      className="d-none"
                      type="radio"
                      id="size-1"
                      name="size"
                    />
                    <label htmlFor="size-1">
                      <span>S</span>
                    </label>
                  </li>
                  <li>
                    <input
                      className="d-none"
                      type="radio"
                      id="size-2"
                      name="size"
                    />
                    <label htmlFor="size-2">
                      <span>M</span>
                    </label>
                  </li>
                  <li>
                    <input
                      className="d-none"
                      type="radio"
                      id="size-3"
                      name="size"
                    />
                    <label htmlFor="size-3">
                      <span>L</span>
                    </label>
                  </li>
                  <li>
                    <input
                      className="d-none"
                      type="radio"
                      id="size-4"
                      name="size"
                    />
                    <label htmlFor="size-4">
                      <span>XL</span>
                    </label>
                  </li>
                </ul>
              </div> */}
              <div className="d-flex align-items-center flex-column flex-sm-row mb-20px position-relative">
                <div className="quantity me-15px xs-mb-15px order-1">
                  <label className="text-dark-gray me-15px fw-500">수량</label>
                  <button type="button" className="qty-minus">
                    -
                  </button>
                  <input
                    className="qty-text"
                    type="text"
                    id="1"
                    aria-label="submit"
                  />
                  <button type="button" className="qty-plus">
                    +
                  </button>
                </div>
              </div>
              <div className="d-flex align-items-center flex-column flex-sm-row mb-20px position-relative">
                <div className="me-15px xs-mb-15px order-1">
                  <label className="text-dark-gray me-15px fw-500">
                    선택사항
                  </label>

                  <Button
                    className="position-static border me-10px"
                    variant="primary"
                    color="white"
                    size="small"
                    radiusOn="radius-on"
                  >
                    부착용
                  </Button>

                  <Button
                    className="position-static border"
                    variant="primary"
                    color="white"
                    size="small"
                    radiusOn="radius-on"
                  >
                    거치용
                  </Button>
                </div>
              </div>
              <div className="d-flex align-items-center flex-column flex-sm-row mb-20px position-relative">
                <div className="me-15px xs-mb-15px order-1">
                  <label className="text-dark-gray me-15px fw-500">
                    배송비 무료
                  </label>
                </div>
                {/* <a
                  href="#"
                  className="btn btn-cart btn-large btn-switch-text btn-box-shadow btn-none-transform btn-dark-gray left-icon btn-round-edge border-0 me-15px xs-me-0 order-3 order-sm-2"
                >
                  <span>
                    <i className="feather icon-feather-shopping-bag"></i>
                  </span>
                  <span
                    className="btn-double-text ls-0px"
                    data-text="Add to cart"
                  >
                    Add to cart
                  </span>
                </a>
                <a
                  href="#"
                  className="wishlist d-flex align-items-center justify-content-center border border-radius-5px border-color-extra-medium-gray order-2 order-sm-3"
                >
                  <i className="feather icon-feather-heart icon-small text-dark-gray"></i>
                </a> */}
              </div>
              <div className="d-flex mb-20px mt-10">
                <div className="me-15px xs-mb-15px ">
                  <Button
                    className="me-10px"
                    variant="primary"
                    color="white"
                    size="extra-large"
                  >
                    장바구니
                  </Button>

                  <Button variant="primary" size="extra-large">
                    구매하기
                  </Button>
                </div>
              </div>
              <p className="mt-10">
                Lorem ipsum is simply dummy text of the printing and typesetting
                industry lorem ipsum standard.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="col-lg-12 text-center mb-10">
          <img src={ShopDetailImage1} alt="" className="w-70 lg-w-90" />
        </div>
        <div className="text-center text-dark">
          <h6 className="m-0 fs-24 fw-400 ls-minus-1px">가상 추모 페이지</h6>
          <h6 className="m-0 fs-24 fw-400 ls-minus-1px">
            구매하기 전 미리 보기
          </h6>
          <Link>
            <Button
              type="button"
              size="medium"
              radiusOn="radius-on"
              className="mt-1 mb-15px w-15 lg-w-60"
            >
              추모 페이지 미리보기
            </Button>
          </Link>
        </div>
      </section>
      <section>
        <div className="text-center text-dark">
          <Link>
            <div className="col-lg-12 text-center mb-2">
              <img src={ShopDetailImage2} alt="" className="w-65 lg-w-80" />
            </div>
          </Link>
        </div>
      </section>
      <section>
        <div className="text-center text-dark">
          <h6 className="m-0 fs-24 fw-400 ls-minus-1px">
            프로필 설정부터 추모페이지 수정 등
          </h6>
          <h6 className="m-0 fs-24 fw-400 ls-minus-1px">
            단계 별 동영상으로 설명
          </h6>
          <Link>
            <div className="col-lg-12 text-center mb-2">
              <img src={mainSubImage3} alt="" className="w-35 lg-w-80" />
            </div>
          </Link>
        </div>
      </section>

      <section className="pt-4 sm-pt-40px pb-0">
        <div className="container">
          <div className="row">
            <div className="col-12 tab-style-04 p-20px text-black border border-black">
              <h6 className="mb-3 fs-40 fw-400">상품 리뷰</h6>
              <ul className="nav nav-tabs border-bottom border-2 border-black justify-content-start fs-20 pb-2">
                <li className="nav-item">
                  <a
                    data-bs-toggle="tab"
                    href="#tab_five1"
                    className="nav-link active"
                  >
                    베스트순<span className="tab-border"></span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-bs-toggle="tab"
                    href="#tab_five2"
                  >
                    최근 등록순
                    <span className="tab-border"></span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-bs-toggle="tab"
                    href="#tab_five3"
                  >
                    평점 높은순
                    <span className="tab-border"></span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-bs-toggle="tab"
                    href="#tab_five4"
                    data-tab="review-tab"
                  >
                    평점 낮은순<span className="tab-border"></span>
                  </a>
                </li>
              </ul>
              <div className="mb-5 h-1px w-100 bg-extra-medium-gray sm-mt-10px xs-mb-8"></div>
              <div className="tab-content">
                <div className="tab-pane fade in active show" id="tab_five1">
                  <div className="row g-0 mb-4 md-mb-35px">
                    <div className="col-12 border-bottom border-color-extra-medium-gray pb-40px mb-40px xs-pb-30px xs-mb-30px">
                      <div className="d-block d-md-flex w-100 justify-content-between  align-items-start">
                        <div className="w-10 last-paragraph-no-margin sm-ps-0 position-relative text-center text-md-start">
                          <span className="text-base-color ls-minus-1px mb-5px sm-me-10px sm-mb-0 d-inline-block d-md-block">
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                          </span>
                        </div>
                        <div className="w-50 last-paragraph-no-margin sm-ps-0 position-relative text-center text-md-start">
                          <p className="w-90 sm-w-100 sm-mt-15px">
                            Lorem ipsum dolor sit sed do eiusmod tempor
                            incididunt labore enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident.
                          </p>
                        </div>
                        <div className="md-w-250px sm-w-100 sm-mb-10px">
                          <img
                            src={ShopDetailImage3}
                            className="w-100 mb-10px"
                            alt=""
                          />
                        </div>
                        <div className="w-200px sm-w-100 sm-mb-10px text-center">
                          <span className="text-dark-gray fw-600 d-block">
                            defas***@gmail.com
                          </span>
                        </div>
                        <div className=" md-w-250px sm-w-100 sm-mb-10px text-center">
                          <div className="text-dark-gray fw-600 d-block">
                            2024.12.23
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 border-bottom border-color-extra-medium-gray pb-40px mb-40px xs-pb-30px xs-mb-30px">
                      <div className="d-block d-md-flex w-100 justify-content-between  align-items-start">
                        <div className="w-10 last-paragraph-no-margin sm-ps-0 position-relative text-center text-md-start">
                          <span className="text-base-color ls-minus-1px mb-5px sm-me-10px sm-mb-0 d-inline-block d-md-block">
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                          </span>
                        </div>
                        <div className="w-50 last-paragraph-no-margin sm-ps-0 position-relative text-center text-md-start">
                          <p className="w-90 sm-w-100 sm-mt-15px">
                            Lorem ipsum dolor sit sed do eiusmod tempor
                            incididunt labore enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident.
                          </p>
                        </div>
                        <div className="md-w-250px sm-w-100 sm-mb-10px">
                          <img
                            src={ShopDetailImage3}
                            className="w-100 mb-10px"
                            alt=""
                          />
                        </div>
                        <div className="w-200px sm-w-100 sm-mb-10px text-center">
                          <span className="text-dark-gray fw-600 d-block">
                            defas***@gmail.com
                          </span>
                        </div>
                        <div className=" md-w-250px sm-w-100 sm-mb-10px text-center">
                          <div className="text-dark-gray fw-600 d-block">
                            2024.12.23
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 border-bottom border-color-extra-medium-gray pb-40px mb-40px xs-pb-30px xs-mb-30px">
                      <div className="d-block d-md-flex w-100 justify-content-between  align-items-start">
                        <div className="w-10 last-paragraph-no-margin sm-ps-0 position-relative text-center text-md-start">
                          <span className="text-base-color ls-minus-1px mb-5px sm-me-10px sm-mb-0 d-inline-block d-md-block">
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                          </span>
                        </div>
                        <div className="w-50 last-paragraph-no-margin sm-ps-0 position-relative text-center text-md-start">
                          <p className="w-90 sm-w-100 sm-mt-15px">
                            Lorem ipsum dolor sit sed do eiusmod tempor
                            incididunt labore enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident.
                          </p>
                        </div>
                        <div className="md-w-250px sm-w-100 sm-mb-10px">
                          <img
                            src={ShopDetailImage3}
                            className="w-100 mb-10px"
                            alt=""
                          />
                        </div>
                        <div className="w-200px sm-w-100 sm-mb-10px text-center">
                          <span className="text-dark-gray fw-600 d-block">
                            defas***@gmail.com
                          </span>
                        </div>
                        <div className=" md-w-250px sm-w-100 sm-mb-10px text-center">
                          <div className="text-dark-gray fw-600 d-block">
                            2024.12.23
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 border-bottom border-color-extra-medium-gray pb-40px mb-40px xs-pb-30px xs-mb-30px">
                      <div className="d-block d-md-flex w-100 justify-content-between  align-items-start">
                        <div className="w-10 last-paragraph-no-margin sm-ps-0 position-relative text-center text-md-start">
                          <span className="text-base-color ls-minus-1px mb-5px sm-me-10px sm-mb-0 d-inline-block d-md-block">
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                          </span>
                        </div>
                        <div className="w-50 last-paragraph-no-margin sm-ps-0 position-relative text-center text-md-start">
                          <p className="w-90 sm-w-100 sm-mt-15px">
                            Lorem ipsum dolor sit sed do eiusmod tempor
                            incididunt labore enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident.
                          </p>
                        </div>
                        <div className="md-w-250px sm-w-100 sm-mb-10px">
                          <img
                            src={ShopDetailImage3}
                            className="w-100 mb-10px"
                            alt=""
                          />
                        </div>
                        <div className="w-200px sm-w-100 sm-mb-10px text-center">
                          <span className="text-dark-gray fw-600 d-block">
                            defas***@gmail.com
                          </span>
                        </div>
                        <div className=" md-w-250px sm-w-100 sm-mb-10px text-center">
                          <div className="text-dark-gray fw-600 d-block">
                            2024.12.23
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 border-bottom border-color-extra-medium-gray pb-40px mb-40px xs-pb-30px xs-mb-30px">
                      <div className="d-block d-md-flex w-100 justify-content-between  align-items-start">
                        <div className="w-10 last-paragraph-no-margin sm-ps-0 position-relative text-center text-md-start">
                          <span className="text-base-color ls-minus-1px mb-5px sm-me-10px sm-mb-0 d-inline-block d-md-block">
                            <i className="bi bi-star-fill"></i>
                          </span>
                        </div>
                        <div className="w-50 last-paragraph-no-margin sm-ps-0 position-relative text-center text-md-start">
                          <p className="w-90 sm-w-100 sm-mt-15px">
                            Lorem ipsum dolor sit sed do eiusmod tempor
                            incididunt labore enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident.
                          </p>
                        </div>
                        <div className="md-w-250px sm-w-100 sm-mb-10px">
                          <img
                            src={ShopDetailImage3}
                            className="w-100 mb-10px"
                            alt=""
                          />
                        </div>
                        <div className="w-200px sm-w-100 sm-mb-10px text-center">
                          <span className="text-dark-gray fw-600 d-block">
                            defas***@gmail.com
                          </span>
                        </div>
                        <div className=" md-w-250px sm-w-100 sm-mb-10px text-center">
                          <div className="text-dark-gray fw-600 d-block">
                            2024.12.23
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="tab-pane fade in" id="tab_five2">
                  <div className="row g-0 mb-4 md-mb-35px">
                    <div className="col-12 border-bottom border-color-extra-medium-gray pb-40px mb-40px xs-pb-30px xs-mb-30px">
                      <div className="d-block d-md-flex w-100 justify-content-between  align-items-start">
                        <div className="w-10 last-paragraph-no-margin sm-ps-0 position-relative text-center text-md-start">
                          <span className="text-base-color ls-minus-1px mb-5px sm-me-10px sm-mb-0 d-inline-block d-md-block">
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                          </span>
                        </div>
                        <div className="w-50 last-paragraph-no-margin sm-ps-0 position-relative text-center text-md-start">
                          <p className="w-90 sm-w-100 sm-mt-15px">
                            Lorem ipsum dolor sit sed do eiusmod tempor
                            incididunt labore enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident.
                          </p>
                        </div>
                        <div className="md-w-250px sm-w-100 sm-mb-10px">
                          <img
                            src={ShopDetailImage3}
                            className="w-100 mb-10px"
                            alt=""
                          />
                        </div>
                        <div className="w-200px sm-w-100 sm-mb-10px text-center">
                          <span className="text-dark-gray fw-600 d-block">
                            defas***@gmail.com
                          </span>
                        </div>
                        <div className=" md-w-250px sm-w-100 sm-mb-10px text-center">
                          <div className="text-dark-gray fw-600 d-block">
                            2024.12.23
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 border-bottom border-color-extra-medium-gray pb-40px mb-40px xs-pb-30px xs-mb-30px">
                      <div className="d-block d-md-flex w-100 justify-content-between  align-items-start">
                        <div className="w-10 last-paragraph-no-margin sm-ps-0 position-relative text-center text-md-start">
                          <span className="text-base-color ls-minus-1px mb-5px sm-me-10px sm-mb-0 d-inline-block d-md-block">
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                          </span>
                        </div>
                        <div className="w-50 last-paragraph-no-margin sm-ps-0 position-relative text-center text-md-start">
                          <p className="w-90 sm-w-100 sm-mt-15px">
                            Lorem ipsum dolor sit sed do eiusmod tempor
                            incididunt labore enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident.
                          </p>
                        </div>
                        <div className="md-w-250px sm-w-100 sm-mb-10px">
                          <img
                            src={ShopDetailImage3}
                            className="w-100 mb-10px"
                            alt=""
                          />
                        </div>
                        <div className="w-200px sm-w-100 sm-mb-10px text-center">
                          <span className="text-dark-gray fw-600 d-block">
                            defas***@gmail.com
                          </span>
                        </div>
                        <div className=" md-w-250px sm-w-100 sm-mb-10px text-center">
                          <div className="text-dark-gray fw-600 d-block">
                            2024.12.23
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 border-bottom border-color-extra-medium-gray pb-40px mb-40px xs-pb-30px xs-mb-30px">
                      <div className="d-block d-md-flex w-100 justify-content-between  align-items-start">
                        <div className="w-10 last-paragraph-no-margin sm-ps-0 position-relative text-center text-md-start">
                          <span className="text-base-color ls-minus-1px mb-5px sm-me-10px sm-mb-0 d-inline-block d-md-block">
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                          </span>
                        </div>
                        <div className="w-50 last-paragraph-no-margin sm-ps-0 position-relative text-center text-md-start">
                          <p className="w-90 sm-w-100 sm-mt-15px">
                            Lorem ipsum dolor sit sed do eiusmod tempor
                            incididunt labore enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident.
                          </p>
                        </div>
                        <div className="md-w-250px sm-w-100 sm-mb-10px">
                          <img
                            src={ShopDetailImage3}
                            className="w-100 mb-10px"
                            alt=""
                          />
                        </div>
                        <div className="w-200px sm-w-100 sm-mb-10px text-center">
                          <span className="text-dark-gray fw-600 d-block">
                            defas***@gmail.com
                          </span>
                        </div>
                        <div className=" md-w-250px sm-w-100 sm-mb-10px text-center">
                          <div className="text-dark-gray fw-600 d-block">
                            2024.12.23
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="tab-pane fade in" id="tab_five3">
                  <div className="row g-0 mb-4 md-mb-35px">
                    <div className="col-12 border-bottom border-color-extra-medium-gray pb-40px mb-40px xs-pb-30px xs-mb-30px">
                      <div className="d-block d-md-flex w-100 justify-content-between  align-items-start">
                        <div className="w-10 last-paragraph-no-margin sm-ps-0 position-relative text-center text-md-start">
                          <span className="text-base-color ls-minus-1px mb-5px sm-me-10px sm-mb-0 d-inline-block d-md-block">
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                          </span>
                        </div>
                        <div className="w-50 last-paragraph-no-margin sm-ps-0 position-relative text-center text-md-start">
                          <p className="w-90 sm-w-100 sm-mt-15px">
                            Lorem ipsum dolor sit sed do eiusmod tempor
                            incididunt labore enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident.
                          </p>
                        </div>
                        <div className="md-w-250px sm-w-100 sm-mb-10px">
                          <img
                            src={ShopDetailImage3}
                            className="w-100 mb-10px"
                            alt=""
                          />
                        </div>
                        <div className="w-200px sm-w-100 sm-mb-10px text-center">
                          <span className="text-dark-gray fw-600 d-block">
                            defas***@gmail.com
                          </span>
                        </div>
                        <div className=" md-w-250px sm-w-100 sm-mb-10px text-center">
                          <div className="text-dark-gray fw-600 d-block">
                            2024.12.23
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 border-bottom border-color-extra-medium-gray pb-40px mb-40px xs-pb-30px xs-mb-30px">
                      <div className="d-block d-md-flex w-100 justify-content-between  align-items-start">
                        <div className="w-10 last-paragraph-no-margin sm-ps-0 position-relative text-center text-md-start">
                          <span className="text-base-color ls-minus-1px mb-5px sm-me-10px sm-mb-0 d-inline-block d-md-block">
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                          </span>
                        </div>
                        <div className="w-50 last-paragraph-no-margin sm-ps-0 position-relative text-center text-md-start">
                          <p className="w-90 sm-w-100 sm-mt-15px">
                            Lorem ipsum dolor sit sed do eiusmod tempor
                            incididunt labore enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident.
                          </p>
                        </div>
                        <div className="md-w-250px sm-w-100 sm-mb-10px">
                          <img
                            src={ShopDetailImage3}
                            className="w-100 mb-10px"
                            alt=""
                          />
                        </div>
                        <div className="w-200px sm-w-100 sm-mb-10px text-center">
                          <span className="text-dark-gray fw-600 d-block">
                            defas***@gmail.com
                          </span>
                        </div>
                        <div className=" md-w-250px sm-w-100 sm-mb-10px text-center">
                          <div className="text-dark-gray fw-600 d-block">
                            2024.12.23
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 border-bottom border-color-extra-medium-gray pb-40px mb-40px xs-pb-30px xs-mb-30px">
                      <div className="d-block d-md-flex w-100 justify-content-between  align-items-start">
                        <div className="w-10 last-paragraph-no-margin sm-ps-0 position-relative text-center text-md-start">
                          <span className="text-base-color ls-minus-1px mb-5px sm-me-10px sm-mb-0 d-inline-block d-md-block">
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                          </span>
                        </div>
                        <div className="w-50 last-paragraph-no-margin sm-ps-0 position-relative text-center text-md-start">
                          <p className="w-90 sm-w-100 sm-mt-15px">
                            Lorem ipsum dolor sit sed do eiusmod tempor
                            incididunt labore enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident.
                          </p>
                        </div>
                        <div className="md-w-250px sm-w-100 sm-mb-10px">
                          <img
                            src={ShopDetailImage3}
                            className="w-100 mb-10px"
                            alt=""
                          />
                        </div>
                        <div className="w-200px sm-w-100 sm-mb-10px text-center">
                          <span className="text-dark-gray fw-600 d-block">
                            defas***@gmail.com
                          </span>
                        </div>
                        <div className=" md-w-250px sm-w-100 sm-mb-10px text-center">
                          <div className="text-dark-gray fw-600 d-block">
                            2024.12.23
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="tab-pane fade in" id="tab_five4">
                  <div className="row g-0 mb-4 md-mb-35px">
                    <div className="col-12 border-bottom border-color-extra-medium-gray pb-40px mb-40px xs-pb-30px xs-mb-30px">
                      <div className="d-block d-md-flex w-100 justify-content-between  align-items-start">
                        <div className="w-10 last-paragraph-no-margin sm-ps-0 position-relative text-center text-md-start">
                          <span className="text-base-color ls-minus-1px mb-5px sm-me-10px sm-mb-0 d-inline-block d-md-block">
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                          </span>
                        </div>
                        <div className="w-50 last-paragraph-no-margin sm-ps-0 position-relative text-center text-md-start">
                          <p className="w-90 sm-w-100 sm-mt-15px">
                            Lorem ipsum dolor sit sed do eiusmod tempor
                            incididunt labore enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident.
                          </p>
                        </div>
                        <div className="md-w-250px sm-w-100 sm-mb-10px">
                          <img
                            src={ShopDetailImage3}
                            className="w-100 mb-10px"
                            alt=""
                          />
                        </div>
                        <div className="w-200px sm-w-100 sm-mb-10px text-center">
                          <span className="text-dark-gray fw-600 d-block">
                            defas***@gmail.com
                          </span>
                        </div>
                        <div className=" md-w-250px sm-w-100 sm-mb-10px text-center">
                          <div className="text-dark-gray fw-600 d-block">
                            2024.12.23
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 border-bottom border-color-extra-medium-gray pb-40px mb-40px xs-pb-30px xs-mb-30px">
                      <div className="d-block d-md-flex w-100 justify-content-between  align-items-start">
                        <div className="w-10 last-paragraph-no-margin sm-ps-0 position-relative text-center text-md-start">
                          <span className="text-base-color ls-minus-1px mb-5px sm-me-10px sm-mb-0 d-inline-block d-md-block">
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                          </span>
                        </div>
                        <div className="w-50 last-paragraph-no-margin sm-ps-0 position-relative text-center text-md-start">
                          <p className="w-90 sm-w-100 sm-mt-15px">
                            Lorem ipsum dolor sit sed do eiusmod tempor
                            incididunt labore enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident.
                          </p>
                        </div>
                        <div className="md-w-250px sm-w-100 sm-mb-10px">
                          <img
                            src={ShopDetailImage3}
                            className="w-100 mb-10px"
                            alt=""
                          />
                        </div>
                        <div className="w-200px sm-w-100 sm-mb-10px text-center">
                          <span className="text-dark-gray fw-600 d-block">
                            defas***@gmail.com
                          </span>
                        </div>
                        <div className=" md-w-250px sm-w-100 sm-mb-10px text-center">
                          <div className="text-dark-gray fw-600 d-block">
                            2024.12.23
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 border-bottom border-color-extra-medium-gray pb-40px mb-40px xs-pb-30px xs-mb-30px">
                      <div className="d-block d-md-flex w-100 justify-content-between  align-items-start">
                        <div className="w-10 last-paragraph-no-margin sm-ps-0 position-relative text-center text-md-start">
                          <span className="text-base-color ls-minus-1px mb-5px sm-me-10px sm-mb-0 d-inline-block d-md-block">
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                          </span>
                        </div>
                        <div className="w-50 last-paragraph-no-margin sm-ps-0 position-relative text-center text-md-start">
                          <p className="w-90 sm-w-100 sm-mt-15px">
                            Lorem ipsum dolor sit sed do eiusmod tempor
                            incididunt labore enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident.
                          </p>
                        </div>
                        <div className="md-w-250px sm-w-100 sm-mb-10px">
                          <img
                            src={ShopDetailImage3}
                            className="w-100 mb-10px"
                            alt=""
                          />
                        </div>
                        <div className="w-200px sm-w-100 sm-mb-10px text-center">
                          <span className="text-dark-gray fw-600 d-block">
                            defas***@gmail.com
                          </span>
                        </div>
                        <div className=" md-w-250px sm-w-100 sm-mb-10px text-center">
                          <div className="text-dark-gray fw-600 d-block">
                            2024.12.23
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-100 d-flex mt-4 justify-content-end md-mt-30px">
                <ul className="pagination pagination-style-01 fs-13 fw-500 mb-0">
                  <li className="page-item">
                    <a className="page-link" href="#">
                      <i className="feather icon-feather-arrow-left fs-18 d-xs-none"></i>
                    </a>
                  </li>
                  <li className="page-item active">
                    <a className="page-link" href="#">
                      01
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      02
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      03
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      04
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      <i className="feather icon-feather-arrow-right fs-18 d-xs-none"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <FaqComponents />
      </section>
    </>
  );
};

export default ShopPage;
