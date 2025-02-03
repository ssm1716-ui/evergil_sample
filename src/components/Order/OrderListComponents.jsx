import Button from '@/components/common/Button/Button';
import CartImage1 from '@/assets/images/sample/cart-image1.jpg';

const OrderListComponents = () => {
  return (
    <>
      {/* <div className="col-lg-12 px-4 md-pe-15px md-mb-50px xs-mb-35px">
        <div className="row d-flex align-items-baseline">
          <div className="col-6 mb-5px">
            <div className="position-relative terms-condition-box text-start d-flex align-items-center">
              <label>
                <input
                  type="checkbox"
                  name="terms_condition"
                  id="terms_condition1"
                  value="1"
                  className="terms-condition check-box align-middle"
                />
                <span className="box">전체 선택 </span>
              </label>
            </div>
          </div>
          <div className="col-6 text-end">
            <Button
              size="extra-large"
              radiusOn="radius-on"
              color="white"
              className="btn-small w-30 mt-30px mb-10px d-block  align-baseline"
            >
              선택 삭제
            </Button>
          </div>
        </div>
      </div> */}
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
                      80,000원
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
                      70,000원
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
                      <del className="row m-0 fs-14">100,000원</del>
                      80,000원
                      <span className="ps-3 text-red">20%</span>
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
    </>
  );
};

export default OrderListComponents;
