import React from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../common/Modal/Modal';
import Button from '../../common/Button/Button';

const PrivateProfileModals = ({
  isLoginModalOpen,
  setIsLoginModalOpen,
  isRequestModalOpen,
  setIsRequestModalOpen,
  isRequestCompletedModalOpen,
  setIsRequestCompletedModalOpen,
  currentPermission,
  formRequestPrivateProfile,
  handleFormRequestPrivateProfileChange,
  handleRequestPrivateProfile,
  handleLoginModalOpen,
}) => {
  const navigate = useNavigate();

  return (
    <>
      {/* 1. 로그인 필요 모달 */}
      <Modal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      >
        <div className="w-100">
          <div className="modal-content p-0 rounded shadow-lg">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="p-5 sm-p-7 bg-white">
                  <div className="row justify-content-center">
                    <div className="col-md-9 text-center">
                      <h6 className="text-dark-gray fw-500 mb-15px">
                        비공개 계정입니다.
                      </h6>
                      <p>로그인 후 프로필 초대 요청이 필요합니다.</p>
                    </div>
                    <div className="col-lg-12 text-center text-lg-center pt-3">
                      <Button
                        radiusOn="radius-on"
                        className="btn btn-base-color btn-large btn-box-shadow btn-round-edge me-1 w-50"
                        onClick={handleLoginModalOpen}
                      >
                        로그인
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* 2. 접근 요청 모달 */}
      <Modal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
      >
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="p-7 lg-p-5 sm-p-7 bg-gradient-very-light-gray">
              <div className="row justify-content-center mb-30px sm-mb-10px">
                <div className="col-md-9 text-center">
                  <h6 className="text-dark-gray fw-500 mb-15px">
                    비공개 계정 요청하기
                  </h6>
                  <button
                    type="button"
                    className="btn-close position-absolute top-10px right-10px"
                    onClick={() => setIsRequestModalOpen(false)}
                  ></button>
                </div>
              </div>
              {currentPermission === 'PERMISSION_DENIED_BUT_REQUESTED' ? (
                <div className="row">
                  <div className="col-12 text-center">
                    <p className="text-dark-gray fw-500 mb-10px">
                      이미 요청된 프로필입니다.
                    </p>
                    <p className="text-dark-gray fw-500 mb-10px">
                      초대 승인을 기다려주세요
                    </p>
                    <p className="text-dark-gray fw-500 mb-30px">
                      감사합니다.
                    </p>
                    <Button
                      radiusOn="radius-on"
                      className="btn btn-white btn-medium btn-box-shadow btn-round-edge me-1 w-100"
                      onClick={() => navigate('/profile')}
                    >
                      나의 프로필 리스트
                    </Button>
                  </div>
                </div>
              ) : (
                <form className="row" onSubmit={(e) => e.preventDefault()}>
                  <div className="col-12 mb-20px ">
                    <label className="fw-bold">이름</label>
                    <input
                      className="border-radius-15px input-large mb-5px"
                      type="text"
                      name="name"
                      placeholder="이름을 입력해 주세요."
                      value={formRequestPrivateProfile.name}
                      onChange={handleFormRequestPrivateProfileChange}
                      required
                    />
                  </div>
                  <div className="col-12 mb-20px ">
                    <label className="fw-bold">메모</label>
                    <textarea
                      className="border-radius-15px form-control"
                      cols="40"
                      rows="4"
                      name="memo"
                      value={formRequestPrivateProfile.memo}
                      onChange={handleFormRequestPrivateProfileChange}
                      placeholder="비공개 계정 방문을 위해 본인을 알릴 수 있는 메모를 입력해 주세요."
                    ></textarea>
                  </div>
                  <div className="col-12 text-center text-lg-center">
                    <Button
                      radiusOn="radius-on"
                      className="btn btn-base-color btn-medium btn-box-shadow btn-round-edge me-1 w-100 mb-3"
                      onClick={handleRequestPrivateProfile}
                    >
                      보내기
                    </Button>
                    <Button
                      radiusOn="radius-on"
                      className="btn btn-white btn-medium btn-box-shadow btn-round-edge me-1 w-100"
                      onClick={() => navigate('/profile')}
                    >
                      나의 프로필 리스트
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </Modal>

      {/* 3. 요청 완료 모달 */}
      <Modal
        isOpen={isRequestCompletedModalOpen}
        onClose={() => setIsRequestCompletedModalOpen(false)}
      >
        <div className="w-100">
          <div className="modal-content p-0 rounded shadow-lg">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="p-5 sm-p-7 bg-white">
                  <div className="row justify-content-center">
                    <div className="col-md-9 text-center">
                      <h6 className="text-dark-gray fw-500 mb-15px">
                        요청이 완료되었습니다.
                      </h6>
                      <p className="m-0">초대 승인을 기다려주세요.</p>
                      <p className="p-0">감사합니다.</p>
                    </div>
                    <div className="col-lg-12 text-center text-lg-center pt-3">
                      <Button
                        radiusOn="radius-on"
                        className="btn btn-base-color btn-large btn-box-shadow btn-round-edge me-1 w-50"
                        onClick={() => navigate('/profile')}
                      >
                        내 프로필로
                      </Button>
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

export default PrivateProfileModals;