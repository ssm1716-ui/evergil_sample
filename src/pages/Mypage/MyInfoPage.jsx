import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/common/Button/Button';
import Modal from '@/components/common/Modal/Modal';
import { useState } from 'react';
import {
  postPasswordConfirm,
  putUpdatePassword,
  putUpdateDisplayName,
  putUpdatePhone,
  putPhoneAuthCodeConfirm,
  putUpdateEmail,
  putEmailAuthCodeConfirm,
} from '@/api/member/personalApi.js';

import { getMemberSettingSelect } from '@/api/member/settingApi.js';

import {
  isValidEmail,
  isValidPassword,
  isValidName,
  isValidPhoneNumber,
  isInteger,
} from '@/utils/validators';

const MyInfoPage = () => {
  // 현재 활성화된 화면을 관리하는 상태
  const [currentView, setCurrentView] = useState('passwordConfirm');
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [errors, setErrors] = useState({
    fristPassword: false,
    password: false,
    newPassword: false,
    confirmPassword: false,
    displayName: false,
    phoneNumber: false,
    phoneAuthCode: false,
    email: false,
    emailAuthCode: false,
  });
  const [fristPassword, setFristPassword] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneAuthCode, setPhoneAuthCode] = useState('');
  const [email, setEmail] = useState('');
  const [emailAuthCode, setEmailAuthCode] = useState('');
  const [isPlatform, setIsPlatform] = useState(false);

  // 사용자 정보 상태
  const [userInfo, setUserInfo] = useState({
    maskedDisplayName: '',
    maskedPhoneNumber: '',
    maskedEmail: '',
    nonce: '',
  });

  // 상태 업데이트 확인
  useEffect(() => {
    console.log(currentView);
    if (currentView === 'infoList') {
      handlePasswordConfirm();
    }
  }, [currentView]);

  //유저 플랫폼(SNS) 여부 확인
  useEffect(() => {
    const fetchSetting = async () => {
      try {
        const res = await getMemberSettingSelect();

        if (res && res.status === 200) {
          console.log(res);
          const { data } = res.data;
          setIsPlatform(data.platform !== 'LOCAL');
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchSetting();
  }, []);

  // ✅ isPlatform 값이 변경되었을 때 실행
  useEffect(() => {
    if (isPlatform) {
      handlePasswordConfirm();
    }
  }, [isPlatform]); // ✅ isPlatform이 변경될 때 실행

  const getUserNonce = () => {
    return userInfo.nonce;
  };

  // 비밀번호 확인 후 리스트 화면으로 이동
  const handlePasswordConfirm = async () => {
    if (fristPassword.trim() === '' && !isPlatform) {
      setErrors((prev) => ({ ...prev, fristPassword: true }));
      return;
    }
    try {
      const res = await postPasswordConfirm(fristPassword);
      console.log(res);

      if (res.status === 200) {
        const { data } = res.data;
        setErrors((prev) => ({ ...prev, fristPassword: false }));
        // 상태 업데이트
        setCurrentView('infoList');
        setUserInfo(data);
      } else {
        setErrors((prev) => ({ ...prev, fristPassword: true }));
      }
    } catch (error) {
      console.error('API 요청 오류:', error);
      setErrors((prev) => ({ ...prev, fristPassword: true }));
    }
  };

  // 비밀번호 변경
  const handlePasswordChange = async () => {
    console.log(password, newPassword, confirmPassword);
    if (!password.trim() || !newPassword.trim() || !confirmPassword.trim()) {
      setErrors((prev) => ({
        ...prev,
        password: !password.trim(),
        newPassword: !newPassword.trim(),
        confirmPassword: !confirmPassword.trim(),
      }));
      return;
    }

    if (!isValidPassword(newPassword)) {
      alert('비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: true }));
      return;
    }

    const res = await putUpdatePassword({
      password,
      newPassword,
      nonce: getUserNonce(),
    });

    if (res.status === 200) {
      setIsFirstModalOpen(true);
    }
  };

  // 이름 변경
  const handleNameChange = async () => {
    if (!displayName.trim()) {
      setErrors((prev) => ({ ...prev, displayName: true }));
      return;
    }

    const res = await putUpdateDisplayName({
      displayName,
      nonce: getUserNonce(),
    });

    if (res.status === 200) {
      setIsFirstModalOpen(true);
    }
  };

  // 핸드폰 인증 하기 요청
  const handlePhoneAuthRequest = async () => {
    if (!phoneNumber.trim() || !isValidPhoneNumber(phoneNumber)) {
      setErrors((prev) => ({ ...prev, phoneNumber: true }));
      return;
    }

    const res = await putUpdatePhone({
      phoneNumber,
      nonce: getUserNonce(),
    });

    if (res.status === 200) {
      setIsSecondModalOpen(true);
    }
  };

  // 핸드폰번호 변경 확인
  const handlePhoneNumberChangeConfirm = async () => {
    if (!phoneAuthCode.trim()) {
      setErrors((prev) => ({ ...prev, phoneAuthCode: true }));
      return;
    }

    const res = await putPhoneAuthCodeConfirm({
      code: phoneAuthCode,
    });

    if (res.status === 200) {
      setIsFirstModalOpen(true);
    }
  };

  // 이메일 변경
  const handleEmailChange = async () => {
    if (!email.trim() || !isValidEmail(email)) {
      setErrors((prev) => ({ ...prev, email: true }));
      return;
    }

    const res = await putUpdateEmail({
      email,
      nonce: getUserNonce(),
    });

    if (res.status === 200) {
      setIsSecondModalOpen(true);
    }
  };

  // 이메일 인증 확인
  const handleEmailAuthConfirm = async () => {
    if (!emailAuthCode.trim()) {
      setErrors((prev) => ({ ...prev, emailAuthCode: true }));
      return;
    }

    const res = await putEmailAuthCodeConfirm({
      code: emailAuthCode,
    });

    if (res.status === 200) {
      setIsFirstModalOpen(true);
    }
  };

  // 변경 완료 후 리스트 화면으로 이동
  const handleGoBackToList = () => {
    setCurrentView('infoList');
  };

  return (
    <>
      {currentView === 'passwordConfirm' && (
        <div className="col-xxl-10 col-lg-9 md-ps-15px">
          <div className="col-12 col-xl-12 col-lg-12 text-start position-relative page-title-extra-large text-decoration-line-bottom mb-3">
            <h6 className="fw-600 text-dark-gray mb-10px">내 정보 변경</h6>
          </div>
          <div className="row row-cols-1 row-cols-lg-2 row-cols-md-1 justify-content-center">
            <div className="row pt-5 text-center">
              <label className="text-dark-gray mb-10px fw-500 d-block text-start">
                비밀번호
              </label>
              <input
                className="mb-5px bg-very-light-white form-control required w-100"
                type="password"
                value={fristPassword}
                onChange={(e) => setFristPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
              />
              {errors.fristPassword && (
                <p className="text-danger text-start">
                  비밀번호를 다시 입력 해주세요
                </p>
              )}
              {/* 오류 메시지 출력 */}
              <div className="col-12 text-center">
                <Button
                  name="eventSection"
                  size="extra-large"
                  radiusOn="radius-on"
                  className="btn-large w-40 mt-60px md-mt-10px mb-5px d-inline-block"
                  onClick={handlePasswordConfirm}
                >
                  확인
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentView === 'infoList' && (
        <div className="col-xxl-10 col-lg-9 md-ps-15px ">
          <div className="col-12 col-xl-12 col-lg-12 text-start position-relative page-title-extra-large text-decoration-line-bottom mb-3">
            <h1 className="fw-600 text-dark-gray mb-10px">내 정보 변경</h1>
          </div>
          <section className="p-0">
            <div className="pt-1">
              <section className="p-0">
                <div className="ps-2">
                  <div className="col-12">
                    <table className="table cart-products">
                      <tbody>
                        {!isPlatform && (
                          <tr className="pb-2">
                            <td className="product-name border-bottom-2 border-gray fw-600 text-black ps-2 w-20">
                              <h6 className="fs-36 m-0 fw-600 ls-minus-1px">
                                비밀번호
                              </h6>
                            </td>
                            <td></td>
                            <td className="product-name border-bottom-2 border-gray pe-2 text-end">
                              <Button
                                name="passwordSection"
                                variant="primary"
                                color="profile"
                                size="xs-small"
                                className="fw-700"
                                onClick={() => setCurrentView('passwordChange')}
                              >
                                변경
                              </Button>
                            </td>
                          </tr>
                        )}

                        <tr>
                          <td className="product-name border-bottom-2 border-gray fw-600 text-black ps-2 w-15">
                            <h6 className="fs-36 m-0 fw-600 ls-minus-1px">
                              이름
                            </h6>
                          </td>
                          <td className="product-name border-bottom-2 border-gray fw-600 text-black ps-2">
                            <h6 className="fs-32 m-0 fw-400 ls-minus-1px text-gray">
                              {userInfo.maskedDisplayName}
                            </h6>
                          </td>
                          <td className="product-name border-bottom-2 border-gray pe-2 text-end">
                            <Button
                              name="nameSection"
                              variant="primary"
                              color="profile"
                              size="xs-small"
                              className="fw-700"
                              onClick={() => setCurrentView('nameChange')}
                            >
                              변경
                            </Button>
                          </td>
                        </tr>

                        <tr>
                          <td className="product-name border-bottom-2 border-gray fw-600 text-black ps-2">
                            <h6 className="fs-36 m-0 fw-600 ls-minus-1px">
                              휴대폰
                            </h6>
                          </td>
                          <td className="product-name border-bottom-2 border-gray fw-600 text-black ps-2">
                            <h6 className="fs-32 m-0 fw-400 ls-minus-1px text-gray">
                              {userInfo.maskedPhoneNumber}
                            </h6>
                          </td>
                          <td className="product-name border-bottom-2 border-gray pe-2 text-end">
                            <Button
                              name="phoneSection"
                              variant="primary"
                              color="profile"
                              size="xs-small"
                              className="fw-700"
                              onClick={() => setCurrentView('phoneChange')}
                            >
                              변경
                            </Button>
                          </td>
                        </tr>

                        <tr>
                          <td className="product-name border-bottom-2 border-gray fw-600 text-black ps-2">
                            <h6 className="fs-36 m-0 fw-600 ls-minus-1px">
                              이메일
                            </h6>
                          </td>
                          <td className="product-name border-bottom-2 border-gray fw-600 text-black ps-2">
                            <h6 className="fs-32 m-0 fw-400 ls-minus-1px text-gray">
                              {userInfo.maskedEmail}
                            </h6>
                          </td>
                          <td className="product-name border-bottom-2 border-gray pe-2 text-end">
                            <Button
                              name="emailSection"
                              variant="primary"
                              color="profile"
                              size="xs-small"
                              className="fw-700"
                              onClick={() => setCurrentView('emailChange')}
                            >
                              변경
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            </div>
          </section>
        </div>
      )}

      {currentView === 'passwordChange' && (
        // <ChangePassword onBack={handleGoBackToList} onChange={} errors={errors} />
        <div className="col-xxl-10 col-lg-9 md-ps-15px">
          <div className="col-12 col-xl-12 col-lg-12 text-start position-relative page-title-extra-large text-decoration-line-bottom mb-3">
            <h1 className="fw-600 text-dark-gray mb-10px">비밀번호 변경</h1>
          </div>

          <div className="row row-cols-1 row-cols-lg-1 row-cols-md-1 justify-content-center">
            <div className="col">
              <div className="row pt-5 text-center">
                <form>
                  <label className="text-dark-gray mb-10px fw-500 d-block text-start">
                    기존 비밀번호
                  </label>
                  <input
                    className="mb-5px bg-very-light-white form-control required w-100"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="기존 비밀번호를 입력하세요"
                  />
                  {errors.password && (
                    <p className="text-danger text-start">
                      비밀번호를 입력해주세요.
                    </p>
                  )}

                  <label className="text-dark-gray mb-10px fw-500 d-block text-start">
                    새로운 비밀번호
                  </label>
                  <input
                    className="mb-5px bg-very-light-white form-control required w-100"
                    type="password"
                    name="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="비밀번호 영문,숫자,특수문자 포함 8자 이상 입력해 주세요."
                  />
                  {errors.newPassword && (
                    <p className="text-danger text-start">
                      비밀번호를 입력해주세요.
                    </p>
                  )}

                  <label className="text-dark-gray mb-10px fw-500 d-block text-start">
                    새로운 비밀번호 확인
                  </label>
                  <input
                    className="mb-5px bg-very-light-white form-control required w-100"
                    type="password"
                    name="confirmPassword"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="비밀번호 영문,숫자,특수문자 포함 8자 이상 입력해 주세요."
                  />
                  {errors.confirmPassword && (
                    <p className="text-danger text-start">
                      비밀번호가 일치하지 않습니다.
                    </p>
                  )}

                  <div className="col-12 text-center">
                    <Button
                      size="extra-large"
                      radiusOn="radius-on"
                      className="btn-large submit w-50 mt-60px mb-5px d-block"
                      onClick={handlePasswordChange}
                    >
                      비밀번호 변경 완료
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {currentView === 'nameChange' && (
        // <ChangeName onBack={handleGoBackToList} errors={errors} />
        <div className="col-xxl-10 col-lg-9 md-ps-15px ">
          <div className="col-12 col-xl-12 col-lg-12 text-start position-relative page-title-extra-large text-decoration-line-bottom mb-3">
            <h1 className="fw-600 text-dark-gray mb-10px">이름 변경</h1>
          </div>

          <div className="row row-cols-1 row-cols-lg-1 row-cols-md-1 justify-content-center">
            <div className="row pt-5 text-center">
              <label className="text-dark-gray mb-10px fw-500 d-block text-start">
                이름 변경
              </label>
              <input
                className="mb-5px bg-very-light-white form-control required w-100"
                type="text"
                name="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="이름을 입력하세요"
              />
              {errors.displayName && (
                <p className="text-danger text-start">이름을 입력해주세요.</p>
              )}

              <div className="col-12 text-center">
                <Button
                  size="extra-large"
                  radiusOn="radius-on"
                  className="btn-large submit w-50 md-mt-60px mb-5px d-block"
                  onClick={handleNameChange}
                >
                  이름 변경 완료
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {currentView === 'phoneChange' && (
        // <ChangePhone onBack={handleGoBackToList} errors={errors} />
        <div className="col-xxl-10 col-lg-9 md-ps-15px ">
          <div className="col-12 col-xl-12 col-lg-12 text-start position-relative page-title-extra-large text-decoration-line-bottom mb-3">
            <h1 className="fw-600 text-dark-gray mb-10px">핸드폰 변경</h1>
          </div>

          <div className="row row-cols-1 row-cols-lg-1 row-cols-md-1 justify-content-center">
            <div className="row pt-5 text-center  d-flex align-items-baseline">
              <label className="text-dark-gray mb-10px fw-500 d-block text-start">
                휴대폰 번호 변경
              </label>
              <div className="row d-flex align-items-baseline justify-content-between">
                <input
                  className="mb-5px bg-very-light-white form-control required w-75"
                  type="text"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="휴대폰 번호"
                />

                <Button
                  size="large"
                  radiusOn="radius-on"
                  className="btn btn-large w-20 d-block"
                  onClick={handlePhoneAuthRequest}
                >
                  인증 하기
                </Button>
                {errors.phoneNumber && (
                  <p className="text-danger text-start">
                    유효한 핸드폰 번호를 입력해주세요.
                  </p>
                )}
                <input
                  className="mt-20px bg-very-light-white form-control required w-100"
                  type="text"
                  name="phoneAuthCode"
                  value={phoneAuthCode}
                  onChange={(e) => setPhoneAuthCode(e.target.value)}
                  placeholder="인증번호"
                />
                {errors.phoneAuthCode && (
                  <p className="text-danger text-start">
                    인증번호를 입력해주세요.
                  </p>
                )}
              </div>

              <div className="col-12 text-center">
                <Button
                  size="extra-large"
                  radiusOn="radius-on"
                  className="btn-large submit w-50 mt-60px mb-5px d-block"
                  onClick={handlePhoneNumberChangeConfirm}
                >
                  확인
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {currentView === 'emailChange' && (
        // <ChangeEmail onBack={handleGoBackToList} errors={errors} />
        <div className="col-xxl-10 col-lg-9 md-ps-15px ">
          <div className="col-12 col-xl-12 col-lg-12 text-start position-relative page-title-extra-large text-decoration-line-bottom mb-3">
            <h1 className="fw-600 text-dark-gray mb-10px">이메일 변경</h1>
          </div>

          <div className="row row-cols-1 row-cols-lg-1 row-cols-md-1 justify-content-center">
            <div className="row pt-5 text-center  d-flex align-items-baseline">
              <label className="text-dark-gray mb-10px fw-500 d-block text-start">
                이메일 변경
              </label>
              <div className="row d-flex align-items-baseline justify-content-between">
                <input
                  className="mb-5px bg-very-light-white form-control required w-75"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="이메일"
                />
                <Button
                  size="large"
                  radiusOn="radius-on"
                  className="btn btn-large w-20 d-block"
                  onClick={handleEmailChange}
                >
                  인증 하기
                </Button>
                {errors.email && (
                  <p className="text-danger text-start">
                    유효한 이메일을 입력해주세요.
                  </p>
                )}
                <input
                  className="mt-20px bg-very-light-white form-control required w-100"
                  type="text"
                  value={emailAuthCode}
                  onChange={(e) => setEmailAuthCode(e.target.value)}
                  placeholder="인증번호"
                />
                {errors.emailAuthCode && (
                  <p className="text-danger text-start">
                    인증번호를 입력해주세요.
                  </p>
                )}
              </div>

              <div className="col-12 text-center">
                <Button
                  size="extra-large"
                  radiusOn="radius-on"
                  className="btn-large submit w-50 mt-60px mb-5px d-block"
                  onClick={handleEmailAuthConfirm}
                >
                  확인
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Modal
        isOpen={isFirstModalOpen}
        onClose={() => setIsFirstModalOpen(false)}
      >
        <div className="w-40">
          <div className="modal-content p-0 rounded shadow-lg">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="p-10 sm-p-7 bg-white">
                  <div className="row justify-content-center">
                    <div className="col-md-9 text-center">
                      <h6 className="text-dark-gray fw-500 mb-15px">
                        변경되었습니다.
                      </h6>
                    </div>
                    <div className="col-lg-12 text-center text-lg-center pt-3">
                      <input type="hidden" name="redirect" value="" />
                      <button
                        className="btn btn-white btn-large btn-box-shadow btn-round-edge submit me-1"
                        onClick={() => {
                          setIsFirstModalOpen(false);
                          handleGoBackToList();
                        }}
                      >
                        확인
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isSecondModalOpen}
        onClose={() => setIsSecondModalOpen(false)}
      >
        <div className="w-40">
          <div className="modal-content p-0 rounded shadow-lg">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="p-10 sm-p-7 bg-white">
                  <div className="row justify-content-center">
                    <div className="col-md-9 text-center">
                      <h6 className="text-dark-gray fw-500 mb-15px">
                        인증번호를 전송하였습니다.
                      </h6>
                    </div>
                    <div className="col-lg-12 text-center text-lg-center pt-3">
                      <input type="hidden" name="redirect" value="" />
                      <button
                        className="btn btn-white btn-large btn-box-shadow btn-round-edge submit me-1"
                        onClick={() => {
                          setIsSecondModalOpen(false);
                        }}
                      >
                        확인
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MyInfoPage;
