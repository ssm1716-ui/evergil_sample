import React from 'react';
import Confirm from '@/components/common/Modal/Confirm';
import Modal from '@/components/common/Modal/Modal';
import Button from '@/components/common/Button/Button';

const ConfirmModals = ({ 
  // 프로필 이미지 삭제
  isProfileDeleteConfirmOpen,
  onProfileDeleteConfirmClose,
  onProfileDeleteConfirm,
  
  // 배경 이미지 삭제
  isBackgroundDeleteConfirmOpen,
  onBackgroundDeleteConfirmClose,
  onBackgroundDeleteConfirm,
  
  // 갤러리 이미지 삭제
  isImageDeleteConfirmOpen,
  onImageDeleteConfirmClose,
  onImageDeleteConfirm,
  
  // 로그인 요청 모달
  isLoginModalOpen,
  onLoginModalClose,
  onLoginConfirm,
  
  // 접근 권한 요청 모달
  isRequestModalOpen,
  onRequestModalClose,
  formRequestPrivateProfile,
  onFormRequestChange,
  onRequestPrivateProfile,
  
  // 요청 완료 모달
  isRequestCompletedModalOpen,
  onRequestCompletedModalClose,
  
  // 공통
  isUploading = false
}) => {
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    onFormRequestChange(name, value);
  };

  return (
    <>
      {/* 프로필 이미지 삭제 확인 */}
      <Confirm
        isOpen={isProfileDeleteConfirmOpen}
        onClose={onProfileDeleteConfirmClose}
        onConfirm={onProfileDeleteConfirm}
        title="프로필 이미지 삭제"
        message="프로필 이미지를 삭제하시겠습니까?"
        confirmText="삭제"
        cancelText="취소"
        isLoading={isUploading}
      />

      {/* 배경 이미지 삭제 확인 */}
      <Confirm
        isOpen={isBackgroundDeleteConfirmOpen}
        onClose={onBackgroundDeleteConfirmClose}
        onConfirm={onBackgroundDeleteConfirm}
        title="배경 이미지 삭제"
        message="배경 이미지를 삭제하시겠습니까?"
        confirmText="삭제"
        cancelText="취소"
        isLoading={isUploading}
      />

      {/* 갤러리 이미지 삭제 확인 */}
      <Confirm
        isOpen={isImageDeleteConfirmOpen}
        onClose={onImageDeleteConfirmClose}
        onConfirm={onImageDeleteConfirm}
        title="이미지 삭제"
        message="이미지를 삭제하시겠습니까?"
        confirmText="삭제"
        cancelText="취소"
        isLoading={isUploading}
      />

      {/* 로그인 요청 모달 */}
      <Modal isOpen={isLoginModalOpen} onClose={onLoginModalClose}>
        <div className="text-center p-4">
          <i className="feather icon-feather-lock text-primary fs-40 mb-3"></i>
          <h4 className="mb-3">로그인이 필요합니다</h4>
          <p className="text-muted mb-4">
            이 기능을 사용하려면 로그인이 필요합니다.
          </p>
          
          <div className="d-flex justify-content-center gap-2">
            <Button
              variant="secondary"
              onClick={onLoginModalClose}
            >
              취소
            </Button>
            <Button
              variant="primary"
              color="base-color"
              onClick={onLoginConfirm}
            >
              로그인하기
            </Button>
          </div>
        </div>
      </Modal>

      {/* 접근 권한 요청 모달 */}
      <Modal isOpen={isRequestModalOpen} onClose={onRequestModalClose}>
        <div className="p-4">
          <h4 className="mb-3 text-center">접근 권한 요청</h4>
          <p className="text-muted mb-4 text-center">
            이 프로필은 비공개로 설정되어 있습니다.<br />
            접근 권한을 요청해주세요.
          </p>
          
          <div className="mb-3">
            <label className="form-label">이름</label>
            <input
              type="text"
              name="name"
              value={formRequestPrivateProfile.name}
              onChange={handleFormChange}
              className="form-control"
              placeholder="이름을 입력해주세요"
            />
          </div>
          
          <div className="mb-3">
            <label className="form-label">메모 (선택사항)</label>
            <textarea
              name="memo"
              value={formRequestPrivateProfile.memo}
              onChange={handleFormChange}
              className="form-control"
              rows="3"
              placeholder="간단한 메모를 남겨주세요"
            />
          </div>
          
          <div className="d-flex justify-content-end gap-2">
            <Button
              variant="secondary"
              onClick={onRequestModalClose}
            >
              취소
            </Button>
            <Button
              variant="primary"
              color="base-color"
              onClick={onRequestPrivateProfile}
              disabled={!formRequestPrivateProfile.name.trim()}
            >
              요청하기
            </Button>
          </div>
        </div>
      </Modal>

      {/* 요청 완료 모달 */}
      <Modal isOpen={isRequestCompletedModalOpen} onClose={onRequestCompletedModalClose}>
        <div className="text-center p-4">
          <i className="feather icon-feather-check-circle text-success fs-40 mb-3"></i>
          <h4 className="mb-3">요청이 완료되었습니다</h4>
          <p className="text-muted mb-4">
            프로필 소유자가 요청을 검토한 후<br />
            승인 여부를 알려드리겠습니다.
          </p>
          
          <Button
            variant="primary"
            color="base-color"
            onClick={onRequestCompletedModalClose}
          >
            확인
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ConfirmModals;