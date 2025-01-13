import { useState, useRef } from 'react';
import Button from '@/components/common/Button/Button';
import { Link } from 'react-router-dom';

import {
  isValidEmail,
  isValidPassword,
  isValidName,
  isValidPhoneNumber,
  isInteger,
} from '@/utils/validators';

import signup from '@/assets/images/signup.png';
import checkCircle from '@/assets/images/check-circle-solid.png';

const SignUpPage = () => {
  const [step, byStep] = useState(0);
  const [member, setMember] = useState({
    login_email: '',
    password: '',
    passwordConfirm: '',
    display_name: '',
    phone_number: '',
  });
  const [verificationCode, setVerificationCode] = useState({
    first_code: '',
    secod_code: '',
    third_code: '',
    fourth_code: '',
    fifth_code: '',
    verification_code: '',
  });

  const checkboxGroupRef = useRef([]);

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

    if (!age_chk && !terms_chk) {
      alert('필수 항목을 체크하셔야 됩니다.');
      return;
    }
    nextStep(step + 1);
  };

  //2스텝- 회원가입 정보 검사 및 필수 체크
  const handleMemberInfoChange = (e) => {
    setMember({
      ...member,
      [e.target.name]: e.target.value,
    });
  };

  const secondStep = () => {
    if (member.password !== member.passwordConfirm) {
      alert('비밀번호가 동일하지 않습니다. 다시 입력 해주세요.');
      return;
    }
    if (!isValidEmail(member.login_email)) {
      alert('이메일을 다시 입력 해 주세요.');
      return;
    }
    if (!isValidPassword(member.password)) {
      alert('패스워드를 다시 입력 해 주세요.');
      return;
    }
    if (!isValidName(member.display_name)) {
      alert('이름을 다시 입력 해 주세요.');
      return;
    }
    if (!isValidPhoneNumber(member.phone_number)) {
      alert('핸드폰번호를 다시 입력 해 주세요.');
      return;
    }

    nextStep(step + 1);
  };

  //3스텝- 이메일 검증번호 체크
  const handleVerificationCodeChange = (e) => {
    setVerificationCode({
      ...verificationCode,
      [e.target.name]: e.target.value,
    });
  };

  const thirdStep = () => {
    const concatCode =
      verificationCode.first_code +
      verificationCode.secod_code +
      verificationCode.third_code +
      verificationCode.fourth_code +
      verificationCode.fifth_code;

    if (!isInteger(concatCode) || concatCode.length !== 5) {
      alert('올바른 인증코드를 입력해주세요.');
      return;
    }

    nextStep(step + 1);
  };

  const verificationCodeResetSend = () => {
    alert('이메일로 인증번호를 전송하였습니다.');
  };

  return (
    <section className="bg-base-white-color">
      <div className="container">
        {step === 0 && (
          <div className="col contact-form-style-04 ">
            <div className="row row-cols-1 row-cols-lg-2 row-cols-md-1 g-0 justify-content-center overflow-hidden pt-13 md-p-10 bg-white text-center">
              <div className="position-relative terms-condition-box text-start d-inline-block mb-20px">
                <label className="pb-3">
                  <input
                    ref={(el) => (checkboxGroupRef.current[0] = el)}
                    type="checkbox"
                    name="terms_condition"
                    id="accept_all"
                    className="terms-condition check-box align-middle required"
                    onClick={() => handleGroupCheck('terms_condition')}
                  />
                  <span className="box fs-25">
                    약관 전체 동의하기(선택 동의 포함)
                    <br />
                    선택 사항에 대한 동의를 거부하는 경우에도 서비스는 이용이
                    가능합니다.
                  </span>
                </label>
                <label className="ps-5 pb-2">
                  <input
                    ref={(el) => (checkboxGroupRef.current[1] = el)}
                    type="checkbox"
                    name="terms_condition"
                    id="age_consent"
                    className="terms-condition check-box align-middle required"
                  />
                  <span className="box fs-25">만 14세 이상입니다.(필수)</span>
                </label>
                <label className="ps-5 pb-2">
                  <input
                    ref={(el) => (checkboxGroupRef.current[2] = el)}
                    type="checkbox"
                    name="terms_condition"
                    id="terms_of_service"
                    className="terms-condition check-box align-middle required"
                  />
                  <span className="box fs-25">Everlink 이용 약관(필수)</span>
                </label>
                <label className="ps-5 pb-2">
                  <input
                    ref={(el) => (checkboxGroupRef.current[3] = el)}
                    type="checkbox"
                    name="terms_condition"
                    id="marketing_consent"
                    className="terms-condition check-box align-middle"
                  />
                  <span className="box fs-25">
                    마케팅 목적의 개인정보 수집 및 이용 동의(선택)
                  </span>
                </label>
                <label className="ps-5 pb-2">
                  <input
                    ref={(el) => (checkboxGroupRef.current[4] = el)}
                    type="checkbox"
                    name="terms_condition"
                    id="ad_info_consent"
                    className="terms-condition check-box align-middle"
                  />
                  <span className="box fs-25">광고성 정보 수신 동의(선택)</span>
                </label>
              </div>
              <Button
                size="extra-large"
                radiusOn="radius-on"
                className="btn-large submit w-80 mt-60px mb-20px d-block"
                onClick={firstStep}
              >
                동의하고 다음으로
              </Button>
              <div className="form-results mt-20px d-none"></div>
            </div>
          </div>
        )}
        {step === 1 && (
          <div className="row row-cols-1 row-cols-lg-2 row-cols-md-1 g-0 justify-content-center overflow-hidden">
            <div className="col contact-form-style-04">
              <div className="py-5 text-center">
                <a className="navbar-brand" href="demo-hotel-and-resort.html">
                  <img src={signup} alt="" className="default-logo" />
                </a>
                <form className="mt-50px">
                  <label className="text-dark-gray mb-10px fw-500 d-block text-start">
                    이메일<span className="text-red">*</span>
                  </label>
                  <input
                    className="mb-20px bg-very-light-white form-control required"
                    type="text"
                    name="login_email"
                    value={member.login_email}
                    onChange={handleMemberInfoChange}
                    placeholder="이메일을 입력해 주세요."
                  />
                  <label className="text-dark-gray mb-10px fw-500 d-block text-start">
                    비밀번호<span className="text-red">*</span>
                  </label>
                  <input
                    className="mb-20px bg-very-light-white form-control required"
                    type="password"
                    name="password"
                    value={member.password}
                    onChange={handleMemberInfoChange}
                    placeholder="비밀번호 영문, 숫자, 특수문자 포함 8자 이상 입력해 주세요."
                  />
                  <label className="text-dark-gray mb-10px fw-500 d-block text-start">
                    비밀번호 확인<span className="text-red">*</span>
                  </label>
                  <input
                    className="mb-20px bg-very-light-white form-control required"
                    type="password"
                    name="passwordConfirm"
                    value={member.passwordConfirm}
                    onChange={handleMemberInfoChange}
                    placeholder="비밀번호 영문, 숫자, 특수문자 포함 8자 이상 입력해 주세요."
                  />
                  <label className="text-dark-gray mb-10px fw-500 d-block text-start">
                    이름<span className="text-red">*</span>
                  </label>
                  <input
                    className="mb-20px bg-very-light-white form-control required"
                    type="text"
                    name="display_name"
                    value={member.display_name}
                    onChange={handleMemberInfoChange}
                    placeholder="이름을 입력해 주세요."
                  />
                  <label className="text-dark-gray mb-10px fw-500 d-block text-start">
                    휴대폰 번호<span className="text-red">*</span>
                  </label>
                  <input
                    className="mb-20px bg-very-light-white form-control required"
                    type="text"
                    name="phone_number"
                    value={member.phone_number}
                    onChange={handleMemberInfoChange}
                    placeholder="휴대폰 번호를 입력해주세요."
                  />
                  <input type="hidden" name="redirect" value="" />

                  <Button
                    type="button"
                    size="extra-large"
                    radiusOn="radius-on"
                    className="btn-large submit w-80 mt-60px mb-20px d-block"
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
          <div className="row row-cols-1 row-cols-lg-2 row-cols-md-1 g-0 justify-content-center overflow-hidden">
            <div className="col contact-form-style-04">
              <div className="mt-20 py-5 text-center ">
                <a className="navbar-brand" href="demo-hotel-and-resort.html">
                  <img src={signup} alt="" className="default-logo" />
                </a>
                <form method="post" className="mt-20">
                  <h3 className="fw-600 text-dark-gray mb-2 ls-minus-1px">
                    이메일 인증하기
                  </h3>
                  <h6 className="fw-400 fs-16 text-dark-gray mb-8 ls-minus-1px">
                    귀하의 이메일 계정으로 승인 메일을 보냈습니다. 링크를 열어
                    인증 코드를 확인하세요
                  </h6>
                  <div className="d-flex justify-content-center gap-3">
                    <input
                      className="mb-20px bg-everlink-default-color form-control w-10 fw-700 text-center p-2"
                      type="text"
                      name="first_code"
                      value={verificationCode.first_code}
                      onChange={handleVerificationCodeChange}
                      maxLength="1"
                    />
                    <input
                      className="mb-20px bg-everlink-default-color form-control w-10 fw-700 text-center p-2"
                      type="text"
                      name="secod_code"
                      value={verificationCode.secod_code}
                      onChange={handleVerificationCodeChange}
                      maxLength="1"
                    />
                    <input
                      className="mb-20px bg-everlink-default-color form-control w-10 fw-700 text-center p-2"
                      type="text"
                      name="third_code"
                      value={verificationCode.third_code}
                      onChange={handleVerificationCodeChange}
                      maxLength="1"
                    />
                    <input
                      className="mb-20px bg-everlink-default-color form-control w-10 fw-700 text-center p-2"
                      type="text"
                      name="fourth_code"
                      value={verificationCode.fourth_code}
                      onChange={handleVerificationCodeChange}
                      maxLength="1"
                    />
                    <input
                      className="mb-20px bg-everlink-default-color form-control w-10 fw-700 text-center p-2"
                      type="text"
                      name="fifth_code"
                      value={verificationCode.fifth_code}
                      onChange={handleVerificationCodeChange}
                      maxLength="1"
                    />
                  </div>
                  <Button
                    size="extra-large"
                    color="white"
                    className="btn-large submit w-80 mt-20px mb-20px d-block"
                    onClick={thirdStep}
                  >
                    인증하기
                  </Button>

                  <div className="d-flex justify-content-center">
                    <span className=" w-40 h-2px bg-dark-gray mt-20px d-inline-block"></span>
                    <span className=" w-10 h-2px mt-5px fw-700">or</span>
                    <span className=" w-40 h-2px bg-dark-gray mt-20px d-inline-block"></span>
                  </div>

                  <Button
                    size="extra-large"
                    color="black"
                    className="btn-large submit w-80 mt-60px mb-20px d-block"
                    onClick={verificationCodeResetSend}
                  >
                    인증번호 재전송
                  </Button>
                </form>
              </div>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="row row-cols-1 row-cols-lg-2 row-cols-md-1 g-0 justify-content-center overflow-hidden">
            <div className="col contact-form-style-04">
              <div className="mt-20 py-5 text-center ">
                <a className="navbar-brand" href="demo-hotel-and-resort.html">
                  <img src={checkCircle} alt="" />
                </a>
                <h4 className="fw-800 text-dark-gray mt-15 mb-2 ls-minus-1px">
                  회원가입 완료
                </h4>
                <Link to="/profile">
                  <Button
                    size="extra-large"
                    radiusOn="radius-on"
                    className=" w-50 mt-20px mb-20px d-block"
                  >
                    계속하기
                  </Button>
                </Link>
                <h6 className=" mb-8 ls-minus-1px">
                  에버링크 프로필을 생성해보세요.
                </h6>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SignUpPage;
