import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { modifyCart, removeCart } from '@/api/memberApi';
import useAuth from '@/hooks/useAuth';
import Button from '@/components/common/Button/Button';
import LoginModal from '@/components/common/Modal/LoginModal';
import forgotImage from '@/assets/images/forgot-password.png';

const CartPage = () => {
  const { isAuthenticated, user } = useAuth();
  const [cartProducts, setCartProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate();

  //로드시 로컬스토리지에 장바구니 가져오기
  useEffect(() => {
    const storedCartProduct =
      JSON.parse(localStorage.getItem('dev_cart')) || [];

    setCartProducts(storedCartProduct);
  }, []);

  const updateCart = () => {
    modifyCart(cartProducts);
  };

  const deleteCart = (updatedCart) => {
    removeCart(updatedCart);
  };

  // 전체 선택 / 해제 기능
  const handleAllChecked = () => {
    if (selectedProducts.length === cartProducts.length) {
      setSelectedProducts([]); // 전체 해제
    } else {
      setSelectedProducts(cartProducts.map((_, index) => index)); // 전체 선택
    }
  };
  // 개별 체크박스 선택
  const handleCheckboxChange = (index) => {
    setSelectedProducts(
      (prevSelected) =>
        prevSelected.includes(index)
          ? prevSelected.filter((i) => i !== index) // 이미 선택된 경우 제거
          : [...prevSelected, index] // 새롭게 추가
    );
  };

  const handleSelectRemove = () => {
    const updatedCart = cartProducts.filter(
      (_, index) => !selectedProducts.includes(index)
    );

    setCartProducts([...updatedCart]);
    deleteCart(updatedCart);
    setSelectedProducts([]); // 선택 항목 초기화
  };

  // 장바구니 총계를 계산하는 함수
  const calculateCartTotal = () => {
    let totalQty = 0;
    let totalProductPrice = 0;
    let totalDiscount = 0;
    let totalDeliveryFee = 0;

    cartProducts.forEach((product) => {
      totalQty += product.qty;
      totalProductPrice += product.price * product.qty;
      totalDiscount += product.discountedPrice * product.qty;
      totalDeliveryFee += product.deliveryFee;
    });

    const totalAmount = totalProductPrice + totalDeliveryFee;

    return {
      totalQty,
      totalProductPrice,
      totalDiscount,
      totalDeliveryFee,
      totalAmount,
    };
  };

  // 계산된 값 가져오기
  const {
    totalQty,
    totalProductPrice,
    totalDiscount,
    totalDeliveryFee,
    totalAmount,
  } = calculateCartTotal();

  const handleCartCheckout = (e) => {
    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
      return;
    }
    e.preventDefault();
    navigate('/checkout', { state: { orderType: 'cart' } });
  };

  return (
    <>
      <section className="top-space-margin big-section pb-3">
        <div className="container">
          <div
            className="row align-items-center justify-content-center"
            data-anime='{ "el": "childs", "translateY": [-15, 0], "opacity": [0,1], "duration": 300, "delay": 0, "staggervalue": 200, "easing": "easeOutQuad" }'
          >
            <div className="col-12 text-center position-relative page-title-extra-large text-decoration-line-bottom mb-3">
              <h4 className="fw-600 text-dark-gray mb-10px">장바구니</h4>
            </div>
            <div className="col-12 breadcrumb breadcrumb-style-01 d-flex justify-content-center"></div>
          </div>
        </div>
      </section>

      {cartProducts.length > 0 ? (
        <section className="pt-0">
          <div className="container">
            <div className="row align-items-start">
              <div className="col-lg-8 pe-15px md-pe-15px md-mb-50px xs-mb-35px">
                <div className="row mb-20px">
                  <div className="col-12 text-center text-md-end sm-mt-15px d-flex justify-content-between">
                    <a
                      className="btn btn-medium border-1 btn-round-edge btn-transparent-light-gray text-transform-none me-15px lg-me-5px"
                      onClick={handleAllChecked}
                    >
                      {selectedProducts.length === cartProducts.length
                        ? '전체 해제'
                        : '전체 선택'}
                    </a>
                    <a
                      className="btn btn-medium border-1 btn-round-edge btn-transparent-light-gray text-transform-none"
                      onClick={handleSelectRemove}
                    >
                      선택 삭제
                    </a>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-12 p-0 md-p-4">
                    <table className="table cart-products">
                      <thead>
                        <tr>
                          <th scope="col"></th>
                          <th scope="col">상품명</th>
                          <th scope="col"></th>
                          <th scope="col">개수</th>
                          <th scope="col">배송비</th>
                          <th scope="col">할인 금액</th>
                          <th scope="col">금액</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartProducts.length > 0 &&
                          cartProducts.map((product, index) => (
                            <tr key={index}>
                              <td className="product-checkbox">
                                <input
                                  type="checkbox"
                                  name="terms_condition"
                                  id="terms_condition"
                                  checked={selectedProducts.includes(index)}
                                  onChange={() => handleCheckboxChange(index)}
                                  className="terms-condition check-box align-middle required"
                                />
                              </td>
                              <td className="product-thumbnail">
                                <a href="demo-jewellery-store-single-product.html">
                                  <img
                                    className="cart-product-image"
                                    src={product.productImages[0]}
                                    alt=""
                                  />
                                </a>
                              </td>
                              <td className="product-name">
                                <a
                                  href="demo-jewellery-store-single-product.html"
                                  className="text-dark-gray fw-500 d-block lh-initial"
                                >
                                  {product.productName}
                                </a>
                              </td>
                              <td
                                className="product-quantity"
                                data-title="개수"
                              >
                                <div className="quantity">
                                  <button
                                    type="button"
                                    className="qty-minus"
                                    onClick={() => {
                                      const updatedProducts = [...cartProducts];
                                      const indexQty =
                                        updatedProducts[index].qty;
                                      if (indexQty <= 1) return;
                                      updatedProducts[index].qty = indexQty - 1;
                                      setCartProducts(updatedProducts);
                                      updateCart();
                                    }}
                                  >
                                    -
                                  </button>
                                  <input
                                    className="qty-text"
                                    type="text"
                                    id="1"
                                    value={product.qty}
                                    aria-label="qty-text"
                                  />
                                  <button
                                    type="button"
                                    className="qty-plus"
                                    onClick={() => {
                                      const updatedProducts = [...cartProducts];
                                      const indexQty =
                                        updatedProducts[index].qty;
                                      updatedProducts[index].qty = indexQty + 1;
                                      setCartProducts(updatedProducts);
                                      updateCart();
                                    }}
                                  >
                                    +
                                  </button>
                                </div>
                              </td>
                              <td className="product-price" data-title="배송비">
                                {product.deliveryFee}원
                              </td>
                              <td
                                className="product-price"
                                data-title="할인금액"
                              >
                                {(
                                  product.discountedPrice * product.qty
                                ).toLocaleString()}
                                원
                              </td>

                              <td
                                className="product-subtotal"
                                data-title="금액"
                              >
                                {(product.price * product.qty).toLocaleString()}
                                원
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 p-0 md-p-4">
                <div className="bg-very-light-gray border-radius-6px ms-25px p-50px xl-p-30px lg-p-25px">
                  <span className="fs-26 md-fs-20 fw-600 text-dark-gray mb-5px d-block">
                    장바구니 총계
                  </span>
                  <table className="w-100 total-price-table">
                    <tbody>
                      <tr>
                        <th className="w-45 fw-600 text-dark-gray">개수</th>
                        <td className="text-dark-gray fw-600">
                          {totalQty.toLocaleString()}개
                        </td>
                      </tr>
                      <tr>
                        <th className="w-45 fw-600 text-dark-gray">
                          상품 금액
                        </th>
                        <td className="text-dark-gray fw-600">
                          {totalProductPrice.toLocaleString()}원
                        </td>
                      </tr>
                      <tr>
                        <th className="w-45 fw-600 text-dark-gray">
                          할인 금액
                        </th>
                        <td className="text-dark-gray fw-600">
                          {totalDiscount.toLocaleString()}원
                        </td>
                      </tr>
                      <tr>
                        <th className="w-45 fw-600 text-dark-gray">배송비</th>
                        <td className="text-dark-gray fw-600">
                          {totalDeliveryFee.toLocaleString()}원
                        </td>
                      </tr>

                      <tr className="total-amount">
                        <th className="fw-600 text-dark-gray pb-0">총 금액</th>
                        <td className="pb-0" data-title="Total">
                          <h6 className="d-block fw-700 mb-0 text-dark-gray">
                            {totalAmount.toLocaleString()}원
                          </h6>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <Link
                    className="btn btn-base-color btn-large btn-switch-text btn-round-edge btn-box-shadow border-radius-30px w-100 mt-25px"
                    onClick={handleCartCheckout}
                  >
                    <span>
                      <span className="btn-double-text" data-text="주문하기">
                        주문하기
                      </span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="bg-base-white-color pt-0 pb-5">
          <div className="container">
            <div className="row row-cols-1 row-cols-lg-2 row-cols-md-1 g-0 justify-content-center overflow-hidden">
              <div className="col">
                <div className="text-center ">
                  <a className="navbar-brand mb-10">
                    {/* <i className="feather icon-feather-shopping-cart align-middle text-extra-medium-gray fs-150 mb-10" /> */}
                    <i className="bi bi-handbag align-middle align-middle text-extra-medium-gray fs-70 mb-5"></i>
                  </a>

                  <h6 className="fw-600 text-dark-gray  ls-minus-1px">
                    장바구니에 담긴 상품이 없습니다.
                  </h6>

                  <Link to="/store" className="d-block pt-5 fw-800 fs-18">
                    <Button
                      size="extra-large"
                      radiusOn="radius-on"
                      className="btn btn-large btn-round-edge btn-base-color btn-box-shadow w-50 text-transform-none"
                    >
                      쇼핑하기
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {!isAuthenticated && isLoginModalOpen && (
        <LoginModal onClose={() => setIsLoginModalOpen(false)} />
      )}
    </>
  );
};

export default CartPage;
