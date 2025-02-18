import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/common/Button/Button';
import Modal from '@/components/common/Modal/Modal';
import AddressSearch from '@/components/AddressSearch';
import { getMembersAddressList } from '@/api/memberApi';

const AddressPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addAddress, setAddAddress] = useState({
    deliveryName: '',
    recipientName: '',
    phoneNumber: '',
    address1: '',
    address2: '',
    zipcode: '',
  });
  const [address, setAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');

  // 배송지관리 로드시 유저의 배송지 리스트 가져오기
  useEffect(() => {
    const loadGetApi = async () => {
      try {
        const res = await getMembersAddressList();
        console.log(res);
      } catch (error) {
        console.err(error);
      }
    };

    loadGetApi();
  }, []);

  return (
    <>
      <div className="col-xxl-10 col-lg-9 md-ps-15px md-mb-60px ">
        <div className="col-12 col-xl-12 col-lg-12 text-start position-relative page-title-extra-large text-decoration-line-bottom mb-3">
          <h1 className="fw-600 text-dark-gray mb-10px">배송지 관리</h1>
        </div>

        <div className="container">
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
                      <div className="col-lg-3 col-md-3  text-md-end text-sm-center text-center">
                        <a
                          href="#"
                          className="btn btn-white btn-box-shadow btn-medium btn-switch-text btn-rounded ms-3 mb-10px w-75"
                        >
                          <span>
                            <span className=" btn-double-text" data-text="수정">
                              수정
                            </span>
                          </span>
                        </a>
                        <a
                          href="#"
                          className="btn btn-dark-gray btn-box-shadow btn-medium btn-switch-text btn-rounded ms-3 mb-10px w-75"
                        >
                          <span>
                            <span className="btn-double-text" data-text="삭제">
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
                      <div className="col-lg-3 col-md-3  text-md-end text-sm-center text-center">
                        <a
                          href="#"
                          className="btn btn-white btn-box-shadow btn-medium btn-switch-text btn-rounded ms-3 mb-10px w-75"
                        >
                          <span>
                            <span className=" btn-double-text" data-text="수정">
                              수정
                            </span>
                          </span>
                        </a>
                        <a
                          href="#"
                          className="btn btn-dark-gray btn-box-shadow btn-medium btn-switch-text btn-rounded ms-3 mb-10px w-75"
                        >
                          <span>
                            <span className="btn-double-text" data-text="삭제">
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
                      <div className="col-lg-3 col-md-3  text-md-end text-sm-center text-center">
                        <a
                          href="#"
                          className="btn btn-white btn-box-shadow btn-medium btn-switch-text btn-rounded ms-3 mb-10px w-75"
                        >
                          <span>
                            <span className=" btn-double-text" data-text="수정">
                              수정
                            </span>
                          </span>
                        </a>
                        <a
                          href="#"
                          className="btn btn-dark-gray btn-box-shadow btn-medium btn-switch-text btn-rounded ms-3 mb-10px w-75"
                        >
                          <span>
                            <span className="btn-double-text" data-text="삭제">
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
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="row justify-content-center">
          <div className="col-8">
            <div className="p-7 lg-p-5 sm-p-7 bg-gradient-very-light-gray">
              <div className="row justify-content-center mb-30px sm-mb-10px">
                <div className="col-md-9 text-center">
                  <h4 className="text-dark-gray fw-500 mb-15px">배송지 추가</h4>
                  <button
                    type="button"
                    className="btn-close position-absolute top-10px right-10px"
                    onClick={() => setIsModalOpen(false)}
                  ></button>
                </div>
              </div>
              <form className="row">
                <div className="col-12 mb-20px ">
                  <label className="mb-10px">배송지 이름</label>
                  <input
                    className="border-radius-4px input-large"
                    type="text"
                    name="deliveryName"
                    aria-label="first-name"
                    // value={orderAddressData.deliveryName}
                    // onChange={handleAddressChange}
                    required
                  />
                  {/* {errors.deliveryName && (
                <p className="text-danger text-start">{errors.deliveryName}</p>
              )} */}
                </div>
                <div className="col-12 mb-20px ">
                  <label className="mb-10px">받는분 이름</label>
                  <input
                    className="border-radius-4px input-large"
                    type="text"
                    aria-label="first-name"
                    name="recipientName"
                    // value={orderAddressData.recipientName}
                    // onChange={handleAddressChange}
                    required
                  />
                  {/* {errors.recipientName && (
                <p className="text-danger text-start">{errors.recipientName}</p>
              )} */}
                </div>
                <div className="col-12 mb-20px">
                  <label className="mb-10px">핸드폰번호</label>
                  <input
                    className="border-radius-4px input-large"
                    type="text"
                    aria-label="first-name"
                    name="phoneNumber"
                    // value={orderAddressData.phoneNumber}
                    // onChange={handleAddressChange}
                    required
                  />
                  {/* {errors.phoneNumber && (
                <p className="text-danger text-start">{errors.phoneNumber}</p>
              )} */}
                </div>

                <div className="col-12 mb-20px">
                  <label className="col-12">배송주소</label>
                  <div className="row d-flex justify-content-between flex-sm-wrap-reverse m-0 mt-10px">
                    {/* {Object.keys(selectedAddress).length > 0 && ( */}
                    <input
                      className="col-9 border-radius-4px input-large"
                      type="text"
                      aria-label="first-name"
                      name="zipcode"
                      // value={(orderAddressData.zipcode = selectedAddress.zipcode)}
                      required
                    />
                    {/* )}
                {isAddresOpen && errors.zipcode && (
                  <p className="text-danger text-start p-0">{errors.zipcode}</p>
                )} */}

                    <AddressSearch onComplete={setSelectedAddress}>
                      주소 찾기
                    </AddressSearch>
                  </div>
                  {/* {Object.keys(selectedAddress).length > 0 && ( */}
                  <>
                    <input
                      className="col-12 border-radius-4px input-large mt-1"
                      type="text"
                      aria-label="first-name"
                      name="address1"
                      // value={
                      //   (orderAddressData.address1 = selectedAddress.address)
                      // }
                      required
                    />
                    {/* {isAddresOpen && errors.address1 && (
                    <p className="text-danger text-start p-0">
                      {errors.address1}
                    </p>
                  )} */}
                    <input
                      className="col-12 border-radius-4px input-large mt-1"
                      type="text"
                      aria-label="first-name"
                      name="address2"
                      // value={orderAddressData.address2}
                      // onChange={handleAddressChange}
                      required
                    />
                  </>
                  {/* )} */}
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
                <div className="col-lg-112 text-center text-lg-center">
                  <input type="hidden" name="redirect" value="" />
                  <Button className="btn btn-black btn-small btn-box-shadow btn-round-edge submit me-1">
                    추가
                  </Button>
                  <Button
                    className="btn btn-white btn-small btn-box-shadow btn-round-edge submit me-1"
                    onClick={() => setIsModalOpen(false)}
                  >
                    닫기
                  </Button>
                </div>

                {/* <AddressSearch onComplete={setSelectedAddress} />
                          <p>선택된 주소: {selectedAddress}</p> */}
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddressPage;
