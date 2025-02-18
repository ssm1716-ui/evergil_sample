import { Link } from 'react-router-dom';
import Button from '@/components/common/Button/Button';
import Label from '@/components/common/Label/Label';
import CartImage1 from '@/assets/images/sample/cart-image1.jpg';
import { useState } from 'react';
import { postPasswordConfirm } from '@/api/personalApi';

const MyInfoPage = () => {
  const initialFormState = {
    password: false,
    prevPassword: false,
    nextPassword: false,
    newPasswordConfrim: false,
    name: false,
    email: false,
    phone: false,
  };
  const [nonce, setNonce] = useState('');
  const [password, setPassword] = useState('');
  const [isConfirm, setIsConfirm] = useState(false);
  const [openType, setOpenType] = useState({
    initialSection: true,
    eventSection: false,
    passwordSection: false,
    nameSection: false,
    emailSection: false,
    phoneSection: false,
  });
  const [resetPassword, setResetPassword] = useState({
    password: '',
    newPassword: '',
    newPasswordConfrim: '',
    nonce: '',
  });
  const [resetName, setResetName] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [resetPhoneNumber, setResetPhoneNumber] = useState('');

  const [errors, setErrors] = useState(initialFormState);

  //비밀번호 정보변경
  const handlePasswordConfirm = async (e) => {
    const { name } = e.target;

    const res = await postPasswordConfirm(password);
    const { data } = res.data;
    setNonce(data.nonce);
    if (res.status === 200) {
      setOpenType((prevState) => {
        return Object.keys(prevState).reduce((acc, key) => {
          acc[key] = key === name; // 클릭한 요소의 name 값만 true, 나머지는 false
          return acc;
        }, {});
      });

      setErrors(initialFormState);
      return;
    }
    setErrors({ password: true });
  };

  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setPassword(e.target.value);
  };

  const handleNextSetion = (e) => {
    const { name } = e.target;

    setOpenType((prevState) => {
      return Object.keys(prevState).reduce((acc, key) => {
        acc[key] = key === name; // 클릭한 요소의 name 값만 true, 나머지는 false
        return acc;
      }, {});
    });

    // setIsConfirm(false);
  };

  // 패스워드 입력값 변경 핸들러
  const handleResetPaaswordChange = (e) => {
    const { name, value } = e.target;
    setResetPassword((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 비밀번호 변경 핸듣러
  const handleResetPaaswordSumbit = (e) => {
    e.preventDefault(); // 기본 제출 동작 방지

    if (!resetPassword.password) {
      errors.prevPassword = true;
      return;
    } else if (!resetPassword.newPassword) {
      errors.newPassword = true;
      return;
    } else if (resetPassword.newPassword !== resetPassword.newPasswordConfrim) {
      errors.newPasswordConfrim = true;
      return;
    }

    console.log('폼 데이터 제출:', resetPassword);
    alert('폼이 제출되었습니다!');
  };

  return (
    <>
      {openType.initialSection && (
        <div className="col-xxl-10 col-lg-9 md-ps-15px md-mb-60px ">
          <div className="col-12 col-xl-12 col-lg-12 text-start position-relative page-title-extra-large text-decoration-line-bottom mb-3">
            <h1 className="fw-600 text-dark-gray mb-10px">내 정보 변경</h1>
          </div>
          <div className="row row-cols-1 row-cols-lg-2 row-cols-md-1 justify-content-center">
            <div className="col">
              <div className="row pt-5 text-center">
                <label className="text-dark-gray mb-10px fw-500 d-block text-start">
                  비밀번호
                </label>
                <input
                  className="mb-5px bg-very-light-white form-control required w-100"
                  type="password"
                  value={password}
                  onChange={handlePersonalChange}
                  placeholder="비밀번호를 입력하세요"
                />
                {errors.password && (
                  <p className="text-danger text-start">
                    비밀번호를 다시 입력 해주세요.
                  </p>
                )}

                <div className="col-12 text-center">
                  <Button
                    name="eventSection"
                    size="extra-large"
                    radiusOn="radius-on"
                    className="btn-large submit w-50 mt-60px mb-20px d-block"
                    onClick={handlePasswordConfirm}
                  >
                    확인
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {openType.eventSection && (
        <div className="col-xxl-10 col-lg-9 md-ps-15px md-mb-60px ">
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
                              onClick={handleNextSetion}
                            >
                              변경
                            </Button>
                          </td>
                        </tr>

                        <tr>
                          <td className="product-name border-bottom-2 border-gray fw-600 text-black ps-2">
                            <h6 className="fs-36 m-0 fw-600 ls-minus-1px">
                              이름
                            </h6>
                          </td>
                          <td className="product-name border-bottom-2 border-gray fw-600 text-black ps-2">
                            <h6 className="fs-32 m-0 fw-500 ls-minus-1px text-gray">
                              손*민
                            </h6>
                          </td>
                          <td className="product-name border-bottom-2 border-gray pe-2 text-end">
                            <Button
                              name="nameSection"
                              variant="primary"
                              color="profile"
                              size="xs-small"
                              className="fw-700"
                              onClick={handleNextSetion}
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
                            <h6 className="fs-32 m-0 fw-500 ls-minus-1px text-gray">
                              010-****-0000
                            </h6>
                          </td>
                          <td className="product-name border-bottom-2 border-gray pe-2 text-end">
                            <Button
                              name="phoneSection"
                              variant="primary"
                              color="profile"
                              size="xs-small"
                              className="fw-700"
                              onClick={handleNextSetion}
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
                            <h6 className="fs-32 m-0 fw-500 ls-minus-1px text-gray">
                              te**@****.com
                            </h6>
                          </td>
                          <td className="product-name border-bottom-2 border-gray pe-2 text-end">
                            <Button
                              name="emailSection"
                              variant="primary"
                              color="profile"
                              size="xs-small"
                              className="fw-700"
                              onClick={handleNextSetion}
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

      {openType.passwordSection && (
        // 비밀번호 변경
        <div className="col-xxl-10 col-lg-9 md-ps-15px md-mb-60px">
          <div className="col-12 col-xl-12 col-lg-12 text-start position-relative page-title-extra-large text-decoration-line-bottom mb-3">
            <h1 className="fw-600 text-dark-gray mb-10px">비밀번호 변경</h1>
          </div>

          <div className="row row-cols-1 row-cols-lg-2 row-cols-md-1 justify-content-center">
            <div className="col">
              <div className="row pt-5 text-center">
                <form onSubmit={handleResetPaaswordSumbit}>
                  <label className="text-dark-gray mb-10px fw-500 d-block text-start">
                    기존 비밀번호
                  </label>
                  <input
                    className="mb-5px bg-very-light-white form-control required w-100"
                    type="password"
                    name="password"
                    value={resetPassword.password}
                    onChange={handleResetPaaswordChange}
                    placeholder="기존 비밀번호를 입력하세요"
                  />
                  {errors.prevPassword && (
                    <p className="text-danger text-start">
                      기존 비밀번호를 다시 입력 해주세요.
                    </p>
                  )}

                  <label className="text-dark-gray mb-10px fw-500 d-block text-start">
                    새로운 비밀번호
                  </label>
                  <input
                    className="mb-5px bg-very-light-white form-control required w-100"
                    type="password"
                    name="newPassword"
                    value={resetPassword.newPassword}
                    onChange={handleResetPaaswordChange}
                    placeholder="비밀번호 영문,숫자,특수문자 포함 8자 이상 입력해 주세요."
                  />
                  {errors.nextPassword && (
                    <p className="text-danger text-start">
                      비밀번호 영문,숫자,특수문자 포함 8자 이상 입력해 주세요.
                    </p>
                  )}

                  <label className="text-dark-gray mb-10px fw-500 d-block text-start">
                    새로운 비밀번호 확인
                  </label>
                  <input
                    className="mb-5px bg-very-light-white form-control required w-100"
                    type="password"
                    name="newPasswordConfrim"
                    value={resetPassword.newPasswordConfrim}
                    onChange={handleResetPaaswordChange}
                    placeholder="비밀번호 영문,숫자,특수문자 포함 8자 이상 입력해 주세요."
                  />
                  {errors.newPasswordConfrim && (
                    <p className="text-danger text-start">
                      새로운 비밀번호와 동일하지 않습니다.
                    </p>
                  )}

                  <div className="col-12 text-center">
                    <Button
                      type="submit"
                      size="extra-large"
                      radiusOn="radius-on"
                      className="btn-large submit w-50 mt-60px mb-5px d-block"
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

      {openType.nameSection && (
        // 이름 변경 화면
        <div className="col-xxl-10 col-lg-9 md-ps-15px md-mb-60px ">
          <div className="col-12 col-xl-12 col-lg-12 text-start position-relative page-title-extra-large text-decoration-line-bottom mb-3">
            <h1 className="fw-600 text-dark-gray mb-10px">이름 변경</h1>
          </div>

          <div className="row row-cols-1 row-cols-lg-2 row-cols-md-1 justify-content-center">
            <div className="col">
              <div className="row pt-5 text-center">
                <label className="text-dark-gray mb-10px fw-500 d-block text-start">
                  이름 변경
                </label>
                <input
                  className="mb-5px bg-very-light-white form-control required w-100"
                  type="text"
                  name="text"
                  placeholder="이름을 입력하세요"
                />
                <input type="hidden" name="redirect" value="" />

                <div className="col-12 text-center">
                  <Button
                    type="submit"
                    size="extra-large"
                    radiusOn="radius-on"
                    className="btn-large submit w-50 mt-60px mb-5px d-block"
                  >
                    이름 변경 완료
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {openType.emailSection && (
        // 이메일 변경 화면
        <div className="col-xxl-10 col-lg-9 md-ps-15px md-mb-60px ">
          <div className="col-12 col-xl-12 col-lg-12 text-start position-relative page-title-extra-large text-decoration-line-bottom mb-3">
            <h1 className="fw-600 text-dark-gray mb-10px">이메일 변경</h1>
          </div>

          <div className="row row-cols-1 row-cols-lg-2 row-cols-md-1 justify-content-center">
            <div className="col">
              <div className="row pt-5 text-center  d-flex align-items-baseline">
                <label className="text-dark-gray mb-10px fw-500 d-block text-start">
                  이메일 변경
                </label>
                <div className="row d-flex align-items-baseline justify-content-between">
                  <input
                    className="mb-5px bg-very-light-white form-control required w-75"
                    type="password"
                    name="password"
                    placeholder="이메일"
                  />
                  <Button
                    size="large"
                    radiusOn="radius-on"
                    className="btn btn-large w-20 d-block"
                  >
                    인증 하기
                  </Button>
                  <input
                    className="mb-5px bg-very-light-white form-control required w-100"
                    type="password"
                    name="password"
                    placeholder="인증번호"
                  />
                  <input type="hidden" name="redirect" value="" />
                </div>

                <div className="col-12 text-center">
                  <Button
                    type="submit"
                    size="extra-large"
                    radiusOn="radius-on"
                    className="btn-large submit w-50 mt-60px mb-5px d-block"
                  >
                    확인
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {openType.phoneSection && (
        //휴대폰 변경 화면
        <div className="col-xxl-10 col-lg-9 md-ps-15px md-mb-60px ">
          <div className="col-12 col-xl-12 col-lg-12 text-start position-relative page-title-extra-large text-decoration-line-bottom mb-3">
            <h1 className="fw-600 text-dark-gray mb-10px">핸드폰 변경</h1>
          </div>

          <div className="row row-cols-1 row-cols-lg-2 row-cols-md-1 justify-content-center">
            <div className="col">
              <div className="row pt-5 text-center  d-flex align-items-baseline">
                <label className="text-dark-gray mb-10px fw-500 d-block text-start">
                  휴대폰 번호 변경
                </label>
                <div className="row d-flex align-items-baseline justify-content-between">
                  <input
                    className="mb-20px bg-very-light-white form-control required w-75"
                    type="password"
                    name="password"
                    placeholder="휴대폰 번호"
                  />
                  <Button
                    size="large"
                    radiusOn="radius-on"
                    className="btn btn-large w-20 d-block"
                  >
                    인증 하기
                  </Button>
                  <input
                    className="mb-20px bg-very-light-white form-control required w-100"
                    type="password"
                    name="password"
                    placeholder="인증번호"
                  />
                  <input type="hidden" name="redirect" value="" />
                </div>

                <div className="col-12 text-center">
                  <Button
                    type="submit"
                    size="extra-large"
                    radiusOn="radius-on"
                    className="btn-large submit w-50 mt-60px mb-20px d-block"
                  >
                    확인
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyInfoPage;
