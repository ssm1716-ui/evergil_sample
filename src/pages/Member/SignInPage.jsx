import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Modal from '@/components/common/Modal/Modal';
import { postSignIn, getAccessToken } from '@/api/memberApi';
import { isValidEmail } from '@/utils/validators';
import { loginSuccess } from '@/state/slices/authSlices';

import Button from '@/components/common/Button/Button';
import { Link } from 'react-router-dom';

if (localStorage.getItem('persist:root') === null) {
  console.log('스토리지 초기화 방지');
}

const SignInPage = () => {
  const initialFormState = { loginEmail: '', password: '' };
  const [member, setMember] = useState(initialFormState);
  const [errors, setErrors] = useState(initialFormState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

      const resLoginStats = await postSignIn(member);
      if (resLoginStats !== 200) {
        setIsModalOpen(true);
        return;
      }

      const { status, token } = await getAccessToken();
      if (status !== 200) {
        alert('토큰 통신에러가 발생하였습니다');
        return;
      }
      dispatch(loginSuccess({ token }));

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

      navigate('/profile');
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
    }
  };

  //SNS 회원가입& 로그인 이벤트
  const handleSnsLoginAction = (e) => {
    let url;
    const value = e.target.dataset.value || e.currentTarget.dataset.value;
    console.log('Clicked button dataset value:', value);
    switch (value) {
      case 'kakao':
        url = 'https://dev-api.everlink.kr/oauth2/authorization/kakao';
        break;
      case 'naver':
        url = 'https://dev-api.everlink.kr/oauth2/authorization/naver';
        break;
      case 'google':
        url = 'https://dev-api.everlink.kr/oauth2/authorization/google';
        break;
      default:
        break;
    }

    location.href = url;
  };

  return (
    <>
      <section className="top-space-margin big-section bg-very-light-gray">
        <div className="container">
          <div className="row g-0 justify-content-center bg-white">
            <div
              className="row align-items-center justify-content-center py-5 d-none d-md-inline-block"
              data-anime='{ "el": "childs", "translateY": [-15, 0], "opacity": [0,1], "duration": 300, "delay": 0, "staggervalue": 200, "easing": "easeOutQuad" }'
            >
              <div className="col-12 text-center position-relative page-title-extra-large">
                <h4 className="fw-600 text-dark-gray mb-10px">로그인</h4>
              </div>
              <div className="col-12 breadcrumb breadcrumb-style-01 d-flex justify-content-center"></div>
            </div>
            <div
              className="col-lg-8 col-md-10 p-5"
              data-anime='{ "translateY": [0, 0], "opacity": [0,1], "duration": 600, "delay":150, "staggervalue": 150, "easing": "easeOutQuad" }'
            >
              <form>
                <label className="text-dark-gray mb-10px md-mb-0 fw-500">
                  이메일<span className="text-red">*</span>
                </label>
                <input
                  className="mb-10px bg-very-light-white form-control required"
                  type="email"
                  name="loginEmail"
                  value={member.loginEmail}
                  onChange={handleMemberRegisterChange}
                  placeholder="이메일을 입력 하세요"
                />
                {errors.loginEmail && (
                  <p className="text-danger">{errors.loginEmail}</p>
                )}

                <label className="text-dark-gray mb-10px md-mb-0 fw-500">
                  비밀번호<span className="text-red">*</span>
                </label>
                <input
                  className="mb-20px bg-very-light-white form-control required"
                  type="password"
                  name="password"
                  value={member.password}
                  onChange={handleMemberRegisterChange}
                  placeholder="비밀번호를 입력하세요"
                />
                {errors.password && (
                  <p className="text-danger">{errors.password}</p>
                )}

                <input type="hidden" name="redirect" value="" />
                <div className="text-center">
                  <Button
                    type="submit"
                    size="extra-large"
                    radiusOn="radius-on"
                    className="btn btn-medium btn-round-edge btn-base-color btn-box-shadow w-100 md-w-50 text-transform-none"
                    onClick={handleLogin}
                  >
                    로그인
                  </Button>
                </div>
                <div className="pt-15 md-pt-5 text-center">
                  <Link to="/signup">회원가입</Link>
                  <span className="px-5">|</span>
                  <Link to="/password-forgot">비밀번호찾기</Link>
                </div>
                <div className="pt-15 md-pt-2 text-center d-flex flex-column align-items-center">
                  <Button
                    data-value="google"
                    name="google"
                    size="extra-large"
                    color="google"
                    className="btn-large w-50 md-w-100 mt-20px d-block btn-box-shadow border-0"
                    onClick={handleSnsLoginAction}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="38"
                      height="38"
                      viewBox="0 0 38 38"
                    >
                      <g fill="none" fillRule="evenodd">
                        <circle cx="19" cy="19" r="19" fill="#FFF"></circle>
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
                    구글로 시작하기
                  </Button>
                  <Button
                    data-value="kakao"
                    size="extra-large"
                    color="kakao"
                    className="btn-large w-50 md-w-100  mt-20px d-block btn-box-shadow"
                    onClick={handleSnsLoginAction}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="38"
                      height="38"
                      viewBox="0 0 38 38"
                    >
                      <g fill="none" fillRule="evenodd">
                        <circle cx="19" cy="19" r="19" fill="#FAE400"></circle>
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
                    카카오로 시작하기
                  </Button>
                  <Button
                    data-value="naver"
                    size="extra-large"
                    color="naver"
                    className="btn-large w-50 md-w-100  mt-20px d-block btn-box-shadow"
                    onClick={handleSnsLoginAction}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="38"
                      height="38"
                      viewBox="0 0 38 38"
                    >
                      <g fill="none" fillRule="evenodd">
                        <circle cx="19" cy="19" r="19" fill="#00C73C"></circle>
                        <g>
                          <path
                            d="M0 0H24V24H0z"
                            transform="translate(7 7)"
                          ></path>
                          <path
                            d="M12.74 10.537l-5.7-8.193H2.312v15.303h4.953V9.454l5.7 8.193h4.727v-15.3h-4.953v8.19z"
                            fill="#FFF"
                            transform="translate(7 7)"
                          ></path>
                        </g>
                      </g>
                    </svg>
                    네이버로 시작하기
                  </Button>
                </div>
                <div className="form-results mt-20px d-none"></div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="w-40">
          <div className="modal-content p-0 rounded shadow-lg">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="p-10 sm-p-7 bg-white">
                  <div className="row justify-content-center">
                    <div className="col-md-9 text-center">
                      <h6 className="text-dark-gray fw-500 mb-15px">
                        이메일, 비밀번호를 확인 해주세요.
                      </h6>
                    </div>
                    <div className="col-lg-12 text-center text-lg-center pt-3">
                      <input type="hidden" name="redirect" value="" />
                      <button
                        className="btn btn-white btn-large btn-box-shadow btn-round-edge submit me-1"
                        onClick={() => setIsModalOpen(false)}
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

export default SignInPage;
