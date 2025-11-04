import React from 'react';
import Confirm from '@/components/common/Modal/Confirm';

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

  // 공통
  isUploading = false,
}) => {
  return (
    <>
      {/* 프로필 이미지 삭제 확인 */}
      <Confirm
        isOpen={isProfileDeleteConfirmOpen}
        onClose={onProfileDeleteConfirmClose}
        onConfirm={onProfileDeleteConfirm}
        title="프로필 이미지 삭제"
        message="정말로 프로필 이미지를 삭제하시겠습니까?"
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
        message="정말로 배경 이미지를 삭제하시겠습니까?"
        confirmText="삭제"
        cancelText="취소"
        isLoading={isUploading}
      />

      {/* 갤러리 이미지 삭제 확인 */}
      <Confirm
        isOpen={isImageDeleteConfirmOpen}
        onClose={onImageDeleteConfirmClose}
        onConfirm={onImageDeleteConfirm}
        title="사진 삭제"
        message="정말로 사진을 삭제하시겠습니까?"
        confirmText="삭제"
        cancelText="취소"
        isLoading={isUploading}
      />
    </>
  );
};

export default ConfirmModals;