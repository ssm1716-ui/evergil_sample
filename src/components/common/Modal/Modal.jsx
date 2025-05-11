import React, { useEffect } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    let scrollY = 0;

    if (isOpen) {
      // 현재 스크롤 위치 저장
      scrollY = window.scrollY;

      // 스크롤 방지 + 고정 위치 유지
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
      document.body.style.overflowY = 'scroll';

      window.addEventListener('keydown', handleEsc);
    }

    return () => {
      // 기존 스크롤 위치로 복원
      const y = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';

      // 스크롤 복원
      // window.scrollTo(0, parseInt(y || '0') * -1);

      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal modal-overlay fade show d-flex align-items-center justify-content-center bg-dark bg-opacity-50"
      style={{ display: 'block' }}
    >
      {children}
    </div>
  );
};

export default Modal;
