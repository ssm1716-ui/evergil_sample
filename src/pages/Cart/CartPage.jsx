import { Link, useLocation } from 'react-router-dom';
import Button from '@/components/common/Button/Button';
import PaymentDue from '@/components/Order/PaymentDue';
import OrderEmptyComponents from '@/components/Order/OrderEmptyComponents';
import OrderListComponents from '@/components/Order/OrderListComponents';
import CartImage1 from '@/assets/images/sample/cart-image1.jpg';
import AnimatedSection from '@/components/AnimatedSection';

import { useState } from 'react';

const CartPage = () => {
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
                <h1 className="fw-600 text-dark-gray mb-10px">장바구니</h1>
              </div>
              <div className="col-12 breadcrumb breadcrumb-style-01 d-flex justify-content-center"></div>
            </div>
          </div>
        </section>

        <section className="pt-0">
          <div className="container">
            <div className="row align-items-start">
              <div className="col-lg-8 pe-50px md-pe-15px md-mb-50px xs-mb-35px">
                <div className="row mb-20px">
                  <div className="col-12 text-center text-md-end sm-mt-15px d-flex justify-content-between">
                    <a
                      href="#"
                      className="btn btn-small border-1 btn-round-edge btn-transparent-light-gray text-transform-none me-15px lg-me-5px "
                    >
                      전체선택
                    </a>
                    <a
                      href="#"
                      className="btn btn-small border-1 btn-round-edge btn-transparent-light-gray text-transform-none"
                    >
                      선택 삭제
                    </a>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-12">
                    <table className="table cart-products">
                      <thead>
                        <tr>
                          <th scope="col"></th>
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
                          <td className="product-checkbox">
                            <input
                              type="checkbox"
                              name="terms_condition"
                              id="terms_condition"
                              className="terms-condition check-box align-middle required"
                            />
                          </td>
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
                            <div className="quantity">
                              <button type="button" className="qty-minus">
                                -
                              </button>
                              <input
                                className="qty-text"
                                type="text"
                                id="1"
                                value="1"
                                aria-label="qty-text"
                              />
                              <button type="button" className="qty-plus">
                                +
                              </button>
                            </div>
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
                          <td className="product-checkbox">
                            <input
                              type="checkbox"
                              name="terms_condition"
                              id="terms_condition"
                              className="terms-condition check-box align-middle required"
                            />
                          </td>
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
                            <div className="quantity">
                              <button type="button" className="qty-minus">
                                -
                              </button>
                              <input
                                className="qty-text"
                                type="text"
                                id="1"
                                value="1"
                                aria-label="qty-text"
                              />
                              <button type="button" className="qty-plus">
                                +
                              </button>
                            </div>
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
              <div className="col-lg-4">
                <div className="bg-very-light-gray border-radius-6px p-50px xl-p-30px lg-p-25px">
                  <span className="fs-26 fw-600 text-dark-gray mb-5px d-block">
                    장바구니 총계
                  </span>
                  <table className="w-100 total-price-table">
                    <tbody>
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
                  <a
                    href="/checkout"
                    className="btn btn-dark-gray btn-large btn-switch-text btn-round-edge btn-box-shadow w-100 mt-25px "
                  >
                    <span>
                      <span className="btn-double-text" data-text="주문하기">
                        주문하기
                      </span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </>
  );
};

export default CartPage;
