import { Link, useLocation } from 'react-router-dom';
import Button from '@/components/common/Button/Button';
import PaymentDue from '@/components/Order/PaymentDue';
import OrderEmptyComponents from '@/components/Order/OrderEmptyComponents';
import OrderListComponents from '@/components/Order/OrderListComponents';
import CartImage1 from '@/assets/images/sample/cart-image1.jpg';
import AnimatedSection from '@/components/AnimatedSection';

import { useState } from 'react';

const CheckOutPage = () => {
  const [order, setOrder] = useState(true);
  const location = useLocation();

  const getMessageByPath = (pathname) => {
    if (pathname.includes('/checkout')) {
      return '주문';
    } else {
      return '장바구니';
    }
  };

  return (
    <>
      <AnimatedSection>
        <section className="top-space-margin half-section bg-gradient-very-light-gray">
          <div className="container">
            <div
              className="row align-items-center justify-content-center"
              data-anime='{ "el": "childs", "translateY": [-15, 0], "opacity": [0,1], "duration": 300, "delay": 0, "staggervalue": 200, "easing": "easeOutQuad" }'
            >
              <div className="col-12 col-xl-8 col-lg-10 text-center position-relative page-title-extra-large">
                <h1 className="fw-600 text-dark-gray mb-10px">주문/결제</h1>
              </div>
            </div>
          </div>
        </section>

        <section className="pt-0 ">
          <div className="container text-decoration-line-bottom pb-3">
            <div className="row align-items-start">
              <div className="col-lg-12 pe-50px md-pe-15px md-mb-50px xs-mb-35px">
                <div className="row align-items-center">
                  <div className="col-12">
                    <table className="table cart-products">
                      <thead>
                        <tr>
                          <th scope="col" className="fw-600">
                            상품명
                          </th>
                          <th scope="col"></th>
                          <th scope="col" className="fw-600">
                            개수
                          </th>
                          <th scope="col" className="fw-600">
                            배송비
                          </th>
                          <th scope="col" className="fw-600">
                            할인 금액
                          </th>
                          <th scope="col" className="fw-600">
                            금액
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="product-thumbnail">
                            <a href="demo-jewellery-store-single-product.html">
                              <img
                                className="cart-product-image"
                                src={CartImage1}
                                alt=""
                              />
                            </a>
                          </td>
                          <td className="product-name">
                            <a
                              href="demo-jewellery-store-single-product.html"
                              className="text-dark-gray fw-500 d-block lh-initial"
                            >
                              QR Code
                            </a>
                          </td>

                          <td className="product-quantity" data-title="개수">
                            1개
                          </td>
                          <td className="product-price" data-title="배송비">
                            0원
                          </td>
                          <td className="product-price" data-title="할인금액">
                            20,000원
                          </td>

                          <td className="product-subtotal" data-title="가격">
                            100,000원
                          </td>
                        </tr>
                        <tr>
                          <td className="product-thumbnail">
                            <a href="demo-jewellery-store-single-product.html">
                              <img
                                className="cart-product-image"
                                src={CartImage1}
                                alt=""
                              />
                            </a>
                          </td>
                          <td className="product-name">
                            <a
                              href="demo-jewellery-store-single-product.html"
                              className="text-dark-gray fw-500 d-block lh-initial"
                            >
                              QR Code
                            </a>
                          </td>

                          <td className="product-quantity" data-title="개수">
                            1개
                          </td>
                          <td className="product-price" data-title="배송비">
                            0원
                          </td>
                          <td className="product-price" data-title="할인금액">
                            20,000원
                          </td>

                          <td className="product-subtotal" data-title="가격">
                            100,000원
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="bg-very-light-gray border-radius-6px p-50px xl-p-30px lg-p-25px">
                  <span className="fs-26 fw-600 text-dark-gray mb-5px d-block">
                    주문 총계
                  </span>
                  <table className="w-100 total-price-table">
                    <tbody>
                      <tr>
                        <th className="w-45 fw-600 text-dark-gray">개수</th>
                        <td className="text-dark-gray fw-600">2개</td>
                      </tr>
                      <tr>
                        <th className="w-45 fw-600 text-dark-gray">
                          상품 금액
                        </th>
                        <td className="text-dark-gray fw-600">200,000원</td>
                      </tr>
                      <tr>
                        <th className="w-45 fw-600 text-dark-gray">
                          할인 금액
                        </th>
                        <td className="text-dark-gray fw-600">40,000원</td>
                      </tr>
                      <tr>
                        <th className="w-45 fw-600 text-dark-gray">배송비</th>
                        <td className="text-dark-gray fw-600">0원</td>
                      </tr>

                      <tr className="total-amount">
                        <th className="fw-600 text-dark-gray pb-0">총 금액</th>
                        <td className="pb-0" data-title="Total">
                          <h6 className="d-block fw-700 mb-0 text-dark-gray">
                            160,000원
                          </h6>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pt-0 pb-0">
          <div className="container ">
            <div className="row align-items-start ">
              <div className="col-lg-12 md-pe-15px md-mb-50px xs-mb-35px text-decoration-line-bottom pb-5">
                <span className="fs-26 fw-600 text-dark-gray mb-20px d-block">
                  배송지 정보
                </span>
                <form className="">
                  <div className="row">
                    <div className="col-12 mb-20px">
                      <div className="row d-flex justify-content-end m-0">
                        <input
                          className="d-none col-9 border-radius-4px input-small"
                          type="text"
                          aria-label="first-name"
                          required
                        />
                        <Button
                          size="small"
                          radiusOn="radius-on"
                          color="black"
                          className="col-3 btn w-20 btn-round-edge"
                        >
                          배송지 변경
                        </Button>
                      </div>
                    </div>

                    <div className="col-12 mb-20px">
                      <label className="mb-10px">이름</label>
                      <input
                        className="border-radius-4px input-small"
                        type="text"
                        aria-label="first-name"
                        required
                      />
                    </div>
                    <div className="col-12 mb-20px">
                      <label className="mb-10px">핸드폰번호</label>
                      <input
                        className="border-radius-4px input-small"
                        type="text"
                        aria-label="first-name"
                        required
                      />
                    </div>

                    <div className="col-12 mb-20px">
                      <label className="col-12">배송주소</label>
                      <div className="row d-flex justify-content-between m-0">
                        <input
                          className="col-9 border-radius-4px input-small"
                          type="text"
                          aria-label="first-name"
                          required
                        />
                        <Button
                          size="small"
                          radiusOn="radius-on"
                          color="black"
                          className="col-3 btn w-20 d-block btn-round-edge"
                        >
                          주소 찾기
                        </Button>
                      </div>
                      <input
                        className="col-12 border-radius-4px input-small mt-1"
                        type="text"
                        aria-label="first-name"
                        required
                      />
                      <input
                        className="col-12 border-radius-4px input-small mt-1"
                        type="text"
                        aria-label="first-name"
                        required
                      />
                    </div>

                    <div className="col-md-12 mb-2 checkout-accordion">
                      <div className="position-relative terms-condition-box text-start d-flex align-items-center">
                        <label>
                          <input
                            type="checkbox"
                            name="terms_condition"
                            value="1"
                            className="check-box align-middle"
                          />
                          <span className="box">기본 배송지로 저장</span>
                          <a
                            className="accordion-toggle"
                            data-bs-toggle="collapse"
                            data-bs-parent="#accordion1"
                            href="#collapseThree"
                          ></a>
                        </label>
                      </div>
                    </div>

                    <div className="col-12">
                      <label className="mb-10px">배송메시지</label>
                      <textarea
                        className="border-radius-4px textarea-small"
                        rows="5"
                        cols="5"
                        placeholder=""
                      ></textarea>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container ">
            <div className="row row-cols-1 row-cols-lg-4 row-cols-sm-2 justify-content-center pb-5">
              <div className="col icon-with-text-style-07 transition-inner-all md-mb-30px ">
                <div
                  className="bg-white feature-box h-100 justify-content-start  box-shadow-quadruple-large-hover text-center p-17 sm-p-14 border border-2 border-black border-radius-10px"
                  role="button"
                >
                  <div className="feature-box-icon mb-30px">
                    <i className="line-icon-Credit-Card2 icon-large text-dark-gray"></i>
                  </div>
                  <div className="feature-box-content">
                    <span className="d-inline-block fw-600 text-dark-gray fs-18">
                      신용카드
                    </span>

                    <a
                      href="#"
                      className="btn btn-link btn-hover-animation-switch btn-extra-large text-base-color fw-600 text-uppercase-inherit"
                    ></a>
                  </div>
                </div>
              </div>
              <div className="col icon-with-text-style-07 transition-inner-all md-mb-30px">
                <div
                  className="bg-white feature-box h-100 justify-content-start box-shadow-quadruple-large-hover text-center p-17 sm-p-14 border border-2 border-black border-radius-10px"
                  role="button"
                >
                  <div className="feature-box-icon mb-30px">
                    <i className="line-icon-Bank icon-large text-dark-gray"></i>
                  </div>
                  <div className="feature-box-content">
                    <span className="d-inline-block fw-600 text-dark-gray fs-18 ls-minus-05px">
                      계좌이체
                    </span>

                    <a
                      href="#"
                      className="btn btn-link btn-hover-animation-switch btn-extra-large text-base-color fw-600 text-uppercase-inherit"
                    ></a>
                  </div>
                </div>
              </div>
              <div className="col icon-with-text-style-07 transition-inner-all xs-mb-30px">
                <div
                  className="bg-white feature-box h-100 justify-content-start box-shadow-quadruple-large-hover text-center p-17 sm-p-14 border border-2 border-black border-radius-10px"
                  role="button"
                >
                  <div className="feature-box-icon mb-30px">
                    <i className="line-icon-Money-2 icon-large text-dark-gray"></i>
                  </div>
                  <div className="feature-box-content">
                    <span className="d-inline-block fw-600 text-dark-gray fs-18 ls-minus-05px">
                      무통장입금
                    </span>

                    <a
                      href="#"
                      className="btn btn-link btn-hover-animation-switch btn-extra-large text-base-color fw-600 text-uppercase-inherit"
                    ></a>
                  </div>
                </div>
              </div>
              <div className="col icon-with-text-style-07 transition-inner-all">
                <div
                  className="bg-white feature-box h-100 justify-content-start box-shadow-quadruple-large-hover text-center p-17 sm-p-14 border border-2 border-black border-radius-10px"
                  role="button"
                >
                  <div className="feature-box-icon mb-30px">
                    <i className="line-icon-Smartphone-3 icon-large text-dark-gray"></i>
                  </div>
                  <div className="feature-box-content">
                    <span className="d-inline-block fw-600 text-dark-gray fs-18 ls-minus-05px">
                      휴대폰결제
                    </span>

                    <a
                      href="#"
                      className="btn btn-link btn-hover-animation-switch btn-extra-large text-base-color fw-600 text-uppercase-inherit"
                    ></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <Link
                to="/complete"
                className="btn btn-dark-gray btn-large btn-switch-text btn-round-edge btn-box-shadow w-100 "
              >
                <span>
                  <span className="btn-double-text" data-text="결제하기">
                    결제하기
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </>
  );
};

export default CheckOutPage;
