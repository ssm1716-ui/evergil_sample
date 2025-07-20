import Modal from './Modal';

const SuccessModal = ({ isOpen, onClose, message = '전송되었습니다.' }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-100 h-50 md-h-50 sm-h-100">
        <div className="modal-content p-0 rounded shadow-lg">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="p-10 sm-p-7 bg-white">
                <div className="row justify-content-center">
                  <div className="col-md-9 text-center">
                    <h6 className="text-dark-gray fw-500 mb-15px fs-22 md-fs-18">
                      {message.split('\n').map((line, index) => (
                        <span key={index}>
                          {line}
                          {index < message.split('\n').length - 1 && <br />}
                        </span>
                      ))}
                    </h6>
                  </div>
                  <div className="col-lg-12 text-center text-lg-center pt-3">
                    <input type="hidden" name="redirect" value="" />
                    <button
                      className="btn btn-white btn-large btn-box-shadow btn-round-edge submit me-1"
                      onClick={onClose}
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
  );
};

export default SuccessModal; 