import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import Button from '@/components/common/Button/Button';
import {
  getOrdersDetail,
  putOrdersPurchasesConfirm,
  putOrdersPurchasesCancel,
  putOrdersVbankCancel,
} from '@/api/orders/ordersApi';
import { formatDate, getFileType, formatNumber } from '@/utils/utils';
import useCopyToClipboard from '@/hooks/useCopyToClipboard';
import Modal from '@/components/common/Modal/Modal';
import { FaStar } from 'react-icons/fa'; // FontAwesome 별 아이콘 사용

import { postRequestPresignedUrl } from '@/api/fileupload/uploadApi';
import { postMeReviews } from '@/api/member/personalApi';
import { postReviewRegister } from '@/api/products/reviewsApi';

const MyPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [delivery, setDelivery] = useState({});
  const [payment, setPayment] = useState({});
  const [product, setProduct] = useState({});
  const [actions, setActions] = useState({});
  const [vBankData, setVBankData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState({
    rate: 0,
    content: '',
    images: [],
  });
  const [isReviewWriteModalOpen, setIsReviewWriteModalOpen] = useState(false);
  const [isReviewReadModalOpen, setIsReviewReadModalOpen] = useState(false);
  const [isConfirmPurchaseTitle, setIsConfirmPurchaseTitle] = useState('');
  const [isConfirmPurchaseModalOpen, setIsConfirmPurchaseModalOpen] =
    useState(false);

  const [files, setFiles] = useState([]);
  const [orderTarget, setOrderTarget] = useState({
    orderNumber: '',
    productInfo: [],
  });
  const [productTargetId, setProductTargetId] = useState('');
  const [meReviews, setMeReviews] = useState({});
  const orderNumber = searchParams.get('orderNumber'); // ✅ URL에서 key 값 가져오기
  const copyToClipboard = useCopyToClipboard();

  const initialForm = {
    rate: 0,
    content: '',
    images: [],
  };

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
  };
  const [viewSelect, setViewSelect] = useState(initData);

  useEffect(() => {
    if (!orderNumber) {
      navigate(
        `/error?desc=${'접근 할 수 없는 페이지 입니다.'}&pageUrl=${'/checkout'}`
      );
      return;
    }

    const fetchOrder = async () => {
      try {
        const { status, data } = await getOrdersDetail(orderNumber);
        console.log(data);

        if (status !== 200) {
          alert('통신 에러가 발생했습니다.');
          return;
        }
        const order = data.data;
        setDelivery(order.delivery);
        setPayment(order.payment);
        setProduct(order.product);
        setVBankData(order.vBankData);
        setActions(order.product.nextActions);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrder();
  }, []);

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

    // 이후 로직 (예: 업로드된 파일 URL을 백엔드에 전송)
    const res = await postReviewRegister(orderNumber, {
      ...reviews,
      images: completedUrls,
    });
    if (res.status === 200) {
      setIsModalOpen(false);
      setReviews(initialForm);
    }
  };

  //구매확정
  const handlePurchasesConfirm = async () => {
    const confirmed = window.confirm('구매 확정을 하시겠습니까?');
    if (!confirmed) return;

    const res = await putOrdersPurchasesConfirm(orderNumber);

    if (res.status === 200) {
      setIsConfirmPurchaseTitle('구매 확정 처리 되었습니다.');
      setIsConfirmPurchaseModalOpen(true);
      navigate('/mypage/order-list');
    }
  };

  //결제 취소(paymentMethod값으로 api 분기 처리 됨)
  // const handlePaymentCancel = async (product) => {
  //   const confirmed = window.confirm('결제 취소를 하시겠습니까?');
  //   if (!confirmed) return;

  //   let res;
  //   //if-CARD:BANK, else-VBANK
  //   if (['CARD', 'BANK'].includes(product.paymentMethod)) {
  //     // 카드, 계좌이체
  //     res = await putOrdersPurchasesCancel(orderNumber);
  //   } else if (product.paymentMethod === 'VBANK') {
  //     // 가상계좌 환불
  //     res = await putOrdersVbankCancel(orderNumber);
  //   } else {
  //     alert('결제 취소가 불가능');
  //   }

  //   if (res.status === 200) {
  //     setIsConfirmPurchaseTitle('결제 취소 처리 되었습니다.');
  //     setIsConfirmPurchaseModalOpen(true);
  //   }
  // };

  // 결제취소 핸들러
  const handlePaymentCancel = async (product) => {
    const confirmlMessage =
      product.paymentMethod === 'VBANK' &&
      product.deliveryStatus === 'WAITING_FOR_PAYMENT'
        ? '주문 취소를 하시겠습니까?'
        : '결제 취소를 하시겠습니까?';
    const confirmed = window.confirm(confirmlMessage);
    if (!confirmed) return;

    let res;
    if (['CARD', 'BANK'].includes(product.paymentMethod)) {
      res = await putOrdersPurchasesCancel(orderNumber);
    } else if (product.paymentMethod === 'VBANK') {
      res = await putOrdersVbankCancel(orderNumber);
    } else {
      alert('결제 취소가 불가능');
      return;
    }

    if (res.status === 200) {
      const completeMessage =
        product.paymentMethod === 'VBANK' &&
        product.deliveryStatus === 'WAITING_FOR_PAYMENT'
          ? '주문 취소가 처리 되었습니다.'
          : '결제 취소가 처리 되었습니다.';
      setIsConfirmPurchaseTitle(completeMessage);
      setIsConfirmPurchaseModalOpen(true);
      navigate('/mypage/order-list');
    }
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
      alert('통신 에러가 발생했습니다.');
      return;
    }
    const arr = data.data;
    const matchedReview = arr.find(
      (item) =>
        item.orderNumber === orderNumberId && item.product.id === productId
    )?.review;

    setMeReviews([matchedReview]);
  };

  return (
    <>
      <div className="col-xxl-10 col-lg-9 md-ps-15px">
        <div className="col-12 col-xl-12 col-lg-12 text-start position-relative page-title-extra-large text-decoration-line-bottom mb-3">
          <h6 className="fw-600 text-dark-gray mb-10px">주문/상세내역</h6>
        </div>
        <section className="pt-1 pb-1">
          <div>
            <div
              className="col-12"
              data-anime='{ "el": "childs", "translateY": [15, 0], "opacity": [0,1], "duration": 800, "delay": 200, "staggervalue": 300, "easing": "easeOutQuad" }'
            >
              <div className="row mx-0 border-bottom border-2 border-color-dark-gray pb-50px mb-50px sm-pb-35px sm-mb-35px align-items-center d-block d-md-flex w-100 align-items-center position-relative">
                <span className="fw-600 text-dark-gray fs-22 md-fs-20 ls-minus-05px">
                  {product.deliveryStatusName}
                </span>
                <div className="col-md-1 text-center text-lx-start text-md-start text-sm-center md-mb-15px">
                  <div className="w-300px md-w-250px sm-w-100 sm-mb-10px">
                    {product.images?.[0] && (
                      <img src={product.images[0]} className="w-120px" alt="" />
                    )}
                  </div>
                </div>
                <div className="col-md-4 offset-0 offset-md-1 icon-with-text-style-01 md-mb-25px">
                  <div className="feature-box feature-box-left-icon-middle last-paragraph-no-margin text-center text-md-start">
                    <div className="feature-box-content text-sm-center ps-0 md-ps-25px sm-ps-0">
                      <span className="d-inline-block text-dark-gray mb-5px fs-20 ls-minus-05px">
                        {product.productName}
                      </span>
                      <p className="text-dark-gray mb-5px fs-20 ls-minus-05px">
                        {formatNumber(product.amount + product.deliveryFee)}원
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 text-center text-md-end text-sm-center">
                  <div>
                    {/* actions 속성값에 교환이 있으면 표시 */}
                    {actions.canExchange && (
                      <Link
                        to={`/mypage/exchange?orderNumber=${orderNumber}`}
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
                    {actions.canRefund && (
                      <Link
                        to={`/mypage/return?orderNumber=${orderNumber}`}
                        className="btn btn-white order-btn btn-large btn-switch-text border w-40 me-2 mt-2"
                      >
                        <span>
                          <span className="btn-double-text" data-text="환불">
                            환불
                          </span>
                        </span>
                      </Link>
                    )}
                  </div>

                  <div>
                    {/* nextActions 속성값에 배송조회가 있으면 표시 */}
                    {actions.findDeliveryInfo && (
                      <Link
                        to={`https://www.ilogen.com/web/personal/trace/${product.invoiceNumber}`}
                        className="btn btn-white order-btn btn-large btn-switch-text border w-40 me-2 mt-2"
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
                    {actions.canConfirmPurchase && (
                      <Link
                        to="#"
                        className="btn btn-white order-btn btn-large btn-switch-text border w-40 me-2 mt-2"
                        onClick={() => handlePurchasesConfirm()}
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
                    {actions.canWriteReview && (
                      <Link
                        href="#"
                        className="btn btn-white order-btn btn-large btn-switch-text border w-40 me-2 mt-2"
                        onClick={() => {
                          setOrderTarget({
                            orderNumber: product.orderNumber,
                            productInfo: product.productInfo,
                          });
                          setProductTargetId(product.productInfo[0].productId);

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
                    {actions.canViewReview && (
                      <Link
                        href="#"
                        className="btn btn-white order-btn btn-large btn-switch-text border w-40 me-2 mt-2"
                        onClick={() => setIsModalOpen(true)}
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

                    {/* nextActions 속성값에 결제취소가 있으면 표시 */}
                    {/* {actions.canCancelPayment && (
                      <Link
                        href="#"
                        className="btn btn-white order-btn btn-large btn-switch-text border w-40 me-2 mt-2"
                        onClick={() => handlePaymentCancel(product)}
                      >
                        <span>
                          <span
                            className="btn-double-text"
                            data-text="결제취소"
                          >
                            결제취소
                          </span>
                        </span>
                      </Link>
                    )} */}

                    {/* nextActions 속성값에 결제취소 일경우*/}
                    {(() => {
                      const canCancel = actions.canCancelPayment;
                      const isVbank = product.paymentMethod === 'VBANK';

                      if (!canCancel) return null;

                      const buttonText =
                        isVbank &&
                        product.deliveryStatus === 'WAITING_FOR_PAYMENT'
                          ? '주문취소'
                          : '결제취소';

                      return (
                        <Link
                          to="#"
                          className="btn btn-white order-btn btn-large btn-switch-text border w-40 me-2 mt-2"
                          onClick={() => handlePaymentCancel(product)}
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
            </div>

            {payment.paymentType === 'VBANK' &&
              product.deliveryStatus === 'WAITING_FOR_PAYMENT' && (
                <div className="col pt-1">
                  <div className="bg-very-light-gray border-radius-6px p-20px lg-p-25px your-order-box">
                    <span className="fs-26 fw-600 text-dark-gray mb-5px d-block text-center py-3">
                      <span className="text-base-color">
                        {vBankData.expiresAt}
                      </span>
                      까지 입금을 완료해주세요.
                    </span>

                    <div className="p-40px bg-white border-radius-6px box-shadow-large mt-10px mb-30px sm-mb-25px checkout-accordion">
                      <div className="w-100" id="accordion-style-05">
                        <div className="row pb-1 border-bottom border-1 border-black fs-20">
                          <label className="col-6 mb-5px">
                            <span className="d-inline-block text-dark-gray">
                              입금 금액
                            </span>
                          </label>
                          <h6 className="col-6 mb-0 fs-20 text-end text-base-color">
                            {formatNumber(vBankData.amount)}원
                          </h6>
                        </div>
                        <div className="row pt-1 fs-20">
                          <label className="col-6 mb-5px">
                            <span className="d-inline-block text-dark-gray">
                              가상 계좌 정보
                            </span>
                          </label>
                          <h6 className="col-6 mb-0 fs-20 text-dark-gray text-end text-decoration-underline link-offset-1">
                            {vBankData.bankName} {vBankData.accountNumber}
                            <i
                              className="feather icon-feather-copy icon-small text-dark-gray ps-2"
                              role="button"
                              onClick={() =>
                                copyToClipboard(vBankData.accountNumber)
                              }
                            ></i>
                          </h6>
                        </div>
                        <div
                          id="style-5-collapse-1"
                          className="collapse show"
                          data-bs-parent="#accordion-style-05"
                        >
                          <div className="p-25px bg-very-light-gray mt-20px mb-20px fs-14 lh-24">
                            <ul className="mb-0">
                              <li>
                                입금이 완료되어야 주문이 확인되고 출고가
                                진행됩니다.
                              </li>

                              <li>
                                결제 금액은 1원 단위까지 정확히 입금해 주세요.
                              </li>
                              <li>
                                입금 전에 상품이 품절될 경우, 정해진 시간 내에
                                미입금 시 해당 주문은 자동으로 취소됩니다.
                              </li>
                              <li>
                                입금 후 확인까지 시간이 소요될 수 있으니 양해
                                부탁드립니다.
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
          </div>
        </section>
        <section className="p-0">
          <div
            className="container text-decoration-line-bottom"
            data-anime='{ "el": "childs", "translateY": [-15, 0], "opacity": [0,1], "duration": 300, "delay": 0, "staggervalue": 200, "easing": "easeOutQuad" }'
          >
            <h6 className="fs-40 fw-400 border-black text-start text-black m-0">
              배송지
            </h6>
            <div className="row row-cols-1 row-cols-lg-1 row-cols-md-1 g-0 justify-content-start pt-3">
              <div className="col contact-form-style-04">
                <div className="text-center">
                  <div className="row d-flex align-items-baseline">
                    <label className="mb-10px fw-500 text-start w-15 sm-w-40">
                      받는분
                    </label>
                    <span className="text-black flex-1 text-start">
                      {delivery.recipient}
                    </span>
                  </div>
                  <div className="row ">
                    <label className="mb-10px fw-500 text-start w-15 sm-w-40">
                      주소
                    </label>
                    <span className="text-black flex-1 text-start">
                      {delivery.recipientZipcode}
                      {delivery.recipientAddress1}
                      {delivery.recipientAddress2}
                    </span>
                  </div>
                  <div className="row d-flex align-items-baseline">
                    <label className="mb-10px fw-500 text-start w-15 sm-w-40">
                      배송 메시지
                    </label>

                    <span className="text-black flex-1 text-start">
                      {delivery.deliveryMessage}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div
            className="container text-decoration-line-bottom"
            data-anime='{ "el": "childs", "translateY": [-15, 0], "opacity": [0,1], "duration": 300, "delay": 0, "staggervalue": 200, "easing": "easeOutQuad" }'
          >
            <h6 className="fs-40 fw-400 border-black text-start text-black m-0">
              최종 결제 정보
            </h6>
            <div className="row row-cols-1 row-cols-lg-2 row-cols-md-1 g-0 justify-content-start pt-3">
              <div className="col w-100">
                <div className="text-center">
                  <div className="row d-flex align-items-baseline">
                    <label className="mb-10px fw-500 text-start w-15 sm-w-40">
                      상품 합계
                    </label>
                    <span className="flex-1 text-black text-end">
                      {formatNumber(payment.amount)}원
                    </span>
                  </div>
                  <div className="row d-flex align-items-baseline">
                    <label className="mb-10px fw-500 text-start w-15 sm-w-40">
                      배송비
                    </label>
                    `
                    <span className="flex-1 text-black text-end">
                      {formatNumber(payment.deliveryFee)}원
                    </span>
                  </div>
                  {/* <div className="row d-flex align-items-baseline">
                  <label className="mb-10px fw-500 text-start w-15 sm-w-40">
                    할인 합계
                  </label>
                  <span className="flex-1 text-black text-end">0원</span>
                </div> */}
                  <div className="row d-flex align-items-baseline">
                    <label className="mb-10px fw-500 text-start w-15 sm-w-40 fw-600 text-black">
                      결제 금액
                    </label>
                    <span className="flex-1 text-end text-base-color">
                      {formatNumber(payment.amount + payment.deliveryFee)}원
                    </span>
                  </div>
                  <div className="row d-flex align-items-baseline">
                    <label className="mb-10px fw-500 text-start w-15 sm-w-40">
                      결제 수단
                    </label>
                    <span className="flex-1 text-black text-end text-black fw-600">
                      {payment.bankName}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="w-100">
          <div className="modal-content p-0 rounded shadow-lg">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="p-7 lg-p-5 sm-p-7 bg-very-light-gray">
                  <div className="row justify-content-center mb-30px sm-mb-10px">
                    <div className="col-md-9 text-center">
                      <h4 className="text-dark-gray fw-500 mb-15px">
                        리뷰 쓰기
                      </h4>
                    </div>
                  </div>
                  <form className="row contact-form-style-02">
                    <div className="col-lg-12 mb-20px text-center">
                      <h6 className="text-dark-gray fw-500 mb-15px">
                        상품 만족도
                      </h6>

                      <div>
                        <span className="ls-minus-1px icon-large d-block mt-20px md-mt-0">
                          {[...Array(5)].map((_, index) => (
                            <FaStar
                              key={index}
                              size={35}
                              style={{ cursor: 'pointer', marginRight: '5px' }}
                              color={
                                index < reviews.rate ? '#FFD700' : '#E0E0E0'
                              } 
                              onClick={() => handleStarClick(index)}
                            />
                          ))}
                        </span>
                      </div>
                    </div>
                    <div className="col-md-12 mb-20px">
                      <label className="form-label mb-5px fw-700 text-black">
                        리뷰 작성
                      </label>
                      <textarea
                        className="border-radius-4px form-control"
                        cols="40"
                        rows="4"
                        name="content"
                        value={reviews.content}
                        onChange={handleContentChange}
                        placeholder="리뷰를 남겨주세요."
                      ></textarea>
                    </div>

                    <div className="col-md-12 mb-20px">
                      <div
                        className="border-1 border-dashed rounded mt-1 mb-3 p-1 position-relative text-center "
                        style={{ cursor: 'pointer' }}
                      >
                        <label
                          htmlFor="file-upload"
                          style={{ cursor: 'pointer' }}
                          className="w-50"
                        >
                          <i className="bi bi-camera fs-5 me-2"></i>
                          사진 첨부하기
                        </label>

                        <input
                          id="file-upload"
                          type="file"
                          multiple
                          accept="image/*,"
                          onChange={handleFileChange}
                          className="input-file-upload"
                        />
                      </div>
                      {files.length > 5 && (
                        <p className="text-red text-sm mt-1 text-center mb-1">
                          최대 5개의 이미지만 업로드 가능합니다.
                        </p>
                      )}
                      <div className="d-flex justify-conten-start mt-4 gap-2">
                        {files.map((fileObj, index) => (
                          <div
                            key={index}
                            className="position-relative w-20 h-20"
                          >
                            <Button
                              onClick={() => handleRemoveFile(index)}
                              size="extra-small"
                              className="position-absolute top-0 end-0 bg-black text-white text-sm border-0 md-p-5"
                            >
                              ✕
                            </Button>

                            <img
                              src={fileObj.preview}
                              alt="미리보기"
                              className="w-100 h-100"
                            />
                          </div>
                        ))}
                      </div>

                      {files.length > 0 && (
                        <p className="text-center mt-2">
                          {files.length} / 5 파일 업로드됨
                        </p>
                      )}
                    </div>

                    <div className="col-lg-112 text-center text-lg-center">
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
                          setIsModalOpen(false);
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
      </Modal> */}

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

                            <p className="w-85 sm-w-100">{review.content}</p>
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
    </>
  );
};

export default MyPage;
