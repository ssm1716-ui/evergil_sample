import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { postSignIn, getAccessToken } from '@/api/memberApi';
import { loginSuccess } from '@/state/slices/authSlices.js';

import Button from '@/components/common/Button/Button';
import { Link } from 'react-router-dom';

const SignInPage = () => {
  const [member, setMember] = useState({
    loginEmail: '',
    password: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMemberRegisterChange = (e) => {
    setMember({
      ...member,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const resLoginStats = await postSignIn(member);
      if (resLoginStats !== 200) {
        alert('이메일, 비밀번호를 확인 해주세요.');
        return;
      }

      const restokenStats = await getAccessToken();
      if (!restokenStats) {
        alert('토큰 통신에러가 발생하였습니다');
        return;
      }

      dispatch(loginSuccess('success'));

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
    <section className="bg-base-default-color">
      <div className="container">
        <div className="row row-cols-1 row-cols-lg-2 row-cols-md-1 g-0 justify-content-center overflow-hidden">
          <div className="col contact-form-style-04">
            <div className="pt-15 text-center">
              <h3 className="fw-600 text-dark-gray mb-8 ls-minus-1px">
                로그인
              </h3>
              <form>
                <label className="text-dark-gray mb-10px fw-500 d-block text-start">
                  이메일<span className="text-red">*</span>
                </label>
                <input
                  className="mb-20px bg-very-light-white form-control required"
                  type="text"
                  name="loginEmail"
                  value={member.loginEmail}
                  onChange={handleMemberRegisterChange}
                  placeholder="이메일을 입력 하세요"
                />
                <label className="text-dark-gray mb-10px fw-500 d-block text-start">
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
                <input type="hidden" name="redirect" value="" />

                <Button
                  type="submit"
                  size="extra-large"
                  radiusOn="radius-on"
                  className="btn-large submit w-80 mt-60px mb-20px d-block"
                  onClick={handleLogin}
                >
                  로그인
                </Button>
              </form>
              <div className="pt-15 text-center">
                <Link to="/signup">회원가입</Link>
                <span className="px-5">|</span>
                <Link to="/password-forgot">비밀번호찾기</Link>
              </div>
              <div className="pt-15 text-center">
                <Button
                  data-value="google"
                  name="google"
                  size="extra-large"
                  color="google"
                  className="btn-large w-80 mt-20px mb-10px d-block btn-box-shadow"
                  onClick={handleSnsLoginAction}
                >
                  구글로 시작하기
                </Button>
                <Button
                  data-value="kakao"
                  size="extra-large"
                  color="kakao"
                  className="btn-large w-80 mt-20px mb-10px d-block btn-box-shadow"
                  onClick={handleSnsLoginAction}
                >
                  카카오로 시작하기
                </Button>
                <Button
                  data-value="naver"
                  size="extra-large"
                  color="naver"
                  className="btn-large w-80 mt-20px mb-10px d-block btn-box-shadow"
                  onClick={handleSnsLoginAction}
                >
                  네이버로 시작하기
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignInPage;
