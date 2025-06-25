import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import Modal from '@/components/common/Modal/Modal';
import { postInicisPaymentResult } from '@/api/payment/paymentApi';
import { isValidPassword } from '@/utils/validators';

const PaymentErrorPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/error?desc=${'결제가 실패 되었습니다.'}&pageUrl=${'/checkout'}`);
  }, []);

  return (
    <>
      <main>
        <section className="bg-base-white-color">
          <div className="container">
            <div className="row row-cols-1 row-cols-lg-2 row-cols-md-1 g-0 justify-content-center overflow-hidden">
              <div
                className="col"
                data-anime='{ "translateY": [0, 0], "opacity": [0,1], "duration": 600, "delay":150, "staggervalue": 150, "easing": "easeOutQuad" }'
              >
                <div className="mt-20 py-5 text-center ">
                  <a className="navbar-brand"></a>
                  <h3 className="fw-600 text-dark-gray mb-10 ls-minus-1px">
                    결제하기
                  </h3>
                  <p className="m-0">결제 진행 중입니다.</p>
                  <p className="m-0">
                    결제가 완료될 떄까지 잠시만 기다렺 주세요.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="w-100 h-50 md-h-50 sm-h-100">
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

export default PaymentErrorPage;
