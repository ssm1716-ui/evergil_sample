import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '@/components/common/Button/Button';
import Modal from '@/components/common/Modal/Modal';
import PaymentDue from '@/components/Order/PaymentDue';
import OrderEmptyComponents from '@/components/Order/OrderEmptyComponents';
import OrderListComponents from '@/components/Order/OrderListComponents';
import CartImage1 from '@/assets/images/sample/cart-image1.jpg';
import AnimatedSection from '@/components/AnimatedSection';
import AddressSearch from '@/components/AddressSearch';

import {
  isValidEmail,
  isValidPassword,
  isValidName,
  isValidPhoneNumber,
  isInteger,
} from '@/utils/validators';
import { removeHyphens } from '@/utils/utils';

const paymentMethods = [
  { id: 'credit', label: '신용카드', icon: 'line-icon-Credit-Card2' },
  { id: 'bank', label: '계좌이체', icon: 'line-icon-Bank' },
  { id: 'deposit', label: '무통장입금', icon: 'line-icon-Money-2' },
  { id: 'mobile', label: '휴대폰결제', icon: 'line-icon-Smartphone-3' },
];

const CheckOutPage = () => {
  const location = useLocation();
  const [isAddresOpen, SetIsAddresOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderProductData, setOrderProductData] = useState([]);
  const [orderAddressData, seOrderAddressData] = useState({
    deliveryName: '',
    recipientName: '',
    phoneNumber: '',
    address1: '',
    address2: '',
    zipcode: '',
  });
  const [errors, setErrors] = useState({});
  const [selectedAddress, setSelectedAddress] = useState('');
  const [selectedMethod, setSelectedMethod] = useState(null);
  const navigate = useNavigate();

  //바로 주문, 장바구니 경로로 분기 처리
  useEffect(() => {
    if (location.state.orderType === 'direct') {
      console.log(location.state);
      // 직접 구매의 경우 location.state에 있는 상품 데이터 사용
      setOrderProductData([location.state.product]);
    } else {
      // 장바구니에서 온 경우 localStorage에서 데이터 가져오기
      const storedCart = JSON.parse(localStorage.getItem('dev_cart')) || [];
      setOrderProductData(storedCart);
    }
  }, [location.state]);

  useEffect(() => {
    SetIsAddresOpen(false);
  }, [selectedAddress]);

  // 유효성 검사 함수
  const validate = () => {
    let newErrors = {};

    if (!orderAddressData.deliveryName) {
      newErrors.deliveryName = '배송지 이름을 입력 해주세요.';
    }
    if (!orderAddressData.recipientName) {
      newErrors.recipientName = '받는분 이름을 입력 해주세요.';
    }
    if (!orderAddressData.phoneNumber) {
      newErrors.phoneNumber = '휴대폰 번호를 입력해주세요.';
    } else if (!/^\d{10,11}$/.test(orderAddressData.phoneNumber)) {
      newErrors.phoneNumber = '올바른 휴대폰 번호를 입력해주세요.';
    }
    if (!orderAddressData.zipcode) {
      SetIsAddresOpen(true);
      newErrors.zipcode = '주소찾기로 주소를 추가 해주세요.';
    }
    if (!orderAddressData.address1) {
      SetIsAddresOpen(true);
      newErrors.address1 = '주소찾기로 주소를 추가 해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //배송지정보 변경
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    let newErrors = {};

    //핸드폰번호는 하이픈 제거
    let removeHyphensPhoneNumber;
    if (name === 'phoneNumber') {
      removeHyphensPhoneNumber = removeHyphens(value);
    }

    seOrderAddressData({
      ...orderAddressData,
      [name]: name === 'phoneNumber' ? removeHyphensPhoneNumber : value,
    });
  };

  // 장바구니 총계를 계산하는 함수
  const calculateOrderTotal = () => {
    let totalQty = 0;
    let totalProductPrice = 0;
    let totalDiscount = 0;
    let totalDeliveryFee = 0;

    orderProductData.forEach((product) => {
      totalQty += product.qty;
      totalProductPrice += product.originPrice * product.qty;
      totalDiscount += product.discountedPrice * product.qty;
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
  } = calculateOrderTotal();

  const handleCompleteAdd = (e) => {
    e.preventDefault();

    if (validate()) {
      setIsModalOpen(true);
    }
  };

  const nextPage = (e) => {
    e.preventDefault();
    navigate('/complete');
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
                      {orderProductData.length > 0 &&
                        orderProductData.map((order, index) => (
                          <tr key={index}>
                            <td className="product-thumbnail">
                              <a href="demo-jewellery-store-single-product.html">
                                <img
                                  className="cart-product-image"
                                  src={order.productImages}
                                  alt=""
                                />
                              </a>
                            </td>
                            <td className="product-name">
                              <a
                                href="demo-jewellery-store-single-product.html"
                                className="text-dark-gray fw-500 d-block lh-initial"
                              >
                                {order.productName}
                              </a>
                            </td>

                            <td className="product-quantity" data-title="개수">
                              {order.qty}개
                            </td>
                            <td className="product-price" data-title="배송비">
                              {order.deliveryFee}원
                            </td>
                            <td className="product-price" data-title="할인금액">
                              {(
                                order.discountedPrice * order.qty
                              ).toLocaleString()}
                              원
                            </td>

                            <td className="product-subtotal" data-title="가격">
                              {(order.originPrice * order.qty).toLocaleString()}
                              원
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
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
                  <div className="col-12">
                    <div className="row d-flex justify-content-end m-0">
                      <input
                        className="d-none col-9 border-radius-4px input-large"
                        type="text"
                        aria-label="first-name"
                        required
                      />
                      <Button
                        size="large"
                        radiusOn="radius-on"
                        color="black"
                        className="col-3 btn w-20 sm-w-50 btn-round-edge"
                      >
                        배송지 변경
                      </Button>
                    </div>
                  </div>

                  <div className="col-12 mb-20px ">
                    <label className="mb-10px">배송지 이름</label>
                    <input
                      className="border-radius-4px input-large"
                      type="text"
                      name="deliveryName"
                      aria-label="first-name"
                      value={orderAddressData.deliveryName}
                      onChange={handleAddressChange}
                      required
                    />
                    {errors.deliveryName && (
                      <p className="text-danger text-start">
                        {errors.deliveryName}
                      </p>
                    )}
                  </div>
                  <div className="col-12 mb-20px ">
                    <label className="mb-10px">받는분 이름</label>
                    <input
                      className="border-radius-4px input-large"
                      type="text"
                      aria-label="first-name"
                      name="recipientName"
                      value={orderAddressData.recipientName}
                      onChange={handleAddressChange}
                      required
                    />
                    {errors.recipientName && (
                      <p className="text-danger text-start">
                        {errors.recipientName}
                      </p>
                    )}
                  </div>
                  <div className="col-12 mb-20px">
                    <label className="mb-10px">핸드폰번호</label>
                    <input
                      className="border-radius-4px input-large"
                      type="text"
                      aria-label="first-name"
                      name="phoneNumber"
                      value={orderAddressData.phoneNumber}
                      onChange={handleAddressChange}
                      required
                    />
                    {errors.phoneNumber && (
                      <p className="text-danger text-start">
                        {errors.phoneNumber}
                      </p>
                    )}
                  </div>

                  <div className="col-12 mb-20px">
                    <label className="col-12">배송주소</label>
                    <div className="row d-flex justify-content-between flex-sm-wrap-reverse m-0 mt-10px">
                      {Object.keys(selectedAddress).length > 0 && (
                        <input
                          className="col-9 border-radius-4px input-large"
                          type="text"
                          aria-label="first-name"
                          name="zipcode"
                          value={
                            (orderAddressData.zipcode = selectedAddress.zipcode)
                          }
                          required
                        />
                      )}
                      {isAddresOpen && errors.zipcode && (
                        <p className="text-danger text-start p-0">
                          {errors.zipcode}
                        </p>
                      )}

                      <AddressSearch onComplete={setSelectedAddress}>
                        주소 찾기
                      </AddressSearch>
                    </div>
                    {Object.keys(selectedAddress).length > 0 && (
                      <>
                        <input
                          className="col-12 border-radius-4px input-large mt-1"
                          type="text"
                          aria-label="first-name"
                          name="address1"
                          value={
                            (orderAddressData.address1 =
                              selectedAddress.address)
                          }
                          required
                        />
                        {isAddresOpen && errors.address1 && (
                          <p className="text-danger text-start p-0">
                            {errors.address1}
                          </p>
                        )}
                        <input
                          className="col-12 border-radius-4px input-large mt-1"
                          type="text"
                          aria-label="first-name"
                          name="address2"
                          value={orderAddressData.address2}
                          onChange={handleAddressChange}
                          required
                        />
                      </>
                    )}
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

                  {/* <AddressSearch onComplete={setSelectedAddress} />
                  <p>선택된 주소: {selectedAddress}</p> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container ">
          <div className="row row-cols-1 row-cols-lg-4 row-cols-sm-2 justify-content-center pb-5">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className="col icon-with-text-style-07 transition-inner-all md-mb-30px"
              >
                <div
                  className={`feature-box h-100 justify-content-start text-center p-17 sm-p-14 border border-1 border-radius-10px  ${
                    selectedMethod === method.id
                      ? 'bg-black'
                      : 'border-dark-gray bg-light-gray bg-white'
                  }`}
                  role="button"
                  onClick={() => setSelectedMethod(method.id)}
                >
                  <div className="feature-box-icon mb-30px">
                    <i
                      className={`${method.icon} icon-large text-dark-gray ${
                        selectedMethod === method.id ? 'text-white' : ''
                      }`}
                    ></i>
                  </div>
                  <div className="feature-box-content">
                    <span
                      className={`d-inline-block fw-600 text-dark-gray fs-18  ${
                        selectedMethod === method.id ? 'text-white' : ''
                      }`}
                    >
                      {method.label}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-lg-12 pb-40px">
            <div className="bg-very-light-gray border-radius-6px p-50px xl-p-30px lg-p-25px">
              <span className="fs-26 fw-600 text-dark-gray mb-5px d-block">
                주문 총계
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
                    <th className="w-45 fw-600 text-dark-gray">상품 금액</th>
                    <td className="text-dark-gray fw-600">
                      {totalProductPrice.toLocaleString()}원
                    </td>
                  </tr>
                  <tr>
                    <th className="w-45 fw-600 text-dark-gray">할인 금액</th>
                    <td className="text-dark-gray fw-600">
                      {totalDiscount.toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <th className="w-45 fw-600 text-dark-gray">배송비</th>
                    <td className="text-dark-gray fw-600">
                      {totalDeliveryFee.toLocaleString()}
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
          <div className="col-lg-12">
            <Link
              className="btn btn-dark-gray btn-large btn-switch-text btn-round-edge btn-box-shadow w-100"
              onClick={handleCompleteAdd}
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
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="w-40">
          <div className="modal-content p-0 rounded shadow-lg">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="p-10 sm-p-7 bg-white">
                  <div className="row justify-content-center">
                    <div className="col-md-9 text-center">
                      <h6 className="text-dark-gray fw-500 mb-15px">
                        결제를 진행 하겠습니다.
                      </h6>
                    </div>
                    <div className="col-lg-12 text-center text-lg-center pt-3">
                      <input type="hidden" name="redirect" value="" />
                      <button
                        className="btn btn-white btn-large btn-box-shadow btn-round-edge submit me-1"
                        onClick={nextPage}
                      >
                        결제 진행
                      </button>
                      <button
                        className="btn btn-white btn-large btn-box-shadow btn-round-edge submit me-1"
                        onClick={() => setIsModalOpen(false)}
                      >
                        취소
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

export default CheckOutPage;
