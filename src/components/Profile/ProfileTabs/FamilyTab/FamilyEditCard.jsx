import React from 'react';

const FamilyEditCard = ({
  member,
  index,
  isAddingNewFamily,
  uploadingFamilyImages,
  onNameChange,
  onSelectChange,
  onCustomInputChange,
  onImageUpload,
  onCancel,
  onSave
}) => {
  const familyOptions = [
    '할아버지', '할머니', '아버지', '어머니', '형', '누나', '언니', '오빠', 
    '남편', '아내', '아들', '딸', '첫째아들', '둘째아들', '셋째아들',
    '첫째딸', '둘째딸', '셋째딸', '막내아들', '막내딸', '손자', '손녀',
    '외할아버지', '외할머니', '삼촌', '고모', '이모', '외삼촌', '직접 입력'
  ];

  return (
    <div 
      className="card border-0 shadow-sm h-100"
      style={{
        background: 'linear-gradient(to bottom right, #ffffff, #f8f9fa)',
        transition: 'all 0.3s ease',
        minHeight: 'fit-content'
      }}
    >
      <div className="card-body p-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div className="d-flex align-items-center">
            <i className="feather icon-feather-edit text-primary me-2" style={{ fontSize: '18px' }}></i>
            <h6 className="mb-0 text-primary fw-medium" style={{ fontSize: '15px', whiteSpace: 'nowrap' }}>
              {isAddingNewFamily && index === 0 ? '새 가족 추가' : '편집 중'}
            </h6>
          </div>
        </div>
        
        {/* 프로필 이미지 */}
        <div className="d-flex flex-column align-items-center mb-3">
          <div 
            className="rounded-circle overflow-hidden mb-2 position-relative"
            style={{ 
              width: '100px', 
              height: '100px',
              border: '3px solid #e9ecef',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              backgroundColor: '#f8f9fa'
            }}
          >
            {uploadingFamilyImages[index] ? (
              <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                <div className="spinner-border spinner-border-sm text-primary" role="status">
                  <span className="visually-hidden">업로드 중...</span>
                </div>
              </div>
            ) : member.profileImage ? (
              <img
                src={member.profileImage}
                alt={member.displayName || '프로필'}
                className="w-100 h-100"
                style={{ objectFit: 'cover' }}
              />
            ) : (
              <div 
                className="w-100 h-100 d-flex align-items-center justify-content-center"
                style={{ 
                  background: 'linear-gradient(135deg, #6c757d, #495057)' 
                }}
              >
                <i className="feather icon-feather-camera text-white" style={{ fontSize: '28px' }}></i>
              </div>
            )}
          </div>
          
          <input
            type="file"
            id={`family-file-${index}`}
            accept="image/*"
            className="d-none"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                onImageUpload(file, index);
              }
            }}
          />
          <label 
            htmlFor={`family-file-${index}`}
            className="btn btn-sm btn-outline-secondary d-flex align-items-center justify-content-center w-100"
            style={{ 
              fontSize: '13px', 
              cursor: uploadingFamilyImages[index] ? 'not-allowed' : 'pointer',
              pointerEvents: uploadingFamilyImages[index] ? 'none' : 'auto',
              borderRadius: '8px'
            }}
          >
            <i className="feather icon-feather-camera me-1" style={{ fontSize: '13px' }}></i>
            사진 선택
          </label>
        </div>

        {/* 이름 입력 */}
        <div className="mb-2">
          <label className="form-label small fw-semibold mb-1" style={{ fontSize: '13px' }}>이름</label>
          <input
            type="text"
            value={member.displayName}
            onChange={(e) => onNameChange(index, e.target.value)}
            className="form-control form-control-sm"
            placeholder="이름 입력"
            style={{ fontSize: '14px', borderRadius: '8px' }}
          />
        </div>

        {/* 관계 선택 */}
        {!member.isCustomInput ? (
          <div className="mb-3">
            <label className="form-label small fw-semibold mb-1" style={{ fontSize: '13px' }}>관계</label>
            <select
              value={member.familyTitle}
              onChange={(e) => onSelectChange(index, e.target.value)}
              className="form-select form-select-sm"
              style={{ fontSize: '14px', borderRadius: '8px' }}
            >
              <option value="">관계 선택</option>
              {familyOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="mb-3">
            <label className="form-label small fw-semibold mb-1" style={{ fontSize: '13px' }}>관계 (직접 입력)</label>
            <input
              type="text"
              value={member.familyTitle === '직접 입력' ? '' : member.familyTitle}
              onChange={(e) => onCustomInputChange(index, e.target.value)}
              className="form-control form-control-sm mb-2"
              placeholder="관계 입력"
              style={{ fontSize: '14px', borderRadius: '8px' }}
            />
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary w-100 d-flex align-items-center justify-content-center"
              onClick={() => onSelectChange(index, '')}
              style={{ fontSize: '12px', padding: '4px 8px', borderRadius: '8px' }}
            >
              <i className="feather icon-feather-x me-1" style={{ fontSize: '11px' }}></i>
              기본 선택
            </button>
          </div>
        )}

        {/* 저장/취소 버튼 */}
        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary flex-fill d-flex align-items-center justify-content-center"
            onClick={onCancel}
            style={{ fontSize: '14px', padding: '8px 12px', borderRadius: '8px' }}
          >
            <i className="feather icon-feather-x me-1" style={{ fontSize: '13px' }}></i>
            취소
          </button>
          <button
            type="button"
            className="btn btn-sm flex-fill text-white"
            onClick={() => onSave(index)}
            disabled={!member.displayName.trim() || !member.familyTitle}
            style={{ 
              fontSize: '14px', 
              padding: '8px 12px',
              backgroundColor: !member.displayName.trim() || !member.familyTitle ? '#6c757d' : '#8FC5B7',
              border: 'none',
              borderRadius: '8px',
              opacity: !member.displayName.trim() || !member.familyTitle ? 0.6 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              if (member.displayName.trim() && member.familyTitle) {
                e.currentTarget.style.backgroundColor = '#7ab4a5';
              }
            }}
            onMouseLeave={(e) => {
              if (member.displayName.trim() && member.familyTitle) {
                e.currentTarget.style.backgroundColor = '#8FC5B7';
              }
            }}
          >
            <i className="feather icon-feather-check me-1" style={{ fontSize: '13px' }}></i>
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default FamilyEditCard;