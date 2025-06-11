import { useState, useEffect } from 'react';
import Button from '@/components/common/Button/Button';
import Modal from '@/components/common/Modal/Modal';

import { postRequestPresignedUrl } from '@/api/fileupload/uploadApi';
import { postMeReviews } from '@/api/member/personalApi';
import {
  getReviewSelected,
  postReviewModify,
  postReviewRemove,
} from '@/api/products/reviewsApi';
import { formatDate, getFileType } from '@/utils/utils';
import { FaStar } from 'react-icons/fa'; // FontAwesome 별 아이콘 사용

const MyReviewPage = () => {
  // 올해 1월 1일 반환
  const getFirstDayOfYear = () => {
    const today = new Date();
    return `${today.getFullYear()}-01-01`;
  };

  // 오늘 날짜 반환 (YYYY-MM-DD 형식)
  const getTodayDate = () => new Date().toISOString().split('T')[0];

  const initData = {
    from: getFirstDayOfYear(), // 기본값: to 기준 90일 전
    to: getTodayDate(), // 기본값: 오늘 날짜
    keyword: '',
  };
  const [selectedId, setSelectedId] = useState(0);
  const [viewSelect, setViewSelect] = useState(initData);
  const [fullReviewDt, setFullReviewDt] = useState([]);
  const [meReviews, setMeReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [focusReviewid, setFocusReviewid] = useState({
    productId: '',
    reviewId: '',
  });
  const [reviews, setReviews] = useState({
    rate: 0,
    content: '',
    images: [],
  });
  const [files, setFiles] = useState([]);

  // 리뷰 조회
  useEffect(() => {
    const getMeReviews = async () => {
      try {
        const { status, data } = await postMeReviews(viewSelect);
        if (status !== 200) {
          alert('통신 에러가 발생했습니다.');
          return;
        }
        const arr = data.data;
        console.log(arr);
        // review만 추출하여 상태 업데이트
        const extractedReviews = arr.map((item) => item.review);
        setMeReviews(extractedReviews);
        setFullReviewDt(arr);
      } catch (error) {
        console.error(error);
      }
    };

    getMeReviews();
  }, [viewSelect]);

  // 특정 일 전의 날짜를 반환하는 함수 (to 기준)
  const getPastDate = (baseDate, days) => {
    const date = new Date(baseDate);
    date.setDate(date.getDate() - days); // to 날짜 기준 days 전 날짜 계산
    return date.toISOString().split('T')[0];
  };

  // from 값 변경 함수 (to 값 기준)
  const handleUpdateFromDate = (daysAgo) => {
    setViewSelect((prev) => ({
      ...prev,
      from: getPastDate(prev.to, daysAgo), // to 기준 daysAgo 전 날짜로 변경
    }));
  };

  const handleDrodownOpen = (id) => {
    setSelectedId(id); // 클릭한 요소의 ID 저장
  };

  //리뷰 수정
  const handleReviewsModify = async (id) => {
    const res = await getReviewSelected(id);
    const { status, data } = res;
    if (status !== 200) {
      alert('통신 에러가 발생했습니다.');
      return;
    }

    const dt = data.data;
    const images = [dt.image1, dt.image2, dt.image3, dt.image4, dt.image5];

    setFiles(images.filter((image) => image));
    setReviews(data.data);

    const targetReview = fullReviewDt.find((item) => item.review.id === id);
    setFocusReviewid({
      productId: targetReview.product.id,
      reviewId: id,
    });
    setIsModalOpen(true);
  };

  //리뷰 삭제
  const handleReviewsRemove = async (id) => {
    const res = await postReviewRemove(id);
    const { status } = res;
    if (status !== 200) {
      alert('통신 에러가 발생했습니다.');
      return;
    }
    setViewSelect(initData);
  };

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
    const selectedFiles = Array.from(event.target.files)
      .filter((file) => file.type.startsWith('image')) // 이미지 파일만 허용
      .slice(0, 5 - files.length); // 최대 5개까지만 추가 가능

    const previewFiles = selectedFiles.map((file) => ({
      originalFile: file,
      preview: URL.createObjectURL(file), // 미리보기 URL 생성
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
    console.log(files);
    for (const fileObj of files) {
      const file = fileObj.originalFile; // 원본 File 객체 참조
      //기존 파일은 url정보만 있으므로 파일타입 검사
      if (!(file instanceof File)) {
        completedUrls.push(fileObj);
        continue;
      }

      try {
        // 1️⃣ Presigned URL 요청
        const type = getFileType(file.type);
        const presignedResponse = await postRequestPresignedUrl(type);
        const { data } = presignedResponse.data;
        const url = data.completedUrl; // 업로드 완료 후 접근할 URL

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
        console.error(`파일 업로드 중 오류 발생: ${file.name}`, error);
      }
    }

    // 이후 로직 업로드된 파일 URL을 백엔드에 전송
    const res = await postReviewModify(
      focusReviewid.productId,
      focusReviewid.reviewId,
      {
        ...reviews,
        images: completedUrls,
      }
    );
    if (res.status === 200) {
      setIsModalOpen(false);
      setViewSelect(initData);
    }
  };

  const handleInputChangeDate = (e) => {
    const { name, value } = e.target;

    // name이 "keyword"일 때, 길이가 2 이하이면 실행 안 하지만, 0이면 실행됨
    if (name === 'keyword' && value.length > 0 && value.length <= 2) return;

    setViewSelect((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="col-xxl-10 col-lg-9 md-ps-15px">
        <div className="col-12 col-xl-12 col-lg-12 text-start position-relative page-title-extra-large text-decoration-line-bottom mb-3">
          <h6 className="fw-600 text-dark-gray mb-10px">내가 쓴 리뷰</h6>
        </div>

        <div
          className="toolbar-wrapper border-bottom border-color-extra-medium-gray d-flex flex-column flex-md-row align-items-center w-100 mb-40px md-mb-30px pb-15px"
          // data-anime='{ "translateY": [0, 0], "opacity": [0,1], "duration": 600, "delay":50, "staggervalue": 150, "easing": "easeOutQuad" }'
        >
          <div className="mx-auto me-md-0 col tab-style-01">
            <ul className="nav nav-tabs justify-content-center border-0 text-center fs-18 md-fs-12 sm-fs-11 fw-600 mb-3">
              <li className="nav-item mt-10px">
                <a
                  className="nav-link active"
                  data-bs-toggle="tab"
                  onClick={() => {
                    setViewSelect((prev) => ({
                      ...prev,
                      from: getFirstDayOfYear(), // to 기준 daysAgo 전 날짜로 변경
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
                  onClick={() => handleUpdateFromDate(7)}
                >
                  1주일
                </a>
              </li>
              <li className="nav-item mt-10px">
                <a
                  className="nav-link"
                  data-bs-toggle="tab"
                  onClick={() => handleUpdateFromDate(30)}
                >
                  1개월
                </a>
              </li>
              <li className="nav-item mt-10px">
                <a
                  className="nav-link"
                  data-bs-toggle="tab"
                  onClick={() => handleUpdateFromDate(90)}
                >
                  3개월
                </a>
              </li>
              <li className="nav-item mt-10px">
                <input
                  className="border-1 nav-link text-center"
                  type="date"
                  name="from"
                  value={viewSelect.from}
                  min="2024-01-01"
                  max="2099-12-31"
                  aria-label="date"
                  onChange={handleInputChangeDate}
                />
              </li>
              <li className="nav-item mt-10px">
                <input
                  className="border-1 nav-link text-center"
                  type="date"
                  name="to"
                  value={viewSelect.to}
                  min="2024-01-01"
                  max="2099-12-31"
                  aria-label="date"
                  onChange={handleInputChangeDate}
                />
              </li>
              <li className="nav-item mt-10px flex-1">
                <div className="position-relative">
                  <input
                    className="border-1 nav-link "
                    type="text"
                    name="keyword"
                    placeholder="검색어를 입력 해주세요."
                    // value={viewSelect.keyword}
                    onChange={handleInputChangeDate}
                  />
                  <i className="feather icon-feather-search align-middle icon-small position-absolute z-index-1 search-icon"></i>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="row g-0 mb-4 md-mb-30">
          {meReviews.length > 0 ? (
            meReviews.map((review, index) => (
              <div
                key={review.id || index}
                className="col-12 border-bottom border-color-extra-medium-gray pb-40px mb-40px xs-pb-30px xs-mb-30px"
              >
                <div className="d-block d-md-flex w-100 align-items-center position-relative">
                  {/* 드롭다운 메뉴 */}
                  <div className="position-absolute top-0 end-0 z-index-1">
                    <div className="header-language-icon widget fs-13 fw-600">
                      <div
                        className={`header-language dropdown ${
                          selectedId === review.id ? 'open' : ''
                        }`}
                        onClick={() => handleDrodownOpen(review.id)}
                        onMouseLeave={() => setSelectedId(0)}
                      >
                        <a className="text-dark-gray">
                          <i className="feather icon-feather-more-vertical- align-middle icon-small text-black ps-20px"></i>
                        </a>
                        <ul className="language-dropdown text-center">
                          <li>
                            <a
                              className="fs-18"
                              onClick={() => handleReviewsModify(review.id)}
                            >
                              수정
                            </a>
                          </li>
                          <li>
                            <a
                              className="fs-18"
                              onClick={() => handleReviewsRemove(review.id)}
                            >
                              삭제
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

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
                    <span className="text-golden-yellow ls-minus-1px mb-5px sm-me-10px sm-mb-0 d-block">
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

                    <p className="w-85 sm-w-100 sm-mt-15px">{review.content}</p>
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
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="w-40 md-w-70 sm-w-90 sm-h-90">
          <div className="modal-content p-0 rounded shadow-lg">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="p-7 lg-p-5 sm-p-7 bg-very-light-gray">
                  <div className="row justify-content-center mb-30px sm-mb-10px">
                    <div className="col-md-9 text-center">
                      <h4 className="text-dark-gray fw-500 mb-15px">
                        리뷰 수정
                      </h4>
                      <button
                        type="button"
                        className="btn-close position-absolute top-10px right-10px"
                        onClick={() => setIsModalOpen(false)}
                      ></button>
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
                              } // 채워진 별은 노란색, 비어있는 별은 회색
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
                              src={fileObj.preview || fileObj}
                              alt="미리보기"
                              className="w-100 h-100 sm-h-50px "
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

                    <div className="col-lg-112 text-center text-lg-center">
                      <input type="hidden" name="redirect" value="" />
                      <Button
                        size="large"
                        className="btn btn-black btn-box-shadow btn-round-edge submit sm-me-2"
                        onClick={handleGetFileUploadPath}
                      >
                        리뷰수정
                      </Button>
                      <Button
                        size="large"
                        className="btn btn-white btn-box-shadow btn-round-edge submit ms-2 sm-ms-2"
                        onClick={() => {
                          setIsModalOpen(false);
                          // setReviews(initialForm);
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
    </>
  );
};

export default MyReviewPage;
