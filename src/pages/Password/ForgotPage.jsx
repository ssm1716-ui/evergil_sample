import { useState } from 'react';
import { Link } from 'react-router-dom';
import { postPasswordRequest } from '@/api/guestApi';

import Button from '@/components/common/Button/Button';
import AnimatedSection from '@/components/AnimatedSection';

import { isValidEmail } from '@/utils/validators';

import forgotImage from '@/assets/images/forgot-password.png';

const ForgotPage = () => {
  const [email, setEmail] = useState('');

  //이메일 useState 로직
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  //이메일유효성 검사체크 로직
  const handleEmailCheck = async () => {
    if (!isValidEmail(email)) {
      alert('이메일을 다시 확인 해 주세요.');
      return;
    }

    const res = await postPasswordRequest(email);

    if (res === 200) {
      alert('이메일로 전송 하였습니다.');
    }
  };

  return (
    <AnimatedSection>
      <section className="bg-base-white-color">
        <div className="container">
          <div className="row row-cols-1 row-cols-lg-2 row-cols-md-1 g-0 justify-content-center overflow-hidden">
            <div
              className="col"
              data-anime='{ "translateY": [0, 0], "opacity": [0,1], "duration": 600, "delay":150, "staggervalue": 150, "easing": "easeOutQuad" }'
            >
              <div className="mt-20 py-5 text-center ">
                <a className="navbar-brand" href="demo-hotel-and-resort.html">
                  <img src={forgotImage} alt="" className="default-logo" />
                </a>
                <h3 className="fw-600 text-dark-gray mb-10 ls-minus-1px">
                  비밀번호 찾기
                </h3>
                <h6 className="fw-600 text-dark-gray mb-10 ls-minus-1px">
                  이메일을 통해 비밀번호 수정 링크가 전송됩니다.
                </h6>
                <form>
                  <input
                    className="mb-20px bg-very-light-white form-control required"
                    type="text"
                    name="loginEmail"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="이메일을 입력 하세요"
                  />

                  <input type="hidden" name="redirect" value="" />

                  <Button
                    type="submit"
                    size="extra-large"
                    radiusOn="radius-on"
                    className="btn btn-medium btn-round-edge btn-base-color btn-box-shadow submit w-100 text-transform-none"
                    onClick={handleEmailCheck}
                  >
                    이메일 전송
                  </Button>

                  <div className="form-results mt-20px d-none"></div>
                </form>
                <Link
                  to="/signin"
                  className="d-block pt-5 pe-5 fw-800 fs-18 login-text-icon"
                >
                  로그인
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
};

export default ForgotPage;
