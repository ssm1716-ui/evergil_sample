import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Modal from '@/components/common/Modal/Modal';
import LoginModal from '@/components/common/Modal/LoginModal';
import MobileBuyPanel from '@/components/Shop/MobileBuyPanel';
import { getCart, addCart } from '@/api/memberApi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

import {
  getProductDetailSelected,
  getProductReviewsSelected,
} from '@/api/products/productsApi';

import { postAddCart } from '@/api/member/cartApi';

import useAuth from '@/hooks/useAuth';
import { formatDate, getTransformedCartData } from '@/utils/utils';

const ShopPage = () => {
  const { isAuthenticated, user } = useAuth();
  const { id } = useParams(); //URL에서 :id 값 가져오기
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [mainSwiper, setMainSwiper] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
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
        console.log(data);

        setProduct(data.data);
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
    if (quantity <= 1) return;
    setQuantity((prevQty) => {
      const newQty = prevQty - 1;
      setProduct((prevProduct) => ({ ...prevProduct, quantity: newQty }));
      return newQty;
    });
  };
  const handlePlus = () => {
    setQuantity((prevQty) => {
      const newQty = prevQty + 1;
      setProduct((prevProduct) => ({ ...prevProduct, quantity: newQty }));
      return newQty;
    });
  };

  //로컬스토리지에 장바구니 추가
  const handleCartAdd = async () => {
    const updatedProduct = { ...product, quantity }; // 🔥 새 객체 생성하여 qty 추가
    setProduct(updatedProduct); // 상태 업데이트

    if (isAuthenticated) {
      //로그인 유저는 DB에 저장
      const transformedData = getTransformedCartData([updatedProduct]);
      const res = await postAddCart(transformedData);
      if (res.status !== 200) {
        console.log('not saved cart!');
      }
    } else {
      //게스트는 로컬스토리지에 저장
      addCart(updatedProduct);
    }
    setIsModalOpen(true);
  };

  const nextCartPage = () => {
    navigate('/cart');
  };

  const handleBuyNow = async (e) => {
    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
      return;
    }
    e.preventDefault();
    const updatedProduct = { ...product, quantity };
    const transformedData = getTransformedCartData([updatedProduct]);
    const res = await postAddCart(transformedData);
    if (res.status !== 200) {
      console.log('not saved cart!');
    }
    navigate('/checkout', {
      state: { orderType: 'direct', product: updatedProduct },
    });
  };

  const handleChangeSort = async (e) => {
    const type = e.target.value;
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
      <section>
        <div className="container">
          <div
            className="row align-items-center justify-content-center"
            data-anime='{ "el": "childs", "translateY": [-15, 0], "opacity": [0,1], "duration": 300, "delay": 0, "staggervalue": 200, "easing": "easeOutQuad" }'
          >
            <div className="col-12 col-xl-8 col-lg-10 text-center position-relative page-title-extra-large">
              {/* <h1 className="fw-600 text-dark-gray mb-10px">구매하기</h1> */}
            </div>
            <div className="col-12 breadcrumb breadcrumb-style-01 d-flex justify-content-center"></div>
          </div>
        </div>
      </section>

      <section className="py-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 pe-50px md-pe-15px md-mb-40px sm-mb-0">
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
                    className="product-image-slider product-main-image-box"
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
              <span className="fw-500 text-dark-gray d-block">
                {product.deliveryFee > 0 ? (
                  `배송비 ${Number(product.deliveryFee).toLocaleString()}원`
                ) : (
                  <span className="free_btn">
                    <span className="free_txt">무료배송</span>
                  </span>
                )}
              </span>

              <h5 className="text-dark-gray fw-500 mb-5px sm-mb-0 fs-26 sm-fs-23">
                {product.productName}
              </h5>
              <div className="d-block d-sm-flex align-items-center mb-15px sm-mb-0">
                <div className="me-10px xs-me-0">
                  <a
                    href="#tab"
                    className="d-block section-link me-25px text-dark-gray fw-500 section-link xs-me-0 w-100 fs-13"
                  >
                    <i className="bi bi-star-fill text-golden-yellow pe-1 fs-14"></i>
                    리뷰 {product.totalReviewCount}건
                  </a>
                </div>

                <div></div>
              </div>
              <div className="product-price mb-10px">
                <span className="text-dark-gray fs-20 xs-fs-24 fw-700">
                  <del className="text-medium-gray me-10px fw-400 fs-20">
                    {Number(product.price).toLocaleString()}원
                  </del>
                  {Number(product.discountedPrice).toLocaleString()}원
                </span>
              </div>
              <p className="mb-30px fs-18" style={{ whiteSpace: 'pre-line' }}>
                {product.description}
              </p>
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
                    value={quantity}
                    aria-label="qty-text"
                    readOnly
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
                  className="btn btn-cart btn-extra-large btn-switch-text btn-box-shadow btn-none-transform btn-dark-gray left-icon btn-round-edge border-0 me-5px xs-me-0 order-2 order-sm w-40 d-lg-block d-md-none d-sm-none"
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
                  className="wishlist d-flex align-items-center justify-content-center border border-radius-5px border-color-extra-medium-gray order-2 order-sm-3 w-20 sm-w-30"
                >
                  <i className="feather icon-feather-share-2 align-middle text-dark-gray"></i>
                </a>
              </div>

              <div className="d-flex align-items-center flex-column flex-sm-row mb-20px position-relative d-lg-block d-md-none d-sm-none">
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

      <section id="tab" className="pt-4 md-pt-0">
        <div className="container">
          <div className="row">
            <div className="col-12 tab-style-09 md-pt-30px">
              <ul className="nav nav-tabs border-0 fs-19">
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
              <div className="mb-5 h-1px w-100 bg-extra-medium-gray xs-mb-8"></div>
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
                      <div className="fs-22 md-fs-18 text-dark-gray mb-15px md-mb-10px fw-500">
                        배송 기간 안내
                      </div>

                      <p className="w-80 md-w-100 md-fs-16 sm-fs-14 md-lh-28">
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
                      <div className="fs-22 md-fs-18 text-dark-gray mb-15px md-mb-10px fw-500">
                        교환 및 환불 정책
                      </div>
                      <p className="w-80 md-w-100 md-fs-16 sm-fs-14 md-lh-28">
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
                      <p className="w-80 md-w-100 md-fs-16 sm-fs-14 md-lh-28">
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
                      <div className="toolbar-wrapper d-flex flex-column align-items-end w-100 md-mb-30px pb-15px">
                        <div className="me-md-0 text-end">
                          <select
                            className="fs-18 form-select border-1 border-black w-150 text-black py-0 px-10"
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

                    <div className="d-none d-md-block">
                      {reviews.length > 0 ? (
                        reviews.map((review, index) => (
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
                      ) : (
                        <p>등록된 리뷰가 없습니다.</p>
                      )}
                    </div>

                    <div className="d-block d-md-none">
                      {reviews.length > 0 ? (
                        reviews.map((review, index) => (
                          <div
                            className="col-12 border-bottom border-color-extra-medium-gray pb-10px mb-10px position-relative"
                            key={index}
                            style={{ minHeight: '120px' }}
                          >
                            {/* ✅ 오른쪽 상단 이미지 */}
                            {review.image1 && (
                              <img
                                src={review.image1}
                                alt="리뷰 이미지"
                                style={{
                                  width: '90px',
                                  height: '60px',
                                  objectFit: 'cover',
                                  // borderRadius: '8px',
                                  position: 'absolute',
                                  top: '0px',
                                  right: '0px',
                                }}
                              />
                            )}

                            {/* ✅ 리뷰 텍스트 영역 */}
                            <div className="pe-100px">
                              {' '}
                              {/* 이미지 공간 확보 */}
                              <span className="text-dark-gray fw-600 d-block fs-12">
                                {review.email} / {formatDate(review.createdAt)}
                              </span>
                              <span className="text-golden-yellow d-block fs-13">
                                {Array.from({ length: 5 }, (_, i) => (
                                  <i
                                    key={i}
                                    className={`bi ${
                                      i < review.rate ? 'bi-star-fill' : ''
                                    }`}
                                  ></i>
                                ))}
                              </span>
                              <p className="fs-12 mb-0">{review.content}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>등록된 리뷰가 없습니다.</p>
                      )}
                    </div>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <MobileBuyPanel
        productName={product.productName}
        productPrice={product.price}
        quantity={quantity}
        handleMinus={handleMinus}
        handlePlus={handlePlus}
        handleCartAdd={handleCartAdd}
        handleBuyNow={handleBuyNow}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="w-40 md-w-90">
          <div className="modal-content p-0 rounded shadow-lg">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="p-10 sm-p-7 bg-white">
                  <div className="row justify-content-center">
                    <div className="col-md-9 text-center">
                      <h6 className="text-dark-gray fw-500 mb-15px md-fs-16">
                        장바구니에 추가되었습니다.
                      </h6>
                    </div>
                    <div className="col-lg-12 text-center text-lg-center pt-3">
                      <input type="hidden" name="redirect" value="" />
                      <button
                        className="btn btn-white btn-large btn-box-shadow border-1 border-black w-45 sm-w-100 me-1 mb-3"
                        onClick={() => nextCartPage()}
                      >
                        장바구니로 넘어가기
                      </button>
                      <button
                        className="btn btn-white btn-large btn-box-shadow border-1 border-black w-45 sm-w-100 me-1 mb-3"
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
      {!isAuthenticated && isLoginModalOpen && (
        <LoginModal onClose={() => setIsLoginModalOpen(false)} />
      )}
    </>
  );
};

export default ShopPage;
