import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '@/components/common/Button/Button';
import Modal from '@/components/common/Modal/Modal';
import useAuth from '@/hooks/useAuth';
import useDeviceType from '@/hooks/useDeviceType';
import AddressSearch from '@/components/AddressSearch';

import {
  getMembersAddressDefault,
  getMembersAddressList,
} from '@/api/member/deliveryApi';

import { getSelectCart, deleteCart } from '@/api/member/cartApi';

import {
  postInicisPaymentForm,
  postInicisPaymentResult,
} from '@/api/payment/paymentApi';

import { isValidEmail, isValidPhoneNumber } from '@/utils/validators';
import { removeHyphens, formatPhoneNumberInput } from '@/utils/utils';

const paymentMethods = [
  { id: 'CARD', label: '신용카드', icon: 'line-icon-Credit-Card2' },
  { id: 'BANK', label: '계좌이체', icon: 'line-icon-Bank' },
  // { id: 'VBANK', label: '무통장입금', icon: 'line-icon-Money-2' },
  // { id: 'mobile', label: '휴대폰결제', icon: 'line-icon-Smartphone-3' },
];

const CheckOutPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [isAddresOpen, SetIsAddresOpen] = useState(false);
  const [focusAddress, setFocusAddress] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeliveryOpen, setIsModalDeliveryOpen] = useState(false);
  const [isNotAddressModalOpen, setIsNotAddressModalOpen] = useState(false);
  const [orderProductData, setOrderProductData] = useState([]);
  const [orderAddressData, setOrderAddressData] = useState({
    id: '',
    deliveryName: '',
    recipientName: '',
    phoneNumber: '',
    address1: '',
    address2: '',
    zipcode: '',
    isDefault: true,
    deliveryMessage: '',
  });
  const [errors, setErrors] = useState({});
  const [selectedAddress, setSelectedAddress] = useState({});
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [addressList, setAddressList] = useState([]);
  const [payment, setPayment] = useState({
    buyerName: '',
    buyerEmail: '',
    buyerPhone: '',
    buyerReferrer: '',
    deliveryAddressInfo: {},
    orderItems: [],
  });
  const deviceType = useDeviceType();

  //바로 주문, 장바구니 경로로 분기 처리
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin');
      return;
    }

    const stateOrderType = location.state?.orderType;
    const stateProduct = location.state?.product;
    const selectedItemsFromCart = location.state?.selectedItems;

    if (stateOrderType === 'direct' && stateProduct) {
      // ✅ 직접 구매
      sessionStorage.setItem('orderType', 'direct');
      sessionStorage.setItem('order_product', JSON.stringify(stateProduct));

      setOrderProductData([stateProduct]);
      setPayment((prev) => ({
        ...prev,
        orderItems: [stateProduct],
      }));
    } else if (
      stateOrderType === 'cart' &&
      Array.isArray(selectedItemsFromCart)
    ) {
      // ✅ 장바구니 → 선택한 상품만 사용
      setOrderProductData(selectedItemsFromCart);
      setPayment((prev) => ({
        ...prev,
        orderItems: selectedItemsFromCart,
      }));
    } else if (location.state == null) {
      // ✅ Fallback: 세션스토리지에서 복원
      const storedOrderType = sessionStorage.getItem('orderType');
      const storedProduct = sessionStorage.getItem('order_product');
      const parsedStoredProduct = storedProduct
        ? JSON.parse(storedProduct)
        : null;

      if (storedOrderType === 'direct' && parsedStoredProduct) {
        setOrderProductData([parsedStoredProduct]);
        setPayment((prev) => ({
          ...prev,
          orderItems: [parsedStoredProduct],
        }));
        return;
      }

      // ✅ 세션에도 없으면 전체 장바구니 불러오기
      fetchOrderFromCart();
    } else {
      // ✅ 장바구니 진입이지만 상태 없음
      sessionStorage.removeItem('orderType');
      sessionStorage.removeItem('order_product');
      fetchOrderFromCart();
    }

    // 🔁 장바구니 전체 API 호출
    async function fetchOrderFromCart() {
      const res = await getSelectCart();
      if (res.status === 200) {
        const { data } = res.data;
        setOrderProductData(data);
        setPayment((prev) => ({
          ...prev,
          orderItems: data,
        }));
      }
    }
  }, [location.state, isAuthenticated, navigate]);

  // 결제 취소 후 돌아올 때 구매자 정보 복원
  useEffect(() => {
    const savedBuyerInfo = sessionStorage.getItem('checkout_buyer_info');
    if (savedBuyerInfo) {
      try {
        const buyerInfo = JSON.parse(savedBuyerInfo);
        setPayment((prev) => ({
          ...prev,
          buyerName: buyerInfo.buyerName || '',
          buyerPhone: buyerInfo.buyerPhone || '',
          buyerEmail: buyerInfo.buyerEmail || '',
          buyerReferrer: buyerInfo.buyerReferrer || '',
        }));
      } catch (error) {
        console.error('구매자 정보 복원 실패:', error);
        // 잘못된 데이터가 있으면 삭제
        sessionStorage.removeItem('checkout_buyer_info');
      }
    }
  }, []);

  // 구매자 정보 정리 함수
  const clearSavedBuyerInfo = () => {
    sessionStorage.removeItem('checkout_buyer_info');
  };

  // 컴포넌트 unmount 시 정리 (선택사항)
  useEffect(() => {
    return () => {
      // 페이지를 완전히 떠날 때만 정리 (뒤로가기나 새로고침이 아닌 경우)
      // 실제 결제 완료 페이지로 이동할 때는 별도로 clearSavedBuyerInfo() 호출
    };
  }, []);

  useEffect(() => {
    SetIsAddresOpen(false);
  }, [selectedAddress]);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const res = await getMembersAddressDefault();
        if (res.status === 200) {
          const { data } = res.data;
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
    let isFocused = false;

    const focusIfFirst = (selector) => {
      if (!isFocused) {
        const el = document.querySelector(selector);
        if (el) el.focus();
        isFocused = true;
      }
    };

    if (!payment.buyerName) {
      newErrors.buyerName = '이름을 입력해주세요.';
      focusIfFirst('input[name="buyerName"]');
    }

    if (!payment.buyerPhone) {
      newErrors.buyerPhone = '휴대폰 번호를 입력해주세요.';
      focusIfFirst('input[name="buyerPhone"]');
    }
    if (!isValidPhoneNumber(payment.buyerPhone)) {
      newErrors.buyerPhone = '휴대폰 번호를 올바르게 입력 해주세요.';
      focusIfFirst('input[name="buyerPhone"]');
    }

    if (!payment.buyerEmail) {
      newErrors.buyerEmail = '이메일을 입력해주세요.';
      focusIfFirst('input[name="buyerEmail"]');
    }

    if (!isValidEmail(payment.buyerEmail)) {
      newErrors.buyerEmail = '이메일 양식에 맞게 작성해주세요.';
      focusIfFirst('input[name="buyerEmail"]');
    }

    if (!orderAddressData.deliveryName) {
      newErrors.deliveryName = '배송지 이름을 입력해주세요.';
      focusIfFirst('input[name="deliveryName"]');
    }

    if (!orderAddressData.recipientName) {
      newErrors.recipientName = '받는분 이름을 입력해주세요.';
      focusIfFirst('input[name="recipientName"]');
    }

    if (!orderAddressData.phoneNumber) {
      newErrors.phoneNumber = '배송지 연락처를 입력해주세요.';
      focusIfFirst('input[name="phoneNumber"]');
    }

    if (!isValidPhoneNumber(orderAddressData.phoneNumber)) {
      newErrors.phoneNumber = '배송지 연락처를 올바르게 입력 해주세요.';
      focusIfFirst('input[name="phoneNumber"]');
    }

    if (!orderAddressData.zipcode) {
      newErrors.zipcode = '우편번호를 입력해주세요.';
      focusIfFirst('input[name="zipcode"]');
    }

    if (!orderAddressData.address1) {
      newErrors.address1 = '기본 주소를 입력해주세요.';
      focusIfFirst('input[name="address1"]');
    }

    if (!orderAddressData.address2) {
      newErrors.address2 = '상세 주소를 입력해주세요.';
      focusIfFirst('input[name="address2"]');
    }

    // if (!selectedMethod) {
    //   alert('결제 수단을 선택해주세요.');
    //   const methodSection = document.querySelector('.icon-with-text-style-07');
    //   methodSection?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    //   isFocused = true;
    //   newErrors.selectedMethod = '결제 수단을 선택해주세요.';
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //주문자 변경
  const handlePaymentChange = (e) => {
    const { name, value } = e.target;

    let processedValue = value;
    if (name === 'buyerPhone') {
      processedValue = formatPhoneNumberInput(value);
    }

    setPayment((prev) => ({
      ...prev,
      [name]: processedValue, // 입력된 name에 해당하는 속성만 변경
    }));
  };

  //배송지정보 변경
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    let newErrors = {};

    //핸드폰번호는 하이픈 제거

    let processedValue = value;
    if (name === 'phoneNumber') {
      processedValue = formatPhoneNumberInput(value);
    }

    setOrderAddressData({
      ...orderAddressData,
      [name]: processedValue,
    });
  };

  // 장바구니 총계를 계산하는 함수
  const calculateOrderTotal = () => {
    let totalQty = 0;
    let totalProductPrice = 0;
    let totalDiscount = 0;
    let totalDeliveryFee = 0;

    orderProductData.forEach((product) => {
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
  } = calculateOrderTotal();

  const handlePaymentConfirm = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    if (!selectedMethod) {
      alert('결제 수단을 선택해주세요.');
      const methodSection = document.querySelector('.icon-with-text-style-07');
      methodSection?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsModalOpen(true);
  };

  //결제하기 이벤트 핸들러
  const handlePaymentProgress = async (e) => {
    e.preventDefault();

    try {
      // 결제 진행 전에 구매자 정보 저장
      const buyerInfo = {
        buyerName: payment.buyerName,
        buyerPhone: payment.buyerPhone,
        buyerEmail: payment.buyerEmail,
        buyerReferrer: payment.buyerReferrer,
      };
      sessionStorage.setItem('checkout_buyer_info', JSON.stringify(buyerInfo));

      // 1. 주문 폼 데이터 요청
      const convertedAddress = {
        name: orderAddressData.deliveryName,
        recipient: orderAddressData.recipientName,
        phoneNumber: removeHyphens(orderAddressData.phoneNumber),
        zipcode: orderAddressData.zipcode,
        address1: orderAddressData.address1,
        address2: orderAddressData.address2,
        saveDefaultDelivery: orderAddressData.isDefault,
        deliveryMessage: orderAddressData.deliveryMessage,
      };

      const updatedPayment = {
        ...payment,
        buyerPhone: removeHyphens(payment.buyerPhone),
        deliveryAddressInfo: convertedAddress,
      };

      const res = await postInicisPaymentForm(updatedPayment);

      if (res.status !== 200) throw new Error('결제 정보 요청 실패');
      const paymentReqObj = res.data.data;
      paymentReqObj.P_PAY_TYPE = selectedMethod; //"CARD:BANK:VBANK"
      paymentReqObj.P_DEVICE_TYPE = deviceType;

      if (window.INIPayPro) {
        window.INIPayPro.requestPayment(paymentReqObj);
      } else {
        alert('결제 모듈이 로딩되지 않았습니다.');
      }
    } catch (err) {
      console.error(err);
      alert('결제 요청 중 오류가 발생했습니다.');
    }
  };

  const handleDeliveryModalOpen = async () => {
    const { data } = await getMembersAddressList();
    const address = data.data;
    if (address.length <= 0) {
      setIsNotAddressModalOpen(true);
      return;
    }
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
                  <table className="table cart-products order-products">
                    <thead>
                      <tr>
                        <th scope="col" className="fw-600 text-center">
                          상품명
                        </th>
                        <th scope="col"></th>
                        <th scope="col" className="fw-600 text-center">
                          개수
                        </th>
                        <th scope="col" className="fw-600 text-center">
                          배송비
                        </th>
                        <th scope="col" className="fw-600 text-center">
                          상품금액
                        </th>
                        <th scope="col" className="fw-600 text-center">
                          상품할인금액
                        </th>
                        <th scope="col" className="fw-600 text-center">
                          결제금액
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderProductData.length > 0 &&
                        orderProductData.map((order, index) => (
                          <tr key={index}>
                            <td className="product-thumbnail">
                              <Link to={`/shop/${order.productId}`}>
                                <img
                                  className="cart-product-image"
                                  src={
                                    order.productImage || order.productImages[0]
                                  }
                                  alt={order.productImage}
                                />
                              </Link>
                            </td>
                            <td className="product-name  md-fs-12 text-center">
                              <Link
                                to={`/shop/${order.productId}`}
                                className="text-dark-gray fw-500 d-block lh-initial"
                              >
                                {order.productName}
                              </Link>
                            </td>

                            <td
                              className="product-quantity text-center"
                              data-title="개수"
                            >
                              {order.quantity}개
                            </td>
                            <td
                              className="product-price text-center"
                              data-title="배송비"
                            >
                              {order.deliveryFee.toLocaleString()}원
                            </td>
                            <td
                              className="product-price text-center"
                              data-title="상품금액"
                            >
                              {(order.price * order.quantity).toLocaleString()}
                              원
                            </td>

                            <td
                              className="product-subtotal text-center"
                              data-title="상품할인금액"
                            >
                              -
                              {(
                                order.discountedPrice * order.quantity
                              ).toLocaleString()}
                              원
                            </td>
                            <td
                              className="product-subtotal text-center"
                              data-title="결제금액"
                            >
                              <strong>
                                {(
                                  order.deliveryFee +
                                  order.price * order.quantity -
                                  order.discountedPrice * order.quantity
                                ).toLocaleString()}
                              </strong>
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
                    className="border-radius-4px input-large md-py-0 text-black sm-fs-14"
                    type="text"
                    name="buyerName"
                    value={payment.buyerName}
                    onChange={handlePaymentChange}
                    required
                  />

                  {errors.buyerName && (
                    <p className="text-danger text-start">{errors.buyerName}</p>
                  )}
                </div>
                <div className="col-12 mb-20px md-mb-10px">
                  <label>휴대폰</label>
                  <span className="text-red">*</span>
                  <input
                    className="border-radius-4px input-large md-py-0 text-black sm-fs-14"
                    type="text"
                    name="buyerPhone"
                    value={payment.buyerPhone}
                    onChange={handlePaymentChange}
                    required
                  />
                  {errors.buyerPhone && (
                    <p className="text-danger text-start">
                      {errors.buyerPhone}
                    </p>
                  )}
                </div>
                <div className="col-12 mb-20px md-mb-10px">
                  <label>이메일</label>
                  <span className="text-red">*</span>
                  <input
                    className="border-radius-4px input-large md-py-0 text-black sm-fs-14"
                    type="text"
                    name="buyerEmail"
                    value={payment.buyerEmail}
                    onChange={handlePaymentChange}
                    required
                  />
                  {errors.buyerEmail && (
                    <p className="text-danger text-start">
                      {errors.buyerEmail}
                    </p>
                  )}
                </div>
                <div className="col-12 mb-20px md-mb-10px">
                  <label>추천인 이름 (선택사항)</label>
                  <input
                    className="border-radius-4px input-large md-py-0 text-black sm-fs-14"
                    type="text"
                    name="buyerReferrer"
                    value={payment.buyerReferrer}
                    onChange={handlePaymentChange}
                    maxLength={50}
                  />
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
                      className="d-none col-9 border-radius-4px input-large text-black"
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
                      className="border-radius-4px input-large md-py-0 text-black sm-fs-14"
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
                      className="border-radius-4px input-large md-py-0 text-black sm-fs-14"
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
                      className="border-radius-4px input-large md-py-0 text-black sm-fs-14"
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
                        className="col-7 col-md-7 border-radius-4px input-large md-py-0 text-black sm-fs-14"
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
                      className="col-12 border-radius-4px input-large md-py-0 mt-1 text-black sm-fs-14"
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
                      className="col-12 border-radius-4px input-large md-py-0 mt-1 text-black sm-fs-14"
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
                          value={orderAddressData.isDefault}
                          className="check-box align-middle text-black"
                        />
                        <span className="box sm-fs-14">기본 배송지로 저장</span>
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
                      className="border-radius-4px textarea-large text-black sm-fs-14"
                      rows="3"
                      cols="5"
                      name="deliveryMessage"
                      value={orderAddressData.deliveryMessage}
                      onChange={handleAddressChange}
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
                className="col icon-with-text-style-07 transition-inner-all md-w-25 sm-p-2"
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
                    <th className="w-45 fw-600 text-dark-gray">상품금액</th>
                    <td className="text-dark-gray fw-600">
                      {totalProductPrice.toLocaleString()}원
                    </td>
                  </tr>
                  <tr>
                    <th className="w-45 fw-600 text-dark-gray">상품할인금액</th>
                    <td className="text-dark-gray fw-600">
                      -{totalDiscount.toLocaleString()}원
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
          <div className="col-lg-12">
            <Link
              className="btn btn-base-color btn-large btn-switch-text btn-round-edge btn-box-shadow w-100 border-radius-30px"
              onClick={handlePaymentConfirm}
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
        <div className="md-w-80 sm-w-100 md-h-600px sm-h-auto">
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
                                <div className="col-1 align-items-center d-flex me-auto xs-w-auto mx-auto xs-mb-20px">
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
                    <Link className="fw-500 d-inline lh-initial ps-2">
                      <Button
                        className="btn mt-10px d-inline fs-16"
                        onClick={handleDeliveryAddressChage}
                      >
                        배송지 변경
                      </Button>
                    </Link>
                    <Link className="fw-500 d-inline lh-initial ps-2">
                      <Button
                        color="black"
                        className="btn mt-10px d-inline fs-16"
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
      <Modal
        isOpen={isNotAddressModalOpen}
        onClose={() => setIsNotAddressModalOpen(false)}
      >
        <div className="">
          <div className="modal-content p-0 rounded shadow-lg">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="p-10 sm-p-7 bg-white">
                  <div className="row justify-content-center">
                    <div className="col-md-9 text-center">
                      <h6 className="text-dark-gray fw-500 mb-15px fs-22 sm-fs-16">
                        등록된 배송지 정보가 없습니다.
                        <br />
                        배송지 정보를 입력 해주세요.
                      </h6>
                    </div>
                    <div className="col-lg-12 text-center text-lg-center pt-3">
                      <button
                        className="btn btn-white btn-large btn-box-shadow btn-round-edge submit me-1"
                        onClick={() => setIsNotAddressModalOpen(false)}
                      >
                        확인
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* 결제하기 모달 */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="w-100">
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
                        onClick={handlePaymentProgress}
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
