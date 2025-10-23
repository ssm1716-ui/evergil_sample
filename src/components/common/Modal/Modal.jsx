import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (!isOpen) return;

    // 현재 스크롤 위치 저장
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflowY = 'hidden';

    // 엔터키 이벤트 리스너 추가
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';

      // 스크롤 원위치로 복원
      window.scrollTo(0, scrollY);
      
      // 엔터키 이벤트 리스너 제거
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="modal-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#fff',
          borderRadius: '10px',
          maxHeight: '95vh',
          WebkitOverflowScrolling: 'touch',
          overflowX: 'hidden',
          overflowY: 'auto',
          width: '100%',
          maxWidth: '600px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;
