import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/common/Button/Button';
import Modal from '@/components/common/Modal/Modal';
import AnimatedSection from '@/components/AnimatedSection';

const AddressPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="col-xxl-10 col-lg-9 md-ps-15px md-mb-60px">
        <h6 className="mb-1 fs-40 fw-400 pb-1 text-start text-black text-decoration-line-bottom">
          배송지 관리
        </h6>

        <div className="container">
          <AnimatedSection>
            <div className="row align-items-center justify-content-center pricing-table-style-07">
              <div className="col-lg-12 col-md-12 md-mb-30px p-0">
                <ul
                  className="nav nav-tabs justify-content-center border-0 text-left"
                  data-anime='{ "el": "childs", "translateY": [-30, 0], "perspective": [1200,1200], "scale": [1.1, 1], "rotateX": [50, 0], "opacity": [0,1], "duration": 800, "delay": 200, "staggervalue": 300, "easing": "easeOutQuad" }'
                >
                  <li className="nav-item mb-30px p-0">
                    <a
                      data-bs-toggle="tab"
                      href="#tab_four1"
                      className="nav-link active box-shadow-extra-large ps-45px pe-45px pt-35px pb-35px lg-p-5 xs-p-8 border-radius-8px"
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
                                손성민
                              </span>
                              <span className="py-1 ps-15px pe-15px md-mt-10px md-mb-10px border-radius-100px text-uppercase bg-yellow text-black fs-12 lh-28 fw-700">
                                기본 배송지
                              </span>
                              <p className="w-100 m-0">010-1234-1234</p>
                              <p className="w-100">
                                [01234]경기도 시흥시 비둘기공원 7길 10 (대야동,
                                e편한세상 시흥 센터하임) 101동 505호
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-3  text-md-start text-sm-center text-center">
                          <a
                            href="#"
                            className="btn btn-white btn-box-shadow btn-medium btn-switch-text btn-rounded ms-3 mb-10px w-100"
                          >
                            <span>
                              <span
                                className=" btn-double-text"
                                data-text="수정"
                              >
                                수정
                              </span>
                            </span>
                          </a>
                          <a
                            href="#"
                            className="btn btn-dark-gray btn-box-shadow btn-medium btn-switch-text btn-rounded ms-3 mb-10px w-100"
                          >
                            <span>
                              <span
                                className="btn-double-text"
                                data-text="삭제"
                              >
                                삭제
                              </span>
                            </span>
                          </a>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className="nav-item mb-30px p-0">
                    <a
                      data-bs-toggle="tab"
                      href="#tab_four1"
                      className="nav-link box-shadow-extra-large ps-45px pe-45px pt-35px pb-35px lg-p-5 xs-p-8 border-radius-8px"
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
                                손성민
                              </span>

                              <p className="w-100 m-0">010-1234-1234</p>
                              <p className="w-100">
                                [01234]경기도 시흥시 비둘기공원 7길 10 (대야동,
                                e편한세상 시흥 센터하임) 101동 505호
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-3  text-md-start text-sm-center text-center">
                          <a
                            href="#"
                            className="btn btn-white btn-box-shadow btn-medium btn-switch-text btn-rounded ms-3 mb-10px w-100"
                          >
                            <span>
                              <span
                                className=" btn-double-text"
                                data-text="수정"
                              >
                                수정
                              </span>
                            </span>
                          </a>
                          <a
                            href="#"
                            className="btn btn-dark-gray btn-box-shadow btn-medium btn-switch-text btn-rounded ms-3 mb-10px w-100"
                          >
                            <span>
                              <span
                                className="btn-double-text"
                                data-text="삭제"
                              >
                                삭제
                              </span>
                            </span>
                          </a>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className="nav-item mb-30px p-0">
                    <a
                      data-bs-toggle="tab"
                      href="#tab_four1"
                      className="nav-link box-shadow-extra-large ps-45px pe-45px pt-35px pb-35px lg-p-5 xs-p-8 border-radius-8px"
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
                                손성민
                              </span>

                              <p className="w-100 m-0">010-1234-1234</p>
                              <p className="w-100">
                                [01234]경기도 시흥시 비둘기공원 7길 10 (대야동,
                                e편한세상 시흥 센터하임) 101동 505호
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-3  text-md-start text-sm-center text-center">
                          <a
                            href="#"
                            className="btn btn-white btn-box-shadow btn-medium btn-switch-text btn-rounded ms-3 mb-10px w-100"
                          >
                            <span>
                              <span
                                className=" btn-double-text"
                                data-text="수정"
                              >
                                수정
                              </span>
                            </span>
                          </a>
                          <a
                            href="#"
                            className="btn btn-dark-gray btn-box-shadow btn-medium btn-switch-text btn-rounded ms-3 mb-10px w-100"
                          >
                            <span>
                              <span
                                className="btn-double-text"
                                data-text="삭제"
                              >
                                삭제
                              </span>
                            </span>
                          </a>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
                <div className="text-center">
                  <Link to="#" className="fw-500 d-inline lh-initial ps-2">
                    <Button
                      size="small"
                      className="btn w-10 mt-10px d-inline w-40 "
                      onClick={() => setIsModalOpen(true)}
                    >
                      배송지 추가
                    </Button>
                  </Link>
                  <Link to="#" className="fw-500 d-inline lh-initial ps-2">
                    <Button
                      size="small"
                      color="black"
                      className="btn w-10 mt-10px d-inline w-40"
                    >
                      기본 배송지 지정
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="modal-header bg-base-color p-2">
          <h5 className="modal-title text-dark fw-bold">배송지 정보 추가</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setIsModalOpen(false)}
          ></button>
        </div>

        <div className="row row-cols-1 row-cols-lg-2 row-cols-md-1 g-0 justify-content-center py-5">
          <div className="col contact-form-style-04">
            <div className="text-center">
              <form className="">
                <div className="row d-flex align-items-baseline">
                  <label className="text-dark-gray mb-10px fw-500 text-start w-25">
                    이름<span className="text-red">*</span>
                  </label>
                  <input
                    className="mb-20px bg-very-light-white form-control flex-1 required"
                    type="text"
                    name="loginEmail"
                    placeholder=""
                  />
                </div>
                <div className="row d-flex align-items-baseline">
                  <label className="text-dark-gray mb-10px fw-500 text-start w-25">
                    휴대폰<span className="text-red">*</span>
                  </label>
                  <input
                    className="mb-20px bg-very-light-white form-control flex-1 required"
                    type="text"
                    name="loginEmail"
                    placeholder=""
                  />
                </div>
                <div className="row d-flex align-items-baseline">
                  <label className="text-dark-gray mb-10px fw-500 text-start w-25">
                    배송주소<span className="text-red">*</span>
                  </label>
                  <input
                    className="mb-20px bg-very-light-white form-control flex-1 me-20px required "
                    type="text"
                    name="loginEmail"
                    placeholder="우편번호"
                  />
                  <Button
                    size="large"
                    radiusOn="radius-on"
                    color="black"
                    className="btn w-25 mb-20px d-block"
                  >
                    주소 찾기
                  </Button>
                </div>
                <div className="row d-flex align-items-baseline">
                  <label className="text-dark-gray mb-10px fw-500 text-start w-25"></label>
                  <input
                    className="mb-20px bg-very-light-white form-control flex-1 required"
                    type="text"
                    name="loginEmail"
                    placeholder="상세주소1"
                  />
                </div>
                <div className="row d-flex align-items-baseline">
                  <label className="text-dark-gray mb-10px fw-500 text-start w-25"></label>
                  <input
                    className="mb-20px bg-very-light-white form-control flex-1 required"
                    type="text"
                    name="loginEmail"
                    placeholder="상세주소2"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="modal-footer justify-content-center ">
          <Button
            size="extra-large"
            radiusOn="radius-on"
            className="btn w-20 px-5 me-5"
          >
            추가
          </Button>
          <Button
            size="extra-large"
            radiusOn="radius-on"
            color="profile"
            className="btn w-20 px-5"
            onClick={() => setIsModalOpen(false)}
          >
            취소
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default AddressPage;
