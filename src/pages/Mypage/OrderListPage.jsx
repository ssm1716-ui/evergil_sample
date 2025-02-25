import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/common/Button/Button';
import Label from '@/components/common/Label/Label';
import Modal from '@/components/common/Modal/Modal';
import { FaStar } from 'react-icons/fa'; // FontAwesome 별 아이콘 사용

import CartImage1 from '@/assets/images/sample/cart-image1.jpg';
import ShopDetailImage3 from '@/assets/images/shop-detail-image3.png';

const initialForm = {
  rate: 0,
  content: '',
  images: [],
};

const OrderListPage = () => {
  const [orderProducts, setorderProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState({
    rate: 0,
    content: '',
    images: [],
  });
  const [uploadedFiles, setUploadedFiles] = useState([]);

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

  // 파일 업로드 핸들러
  const handleFileUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);

    // 최대 5개로 제한
    if (uploadedFiles.length + selectedFiles.length > 5) {
      alert('최대 5개의 파일만 업로드할 수 있습니다.');
      return;
    }

    // 파일 추가
    setUploadedFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  // 파일 삭제 기능
  const handleRemoveFile = (index) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="col-xxl-10 col-lg-9 md-ps-15px md-mb-60px">
        <div className="col-12 col-xl-12 col-lg-12 text-start position-relative page-title-extra-large text-decoration-line-bottom mb-3">
          <h1 className="fw-600 text-dark-gray mb-10px">주문/배송내역</h1>
        </div>
        <div
          className="toolbar-wrapper border-color-extra-medium-gray d-flex flex-column flex-md-row flex-wrap align-items-center w-100 mb-10px"
          data-anime='{ "translateY": [0, 0], "opacity": [0,1], "duration": 600, "delay":50, "staggervalue": 150, "easing": "easeOutQuad" }'
        >
          <div className="sm-mb-10px fs-18px tab-style-04">
            <ul className="nav nav-tabs border-0 justify-content-start fw-500 fs-19 md-fs-16">
              <li className="nav-item">
                <a
                  data-bs-toggle="tab"
                  href="#tab_five1"
                  className="nav-link active"
                >
                  전체 4<span className="tab-border bg-dark-gray"></span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-bs-toggle="tab" href="#tab_five2">
                  입금/결제 0<span className="tab-border bg-dark-gray"></span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-bs-toggle="tab" href="#tab_five3">
                  배송중 0<span className="tab-border bg-dark-gray"></span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-bs-toggle="tab" href="#tab_five4">
                  배송완료 0<span className="tab-border bg-dark-gray"></span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-bs-toggle="tab" href="#tab_five4">
                  구매확정 0<span className="tab-border bg-dark-gray"></span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-bs-toggle="tab" href="#tab_five4">
                  교환 0<span className="tab-border bg-dark-gray"></span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-bs-toggle="tab" href="#tab_five4">
                  환불 0<span className="tab-border bg-dark-gray"></span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-bs-toggle="tab" href="#tab_five4">
                  취소 0<span className="tab-border bg-dark-gray"></span>
                </a>
              </li>
            </ul>
            {/* <a href="#" className="me-10px">
              전체 4
            </a>
            <span className="me-10px">|</span>
            <a href="#" className="me-10px">
              입금/결제 0
            </a>
            <span className="me-10px">|</span>
            <a href="#" className="me-10px">
              배송중 0
            </a>
            <span className="me-10px">|</span>
            <a href="#" className="me-10px">
              배송 완료 0
            </a>
            <span className="me-10px">|</span>
            <a href="#" className="me-10px">
              구매 확정 0
            </a>
            <span className="me-10px">|</span>
            <a href="#" className="me-10px">
              교환 0
            </a>
            <span className="me-10px">|</span>
            <a href="#" className="me-10px">
              환불 0
            </a>
            <span className="me-10px">|</span>
            <a href="#" className="me-10px">
              취소 0
            </a> */}
          </div>
        </div>
        <div
          className="toolbar-wrapper border-bottom border-color-extra-medium-gray d-flex flex-column flex-md-row flex-wrap align-items-center w-100 mb-40px md-mb-30px pb-15px"
          data-anime='{ "translateY": [0, 0], "opacity": [0,1], "duration": 600, "delay":50, "staggervalue": 150, "easing": "easeOutQuad" }'
        >
          <div className="mx-auto me-md-0 col tab-style-01">
            <ul className="nav nav-tabs justify-content-start border-0 text-center fs-18 md-fs-14 fw-600 mb-3">
              <li className="nav-item mt-10px">
                <a
                  className="nav-link active"
                  data-bs-toggle="tab"
                  href="#tab_sec1"
                >
                  전체기간
                </a>
              </li>
              <li className="nav-item mt-10px">
                <a className="nav-link" data-bs-toggle="tab" href="#tab_sec2">
                  1주일
                </a>
              </li>
              <li className="nav-item mt-10px">
                <a className="nav-link" data-bs-toggle="tab" href="#tab_sec3">
                  1개월
                </a>
              </li>
              <li className="nav-item mt-10px">
                <a className="nav-link" data-bs-toggle="tab" href="#tab_sec4">
                  3개월
                </a>
              </li>
              <li className="nav-item mt-10px">
                <input
                  className="border-1 nav-link text-center"
                  type="date"
                  name="date"
                  value="2024-02-06"
                  min="2024-01-01"
                  max="2099-12-31"
                  aria-label="date"
                />
              </li>
              <li className="nav-item mt-10px">
                <input
                  className="border-1 nav-link text-center"
                  type="date"
                  name="date"
                  value="2024-02-13"
                  min="2024-01-01"
                  max="2099-12-31"
                  aria-label="date"
                />
              </li>
              <li className="nav-item mt-10px flex-1">
                <div className="position-relative">
                  <input
                    className="border-1 nav-link "
                    type="text"
                    name="name"
                    placeholder="검색어를 입력 해주세요."
                  />
                  <i className="feather icon-feather-search align-middle icon-small position-absolute z-index-1 search-icon"></i>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* <div className="row row-cols-1 row-cols-lg-12 row-cols-sm-12 justify-content-center">
              <div className="col-12 text-center">
                <div className="feature-box pt-10 pb-15 text-center overflow-hidden">
                  <div className="feature-box-icon">
                    <i className="bi bi-exclamation-circle icon-extra-large text-medium-gray"></i>
                  </div>
                  <div className="feature-box-content last-paragraph-no-margin pt-1">
                    <p className="text-dark-gray opacity-5">
                      주문하신 내역이 없습니다.
                    </p>
                  </div>
                </div>
              </div>
            </div> */}

        <div className="row justify-content-center">
          <div
            className="col-12"
            // data-anime='{ "el": "childs", "translateY": [15, 0], "opacity": [0,1], "duration": 800, "delay": 200, "staggervalue": 300, "easing": "easeOutQuad" }'
          >
            <div className="row mx-0 border-bottom border-2 border-color-dark-gray pb-50px mb-50px sm-pb-35px sm-mb-35px align-items-center d-block d-md-flex w-100 align-items-center position-relative">
              <div className="col-12 d-flex justify-content-between md-mb-15px">
                <span className="fw-600 text-dark-gray fs-22 ls-minus-05px">
                  구매완료
                </span>
                <Link to="/mypage/order-detail">
                  <span className="fw-500 text-dark-gray fs-18 ls-minus-05px order-text-icon">
                    주문상세
                  </span>
                </Link>
              </div>
              <div className="col-md-1 text-center text-lx-start text-md-start md-mb-15px">
                <div className="w-300px md-w-250px sm-w-100 sm-mb-10px">
                  <img src={ShopDetailImage3} className="w-120px" alt="" />
                </div>
              </div>
              <div className="col-md-4 offset-0 offset-md-1 icon-with-text-style-01 md-mb-25px">
                <div className="feature-box feature-box-left-icon-middle last-paragraph-no-margin text-center text-md-start">
                  <div className="feature-box-content ps-0 md-ps-25px sm-ps-0">
                    <span className="d-inline-block text-dark-gray mb-5px fs-20 ls-minus-05px">
                      QR Code
                    </span>
                    <p className="text-dark-gray mb-5px fs-20 ls-minus-05px">
                      80,000원
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 text-center text-md-end">
                <div>
                  <Link
                    to="/mypage/exchage"
                    className="btn btn-white btn-large btn-switch-text w-40 me-2 mt-2"
                  >
                    <span>
                      <span className="btn-double-text" data-text="교환">
                        교환
                      </span>
                    </span>
                  </Link>
                  <Link
                    to="/mypage/return"
                    className="btn btn-white btn-large btn-switch-text w-40 me-2 mt-2"
                  >
                    <span>
                      <span className="btn-double-text" data-text="환불">
                        환불
                      </span>
                    </span>
                  </Link>
                </div>

                <div>
                  <a
                    href="#"
                    className="btn btn-white btn-large btn-switch-text w-40 me-2 mt-2"
                  >
                    <span>
                      <span className="btn-double-text" data-text="배송조회">
                        배송조회
                      </span>
                    </span>
                  </a>
                  <a
                    href="#"
                    className="btn btn-white btn-large btn-switch-text w-40 me-2 mt-2"
                  >
                    <span>
                      <span className="btn-double-text" data-text="구매확정">
                        구매확정
                      </span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <div className="row mx-0 border-bottom border-2 border-color-dark-gray pb-50px mb-50px sm-pb-35px sm-mb-35px align-items-center d-block d-md-flex w-100 align-items-center position-relative">
              <div className="col-12 d-flex justify-content-between md-mb-15px">
                <span className="fw-600 text-dark-gray fs-22 ls-minus-05px">
                  배송완료
                </span>
                <Link to="/mypage/order-detail">
                  <span className="fw-500 text-dark-gray fs-18 ls-minus-05px order-text-icon">
                    주문상세
                  </span>
                </Link>
              </div>
              <div className="col-md-1 text-center text-lx-start text-md-start md-mb-15px">
                <div className="w-300px md-w-250px sm-w-100 sm-mb-10px">
                  <img src={ShopDetailImage3} className="w-120px" alt="" />
                </div>
              </div>
              <div className="col-md-4 offset-0 offset-md-1 icon-with-text-style-01 md-mb-25px ">
                <div className="feature-box feature-box-left-icon-middle last-paragraph-no-margin text-center text-md-start">
                  <div className="feature-box-content ps-0 md-ps-25px sm-ps-0">
                    <span className="d-inline-block text-dark-gray mb-5px fs-20 ls-minus-05px">
                      QR Code
                    </span>
                    <p className="text-dark-gray mb-5px fs-20 ls-minus-05px">
                      80,000원
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 text-center text-md-end">
                <div>
                  <a
                    href="#"
                    className="btn btn-white btn-large btn-switch-text w-40 me-2 mt-2"
                  >
                    <span>
                      <span className="btn-double-text" data-text="배송조회">
                        배송조회
                      </span>
                    </span>
                  </a>
                  <a
                    href="#"
                    className="btn btn-white btn-large btn-switch-text w-40 me-2 mt-2"
                  >
                    <span>
                      <span className="btn-double-text" data-text="리뷰보기">
                        리뷰보기
                      </span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <div className="row mx-0 border-bottom border-2 border-color-dark-gray pb-50px mb-50px sm-pb-35px sm-mb-35px align-items-center d-block d-md-flex w-100 align-items-center position-relative">
              <div className="col-12 d-flex justify-content-between md-mb-15px">
                <span className="fw-600 text-dark-gray fs-22 ls-minus-05px">
                  구매확정
                </span>
                <Link to="/mypage/order-detail">
                  <span className="fw-500 text-dark-gray fs-18 ls-minus-05px order-text-icon">
                    주문상세
                  </span>
                </Link>
              </div>
              <div className="col-md-1 text-center text-lx-start text-md-start md-mb-15px">
                <div className="w-300px md-w-250px sm-w-100 sm-mb-10px">
                  <img src={ShopDetailImage3} className="w-120px" alt="" />
                </div>
              </div>
              <div className="col-md-4 offset-0 offset-md-1 icon-with-text-style-01 md-mb-25px ">
                <div className="feature-box feature-box-left-icon-middle last-paragraph-no-margin text-center text-md-start">
                  <div className="feature-box-content ps-0 md-ps-25px sm-ps-0">
                    <span className="d-inline-block text-dark-gray mb-5px fs-20 ls-minus-05px">
                      QR Code
                    </span>
                    <p className="text-dark-gray mb-5px fs-20 ls-minus-05px">
                      80,000원
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 text-center text-md-end">
                <div>
                  <a
                    href="#"
                    className="btn btn-white btn-large btn-switch-text w-40 me-2 mt-2"
                  >
                    <span>
                      <span className="btn-double-text" data-text="배송조회">
                        배송조회
                      </span>
                    </span>
                  </a>
                  <a
                    href="#"
                    className="btn btn-white btn-large btn-switch-text w-40 me-2 mt-2"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <span>
                      <span className="btn-double-text" data-text="리뷰쓰기">
                        리뷰쓰기
                      </span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <div className="row mx-0 pb-50px mb-50px sm-pb-35px sm-mb-35px align-items-center d-block d-md-flex w-100 align-items-center position-relative">
              <div className="col-12 d-flex justify-content-between md-mb-15px">
                <span className="fw-600 text-dark-gray fs-22 ls-minus-05px">
                  결제완료
                </span>
                <Link to="/mypage/order-detail">
                  <span className="fw-500 text-dark-gray fs-18 ls-minus-05px order-text-icon">
                    주문상세
                  </span>
                </Link>
              </div>
              <div className="col-md-1 text-center text-lx-start text-md-start md-mb-15px">
                <div className="w-300px md-w-250px sm-w-100 sm-mb-10px">
                  <img src={ShopDetailImage3} className="w-120px" alt="" />
                </div>
              </div>
              <div className="col-md-4 offset-0 offset-md-1 icon-with-text-style-01 md-mb-25px ">
                <div className="feature-box feature-box-left-icon-middle last-paragraph-no-margin text-center text-md-start">
                  <div className="feature-box-content ps-0 md-ps-25px sm-ps-0">
                    <span className="d-inline-block text-dark-gray mb-5px fs-20 ls-minus-05px">
                      QR Code
                    </span>
                    <p className="text-dark-gray mb-5px fs-20 ls-minus-05px">
                      80,000원
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 text-center text-md-end">
                <div>
                  <a
                    href="#"
                    className="btn btn-white btn-large btn-switch-text w-40 me-2 mt-2"
                  >
                    <span>
                      <span className="btn-double-text" data-text="결제 취소">
                        결제 취소
                      </span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination element */}
        {/* <div className="w-100 d-flex mt-3 justify-content-center">
              <ul className="pagination pagination-style-01 fs-13 fw-500 mb-0">
                <li className="page-item">
                  <a className="page-link" href="#">
                    <i className="feather icon-feather-arrow-left fs-18 d-xs-none"></i>
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    01
                  </a>
                </li>
                <li className="page-item active">
                  <a className="page-link" href="#">
                    02
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    03
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    04
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    <i className="feather icon-feather-arrow-right fs-18 d-xs-none"></i>
                  </a>
                </li>
              </ul>
            </div> */}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="p-7 lg-p-5 sm-p-7 bg-very-light-gray">
              <div className="row justify-content-center mb-30px sm-mb-10px">
                <div className="col-md-9 text-center">
                  <h4 className="text-dark-gray fw-500 mb-15px">리뷰 쓰기</h4>
                  <button
                    type="button"
                    className="btn-close position-absolute top-10px right-10px"
                    onClick={() => setIsModalOpen(false)}
                  ></button>
                </div>
              </div>
              <form
                action="email-templates/contact-form.php"
                method="post"
                className="row contact-form-style-02"
              >
                <div className="col-lg-12 mb-20px text-center">
                  <h6 className="text-dark-gray fw-500 mb-15px">상품 만족도</h6>

                  <div>
                    <span className="ls-minus-1px icon-large d-block mt-20px md-mt-0">
                      {[...Array(5)].map((_, index) => (
                        <FaStar
                          key={index}
                          size={50}
                          style={{ cursor: 'pointer', marginRight: '5px' }}
                          color={index < reviews.rate ? '#FFD700' : '#E0E0E0'} // 채워진 별은 노란색, 비어있는 별은 회색
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
                  {/* 파일 업로드 버튼 스타일링 */}
                  <div
                    className="border-1 border-dashed rounded mt-1 p-1 position-relative text-center "
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
                      onChange={handleFileUpload}
                      className="input-file-upload"
                    />
                  </div>
                  {/* 업로드된 파일 미리보기 */}
                  <div className="uploaded-files mt-3">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} style={{ marginBottom: '10px' }}>
                        <span>{file.name}</span>
                        <button
                          onClick={() => handleRemoveFile(index)}
                          style={{ marginLeft: '10px', color: 'red' }}
                        >
                          삭제
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* 업로드된 파일 수 표시 */}
                  <p className="text-center mt-2">
                    {uploadedFiles.length} / 5 파일 업로드됨
                  </p>
                </div>

                <div className="col-lg-112 text-center text-lg-center">
                  <input type="hidden" name="redirect" value="" />
                  <Button
                    className="btn btn-black btn-small btn-box-shadow btn-round-edge submit me-1"
                    onClick={() => console.log('리뷰 데이터 전송:', reviews)}
                  >
                    확인
                  </Button>
                  <Button
                    className="btn btn-white btn-small btn-box-shadow btn-round-edge submit me-1"
                    onClick={() => {
                      setIsModalOpen(false);
                      setReviews(initialForm);
                    }}
                  >
                    취소
                  </Button>
                </div>
                <div className="col-12">
                  <div className="form-results mt-20px d-none"></div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default OrderListPage;
