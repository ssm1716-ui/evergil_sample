import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '@/components/common/Button/Button';
import Modal from '@/components/common/Modal/Modal';
import useAuth from '@/hooks/useAuth';
import PaymentDue from '@/components/Order/PaymentDue';
import OrderEmptyComponents from '@/components/Order/OrderEmptyComponents';
import OrderListComponents from '@/components/Order/OrderListComponents';
import CartImage1 from '@/assets/images/sample/cart-image1.jpg';
import AnimatedSection from '@/components/AnimatedSection';
import AddressSearch from '@/components/AddressSearch';

import {
  getMembersAddressDefault,
  getMembersAddressList,
  putDefaultAddress,
} from '@/api/member/deliveryApi';

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
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const [isAddresOpen, SetIsAddresOpen] = useState(false);
  const [focusAddress, setFocusAddress] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeliveryOpen, setIsModalDeliveryOpen] = useState(false);
  const [orderProductData, setOrderProductData] = useState([]);
  const [orderInfo, setOrderInfo] = useState({
    orderName: '',
    orderPhoneNumber: '',
    orderEmail: '',
  });
  const [orderAddressData, setOrderAddressData] = useState({
    id: '',
    deliveryName: '',
    recipientName: '',
    phoneNumber: '',
    address1: '',
    address2: '',
    zipcode: '',
    isDefault: '',
  });
  const [errors, setErrors] = useState({});
  const [selectedAddress, setSelectedAddress] = useState({});
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [addressList, setAddressList] = useState([]);
  const navigate = useNavigate();

  //바로 주문, 장바구니 경로로 분기 처리
  useEffect(() => {
    //주문페이지는 로그인 유저만 접근 가능
    if (!isAuthenticated) navigate('/signin');

    let storedOrder = sessionStorage.getItem('order_product');

    if (storedOrder) {
      // ✅ 로컬스토리지에서 데이터 복구
      setOrderProductData([JSON.parse(storedOrder)]);
    } else if (location.state?.orderType === 'direct') {
      console.log(location.state);
      setOrderProductData([location.state.product]); // 직접 구매
    } else {
      // 장바구니에서 온 경우 localStorage에서 데이터 가져오기
      const storedCart = JSON.parse(localStorage.getItem('dev_cart')) || [];
      setOrderProductData(storedCart);
    }
  }, [location.state]);

  useEffect(() => {
    SetIsAddresOpen(false);
  }, [selectedAddress]);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const res = await getMembersAddressDefault();
        if (res.status === 200) {
          const { data } = res.data;
          console.log(data);
          setOrderAddressData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAddress();
  }, []);

  // 유효성 검사 함수
  const validate = () => {
    let newErrors = {};

    //구매자 정보
    if (!orderInfo.orderName) {
      newErrors.orderName = '구매자 이름을 입력 해주세요.';
    }
    if (!orderInfo.orderPhoneNumber) {
      newErrors.orderPhoneNumber = '구매자 휴대폰번호를 입력 해주세요.';
    }
    if (!orderInfo.orderEmail) {
      newErrors.orderEmail = '구매자 이메일을 입력 해주세요.';
    }

    //배송지 정보
    if (!orderAddressData.deliveryName) {
      newErrors.deliveryName = '배송지 이름을 입력 해주세요.';
    }
    if (!orderAddressData.recipientName) {
      newErrors.recipientName = '받는분 이름을 입력 해주세요.';
    }
    if (!orderAddressData.phoneNumber) {
      newErrors.phoneNumber = '휴대폰 번호를 입력해주세요.';
    } else if (!isValidPhoneNumber(orderAddressData.phoneNumber)) {
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

    setOrderAddressData({
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

  const handleDeliveryModalOpen = async () => {
    const { data } = await getMembersAddressList();
    console.log(data);
    setAddressList(data.data);
    setIsModalDeliveryOpen(true);
  };
  const handleDeliveryAddressChage = () => {
    if (!focusAddress) return;
    const address = addressList.find((item) => item.id === focusAddress);
    setOrderAddressData(address);
    setIsModalDeliveryOpen(false);
  };

  return (
    <>
      <section className="top-space-margin pt-7 pb-1">
        <div className="container">
          <div
            className="row align-items-center justify-content-center"
            data-anime='{ "el": "childs", "translateY": [-15, 0], "opacity": [0,1], "duration": 300, "delay": 0, "staggervalue": 200, "easing": "easeOutQuad" }'
          >
            <div className="col-12 text-start position-relative page-title-extra-large ">
              <h6 className="fw-600 text-dark-gray mb-10px">주문/결제</h6>
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
                                  src={order.productImages[0]}
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
                              {(order.price * order.qty).toLocaleString()}원
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
          <div className="align-items-start ">
            <div className="col-lg-12 md-mb-50px xs-mb-10px pb-3">
              <span className="fs-26 md-fs-20 fw-600 text-dark-gray mb-20px md-mb-0 d-block">
                구매자 정보
              </span>
              <form className="">
                <div className="col-12 mb-20px md-mb-10px">
                  <label>이름</label>
                  <span className="text-red">*</span>
                  <input
                    className="border-radius-4px input-large md-py-0"
                    type="text"
                    name="orderName"
                    value={orderInfo.orderName}
                    onChange={handleAddressChange}
                    required
                  />

                  {errors.orderName && (
                    <p className="text-danger text-start">{errors.orderName}</p>
                  )}
                </div>
                <div className="col-12 mb-20px md-mb-10px">
                  <label>휴대폰</label>
                  <span className="text-red">*</span>
                  <input
                    className="border-radius-4px input-large md-py-0"
                    type="text"
                    name="orderPhoneNumber"
                    value={orderInfo.orderPhoneNumber}
                    onChange={handleAddressChange}
                    required
                  />
                  {errors.orderPhoneNumber && (
                    <p className="text-danger text-start">
                      {errors.orderPhoneNumber}
                    </p>
                  )}
                </div>
                <div className="col-12 mb-20px md-mb-10px">
                  <label>이메일</label>
                  <span className="text-red">*</span>
                  <input
                    className="border-radius-4px input-large md-py-0"
                    type="text"
                    aria-label="first-name"
                    name="orderEmail"
                    value={orderInfo.orderEmail}
                    // onChange={handleAddressChange}
                    required
                  />
                  {errors.orderEmail && (
                    <p className="text-danger text-start">
                      {errors.orderEmail}
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-0 pb-0">
        <div className="container ">
          <div className="align-items-start ">
            <div className="col-lg-12 md-mb-50px xs-mb-35px text-decoration-line-bottom pb-5">
              <span className="fs-26 md-fs-20 fw-600 text-dark-gray mb-0 md-mb-0 d-block">
                배송지 정보
              </span>

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
                      className="col-3 btn w-20 sm-w-40 btn-round-edge"
                      onClick={handleDeliveryModalOpen}
                    >
                      배송지 변경
                    </Button>
                  </div>
                </div>
                <form className="">
                  <div className="col-12 mb-20px md-mb-10px">
                    <label>배송지 이름</label>
                    <input
                      className="border-radius-4px input-large md-py-0"
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
                  <div className="col-12 mb-20px md-mb-10px">
                    <label>받는분 이름</label>
                    <span className="text-red">*</span>
                    <input
                      className="border-radius-4px input-large md-py-0"
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
                  <div className="col-12 mb-20px md-mb-10px">
                    <label>휴대폰번호</label>
                    <span className="text-red">*</span>
                    <input
                      className="border-radius-4px input-large md-py-0"
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

                  <div className="col-12 mb-10px">
                    <label>배송주소</label>
                    <span className="text-red">*</span>
                    <div className="row d-flex justify-content-between flex-sm-wrap-reverse m-0">
                      <input
                        className="col-7 col-md-9 border-radius-4px input-large md-py-0"
                        type="text"
                        aria-label="first-name"
                        name="zipcode"
                        value={
                          (orderAddressData.zipcode =
                            selectedAddress.zipcode || orderAddressData.zipcode)
                        }
                        required
                      />
                      {isAddresOpen && errors.zipcode && (
                        <p className="text-danger text-start p-0">
                          {errors.zipcode}
                        </p>
                      )}

                      <AddressSearch onComplete={setSelectedAddress}>
                        주소 찾기
                      </AddressSearch>
                    </div>
                    <input
                      className="col-12 border-radius-4px input-large md-py-0 mt-1"
                      type="text"
                      aria-label="first-name"
                      name="address1"
                      value={
                        (orderAddressData.address1 =
                          selectedAddress.address1 || orderAddressData.address1)
                      }
                      required
                    />
                    {isAddresOpen && errors.address1 && (
                      <p className="text-danger text-start p-0">
                        {errors.address1}
                      </p>
                    )}
                    <input
                      className="col-12 border-radius-4px input-large md-py-0 mt-1"
                      type="text"
                      aria-label="first-name"
                      name="address2"
                      value={orderAddressData.address2}
                      onChange={handleAddressChange}
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
                    <label>배송메시지</label>
                    <textarea
                      className="border-radius-4px textarea-small"
                      rows="3"
                      cols="5"
                      placeholder=""
                    ></textarea>
                  </div>
                </form>

                {/* <AddressSearch onComplete={setSelectedAddress} />
                  <p>선택된 주소: {selectedAddress}</p> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className=" md-pt-0">
        <div className="container ">
          <div className="row row-cols-1 row-cols-lg-4 row-cols-sm-2 d-md-flex justify-content-center pb-5">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className="col icon-with-text-style-07 transition-inner-all md-w-25"
              >
                <div
                  className={`feature-box h-100 justify-content-start text-center p-17 md-p-0 border border-1 border-radius-10px ${
                    selectedMethod === method.id
                      ? 'bg-black'
                      : 'border-dark-gray bg-light-gray bg-white'
                  }`}
                  role="button"
                  onClick={() => setSelectedMethod(method.id)}
                >
                  <div className="feature-box-icon mb-30px md-mb-5px md-pt-10px">
                    <i
                      className={`${method.icon} icon-large text-dark-gray ${
                        selectedMethod === method.id ? 'text-white' : ''
                      }`}
                    ></i>
                  </div>
                  <div className="feature-box-content">
                    <span
                      className={`d-inline-block fw-600 text-dark-gray fs-18 md-fs-12 ${
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
              <span className="fs-26 md-fs-20 fw-600 text-dark-gray mb-5px d-block">
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
              className="btn btn-base-color btn-large btn-switch-text btn-round-edge btn-box-shadow w-100 border-radius-30px"
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
      {/* 배송지 변경 컴포넌트 */}
      <Modal
        isOpen={isModalDeliveryOpen}
        onClose={() => setIsModalDeliveryOpen(false)}
        title="Slide up animation"
      >
        <div className="w-60 md-w-90 md-h-100">
          <div className="modal-content p-0 rounded shadow-lg">
            <div className="row align-items-center justify-content-center pricing-table-style-07 bg-gradient-very-light-gray">
              <div className="p-7 lg-p-5 sm-p-7 bg-gradient-very-light-gray">
                <div className="col-lg-12 col-md-12 md-mb-30px p-0 fs-16 md-fs-12">
                  <ul className="nav nav-tabs justify-content-center border-0 text-left">
                    {addressList.length > 0 &&
                      addressList.map((address, index) => (
                        <>
                          <li className="nav-item mb-30px p-0" key={index}>
                            <a
                              data-bs-toggle="tab"
                              href="#tab_four1"
                              className="nav-link box-shadow-extra-large ps-20px pe-20px pt-10px lg-px-5 pb-0 border-radius-8px pb-0"
                              onClick={() => setFocusAddress(address.id)}
                            >
                              <div className="flex-column flex-sm-row d-flex align-items-center">
                                <div className="col-1 align-items-center d-flex me-auto w-150px lg-w-120px xs-w-auto mx-auto xs-mb-20px">
                                  <div className="icon w-30px h-30px d-flex flex-shrink-0 align-items-center justify-content-center fs-11 border border-2 border-radius-100 me-10px">
                                    <i className="fa-solid fa-check"></i>
                                  </div>
                                </div>
                                <div className="col-md-7 icon-with-text-style-01 md-mb-25px">
                                  <div className="feature-box feature-box-left-icon-middle last-paragraph-no-margin">
                                    <div className="feature-box-content">
                                      <span className="d-inline-block text-dark-gray mb-5px fs-20 ls-minus-05px me-15px">
                                        {address.deliveryName}
                                      </span>
                                      {address.isDefault && (
                                        <span className="py-1 ps-15px pe-15px md-mt-10px md-mb-10px border-radius-100px text-uppercase bg-yellow text-black fs-12 lh-28 fw-700">
                                          기본배송지
                                        </span>
                                      )}
                                      <p className="w-100 m-0">
                                        받는분 이름 - {address.recipientName}
                                      </p>
                                      <p className="w-100 m-0">
                                        핸드폰번호 - {address.phoneNumber}
                                      </p>
                                      <p className="w-100">
                                        우편번호 - [{address.zipcode}] <br />
                                        주소 - {address.address1}{' '}
                                        {address.address2}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </a>
                          </li>
                        </>
                      ))}
                  </ul>
                  <div className="text-center">
                    <Link to="#" className="fw-500 d-inline lh-initial ps-2">
                      <Button
                        className="btn w-10 mt-10px d-inline w-40 "
                        onClick={handleDeliveryAddressChage}
                      >
                        배송지 변경
                      </Button>
                    </Link>
                    <Link to="#" className="fw-500 d-inline lh-initial ps-2">
                      <Button
                        color="black"
                        className="btn w-10 mt-10px d-inline w-40"
                        onClick={() => setIsModalDeliveryOpen(false)}
                      >
                        닫기
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* 결제하기 모달 */}
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
