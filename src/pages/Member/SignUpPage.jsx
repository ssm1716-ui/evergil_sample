import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/state/slices/authSlices';
import {
  postSignUp,
  getVerificationCodeVerify,
  getVerificationEmailVerify,
  getVerificationEmailResend,
} from '@/api/memberApi';

import { getPolicySelected } from '@/api/policy/policyApi';
import Button from '@/components/common/Button/Button';
import { Link } from 'react-router-dom';
import Modal from '@/components/common/Modal/Modal';
import useIsMobile from '@/hooks/useIsMobile';

import { isValidEmail, isInteger } from '@/utils/validators';

import { isValidPassword, isValidPhoneNumber } from '@/utils/validators';

import signup from '@/assets/images/evergil_signup_logo_pc.png';
import signupMobile from '@/assets/images/evergil_signup_logo_mobile.png';
import checkCircle from '@/assets/images/check-circle-solid.png';

const SignUpPage = () => {
  const inputRefs = useRef([]);
  const [step, byStep] = useState(0);
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const [member, setMember] = useState({
    loginEmail: '',
    password: '',
    passwordConfirm: '',
    displayName: '',
    phoneNumber: '',
  });
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [isModalTermsOpen, setIsModalTermsOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const checkboxGroupRef = useRef([]);
  const [invitationKey, setInvitationKey] = useState('');
  const [policyContent, setPolicyContent] = useState({});
  const [timeLeft, setTimeLeft] = useState(180); // 3분 타이머
  const [isTimerExpired, setIsTimerExpired] = useState(false);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      input[type="number"]::-webkit-inner-spin-button,
      input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      input[type="number"] {
        -moz-appearance: textfield;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    setInvitationKey(localStorage.getItem('dev_invitation'));
  }, []);

  useEffect(() => {
    // 페이지 이동 시 최상단으로 스크롤 이동
    window.scrollTo(0, 0);
  }, [step]);

  // 약관 전체 동의하기 (전체 선택, 전체 해제)
  const handleGroupCheck = (name) => {
    let isChecked = checkboxGroupRef.current[0].checked;
    checkboxGroupRef.current.forEach((checkbox) => {
      if (checkbox.name === name) {
        checkbox.checked = isChecked;
      }
    });
  };

  //회원가입 절차 스텝 늘리기
  const nextStep = () => {
    byStep(step + 1);
  };

  //1스텝- 약관동의 필수 체크
  const firstStep = () => {
    const age_chk = checkboxGroupRef.current[1].checked;
    const terms_chk = checkboxGroupRef.current[2].checked;

    if (!age_chk || !terms_chk) {
      alert('필수 항목을 체크하셔야 됩니다.');
      return;
    }
    nextStep(step + 1);
  };

  //2스텝- 회원가입 정보 검사 및 필수 체크
  const handleMemberInfoChange = (e) => {
    const { name, value } = e.target;
    1;
    // 핸드폰번호는 숫자만 입력 허용하고 하이픈 제거
    let processedValue = value;

    if (name === 'phoneNumber') {
      processedValue = value.replace(/\D/g, ''); // \D = 숫자가 아닌 것 제거
    }

    setMember({
      ...member,
      [name]: processedValue,
    });
  };
  // const verificationEmailVerify = async (email) => {
  //   if (!email) {
  //     alert('이메일을 입력 해주세요.');
  //     return;
  //   }

  //   const res = await getVerificationEmailVerify(email);

  //   if (res.status !== 200) {
  //     return res.data.message;
  //   }
  // };

  //이메일 중복체크
  const handleEmailChecked = async (e) => {
    const confirmEmail = e.target.value;
    let newErrors = {};

    if (!isValidEmail(confirmEmail)) {
      newErrors.loginEmail = '올바른 이메일 형식이 아닙니다.';
      setErrors(newErrors);
      return;
    }

    // newErrors.loginEmail = verificationEmailVerify(confirmEmail);
    // setErrors(newErrors);

    const res = await getVerificationEmailVerify(confirmEmail);

    if (res.status !== 200) {
      newErrors.loginEmail = res.data.message;
    }
    setErrors(newErrors);
  };

  // 유효성 검사 함수
  const validate = async () => {
    let newErrors = {};
    if (!member.loginEmail) {
      newErrors.loginEmail = '이메일을 입력 해주세요.';
    } else if (!isValidEmail(member.loginEmail)) {
      newErrors.loginEmail = '올바른 이메일 형식이 아닙니다.';
    }

    if (!member.password) {
      newErrors.password = '패스워드를 입력 해주세요.';
    }

    if (!isValidPassword(member.password)) {
      newErrors.password =
        '비밀번호는 영문, 숫자, 특수문자 포함8자 이상 입력 해주세요.';
    }

    if (!member.passwordConfirm) {
      newErrors.passwordConfirm = '패스워드 확인을 입력 해주세요.';
    } else if (member.password !== member.passwordConfirm) {
      newErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
    }

    if (!member.displayName) {
      newErrors.displayName = '이름을 입력 해주세요.';
    }

    if (!member.phoneNumber) {
      newErrors.phoneNumber = '휴대폰 번호를 입력해주세요.';
    }
    if (!isValidPhoneNumber(member.phoneNumber)) {
      newErrors.phoneNumber = '올바른 휴대폰 번호를 입력해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length;
  };

  const secondStep = async (e) => {
    e.preventDefault();

    let res;
    const errorLength = await validate(); // ✅ 여기 await 추가

    if (errorLength === 0) {
      res = await getVerificationEmailVerify(member.loginEmail);

      if (res.status !== 200) {
        setErrors({ loginEmail: res.data.message });
        return;
      }

      res = await postSignUp(member);
      if (res !== 201) {
        alert('회원가입 시 통신 에러가 발생하였습니다.');
        return;
      }

      setErrors({});
      nextStep(step + 1);
    }
  };

  //3스텝- 이메일 검증번호 체크
  const handleVerificationCodeChange = (index, e) => {
    const value = e.target.value;

    if (isInteger(value) || value === '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // 입력 후 다음 input으로 이동
      if (value !== '' && index < 4) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const thirdStep = async () => {
    const concatCode = otp.join('');

    if (!isInteger(concatCode) || concatCode.length !== 5) {
      alert('올바른 인증번호를 입력해주세요.');
      return;
    }

    //이메일 인증번호 발송
    const resEmailStats = await getVerificationCodeVerify(concatCode);

    if (resEmailStats !== 200) {
      alert('인증번호가 맞지 않습니다.');
      return;
    }

    // //accessToken 가져오기
    // const { status, token } = await getAccessToken();
    // if (status !== 200) {
    //   alert('restokenStats 이메일 인증번호 통신에러가 발생하였습니다');
    //   return;
    // }
    // dispatch(loginSuccess({ token }));
    nextStep(step + 1);
  };

  const verificationCodeResetSend = async () => {
    //이메일 인증번호 재전송
    const resEmailResendStats = await getVerificationEmailResend();
    if (resEmailResendStats !== 200) {
      alert('인증번호 재전송 통신에러가 발생하였습니다.');
      return;
    }
    // 타이머 초기화 및 입력 필드 활성화
    setTimeLeft(180);
    setIsTimerExpired(false);
    // 입력 필드 초기화
    setOtp(['', '', '', '', '']);
    // 첫 번째 입력 필드에 포커스
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
    setIsFirstModalOpen(true);
  };

  const handleTermsView = async (id) => {
    setIsModalTermsOpen(true);

    const res = await getPolicySelected(id);
    const policyDate = res.data.data;
    setPolicyContent(policyDate);
  };

  // 타이머 useEffect
  useEffect(() => {
    if (step === 2 && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setIsTimerExpired(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [step, timeLeft]);

  // 스텝이 변경될 때 타이머 초기화
  useEffect(() => {
    if (step === 2) {
      setTimeLeft(180);
      setIsTimerExpired(false);
    }
  }, [step]);

  return (
    <>
      <section className="top-space-margin big-section bg-very-light-gray">
        <div className="container">
          {step === 0 && (
            <div className="col contact-form-style-04 text-center bg-white">
              <div className="row row-cols-1 row-cols-lg-2 row-cols-md-1 g-0 justify-content-center overflow-hidden pt-10 md-p-10 md-pb-0 text-center md-fs-14">
                <div className="position-relative terms-condition-box text-start d-inline-block mb-20px fs-18 sm-fs-14">
                  <label className="pb-3">
                    <input
                      ref={(el) => (checkboxGroupRef.current[0] = el)}
                      type="checkbox"
                      name="terms_condition"
                      id="accept_all"
                      className="terms-condition check-box align-middle required"
                      onClick={() => handleGroupCheck('terms_condition')}
                    />
                    <span className="box fs-25 sm-fs-14 md-mb-20px sm-mb-0">
                      약관 전체 동의하기(선택 동의 포함)
                      <br />
                      <p className="fs-16 sm-fs-13 md-mt-10px sm-mt-0 sm-pb-0">
                        선택 사항에 대한 동의를 거부하는 경우에도 서비스는
                        이용이 가능합니다.
                      </p>
                    </span>
                  </label>
                  <label className="ps-5 pb-2 sm-ps-0 md-mb-20px sm-mb-0">
                    <input
                      ref={(el) => (checkboxGroupRef.current[1] = el)}
                      type="checkbox"
                      name="terms_condition"
                      id="age_consent"
                      className="terms-condition check-box align-middle required"
                    />
                    <span className="box">만 14세 이상입니다.(필수)</span>
                  </label>
                  <label className="ps-5 pb-2 sm-ps-0 md-mb-20px sm-mb-0 d-flex justify-content-between align-items-center">
                    <div>
                      <input
                        ref={(el) => (checkboxGroupRef.current[2] = el)}
                        type="checkbox"
                        name="terms_condition"
                        id="terms_of_service"
                        className="terms-condition check-box align-middle required"
                      />
                      <span className="box">Evergil 이용 약관(필수)</span>
                    </div>
                    <span className="lg-fs-25 md-fs-18 sm-fs-14 terms-view">
                      <Link
                        className="text-base-color"
                        onClick={() => handleTermsView('service')}
                      >
                        보기
                      </Link>
                    </span>
                  </label>
                  <label className="ps-5 pb-2 sm-ps-0 md-mb-20px sm-mb-0 d-flex justify-content-between align-items-center">
                    <div>
                      <input
                        ref={(el) => (checkboxGroupRef.current[3] = el)}
                        type="checkbox"
                        name="terms_condition"
                        id="marketing_consent"
                        className="terms-condition check-box align-middle"
                      />
                      <span className="box">개인정보 수집·이용 동의(선택)</span>
                    </div>
                    <span className="lg-fs-25 md-fs-18 sm-fs-14 terms-view">
                      <Link
                        className="text-base-color"
                        onClick={() => handleTermsView('personal')}
                      >
                        보기
                      </Link>
                    </span>
                  </label>
                  <label className="ps-5 pb-2 sm-ps-0 md-mb-20px sm-mb-0 d-flex justify-content-between align-items-center">
                    <div>
                      <input
                        ref={(el) => (checkboxGroupRef.current[4] = el)}
                        type="checkbox"
                        name="terms_condition"
                        id="ad_info_consent"
                        className="terms-condition check-box align-middle"
                      />
                      <span className="box">광고성 정보 수신 동의(선택)</span>
                    </div>
                    <span className="lg-fs-25 md-fs-18 sm-fs-14 terms-view">
                      <Link
                        className="text-base-color"
                        onClick={() => handleTermsView('advertisement')}
                      >
                        보기
                      </Link>
                    </span>
                  </label>
                </div>
              </div>
              <div>
                <Button
                  size="extra-large"
                  radiusOn="radius-on"
                  className="btn-large w-30 md-w-50 mt-60px md-mt-0 mb-50px "
                  onClick={firstStep}
                >
                  동의하고 다음으로
                </Button>
              </div>
            </div>
          )}
          {step === 1 && (
            <div className="row row-cols-1 row-cols-lg-2 row-cols-md-1 g-0 justify-content-center overflow-hidden bg-white py-4_5 md-py-0">
              <div className="col contact-form-style-04">
                <div className="py-5 md-p-5 text-center">
                  <img 
                    src={signup} 
                    alt="" 
                    className="default-logo" 
                    style={{ width: isMobile ? '160px' : 'auto' }}
                  />
                  <form className="mt-50px sm-mt-10px ">
                    <label className="text-dark-gray mb-10px md-mb-0 fw-500 d-block text-start signup-label">
                      이메일<span className="text-red">*</span>
                    </label>
                    <input
                      className="mb-5px bg-very-light-white form-control signup-input required"
                      type="email"
                      name="loginEmail"
                      value={member.loginEmail}
                      onChange={handleMemberInfoChange}
                      onBlur={handleEmailChecked}
                      placeholder="이메일을 입력해 주세요."
                    />
                    {errors.loginEmail && (
                      <p className="text-danger text-start sm-mb-0">
                        {errors.loginEmail}
                      </p>
                    )}
                    <label className="text-dark-gray mb-10px md-mb-0 fw-500 d-block text-start signup-label">
                      비밀번호<span className="text-red">*</span>
                    </label>
                    <input
                      className="mb-5px bg-very-light-white form-control signup-input required"
                      type="password"
                      name="password"
                      value={member.password}
                      onChange={handleMemberInfoChange}
                      placeholder="영문, 숫자, 특수문자 포함8자 이상 입력해 주세요."
                    />
                    {errors.password && (
                      <p className="text-danger text-start sm-mb-0">
                        {errors.password}
                      </p>
                    )}
                    <label className="text-dark-gray mb-10px md-mb-0 fw-500 d-block text-start signup-label">
                      비밀번호 확인<span className="text-red">*</span>
                    </label>
                    <input
                      className="mb-5px bg-very-light-white form-control signup-input required"
                      type="password"
                      name="passwordConfirm"
                      value={member.passwordConfirm}
                      onChange={handleMemberInfoChange}
                      placeholder="영문 ,숫자, 특수문자 포함8자 이상 입력해 주세요."
                    />
                    {errors.passwordConfirm && (
                      <p className="text-danger text-start sm-mb-0">
                        {errors.passwordConfirm}
                      </p>
                    )}
                    <label className="text-dark-gray mb-10px md-mb-0 fw-500 d-block text-start signup-label">
                      이름<span className="text-red">*</span>
                    </label>
                    <input
                      className="mb-5px bg-very-light-white form-control signup-input required"
                      type="text"
                      name="displayName"
                      value={member.displayName}
                      onChange={handleMemberInfoChange}
                      placeholder="이름을 입력해 주세요."
                    />
                    {errors.displayName && (
                      <p className="text-danger text-start sm-mb-0">
                        {errors.displayName}
                      </p>
                    )}
                    <label className="text-dark-gray mb-10px md-mb-0 fw-500 d-block text-start signup-label">
                      핸드폰 번호<span className="text-red">*</span>
                    </label>
                    <input
                      className="mb-5px bg-very-light-white form-control signup-input required"
                      type="text"
                      name="phoneNumber"
                      value={member.phoneNumber}
                      onChange={handleMemberInfoChange}
                      placeholder="핸드폰 번호를 입력해주세요."
                    />
                    {errors.phoneNumber && (
                      <p className="text-danger text-start sm-mb-0">
                        {errors.phoneNumber}
                      </p>
                    )}
                    <input type="hidden" name="redirect" value="" />

                    <Button
                      type="button"
                      size="extra-large"
                      radiusOn="radius-on"
                      className="btn-large w-50 mt-60px sm-mt-20px mb-20px"
                      onClick={secondStep}
                    >
                      회원가입 완료
                    </Button>
                    <div className="form-results mt-20px d-none"></div>
                  </form>
                </div>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="row row-cols-1 row-cols-lg-2 row-cols-md-1 g-0 justify-content-center overflow-hidden bg-white py-4_5 md-py-0">
              <div className="col contact-form-style-04">
                <div className="mt-10 md-mt-0 py-4_5 text-center ">
                  <img src={signup} className="default-logo" style={{ width: isMobile ? '160px' : 'auto' }} />
                  <form method="post" className="mt-40px md-mt-50px sm-mt-10px">
                    <h3 className="fw-600 text-dark-gray mb-2 ls-minus-1px md-fs-40 sm-fs-24">
                      이메일 인증하기
                    </h3>
                    <h6 className="fw-400 fs-16 md-fs-18 sm-fs-14 text-dark-gray mb-8 sm-mb-2 ls-minus-1px">
                      귀하의 이메일 계정으로 승인 메일을 보냈습니다.
                      <br /> 링크를 열어 인증 코드를 확인하세요.
                      <br />
                    </h6>
                    <div className="d-flex justify-content-center gap-3">
                      {otp.map((value, index) => (
                        <input
                          key={index}
                          className="mb-20px sm-mb-10px bg-everlink-default-color form-control w-10 fw-700 text-center p-2 sm-p-1"
                          type="number"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          name="first_code"
                          maxLength="1"
                          value={value}
                          disabled={isTimerExpired}
                          style={{
                            WebkitAppearance: 'none',
                            MozAppearance: 'textfield',
                            appearance: 'none',
                            opacity: isTimerExpired ? 0.6 : 1,
                          }}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            if (inputValue === '' || /^[0-9]$/.test(inputValue)) {
                              handleVerificationCodeChange(index, e);
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Backspace' && !value && index > 0) {
                              e.preventDefault();
                              inputRefs.current[index - 1].focus();
                            }
                          }}
                          onPaste={(e) => {
                            e.preventDefault();
                            const pastedData = e.clipboardData.getData('text').trim();
                            if (pastedData.length > 0) {
                              const numbers = pastedData.split('').slice(0, otp.length);
                              const newOtp = [...otp];
                              numbers.forEach((num, idx) => {
                                if (idx < otp.length && /^[0-9]$/.test(num)) {
                                  newOtp[idx] = num;
                                }
                              });
                              setOtp(newOtp);
                              const lastIndex = Math.min(numbers.length, otp.length - 1);
                              if (inputRefs.current[lastIndex]) {
                                inputRefs.current[lastIndex].focus();
                              }
                            }
                          }}
                          ref={(el) => (inputRefs.current[index] = el)}
                        />
                      ))}
                    </div>
                    <Button
                      size="extra-large"
                      color="white"
                      className="btn-large border-1 border-default btn-box-shadow w-80 mt-20px mb-20px sm-mb-0"
                      onClick={thirdStep}
                      disabled={isTimerExpired}
                      style={{ opacity: isTimerExpired ? 0.6 : 1 }}
                    >
                      {isTimerExpired ? '인증시간 만료' : `인증하기 (${timeLeft}초)`}
                    </Button>

                    <div className="d-flex justify-content-center">
                      <span className=" w-40 h-2px bg-dark-gray mt-20px d-inline-block"></span>
                      <span className=" w-10 h-2px mt-5px fw-700">or</span>
                      <span className=" w-40 h-2px bg-dark-gray mt-20px d-inline-block"></span>
                    </div>

                    <Button
                      size="extra-large"
                      color="black"
                      className="btn-large w-80 btn-box-shadow mt-40px sm-mt-20px mb-20px"
                      onClick={verificationCodeResetSend}
                    >
                      인증번호 재전송
                    </Button>

                    <p className="text-dark-gray fs-14 md-fs-16 sm-fs-12">
                      메일이 보이지 않나요? 스팸함을 확인하거나 인증번호를 다시
                      받아보세요.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="row row-cols-1 row-cols-lg-2 row-cols-md-1 g-0 justify-content-center overflow-hidden">
              <div className="col contact-form-style-04">
                <div className="mt-20 md-mt-0 py-5 sm-py-0 text-center ">
                  <a className="navbar-brand" href="demo-hotel-and-resort.html">
                    <img src={checkCircle} alt="" />
                  </a>
                  <h4 className="fw-800 text-dark-gray mt-15 sm-mt-5 mb-2 ls-minus-1px">
                    회원가입 완료
                  </h4>
                  {!invitationKey ? (
                    <>
                      <Link to="/profile">
                        <Button
                          size="extra-large"
                          radiusOn="radius-on"
                          className=" w-50 mt-20px mb-20px"
                        >
                          계속하기
                        </Button>
                      </Link>
                      <h6 className=" mb-8 ls-minus-1px">
                        에버링크 프로필을 생성해보세요.
                      </h6>
                    </>
                  ) : (
                    <>
                      <Link to={`/profile/invitation?key=${invitationKey}`}>
                        <Button
                          size="extra-large"
                          radiusOn="radius-on"
                          className=" w-50 mt-20px mb-20px"
                        >
                          계속하기
                        </Button>
                      </Link>
                      <h6 className=" mb-8 ls-minus-1px">
                        초대 수락을 결정 하세요.
                      </h6>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <Modal
        isOpen={isFirstModalOpen}
        onClose={() => setIsFirstModalOpen(false)}
      >
        <div className="w-100">
          <div className="modal-content p-0 rounded shadow-lg">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="p-10 sm-p-7 bg-white">
                  <div className="row justify-content-center">
                    <div className="col-md-9 text-center">
                      <h6 className="text-dark-gray fw-500 mb-15px md-fs-18 sm-fs-16">
                        이메일로 인증번호를 재전송하였습니다.
                      </h6>
                    </div>
                    <div className="col-lg-12 text-center text-lg-center pt-3">
                      <input type="hidden" name="redirect" value="" />
                      <button
                        className="btn btn-white btn-large btn-box-shadow border-1 border-default me-1"
                        onClick={() => {
                          setIsFirstModalOpen(false);
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
        isOpen={isModalTermsOpen}
        onClose={() => setIsModalTermsOpen(false)}
      >
        <div className="w-100">
          <div className="modal-content p-0 rounded shadow-lg">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="p-10 sm-p-7 bg-white">
                  <div className="row justify-content-center">
                    <div className="col-md-9 text-center">
                      <h6 className="text-dark-gray fw-500 mb-15px md-fs-18 sm-fs-16">
                        {policyContent.type === 'service'
                          ? '이용약관'
                          : policyContent.type === 'personal'
                          ? '개인정보 수집·이용 동의'
                          : '광고성 정보 수신 동의'}
                      </h6>
                    </div>
                    <div className="scroll_wrapper">
                      <div
                        className="terms_view"
                        dangerouslySetInnerHTML={{
                          __html: policyContent.content,
                        }}
                      />
                    </div>
                    <div className="col-lg-12 text-center text-lg-center pt-3">
                      <button
                        className="btn btn-white btn-large btn-box-shadow border-1 border-default me-1"
                        onClick={() => setIsModalTermsOpen(false)}
                      >
                        닫기
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

export default SignUpPage;
