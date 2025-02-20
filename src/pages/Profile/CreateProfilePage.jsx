import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { postSignIn, getAccessToken } from '@/api/memberApi';
import { loginSuccess } from '@/state/slices/authSlices.js';

import Button from '@/components/common/Button/Button';
import Modal from '@/components/common/Modal/Modal';
import { isValidEmail } from '@/utils/validators';

import checkCircle from '@/assets/images/check-circle-solid.png';

const CreateProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formProfile, setFormProfile] = useState({
    qrKey: '',
    memorialType: '', // 사람 or 동물
    displayName: '',
    birthday: '',
    deathDate: '',
    nickname: '',
    scope: '',
  });

  // memorialType 버튼 선택 핸들러
  const handleProfileType = (type) => {
    setFormProfile({ ...formProfile, memorialType: type });
  };

  // 값 입력 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormProfile({
      ...formProfile,
      [name]: value,
    });
  };

  // 폼 제출 처리
  const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();

    console.log(formProfile);
    setIsModalOpen(true);
  };

  return (
    <>
      <section>
        <div className="container">
          <div className="row row-cols-1 row-cols-lg-2 row-cols-md-1 g-0 justify-content-center overflow-hidden">
            <div className="col contact-form-style-04">
              <div className="pt-15 text-center">
                <div className="pb-15">
                  <h3 className="fw-600 text-dark-gray mb-8 ls-minus-1px">
                    추모페이지 설정
                  </h3>
                  <p>
                    사랑하는 사람에 대한 정보를 등록해보세요.
                    <br />
                    언제든지 이 정보는 수정할 수 있습니다.
                  </p>
                  {/* 사람/동물 버튼 */}
                  <div className="me-15px xs-mb-15px pt-50px d-flex justify-content-around ">
                    <Button
                      className={`btn w-30 lg-mb-15px me-10px ${
                        formProfile.memorialType === 'HUMAN'
                          ? 'btn-black'
                          : 'btn-white'
                      }`}
                      onClick={() => handleProfileType('HUMAN')}
                    >
                      사람
                    </Button>
                    <Button
                      className={`btn w-30 lg-mb-15px me-10px ${
                        formProfile.memorialType === 'ANIMAL'
                          ? 'btn-black'
                          : 'btn-white'
                      }`}
                      onClick={() => handleProfileType('ANIMAL')}
                    >
                      동물
                    </Button>
                  </div>
                </div>

                {/* 폼 시작 */}
                <form>
                  {/* 이름 */}
                  <label className="text-dark-gray mb-10px fw-500 d-block text-start">
                    <span className="text-red">*</span>이름
                  </label>
                  <input
                    className="mb-20px bg-very-light-white form-control required"
                    type="text"
                    name="displayName"
                    placeholder="이름을 입력해 주세요."
                    value={formProfile.displayName}
                    onChange={handleChange}
                  />

                  {/* 생년월일 */}
                  <label className="text-dark-gray mb-10px fw-500 d-block text-start">
                    생년월일
                  </label>
                  <input
                    className="mb-20px bg-very-light-white form-control"
                    type="date"
                    name="birthday"
                    value={formProfile.birthday}
                    onChange={handleChange}
                  />

                  {/* 기일 */}
                  <label className="text-dark-gray mb-10px fw-500 d-block text-start">
                    기일
                  </label>
                  <input
                    className="mb-20px bg-very-light-white form-control"
                    type="date"
                    name="deathDate"
                    min="2024-02-01"
                    max="2099-12-31"
                    value={formProfile.deathDate}
                    onChange={handleChange}
                  />

                  {/* 닉네임 */}
                  <label className="text-dark-gray mb-10px fw-500 d-block text-start">
                    닉네임
                  </label>
                  <input
                    className="mb-20px bg-very-light-white form-control"
                    type="text"
                    name="nickname"
                    placeholder="https://everlink.kr/'닉네임'"
                    value={formProfile.nickname}
                    onChange={handleChange}
                  />

                  {/* 계정 공개 범위 */}
                  <label className="text-dark-gray mb-10px fw-500 d-block text-start">
                    계정 공개 범위
                  </label>
                  <div className="select">
                    <select
                      className="form-control"
                      name="scope"
                      value={formProfile.scope}
                      onChange={handleChange}
                    >
                      <option value="">선택</option>
                      <option value="PUBLIC">전체공개</option>
                      <option value="PRIVITE">비공개</option>
                    </select>
                  </div>

                  <Button
                    type="submit"
                    size="extra-large"
                    radiusOn="radius-on"
                    className="btn-large submit w-40 mt-60px mb-20px"
                    onClick={handleSubmit}
                  >
                    저장하기
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 모달 컴포넌트 */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Slide up animation"
      >
        <div className="row justify-content-center overflow-hidden w-60 bg-white">
          <div className="col contact-form-style-04">
            <div className="py-5 text-center">
              <img src={checkCircle} alt="" />
              <h4 className="fw-800 text-dark-gray mt-2 mb-2 ls-minus-1px">
                추모페이지 생성 완료
              </h4>
              <Link to="/edit-profile">
                <Button
                  size="extra-large"
                  radiusOn="radius-on"
                  className="w-50 mt-20px mb-20px"
                >
                  계속하기
                </Button>
              </Link>
              <h6 className=" mb-8 ls-minus-1px">추모페이지를 꾸며보세요.</h6>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CreateProfilePage;
