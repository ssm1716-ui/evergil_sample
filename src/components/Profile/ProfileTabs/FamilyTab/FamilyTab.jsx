import React, { useState, useRef } from 'react';
import FamilyCard from './FamilyCard';
import FamilyEditCard from './FamilyEditCard';

/**
 * FamilyTab - 가족관계도 탭 (네이티브 드래그 + 터치 지원)
 */
const FamilyTab = ({
  family = [],
  pageMode = 'view',
  isLoadingFamilyData = false,
  editingFamilyId = null,
  isAddingNewFamily = false,
  uploadingFamilyImages = {},
  onDragEnd,
  onAddItem,
  onNameChange,
  onSelectChange,
  onCustomInputChange,
  onImageUpload,
  onEditFamily,
  onDeleteFamily,
  onSaveFamily,
  onCancelAddFamily,
  getRelationshipBadgeStyle
}) => {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const touchDragElement = useRef(null);
  const touchStartY = useRef(0);
  const containerRef = useRef(null);

  // ===== 마우스 드래그 (PC) =====
  const handleDragStart = (index) => (e) => {
    e.stopPropagation();
    setDraggedIndex(index);
    
    const dragImage = document.createElement('div');
    dragImage.style.cssText = `
      position: absolute;
      top: -9999px;
      padding: 12px 20px;
      background: linear-gradient(135deg, #8FC5B7, #7ab4a5);
      color: white;
      border-radius: 8px;
      font-weight: 600;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    `;
    dragImage.textContent = family[index].displayName;
    document.body.appendChild(dragImage);
    e.dataTransfer.setDragImage(dragImage, 0, 0);
    setTimeout(() => document.body.removeChild(dragImage), 0);
  };

  const handleDragOver = (index) => (e) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (dropIndex) => (e) => {
    e.preventDefault();
    
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const result = {
      source: { index: draggedIndex },
      destination: { index: dropIndex }
    };
    
    onDragEnd(result);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEndMouse = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // ===== 터치 드래그 (모바일/태블릿) =====
  const handleTouchStart = (index) => (e) => {
    setDraggedIndex(index);
    touchStartY.current = e.touches[0].clientY;
    
    // 터치 드래그 요소 생성
    const touch = e.touches[0];
    const dragEl = document.createElement('div');
    dragEl.className = 'touch-drag-indicator';
    dragEl.style.cssText = `
      position: fixed;
      left: ${touch.clientX - 50}px;
      top: ${touch.clientY - 25}px;
      padding: 12px 20px;
      background: linear-gradient(135deg, #8FC5B7, #7ab4a5);
      color: white;
      border-radius: 8px;
      font-weight: 600;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      z-index: 9999;
      pointer-events: none;
      opacity: 0.9;
    `;
    dragEl.textContent = family[index].displayName;
    document.body.appendChild(dragEl);
    touchDragElement.current = dragEl;
  };

  const handleTouchMove = (e) => {
    if (draggedIndex === null || !touchDragElement.current) return;
    
    const touch = e.touches[0];
    touchDragElement.current.style.left = `${touch.clientX - 50}px`;
    touchDragElement.current.style.top = `${touch.clientY - 25}px`;
    
    // 터치 위치에 있는 요소 찾기
    const elementAtPoint = document.elementFromPoint(touch.clientX, touch.clientY);
    if (elementAtPoint) {
      const cardWrapper = elementAtPoint.closest('.family-card-wrapper');
      if (cardWrapper && containerRef.current) {
        const allWrappers = Array.from(containerRef.current.querySelectorAll('.family-card-wrapper'));
        const hoveredIndex = allWrappers.indexOf(cardWrapper);
        if (hoveredIndex !== -1 && hoveredIndex !== draggedIndex) {
          setDragOverIndex(hoveredIndex);
        }
      }
    }
  };

  const handleTouchEnd = (e) => {
    if (draggedIndex === null) return;
    
    // 터치 드래그 요소 제거
    if (touchDragElement.current) {
      document.body.removeChild(touchDragElement.current);
      touchDragElement.current = null;
    }
    
    // 드롭 처리
    if (dragOverIndex !== null && draggedIndex !== dragOverIndex) {
      const result = {
        source: { index: draggedIndex },
        destination: { index: dragOverIndex }
      };
      onDragEnd(result);
    }
    
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // 로딩 중
  if (isLoadingFamilyData) {
    return (
      <div className="w-100 text-center py-5">
        <div className="spinner"></div>
        <p className="mt-3">가족관계도를 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="w-100 my-5">
      {/* Header */}
      <div className="text-center py-4 border-bottom mb-4">
        <div className="d-flex align-items-center justify-content-center mb-2">
          <i className="feather icon-feather-users me-2" style={{ fontSize: '24px' }}></i>
          <h2 className="mb-0 fw-semibold" style={{ fontSize: '24px' }}>가족관계도</h2>
        </div>
        <p className="text-muted mb-3">소중한 가족들을 추가하고 관리해보세요</p>
        
        {/* 편집 모드에서만 추가 버튼 표시 */}
        {pageMode === 'edit' && !isAddingNewFamily && (
          <button
            className="btn d-inline-flex align-items-center text-white"
            onClick={onAddItem}
            style={{ 
              whiteSpace: 'nowrap',
              backgroundColor: '#8FC5B7',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 20px'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#7ab4a5'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#8FC5B7'}
          >
            <i className="feather icon-feather-plus me-2"></i>
            가족 추가하기
          </button>
        )}
      </div>

      {/* 가족관계도 그리드 */}
      {family.length > 0 ? (
        <div 
          ref={containerRef}
          className="family-grid-container"
          style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem',
            position: 'relative'
          }}
        >
          {family.map((member, index) => (
            <div
              key={member.id || `family-${index}`}
              onDragOver={handleDragOver(index)}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop(index)}
              className={`family-card-wrapper ${
                draggedIndex === index ? 'dragging' : ''
              } ${dragOverIndex === index ? 'drag-over' : ''}`}
              style={{
                opacity: draggedIndex === index ? 0.4 : 1,
                transition: 'opacity 0.2s ease, transform 0.2s ease',
              }}
            >
              {editingFamilyId === index ? (
                /* 편집/추가 모드 */
                <FamilyEditCard
                  member={member}
                  index={index}
                  isAddingNewFamily={isAddingNewFamily && index === 0}
                  uploadingFamilyImages={uploadingFamilyImages}
                  onNameChange={onNameChange}
                  onSelectChange={onSelectChange}
                  onCustomInputChange={onCustomInputChange}
                  onImageUpload={onImageUpload}
                  onCancel={onCancelAddFamily}
                  onSave={onSaveFamily}
                />
              ) : (
                /* 보기 모드 */
                <FamilyCard
                  member={member}
                  index={index}
                  pageMode={pageMode}
                  isDragging={draggedIndex === index}
                  onEdit={onEditFamily}
                  onDelete={onDeleteFamily}
                  onDragStart={handleDragStart(index)}
                  onDragEnd={handleDragEndMouse}
                  onTouchStart={handleTouchStart(index)}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  getRelationshipBadgeStyle={getRelationshipBadgeStyle}
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        /* 가족관계도가 없을 때 */
        <div className="text-center py-5">
          <div 
            className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
            style={{ 
              width: '120px', 
              height: '120px',
              border: '4px solid #212529'
            }}
          >
            <i className="feather icon-feather-users" style={{ fontSize: '60px' }}></i>
          </div>
          <h3 className="fw-bold mb-2">No Family Tree Yet</h3>
          {pageMode === 'edit' && (
            <p className="text-muted">가족 구성원을 추가해보세요.</p>
          )}
        </div>
      )}

      {/* 통계 (가족이 있을 때만 표시) */}
      {family.length > 0 && (
        <div className="mt-5 pt-4 border-top">
          <div className="row row-cols-2 row-cols-md-4 g-3 text-center">
            <div className="col">
              <div className="p-4 rounded" style={{ backgroundColor: 'rgba(13, 110, 253, 0.1)' }}>
                <div className="fw-bold text-primary" style={{ fontSize: '32px' }}>
                  {family.length}
                </div>
                <div className="small text-primary">총 가족 수</div>
              </div>
            </div>
            <div className="col">
              <div className="p-4 rounded" style={{ backgroundColor: 'rgba(111, 66, 193, 0.1)' }}>
                <div className="fw-bold" style={{ color: '#6f42c1', fontSize: '32px' }}>
                  3
                </div>
                <div className="small" style={{ color: '#6f42c1' }}>세대</div>
              </div>
            </div>
            <div className="col">
              <div className="p-4 rounded" style={{ backgroundColor: 'rgba(25, 135, 84, 0.1)' }}>
                <div className="fw-bold text-success" style={{ fontSize: '32px' }}>
                  {family.filter(m => m.familyTitle && (m.familyTitle.includes('딸') || m.familyTitle.includes('아들'))).length}
                </div>
                <div className="small text-success">자녀</div>
              </div>
            </div>
            <div className="col">
              <div className="p-4 rounded" style={{ backgroundColor: 'rgba(220, 53, 69, 0.1)' }}>
                <div className="fw-bold text-danger" style={{ fontSize: '32px' }}>∞</div>
                <div className="small text-danger">사랑</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FamilyTab;