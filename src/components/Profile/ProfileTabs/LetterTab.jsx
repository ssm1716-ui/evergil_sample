import React, { useState } from 'react';
import Button from '@/components/common/Button/Button';
import { formatDateRelace } from '@/utils/utils';

const LetterTab = ({ 
  letters = [],
  pageMode = 'view',
  onAdd,
  onEdit,
  onDelete,
  onSearch,
  isSearching = false
}) => {
  const [searchValue, setSearchValue] = useState('');

  // 검색 입력 핸들러
  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    
    if (onSearch) {
      onSearch(value);
    }
  };

  // 편집 버튼 클릭
  const handleEditClick = (letterId) => {
    if (onEdit) {
      onEdit(letterId);
    }
  };

  // 삭제 버튼 클릭
  const handleDeleteClick = (letterId) => {
    if (onDelete) {
      onDelete(letterId);
    }
  };

  // 작성 버튼 클릭
  const handleAddClick = () => {
    if (onAdd) {
      onAdd();
    }
  };

  return (
    <div className="w-100 sm-mt-10px xs-mb-8 my-5">
      {/* 검색창 */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="search-box position-relative">
            <input
              type="text"
              placeholder="하늘편지 검색..."
              value={searchValue}
              onChange={handleSearchInput}
              className="form-control border-radius-4px"
              style={{ paddingRight: '40px' }}
            />
            <i className="feather icon-feather-search position-absolute right-15px top-50 translate-middle-y text-medium-gray"></i>
            {isSearching && (
              <div className="position-absolute right-50px top-50 translate-middle-y">
                <div className="spinner-small"></div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 작성 버튼 (편집 모드 또는 뷰어 권한에서 표시) */}
      {(pageMode === 'edit' || pageMode === 'view') && (
        <div className="row mb-4">
          <div className="col-12 text-end">
            <Button
              variant="primary"
              color="base-color"
              size="medium"
              className="border-radius-4px"
              onClick={handleAddClick}
            >
              <i className="feather icon-feather-plus align-middle me-2"></i>
              하늘편지 작성
            </Button>
          </div>
        </div>
      )}

      {/* 하늘편지 목록 */}
      <div className="row">
        {letters.length > 0 ? (
          letters.map((letter) => (
            <div key={letter.id} className="col-12 mb-4">
              <div className="card border-radius-4px box-shadow-medium h-100">
                <div className="card-body p-4">
                  {/* 헤더 */}
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h6 className="card-title mb-1 fw-600">
                        {letter.displayName}
                      </h6>
                      <small className="text-muted">
                        {formatDateRelace(letter.createdAt)}
                      </small>
                    </div>
                    
                    {/* 편집/삭제 버튼 (작성자 본인 또는 편집 권한이 있을 때) */}
                    {(pageMode === 'edit' || letter.canEdit) && (
                      <div className="btn-group">
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => handleEditClick(letter.id)}
                        >
                          <i className="feather icon-feather-edit-2"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDeleteClick(letter.id)}
                        >
                          <i className="feather icon-feather-trash-2"></i>
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {/* 내용 */}
                  <div className="card-text">
                    <div 
                      dangerouslySetInnerHTML={{ __html: letter.content }}
                      className="letter-content"
                      style={{
                        maxHeight: '200px',
                        overflow: 'hidden',
                        lineHeight: '1.6'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          /* 하늘편지가 없을 때 */
          <div className="col-12 text-center mt-100px pb-2">
            <i className="feather icon-feather-mail align-middle icon-extra-large text-dark fs-50 md-fs-70 p-30px border border-4 border-dark border-radius-100px mb-1"></i>
            <p className="fs-30 fw-800 text-black">No Letters Yet</p>
            {(pageMode === 'edit' || pageMode === 'view') && (
              <p className="text-muted">첫 번째 하늘편지를 작성해보세요.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LetterTab;