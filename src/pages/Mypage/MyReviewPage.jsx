import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/common/Button/Button';
import Label from '@/components/common/Label/Label';
import Modal from '@/components/common/Modal/Modal';

import ShopDetailImage1 from '@/assets/images/shop-detail-image1.png';
import ShopDetailImage2 from '@/assets/images/shop-detail-image2.png';
import ShopDetailImage3 from '@/assets/images/shop-detail-image3.png';
import mainSubImage3 from '@/assets/images/main-sub-image3.png';

const MyReviewPage = () => {
  return (
    <>
      <div className="col-xxl-10 col-lg-9 md-ps-15px md-mb-60px">
        <h6 className="mb-1 fs-40 fw-600 pb-2 border-bottom border-2 border-black text-start text-black">
          내가 쓴 리뷰
        </h6>
        <div className="toolbar-wrapper d-flex flex-column flex-sm-row align-items-center w-100 mb-40px md-mb-30px">
          <div className="col xs-mt-10px">
            <ul className="fs-15 d-flex justify-content-start ps-0 gap-1">
              <li>
                <Button
                  className="position-static border"
                  variant="primary"
                  color="white"
                  size="small"
                  radiusOn="radius-on"
                >
                  전체기간
                </Button>
              </li>
              <li>
                <Button
                  className="position-static border"
                  variant="primary"
                  color="white"
                  size="small"
                  radiusOn="radius-on"
                >
                  1주일
                </Button>
              </li>
              <li>
                <Button
                  className="position-static border"
                  variant="primary"
                  color="white"
                  size="small"
                  radiusOn="radius-on"
                >
                  1개월
                </Button>
              </li>
              <li>
                <Button
                  className="position-static border"
                  variant="primary"
                  color="white"
                  size="small"
                  radiusOn="radius-on"
                >
                  3개월
                </Button>
              </li>
              <li>
                <div className="date-time row gutter-very-small ps-10px">
                  <div className="date-icon col-xl-6 lg-mb-25px">
                    <input
                      className="rounded-pill py-8px"
                      type="date"
                      name="date"
                      value="2024-02-01"
                      min="2024-02-01"
                      max="2099-12-31"
                    />
                  </div>
                  {/* <div className="col-xl-1 lg-mb-25px">~</div> */}
                  <div className="date-icon col-xl-6 lg-mb-25px">
                    <input
                      className="rounded-pill py-8px"
                      type="date"
                      name="date"
                      value="2024-02-29"
                      min="2024-02-29"
                      max="2099-12-31"
                    />
                  </div>
                </div>
              </li>
              <li className="flex-1">
                <div className="date-time row gutter-very-small ps-10px">
                  <div className="search-icon col-xl-12 lg-mb-25px">
                    <input
                      className="rounded-pill py-8px"
                      type="search"
                      name="search"
                      placeholder="검색어를 입력해주세요."
                    />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="row">
          <div className="col-12 text-black">
            <div className="tab-content">
              <div className="tab-pane fade in active show" id="tab_five1">
                <div className="mb-4 md-mb-35px">
                  <div className="col-12 p-50px mb-10px xs-pb-30px xs-mb-30px bg-light-medium-gray position-relative">
                    <div className="d-block d-md-flex w-100 align-items-center">
                      <div className="d-block d-md-flex align-items-center w-60">
                        <div className="md-w-300px sm-mb-10px">
                          <img
                            src={ShopDetailImage3}
                            className="w-100 mb-10px"
                            alt=""
                          />
                        </div>
                        <div className="ps-30px">
                          <span className="row">qr code</span>
                          <span className="row">80,000원</span>
                        </div>
                      </div>

                      <div className="w-auto last-paragraph-no-margin sm-ps-0 position-relative text-center text-md-start">
                        <ul className="mb-0 ms-5">
                          <li className="pt-2">
                            <span className="text-base-color ls-minus-1px mb-5px sm-me-10px sm-mb-0 d-inline-block d-md-block fs-20">
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                            </span>
                          </li>
                          <li className="pt-1">
                            <div className="md-w-250px sm-mb-10px">
                              <img
                                src={ShopDetailImage3}
                                className="w-10 mb-10px me-1"
                                alt=""
                              />
                              <img
                                src={ShopDetailImage3}
                                className="w-10 mb-10px me-1"
                                alt=""
                              />
                              <img
                                src={ShopDetailImage3}
                                className="w-10 mb-10px me-1"
                                alt=""
                              />
                            </div>
                          </li>
                          <li className="pt-1">
                            <p className="w-90 sm-w-100 sm-mt-15px">
                              Lorem ipsum dolor sit sed do eiusmod tempor
                              incididunt labore enim ad minim veniam, quis
                              nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat. Duis aute irure
                              dolor in reprehenderit in voluptate velit esse
                              cillum dolore eu fugiat nulla pariatur. Excepteur
                              sint occaecat cupidatat non proident.
                            </p>
                          </li>
                        </ul>
                      </div>

                      <div className="position-absolute top-0 end-0 pt-1 pe-2">
                        <span>2024.02.01</span>
                        <i className="feather icon-feather-more-vertical- align-middle icon-small text-black ps-20px"></i>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 p-50px mb-10px xs-pb-30px xs-mb-30px bg-light-medium-gray position-relative">
                    <div className="d-block d-md-flex w-100 align-items-center">
                      <div className="d-block d-md-flex align-items-center w-60">
                        <div className="md-w-250px sm-mb-10px">
                          <img
                            src={ShopDetailImage3}
                            className="w-100 mb-10px"
                            alt=""
                          />
                        </div>
                        <div className="ps-30px ">
                          <span className="row">qr code</span>
                          <span className="row">80,000원</span>
                        </div>
                      </div>

                      <div className="w-auto last-paragraph-no-margin sm-ps-0 position-relative text-center text-md-start">
                        <ul className="mb-0 ms-5">
                          <li className="pt-2">
                            <span className="text-base-color ls-minus-1px mb-5px sm-me-10px sm-mb-0 d-inline-block d-md-block fs-20">
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                            </span>
                          </li>
                          <li className="pt-1">
                            <div className="md-w-250px sm-mb-10px">
                              <img
                                src={ShopDetailImage3}
                                className="w-10 mb-10px me-1"
                                alt=""
                              />
                              <img
                                src={ShopDetailImage3}
                                className="w-10 mb-10px me-1"
                                alt=""
                              />
                              <img
                                src={ShopDetailImage3}
                                className="w-10 mb-10px me-1"
                                alt=""
                              />
                            </div>
                          </li>
                          <li className="pt-1">
                            <p className="w-90 sm-w-100 sm-mt-15px">
                              Lorem ipsum dolor sit sed do eiusmod tempor
                              incididunt labore enim ad minim veniam, quis
                              nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat. Duis aute irure
                              dolor in reprehenderit in voluptate velit esse
                              cillum dolore eu fugiat nulla pariatur. Excepteur
                              sint occaecat cupidatat non proident.
                            </p>
                          </li>
                        </ul>
                      </div>

                      <div className="position-absolute top-0 end-0 pt-1 pe-2">
                        <span>2024.02.01</span>
                        <i className="feather icon-feather-more-vertical- align-middle icon-small text-black ps-20px"></i>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 p-50px mb-10px xs-pb-30px xs-mb-30px bg-light-medium-gray position-relative">
                    <div className="d-block d-md-flex w-100 align-items-center">
                      <div className="d-block d-md-flex align-items-center w-60">
                        <div className="md-w-250px sm-mb-10px">
                          <img
                            src={ShopDetailImage3}
                            className="w-100 mb-10px"
                            alt=""
                          />
                        </div>
                        <div className="ps-30px ">
                          <span className="row">qr code</span>
                          <span className="row">80,000원</span>
                        </div>
                      </div>

                      <div className="w-auto last-paragraph-no-margin sm-ps-0 position-relative text-center text-md-start">
                        <ul className="mb-0 ms-5">
                          <li className="pt-2">
                            <span className="text-base-color ls-minus-1px mb-5px sm-me-10px sm-mb-0 d-inline-block d-md-block fs-20">
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                            </span>
                          </li>
                          <li className="pt-1">
                            <div className="md-w-250px sm-mb-10px">
                              <img
                                src={ShopDetailImage3}
                                className="w-10 mb-10px me-1"
                                alt=""
                              />
                              <img
                                src={ShopDetailImage3}
                                className="w-10 mb-10px me-1"
                                alt=""
                              />
                              <img
                                src={ShopDetailImage3}
                                className="w-10 mb-10px me-1"
                                alt=""
                              />
                            </div>
                          </li>
                          <li className="pt-1">
                            <p className="w-90 sm-w-100 sm-mt-15px">
                              Lorem ipsum dolor sit sed do eiusmod tempor
                              incididunt labore enim ad minim veniam, quis
                              nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat. Duis aute irure
                              dolor in reprehenderit in voluptate velit esse
                              cillum dolore eu fugiat nulla pariatur. Excepteur
                              sint occaecat cupidatat non proident.
                            </p>
                          </li>
                        </ul>
                      </div>

                      <div className="position-absolute top-0 end-0 pt-1 pe-2">
                        <span>2024.02.01</span>
                        <i className="feather icon-feather-more-vertical- align-middle icon-small text-black ps-20px"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyReviewPage;
