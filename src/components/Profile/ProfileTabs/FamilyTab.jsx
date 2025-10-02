import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import Button from '@/components/common/Button/Button';

const FamilyTab = ({ 
  family = [],
  pageMode = 'view',
  isLoadingFamilyData = false,
  familyDataLoaded = false,
  onDragEnd,
  onAddItem,
  onSelectChange,
  onCustomInputChange,
  onNameChange,
  onDelete
}) => {
  // 가족 관계 옵션
  const familyOptions = [
    '아버지', '어머니', '남편', '아내', '아들', '딸',
    '형', '누나', '동생', '할아버지', '할머니', '삼촌',
    '고모', '이모', '외삼촌', '사촌', '직접 입력'
  ];

  if (isLoadingFamilyData) {
    return (
      <div className="w-100 text-center py-5">
        <div className="spinner"></div>
        <p className="mt-3">가족관계도를 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="w-100 sm-mt-10px xs-mb-8 my-5">
      {/* 편집 모드에서만 추가 버튼 표시 */}
      {pageMode === 'edit' && (
        <div className="row mb-4">
          <div className="col-12 text-end">
            <Button
              variant="primary"
              color="base-color"
              size="medium"
              className="border-radius-4px"
              onClick={onAddItem}
            >
              <i className="feather icon-feather-plus align-middle me-2"></i>
              가족 추가
            </Button>
          </div>
        </div>
      )}

      {/* 가족관계도 */}
      {family.length > 0 ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="family-list">
            {(provided) => (
              <div
                className="container"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {family.map((f, index) => (
                  <Draggable 
                    key={f.id || index} 
                    draggableId={String(f.id || index)} 
                    index={index}
                    isDragDisabled={pageMode !== 'edit'}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`row row-cols-12 row-cols-lg-12 row-cols-sm-2 mt-1 text-center ${
                          snapshot.isDragging ? 'dragging' : ''
                        }`}
                        style={{
                          ...provided.draggableProps.style,
                          backgroundColor: snapshot.isDragging ? '#f8f9fa' : 'transparent',
                        }}
                      >
                        {/* 드래그 핸들 (편집 모드에서만) */}
                        {pageMode === 'edit' && (
                          <div className="col-12 text-start mb-2">
                            <div {...provided.dragHandleProps} className="drag-handle">
                              <i className="feather icon-feather-move text-muted cursor-move"></i>
                            </div>
                          </div>
                        )}
                        
                        {/* 관계 */}
                        <div className="col-6 text-center process-step-style-02 hover-box last-paragraph-no-margin">
                          <div className="process-step-icon-box position-relative mt-30px md-mt-10px">
                            <span className="progress-step-separator bg-dark-gray opacity-1 w-30 separator-line-1px"></span>
                            <div className="process-step-icon d-flex justify-content-start align-items-center ms-auto h-80px w-40 md-w-50 sm-w-100 fs-18 rounded-circle text-dark-gray fw-500">
                              <div className="process-step-icon d-flex justify-content-center align-items-center bg-black h-80px w-80px md-h-40px md-w-40px fs-18 rounded-circle text-dark-gray box-shadow-double-large fw-500">
                                <span className="number position-relative z-index-1 fw-600">
                                  <i className="feather icon-feather-user align-middle icon-large text-white"></i>
                                </span>
                                <div className="box-overlay bg-black rounded-circle"></div>
                              </div>
                              
                              {pageMode === 'edit' ? (
                                <div className="ms-3">
                                  {f.isCustomInput ? (
                                    <input
                                      type="text"
                                      value={f.familyTitle}
                                      onChange={(e) => onCustomInputChange(index, e.target.value)}
                                      className="form-control form-control-sm"
                                      placeholder="관계 입력"
                                    />
                                  ) : (
                                    <select
                                      value={f.familyTitle}
                                      onChange={(e) => onSelectChange(index, e.target.value)}
                                      className="form-select form-select-sm"
                                    >
                                      <option value="">관계 선택</option>
                                      {familyOptions.map((option) => (
                                        <option key={option} value={option}>
                                          {option}
                                        </option>
                                      ))}
                                    </select>
                                  )}
                                </div>
                              ) : (
                                <span className="number position-relative z-index-1 fw-600 sm-w-100">
                                  {f.familyTitle}
                                </span>
                              )}
                              <div className="box-overlay rounded-circle"></div>
                            </div>
                          </div>
                        </div>
                        
                        {/* 이름 */}
                        <div className="col-6 text-center process-step-style-02 hover-box last-paragraph-no-margin">
                          <div className="process-step-icon-box position-relative mt-30px md-mt-10px">
                            <div className="process-step-icon d-flex justify-content-start align-items-center mx-auto h-80px w-60 md-w-60 sm-w-60 fs-18 rounded-circle text-dark-gray fw-500">
                              {pageMode === 'edit' ? (
                                <input
                                  type="text"
                                  value={f.displayName}
                                  onChange={(e) => onNameChange(index, e.target.value)}
                                  className="form-control form-control-sm"
                                  placeholder="이름 입력"
                                />
                              ) : (
                                <span className="number position-relative z-index-1 fw-600">
                                  {f.displayName}
                                </span>
                              )}
                              <div className="box-overlay rounded-circle"></div>
                            </div>
                          </div>
                        </div>
                        
                        {/* 삭제 버튼 (편집 모드에서만) */}
                        {pageMode === 'edit' && (
                          <div className="col-12 text-end mt-2">
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => onDelete(index)}
                            >
                              <i className="feather icon-feather-trash-2"></i>
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        /* 가족관계도가 없을 때 */
        <div className="col-12 text-center mt-100px pb-2">
          <i className="feather icon-feather-users align-middle icon-extra-large text-dark fs-50 md-fs-70 p-30px border border-4 border-dark border-radius-100px mb-1"></i>
          <p className="fs-30 fw-800 text-black">No Family Tree Yet</p>
          {pageMode === 'edit' && (
            <p className="text-muted">가족 구성원을 추가해보세요.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FamilyTab;