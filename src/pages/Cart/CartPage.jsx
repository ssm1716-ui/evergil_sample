import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getSelectCart, putUpdateCart, deleteCart } from '@/api/member/cartApi';
import { getCart, modifyCart, removeCart } from '@/api/memberApi';
import useAuth from '@/hooks/useAuth';
import useIsMobile from '@/hooks/useIsMobile';
import Button from '@/components/common/Button/Button';
import LoginModal from '@/components/common/Modal/LoginModal';
import { getTransformedCartData } from '@/utils/utils';

const CartPage = () => {
  const { isAuthenticated, user } = useAuth();
  const isMobile = useIsMobile();
  const [cartProducts, setCartProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  //로드시 로컬스토리지에 장바구니 가져오기
  useEffect(() => {
    const fetchCart = async () => {
      setIsLoading(true);
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
      setSelectedProducts([]);
      setIsLoading(false);
    };

    fetchCart();
  }, []);

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
    if (selectedProducts.length === 0) {
      alert('상품을 선택해주세요.');
      return;
    }

    const removeProducts = cartProducts.filter((_, index) =>
      selectedProducts.includes(index)
    );

    const updatedCart = cartProducts.filter(
      (_, index) => !selectedProducts.includes(index)
    );

    setCartProducts(updatedCart);
    setSelectedProducts([]);

    if (!isAuthenticated) {
      deleteLocalStorageCart(updatedCart);
    } else {
      try {
        await Promise.all(
          removeProducts.map((product) => deleteCart(product.cartItemId))
        );
      } catch (err) {
        console.error('선택된 상품 삭제 중 오류 발생:', err);
        alert('일부 상품 삭제에 실패했습니다.');
      }
    }
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

    selectedProducts.forEach((index) => {
      const product = cartProducts[index];
      if (!product) return; // ✅ product가 없을 경우 무시

      totalQty += product.quantity;
      totalProductPrice += product.price * product.quantity;
      totalDiscount += product.discountedPrice * product.quantity;
      totalDeliveryFee += product.deliveryFee;
    });

    const totalAmount = totalProductPrice - totalDiscount + totalDeliveryFee;

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
      localStorage.setItem('redirectAfterLogin', '/cart');
      setIsLoginModalOpen(true);
      return;
    }

    if (selectedProducts.length === 0) {
      alert('주문할 상품을 선택해주세요.');
      return;
    }

    e.preventDefault();

    const selectedItems = selectedProducts.map((index) => cartProducts[index]);
    console.log(selectedItems);
    navigate('/checkout', {
      state: { orderType: 'cart', selectedItems },
    });
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
              <h6 className="fw-600 text-dark-gray mb-10px">장바구니</h6>
            </div>
            <div className="col-12 breadcrumb breadcrumb-style-01 d-flex justify-content-center"></div>
          </div>
        </div>
      </section>

      {isLoading ? (
        <section className="bg-base-white-color pt-0 pb-5">
          <div className="container">
            <div className="row row-cols-1 row-cols-lg-2 row-cols-md-1 g-0 justify-content-center overflow-hidden">
              <div className="col">
                <div className="text-center">
                  <div className="spinner-border text-base-color mb-4" role="status" style={{ width: '3rem', height: '3rem' }}>
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <h6 className="fw-600 text-dark-gray ls-minus-1px">
                    장바구니를 불러오는 중입니다...
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : cartProducts.length > 0 ? (
        <section className="pt-0">
          <div className="container">
            <div className="row align-items-start">
              <div className="col-lg-8 pe-15px md-pe-15px sm-mb-10px">
                <div className="row mb-20px">
                  <div className="col-12 text-center text-md-end sm-mt-15px d-flex justify-content-between">
                    <Link
                      className="btn btn-medium border-1 btn-round-edge btn-transparent-light-gray text-transform-none me-15px lg-me-5px sm-w-45"
                      onClick={handleAllChecked}
                    >
                      {selectedProducts.length === cartProducts.length
                        ? '전체 해제'
                        : '전체 선택'}
                    </Link>
                    <Link
                      className="btn btn-medium border-1 btn-round-edge btn-transparent-light-gray text-transform-none sm-w-45"
                      onClick={handleSelectRemove}
                    >
                      선택 삭제
                    </Link>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-12 p-0">
                    {/* 데스크톱 버전 */}
                    <div className="d-none d-md-block">
                      <table className="table cart-products">
                        <thead className="md-fs-14">
                          <tr>
                            <th className="text-center" scope="col"></th>
                            <th className="text-center" scope="col">상품명</th>
                            <th className="text-center" scope="col"></th>
                            <th className="text-center" scope="col">개수</th>
                            <th className="text-center" scope="col">배송비</th>
                            <th className="text-center" scope="col">상품금액</th>
                            <th className="text-center" scope="col">할인금액</th>
                            <th className="text-center" scope="col">결제금액</th>
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
                                    id={`terms_condition_${index}`}
                                    checked={selectedProducts.includes(index)}
                                    onChange={() => handleCheckboxChange(index)}
                                    className="terms-condition check-box align-middle required"
                                  />
                                </td>
                                <td className="product-thumbnail text-center">
                                  <Link to={`/shop/${product.productId}`}>
                                    <img
                                      className="cart-product-image"
                                      src={product.productImage || product.productImages[0]}
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
                                <td className="product-quantity text-center">
                                  <div className="quantity">
                                    <button
                                      type="button"
                                      className="qty-minus"
                                      onClick={() => handleQuantityChange('minus', index)}
                                    >
                                      -
                                    </button>
                                    <input
                                      className="qty-text"
                                      type="text"
                                      id={`qty_${index}`}
                                      value={product.quantity}
                                      aria-label="qty-text"
                                      readOnly
                                    />
                                    <button
                                      type="button"
                                      className="qty-plus"
                                      onClick={() => handleQuantityChange('plus', index)}
                                    >
                                      +
                                    </button>
                                  </div>
                                </td>
                                <td className="product-price text-center">
                                  {product.deliveryFee.toLocaleString()}원
                                </td>
                                <td className="product-price text-center">
                                  {(product.price * product.quantity).toLocaleString()}원
                                </td>
                                <td className="product-subtotal text-center">
                                  {product.discountedPrice * product.quantity > 0 ? '-' : ''}
                                  {(product.discountedPrice * product.quantity).toLocaleString()}원
                                </td>
                                <td className="product-subtotal text-center">
                                  {((product.price - product.discountedPrice) * product.quantity).toLocaleString()}원
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>

                    {/* 모바일 버전 */}
                    <div className="d-md-none">
                      {cartProducts.length > 0 &&
                        cartProducts.map((product, index) => (
                          <div key={index} className="cart-item mb-4 p-3 border-bottom">
                            <div className="d-flex align-items-center mb-3">
                              <div className="me-3 d-flex align-items-center">
                                <input
                                  type="checkbox"
                                  name="terms_condition"
                                  id={`terms_condition_mobile_${index}`}
                                  checked={selectedProducts.includes(index)}
                                  onChange={() => handleCheckboxChange(index)}
                                  className="terms-condition check-box align-middle required"
                                />
                              </div>
                              <div className="flex-grow-1">
                                <Link
                                  to={`/shop/${product.productId}`}
                                  className="text-dark-gray fw-500 d-block lh-initial"
                                >
                                  {product.productName}
                                </Link>
                              </div>
                            </div>
                            <div className="d-flex">
                              <div className="me-3" style={{ width: '100px' }}>
                                <Link to={`/shop/${product.productId}`}>
                                  <img
                                    className="cart-product-image w-100"
                                    src={product.productImage || product.productImages[0]}
                                    alt={product.productImage}
                                  />
                                </Link>
                              </div>
                              <div className="flex-grow-1">
                                <div className="d-flex flex-column gap-2">
                                  <div className="d-flex justify-content-between align-items-center">
                                    <span className="text-dark-gray">개수</span>
                                    <div className="quantity">
                                      <button
                                        type="button"
                                        className="qty-minus"
                                        onClick={() => handleQuantityChange('minus', index)}
                                      >
                                        -
                                      </button>
                                      <input
                                        className="qty-text"
                                        type="text"
                                        id={`qty_mobile_${index}`}
                                        value={product.quantity}
                                        aria-label="qty-text"
                                        readOnly
                                      />
                                      <button
                                        type="button"
                                        className="qty-plus"
                                        onClick={() => handleQuantityChange('plus', index)}
                                      >
                                        +
                                      </button>
                                    </div>
                                  </div>
                                  <div className="d-flex justify-content-between align-items-center">
                                    <span className="text-dark-gray">상품금액</span>
                                    <span>{(product.price * product.quantity).toLocaleString()}원</span>
                                  </div>
                                  <div className="d-flex justify-content-between align-items-center">
                                    <span className="text-dark-gray">할인금액</span>
                                    <span>
                                      {product.discountedPrice * product.quantity > 0 ? '-' : ''}
                                      {(product.discountedPrice * product.quantity).toLocaleString()}원
                                    </span>
                                  </div>
                                  <div className="d-flex justify-content-between align-items-center">
                                    <span className="text-dark-gray">배송비</span>
                                    <span>{product.deliveryFee.toLocaleString()}원</span>
                                  </div>
                                  <div className="d-flex justify-content-between align-items-center">
                                    <span className="text-dark-gray fw-600">결제금액</span>
                                    <span className="fw-600">
                                      {((product.price - product.discountedPrice) * product.quantity).toLocaleString()}원
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
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
                          {totalDiscount > 0 ? '-' : ''}
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
        <section className={`bg-base-white-color ${isMobile ? 'pt-20 pb-30' : 'pt-2 pb-7'}`}>
          <div className="container">
            <div className="row row-cols-1 row-cols-lg-2 row-cols-md-1 g-0 justify-content-center overflow-hidden">
              <div className="col">
                <div className="text-center ">
                  <a className="navbar-brand mb-10">
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
