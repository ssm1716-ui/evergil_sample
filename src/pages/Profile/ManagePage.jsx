import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from '@/components/common/Button/Button';
import Modal from '@/components/common/Modal/Modal';
import Select from 'react-select';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // 아이콘 가져오기

import everlinkTop from '@/assets/images/everlink-top.png';

const options = [
  {
    value: 'PUBLIC',
    label: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <FaEye style={{ marginRight: 10 }} />
        전체공개
      </div>
    ),
  },
  {
    value: 'PRIVATE',
    label: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <FaEyeSlash style={{ marginRight: 10 }} />
        비공개
      </div>
    ),
  },
];

const ManagePage = () => {
  const { profileId } = useParams(); //URL에서 :profileId 값 가져오기
  const initLetter = {
    displayName: '',
    content: '',
  };

  //Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const lgRef = useRef(null);

  //   useEffect(() => {
  //     const fetchProfile = async () => {
  //       try {
  //         let res = await getSelectProfile(profileId);
  //         if (res.status === 200) {
  //           const { profile, extension } = res.data.data;
  //           setProfile(profile);
  //           setHasFamilyTree(extension.hasFamilyTree);
  //         }
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };

  //     fetchProfile();
  //   }, []);

  const handleChange = (selectedOption) => {
    console.log('선택한 값:', selectedOption.value);
  };

  return (
    <>
      <section className="top-space-margin big-section pb-0 pt-5 md-pt-10px">
        <div className="container">
          <div
            className="row align-items-center justify-content-center"
            data-anime='{ "el": "childs", "translateY": [-15, 0], "opacity": [0,1], "duration": 300, "delay": 0, "staggervalue": 200, "easing": "easeOutQuad" }'
          >
            <div className="col-12 text-center position-relative page-title-extra-large">
              <img src={everlinkTop} alt="everlinkTop" />
            </div>
            <div className="col-12 breadcrumb breadcrumb-style-01 d-flex justify-content-center"></div>
          </div>
        </div>
      </section>
      <section className="cover-background py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-xl-7 col-lg-8 col-md-10 text-center">
              <h5 className="text-dark-gray fw-600 w-100 lg-w-90 md-w-100 mx-auto ls-minus-2px mb-7">
                초대 및 사용자 관리 페이지
              </h5>
              <div className="d-inline-block w-100 newsletter-style-01 position-relative box-shadow mb-4">
                <form>
                  <input
                    className="input-large border-1 bg-white border-color-gray form-control"
                    type="email"
                    name="email"
                    placeholder="Invite Email"
                  />
                  <input type="hidden" name="redirect" value="" />
                  <button
                    className="btn btn-large btn-base-color submit"
                    aria-label="submit"
                  >
                    초대하기
                  </button>
                  <div className="form-results border-radius-4px mt-15px pt-10px pb-10px ps-15px pe-15px fs-15 w-100 text-center position-absolute d-none"></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-0">
        <div className="container pb-1">
          <div className="row align-items-start">
            <div className="col-lg-12 pe-50px md-pe-15px">
              <div className="row align-items-center">
                <div className="col-12">
                  <h6 className="text-dark-gray fw-600 w-100 lg-w-90 md-w-100 mx-auto ls-minus-2px mb-1">
                    초대된 계정
                  </h6>
                  <table className="table invite-table">
                    <thead>
                      <tr>
                        <th scope="col" className="fw-600">
                          이메일
                        </th>
                        <th scope="col" className="fw-600">
                          이름
                        </th>
                        <th scope="col" className="fw-600">
                          권한
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="product-name">
                          <a
                            href="demo-jewellery-store-single-product.html"
                            className="text-dark-gray fw-500 d-block lh-initial"
                          >
                            DavidKim@gmai.com
                          </a>
                        </td>
                        <td>David Kim</td>
                        <td>
                          <div className="select select-container">
                            <select
                              className="form-control select-invite"
                              name="scope"
                            >
                              <option value="EDIT">Edit</option>
                              <option value="VIEW">View</option>
                              <option value="DELETE">Delete</option>
                            </select>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="p-0">
        <div className="container pb-3 md-pb-5">
          <div className="row row-cols-1 row-cols-lg-2 row-cols-md-1 g-0overflow-hidden">
            <div className="col contact-form-style-04">
              <div className="text-left">
                <form>
                  <label className="text-dark-gray  fw-500 d-block text-start">
                    일반 액세스
                  </label>
                  <div className="w-30 md-w-50">
                    <Select
                      options={options}
                      onChange={handleChange}
                      placeholder="선택하세요"
                      defaultValue={options[0]} // 기본값 설정
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-0 ">
        <div className="container pb-3">
          <div className="row align-items-start">
            <div className="col-lg-12 pe-50px md-pe-15px md-mb-50px xs-mb-35px">
              <div className="row align-items-center">
                <div className="col-12">
                  <h6 className="text-dark-gray fw-600 w-100 lg-w-90 md-w-100 mx-auto ls-minus-2px mb-1">
                    비공개 계정 보기 요청
                  </h6>
                  <table className="table nondisclosure-table">
                    <thead>
                      <tr>
                        <th scope="col" className="fw-600">
                          이메일
                        </th>
                        <th scope="col" className="fw-600">
                          이름
                        </th>
                        <th scope="col" className="fw-600">
                          메모
                        </th>
                        <th scope="col" className="fw-600">
                          허용 여부
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>DavidKim@gmai.com</td>

                        <td>David Kim</td>
                        <td>데이비드입니다.</td>
                        <td>
                          <div className="d-flex">
                            <a
                              href="#"
                              className="btn btn-black btn-very-small w-30 border-radius-10px d-table d-lg-inline-block md-mx-auto mt-5px me-5"
                            >
                              허용
                            </a>
                            <a
                              href="#"
                              className="btn btn-white btn-very-small w-30 border-radius-10px d-table d-lg-inline-block md-mx-auto mt-5px me-5"
                            >
                              거부
                            </a>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="p-7 lg-p-5 sm-p-7 bg-gradient-very-light-gray">
              <div className="row justify-content-center mb-30px sm-mb-10px">
                <div className="col-md-9 text-center">
                  <h4 className="text-dark-gray fw-500 mb-15px">
                    하늘편지 남기기
                  </h4>
                </div>
              </div>
              <form className="row">
                <div className="col-12 mb-20px ">
                  <label className="mb-10px">이름</label>
                  <input
                    className="border-radius-4px input-large mb-5px"
                    type="text"
                    name="displayName"
                    required
                  />
                  {/* {errors.deliveryName && (
                    <p className="text-danger text-start">
                      배송지 이름을 추가 해주세요.
                    </p>
                  )} */}
                </div>
                <div className="col-12 mb-20px ">
                  <label className="mb-10px">내용</label>
                  <textarea
                    className="border-radius-4px textarea-small"
                    name="content"
                    rows="5"
                    cols="5"
                    placeholder=""
                  ></textarea>
                  {/* {errors.recipientName && (
                    <p className="text-danger text-start">
                      받는분 이름을 추가 해주세요.
                    </p>
                  )} */}
                </div>

                <div className="col-lg-112 text-center text-lg-center">
                  <input type="hidden" name="redirect" value="" />

                  <Button className="btn btn-black btn-small btn-box-shadow btn-round-edge submit me-1">
                    남기기
                  </Button>

                  <Button className="btn btn-white btn-small btn-box-shadow btn-round-edge submit me-1">
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

export default ManagePage;
