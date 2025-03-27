import { useState } from 'react';
import { Link } from 'react-router-dom';
import { postPasswordRequest } from '@/api/guest/guestApi';
import Modal from '@/components/common/Modal/Modal';
import Button from '@/components/common/Button/Button';
import { isValidEmail } from '@/utils/validators';

import forgotImage from '@/assets/images/forgot-password.png';

const ForgotPage = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  //이메일 useState 로직
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (value.trim() === '') {
      setErrors('이메일을 입력해 주세요.');
    }

    if (!isValidEmail(value)) {
      setErrors('올바른 이메일 주소를 입력해 주세요.');
    } else {
      setErrors('');
    }
  };

  //이메일유효성 검사체크 로직
  const handleEmailCheck = async () => {
    if (!isValidEmail(email)) {
      setErrors('올바른 이메일 주소를 입력해 주세요.');
      return;
    }

    const res = await postPasswordRequest(email);

    if (res === 200) {
      setIsModalOpen(true);
      setEmail('');
      setErrors('');
    }
  };

  return (
    <>
      <section className="top-space-margin big-section bg-very-light-gray">
        <div className="container">
          <div className="row row-cols-1 row-cols-lg-2 row-cols-md-1 g-0 justify-content-center overflow-hidden bg-white pb-10 p-10px">
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
                  {errors && <p className="text-danger text-start">{errors}</p>}

                  <Button
                    type="submit"
                    size="extra-large"
                    radiusOn="radius-on"
                    className="btn btn-medium btn-round-edge btn-base-color btn-box-shadow submit w-50 text-transform-none"
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
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="w-40">
          <div className="modal-content p-0 rounded shadow-lg">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="p-10 sm-p-7 bg-white">
                  <div className="row justify-content-center">
                    <div className="col-md-9 text-center">
                      <h6 className="text-dark-gray fw-500 mb-15px">
                        전송되었습니다.
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

export default ForgotPage;
