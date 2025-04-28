import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getSelectCart, putUpdateCart, deleteCart } from '@/api/member/cartApi';
import { getCart, modifyCart, removeCart } from '@/api/memberApi';
import useAuth from '@/hooks/useAuth';
import Button from '@/components/common/Button/Button';
import LoginModal from '@/components/common/Modal/LoginModal';
import { getTransformedCartData } from '@/utils/utils';

const CartPage = () => {
  const { isAuthenticated, user } = useAuth();
  const [cartProducts, setCartProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate();

  //로드시 로컬스토리지에 장바구니 가져오기
  useEffect(() => {
    const fetchCart = async () => {
      let storedCartProduct;

      if (isAuthenticated) {
        try {
          const res = await getSelectCart();
          if (res.status === 200) {
            const { data } = res.data;
            storedCartProduct = data;
          }
        } catch (error) {
          console.error('장바구니 불러오기 실패:', error);
        }
      } else {
        storedCartProduct = getCart(); // 로컬스토리지에서 가져오기
      }

      setCartProducts(storedCartProduct);
    };

    fetchCart();
  }, [selectedProducts]);

  const updateLocalStorageCart = () => {
    modifyCart(cartProducts);
  };

  const deleteLocalStorageCart = (updatedCart) => {
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

  const handleSelectRemove = async () => {
    const updatedCart = cartProducts.filter(
      (_, index) => !selectedProducts.includes(index)
    );

    const removeProduct = cartProducts.filter((_, index) =>
      selectedProducts.includes(index)
    );

    if (removeProduct.length <= 0) alert('상품 선택을 해주세요.');

    setCartProducts([...updatedCart]);

    if (!isAuthenticated) {
      deleteLocalStorageCart(updatedCart);
    } else {
      try {
        await Promise.all(
          removeProduct.map((product) => deleteCart(product.cartItemId))
        );
      } catch (err) {
        console.error('삭제 중 오류 발생:', err);
      }
    }
    setSelectedProducts([]); // 선택 항목 초기화
  };

  const handleQuantityChange = async (type, index) => {
    const updatedProducts = [...cartProducts];
    const currentQty = updatedProducts[index].quantity;

    if (type === 'minus') {
      if (currentQty <= 1) return;
      updatedProducts[index].quantity = currentQty - 1;
    } else if (type === 'plus') {
      updatedProducts[index].quantity = currentQty + 1;
    }

    setCartProducts(updatedProducts);

    if (!isAuthenticated) {
      updateLocalStorageCart();
    } else {
      const transformedData = getTransformedCartData(updatedProducts);
      const res = await putUpdateCart(transformedData);

      if (res.status !== 200) {
        console.error('상품 업데이트중 오류 발생:');
      }
    }
  };

  // 장바구니 총계를 계산하는 함수
  const calculateCartTotal = () => {
    let totalQty = 0;
    let totalProductPrice = 0;
    let totalDiscount = 0;
    let totalDeliveryFee = 0;

    cartProducts.forEach((product) => {
      totalQty += product.quantity;
      totalProductPrice += product.price * product.quantity;
      totalDiscount += product.discountedPrice * product.quantity;
      totalDeliveryFee += product.deliveryFee;
    });

    const totalAmount = totalDiscount + totalDeliveryFee;

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
      localStorage.setItem('redirectAfterLogin', '/cart'); // 현재 페이지 저장
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
              <div className="col-lg-8 pe-15px md-pe-15px sm-mb-10px">
                <div className="row mb-20px">
                  <div className="col-12 text-center text-md-end sm-mt-15px d-flex justify-content-between">
                    <Link
                      className="btn btn-medium border-1 btn-round-edge btn-transparent-light-gray text-transform-none me-15px lg-me-5px"
                      onClick={handleAllChecked}
                    >
                      {selectedProducts.length === cartProducts.length
                        ? '전체 해제'
                        : '전체 선택'}
                    </Link>
                    <Link
                      className="btn btn-medium border-1 btn-round-edge btn-transparent-light-gray text-transform-none"
                      onClick={handleSelectRemove}
                    >
                      선택 삭제
                    </Link>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-12 p-0 md-p-4">
                    <table className="table cart-products">
                      <thead className="md-fs-14">
                        <tr>
                          <th className="text-center" scope="col"></th>
                          <th className="text-center" scope="col">
                            상품명
                          </th>
                          <th className="text-center" scope="col"></th>
                          <th className="text-center" scope="col">
                            개수
                          </th>
                          <th className="text-center" scope="col">
                            배송비
                          </th>
                          <th className="text-center" scope="col">
                            상품금액
                          </th>
                          <th className="text-center" scope="col">
                            상품할인금액
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartProducts.length > 0 &&
                          cartProducts.map((product, index) => (
                            <tr key={index}>
                              <td className="product-checkbox me-2 text-center">
                                <input
                                  type="checkbox"
                                  name="terms_condition"
                                  id="terms_condition"
                                  checked={selectedProducts.includes(index)}
                                  onChange={() => handleCheckboxChange(index)}
                                  className="terms-condition check-box align-top required"
                                />
                              </td>
                              <td className="product-thumbnail text-center">
                                <Link to={`/shop/${product.productId}`}>
                                  <img
                                    className="cart-product-image"
                                    src={
                                      product.productImage ||
                                      product.productImages[0]
                                    }
                                    alt={product.productImage}
                                  />
                                </Link>
                              </td>
                              <td className="product-name text-center p-0 sm-pe-25px">
                                <Link
                                  to={`/shop/${product.productId}`}
                                  className="text-dark-gray fw-500 d-block lh-initial md-fs-12"
                                >
                                  {product.productName}
                                </Link>
                              </td>
                              <td
                                className="product-quantity text-center"
                                data-title="개수"
                              >
                                <div className="quantity">
                                  <button
                                    type="button"
                                    className="qty-minus"
                                    onClick={() =>
                                      handleQuantityChange('minus', index)
                                    }
                                  >
                                    -
                                  </button>

                                  <input
                                    className="qty-text"
                                    type="text"
                                    id="1"
                                    value={product.quantity}
                                    aria-label="qty-text"
                                    readOnly // 수동 입력 방지
                                  />

                                  <button
                                    type="button"
                                    className="qty-plus"
                                    onClick={() =>
                                      handleQuantityChange('plus', index)
                                    }
                                  >
                                    +
                                  </button>
                                </div>
                              </td>
                              <td
                                className="product-price text-center"
                                data-title="배송비"
                              >
                                {product.deliveryFee.toLocaleString()}원
                              </td>
                              <td
                                className="product-price text-center"
                                data-title="할인금액"
                              >
                                {(
                                  product.price * product.quantity
                                ).toLocaleString()}
                                원
                              </td>

                              <td
                                className="product-subtotal text-center"
                                data-title="금액"
                              >
                                {(
                                  product.discountedPrice * product.quantity
                                ).toLocaleString()}
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
                <div className="bg-very-light-gray border-radius-6px ms-25px md-ms-0 p-50px xl-p-30px lg-p-25px">
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
                        <th className="w-45 fw-600 text-dark-gray">상품금액</th>
                        <td className="text-dark-gray fw-600">
                          {totalProductPrice.toLocaleString()}원
                        </td>
                      </tr>
                      <tr>
                        <th className="w-45 fw-600 text-dark-gray">
                          상품할인금액
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
                </div>
              </div>
              <div className="col-12">
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
