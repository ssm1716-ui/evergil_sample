import { useState, useEffect } from 'react';
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import Button from '@/components/common/Button/Button';
import Modal from '@/components/common/Modal/Modal';
import PaymentDue from '@/components/Order/PaymentDue';
import OrderEmptyComponents from '@/components/Order/OrderEmptyComponents';
import OrderListComponents from '@/components/Order/OrderListComponents';
import CartImage1 from '@/assets/images/sample/cart-image1.jpg';
import AnimatedSection from '@/components/AnimatedSection';
import AddressSearch from '@/components/AddressSearch';
import { useSelector } from 'react-redux';

import { putConfirmInvitation } from '@/api/memorial/memorialApi';

import { removeHyphens } from '@/utils/utils';
import defaultLogo from '@/assets/images/header-logo.png';

const InvitationPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isErr, setIsErr] = useState(false);
  const [errDesc, setErrDesc] = useState('');
  const invitationKey = searchParams.get('key');
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log('🔥 인증 상태:', isAuthenticated);

  //초기 데이터 가져오기
  useEffect(() => {
    if (!invitationKey) {
      setErrDesc('유효한 접근이 아닙니다.');
      setIsErr(true);
      return;
    }
    if (!isAuthenticated) {
      setErrDesc('회원가입 또는 로그인 해야 진행 가능합니다.');
      setIsErr(true);
      setIsModalOpen(true);
    }
  }, [invitationKey]);

  const SaveInvitationKey = () => {
    if (!invitationKey) return;
    localStorage.removeItem('dev_invitation');
    localStorage.setItem('dev_invitation', invitationKey);
  };

  const handleConfirmInvitation = async (isAggree) => {
    if (!invitationKey) {
      setErrDesc('유효한 접근이 아닙니다.');
      setIsErr(true);
      return;
    }

    const res = await putConfirmInvitation({
      invitationToken: invitationKey,
      isConfirmed: isAggree,
    });

    if (res.status === 200) {
      navigate('/profile');
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
                  // data-at2x="images/demo-hotel-and-resort-logo@2x.png"
                  alt=""
                  className="default-logo"
                />
                <img
                  src={defaultLogo}
                  // data-at2x="images/demo-hotel-and-resort-logo@2x.png"
                  alt=""
                  className="alt-logo"
                />
                <img
                  src={defaultLogo}
                  // data-at2x="images/demo-hotel-and-resort-logo@2x.png"
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
      {!isErr ? (
        <>
          <main>
            <section
              className="cover-background full-screen md-h-550px confirm-window"
              // style="background-image: url(images/404-bg.jpg);"
            >
              <div className="container h-100">
                <div className="row align-items-center justify-content-center h-100">
                  <div className="col-12 col-xl-6 col-lg-7 col-md-9 text-center">
                    {/* <h6 className="text-dark-gray fw-600 mb-5px text-uppercase">
                  Ooops!
                </h6> */}
                    <h4 className="text-dark-gray fw-600 fs-24 sm-fs-22 mb-10px ls-minus-1px mb-10">
                      초대를 수락 하시겠습니까?
                    </h4>
                    {/* <p className="mb-30px lh-28 sm-mb-30px w-55 md-w-80 sm-w-95 mx-auto">
                  The resource you are looking for doesn't exist or might have
                  been removed.
                </p> */}
                    <Link
                      className="btn btn-large left-icon btn-rounded btn-base-color btn-box-shadow text-transform-none me-5"
                      onClick={() => handleConfirmInvitation(true)}
                    >
                      수락하기
                    </Link>
                    <Link
                      className="btn btn-large left-icon btn-rounded btn-dark-gray btn-box-shadow text-transform-none"
                      onClick={() => handleConfirmInvitation(false)}
                    >
                      거절하기
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </>
      ) : (
        <>
          <main>
            <section
              className="cover-background full-screen md-h-550px confirm-window"
              // style="background-image: url(images/404-bg.jpg);"
            >
              <div className="container h-100">
                <div className="row align-items-center justify-content-center h-100">
                  <div className="col-12 col-xl-6 col-lg-7 col-md-9 text-center">
                    {/* <h6 className="text-dark-gray fw-600 mb-5px text-uppercase">
                  Ooops!
                </h6> */}
                    <h4 className="text-dark-gray fw-600 fs-24 sm-fs-22 mb-10px ls-minus-1px mb-10">
                      {errDesc}
                    </h4>
                    {/* <p className="mb-30px lh-28 sm-mb-30px w-55 md-w-80 sm-w-95 mx-auto">
                  The resource you are looking for doesn't exist or might have
                  been removed.
                </p> */}
                    <Link
                      to={'/'}
                      className="btn btn-large left-icon btn-rounded btn-base-color btn-box-shadow text-transform-none"
                    >
                      <i className="fa-solid fa-arrow-left"></i>돌아가기
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </main>
          {/* <h1>InvitationPage</h1>
          <h2>Invitation key - {invitationKey}</h2> */}
        </>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="w-40">
          <div className="modal-content p-0 rounded shadow-lg">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="p-10 sm-p-7 bg-white">
                  <div className="row justify-content-center">
                    <div className="col-md-9 text-center">
                      <h6 className="text-dark-gray fw-500 mb-15px fs-24">
                        회원가입 또는 로그인 해야 진행 가능합니다.
                      </h6>
                    </div>
                    <div className="col-lg-12 text-center text-lg-center pt-3">
                      <input type="hidden" name="redirect" value="" />
                      <button
                        className="btn btn-white btn-large btn-box-shadow btn-round-edge submit me-1"
                        onClick={() => {
                          setIsModalOpen(false);
                          SaveInvitationKey();
                          navigate('/signup');
                        }}
                      >
                        회원 가입
                      </button>
                      <button
                        className="btn btn-white btn-large btn-box-shadow btn-round-edge submit me-1"
                        onClick={() => {
                          setIsModalOpen(false);
                          SaveInvitationKey();
                          navigate('/signin');
                        }}
                      >
                        로그인
                      </button>
                      <button
                        className="btn btn-white btn-large btn-box-shadow btn-round-edge submit me-1"
                        onClick={() => {
                          setIsModalOpen(false);
                        }}
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

export default InvitationPage;
