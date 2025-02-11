import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/common/Button/Button';
import Label from '@/components/common/Label/Label';
import Modal from '@/components/common/Modal/Modal';
import AnimatedSection from '@/components/AnimatedSection';

import ShopDetailImage1 from '@/assets/images/shop-detail-image1.png';
import ShopDetailImage2 from '@/assets/images/shop-detail-image2.png';
import ShopDetailImage3 from '@/assets/images/shop-detail-image3.png';
import mainSubImage3 from '@/assets/images/main-sub-image3.png';

const MyReviewPage = () => {
  const [selectedId, setSelectedId] = useState(0);

  const handleDrodownOpen = (id) => {
    setSelectedId(id); // 클릭한 요소의 ID 저장
  };

  return (
    <>
      <div className="col-xxl-10 col-lg-9 md-ps-15px md-mb-60px">
        <div className="col-12 col-xl-12 col-lg-12 text-start position-relative page-title-extra-large text-decoration-line-bottom mb-3">
          <h1 className="fw-600 text-dark-gray mb-10px">내가 쓴 리뷰</h1>
        </div>
        <AnimatedSection>
          <div
            className="toolbar-wrapper border-bottom border-color-extra-medium-gray d-flex flex-column flex-md-row align-items-center w-100 mb-40px md-mb-30px pb-15px"
            data-anime='{ "translateY": [0, 0], "opacity": [0,1], "duration": 600, "delay":50, "staggervalue": 150, "easing": "easeOutQuad" }'
          >
            <div className="mx-auto me-md-0">
              <select
                className="fs-18 form-select border-1"
                aria-label="Default sorting"
              >
                <option selected>전체 기간</option>
                <option value="2">1주일</option>
                <option value="3">1개월</option>
                <option value="4">3개월</option>
              </select>
            </div>
          </div>
        </AnimatedSection>

        <div className="row g-0 mb-4 md-mb-35px">
          <div className="col-12 border-bottom border-color-extra-medium-gray pb-40px mb-40px xs-pb-30px xs-mb-30px">
            <div className="d-block d-md-flex w-100 align-items-center position-relative">
              <div className="position-absolute top-0 end-0 z-index-1">
                <div className="header-language-icon widget fs-13 fw-600">
                  <div
                    className={`header-language dropdown ${
                      selectedId === 1 ? 'open' : ''
                    }`}
                    onClick={() => handleDrodownOpen(1)}
                    onMouseLeave={() => setSelectedId(0)}
                  >
                    <a href="#" className="text-dark-gray">
                      <i className="feather icon-feather-more-vertical- align-middle icon-small text-black ps-20px"></i>
                    </a>

                    <ul className="language-dropdown">
                      <li>
                        <a href="#" className="fs-18">
                          <span className="icon-country"></span>수정
                        </a>
                      </li>
                      <li>
                        <a href="#" className="fs-18">
                          <span className="icon-country"></span>삭제
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="w-250px md-w-250px sm-w-100 sm-mb-10px text-center">
                <img
                  src={ShopDetailImage3}
                  className="w-120px mb-10px"
                  alt=""
                />
                <span className="text-dark-gray fw-600 d-block">
                  2025.02.01
                </span>
              </div>
              <div className="w-100 last-paragraph-no-margin sm-ps-0 position-relative text-center text-md-start">
                <span className="text-golden-yellow ls-minus-1px mb-5px sm-me-10px sm-mb-0 d-inline-block d-md-block">
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                </span>

                <p className="w-85 sm-w-100 sm-mt-15px">
                  Lorem ipsum dolor sit sed do eiusmod tempor incididunt labore
                  enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident.
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 border-bottom border-color-extra-medium-gray pb-40px mb-40px xs-pb-30px xs-mb-30px">
            <div className="d-block d-md-flex w-100 align-items-center position-relative">
              <div className="position-absolute top-0 end-0 z-index-1">
                <div className="header-language-icon widget fs-13 fw-600">
                  <div
                    className={`header-language dropdown ${
                      selectedId === 2 ? 'open' : ''
                    }`}
                    onClick={() => handleDrodownOpen(2)}
                    onMouseLeave={() => setSelectedId(0)}
                  >
                    <a href="#" className="text-dark-gray">
                      <i className="feather icon-feather-more-vertical- align-middle icon-small text-black ps-20px"></i>
                    </a>

                    <ul className="language-dropdown">
                      <li>
                        <a href="#" className="fs-18">
                          <span className="icon-country"></span>수정
                        </a>
                      </li>
                      <li>
                        <a href="#" className="fs-18">
                          <span className="icon-country"></span>삭제
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="w-250px md-w-250px sm-w-100 sm-mb-10px text-center">
                <img
                  src={ShopDetailImage3}
                  className="w-120px mb-10px"
                  alt=""
                />
                <span className="text-dark-gray fw-600 d-block">
                  2025.02.01
                </span>
              </div>
              <div className="w-100 last-paragraph-no-margin sm-ps-0 position-relative text-center text-md-start">
                <span className="text-golden-yellow ls-minus-1px mb-5px sm-me-10px sm-mb-0 d-inline-block d-md-block">
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                </span>

                <p className="w-85 sm-w-100 sm-mt-15px">
                  Lorem ipsum dolor sit sed do eiusmod tempor incididunt labore
                  enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident.
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 border-bottom border-color-extra-medium-gray pb-40px mb-40px xs-pb-30px xs-mb-30px">
            <div className="d-block d-md-flex w-100 align-items-center position-relative">
              <div className="position-absolute top-0 end-0 z-index-1">
                <div className="header-language-icon widget fs-13 fw-600">
                  <div
                    className={`header-language dropdown ${
                      selectedId === 3 ? 'open' : ''
                    }`}
                    onClick={() => handleDrodownOpen(3)}
                    onMouseLeave={() => setSelectedId(0)}
                  >
                    <a href="#" className="text-dark-gray">
                      <i className="feather icon-feather-more-vertical- align-middle icon-small text-black ps-20px"></i>
                    </a>

                    <ul className="language-dropdown">
                      <li>
                        <a href="#" className="fs-18">
                          <span className="icon-country"></span>수정
                        </a>
                      </li>
                      <li>
                        <a href="#" className="fs-18">
                          <span className="icon-country"></span>삭제
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="w-250px md-w-250px sm-w-100 sm-mb-10px text-center">
                <img
                  src={ShopDetailImage3}
                  className="w-120px mb-10px"
                  alt=""
                />
                <span className="text-dark-gray fw-600 d-block">
                  2025.02.01
                </span>
              </div>
              <div className="w-100 last-paragraph-no-margin sm-ps-0 position-relative text-center text-md-start">
                <span className="text-golden-yellow ls-minus-1px mb-5px sm-me-10px sm-mb-0 d-inline-block d-md-block">
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                </span>

                <p className="w-85 sm-w-100 sm-mt-15px">
                  Lorem ipsum dolor sit sed do eiusmod tempor incididunt labore
                  enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyReviewPage;
