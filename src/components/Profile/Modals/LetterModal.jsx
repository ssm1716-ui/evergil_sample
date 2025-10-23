import React, { useState, useEffect } from 'react';
import { FaPenFancy, FaPaperPlane, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const MAX_CHAR_LIMIT = 500;

const LetterModal = ({
  isRegisterModalOpen,
  onRegisterModalClose,
  
  isEditModalOpen,
  onEditModalClose,
  
  isDeleteModalOpen,
  onDeleteModalClose,
  
  letter,
  onLetterChange,
  
  onSendLetter,
  onUpdateLetter,
  onConfirmDelete,
  onLetterInit,
}) => {
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isRegisterModalOpen && !isEditModalOpen) {
      setErrors({});
      setSubmitStatus('idle');
      setIsSubmitting(false);
    }
  }, [isRegisterModalOpen, isEditModalOpen]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!letter.displayName?.trim()) {
      newErrors.displayName = '이름을 입력해주세요';
    } else if (letter.displayName.trim().length < 2) {
      newErrors.displayName = '이름은 2글자 이상 입력해주세요';
    }
    
    if (!letter.content?.trim()) {
      newErrors.content = '편지 내용을 입력해주세요';
    } else if (letter.content.trim().length < 10) {
      newErrors.content = '편지 내용은 10글자 이상 입력해주세요';
    } else if (letter.content.length > MAX_CHAR_LIMIT) {
      newErrors.content = `편지 내용은 ${MAX_CHAR_LIMIT}자를 초과할 수 없습니다`;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // 글자수 제한 체크
    if (name === 'content' && value.length > MAX_CHAR_LIMIT) {
      return;
    }
    
    onLetterChange(e);
    
    // 입력시 해당 필드 에러 초기화
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e, isEdit = false) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (isEdit) {
        await onUpdateLetter();
      } else {
        await onSendLetter(e);
      }
      
      setSubmitStatus('success');
      
      setTimeout(() => {
        if (isEdit) {
          onEditModalClose();
        } else {
          onRegisterModalClose();
        }
        onLetterInit();
        setSubmitStatus('idle');
      }, 1500);
      
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = (closeFunc) => {
    if (!isSubmitting) {
      closeFunc();
      onLetterInit();
      setErrors({});
      setSubmitStatus('idle');
    }
  };

  // 모달이 열려있지 않으면 렌더링하지 않음
  if (!isRegisterModalOpen && !isEditModalOpen && !isDeleteModalOpen) {
    return null;
  }

  return (
    <>
      {/* ===================================
          작성 모달
          =================================== */}
      {isRegisterModalOpen && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ 
            zIndex: 9999,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)'
          }}
          onClick={() => handleClose(onRegisterModalClose)}
        >
          <div 
            className="bg-white rounded shadow-lg"
            style={{ 
              maxWidth: '600px',
              width: '90%',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">
              <div className="row justify-content-center mb-4">
                <div className="col-12">
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div 
                      className="d-flex align-items-center justify-content-center"
                      style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: '#dbeafe',
                        borderRadius: '50%'
                      }}
                    >
                      <FaPenFancy className="text-primary" style={{ fontSize: '18px' }} />
                    </div>
                    <h5 className="mb-0 fw-600">하늘편지 남기기</h5>
                  </div>
                  <p className="text-muted mb-0" style={{ fontSize: '14px' }}>
                    하늘에 전하고 싶은 마음을 편지로 남겨보세요.
                  </p>
                </div>
              </div>

              {submitStatus === 'success' ? (
                <div className="text-center py-5">
                  <div className="d-flex justify-content-center mb-3">
                    <div
                      style={{
                        width: '64px',
                        height: '64px',
                        backgroundColor: '#d1fae5',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <FaCheckCircle style={{ fontSize: '32px', color: '#10b981' }} />
                    </div>
                  </div>
                  <h6 className="fw-500 mb-2">편지가 하늘로 전송되었습니다</h6>
                  <p className="text-muted" style={{ fontSize: '14px' }}>소중한 마음이 하늘에 닿았습니다.</p>
                </div>
              ) : (
                <form onSubmit={(e) => handleSubmit(e, false)}>
                  {submitStatus === 'error' && (
                    <div 
                      className="d-flex align-items-center mb-3 p-3 rounded" 
                      style={{ backgroundColor: '#fee2e2', color: '#991b1b' }}
                      role="alert"
                    >
                      <FaExclamationCircle className="me-2" />
                      편지 전송 중 오류가 발생했습니다. 다시 시도해주세요.
                    </div>
                  )}

                  <div className="mb-3">
                    <label className="form-label fw-500" style={{ fontSize: '15px' }}>이름</label>
                    <input
                      type="text"
                      name="displayName"
                      className={`form-control ${errors.displayName ? 'is-invalid' : ''}`}
                      placeholder="작성자 이름을 입력해주세요"
                      value={letter.displayName || ''}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      style={{
                        padding: '10px 14px',
                        fontSize: '15px',
                        borderRadius: '8px',
                        border: errors.displayName ? '1px solid #ef4444' : '1px solid #d1d5db',
                        transition: 'all 0.2s'
                      }}
                      onFocus={(e) => {
                        if (!errors.displayName) {
                          e.target.style.borderColor = '#22c55e';
                          e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
                        }
                      }}
                      onBlur={(e) => {
                        if (!errors.displayName) {
                          e.target.style.borderColor = '#d1d5db';
                          e.target.style.boxShadow = 'none';
                        }
                      }}
                    />
                    {errors.displayName && (
                      <div className="mt-1" style={{ color: '#ef4444', fontSize: '13px' }}>
                        {errors.displayName}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-500" style={{ fontSize: '15px' }}>편지 내용</label>
                    <textarea
                      name="content"
                      className={`form-control ${errors.content ? 'is-invalid' : ''}`}
                      rows="6"
                      placeholder="하늘에 전하고 싶은 마음을 담아주세요..."
                      value={letter.content || ''}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      style={{ 
                        resize: 'none',
                        padding: '10px 14px',
                        fontSize: '15px',
                        borderRadius: '8px',
                        border: errors.content ? '1px solid #ef4444' : '1px solid #d1d5db',
                        lineHeight: '1.6',
                        transition: 'all 0.2s'
                      }}
                      onFocus={(e) => {
                        if (!errors.content) {
                          e.target.style.borderColor = '#22c55e';
                          e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
                        }
                      }}
                      onBlur={(e) => {
                        if (!errors.content) {
                          e.target.style.borderColor = '#d1d5db';
                          e.target.style.boxShadow = 'none';
                        }
                      }}
                    />
                    {errors.content && (
                      <div className="mt-1" style={{ color: '#ef4444', fontSize: '13px' }}>
                        {errors.content}
                      </div>
                    )}
                    <div className="text-end mt-1">
                      <small style={{ 
                        color: (letter.content?.length || 0) > MAX_CHAR_LIMIT ? '#ef4444' : '#6b7280',
                        fontSize: '13px'
                      }}>
                        {letter.content?.length || 0}/{MAX_CHAR_LIMIT}자
                      </small>
                    </div>
                  </div>

                  <div className="d-flex justify-content-end gap-2 pt-3">
                    <button
                      type="button"
                      className="btn"
                      onClick={() => handleClose(onRegisterModalClose)}
                      disabled={isSubmitting}
                      style={{
                        padding: '10px 24px',
                        borderRadius: '8px',
                        border: '1px solid #d1d5db',
                        backgroundColor: 'white',
                        color: '#374151',
                        fontSize: '15px',
                        fontWeight: '500',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        opacity: isSubmitting ? 0.6 : 1,
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        if (!isSubmitting) {
                          e.currentTarget.style.backgroundColor = '#f9fafb';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSubmitting) {
                          e.currentTarget.style.backgroundColor = 'white';
                        }
                      }}
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      className="btn d-flex align-items-center gap-2"
                      disabled={isSubmitting}
                      style={{
                        padding: '10px 24px',
                        borderRadius: '8px',
                        border: 'none',
                        backgroundColor: '#000',
                        color: 'white',
                        fontSize: '15px',
                        fontWeight: '500',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        opacity: isSubmitting ? 0.8 : 1,
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        if (!isSubmitting) {
                          e.currentTarget.style.backgroundColor = '#1f2937';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSubmitting) {
                          e.currentTarget.style.backgroundColor = '#000';
                        }
                      }}
                    >
                      {isSubmitting ? (
                        <div 
                          className="spinner-border spinner-border-sm" 
                          role="status"
                          style={{ width: '16px', height: '16px' }}
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      ) : (
                        <FaPaperPlane style={{ fontSize: '14px' }} />
                      )}
                      {isSubmitting ? '전송 중...' : '하늘로 전송'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ===================================
          수정 모달
          =================================== */}
      {isEditModalOpen && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ 
            zIndex: 9999,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)'
          }}
          onClick={() => handleClose(onEditModalClose)}
        >
          <div 
            className="bg-white rounded shadow-lg"
            style={{ 
              maxWidth: '600px',
              width: '90%',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">
              <div className="row justify-content-center mb-4">
                <div className="col-12">
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div 
                      className="d-flex align-items-center justify-content-center"
                      style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: '#dbeafe',
                        borderRadius: '50%'
                      }}
                    >
                      <FaPenFancy className="text-primary" style={{ fontSize: '18px' }} />
                    </div>
                    <h5 className="mb-0 fw-600">편지 수정</h5>
                  </div>
                  <p className="text-muted mb-0" style={{ fontSize: '14px' }}>
                    작성한 하늘편지를 수정할 수 있습니다.
                  </p>
                </div>
              </div>

              {submitStatus === 'success' ? (
                <div className="text-center py-5">
                  <div className="d-flex justify-content-center mb-3">
                    <div
                      style={{
                        width: '64px',
                        height: '64px',
                        backgroundColor: '#d1fae5',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <FaCheckCircle style={{ fontSize: '32px', color: '#10b981' }} />
                    </div>
                  </div>
                  <h6 className="fw-500 mb-2">편지가 수정되었습니다</h6>
                  <p className="text-muted" style={{ fontSize: '14px' }}>변경된 내용이 저장되었습니다.</p>
                </div>
              ) : (
                <form onSubmit={(e) => handleSubmit(e, true)}>
                  {submitStatus === 'error' && (
                    <div 
                      className="d-flex align-items-center mb-3 p-3 rounded" 
                      style={{ backgroundColor: '#fee2e2', color: '#991b1b' }}
                      role="alert"
                    >
                      <FaExclamationCircle className="me-2" />
                      편지 수정 중 오류가 발생했습니다. 다시 시도해주세요.
                    </div>
                  )}

                  <div className="mb-3">
                    <label className="form-label fw-500" style={{ fontSize: '15px' }}>이름</label>
                    <input
                      type="text"
                      name="displayName"
                      className={`form-control ${errors.displayName ? 'is-invalid' : ''}`}
                      placeholder="작성자 이름을 입력해주세요"
                      value={letter.displayName || ''}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      style={{
                        padding: '10px 14px',
                        fontSize: '15px',
                        borderRadius: '8px',
                        border: errors.displayName ? '1px solid #ef4444' : '1px solid #d1d5db',
                        transition: 'all 0.2s'
                      }}
                      onFocus={(e) => {
                        if (!errors.displayName) {
                          e.target.style.borderColor = '#22c55e';
                          e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
                        }
                      }}
                      onBlur={(e) => {
                        if (!errors.displayName) {
                          e.target.style.borderColor = '#d1d5db';
                          e.target.style.boxShadow = 'none';
                        }
                      }}
                    />
                    {errors.displayName && (
                      <div className="mt-1" style={{ color: '#ef4444', fontSize: '13px' }}>
                        {errors.displayName}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-500" style={{ fontSize: '15px' }}>편지 내용</label>
                    <textarea
                      name="content"
                      className={`form-control ${errors.content ? 'is-invalid' : ''}`}
                      rows="6"
                      placeholder="하늘에 전하고 싶은 마음을 담아주세요..."
                      value={letter.content || ''}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      style={{ 
                        resize: 'none',
                        padding: '10px 14px',
                        fontSize: '15px',
                        borderRadius: '8px',
                        border: errors.content ? '1px solid #ef4444' : '1px solid #d1d5db',
                        lineHeight: '1.6',
                        transition: 'all 0.2s'
                      }}
                      onFocus={(e) => {
                        if (!errors.content) {
                          e.target.style.borderColor = '#22c55e';
                          e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
                        }
                      }}
                      onBlur={(e) => {
                        if (!errors.content) {
                          e.target.style.borderColor = '#d1d5db';
                          e.target.style.boxShadow = 'none';
                        }
                      }}
                    />
                    {errors.content && (
                      <div className="mt-1" style={{ color: '#ef4444', fontSize: '13px' }}>
                        {errors.content}
                      </div>
                    )}
                    <div className="text-end mt-1">
                      <small style={{ 
                        color: (letter.content?.length || 0) > MAX_CHAR_LIMIT ? '#ef4444' : '#6b7280',
                        fontSize: '13px'
                      }}>
                        {letter.content?.length || 0}/{MAX_CHAR_LIMIT}자
                      </small>
                    </div>
                  </div>

                  <div className="d-flex justify-content-end gap-2 pt-3">
                    <button
                      type="button"
                      className="btn"
                      onClick={() => handleClose(onEditModalClose)}
                      disabled={isSubmitting}
                      style={{
                        padding: '10px 24px',
                        borderRadius: '8px',
                        border: '1px solid #d1d5db',
                        backgroundColor: 'white',
                        color: '#374151',
                        fontSize: '15px',
                        fontWeight: '500',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        opacity: isSubmitting ? 0.6 : 1,
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        if (!isSubmitting) {
                          e.currentTarget.style.backgroundColor = '#f9fafb';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSubmitting) {
                          e.currentTarget.style.backgroundColor = 'white';
                        }
                      }}
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      className="btn d-flex align-items-center gap-2"
                      disabled={isSubmitting}
                      style={{
                        padding: '10px 24px',
                        borderRadius: '8px',
                        border: 'none',
                        backgroundColor: '#000',
                        color: 'white',
                        fontSize: '15px',
                        fontWeight: '500',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        opacity: isSubmitting ? 0.8 : 1,
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        if (!isSubmitting) {
                          e.currentTarget.style.backgroundColor = '#1f2937';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSubmitting) {
                          e.currentTarget.style.backgroundColor = '#000';
                        }
                      }}
                    >
                      {isSubmitting ? (
                        <div 
                          className="spinner-border spinner-border-sm" 
                          role="status"
                          style={{ width: '16px', height: '16px' }}
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      ) : (
                        <FaCheckCircle style={{ fontSize: '14px' }} />
                      )}
                      {isSubmitting ? '저장 중...' : '저장하기'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ===================================
          삭제 확인 모달
          =================================== */}
      {isDeleteModalOpen && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ 
            zIndex: 9999,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)'
          }}
          onClick={onDeleteModalClose}
        >
          <div 
            className="bg-white rounded shadow-lg"
            style={{ 
              maxWidth: '450px',
              width: '90%'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">
              <div className="text-center">
                <div className="d-flex justify-content-center mb-3">
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      backgroundColor: '#fee2e2',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <FaExclamationCircle style={{ fontSize: '32px', color: '#ef4444' }} />
                  </div>
                </div>
                <h6 className="fw-600 mb-2">하늘편지를 삭제하시겠습니까?</h6>
                <p className="text-muted mb-4" style={{ fontSize: '14px' }}>
                  삭제된 편지는 복구할 수 없습니다.
                </p>
              </div>
              
              <div className="d-flex justify-content-center gap-2">
                <button
                  className="btn"
                  onClick={onDeleteModalClose}
                  style={{
                    padding: '10px 24px',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    backgroundColor: 'white',
                    color: '#374151',
                    fontSize: '15px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                  }}
                >
                  취소
                </button>
                <button
                  className="btn"
                  onClick={onConfirmDelete}
                  style={{
                    padding: '10px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#ef4444',
                    color: 'white',
                    fontSize: '15px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#dc2626';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#ef4444';
                  }}
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LetterModal;