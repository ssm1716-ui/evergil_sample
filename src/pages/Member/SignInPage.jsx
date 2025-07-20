import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SuccessModal from '@/components/common/Modal/SuccessModal';
import { isValidEmail } from '@/utils/validators';
import { loginSuccess } from '@/state/slices/authSlices';

import { postAddCart } from '@/api/member/cartApi';

import Button from '@/components/common/Button/Button';
import { Link } from 'react-router-dom';
import { postSignIn, getCart, removeLocalStorageCart } from '@/api/memberApi';
import { getTransformedCartData } from '@/utils/utils';

import { API_BASE_URL } from '@/config';

if (localStorage.getItem('persist:root') === null) {
  // console.log('스토리지 초기화 방지');
}

const SignInPage = () => {
  const initialFormState = { loginEmail: '', password: '' };
  const [member, setMember] = useState(initialFormState);
  const [errors, setErrors] = useState(initialFormState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Redux 상태에서 인증 여부 가져오기
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // 인증된 사용자가 /signin 페이지에 접속하면 리다이렉트
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     // 로컬스토리지에 redirectAfterLogin 값이 있으면 해당 값으로 리다이렉트
  //     const redirectPath = localStorage.getItem('redirectAfterLogin');
  //     if (redirectPath) {
  //       localStorage.removeItem('redirectAfterLogin');
  //       navigate(redirectPath);
  //     } else {
  //       // 없으면 홈페이지로 리다이렉트
  //       navigate('/');
  //     }
  //   }
  // }, [isAuthenticated, navigate]);

  const handleMemberRegisterChange = (e) => {
    const { name, value } = e.target;
    setMember({
      ...member,
      [name]: value,
    });

    // 실시간 유효성 검사
    if (value.trim() === '') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `${
          name === 'loginEmail' ? '이메일을' : '패스워드'
        } 입력해 주세요.`,
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    }

    if (name === 'loginEmail' && value && !isValidEmail(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        loginEmail: '올바른 이메일 주소를 입력해 주세요.',
      }));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let newErrors = {};
      if (!member.loginEmail.trim())
        newErrors.loginEmail = '이메일을 입력 해주세요.';
      if (!member.password.trim())
        newErrors.password = '패스워드를 입력 해주세요.';

      setErrors(newErrors);

      if (Object.keys(newErrors).length > 0) return;

      const { status, token, message } = await postSignIn(member);
      if (status !== 200) {
        setModalMessage(message);
        setIsModalOpen(true);
        return;
      }

      dispatch(loginSuccess({ token }));

      //로그인 후 장바구니 아이템 서버로 전송
      sendCartProduct();

      //초대하기로 전달받은 로그인 & 비공개 프로필
      profileBridge();

      const redirectPath = localStorage.getItem('redirectAfterLogin') || '/profile';
console.log("redirectPath!!! -> " + redirectPath);
      localStorage.removeItem('redirectAfterLogin');
      navigate(redirectPath);
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
    }
  };

  //SNS 회원가입& 로그인 이벤트
  const handleSnsLoginAction = (e) => {
    let url;
    const value = e.target.dataset.value || e.currentTarget.dataset.value;
    switch (value) {
      case 'kakao':
        url = `${API_BASE_URL}/oauth2/authorization/kakao`;
        break;
      case 'naver':
        url = `${API_BASE_URL}/oauth2/authorization/naver`;
        break;
      case 'google':
        url = `${API_BASE_URL}/oauth2/authorization/google`;
        break;
      default:
        break;
    }
    location.href = url;
  };

  const profileBridge = () => {
    //이메일로 전달받은 초대하기로 로그인 후 로컬스토리지에서 get
    const invitationKey = localStorage.getItem('dev_invitation');

    //비공개 프로필 -> 로그인 후 로컬스토리지 get
    const remberProfileUrl = localStorage.getItem('dev_remberProfileUrl');

    if (invitationKey) {
      localStorage.removeItem('dev_invitation');
      navigate(`/profile/invitation?key=${invitationKey}`);
      return;
    }
    if (remberProfileUrl) {
      localStorage.removeItem('dev_remberProfileUrl');
      navigate(`${remberProfileUrl}`);
      return;
    }
  };

  const sendCartProduct = async () => {
    const storedCart = getCart();
    if (storedCart.length <= 0) return;
    const transformedData = getTransformedCartData(storedCart);

    const res = await postAddCart(transformedData);
    if (res.status !== 200) {
      console.log('not saved cart!');
    }
    removeLocalStorageCart();
  };

  return (
    <>
      <section className="section bg-very-light-gray pt-6 md-mt-60px pb-1">
        <div className="container">
          <div className="row g-0 justify-content-center bg-white">
            <div
              className="row align-items-center justify-content-center md-py-0 d-none d-md-inline-block"
              data-anime='{ "el": "childs", "translateY": [-15, 0], "opacity": [0,1], "duration": 300, "delay": 0, "staggervalue": 200, "easing": "easeOutQuad" }'
            >
              <div className="col-12 text-center position-relative page-title-extra-large">
                <h4 className="fw-600 text-dark-gray mb-0 py-4_5 md-pb-0">
                  로그인
                </h4>
              </div>
              <div className="col-12 breadcrumb breadcrumb-style-01 d-flex justify-content-center"></div>
            </div>
            <div
              className="col-lg-8 col-md-10 p-5"
              data-anime='{ "translateY": [0, 0], "opacity": [0,1], "duration": 600, "delay":150, "staggervalue": 150, "easing": "easeOutQuad" }'
            >
              <form className="px-4" onSubmit={(e) => e.preventDefault()}>
                <div className="mb-4">
                  <label className="text-dark-gray mb-2 d-block fw-500">
                    이메일<span className="text-red">*</span>
                  </label>
                  <input
                    className="form-control required py-3"
                    type="email"
                    name="loginEmail"
                    value={member.loginEmail}
                    onChange={handleMemberRegisterChange}
                    placeholder="이메일을 입력하세요"
                  />
                  {errors.loginEmail && (
                    <p className="text-danger mt-2 mb-0 fs-14">{errors.loginEmail}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="text-dark-gray mb-2 d-block fw-500">
                    비밀번호<span className="text-red">*</span>
                  </label>
                  <input
                    className="form-control required py-3"
                    type="password"
                    name="password"
                    value={member.password}
                    onChange={handleMemberRegisterChange}
                    placeholder="비밀번호를 입력하세요"
                  />
                  {errors.password && (
                    <p className="text-danger mt-2 mb-0 fs-14">{errors.password}</p>
                  )}
                </div>

                <input type="hidden" name="redirect" value="" />
                <div className="text-center mt-4 mb-4">
                  <Button
                    type="submit"
                    size="extra-large"
                    radiusOn="radius-on"
                    className="btn btn-medium btn-round-edge btn-base-color btn-box-shadow w-100 md-w-50 text-transform-none py-3"
                    onClick={handleLogin}
                  >
                    로그인
                  </Button>
                </div>
                <div className="text-center mb-5">
                  <Link to="/signup" className="text-dark-gray text-decoration-none">
                    회원가입
                  </Link>
                  <span className="mx-3 text-dark-gray">|</span>
                  <Link to="/password-forgot" className="text-dark-gray text-decoration-none">
                    비밀번호찾기
                  </Link>
                </div>
                <div className="text-center">
                  <div className="d-flex justify-content-center gap-3">
                    <Button
                      type="button"
                      data-value="google"
                      name="google"
                      size="extra-large"
                      color="google"
                      className="btn-large w-100 d-block py-3"
                      onClick={handleSnsLoginAction}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="38"
                        height="38"
                        viewBox="0 0 38 38"
                      >
                        <g fill="none" fillRule="evenodd">
                          <rect x="0" y="0" width="38" height="38" fill="#FFF" />
                          <g>
                            <path
                              d="M0 0H24V24H0z"
                              transform="translate(7 7)"
                            ></path>
                            <g fillRule="nonzero">
                              <path
                                fill="#4285F4"
                                d="M16.735 8.733c0-.606-.054-1.188-.155-1.747H8.538v3.303h4.596c-.198 1.067-.8 1.971-1.704 2.577v2.142h2.76c1.614-1.486 2.545-3.675 2.545-6.275z"
                                transform="translate(7 7) translate(3.462 3.462)"
                              ></path>
                              <path
                                fill="#34A853"
                                d="M8.538 17.077c2.306 0 4.239-.765 5.651-2.069l-2.76-2.142c-.764.512-1.742.815-2.89.815-2.224 0-4.107-1.502-4.778-3.52H.908v2.212c1.405 2.79 4.293 4.704 7.63 4.704z"
                                transform="translate(7 7) translate(3.462 3.462)"
                              ></path>
                              <path
                                fill="#FBBC05"
                                d="M3.76 10.16c-.17-.512-.267-1.059-.267-1.622 0-.562.097-1.11.268-1.622V4.704H.908C.33 5.857 0 7.16 0 8.538c0 1.378.33 2.682.908 3.835l2.853-2.212z"
                                transform="translate(7 7) translate(3.462 3.462)"
                              ></path>
                              <path
                                fill="#EA4335"
                                d="M8.538 3.396c1.254 0 2.38.43 3.264 1.277l2.45-2.45C12.771.847 10.84 0 8.537 0 5.201 0 2.313 1.913.908 4.704l2.853 2.212c.671-2.018 2.554-3.52 4.777-3.52z"
                                transform="translate(7 7) translate(3.462 3.462)"
                              ></path>
                            </g>
                          </g>
                        </g>
                      </svg>
                      <span className="ps-10px d-lg-inline-block d-md-none d-sm-none">
                        구글 로그인
                      </span>
                    </Button>
                    <Button
                      type="button"
                      data-value="kakao"
                      size="extra-large"
                      color="kakao"
                      className="btn-large w-100 d-block py-3"
                      onClick={handleSnsLoginAction}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="38"
                        height="38"
                        viewBox="0 0 38 38"
                      >
                        <g fill="none" fillRule="evenodd">
                          <rect
                            x="0"
                            y="0"
                            width="38"
                            height="38"
                            fill="#FAE400"
                          />
                          <g>
                            <path
                              d="M0 0H24V24H0z"
                              transform="translate(7 7)"
                            ></path>
                            <path
                              fill="#3C1E1E"
                              fillRule="nonzero"
                              d="M11.992 3.692c5.093 0 9.222 3.303 9.222 7.377s-4.129 7.376-9.222 7.376c-.552 0-1.092-.038-1.616-.113l-3.64 2.512c-.172.12-.368-.021-.343-.193.014-.102.27-1.202.765-3.299-2.633-1.298-4.389-3.627-4.389-6.283 0-4.074 4.13-7.377 9.223-7.377z"
                              transform="translate(7 7)"
                            ></path>
                          </g>
                        </g>
                      </svg>
                      <span className="ps-10px d-lg-inline-block d-md-none d-sm-none">
                        카카오 로그인
                      </span>
                    </Button>
                    <Button
                      type="button"
                      data-value="naver"
                      size="extra-large"
                      color="naver"
                      className="btn-large w-100 d-block py-3"
                      onClick={handleSnsLoginAction}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="38"
                        height="38"
                        viewBox="0 0 38 38"
                      >
                        <g fill="none" fillRule="evenodd">
                          <rect
                            x="0"
                            y="0"
                            width="38"
                            height="38"
                            fill="#00C73C"
                          />
                          <g>
                            <path
                              d="M0 0H24V24H0z"
                              transform="translate(7 7)"
                            ></path>
                            <path
                              d="M12.74 10.537l-5.7-8.193H2.312v15.303h4.953V9.454l5.7 8.193h4.727v-15.3h-4.953v8.19z"
                              fill="#FFF"
                              transform="translate(9 9)"
                            ></path>
                          </g>
                        </g>
                      </svg>
                      <span className="ps-10px d-lg-inline-block d-md-none d-sm-none">
                        네이버 로그인
                      </span>
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <SuccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={modalMessage}
      />
    </>
  );
};

export default SignInPage;
