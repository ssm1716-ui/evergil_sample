import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@/components/common/Button/Button';
import Modal from '@/components/common/Modal/Modal';

const BridgePage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ 모바일 환경 체크 함수
  const isMobile = () => {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  };

  const handelIsMobile = () => {
    if (isMobile()) {
      navigate('/qr-scanner');
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <section className="big-section pt-3 md-mt-60px">
        <div className="container text-decoration-line-bottom position-relative">
          <span className="divider-text">Or</span>
          <div className="row row-cols-1 row-cols-lg-2 row-cols-md-1 justify-content-center overflow-hidden pb-100px md-pb-0">
            <div
              className="col"
              data-anime='{ "translateY": [0, 0], "opacity": [0,1], "duration": 600, "delay":150, "staggervalue": 150, "easing": "easeOutQuad" }'
            >
              <div className="mt-5 py-5 md-pt-0 text-center ">
                <h4 className="sm-fs-20 fw-600 text-dark-gray mb-5 ls-minus-1px">
                  에버링크가 아직 연결되지 않았습니다.
                </h4>
                <h6 className="sm-fs-14 fw-600 text-dark-gray mb-15 md-mb-5 ls-minus-1px">
                  QR코드를 스캔하여 추모페이지 계정을 생성하세요.
                </h6>
                <form>
                  <Button
                    type="submit"
                    size="extra-large"
                    radiusOn="radius-on"
                    className="btn btn-extra-large btn-round-edge btn-black btn-box-shadow submit w-40 md-w-70 text-transform-none me-10px md-mb-10px"
                    onClick={() => handelIsMobile()}
                  >
                    <i className="feather icon-feather-camera icon-small text-white pe-3"></i>
                    스캔하기
                  </Button>

                  <div className="form-results mt-20px d-none"></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-0">
        <div className="container">
          <div className="row row-cols-1 row-cols-lg-2 row-cols-md-1 g-0 justify-content-center overflow-hidden ">
            <div
              className="col"
              data-anime='{ "translateY": [0, 0], "opacity": [0,1], "duration": 600, "delay":150, "staggervalue": 150, "easing": "easeOutQuad" }'
            >
              <div className="py-5 text-center ">
                <h4 className="sm-fs-20 fw-600 text-dark-gray mb-5 ls-minus-1px">
                  아직 에버링크QR 구매 전이신가요?
                </h4>
                <h6 className="sm-fs-14 fw-600 text-dark-gray mb-15 md-mb-5 ls-minus-1px">
                  지금 구매하고 추모페이지 계정을 생성하세요.
                </h6>
                <form>
                  <Link to="/store">
                    <Button
                      type="submit"
                      size="extra-large"
                      radiusOn="radius-on"
                      className="btn btn-extra-large btn-round-edge btn-white btn-box-shadow submit w-40 md-w-70 text-transform-none"
                    >
                      <i className="feather icon-feather-shopping-cart icon-small text-black pe-3"></i>
                      구매하기
                    </Button>
                  </Link>

                  <div className="form-results mt-20px d-none"></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="w-40 md-w-70">
          <div className="modal-content p-0 rounded shadow-lg">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="p-10 sm-p-7 bg-white">
                  <div className="row justify-content-center">
                    <div className="col-md-9 text-center">
                      <h6 className="text-dark-gray fw-500 mb-15px md-fs-14">
                        모바일에서만 스캔이 가능합니다.
                      </h6>
                    </div>
                    <div className="col-lg-12 text-center text-lg-center pt-3">
                      <input type="hidden" name="redirect" value="" />
                      <button
                        className="btn btn-white btn-large btn-box-shadow border-1 border-default me-1"
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

export default BridgePage;
