import React, { useEffect } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const preventScroll = (e) => {
      e.preventDefault();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';

      // 스크롤 방지 이벤트 추가 (휠 & 터치)
      window.addEventListener('wheel', preventScroll, { passive: false });
      window.addEventListener('touchmove', preventScroll, { passive: false });
      window.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.body.style.overflow = 'auto';

      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
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
