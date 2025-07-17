import { useState, useEffect } from 'react';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';

import Button from '@/components/common/Button/Button';
import Modal from '@/components/common/Modal/Modal';
import {
  postRegisterProfile,
  getSelectProfile,
  putModifyProfile,
} from '@/api/memorial/memorialApi';

import { allowOnlyAlphaNumeric } from '@/utils/utils';

import checkCircle from '@/assets/images/check-circle-solid.png';

const SettingProfilePage = () => {
  const location = useLocation();
  const { profileId } = useParams(); //URL에서 :profileId 값 가져오기
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formProfile, setFormProfile] = useState({
    qrKey: '', //QR key
    memorialType: '', // 사람 or 동물
    displayName: '', //이름
    birthday: '', //생일
    deathDate: '', //기일
    nickname: '', //닉네임
    scope: '', //공개 or 비공개
  });

  const [errors, setErrors] = useState({
    memorialType: false,
    displayName: false,
    birthday: false,
    deathDate: false,
    nickname: false,
    scope: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getSelectProfile(profileId);
        if (res.status === 200) {
          const { data } = res.data;
          // PROFILE_INACTIVE 상태 확인
          if (data.result === 'PROFILE_INACTIVE') {
            navigate('/error-profile-inactive');
            return;
          }
          setFormProfile(data.profile);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (profileId) {
      fetchProfile();
      return;
    }
    // if (!location.state?.qrKey) {
    //   navigate(
    //     `/error?desc=${'유효한 접근이 아닙니다.'}&pageUrl=${'/profile'}`
    //   );
    // }
    setFormProfile({ ...formProfile, qrKey: location.state?.qrKey });
  }, []);

  // memorialType 버튼 선택 핸들러
  const handleProfileType = (type) => {
    setFormProfile({ ...formProfile, memorialType: type });
  };

  // 값 입력 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;

    let processedValue = value;

    if (name === 'nickname') {
      processedValue = allowOnlyAlphaNumeric(value); //영문,숫자로만 입력
    }

    setFormProfile({
      ...formProfile,
      [name]: processedValue,
    });
  };

  // 폼 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      memorialType, // 사람 or 동물
      displayName,
      birthday,
      deathDate,
      nickname,
      scope,
    } = { ...formProfile };

    if (memorialType.trim() === '') {
      setErrors((prev) => ({ ...prev, memorialType: true }));
      return;
    }
    if (displayName.trim() === '') {
      setErrors((prev) => ({ ...prev, displayName: true }));
      return;
    }
    // if (birthday.trim() === '') {
    //   setErrors((prev) => ({ ...prev, birthday: true }));
    //   return;
    // }
    // if (deathDate.trim() === '') {
    //   setErrors((prev) => ({ ...prev, deathDate: true }));
    //   return;
    // }
    // if (nickname.trim() === '') {
    //   setErrors((prev) => ({ ...prev, nickname: true }));
    //   return;
    // }
    if (scope.trim() === '') {
      setErrors((prev) => ({ ...prev, scope: true }));
      return;
    }

    //테스트 프로필 생성
    // const updateProfile = {
    //   ...formProfile,
    //   qrKey: 'RGeqBguSH28XpMJ3',
    // };

    try {
      let res;
      if (profileId) {
        //추모 프로필 수정
        res = await putModifyProfile(profileId, formProfile);
      } else {
        //추모 프로필 생성
        res = await postRegisterProfile(formProfile);
      }

      if (res.status === 200) {
        setIsModalOpen(true);
        return;
      }

      throw new Error('서버 응답이 올바르지 않습니다.');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <section>
        <div className="container">
          <div className="row row-cols-1 row-cols-lg-2 row-cols-md-1 g-0 justify-content-center overㄹㄹlow-hidden">
            <div className="col contact-form-style-04">
              <div className="pt-15 text-center">
                <div className="pb-15 md-pb-0">
                  <h6 className="fw-600 text-dark-gray mb-8 ls-minus-1px">
                    추모페이지 설정
                  </h6>
                  <p className="fs-16 md-fs-14">
                    사랑하는 사람에 대한 정보를 등록해보세요.
                    <br />
                    언제든지 이 정보는 수정할 수 있습니다.
                  </p>
                  {/* 사람/동물 버튼 */}
                  <div className="xs-mb-15px pt-50px md-pt-0 d-flex justify-content-around ">
                    <Button
                      className={`btn w-30 lg-mb-15px border border-1 btn-box-shadow btn-round-edge ${
                        formProfile.memorialType === 'HUMAN'
                          ? 'btn-black'
                          : 'btn-white'
                      }`}
                      onClick={() => handleProfileType('HUMAN')}
                    >
                      사람
                    </Button>
                    <Button
                      className={`btn w-30 lg-mb-15px border border-1 btn-box-shadow btn-round-edge ${
                        formProfile.memorialType === 'ANIMAL'
                          ? 'btn-black'
                          : 'btn-white'
                      }`}
                      onClick={() => handleProfileType('ANIMAL')}
                    >
                      동물
                    </Button>
                  </div>
                  {errors.memorialType && (
                    <p className="text-danger text-center pt-3">
                      사람 또는 동물을 선택 해주세요.
                    </p>
                  )}
                </div>

                {/* 폼 시작 */}
                <form>
                  {/* 이름 */}
                  <label className="text-dark-gray fw-500 d-block text-start">
                    <span className="text-red">*</span>이름
                  </label>
                  <input
                    className="mb-5px bg-very-light-white form-control md-input-small text-black required"
                    type="text"
                    name="displayName"
                    placeholder="이름을 입력해 주세요."
                    value={formProfile.displayName}
                    onChange={handleChange}
                  />
                  {errors.displayName && (
                    <p className="text-danger text-start">
                      이름을 입력 해 주세요.
                    </p>
                  )}

                  {/* 생년월일 */}
                  <label className="text-dark-gray fw-500 d-block text-start">
                    생년월일
                  </label>
                  <div className="position-relative">
                    <input
                      className="mb-5px bg-very-light-white form-control md-input-small text-black custom-date"
                      type="date"
                      name="birthday"
                      value={formProfile.birthday}
                      onChange={handleChange}
                    />
                    {formProfile.birthday && (
                      <button
                        type="button"
                        className="btn btn-sm position-absolute fs-5"
                        style={{ right: '10px', top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}
                        onClick={() => handleChange({ target: { name: 'birthday', value: '' } })}
                      >
                        <i className="bi bi-x-circle text-muted"></i>
                      </button>
                    )}
                  </div>
                  {errors.birthday && (
                    <p className="text-danger text-start">
                      생년월일 입력 해 주세요.
                    </p>
                  )}

                  {/* 기일 */}
                  <label className="text-dark-gray fw-500 d-block text-start">
                    기일
                  </label>
                  <div className="position-relative">
                    <input
                      className="mb-5px bg-very-light-white form-control md-input-small text-black custom-date"
                      type="date"
                      name="deathDate"
                      value={formProfile.deathDate}
                      onChange={handleChange}
                    />
                    {formProfile.deathDate && (
                      <button
                        type="button"
                        className="btn btn-sm position-absolute fs-5"
                        style={{ right: '10px', top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}
                        onClick={() => handleChange({ target: { name: 'deathDate', value: '' } })}
                      >
                        <i className="bi bi-x-circle text-muted"></i>
                      </button>
                    )}
                  </div>
                  {errors.deathDate && (
                    <p className="text-danger text-start">
                      기일을 입력 해 주세요.
                    </p>
                  )}

                  {/* 닉네임 */}
                  <label className="text-dark-gray fw-500 d-block text-start">
                    닉네임
                  </label>
                  <input
                    className="mb-5px bg-very-light-white form-control md-input-small text-black"
                    type="text"
                    name="nickname"
                    placeholder={`${window.location.origin}/@nickname`}
                    value={formProfile.nickname}
                    onChange={handleChange}
                  />
                  {errors.nickname && (
                    <p className="text-danger text-start">
                      닉네임을 입력 해 주세요.
                    </p>
                  )}

                  {/* 계정 공개 범위 */}
                  <label className="text-dark-gray fw-500 d-block text-start">
                    <span className="text-red">*</span>계정 공개 범위
                  </label>
                  <div className="select">
                    <select
                      className="form-control md-input-small text-black"
                      name="scope"
                      value={formProfile.scope}
                      onChange={handleChange}
                    >
                      <option value="">선택</option>
                      <option value="PUBLIC">전체공개</option>
                      <option value="PRIVATE">비공개</option>
                    </select>
                  </div>
                  {errors.scope && (
                    <p className="text-danger text-start">
                      계정 공개 범위를 선택 해주세요.
                    </p>
                  )}

                  <Button
                    type="submit"
                    size="extra-large"
                    radiusOn="radius-on"
                    className="btn-large submit w-40 mt-60px md-mt-20px mb-5px"
                    onClick={handleSubmit}
                  >
                    {profileId ? '수정하기' : '저장하기'}
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
        <div className="row justify-content-center overflow-hidden bg-white">
          <div className="contact-form-style-04">
            <div className="py-5 text-center">
              <img src={checkCircle} alt="" className="sm-w-20 w-20" />
              <h4 className="text-dark-gray fw-500 mt-20px mb-15px fs-22 md-fs-18">
                추모페이지 {profileId ? '변경 완료' : '생성 완료'}
              </h4>
              <Link to={`/profile/edit-profile/${profileId}`}>
                <Button
                  size="extra-large"
                  radiusOn="radius-on"
                  className="btn btn-extra-large w-40 mt-20px mb-5px"
                >
                  계속하기
                </Button>
              </Link>
              {!profileId && (
                <h6 className="mt-2 ls-minus-1px">추모페이지를 꾸며보세요.</h6>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SettingProfilePage;
