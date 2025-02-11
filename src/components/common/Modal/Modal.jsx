import React, { useEffect } from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal modal-overlay fade show d-flex align-items-center justify-content-center bg-dark bg-opacity-50 "
      style={{ display: 'block' }}
    >
      <div className="w-60 lg-w-80 sm-w-70">
        <div className="modal-content p-0 rounded shadow-lg">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
