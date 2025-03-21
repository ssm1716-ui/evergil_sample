import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/common/Button/Button';
import Modal from '@/components/common/Modal/Modal';
import AddressSearch from '@/components/AddressSearch';
import {
  getOnceAddress,
  getMembersAddressList,
  putUpdateAddress,
  postAddAddress,
  deleteAddress,
  putDefaultAddress,
} from '@/api/member/deliveryApi';

const AddressPage = () => {
  const initialFormState = {
    deliveryName: false,
    recipientName: false,
    phoneNumber: false,
    zipcode: false,
    address1: false,
  };
  const initialForm = {
    deliveryName: '',
    recipientName: '',
    phoneNumber: '',
    zipcode: '',
    address1: '',
    address2: '',
  };
  const [refreshKey, setRefreshKey] = useState(0); // 리렌더링을 위한 key 상태
  const [focusAddress, setFocusAddress] = useState('');
  const [addressList, setAddressList] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateFlag, setUpdateFlag] = useState(false);
  const [address, setAddress] = useState({
    deliveryName: '',
    recipientName: '',
    phoneNumber: '',
    zipcode: '',
    address1: '',
    address2: '',
  });
  const [selectedAddress, setSelectedAddress] = useState('');

  const [errors, setErrors] = useState(initialFormState);

  // 배송지관리 로드시 유저의 배송지 리스트 가져오기
  useEffect(() => {
    const loadGetApi = async () => {
      try {
        const { data } = await getMembersAddressList();
        setAddressList(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadGetApi();
  }, [refreshKey]);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress({
      ...address,
      [name]: value,
    });

    // 실시간 유효성 검사
    if (value.trim() === '') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: true,
      }));
      return;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
    }));
  };

  const handleAddAddress = async () => {
    // address 객체를 순회하면서 값이 비어있는지 확인
    for (const key in address) {
      if (!address[key]) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [key]: true,
        })); // 값이 비어있으면 true (오류 발생)
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [key]: false,
        })); // 값이 있으면 false (오류 발생)
      }
    }

    const res = await postAddAddress(address);

    if (res.status === 201) {
      setIsModalOpen(false);
      setAddress(initialForm);
      setSelectedAddress('');
      setRefreshKey((prevKey) => prevKey + 1);
    }
  };

  const handleUpdateModalOpen = async (id) => {
    const res = await getOnceAddress(id);
    if (res.status === 200) {
      const { data } = res;
      setAddress(data.data);
      setSelectedAddress(data.data);
      setUpdateFlag(true);
      setIsModalOpen(true);
      // setUpdateFlag(true);
    }
  };

  const handleUpdateAddress = async () => {
    const res = await putUpdateAddress(focusAddress, address);
    if (res.status === 200) {
      setIsModalOpen(false);
      setAddress(initialForm);
      setSelectedAddress('');
      setRefreshKey((prevKey) => prevKey + 1);
    } else {
      const { data } = res;
      alert(data.message);
    }
  };

  const handleDeleteAddress = async (id) => {
    const res = await deleteAddress(id);
    if (res.status === 200) {
      setRefreshKey((prevKey) => prevKey + 1);
    } else {
      const { data } = res;
      alert(data.message);
    }
  };

  const handleDefaultAddress = async () => {
    const res = await putDefaultAddress(focusAddress);
    if (res.status === 200) {
      setRefreshKey((prevKey) => prevKey + 1);
    }
  };

  return (
    <>
      <div className="col-xxl-10 col-lg-9 md-ps-15px">
        <div className="col-12 col-xl-12 col-lg-12 text-start position-relative page-title-extra-large text-decoration-line-bottom mb-3">
          <h6 className="fw-600 text-dark-gray mb-10px">배송지 관리</h6>
        </div>

        <div className="container">
          <div className="row align-items-center justify-content-center pricing-table-style-07">
            <div className="col-lg-12 col-md-12 md-mb-30px p-0">
              <ul
                className="nav nav-tabs justify-content-center border-0 text-left"
                data-anime='{ "el": "childs", "translateY": [-30, 0], "perspective": [1200,1200], "scale": [1.1, 1], "rotateX": [50, 0], "opacity": [0,1], "duration": 800, "delay": 200, "staggervalue": 300, "easing": "easeOutQuad" }'
              >
                {addressList.length > 0 &&
                  addressList.map((address, index) => (
                    <>
                      <li className="nav-item mb-30px p-0" key={index}>
                        <a
                          data-bs-toggle="tab"
                          href="#tab_four1"
                          className="nav-link box-shadow-extra-large ps-45px pe-45px pt-35px pb-35px lg-p-5 xs-p-8 border-radius-8px"
                          onClick={() => setFocusAddress(address.id)}
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
                                    주소 - {address.address1} {address.address2}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-3 col-md-3  text-md-end text-sm-center text-center">
                              <Link
                                className="btn btn-white btn-box-shadow btn-medium btn-switch-text btn-rounded ms-3 mb-10px w-75"
                                onClick={() =>
                                  handleUpdateModalOpen(address.id)
                                }
                              >
                                <span>
                                  <span
                                    className=" btn-double-text"
                                    data-text="수정"
                                  >
                                    수정
                                  </span>
                                </span>
                              </Link>
                              <Link
                                className="btn btn-dark-gray btn-box-shadow btn-medium btn-switch-text btn-rounded ms-3 mb-10px w-75"
                                onClick={() => handleDeleteAddress(address.id)}
                              >
                                <span>
                                  <span
                                    className="btn-double-text"
                                    data-text="삭제"
                                  >
                                    삭제
                                  </span>
                                </span>
                              </Link>
                            </div>
                          </div>
                        </a>
                      </li>
                    </>
                  ))}
              </ul>
              <div className="text-center md-pt-5">
                <Link to="#" className="fw-500 d-inline lh-initial ps-2">
                  <Button
                    size="small"
                    radiusOn="radius-on"
                    className="btn w-10 mt-10px d-inline w-40 "
                    onClick={() => {
                      setAddress(initialForm);
                      setSelectedAddress('');
                      setUpdateFlag(false);
                      setIsModalOpen(true);
                    }}
                  >
                    배송지 추가
                  </Button>
                </Link>
                {addressList.length > 0 && (
                  <Link to="#" className="fw-500 d-inline lh-initial ps-2">
                    <Button
                      size="small"
                      color="black"
                      className="btn w-10 mt-10px d-inline w-40"
                      onClick={handleDefaultAddress}
                    >
                      기본 배송지 지정
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="p-7 lg-p-5 sm-p-7 bg-gradient-very-light-gray">
              <div className="row justify-content-center mb-30px sm-mb-10px">
                <div className="col-md-9 text-center">
                  <h6 className="text-dark-gray fw-500 mb-15px">
                    {!updateFlag ? '배송지 추가' : '배송지 수정'}
                  </h6>
                  <button
                    type="button"
                    className="btn-close position-absolute top-10px right-10px"
                    onClick={() => setIsModalOpen(false)}
                  ></button>
                </div>
              </div>
              <form className="row">
                <div className="mb-20px ">
                  <label className="mb-10px">배송지 이름</label>
                  <input
                    className="border-radius-4px input-large mb-5px"
                    type="text"
                    name="deliveryName"
                    value={address.deliveryName}
                    onChange={handleAddressChange}
                    required
                  />
                  {errors.deliveryName && (
                    <p className="text-danger text-start">
                      배송지 이름을 추가 해주세요.
                    </p>
                  )}
                </div>
                <div className="mb-20px ">
                  <label className="mb-10px">받는분 이름</label>
                  <input
                    className="border-radius-4px input-large mb-5px"
                    type="text"
                    name="recipientName"
                    value={address.recipientName}
                    onChange={handleAddressChange}
                    required
                  />
                  {errors.recipientName && (
                    <p className="text-danger text-start">
                      받는분 이름을 추가 해주세요.
                    </p>
                  )}
                </div>
                <div className="mb-20px">
                  <label className="mb-10px">핸드폰번호</label>
                  <input
                    className="border-radius-4px input-large mb-5px"
                    type="text"
                    name="phoneNumber"
                    value={address.phoneNumber}
                    onChange={handleAddressChange}
                    required
                  />
                  {errors.phoneNumber && (
                    <p className="text-danger text-start">
                      핸드폰번호를 추가 해주세요.
                    </p>
                  )}
                </div>

                <div className="mb-20px">
                  <label className="">배송주소</label>
                  <div className="row d-flex justify-content-between flex-sm-wrap-reverse m-0 mt-10px">
                    <input
                      className="col-9 border-radius-4px input-large mb-5px"
                      type="text"
                      name="zipcode"
                      value={(address.zipcode = selectedAddress.zipcode)}
                      onChange={handleAddressChange}
                      required
                    />

                    <AddressSearch onComplete={setSelectedAddress}>
                      주소 찾기
                    </AddressSearch>
                  </div>
                  {errors.zipcode && (
                    <p className="text-danger text-start">
                      주소 찾기로 우편번호를 추가 해주세요.
                    </p>
                  )}
                  <>
                    <input
                      className="border-radius-4px input-large mb-5px mt-1"
                      type="text"
                      name="address1"
                      value={(address.address1 = selectedAddress.address1)}
                      onChange={handleAddressChange}
                      required
                    />
                    {errors.address1 && (
                      <p className="text-danger text-start">
                        주소 찾기로 주소를 추가 해주세요.
                      </p>
                    )}

                    <input
                      className="border-radius-4px input-large mb-5px mt-1"
                      type="text"
                      name="address2"
                      value={address.address2}
                      onChange={handleAddressChange}
                      required
                    />
                  </>
                </div>
                <div className="col-lg-12 text-center text-lg-center">
                  <input type="hidden" name="redirect" value="" />
                  {updateFlag ? (
                    <Button
                      className="btn btn-base-color btn-small btn-box-shadow btn-round-edge me-1"
                      onClick={handleUpdateAddress}
                    >
                      수정
                    </Button>
                  ) : (
                    <Button
                      className="btn btn-base-color btn-small btn-box-shadow btn-round-edge me-1"
                      onClick={handleAddAddress}
                    >
                      추가
                    </Button>
                  )}

                  <Button
                    className="btn btn-white btn-small btn-box-shadow btn-round-edge me-1"
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
