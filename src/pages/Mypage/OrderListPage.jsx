import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/common/Button/Button';
import Label from '@/components/common/Label/Label';
import Modal from '@/components/common/Modal/Modal';
import { FaStar } from 'react-icons/fa'; // FontAwesome 별 아이콘 사용

import { postRequestPresignedUrl } from '@/api/fileupload/uploadApi';
import {
  getOrdersList,
  putOrdersPurchasesConfirm,
  putOrdersPurchasesCancel,
  putOrdersVbankCancel,
} from '@/api/orders/ordersApi';
import { postMeReviews } from '@/api/member/personalApi';
import { postReviewRegister } from '@/api/products/reviewsApi';

import { formatDate, getFileType, formatNumber } from '@/utils/utils';

const OrderListPage = () => {
  // 올해 1월 1일 반환
  const getFirstDayOfYear = () => {
    const today = new Date();
    return `${today.getFullYear()}-01-01`;
  };

  // 오늘 날짜 반환 (YYYY-MM-DD 형식)
  const getTodayDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // 월: 0부터 시작
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const initData = {
    startDate: getFirstDayOfYear(), // 기본값: to 기준 90일 전
    endDate: getTodayDate(), // 기본값: 오늘 날짜
    keyword: '',
    status: 'ALL',
    page: 0,
    pageSize: 10,
  };
  const [viewSelect, setViewSelect] = useState(initData);

  const initialForm = {
    orderNumber: '',
    rate: 0,
    content: '',
    images: [],
  };
  const [orders, setOrders] = useState([]);
  const [orderCounters, setorderCounters] = useState({});

  const [isReviewWriteModalOpen, setIsReviewWriteModalOpen] = useState(false);
  const [isReviewReadModalOpen, setIsReviewReadModalOpen] = useState(false);
  const [isConfirmPurchaseTitle, setIsConfirmPurchaseTitle] = useState('');
  const [isConfirmPurchaseModalOpen, setIsConfirmPurchaseModalOpen] =
    useState(false);
  
  // 알림 모달 상태 추가
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // 알림 모달 표시 함수
  const showAlert = (message) => {
    setAlertMessage(message);
    setIsAlertModalOpen(true);
  };

  const [reviews, setReviews] = useState({
    orderNumber: '',
    rate: 0,
    content: '',
    images: [],
  });
  const [files, setFiles] = useState([]);
  const [orderTarget, setOrderTarget] = useState({
    orderNumber: '',
    productInfo: [],
  });
  const [productTargetId, setProductTargetId] = useState('');
  const [meReviews, setMeReviews] = useState({});
  const [hasNext, setHasNext] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // 초기 로딩 상태 추가
  const containerRef = useRef(null); // 스크롤 감지할 영역 참조

  // 👉 데이터 로드 함수
  const fetchOrders = async (append = false) => {
    try {
      const { status, data } = await getOrdersList(viewSelect);
      if (status !== 200) {
        showAlert('통신 에러가 발생했습니다.');
        return;
      }

      const { items, orderCounters } = data.data;

      if (items.length < viewSelect.pageSize) {
        setHasNext(false);
      }

      if (append) {
        setOrders((prev) => [...prev, ...items]);
      } else {
        setOrders(items);
      }

      setorderCounters(orderCounters);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false); // 무조건 false
      setIsLoading(false); // 초기 로딩 완료
    }
  };

  // 👉 조건 변경되면 page 초기화 & 데이터 초기 fetch
  useEffect(() => {
    setOrders([]); // 기존 데이터 초기화
    setViewSelect((prev) => ({
      ...prev,
      page: 0,
    }));
    setHasNext(true);
    setIsLoading(true); // 로딩 상태 시작
    fetchOrders(false);
  }, [viewSelect.startDate, viewSelect.endDate, viewSelect.status]);

  // 👉 page가 변경될 때마다 fetch
  useEffect(() => {
    setIsFetching(true);
    fetchOrders(viewSelect.page !== 0); // 0이면 덮기, 아니면 추가
  }, [viewSelect.page]);

  // 👉 스크롤 이벤트
  useEffect(() => {
    const handleScroll = () => {
      if (isFetching || !hasNext) return;

      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.scrollHeight;

      if (scrollTop + windowHeight + 100 >= documentHeight) {
        setIsFetching(true);
        setViewSelect((prev) => ({
          ...prev,
          page: prev.page + 1,
        }));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFetching, hasNext]);

  // 별점 클릭 핸들러
  const handleStarClick = (index) => {
    setReviews((prevReviews) => ({
      ...prevReviews,
      rate: index + 1, // 클릭한 별까지 점수 설정
    }));
  };

  // 리뷰 내용 입력 핸들러
  const handleContentChange = (e) => {
    const { value } = e.target;
    setReviews((prevReviews) => ({
      ...prevReviews,
      content: value,
    }));
  };

  // 파일 선택 핸들러
  const handleFileChange = (event) => {
    // const selectedFiles = Array.from(event.target.files)
    const selectedFiles = [...event.target.files]
      .filter((file) => file.type.startsWith('image')) // 이미지 파일만 허용
      .slice(0, 5 - files.length); // 최대 5개까지만 추가 가능

    const previewFiles = selectedFiles.map((file) => ({
      originalFile: file, // 원본 File 객체 저장
      preview: URL.createObjectURL(file),
    }));

    setFiles((prevFiles) => [...prevFiles, ...previewFiles]); // 기존 파일 유지
  };

  // 파일 삭제 핸들러
  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    console.log(files);
  };

  // 백엔드 요청하기 전 S3 파일 업로드 (순차 업로드)
  const handleGetFileUploadPath = async () => {
    let completedUrls = [];

    if (files.length > 0) {
      for (const fileObj of files) {
        try {
          const file = fileObj.originalFile; // 원본 File 객체 참조
          if (!(file instanceof File)) {
            console.error('🚨 잘못된 파일 형식:', file);
            continue;
          }
          console.log(`📂 파일 업로드 시작: ${file.name} (${file.type})`);

          // 1️⃣ Presigned URL 요청
          const type = getFileType(file.type);
          const presignedResponse = await postRequestPresignedUrl(type);
          const { data } = presignedResponse.data;
          const url = data.completedUrl; // 업로드 완료 후 접근할 URL
          console.log(`Uploading: ${file.name} -> ${url}`);

          // 2️⃣ S3에 파일 업로드 (순차적 실행)
          const response = await fetch(data.url, {
            method: 'PUT',
            body: file,
            headers: { 'Content-Type': file.type },
          });

          if (!response.ok) throw new Error(`업로드 실패: ${file.name}`);

          // 3️⃣ 업로드 성공한 파일 URL 저장
          completedUrls.push(url);
        } catch (error) {
          console.error(error);
        }
      }
    }

    try {
      const updateReviews = {
        ...reviews,
        orderNumber: orderTarget.orderNumber,
      };

      // 이후 로직 (예: 업로드된 파일 URL을 백엔드에 전송)
      const res = await postReviewRegister(productTargetId, {
        ...updateReviews,
        images: completedUrls,
      });
      if (res.status === 200) {
        setIsReviewWriteModalOpen(false);
        setReviews(initialForm);
      }
    } catch (error) {
      showAlert(error.response.data.message ? error.response.data.message : '리뷰 작성 실패');
      setReviews(initialForm);
    }
  };

  // 구매확정 핸들러
  const handlePurchasesConfirm = async (orderNumber) => {
    const confirmed = window.confirm('구매 확정을 하시겠습니까?');
    if (!confirmed) return;

    const res = await putOrdersPurchasesConfirm(orderNumber);

    if (res.status === 200) {
      setIsConfirmPurchaseTitle('구매 확정 처리 되었습니다.');
      setIsConfirmPurchaseModalOpen(true);
      await fetchOrders(); // ✅ 리스트 새로고침
    }
  };

  // 결제취소 핸들러
  const handlePaymentCancel = async (order) => {
    const confirmlMessage =
      order.product.paymentMethod === 'VBANK'
        ? '주문 취소를 하시겠습니까?'
        : '결제 취소를 하시겠습니까?';
    const confirmed = window.confirm(confirmlMessage);
    if (!confirmed) return;

    let res;
    if (['CARD', 'BANK'].includes(order.product.paymentMethod)) {
      res = await putOrdersPurchasesCancel(order.orderNumber);
    } else if (order.product.paymentMethod === 'VBANK') {
      res = await putOrdersVbankCancel(order.orderNumber);
    } else {
      showAlert('결제 취소가 불가능');
      return;
    }

    if (res.status === 200) {
      const completeMessage =
        order.product.paymentMethod === 'VBANK'
          ? '주문 취소 처리 되었습니다.'
          : '결제 취소 처리 되었습니다.';
      setIsConfirmPurchaseTitle(completeMessage);
      setIsConfirmPurchaseModalOpen(true);
      await fetchOrders(); // ✅ 리스트 새로고침
    }
  };

  // 특정 일 전의 날짜를 반환하는 함수 (to 기준)
  const getPastDate = (baseDate, days) => {
    const date = new Date(baseDate);
    date.setDate(date.getDate() - days); // to 날짜 기준 days 전 날짜 계산
    return date.toISOString().split('T')[0];
  };

  // startDate와 endDate 값 변경 함수
  const handleUpdateFromDate = (daysAgo) => {
    const today = getTodayDate();
    setViewSelect((prev) => ({
      ...prev,
      startDate: getPastDate(today, daysAgo), // 오늘 기준 daysAgo 전 날짜로 변경
      endDate: today, // endDate를 오늘날짜로 설정
    }));
  };

  const handleDeliveryStatusChange = async (status) => {
    setViewSelect((prev) => ({
      ...prev,
      status: status, // 배송상태 값 변경
    }));
  };

  const handleInputChangeDate = (e) => {
    const { name, value } = e.target;

    if (
      name === 'endDate' &&
      viewSelect.startDate &&
      value < viewSelect.startDate
    ) {
      showAlert('종료일은 시작일보다 빠를 수 없습니다.');
      return;
    }

    if (
      name === 'startDate' &&
      viewSelect.endDate &&
      value > viewSelect.endDate
    ) {
      showAlert('시작일은 종료일보다 빠를 수 없습니다.');
      return;
    }

    setViewSelect((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReviewTargetChange = (e, mode) => {
    const { value } = e.target;
    setProductTargetId(value);

    //리뷰보기 모달창 상품명 변경시 아래 코드 호출
    if (mode === 'read') {
      handleFetchMeReviews(orderTarget.orderNumber, value);
    }
  };

  const handleFetchMeReviews = async (orderNumberId, productId) => {
    const { status, data } = await postMeReviews(viewSelect);
    if (status !== 200) {
      showAlert('통신 에러가 발생했습니다.');
      return;
    }
    const arr = data.data;
    const matchedReview = arr.find(
      (item) =>
        item.orderNumber === orderNumberId && item.product.id === productId
    )?.review;

    setMeReviews([matchedReview]);
  };

  const handleSearchClick = () => {
    setViewSelect((prev) => ({
      ...prev,
      page: 0,
    }));

    // 로딩 상태 시작
    setIsLoading(true);
    // 바로 호출
    fetchOrders(false);
  };

  // ⌨ Enter 입력 시 검색 실행
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  // textarea에서 엔터키 입력 시 모달 닫힘 방지
  const handleTextareaKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.stopPropagation();
    }
  };

  // 개행을 <br/> 태그로 변환하는 함수
  const formatContentWithLineBreaks = (content) => {
    if (!content) return '';
    return content.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        {index < content.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  return (
    <>
      <div className="col-xxl-10 col-lg-9 md-ps-15px">
        <div className="col-12 col-xl-12 col-lg-12 text-start position-relative page-title-extra-large text-decoration-line-bottom mb-3">
          <h6 className="fw-600 text-dark-gray mb-10px">주문/배송내역</h6>
        </div>
        <div
          className="toolbar-wrapper border-color-extra-medium-gray d-flex flex-column flex-md-row flex-wrap align-items-center w-100 mb-10px"
          // data-anime='{ "translateY": [0, 0], "opacity": [0,1], "duration": 600, "delay":50, "staggervalue": 150, "easing": "easeOutQuad" }'
        >
          <div className="sm-mb-10px fs-18px tab-style-11">
            <ul className="nav nav-tabs border-0 justify-content-start fw-500 fs-19 md-fs-16">
              <li className="nav-item">
                <a
                  data-bs-toggle="tab"
                  href="#tab_five1"
                  className="nav-link active"
                  onClick={() => handleDeliveryStatusChange('ALL')}
                >
                  전체 {orderCounters.ALL || 0}
                  <span className="tab-border bg-base-color"></span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-bs-toggle="tab"
                  href="#tab_five2"
                  onClick={() => handleDeliveryStatusChange('PAYMENT_PENDING')}
                >
                  입금/결제 {orderCounters.PAYMENT_PENDING || 0}
                  <span className="tab-border bg-base-color"></span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-bs-toggle="tab"
                  href="#tab_five3"
                  onClick={() => handleDeliveryStatusChange('IN_DELIVERY')}
                >
                  배송중 {orderCounters.IN_DELIVERY || 0}
                  <span className="tab-border bg-base-color"></span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-bs-toggle="tab"
                  href="#tab_five4"
                  onClick={() => handleDeliveryStatusChange('DELIVERED')}
                >
                  배송완료 {orderCounters.DELIVERED || 0}
                  <span className="tab-border bg-base-color"></span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-bs-toggle="tab"
                  href="#tab_five4"
                  onClick={() =>
                    handleDeliveryStatusChange('PURCHASE_CONFIRMED')
                  }
                >
                  구매확정 {orderCounters.PURCHASE_CONFIRMED || 0}
                  <span className="tab-border bg-base-color"></span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-bs-toggle="tab"
                  href="#tab_five4"
                  onClick={() =>
                    handleDeliveryStatusChange('EXCHANGE_REQUESTED')
                  }
                >
                  교환 {orderCounters.EXCHANGE_REQUESTED || 0}
                  <span className="tab-border bg-base-color"></span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-bs-toggle="tab"
                  href="#tab_five4"
                  onClick={() => handleDeliveryStatusChange('REFUND_REQUESTED')}
                >
                  환불 {orderCounters.REFUND_REQUESTED || 0}
                  <span className="tab-border bg-base-color"></span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-bs-toggle="tab"
                  href="#tab_five4"
                  onClick={() => handleDeliveryStatusChange('CANCELED')}
                >
                  취소 {orderCounters.CANCELED || 0}
                  <span className="tab-border bg-base-color"></span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div
          className="toolbar-wrapper border-bottom border-color-extra-medium-gray d-flex flex-column flex-md-row flex-wrap align-items-center w-100 mb-40px md-mb-30px pb-15px"
          // data-anime='{ "translateY": [0, 0], "opacity": [0,1], "duration": 600, "delay":50, "staggervalue": 150, "easing": "easeOutQuad" }'
        >
          <div className="mx-auto me-md-0 col tab-style-01">
            <ul className="nav nav-tabs justify-content-start border-0 text-center fs-18 md-fs-12 sm-fs-11 fw-600 mb-3">
              <li className="nav-item mt-10px">
                <a
                  className="nav-link active"
                  data-bs-toggle="tab"
                  href="#tab_sec1"
                  onClick={() => {
                    setViewSelect((prev) => ({
                      ...prev,
                      startDate: "2025-01-01",
                      endDate: getTodayDate(),
                    }));
                  }}
                >
                  전체기간
                </a>
              </li>
              <li className="nav-item mt-10px">
                <a
                  className="nav-link"
                  data-bs-toggle="tab"
                  href="#tab_sec2"
                  onClick={() => handleUpdateFromDate(7)}
                >
                  1주일
                </a>
              </li>
              <li className="nav-item mt-10px">
                <a
                  className="nav-link"
                  data-bs-toggle="tab"
                  href="#tab_sec3"
                  onClick={() => handleUpdateFromDate(30)}
                >
                  1개월
                </a>
              </li>
              <li className="nav-item mt-10px">
                <a
                  className="nav-link"
                  data-bs-toggle="tab"
                  href="#tab_sec4"
                  onClick={() => handleUpdateFromDate(90)}
                >
                  3개월
                </a>
              </li>
              <li className="nav-item mt-10px">
                <input
                  className="border-1 nav-link text-center date-button"
                  type="date"
                  name="startDate"
                  data-bs-toggle="tab"
                  value={viewSelect.startDate}
                  min="2024-01-01"
                  max="2099-12-31"
                  aria-label="date"
                  onChange={handleInputChangeDate}
                />
              </li>
              <li className="nav-item mt-10px">
                <input
                  className="border-1 nav-link text-center date-button"
                  type="date"
                  name="endDate"
                  data-bs-toggle="tab"
                  value={viewSelect.endDate}
                  min="2024-01-01"
                  max="2099-12-31"
                  aria-label="date"
                  onChange={handleInputChangeDate}
                />
              </li>
              <li className="nav-item mt-10px flex-1">
                <div className="position-relative">
                  <input
                    className="border-1 nav-link"
                    type="text"
                    name="keyword"
                    // value={viewSelect.keyword}
                    placeholder="검색어를 입력 해주세요."
                    onChange={handleInputChangeDate}
                    onKeyDown={handleKeyPress}
                  />
                  <i
                    className="feather icon-feather-search align-middle icon-small position-absolute z-index-1 search-icon"
                    style={{ cursor: 'pointer' }}
                    onClick={handleSearchClick}
                  ></i>
                </div>
              </li>
            </ul>
          </div>
        </div>
        {orders.length > 0 ? (
          <div ref={containerRef} className="row justify-content-center">
            <div className="col-12">
              {orders.map((order, index) => (
                <div
                  key={index}
                  className="row mx-0 border-bottom border-2 border-color-dark-gray pb-50px mb-50px sm-pb-10px sm-mb-20px align-items-center d-block d-md-flex w-100 position-relative"
                >
                  <div className="col-12 d-flex justify-content-between md-mb-20px mb-20px">
                    <span className="fw-600 text-dark-gray fs-22 md-fs-20 ls-minus-05px">
                      {order.product.deliveryStatusName}
                    </span>
                    <Link
                      to={`/mypage/order-detail?orderNumber=${order.orderNumber}`}
                    >
                      <span className="fw-500 text-dark-gray fs-18 ls-minus-05px order-text-icon">
                        주문상세
                      </span>
                    </Link>
                  </div>

                  <div className="col-md-1 text-center text-lx-start text-md-start text-sm-center md-mb-15px">
                    <div className="w-300px md-w-250px sm-w-100 sm-mb-10px">
                      <img
                        src={order.product.images[0]}
                        className="w-120px"
                        alt=""
                      />
                    </div>
                  </div>

                  <div className="col-md-6 offset-md-1 icon-with-text-style-01 md-mb-25px">
                    {/* <div className="feature-box feature-box-left-icon-middle last-paragraph-no-margin text-center text-md-start"> */}
                    <div className="row">
                      <div className="text-center">
                        <div className="row d-flex align-items-baseline">
                          <label className="mb-10px fw-500 text-start w-20 sm-w-40">
                            주문번호
                          </label>
                          <span className="text-black flex-1 text-start">
                            {order.orderNumber}
                          </span>
                        </div>
                        <div className="row d-flex align-items-baseline">
                          <label className="mb-10px fw-500 text-start w-20 sm-w-40">
                            주문일시
                          </label>
                          <span className="text-black flex-1 text-start">
                            {order.orderDate}
                          </span>
                        </div>
                        <div className="row d-flex align-items-baseline">
                          <label className="mb-10px fw-500 text-start w-20 sm-w-40">
                            상품명
                          </label>
                          <span className="text-black flex-1 text-start">
                            {order.product.productName}
                          </span>
                        </div>
                        <div className="row d-flex align-items-baseline">
                          <label className="mb-10px fw-500 text-start w-20 sm-w-40">
                            결제금액
                          </label>
                          <span className="text-black flex-1 text-start">
                            {formatNumber(
                              order.product.amount + order.product.deliveryFee
                            )}원
                          </span>
                        </div>
                      </div>


                      {/* <div className="feature-box-content ps-0 md-ps-25px sm-ps-0">
                        <p className="text-dark-gray mb-5px fs-20 ls-minus-05px">
                          주문번호: {order.orderNumber}
                        </p>
                        <p className="text-dark-gray mb-5px fs-20 ls-minus-05px">
                          주문일자: {order.orderDate}
                        </p>
                        <p className="text-dark-gray mb-5px fs-20 ls-minus-05px">
                          상품명: {order.product.productName}
                        </p>
                        <p className="text-dark-gray mb-5px fs-20 ls-minus-05px">
                          결제금액: {formatNumber(
                            order.product.amount + order.product.deliveryFee
                          )}
                          원
                        </p>
                      </div> */}
                    </div>
                  </div>

                  <div className="col-md-4 text-center text-md-end text-sm-center">
                    <div>
                      {/* actions 속성값에 교환이 있으면 표시 */}
                      {order.product.nextActions.canExchange && (
                        <Link
                          to={`/mypage/exchange?orderNumber=${order.orderNumber}`}
                          className="btn btn-white order-btn btn-large btn-switch-text border w-40 me-2 mt-2"
                        >
                          <span>
                            <span className="btn-double-text" data-text="교환">
                              교환
                            </span>
                          </span>
                        </Link>
                      )}

                      {/* nextActions 속성값에 환불이 있으면 표시 */}
                      {order.product.nextActions.canRefund && (
                        <Link
                          to={`/mypage/return?orderNumber=${order.orderNumber}`}
                          className="btn btn-white order-btn btn-large btn-switch-text border w-40 me-2 mt-2"
                        >
                          <span>
                            <span className="btn-double-text" data-text="반품">
                              반품
                            </span>
                          </span>
                        </Link>
                      )}
                    </div>

                    <div>
                      {/* nextActions 속성값에 배송조회가 있으면 표시 */}
                      {order.product.nextActions.findDeliveryInfo && (
                        <Link
                          to={`https://www.ilogen.com/web/personal/trace/${order.product.invoiceNumber}`}
                          target="_blank"
                          className="btn btn-white order-btn btn-large btn-switch-text border w-40 me-2 mt-2"
                          rel="noopener noreferrer"
                        >
                          <span>
                            <span
                              className="btn-double-text"
                              data-text="배송조회"
                            >
                              배송조회
                            </span>
                          </span>
                        </Link>
                      )}

                      {/* nextActions 속성값에 구매확정이 있으면 표시 */}
                      {order.product.nextActions.canConfirmPurchase && (
                        <Link
                          to="#"
                          className="btn btn-white order-btn btn-large btn-switch-text border w-40 me-2 mt-2"
                          onClick={() =>
                            handlePurchasesConfirm(order.orderNumber)
                          }
                        >
                          <span>
                            <span
                              className="btn-double-text"
                              data-text="구매확정"
                            >
                              구매확정
                            </span>
                          </span>
                        </Link>
                      )}

                      {/* nextActions 속성값에 리뷰쓰기가 있으면 표시 */}
                      {order.product.nextActions.canWriteReview && (
                        <Link
                          href="#"
                          className="btn btn-white order-btn btn-large btn-switch-text border w-40 me-2 mt-2"
                          onClick={() => {
                            setOrderTarget({
                              orderNumber: order.orderNumber,
                              productInfo: order.productInfo,
                            });
                            setProductTargetId(order.productInfo[0].productId);

                            setIsReviewWriteModalOpen(true);
                          }}
                        >
                          <span>
                            <span
                              className="btn-double-text"
                              data-text="리뷰쓰기"
                            >
                              리뷰쓰기
                            </span>
                          </span>
                        </Link>
                      )}
                      {/* nextActions 속성값에 리뷰보기가 있으면 표시 */}
                      {order.product.nextActions.canViewReview && (
                        <Link
                          href="#"
                          className="btn btn-white order-btn btn-large btn-switch-text border w-40 me-2 mt-2"
                          onClick={() => {
                            setOrderTarget({
                              orderNumber: order.orderNumber,
                              productInfo: order.productInfo,
                            });
                            setProductTargetId(order.productInfo[0].productId);
                            handleFetchMeReviews(
                              order.orderNumber,
                              order.productInfo[0].productId
                            );
                            setIsReviewReadModalOpen(true);
                          }}
                        >
                          <span>
                            <span
                              className="btn-double-text"
                              data-text="리뷰보기"
                            >
                              리뷰보기
                            </span>
                          </span>
                        </Link>
                      )}
                      {/* nextActions 속성값에 결제취소 일경우*/}
                      {(() => {
                        const canCancel =
                          order.product.nextActions.canCancelPayment;
                        const isVbank = order.product.paymentMethod === 'VBANK';

                        if (!canCancel) return null;

                        const buttonText =
                          isVbank &&
                          order.product.deliveryStatus === 'WAITING_FOR_PAYMENT'
                            ? '주문취소'
                            : '결제취소';

                        return (
                          <Link
                            to="#"
                            className="btn btn-white order-btn btn-large btn-switch-text border w-40 me-2 mt-2"
                            onClick={() => handlePaymentCancel(order)}
                          >
                            <span>
                              <span
                                className="btn-double-text"
                                data-text={buttonText}
                              >
                                {buttonText}
                              </span>
                            </span>
                          </Link>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : isLoading ? (
          // 로딩 중일 때
          <div className="row justify-content-center">
            <div className="col-12 text-center">
              <div className="feature-box pt-10 pb-15 text-center overflow-hidden">
                <div className="feature-box-icon">
                  <i className="bi bi-arrow-clockwise icon-extra-large text-medium-gray" style={{animation: 'spin 1s linear infinite'}}></i>
                </div>
                <div className="feature-box-content last-paragraph-no-margin pt-1">
                  <p className="text-dark-gray opacity-5">
                    주문 내역을 불러오는 중입니다...
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // 데이터가 없을 때
          <div className="row justify-content-center">
            <div className="col-12 text-center">
              <div className="feature-box pt-10 pb-15 text-center overflow-hidden">
                <div className="feature-box-icon">
                  <i className="bi bi-exclamation-circle icon-extra-large text-medium-gray"></i>
                </div>
                <div className="feature-box-content last-paragraph-no-margin pt-1">
                  <p className="text-dark-gray opacity-5">
                    주문/배송 내역이 없습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Modal
        isOpen={isReviewWriteModalOpen}
        onClose={() => setIsReviewWriteModalOpen(false)}
      >
        <div className="w-100">
          <div className="modal-content p-0 rounded shadow-lg">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="p-7 lg-p-5 sm-p-7 bg-very-light-gray">
                  <div className="row justify-content-center mb-30px sm-mb-10px">
                    <div className="col-md-9 text-center">
                      <h4 className="text-dark-gray fw-500 mb-5px">
                        리뷰 쓰기
                      </h4>
                    </div>
                  </div>
                  <form className="row contact-form-style-02">
                    <div className="col-lg-12 mb-10px text-center">
                      <h6 className="text-dark-gray fw-500 mb-5px">상품명</h6>
                      <div className="select mb-15px">
                        <select
                          className="form-control input-small text-black text-center"
                          name="scope"
                          onChange={(e) => handleReviewTargetChange(e, 'write')}
                        >
                          {orderTarget.productInfo.map((product, idx) => (
                            <option
                              key={product.productId}
                              value={product.productId}
                              selected={idx === 0}
                            >
                              {product.productName}
                            </option>
                          ))}
                        </select>
                      </div>

                      <h6 className="text-dark-gray fw-500 mb-5px">
                        상품 만족도
                      </h6>

                      <div>
                        <span className="ls-minus-1px icon-large d-block md-mt-0">
                          {[...Array(5)].map((_, index) => (
                            <FaStar
                              key={index}
                              size={30}
                              style={{ cursor: 'pointer', marginRight: '5px' }}
                              color={
                                index < reviews.rate ? '#FFD700' : '#E0E0E0'
                              } // 채워진 별은 노란색, 비어있는 별은 회색
                              onClick={() => handleStarClick(index)}
                            />
                          ))}
                        </span>
                      </div>
                    </div>
                    <div className="col-md-12">
                      {/* <label className="form-label mb-5px fw-700 text-black">
                        리뷰 작성
                      </label> */}
                      <textarea
                        className="border-radius-4px form-control"
                        cols="40"
                        rows="3"
                        name="content"
                        value={reviews.content}
                        onChange={handleContentChange}
                        onKeyDown={handleTextareaKeyDown}
                        placeholder="리뷰를 남겨주세요."
                      ></textarea>
                    </div>

                    <div className="col-md-12">
                      {/* 파일 업로드 버튼 스타일링 */}
                      <div
                        className="border-1 border-dashed rounded mt-1 mb-3 p-1 position-relative text-center "
                        style={{ cursor: 'pointer' }}
                      >
                        {/* 클릭 가능한 영역 */}
                        <label
                          htmlFor="file-upload"
                          style={{ cursor: 'pointer' }}
                          className="w-50"
                        >
                          <i className="bi bi-camera fs-5 me-2"></i>
                          사진 첨부하기
                        </label>

                        {/* 숨겨진 파일 업로드 input */}
                        <input
                          id="file-upload"
                          type="file"
                          multiple
                          accept="image/*,"
                          onChange={handleFileChange}
                          className="input-file-upload"
                        />
                      </div>
                      {/* 업로드 제한 메시지 */}
                      {files.length > 5 && (
                        <p className="text-red text-sm mt-1 text-center mb-1">
                          최대 5개의 이미지만 업로드 가능합니다.
                        </p>
                      )}
                      {/* 미리보기 리스트 (가로형) */}
                      <div className="d-flex justify-conten-start mt-4 gap-2">
                        {files.map((fileObj, index) => (
                          <div
                            key={index}
                            className="position-relative w-20 h-20"
                          >
                            {/* 삭제 버튼 */}
                            <Button
                              onClick={() => handleRemoveFile(index)}
                              size="extra-small"
                              className="position-absolute top-0 end-0 bg-black text-white text-sm border-0 md-p-5"
                            >
                              ✕
                            </Button>

                            {/* 이미지 미리보기 */}
                            <img
                              src={fileObj.preview}
                              alt="미리보기"
                              className="w-100 h-100"
                            />
                          </div>
                        ))}
                      </div>

                      {/* 업로드된 파일 수 표시 */}
                      {files.length > 0 && (
                        <p className="text-center mt-2">
                          {files.length} / 5 파일 업로드됨
                        </p>
                      )}
                    </div>

                    <div className="col-lg-12 text-center text-lg-center">
                      <input type="hidden" name="redirect" value="" />
                      <Button
                        className="btn btn-base-color btn-box-shadow btn-round-edge me-1"
                        onClick={handleGetFileUploadPath}
                      >
                        리뷰쓰기
                      </Button>
                      <Button
                        className="btn btn-white btn-box-shadow btn-round-edge me-1"
                        onClick={() => {
                          setIsReviewWriteModalOpen(false);
                          setReviews(initialForm);
                          setFiles([]);
                        }}
                      >
                        닫기
                      </Button>
                    </div>
                    <div className="col-12">
                      <div className="form-results mt-20px d-none"></div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isReviewReadModalOpen}
        onClose={() => setIsReviewReadModalOpen(false)}
      >
        <div className="w-100">
          <div className="modal-content p-0 rounded shadow-lg">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="p-3 lg-p-3 sm-p-7 bg-very-light-gray">
                  <div className="row justify-content-center mb-10px sm-mb-10px">
                    <div className="col-md-9 text-center">
                      <h4 className="text-dark-gray fw-500 mb-5px">
                        리뷰 보기
                      </h4>
                    </div>
                  </div>
                  <form className="row contact-form-style-02">
                    <div className="col-lg-12 text-center">
                      <h6 className="text-dark-gray fw-500 mb-5px">상품명</h6>
                      <div className="select">
                        <select
                          className="form-control input-small text-black text-center"
                          name="scope"
                          onChange={(e) => handleReviewTargetChange(e, 'read')}
                        >
                          {orderTarget.productInfo.map((product, idx) => (
                            <option
                              key={product.productId}
                              value={product.productId}
                              selected={idx === 0}
                            >
                              {product.productName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </form>
                </div>

                <div className="row g-0 mb-0 md-mb-35px sm-mb-0">
                  {meReviews.length > 0 ? (
                    meReviews.map((review, index) => (
                      <div
                        key={review.id || index}
                        className="col-12 border-bottom border-color-extra-medium-gray mb-0px xs-pb-0px"
                      >
                        <div className="d-block d-md-flex w-100 align-items-center position-relative">
                          {/* 리뷰 이미지 */}
                          <div className="w-250px md-w-250px sm-w-100 text-center">
                            {review.image1 && (
                              <img
                                src={review.image1}
                                className="w-120px md-w-100px md-h-100px mb-10px"
                                alt="리뷰 이미지"
                              />
                            )}
                            <span className="text-dark-gray fw-600 d-block">
                              {formatDate(review.createdAt)}
                            </span>
                          </div>

                          {/* 리뷰 내용 */}
                          <div className="w-100 ps-50px  md-ps-20px last-paragraph-no-margin sm-ps-0 position-relative text-center text-md-start text-sm-center">
                            {/* ⭐ 별점 표시 */}
                            <span className="text-golden-yellow ls-minus-1px mb-5px sm-mb-0 d-block">
                              {Array.from({ length: 5 }, (_, i) => (
                                <i
                                  key={i}
                                  className={`bi ${
                                    i < review.rate ? 'bi-star-fill' : ''
                                  }`}
                                ></i>
                              ))}
                            </span>
                            {review.image2 && (
                              <span className="w-80px pe-1">
                                <img
                                  src={review.image2}
                                  className="w-80px h-80px md-w-60px md-h-60px mb-10px"
                                  alt="리뷰 이미지"
                                />
                              </span>
                            )}
                            {review.image3 && (
                              <span className="w-80px pe-1">
                                <img
                                  src={review.image3}
                                  className="w-80px h-80px md-w-60px md-h-60px  mb-10px"
                                  alt="리뷰 이미지"
                                />
                              </span>
                            )}
                            {review.image4 && (
                              <span className="w-80px pe-1">
                                <img
                                  src={review.image4}
                                  className="w-80px h-80px md-w-60px md-h-60px  mb-10px"
                                  alt="리뷰 이미지"
                                />
                              </span>
                            )}
                            {review.image5 && (
                              <span className="w-80px pe-1">
                                <img
                                  src={review.image5}
                                  className="w-80px h-80px md-w-60px md-h-60px mb-10px"
                                  alt="리뷰 이미지"
                                />
                              </span>
                            )}

                            <p className="w-85 sm-w-100">{formatContentWithLineBreaks(review.content)}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="pt-100px text-center w-100 fs-22 md-fs-16">
                      <i className="fa-regular fa-pen-to-square align-middle icon-large md-icon-medium text-light-black pe-1"></i>
                      작성된 리뷰가 없습니다.
                    </p>
                  )}
                </div>

                <div className="col-lg-12 text-center text-lg-center my-3">
                  <Button
                    className="btn btn-white btn-box-shadow btn-round-edge me-1"
                    onClick={() => {
                      setIsReviewReadModalOpen(false);
                    }}
                  >
                    닫기
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isConfirmPurchaseModalOpen}
        onClose={() => setIsConfirmPurchaseModalOpen(false)}
      >
        <div className="w-100">
          <div className="modal-content p-0 rounded shadow-lg">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="p-10 sm-p-7 bg-white">
                  <div className="row justify-content-center">
                    <div className="col-md-9 text-center">
                      <h6 className="text-dark-gray fw-500 mb-15px md-fs-18">
                        {isConfirmPurchaseTitle}
                      </h6>
                    </div>
                    <div className="col-lg-12 text-center text-lg-center pt-3">
                      <input type="hidden" name="redirect" value="" />
                      <button
                        className="btn btn-white btn-large btn-box-shadow border-1 border-default me-1"
                        onClick={() => setIsConfirmPurchaseModalOpen(false)}
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

      {/* 알림 모달 (표준화 필요) */}
      <Modal
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
      >
        <div className="w-100">
          <div className="modal-content p-0 rounded shadow-lg">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="p-7 sm-p-7 bg-white">
                  <div className="row justify-content-center">
                    <div className="col-md-9 text-center">
                      <h6 className="text-dark-gray fw-500 fs-24 sm-fs-18">
                        {alertMessage}
                      </h6>
                    </div>
                    <div className="col-lg-12 text-center text-lg-center pt-3">
                      <button
                        className="btn btn-white btn-large btn-box-shadow border-1 border-default me-1 border-radius-6px"
                        onClick={() => setIsAlertModalOpen(false)}
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
    </>
  );
};

export default OrderListPage;
