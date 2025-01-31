import { Link } from 'react-router-dom';
import Button from '@/components/common/Button/Button';
import CartImage1 from '@/assets/images/sample/cart-image1.jpg';

const CartPage = () => {
  return (
    <>
      {/* <section className="pt-15 sm-pt-40px">
        <div className="container">
          <div className="row">
            <div className="col-12 tab-style-04 p-20px text-black">
              <h6 className="mb-3 fs-40 fw-400 pb-1  border-bottom border-2 border-black text-center">
                장바구니
              </h6>
              <div className="row row-cols-1 row-cols-lg-12 row-cols-sm-12 justify-content-center">
                <div className="col-12 text-center">
                  <div className="feature-box pt-15 text-center overflow-hidden">
                    <div className="feature-box-icon">
                      <i className="line-icon-Shopping-Basket icon-extra-large text-medium-gray"></i>
                    </div>
                    <div className="feature-box-content last-paragraph-no-margin">
                      <p className="text-dark-gray"opacity-5">
                        장바구니에 담긴 상품이 없습니다.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 pt-8 text-center">
                  <Link to="/">
                    <Button
                      size="large"
                      radiusOn="radius-on"
                      className="btn w-25 mt-60px mb-20px d-block"
                    >
                      홈으로
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section className="pt-15">
        <div className="container">
          <h6 className="mb-3 fs-40 fw-400 pb-1  border-bottom border-2 border-black text-center">
            장바구니
          </h6>
          <div className="row align-items-start">
            <div className="col-lg-12 pe-50px md-pe-15px md-mb-50px xs-mb-35px">
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
                        <th scope="col">배송비</th>

                        <th scope="col" className="fw-600">
                          상품 가격
                        </th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="product-checkbox">
                          <input
                            type="checkbox"
                            name="terms_condition"
                            id="terms_condition"
                            value="1"
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
                            Textured sweater
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
                        <td className="product-delivery" data-title="배송비">
                          무료 배송
                        </td>
                        <td className="product-subtotal" data-title="상품가격">
                          $23.00
                        </td>
                        <td className="product-remove">
                          <a href="#" className="fs-20 fw-500">
                            ×
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td className="product-checkbox">
                          <input
                            type="checkbox"
                            name="terms_condition"
                            id="terms_condition"
                            value="1"
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
                            Bermuda shorts
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
                              id="2"
                              value="1"
                              aria-label="qty-text"
                            />
                            <button type="button" className="qty-plus">
                              +
                            </button>
                          </div>
                        </td>
                        <td className="product-delivery" data-title="배송비">
                          무료 배송
                        </td>

                        <td className="product-subtotal" data-title="상품가격">
                          $70.00
                        </td>
                        <td className="product-remove">
                          <a href="#" className="fs-20 fw-500">
                            ×
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td className="product-checkbox">
                          <input
                            type="checkbox"
                            name="terms_condition"
                            id="terms_condition"
                            value="1"
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
                            Pocket sweatshirt
                          </a>
                        </td>

                        <td className="product-quantity" data-title="수량">
                          <div className="quantity">
                            <button type="button" className="qty-minus">
                              -
                            </button>
                            <input
                              className="qty-text"
                              type="text"
                              id="3"
                              value="1"
                              aria-label="qty-text"
                            />
                            <button type="button" className="qty-plus">
                              +
                            </button>
                          </div>
                        </td>
                        <td className="product-delivery" data-title="배송비">
                          무료 배송
                        </td>

                        <td className="product-subtotal" data-title="총 가격">
                          $15.00
                        </td>
                        <td className="product-remove">
                          <a href="#" className="fs-20 fw-500">
                            ×
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-top border-color-extra-medium-gray text-black">
        <div className="container">
          <div className="row ">
            <h6 className="fs-20">결제 예정 금액 총 N건</h6>
          </div>
          <div className="row row-cols-12 row-cols-lg-12 row-cols-sm-12 justify-content-center fs-12">
            <div className="col icon-with-text-style-03">
              <div className="feature-box p-8 text-center">
                <div className="feature-box-icon">
                  <h6 className="fs-22">180,000원</h6>
                </div>
                <div className="feature-box-content last-paragraph-no-margin">
                  <span className="d-inline-block fs-18 fw-500 mb-5px">
                    상품 금액
                  </span>
                </div>
              </div>
            </div>

            <div className="col icon-with-text-style-03">
              <div className="feature-box p-8 text-center">
                <div className="feature-box-icon">
                  <h6 className="fs-22 flex-0">+</h6>
                </div>
              </div>
            </div>

            <div className="col icon-with-text-style-03">
              <div className="feature-box p-8 text-center">
                <div className="feature-box-icon">
                  <h6 className="fs-22">0원</h6>
                </div>
                <div className="feature-box-content last-paragraph-no-margin">
                  <span className="d-inline-block fs-18 fw-500 mb-5px">
                    배송비
                  </span>
                </div>
              </div>
            </div>

            <div className="col icon-with-text-style-03">
              <div className="feature-box p-8 text-center">
                <div className="feature-box-icon">
                  <h6 className="fs-22 flex-0">-</h6>
                </div>
              </div>
            </div>

            <div className="col icon-with-text-style-03">
              <div className="feature-box p-8 text-center">
                <div className="feature-box-icon">
                  <h6 className="fs-22">20,000원</h6>
                </div>
                <div className="feature-box-content last-paragraph-no-margin">
                  <span className="d-inline-block fs-18 fw-500 mb-5px">
                    할인금액
                  </span>
                </div>
              </div>
            </div>

            <div className="col icon-with-text-style-03">
              <div className="feature-box p-8 text-center">
                <div className="feature-box-icon">
                  <h6 className="fs-22">=</h6>
                </div>
              </div>
            </div>

            <div className="col icon-with-text-style-03">
              <div className="feature-box p-8 text-center">
                <div className="feature-box-icon">
                  <h6 className="fs-22">160,000원</h6>
                </div>
                <div className="feature-box-content last-paragraph-no-margin">
                  <span className="d-inline-block fs-18 fw-500 mb-5px">
                    총 주문 금액
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CartPage;
