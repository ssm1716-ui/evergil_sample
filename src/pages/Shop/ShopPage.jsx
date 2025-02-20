import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '@/components/common/Modal/Modal';
import { addCart } from '@/api/memberApi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

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
  const [qty, setQty] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setProduct] = useState({
    productImages: sampleImage1,
    productName: '에버링크 QR',
    price: 80000,
    originPrice: 100000,
    discountedPrice: 20000,
    deliveryFee: 0,
    qty: 1,
  });
  const navigate = useNavigate();

  const handleMinus = () => {
    if (qty <= 1) return;
    setQty((prevQty) => {
      const newQty = prevQty - 1;
      setProduct((prevProduct) => ({ ...prevProduct, qty: newQty }));
      return newQty;
    });
  };
  const handlePlus = () => {
    setQty((prevQty) => {
      const newQty = prevQty + 1;
      setProduct((prevProduct) => ({ ...prevProduct, qty: newQty }));
      return newQty;
    });
  };

  //로컬스토리지에 장바구니 추가
  const handleCartAdd = () => {
    addCart(selectedProduct);
    setIsModalOpen(true);
  };

  const nextCartPage = () => {
    navigate('/cart');
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    navigate('/checkout', {
      state: { orderType: 'direct', product: selectedProduct },
    });
  };

  return (
    <>
      <section className="top-space-margin half-section">
        <div className="container">
          <div
            className="row align-items-center justify-content-center"
            data-anime='{ "el": "childs", "translateY": [-15, 0], "opacity": [0,1], "duration": 300, "delay": 0, "staggervalue": 200, "easing": "easeOutQuad" }'
          >
            <div className="col-12 col-xl-8 col-lg-10 text-center position-relative page-title-extra-large">
              <h1 className="fw-600 text-dark-gray mb-10px">구매하기</h1>
            </div>
            <div className="col-12 breadcrumb breadcrumb-style-01 d-flex justify-content-center"></div>
          </div>
        </div>
      </section>

      <section className="py-0 md-pt-30px">
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

            <div className="col-12 col-lg-5 product-info">
              <span className="fw-500 text-dark-gray d-block">배송비 무료</span>
              <h4 className="text-dark-gray fw-500 mb-5px">에버링크 QR</h4>
              <div className="d-block d-sm-flex align-items-center mb-15px">
                <div className="me-10px xs-me-0">
                  <a
                    href="#tab"
                    className="d-block section-link icon-small me-25px text-dark-gray fw-500 section-link xs-me-0 w-100"
                  >
                    <i className="bi bi-star-fill text-golden-yellow pe-1"></i>
                    리뷰 165건
                  </a>
                </div>

                <div></div>
              </div>
              <div className="product-price mb-10px">
                <span className="text-dark-gray fs-28 xs-fs-24 fw-700">
                  <del className="text-medium-gray me-10px fw-400">
                    100,000원
                  </del>
                  80,000원
                </span>
              </div>
              <p className="mb-30px">
                Lorem ipsum is simply dummy text of the printing and typesetting
                industry lorem ipsum standard. Lorem ipsum is simply dummy text
                of the printing and typesetting industry lorem ipsum standard.
                Lorem ipsum is simply dummy text of the printing and typesetting
                industry lorem ipsum standard. Lorem ipsum is simply dummy text
                of the printing and typesetting industry lorem ipsum standard.
              </p>
              {/* <div className="d-flex align-items-center mb-20px">
                <label className="text-dark-gray me-15px fw-500">Color</label>
                <ul className="shop-color mb-0">
                  <li>
                    <input
                      className="d-none"
                      type="radio"
                      id="color-1"
                      name="color"
                      checked=""
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
                      checked=""
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
                      checked=""
                    />
                    <label htmlFor="color-3">
                      <span style={{ backgroundColor: '#87a968' }}></span>
                    </label>
                  </li>
                </ul>
              </div> */}
              {/* <div className="d-flex align-items-center mb-25px">
                <label className="text-dark-gray me-15px fw-500">
                  선택 사항
                </label>
                <ul className="shop-size mb-0">
                  <li>
                    <input
                      className="d-none"
                      type="radio"
                      id="size-1"
                      name="size"
                    />
                    <label htmlFor="size-1" className="btn-double-text ls-0px">
                      <span>부착용</span>
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
                      <span>거치용</span>
                    </label>
                  </li>
                </ul>
              </div> */}
              <div className="d-flex align-items-baseline flex-row flex-sm-row mb-20px position-relative">
                <label className="text-dark-gray me-10px fw-500">수량</label>
                <div className="quantity me-10px xs-mb-15px order-1">
                  <button
                    type="button"
                    className="qty-minus"
                    onClick={handleMinus}
                  >
                    -
                  </button>
                  <input
                    className="qty-text"
                    type="text"
                    id="1"
                    value={qty}
                    aria-label="qty-text"
                  />
                  <button
                    type="button"
                    className="qty-plus"
                    onClick={handlePlus}
                  >
                    +
                  </button>
                </div>
                <Link
                  className="btn btn-cart btn-extra-large btn-switch-text btn-box-shadow btn-none-transform btn-dark-gray left-icon btn-round-edge border-0 me-5px xs-me-0 order-3 order-sm w-45"
                  onClick={handleCartAdd}
                >
                  <span>
                    <span>
                      <i className="feather icon-feather-shopping-bag"></i>
                    </span>
                    <span
                      className="btn-double-text ls-0px"
                      data-text="장바구니"
                    >
                      장바구니
                    </span>
                  </span>
                </Link>
                <a
                  href="#"
                  className="wishlist d-flex align-items-center justify-content-center border border-radius-5px border-color-extra-medium-gray order-2 order-sm-3"
                >
                  <i className="feather icon-feather-share-2 align-middle text-dark-gray"></i>
                </a>
              </div>

              <div className="d-flex align-items-center flex-column flex-sm-row mb-20px position-relative">
                <Link
                  className="btn btn-cart btn-extra-large btn-switch-text btn-box-shadow btn-none-transform btn-base-color left-icon btn-round-edge border-0 me-15px xs-me-0 order-3 order-sm-2 w-100"
                  onClick={handleBuyNow}
                >
                  <span>
                    <span></span>
                    <span
                      className="btn-double-text ls-0px"
                      data-text="바로 구매"
                    >
                      구매하기
                    </span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="tab" className="pt-4 sm-pt-40px">
        <div className="container">
          <div className="row">
            <div className="col-12 tab-style-04">
              <ul className="nav nav-tabs border-0 justify-content-center fs-19">
                <li className="nav-item">
                  <a
                    data-bs-toggle="tab"
                    href="#tab_five1"
                    className="nav-link active"
                  >
                    상품 설명<span className="tab-border bg-dark-gray"></span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-bs-toggle="tab"
                    href="#tab_five2"
                  >
                    추가 정보
                    <span className="tab-border bg-dark-gray"></span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-bs-toggle="tab"
                    href="#tab_five3"
                  >
                    배송 및 반품
                    <span className="tab-border bg-dark-gray"></span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-bs-toggle="tab"
                    href="#tab_five4"
                    data-tab="review-tab"
                  >
                    리뷰 (165)
                    <span className="tab-border bg-dark-gray"></span>
                  </a>
                </li>
              </ul>
              <div className="mb-5 h-1px w-100 bg-extra-medium-gray sm-mt-10px xs-mb-8"></div>
              <div className="tab-content">
                <div className="tab-pane fade in active show" id="tab_five1">
                  <div className="row align-items-center justify-content-center">
                    <div className="col-lg-6 md-mb-40px">
                      <div className="d-flex align-items-center mb-5px">
                        <div className="col-auto pe-5px">
                          <i className="bi bi-heart-fill text-red fs-16"></i>
                        </div>
                        <div className="col fw-500 text-dark-gray">
                          We make you feel special
                        </div>
                      </div>
                      <h4 className="text-dark-gray fw-500 mb-20px w-90 lg-w-100">
                        Unique and quirky designs for the latest trends product.
                      </h4>
                      <p className="w-90">
                        Lorem ipsum is simply dummy text of the printing and
                        typesetting industry lorem ipsum has been the standard
                        dummy text.
                      </p>
                      <div>
                        <div className="feature-box feature-box-left-icon-middle mb-10px">
                          <div className="feature-box-icon feature-box-icon-rounded w-30px h-30px rounded-circle bg-very-light-gray me-10px">
                            <i className="fa-solid fa-check fs-12 text-dark-gray"></i>
                          </div>
                          <div className="feature-box-content">
                            <span className="d-block text-dark-gray fw-500">
                              Made from soft yet durable 100% organic cotton
                              twill.
                            </span>
                          </div>
                        </div>
                        <div className="feature-box feature-box-left-icon-middle mb-10px">
                          <div className="feature-box-icon feature-box-icon-rounded w-30px h-30px rounded-circle bg-very-light-gray me-10px">
                            <i className="fa-solid fa-check fs-12 text-dark-gray"></i>
                          </div>
                          <div className="feature-box-content">
                            <span className="d-block text-dark-gray fw-500">
                              Front and back yoke seams allow a full range of
                              shoulder.
                            </span>
                          </div>
                        </div>
                        <div className="feature-box feature-box-left-icon-middle mb-10px">
                          <div className="feature-box-icon feature-box-icon-rounded w-30px h-30px rounded-circle bg-very-light-gray me-10px">
                            <i className="fa-solid fa-check fs-12 text-dark-gray"></i>
                          </div>
                          <div className="feature-box-content">
                            <span className="d-block text-dark-gray fw-500">
                              Interior storm flap and zipper garage at chin for
                              comfort.
                            </span>
                          </div>
                        </div>
                        <div className="feature-box feature-box-left-icon-middle">
                          <div className="feature-box-icon feature-box-icon-rounded w-30px h-30px rounded-circle bg-very-light-gray me-10px">
                            <i className="fa-solid fa-check fs-12 text-dark-gray"></i>
                          </div>
                          <div className="feature-box-content">
                            <span className="d-block text-dark-gray fw-500">
                              Color may slightly vary depending on your screen.
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-8">
                      <img
                        src="https://via.placeholder.com/580x555"
                        alt=""
                        className="w-100"
                      />
                    </div>
                  </div>
                </div>

                <div className="tab-pane fade in" id="tab_five2">
                  <div className="row m-0">
                    <div className="col-12">
                      <div className="row">
                        <div className="col-lg-2 col-md-3 col-sm-4 pt-10px pb-10px xs-pb-0 text-dark-gray fw-500">
                          Color:
                        </div>
                        <div className="col-lg-10 col-md-9 col-sm-8 pt-10px pb-10px xs-pt-0">
                          Black, yellow
                        </div>
                      </div>
                      <div className="row bg-very-light-gray">
                        <div className="col-lg-2 col-md-3 col-sm-4 pt-10px pb-10px xs-pb-0 text-dark-gray fw-500">
                          Style/Type:
                        </div>
                        <div className="col-lg-10 col-md-9 col-sm-8 pt-10px pb-10px xs-pt-0">
                          Sports, Formal
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-2 col-md-3 col-sm-4 pt-10px pb-10px xs-pb-0 text-dark-gray fw-500">
                          Lining:
                        </div>
                        <div className="col-lg-10 col-md-9 col-sm-8 pt-10px pb-10px xs-pt-0">
                          100% polyester taffeta with a DWR finish
                        </div>
                      </div>
                      <div className="row bg-very-light-gray">
                        <div className="col-lg-2 col-md-3 col-sm-4 pt-10px pb-10px xs-pb-0 text-dark-gray fw-500">
                          Material:
                        </div>
                        <div className="col-lg-10 col-md-9 col-sm-8 pt-10px pb-10px xs-pt-0">
                          Lather, Cotton, Silk
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-2 col-md-3 col-sm-4 pt-10px pb-10px xs-pb-0 text-dark-gray fw-500">
                          Free shipping:
                        </div>
                        <div className="col-lg-10 col-md-9 col-sm-8 pt-10px pb-10px xs-pt-0">
                          On all orders over $50
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="tab-pane fade in" id="tab_five3">
                  <div className="row">
                    <div className="col-12 col-md-6 last-paragraph-no-margin sm-mb-30px">
                      <div className="fs-22 text-dark-gray mb-15px fw-500">
                        Shipping information
                      </div>
                      <p className="mb-0">
                        <span className="fw-500 text-dark-gray">Standard:</span>{' '}
                        Arrives in 5-8 business days
                      </p>
                      <p>
                        <span className="fw-500 text-dark-gray">Express:</span>{' '}
                        Arrives in 2-3 business days
                      </p>
                      <p className="w-80 md-w-100">
                        These shipping rates are not applicable for orders
                        shipped outside of the US. Some oversized items may
                        require an additional shipping charge. Free Shipping
                        applies only to merchandise taxes and gift cards do not
                        count toward the free shipping total.
                      </p>
                    </div>
                    <div className="col-12 col-md-6 last-paragraph-no-margin">
                      <div className="fs-22 text-dark-gray mb-15px fw-500">
                        Return information
                      </div>
                      <p className="w-80 md-w-100">
                        Orders placed between 10/1/2023 and 12/23/2023 can be
                        returned by 2/27/2023.
                      </p>
                      <p className="w-80 md-w-100">
                        Return or exchange any unused or defective merchandise
                        by mail or at one of our US or Canada store locations.
                        Returns made within 30 days of the order delivery date
                        will be issued a full refund to the original form of
                        payment.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="tab-pane fade in" id="tab_five4">
                  <div className="row g-0 mb-4 md-mb-35px">
                    <div className="toolbar-wrapper d-flex flex-column flex-md-row align-items-end w-100  md-mb-30px pb-15px">
                      <div className="mx-auto me-md-0">
                        <select
                          className="fs-18 form-select border-1 border-black w-150 text-black"
                          aria-label="Default sorting"
                        >
                          <option selected>베스트순</option>
                          <option value="2">최근 등록순</option>
                          <option value="3">평점 높은순</option>
                          <option value="4">평점 낮은순</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-12 border-bottom border-color-extra-medium-gray pb-40px mb-40px xs-pb-30px xs-mb-30px">
                      <div className="d-block d-md-flex w-100 align-items-center">
                        <div className="w-300px md-w-250px sm-w-100 sm-mb-10px text-center">
                          <img
                            src={ShopDetailImage3}
                            className="w-90px mb-10px"
                            alt=""
                          />
                          <span className="text-dark-gray fw-600 d-block">
                            Herman miller@gmail.com
                          </span>
                          <div className="fs-14 lh-18">2025.02.01</div>
                        </div>
                        <div className="w-100 last-paragraph-no-margin sm-ps-0 position-relative text-center text-md-start">
                          <span className="text-golden-yellow mb-5px sm-me-10px sm-mb-0 d-inline-block d-md-block">
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                          </span>

                          <p className="w-85 sm-w-100 sm-mt-15px">
                            Lorem ipsum dolor sit sed do eiusmod tempor
                            incididunt labore enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 border-bottom border-color-extra-medium-gray pb-40px mb-40px xs-pb-30px xs-mb-30px">
                      <div className="d-block d-md-flex w-100 align-items-center">
                        <div className="w-300px md-w-250px sm-w-100 sm-mb-10px text-center">
                          <img
                            src={ShopDetailImage3}
                            className="w-90px mb-10px"
                            alt=""
                          />
                          <span className="text-dark-gray fw-600 d-block">
                            Herman miller@gmail.com
                          </span>
                          <div className="fs-14 lh-18">2025.02.01</div>
                        </div>
                        <div className="w-100 last-paragraph-no-margin sm-ps-0 position-relative text-center text-md-start">
                          <span className="text-golden-yellow mb-5px sm-me-10px sm-mb-0 d-inline-block d-md-block">
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                          </span>

                          <p className="w-85 sm-w-100 sm-mt-15px">
                            Lorem ipsum dolor sit sed do eiusmod tempor
                            incididunt labore enim ad minim veniamnisi ut
                            aliquip ex ea commodo consequat. Duis aute irure
                            dolor in reprehenderit in voluptate velit esse
                            cillum dolore eu fugiat nulla pariatur. Excepteur
                            sint occaecat cupidatat non proident.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 border-bottom border-color-extra-medium-gray pb-40px mb-40px xs-pb-30px md-mb-25px">
                      <div className="d-block d-md-flex w-100 align-items-center">
                        <div className="w-300px md-w-250px sm-w-100 sm-mb-10px text-center">
                          <img
                            src={ShopDetailImage3}
                            className="w-90px mb-10px"
                            alt=""
                          />
                          <span className="text-dark-gray fw-600 d-block">
                            Herman miller@gmail.com
                          </span>
                          <div className="fs-14 lh-18">2025.02.01</div>
                        </div>
                        <div className="w-100 last-paragraph-no-margin sm-ps-0 position-relative text-center text-md-start">
                          <span className="text-golden-yellow mb-5px sm-me-10px sm-mb-0 d-inline-block d-md-block">
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                          </span>

                          <p className="w-85 sm-w-100 sm-mt-15px">
                            Lorem ipsum dolor sit sed do eiusmod tempor
                            incididunt labore enim adquis nostrud exercitation
                            ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non
                            proident.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 last-paragraph-no-margin text-center">
                      <a
                        href="#"
                        className="btn btn-link btn-hover-animation-switch btn-extra-large text-dark-gray"
                      >
                        <span>
                          <span className="btn-text">더보기</span>
                          <span className="btn-icon">
                            <i className="fa-solid fa-chevron-down"></i>
                          </span>
                          <span className="btn-icon">
                            <i className="fa-solid fa-chevron-down"></i>
                          </span>
                        </span>
                      </a>
                    </div>
                  </div>

                  {/* <div className="row justify-content-center">
                    <div className="col-12">
                      <div className="p-7 lg-p-5 sm-p-7 bg-very-light-gray">
                        <div className="row justify-content-center mb-30px sm-mb-10px">
                          <div className="col-md-9 text-center">
                            <h4 className="text-dark-gray fw-500 mb-15px">
                              Add a review
                            </h4>
                          </div>
                        </div>
                        <form
                          action="email-templates/contact-form.php"
                          method="post"
                          className="row contact-form-style-02"
                        >
                          <div className="col-lg-5 col-md-6 mb-20px">
                            <label className="form-label mb-15px">
                              Your name*
                            </label>
                            <input
                              className="input-name border-radius-4px form-control required"
                              type="text"
                              name="name"
                              placeholder="Enter your name"
                            />
                          </div>
                          <div className="col-lg-5 col-md-6 mb-20px">
                            <label className="form-label mb-15px">
                              Your email address*
                            </label>
                            <input
                              className="border-radius-4px form-control required"
                              type="email"
                              name="email"
                              placeholder="Enter your email address"
                            />
                          </div>
                          <div className="col-lg-2 mb-20px">
                            <label className="form-label">Your rating*</label>
                            <div>
                              <span className= icon-small d-block mt-20px md-mt-0">
                                <i className="feather icon-feather-star text-golden-yellow"></i>
                                <i className="feather icon-feather-star text-golden-yellow"></i>
                                <i className="feather icon-feather-star text-golden-yellow"></i>
                                <i className="feather icon-feather-star text-golden-yellow"></i>
                                <i className="feather icon-feather-star text-golden-yellow"></i>
                              </span>
                            </div>
                          </div>
                          <div className="col-md-12 mb-20px">
                            <label className="form-label mb-15px">
                              Your review
                            </label>
                            <textarea
                              className="border-radius-4px form-control"
                              cols="40"
                              rows="4"
                              name="comment"
                              placeholder="Your message"
                            ></textarea>
                          </div>
                          <div className="col-lg-9 md-mb-25px">
                            <div className="position-relative terms-condition-box text-start is-invalid mt-10px">
                              <label className="d-inline-block">
                                <input
                                  type="checkbox"
                                  name="terms_condition"
                                  id="terms_condition"
                                  value="1"
                                  className="terms-condition check-box align-middle required"
                                />
                                <span className="box fs-15">
                                  I accept the crafto terms and conditions and I
                                  have read the privacy policy.
                                </span>
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-3 text-start text-lg-end">
                            <input type="hidden" name="redirect" value="" />
                            <button
                              className="btn btn-dark-gray btn-small btn-box-shadow btn-round-edge submit"
                              type="submit"
                            >
                              Submit review
                            </button>
                          </div>
                          <div className="col-12">
                            <div className="form-results mt-20px d-none"></div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="w-40">
          <div className="modal-content p-0 rounded shadow-lg">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="p-10 sm-p-7 bg-white">
                  <div className="row justify-content-center">
                    <div className="col-md-9 text-center">
                      <h6 className="text-dark-gray fw-500 mb-15px">
                        장바구니에 추가되었습니다.
                      </h6>
                    </div>
                    <div className="col-lg-12 text-center text-lg-center pt-3">
                      <input type="hidden" name="redirect" value="" />
                      <button
                        className="btn btn-white btn-large btn-box-shadow btn-round-edge submit me-1"
                        onClick={() => nextCartPage()}
                      >
                        장바구니로 넘어가기
                      </button>
                      <button
                        className="btn btn-white btn-large btn-box-shadow btn-round-edge submit me-1"
                        onClick={() => setIsModalOpen(false)}
                      >
                        닫기
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ShopPage;
