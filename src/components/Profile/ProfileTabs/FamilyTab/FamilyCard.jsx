import React, { useRef } from 'react';

const FamilyCard = ({ 
  member, 
  index, 
  pageMode, 
  isDragging = false,
  onEdit,
  onDelete,
  onDragStart,
  onDragEnd,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  getRelationshipBadgeStyle 
}) => {
  const touchStartPos = useRef({ x: 0, y: 0 });

  // 터치 시작
  const handleTouchStart = (e) => {
    if (onTouchStart) {
      const touch = e.touches[0];
      touchStartPos.current = { x: touch.clientX, y: touch.clientY };
      onTouchStart(e);
    }
  };

  // 터치 이동
  const handleTouchMove = (e) => {
    if (onTouchMove) {
      onTouchMove(e);
    }
  };

  // 터치 종료
  const handleTouchEnd = (e) => {
    if (onTouchEnd) {
      onTouchEnd(e);
    }
  };

  return (
    <div 
      className={`card border-0 h-100 shadow-sm family-card ${isDragging ? 'is-dragging' : ''}`}
      style={{
        background: 'linear-gradient(to bottom right, #ffffff, #f8f9fa)',
        transition: 'all 0.2s ease',
        minHeight: 'fit-content',
      }}
    >
      <div className="card-body p-4 d-flex flex-column align-items-center text-center position-relative">
        {/* 드래그 핸들 - 편집 모드에서만 */}
        {pageMode === 'edit' && (
          <div 
            draggable="true"
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="position-absolute top-0 start-0 m-2 drag-handle"
            style={{ 
              cursor: 'grab', 
              zIndex: 10,
              touchAction: 'none'
            }}
            onMouseDown={(e) => e.currentTarget.style.cursor = 'grabbing'}
            onMouseUp={(e) => e.currentTarget.style.cursor = 'grab'}
          >
            <div 
              className="d-flex align-items-center justify-content-center drag-handle-icon"
              style={{
                width: '36px',
                height: '36px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                transition: 'all 0.2s ease',
                border: '2px solid #e9ecef'
              }}
            >
              <i 
                className="feather icon-feather-move" 
                style={{ 
                  color: '#6c757d',
                  fontSize: '18px',
                  pointerEvents: 'none'
                }}
              ></i>
            </div>
          </div>
        )}
        
        {/* 액션 버튼 - 편집 모드에서만 */}
        {pageMode === 'edit' && (
          <div className="position-absolute top-0 end-0 m-2" style={{ zIndex: 10 }}>
            <div className="dropdown">
              <button
                className="btn btn-sm btn-light p-0 d-flex align-items-center justify-content-center"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ width: '32px', height: '32px', borderRadius: '8px' }}
              >
                <i className="feather icon-feather-more-vertical"></i>
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <button 
                    className="dropdown-item d-flex align-items-center" 
                    onClick={() => onEdit(index)}
                  >
                    <i className="feather icon-feather-edit me-2"></i>
                    수정하기
                  </button>
                </li>
                <li>
                  <button 
                    className="dropdown-item text-danger d-flex align-items-center" 
                    onClick={() => {
                      if (confirm('정말로 이 가족 구성원을 삭제하시겠습니까?')) {
                        onDelete(index);
                      }
                    }}
                  >
                    <i className="feather icon-feather-trash-2 me-2"></i>
                    삭제하기
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* 프로필 이미지 */}
        <div className="position-relative mb-3">
          <div 
            className="rounded-circle overflow-hidden"
            style={{ 
              width: '100px', 
              height: '100px',
              border: '3px solid white',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              backgroundColor: '#e9ecef',
              transition: 'all 0.2s ease'
            }}
          >
            {member.profileImage ? (
              <img
                src={member.profileImage}
                alt={member.displayName}
                className="w-100 h-100"
                style={{ objectFit: 'cover' }}
                draggable="false"
              />
            ) : (
              <div 
                className="w-100 h-100 d-flex align-items-center justify-content-center text-white fw-semibold"
                style={{ 
                  background: 'linear-gradient(135deg, #6c757d, #495057)',
                  fontSize: '36px'
                }}
              >
                {member.displayName.charAt(0)}
              </div>
            )}
          </div>
          
          {/* Love indicator */}
          <div 
            className="position-absolute d-flex align-items-center justify-content-center"
            style={{
              width: '28px',
              height: '28px',
              bottom: '-4px',
              right: '-4px',
              backgroundColor: '#dc3545',
              borderRadius: '50%',
              border: '3px solid white'
            }}
          >
            <i className="feather icon-feather-heart text-white" style={{ fontSize: '13px' }}></i>
          </div>
        </div>

        {/* 이름 */}
        <h6 className="fw-semibold mb-2" style={{ fontSize: '17px' }}>
          {member.displayName}
        </h6>

        {/* 관계 배지 */}
        {member.familyTitle && (
          <span 
            className="badge rounded-pill px-3 py-1"
            style={{ 
              fontSize: '12px',
              ...getRelationshipBadgeStyle(member.familyTitle)
            }}
          >
            {member.familyTitle}
          </span>
        )}
      </div>
    </div>
  );
};

export default FamilyCard;