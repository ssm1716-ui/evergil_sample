import { useNavigate } from 'react-router-dom';

const LoginModal = ({ onClose }) => {
  const navigate = useNavigate();

  return (
    <div
      className="modal modal-overlay fade show d-flex align-items-center justify-content-center bg-dark bg-opacity-50 "
      style={{ display: 'block' }}
    >
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
                    <button
                      className="btn btn-white btn-large btn-box-shadow btn-round-edge submit me-1"
                      onClick={() => {
                        onClose();
                        navigate('/signup');
                      }}
                    >
                      회원 가입
                    </button>
                    <button
                      className="btn btn-white btn-large btn-box-shadow btn-round-edge submit me-1"
                      onClick={() => {
                        onClose();
                        navigate('/signin');
                      }}
                    >
                      로그인
                    </button>
                    <button
                      className="btn btn-white btn-large btn-box-shadow btn-round-edge submit me-1"
                      onClick={onClose}
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
    </div>
  );
};

export default LoginModal;
