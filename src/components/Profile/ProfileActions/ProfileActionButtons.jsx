import React from 'react';
import Modal from '@/components/common/Modal/Modal';
import avatarImage from '@/assets/images/base-profile-image.png';

const ProfileImageModal = ({ 
  // 배경 이미지 모달
  isBackgroundModalOpen,
  onBackgroundModalClose,
  backgroundImageUrl,
  
  // 프로필 이미지 모달
  isProfileModalOpen,
  onProfileModalClose,
  profileImageUrl,
  
  // 편집 모드 관련
  pageMode,
  onBackgroundUpload,
  onBackgroundDelete,
  onProfileUpload,
  onProfileDelete
}) => {
  return (
    <>
      {/* 배경 이미지 모달 */}
      <Modal isOpen={isBackgroundModalOpen} onClose={onBackgroundModalClose}>
        <div style={{
          background: '#000',
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 99999,
          borderRadius: 0,
          padding: 0,
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',
            height: '56px',
            background: 'rgba(34, 34, 34, 0.92)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '0 32px',
            zIndex: 100000,
            boxSizing: 'border-box',
          }}>
            {pageMode === 'edit' && (
              <>
                <button
                  onClick={onBackgroundUpload}
                  style={{ 
                    background: 'none', 
                    color: '#fff', 
                    border: 'none', 
                    fontSize: '18px', 
                    cursor: 'pointer', 
                    marginRight: '24px', 
                    fontWeight: 500 
                  }}
                >
                  수정
                </button>
                <button
                  onClick={onBackgroundDelete}
                  style={{ 
                    background: 'none', 
                    color: '#fff', 
                    border: 'none', 
                    fontSize: '18px', 
                    cursor: 'pointer', 
                    marginRight: '24px', 
                    fontWeight: 500 
                  }}
                >
                  삭제
                </button>
              </>
            )}
            <button
              onClick={onBackgroundModalClose}
              style={{ 
                background: 'none', 
                color: '#fff', 
                border: 'none', 
                fontSize: '28px', 
                cursor: 'pointer', 
                fontWeight: 700, 
                lineHeight: 1 
              }}
            >
              ×
            </button>
          </div>
          <img
            src={backgroundImageUrl}
            alt="배경 전체 이미지"
            style={{ 
              maxWidth: '100vw', 
              maxHeight: '100vh', 
              objectFit: 'contain', 
              borderRadius: 0, 
              background: '#000' 
            }}
          />
        </div>
      </Modal>

      {/* 프로필 이미지 모달 */}
      <Modal isOpen={isProfileModalOpen} onClose={onProfileModalClose}>
        <div style={{
          background: '#000',
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 99999,
          borderRadius: 0,
          padding: 0,
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',
            height: '56px',
            background: 'rgba(34, 34, 34, 0.92)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '0 32px',
            zIndex: 100000,
            boxSizing: 'border-box',
          }}>
            {pageMode === 'edit' && (
              <>
                <button
                  onClick={onProfileUpload}
                  style={{ 
                    background: 'none', 
                    color: '#fff', 
                    border: 'none', 
                    fontSize: '18px', 
                    cursor: 'pointer', 
                    marginRight: '24px', 
                    fontWeight: 500 
                  }}
                >
                  수정
                </button>
                <button
                  onClick={onProfileDelete}
                  style={{ 
                    background: 'none', 
                    color: '#fff', 
                    border: 'none', 
                    fontSize: '18px', 
                    cursor: 'pointer', 
                    marginRight: '24px', 
                    fontWeight: 500 
                  }}
                >
                  삭제
                </button>
              </>
            )}
            <button
              onClick={onProfileModalClose}
              style={{ 
                background: 'none', 
                color: '#fff', 
                border: 'none', 
                fontSize: '28px', 
                cursor: 'pointer', 
                fontWeight: 700, 
                lineHeight: 1 
              }}
            >
              ×
            </button>
          </div>
          <img
            src={profileImageUrl || avatarImage}
            alt="프로필 전체 이미지"
            style={{ 
              maxWidth: '100vw', 
              maxHeight: '100vh', 
              objectFit: 'contain', 
              borderRadius: 0, 
              background: '#000' 
            }}
          />
        </div>
      </Modal>
    </>
  );
};

export default ProfileImageModal;