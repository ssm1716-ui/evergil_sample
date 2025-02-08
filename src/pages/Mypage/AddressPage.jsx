import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/common/Button/Button';
import Modal from '@/components/common/Modal/Modal';

const AddressPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="col-xxl-10 col-lg-9 md-ps-15px md-mb-60px">
        <h6 className="mb-1 fs-40 fw-400 pb-2 mb-3 border-bottom border-2 border-black text-start text-black">
          배송지 관리
        </h6>

        <div className="row">
          <div className="col-12 text-black">
            <div className="tab-content">
              <div className="tab-pane fade in active show" id="tab_five1">
                <div className="mb-4 md-mb-35px">
                  <div className="col-12 p-50px mb-35px xs-pb-30px xs-mb-30px border border-1 border-black border-radius-15px position-relative">
                    <div className="d-block d-md-flex w-100 align-items-center">
                      <div className="d-block d-md-flex align-items-center w-10 address-chk justify-content-center">
                        <input
                          className="d-none"
                          type="radio"
                          id="color-3"
                          name="color"
                        />
                        <label htmlFor="color-3">
                          <span></span>
                        </label>
                      </div>

                      <div className="w-60 last-paragraph-no-margin sm-ps-0 position-relative text-center text-md-start">
                        <ul className="mb-0 p-0 fw-600">
                          <li className="pt-2">
                            <h6 className="m-0">
                              손성민
                              <span className="fs-10 text-base-color border border-1 border-base-color">
                                기본 배송지
                              </span>
                            </h6>
                          </li>
                          <li>
                            <p>010-4343-5454</p>
                          </li>
                          <li>
                            <p className="m-0 p-0">
                              [01234]경기도 시흥시 비둘기공원 7길 10 (대야동,
                              e편한세상 시흥 센터하임) 101동 505호
                            </p>
                          </li>
                        </ul>
                      </div>

                      <div className="w-30 last-paragraph-no-margin sm-ps-0 position-relative text-center text-md-start">
                        <Button
                          variant="primary"
                          size="extra-large"
                          color="white"
                          radiusOn="radius-on"
                          className="border border-1 border-gray me-2"
                        >
                          수정
                        </Button>
                        <Button
                          variant="primary"
                          size="extra-large"
                          color="white"
                          radiusOn="radius-on"
                          className="border border-1 border-gray"
                        >
                          삭제
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 p-50px mb-35px xs-pb-30px xs-mb-30px border border-1 border-black border-radius-15px position-relative">
                    <div className="d-block d-md-flex w-100 align-items-center">
                      <div className="d-block d-md-flex align-items-center w-10 address-chk justify-content-center">
                        <input
                          className="d-none"
                          type="radio"
                          id="color-3"
                          name="color"
                        />
                        <label htmlFor="color-3">
                          <span></span>
                        </label>
                      </div>

                      <div className="w-60 last-paragraph-no-margin sm-ps-0 position-relative text-center text-md-start">
                        <ul className="mb-0 p-0 fw-600">
                          <li className="pt-2">
                            <h6 className="m-0">손성민</h6>
                          </li>
                          <li>
                            <p>010-4343-5454</p>
                          </li>
                          <li>
                            <p className="m-0 p-0">
                              [01234]경기도 시흥시 비둘기공원 7길 10 (대야동,
                              e편한세상 시흥 센터하임) 101동 505호
                            </p>
                          </li>
                        </ul>
                      </div>

                      <div className="w-30 last-paragraph-no-margin sm-ps-0 position-relative text-center text-md-start">
                        <Button
                          variant="primary"
                          size="extra-large"
                          color="white"
                          radiusOn="radius-on"
                          className="border border-1 border-gray me-2"
                        >
                          수정
                        </Button>
                        <Button
                          variant="primary"
                          size="extra-large"
                          color="white"
                          radiusOn="radius-on"
                          className="border border-1 border-gray"
                        >
                          삭제
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 p-50px mb-35px xs-pb-30px xs-mb-30px border border-1 border-black border-radius-15px position-relative">
                    <div className="d-block d-md-flex w-100 align-items-center">
                      <div className="d-block d-md-flex align-items-center w-10 address-chk justify-content-center">
                        <input
                          className="d-none"
                          type="radio"
                          id="color-3"
                          name="color"
                        />
                        <label htmlFor="color-3">
                          <span></span>
                        </label>
                      </div>

                      <div className="w-60 last-paragraph-no-margin sm-ps-0 position-relative text-center text-md-start">
                        <ul className="mb-0 p-0 fw-600">
                          <li className="pt-2">
                            <h6 className="m-0">손성민</h6>
                          </li>
                          <li>
                            <p>010-4343-5454</p>
                          </li>
                          <li>
                            <p className="m-0 p-0">
                              [01234]경기도 시흥시 비둘기공원 7길 10 (대야동,
                              e편한세상 시흥 센터하임) 101동 505호
                            </p>
                          </li>
                        </ul>
                      </div>

                      <div className="w-30 last-paragraph-no-margin sm-ps-0 position-relative text-center text-md-start">
                        <Button
                          variant="primary"
                          size="extra-large"
                          color="white"
                          radiusOn="radius-on"
                          className="border border-1 border-gray me-2"
                        >
                          수정
                        </Button>
                        <Button
                          variant="primary"
                          size="extra-large"
                          color="white"
                          radiusOn="radius-on"
                          className="border border-1 border-gray"
                        >
                          삭제
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <Link to="#" className="fw-500 d-inline lh-initial ps-2">
                    <Button
                      size="small"
                      color="white"
                      className="btn w-10 mt-10px d-inline w-30"
                      onClick={() => setIsModalOpen(true)}
                    >
                      배송지 추가
                    </Button>
                  </Link>
                  <Link to="#" className="fw-500 d-inline lh-initial ps-2">
                    <Button
                      size="small"
                      color="navy"
                      className="btn w-10 mt-10px d-inline w-30"
                    >
                      기본 배송지 지정
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
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
