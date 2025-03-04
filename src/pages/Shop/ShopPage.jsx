import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Modal from '@/components/common/Modal/Modal';
import { addCart } from '@/api/memberApi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

import {
  getProductDetailSelected,
  getProductReviewsSelected,
} from '@/api/products/productsApi';

import { formatDate } from '@/utils/utils';

import sampleImage1 from '@/assets/images/sample/demo-fashion-store-product-detail-01.jpg';
import sampleImage2 from '@/assets/images/sample/demo-fashion-store-product-detail-02.jpg';
import sampleImage3 from '@/assets/images/sample/demo-fashion-store-product-detail-03.jpg';
import sampleImage4 from '@/assets/images/sample/demo-fashion-store-product-detail-04.jpg';

import ShopDetailImage1 from '@/assets/images/shop-detail-image1.png';
import ShopDetailImage2 from '@/assets/images/shop-detail-image2.png';
import ShopDetailImage3 from '@/assets/images/shop-detail-image3.png';
import mainSubImage3 from '@/assets/images/main-sub-image3.png';

const ShopPage = () => {
  const { id } = useParams(); //URL에서 :id 값 가져오기
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [mainSwiper, setMainSwiper] = useState(null);
  const [qty, setQty] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [product, setProduct] = useState({ productImages: [] });
  const [reviews, setReviews] = useState([]);
  const [sortType, setSortType] = useState('BEST');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [more, setMore] = useState(false);
  const navigate = useNavigate();

  // 제품 정보 불러오기
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        let { status, data } = await getProductDetailSelected(id); // API 호출
        if (status !== 200) throw new Error('제품 정보를 불러올 수 없습니다.');

        setProduct(data.data);
        console.log(data.data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchProduct();
  }, [id]);

  // 페이지 번호 변경 시 기존 리뷰에 추가
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { status, data } = await getProductReviewsSelected(
          id,
          sortType,
          pageNumber,
          pageSize
        );
        if (status !== 200) throw new Error('리뷰 정보를 불러올 수 없습니다.');
        console.log(data.data.length);
        data.data.length > 0 ? setMore(true) : setMore(false);

        setReviews((prevReviews) => [...prevReviews, ...data.data]);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchReviews();
  }, [pageNumber]);

  // 정렬 방식 변경 시 새로운 리뷰 목록 불러오기
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { status, data } = await getProductReviewsSelected(
          id,
          sortType,
          1,
          10
        );

        console.log(data.data.length);
        if (status !== 200) throw new Error('리뷰 정보를 불러올 수 없습니다.');
        setReviews(data.data); // 기존 리뷰 초기화하고 새 리뷰 가져옴
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchReviews();
  }, [sortType]); // 🔥 정렬 방식이 바뀔 때만 실행

  // `thumbsSwiper`가 설정될 때까지 `undefined`를 유지
  useEffect(() => {
    if (thumbsSwiper && mainSwiper) {
      mainSwiper.thumbs.swiper = thumbsSwiper;
      mainSwiper.thumbs.init();
      mainSwiper.thumbs.update();
    }
  }, [thumbsSwiper, mainSwiper]);

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
    const updatedProduct = { ...product, qty }; // 🔥 새 객체 생성하여 qty 추가
    setProduct(updatedProduct); // 상태 업데이트
    addCart(updatedProduct);
    setIsModalOpen(true);
  };

  const nextCartPage = () => {
    navigate('/cart');
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    const updatedProduct = { ...product, qty };
    navigate('/checkout', {
      state: { orderType: 'direct', product: updatedProduct },
    });
  };

  const handleChangeSort = async (e) => {
    const type = e.target.value;
    console.log(type);
    setSortType(type);
    setPageSize(10);
    setPageNumber(1);
  };

  const handleChangePageNumber = async () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
    setPageSize((prevPageSize) => pageNumber * prevPageSize);
  };

  return (
    <>
      <section className="top-space-margin big-section">
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
                    onSwiper={setMainSwiper}
                    spaceBetween={10}
                    loop={false} // ✅ 루프 설정
                    loopedSlides={6} // ✅ 루프된 슬라이드 갯수 설정
                    autoplay={{
                      delay: 2000,
                      disableOnInteraction: false,
                    }}
                    navigation={{
                      nextEl: '.slider-product-next',
                      prevEl: '.slider-product-prev',
                    }}
                    watchSlidesProgress={true}
                    watchSlidesVisibility={true}
                    thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
                    modules={[Navigation, Thumbs, Autoplay]}
                    className="product-image-slider"
                  >
                    {(product.productImages || []).map((image, index) => (
                      <SwiperSlide key={index}>
                        <img
                          className="w-100"
                          src={image}
                          alt={`Product ${index + 1}`}
                        />
                      </SwiperSlide>
                    ))}
                    {/* <SwiperSlide>
                      <img
                        className="w-100"
                        src={sampleImage2}
                        alt="Product 2"
                      />
                    </SwiperSlide>
                    */}
                  </Swiper>
                </div>

                {/* Thumbnail Swiper */}
                <div className="col-12 col-lg-2 order-lg-1 position-relative single-product-thumb">
                  <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={15}
                    slidesPerView={4} // ✅ 4개씩 표시
                    direction="vertical"
                    loop={true} // ✅ 루프 추가
                    loopedSlides={6} // ✅ 메인 Swiper와 맞추기
                    watchSlidesProgress={true} // ✅ 활성 썸네일 트래킹
                    watchSlidesVisibility={true} // ✅ 비활성 썸네일도 감지
                    navigation={{
                      nextEl: '.swiper-thumb-next',
                      prevEl: '.swiper-thumb-prev',
                    }}
                    modules={[Navigation, Thumbs]}
                    className="product-image-thumb slider-vertical"
                  >
                    {(product.productImages || []).map((image, index) => (
                      <SwiperSlide key={index}>
                        <img
                          className="w-100"
                          src={image}
                          alt={`Thumb ${index + 1}`}
                        />
                      </SwiperSlide>
                    ))}
                    {/* <SwiperSlide>
                      <img className="w-100" src={sampleImage1} alt="Thumb 1" />
                    </SwiperSlide>
                    */}
                  </Swiper>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-5 product-info">
              <span className="fw-500 text-dark-gray d-block">배송비 무료</span>
              <h4 className="text-dark-gray fw-500 mb-5px">
                {product.productName}
              </h4>
              <div className="d-block d-sm-flex align-items-center mb-15px">
                <div className="me-10px xs-me-0">
                  <a
                    href="#tab"
                    className="d-block section-link icon-small me-25px text-dark-gray fw-500 section-link xs-me-0 w-100"
                  >
                    <i className="bi bi-star-fill text-golden-yellow pe-1"></i>
                    리뷰 {product.totalReviewCount}건
                  </a>
                </div>

                <div></div>
              </div>
              <div className="product-price mb-10px">
                <span className="text-dark-gray fs-28 xs-fs-24 fw-700">
                  <del className="text-medium-gray me-10px fw-400">
                    {Number(product.discountedPrice).toLocaleString()}원
                  </del>
                  {Number(product.price).toLocaleString()}원
                </span>
              </div>
              <p className="mb-30px">{product.description}</p>
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
            <div className="col-12 tab-style-09">
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
                    리뷰 ({product.totalReviewCount})
                    <span className="tab-border bg-dark-gray"></span>
                  </a>
                </li>
              </ul>
              <div className="mb-5 h-1px w-100 bg-extra-medium-gray sm-mt-10px xs-mb-8"></div>
              <div className="tab-content">
                <div className="tab-pane fade in active show" id="tab_five1">
                  <div className="row align-items-center justify-content-center">
                    <div className="col-lg-12 md-mb-40px">
                      <div className="d-flex align-items-center justify-content-center mb-5px">
                        <div className="col fw-500 text-dark-gray w-100 text-center">
                          <img src={product.productDetails} alt="detail" />
                        </div>
                      </div>
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
                        배송 기간 안내
                      </div>

                      <p className="w-80 md-w-100">
                        에버링크 쇼핑몰의 배송기간은 주문 결제 완료 후
                        평균적으로 2~5일 이내에 이루어집니다. (공휴일 및 주말
                        제외) <br /> 기본적으로 국내 배송은 평균 3일 이내
                        소요되며, 도서산간 지역 및 특정 지역의 경우 최대 7일까지
                        소요될 수 있습니다. 주문량 증가, 택배사 사정, 천재지변
                        등으로 인해 배송이 지연될 수 있으며, 이러한 경우
                        고객센터에서 별도로 안내드립니다.
                        <br /> 주문하신 상품은 실시간으로 배송 조회가 가능하며,
                        배송 출발 후에는 주문 변경 및 취소가 불가능하므로 신중한
                        구매를 부탁드립니다. 빠르고 안전한 배송을 위해 최선을
                        다하겠습니다.
                      </p>
                    </div>
                    <div className="col-12 col-md-6 last-paragraph-no-margin">
                      <div className="fs-22 text-dark-gray mb-15px fw-500">
                        교환 및 환불 정책
                      </div>
                      <p className="w-80 md-w-100">
                        상품 수령 후 7일 이내에 교환 신청이 가능합니다. 단,
                        제품의 훼손, 사용 흔적, 라벨 제거 등의 경우 교환이
                        제한될 수 있습니다.
                        <br /> 제품 불량, 오배송 등의 사유로 인한 교환은
                        배송비가 무료이며, 단순 변심에 의한 교환은 왕복 배송비가
                        부과됩니다. 교환을 원하시는 경우, 고객센터 또는
                        마이페이지에서 교환 신청 후 안내에 따라 상품을 포장하여
                        반송해 주시면 됩니다. <br />
                        빠른 처리를 위해 교환 신청 시 제품 상태를 촬영하여
                        첨부해 주시면 더욱 원활한 처리가 가능합니다.
                      </p>
                      <p className="w-80 md-w-100">
                        구매하신 상품은 수령 후 7일 이내에 환불 신청이
                        가능합니다.
                        <br /> 단순 변심으로 인한 환불 요청 시 왕복 배송비가
                        부과될 수 있으며, 제품이 사용되지 않은 상태여야 합니다.
                        불량 및 오배송의 경우 전액 환불이 가능하며, 추가 비용
                        없이 반품 처리가 진행됩니다. <br />
                        환불 신청 후 제품이 정상적으로 반송되면 검수 과정을 거쳐
                        영업일 기준 3~5일 이내 환불 처리가 완료됩니다. 결제
                        수단에 따라 환불 기간이 다를 수 있으며, 신용카드 결제의
                        경우 카드사 정책에 따라 최대 7~10일이 소요될 수
                        있습니다.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="tab-pane fade in" id="tab_five4">
                  <div className="row g-0 mb-4 md-mb-35px">
                    {reviews.length > 0 && (
                      <div className="toolbar-wrapper d-flex flex-column flex-md-row align-items-end w-100  md-mb-30px pb-15px">
                        <div className="mx-auto me-md-0">
                          <select
                            className="fs-18 form-select border-1 border-black w-150 text-black"
                            aria-label="Default sorting"
                            onChange={handleChangeSort}
                          >
                            <option value="BEST" selected>
                              베스트순
                            </option>
                            <option value="NEWEST">최근 등록순</option>
                            <option value="HIGH_RATING">평점 높은순</option>
                            <option value="LOW_RATING">평점 낮은순</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {reviews.length > 0
                      ? reviews.map((review, index) => (
                          <div
                            className="col-12 border-bottom border-color-extra-medium-gray pb-40px mb-40px xs-pb-30px xs-mb-30px"
                            key={index}
                          >
                            <div className="d-block d-md-flex w-100 align-items-center">
                              <div className="w-300px md-w-250px sm-w-100 sm-mb-10px text-center">
                                {review.image1 && (
                                  <img
                                    src={review.image1}
                                    className="w-90px mb-10px"
                                    alt="리뷰 이미지"
                                  />
                                )}
                                <span className="text-dark-gray fw-600 d-block">
                                  {review.email}
                                </span>
                                <div className="fs-14 lh-18">
                                  {formatDate(review.createdAt)}
                                </div>
                              </div>
                              <div className="w-100 last-paragraph-no-margin sm-ps-0 position-relative text-center text-md-start">
                                <span className="text-golden-yellow mb-5px sm-me-10px sm-mb-0 d-block">
                                  {Array.from({ length: 5 }, (_, i) => (
                                    <i
                                      key={i}
                                      className={`bi ${
                                        i < review.rate ? 'bi-star-fill' : ''
                                      }`}
                                    ></i>
                                  ))}
                                </span>
                                {review.image2 && (
                                  <span className="w-80px md-w-80px pe-1">
                                    <img
                                      src={review.image2}
                                      className="w-80px mb-10px"
                                      alt="리뷰 이미지"
                                    />
                                  </span>
                                )}
                                {review.image3 && (
                                  <span className="w-80px md-w-80px pe-1">
                                    <img
                                      src={review.image3}
                                      className="w-80px mb-10px"
                                      alt="리뷰 이미지"
                                    />
                                  </span>
                                )}
                                {review.image4 && (
                                  <span className="w-80px md-w-80px pe-1">
                                    <img
                                      src={review.image4}
                                      className="w-80px mb-10px"
                                      alt="리뷰 이미지"
                                    />
                                  </span>
                                )}
                                {review.image5 && (
                                  <span className="w-80px md-w-80px pe-1">
                                    <img
                                      src={review.image5}
                                      className="w-80px mb-10px"
                                      alt="리뷰 이미지"
                                    />
                                  </span>
                                )}

                                <p className="w-85 sm-w-100 sm-mt-15px">
                                  {review.content}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      : 'test'}

                    {/* 
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
                    </div> */}
                    {more && (
                      <div className="col-12 last-paragraph-no-margin text-center">
                        <a
                          className="btn btn-link btn-hover-animation-switch btn-extra-large text-dark-gray"
                          onClick={handleChangePageNumber}
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
                    )}
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
