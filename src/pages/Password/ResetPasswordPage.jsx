import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { postPasswordRequest } from '@/api/guest/guestApi';
import Modal from '@/components/common/Modal/Modal';
import Button from '@/components/common/Button/Button';

import { postTokenValidation, postResetPassword } from '@/api/guest/guestApi';
import { isValidPassword } from '@/utils/validators';

import defaultLogo from '@/assets/images/header-logo.png';

const ResetPasswordPage = () => {
  const [resetPassword, setResetPassword] = useState({
    token: '',
    newPassword: '',
  });
  const [form, setForm] = useState({
    password: '',
    passwordConfirm: '',
  });
  const [errors, setErrors] = useState({
    password: false,
    passwordConfirm: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('key'); // ✅ URL에서 key 값 가져오기

  useEffect(() => {
    // 스타일 추가
    if (!token) {
      navigate(
        `/error?desc=${'접근 할 수 없는 페이지 입니다.'}&pageUrl=${'/signin'}`
      );
      return;
    }

    const fetchTokenValidation = async () => {
      try {
        const res = await postTokenValidation(token);

        console.log(token, res);

        if (!res || res.status !== 200) {
          navigate(
            `/error?desc=${'유효기간이 만료되었습니다.'}&pageUrl=${'/signin'}`
          );
          return;
        }
        setResetPassword({ ...resetPassword, token: token });
      } catch (error) {
        console.error(error);
      }
    };
    fetchTokenValidation();
  }, []);

  useEffect(() => {
    if (form.passwordConfirm && form.password !== form.passwordConfirm) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordConfirm: true,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordConfirm: false,
      }));
    }
  }, [form.password, form.passwordConfirm]); // form 상태가 변경될 때마다 실행

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });

    // 실시간 유효성 검사
    if (value.trim() === '') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: true,
      }));
      return;
    }

    // 비밀번호 유효성 검사
    if (!isValidPassword(value.trim())) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: true,
      }));
      return;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
    }));
  };

  const handlePasswordConfirm = async (e) => {
    e.preventDefault();

    if (Object.values(errors).some((error) => error)) {
      return;
    }

    const res = await postResetPassword({ token, newPassword: form.password });
    if (res.status === 200) {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg header-light bg-white center-logo header-reverse">
          <div className="container-fluid">
            <div className="menu-logo">
              <Link to="/" className="navbar-brand ps-0 md-ps-15px">
                <img
                  src={defaultLogo}
                  data-at2x="images/demo-hotel-and-resort-logo@2x.png"
                  alt=""
                  className="default-logo"
                />
                <img
                  src={defaultLogo}
                  data-at2x="images/demo-hotel-and-resort-logo@2x.png"
                  alt=""
                  className="alt-logo"
                />
                <img
                  src={defaultLogo}
                  data-at2x="images/demo-hotel-and-resort-logo@2x.png"
                  alt=""
                  className="mobile-logo"
                />
              </Link>
            </div>
            <div className="col-auto col-xl-12 col-lg-12 menu-order">
              <div
                className="collapse navbar-collapse justify-content-between"
                id="navbarNav"
              >
                <ul className="navbar-nav navbar-left justify-content-start"></ul>
                <ul className="navbar-nav navbar-right justify-content-end">
                  <li className="nav-item">
                    <Link to="/cart" className="nav-link feature-box"></Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <section className="bg-base-white-color">
          <div className="container">
            <div className="row row-cols-1 row-cols-lg-2 row-cols-md-1 g-0 justify-content-center overflow-hidden">
              <div
                className="col"
                data-anime='{ "translateY": [0, 0], "opacity": [0,1], "duration": 600, "delay":150, "staggervalue": 150, "easing": "easeOutQuad" }'
              >
                <div className="mt-20 py-5 text-center ">
                  <a
                    className="navbar-brand"
                    href="demo-hotel-and-resort.html"
                  ></a>
                  <h3 className="fw-600 text-dark-gray mb-10 ls-minus-1px">
                    비밀번호 재설정
                  </h3>

                  <form className="text-start">
                    <label className="text-dark-gray mb-10px fw-500">
                      비밀번호<span className="text-red">*</span>
                    </label>
                    <input
                      className="mb-10px bg-very-light-white form-control required"
                      type="text"
                      name="password"
                      value={form.password}
                      onChange={handlePasswordChange}
                      placeholder="비밀번호 영문, 숫자, 특수문자 포함 8자 이상 입력해 주세요."
                    />
                    {errors.password && (
                      <p className="text-danger">
                        패스워드가 유효하지 않습니다.
                      </p>
                    )}

                    <label className="text-dark-gray mb-10px fw-500">
                      비밀번호 확인<span className="text-red">*</span>
                    </label>
                    <input
                      className="mb-10px bg-very-light-white form-control required"
                      type="text"
                      name="passwordConfirm"
                      value={form.passwordConfirm}
                      onChange={handlePasswordChange}
                      placeholder="비밀번호와 동일하게 입력 해주세요."
                    />
                    {errors.passwordConfirm && (
                      <p className="text-danger">
                        패스워드가 동일하지 않습니다.
                      </p>
                    )}

                    <Button
                      type="submit"
                      size="extra-large"
                      radiusOn="radius-on"
                      className="btn btn-medium btn-round-edge btn-base-color btn-box-shadow submit w-100 text-transform-none mt-5"
                      onClick={handlePasswordConfirm}
                    >
                      비밀번호 재설정 확인
                    </Button>

                    <div className="form-results mt-20px d-none"></div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="w-40">
          <div className="modal-content p-0 rounded shadow-lg">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="p-10 sm-p-7 bg-white">
                  <div className="row justify-content-center">
                    <div className="col-md-9 text-center">
                      <h6 className="text-dark-gray fw-500 mb-15px">
                        비밀번호가 재설정 되었습니다.
                      </h6>
                    </div>
                    <div className="col-lg-12 text-center text-lg-center pt-3">
                      <input type="hidden" name="redirect" value="" />
                      <button
                        className="btn btn-white btn-large btn-box-shadow btn-round-edge submit me-1"
                        onClick={() => {
                          setIsModalOpen(false);
                          navigate('/signin');
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

export default ResetPasswordPage;
