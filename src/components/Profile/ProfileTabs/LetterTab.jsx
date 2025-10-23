import React, { useState } from 'react';
import Button from '@/components/common/Button/Button';
import { MdSearch, MdMoreVert, MdEdit, MdDelete, MdExpandMore, MdExpandLess, MdKeyboardArrowDown } from 'react-icons/md';
import { BsPencilSquare } from 'react-icons/bs';

const LetterTab = ({
  letters = [],
  pageMode = 'view',
  isAuthenticated = false,
  isSearching = false,
  onSearchInput,
  onRegisterClick,
  onModifyLetterConfirm,
  onRemoveLetterConfirm,
  // currentUserId prop 제거 - hasModifyPermission, hasDeletePermission 사용
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchFilter, setSearchFilter] = useState('전체');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [expandedLetters, setExpandedLetters] = useState(new Set());
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const canWrite = pageMode === 'edit' || isAuthenticated;

  const filterOptions = ['전체', '작성자', '내용', '날짜'];

  const filteredLetters = letters.filter(letter => {
    if (!searchTerm) return true;
    
    const lowerSearch = searchTerm.toLowerCase();
    
    switch (searchFilter) {
      case '작성자':
        return letter.displayName?.toLowerCase().includes(lowerSearch);
      case '내용':
        return letter.content?.toLowerCase().includes(lowerSearch);
      case '날짜':
        return letter.createdAt?.toLowerCase().includes(lowerSearch);
      case '전체':
      default:
        return (
          letter.displayName?.toLowerCase().includes(lowerSearch) ||
          letter.content?.toLowerCase().includes(lowerSearch) ||
          letter.createdAt?.toLowerCase().includes(lowerSearch)
        );
    }
  });

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearchInput) {
      onSearchInput(e);
    }
  };

  const toggleExpanded = (letterId) => {
    const newExpanded = new Set(expandedLetters);
    if (newExpanded.has(letterId)) {
      newExpanded.delete(letterId);
    } else {
      newExpanded.add(letterId);
    }
    setExpandedLetters(newExpanded);
  };

  const toggleDropdown = (letterId, e) => {
    e?.stopPropagation();
    // 클릭한 편지 ID와 현재 열린 드롭다운 ID가 같으면 닫기, 다르면 해당 ID로 변경
    setOpenDropdownId(prevId => {
      console.log('Toggle dropdown - prevId:', prevId, 'letterId:', letterId);
      return prevId === letterId ? null : letterId;
    });
  };

  // 🔥 수정된 handleEdit - 모달을 먼저 열고 드롭다운은 나중에 닫기
  const handleEdit = (letterId, e) => {
    e?.stopPropagation();
    e?.preventDefault();
    console.log('Edit letter:', letterId);
    
    // ✅ 먼저 모달 열기 콜백 실행
    if (onModifyLetterConfirm) {
      onModifyLetterConfirm(letterId);
    }
    
    // ✅ 모달이 열린 후 드롭다운 닫기 (약간의 딜레이)
    setTimeout(() => {
      setOpenDropdownId(null);
    }, 100);
  };

  // 🔥 수정된 handleDelete - 모달을 먼저 열고 드롭다운은 나중에 닫기
  const handleDelete = (letterId, e) => {
    e?.stopPropagation();
    e?.preventDefault();
    console.log('Delete letter:', letterId);
    
    // ✅ 먼저 모달 열기 콜백 실행
    if (onRemoveLetterConfirm) {
      onRemoveLetterConfirm(letterId);
    }
    
    // ✅ 모달이 열린 후 드롭다운 닫기 (약간의 딜레이)
    setTimeout(() => {
      setOpenDropdownId(null);
    }, 100);
  };

  const handleFilterSelect = (filter) => {
    setSearchFilter(filter);
    setShowFilterDropdown(false);
  };

  const isLongContent = (content) => {
    return content && (content.length > 200 || content.split('\n').length > 4);
  };

  const getBackgroundColor = (index) => {
    const colors = [
      '#f3f4f6', // 연한 회색
      '#dbeafe', // 연한 하늘색
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="w-100">
      <div className="container">
        
        {/* 필터 + 검색 + 하늘편지 쓰기 */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex gap-2 align-items-center justify-content-between flex-wrap">
              {/* 좌측: 필터 + 검색 */}
              <div className="d-flex gap-2 align-items-center flex-grow-1" style={{ maxWidth: '700px' }}>
                {/* 필터 드롭다운 */}
                <div className="position-relative" style={{ minWidth: '100px', width: '120px', flexShrink: 0 }}>
                  <button
                    className="btn w-100 d-flex align-items-center justify-content-between"
                    onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                    style={{
                      height: '48px',
                      borderRadius: '12px',
                      border: '1px solid #e5e7eb',
                      backgroundColor: 'white',
                      color: '#374151',
                      fontSize: '15px',
                      fontWeight: '500',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                    }}
                  >
                    <span>{searchFilter}</span>
                    <MdKeyboardArrowDown style={{ fontSize: '22px', color: '#9ca3af' }} />
                  </button>
                  
                  {showFilterDropdown && (
                    <>
                      <div
                        className="position-absolute bg-white shadow-lg rounded"
                        style={{
                          top: '52px',
                          left: '0',
                          width: '100%',
                          zIndex: 1001,
                          border: '1px solid #e5e7eb',
                          overflow: 'hidden'
                        }}
                      >
                        {filterOptions.map((option, idx) => (
                          <button
                            key={option}
                            className="btn btn-sm w-100 text-start px-3 py-2"
                            onClick={() => handleFilterSelect(option)}
                            style={{
                              border: 'none',
                              borderRadius: '0',
                              borderTop: idx > 0 ? '1px solid #f3f4f6' : 'none',
                              backgroundColor: searchFilter === option ? '#f9fafb' : 'white',
                              color: '#374151',
                              fontSize: '14px'
                            }}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                      <div
                        style={{
                          position: 'fixed',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          zIndex: 1000
                        }}
                        onClick={() => setShowFilterDropdown(false)}
                      />
                    </>
                  )}
                </div>

                {/* 검색창 */}
                <div className="position-relative flex-grow-1" style={{ maxWidth: '400px' }}>
                  <MdSearch 
                    style={{
                      position: 'absolute',
                      left: '16px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      fontSize: '22px',
                      color: '#9ca3af',
                      pointerEvents: 'none',
                      zIndex: 1
                    }}
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="검색어를 입력하세요"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{
                      height: '48px',
                      borderRadius: '12px',
                      border: '1px solid #e5e7eb',
                      backgroundColor: 'white',
                      fontSize: '15px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                      paddingLeft: '48px',
                      paddingRight: '16px'
                    }}
                  />
                </div>
              </div>

              {/* 우측: 하늘편지 쓰기 버튼 */}
              {canWrite && (
                <button
                  className="btn d-flex align-items-center gap-2"
                  onClick={onRegisterClick}
                  style={{
                    height: '48px',
                    borderRadius: '12px',
                    whiteSpace: 'nowrap',
                    backgroundColor: '#000',
                    color: 'white',
                    border: 'none',
                    padding: '0 24px',
                    fontSize: '15px',
                    fontWeight: '600',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    transition: 'all 0.2s ease',
                    flexShrink: 0
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                  }}
                >
                  <BsPencilSquare style={{ fontSize: '18px' }} />
                  <span className="d-none d-sm-inline">하늘편지 쓰기</span>
                  <span className="d-inline d-sm-none">편지 쓰기</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Letters List */}
        <div className="d-flex flex-column gap-4">
          {filteredLetters.length === 0 ? (
            <div className="text-center py-5">
              <div 
                className="mx-auto mb-4"
                style={{
                  width: '100px',
                  height: '100px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)'
                }}
              >
                <i className="line-icon-Letter-Open" style={{ fontSize: '48px', color: 'white' }}></i>
              </div>
              <h5 className="fw-600 mb-2" style={{ color: '#374151' }}>
                {searchTerm ? '검색 결과가 없습니다' : '등록된 하늘편지가 없습니다'}
              </h5>
              <p className="text-muted mb-0" style={{ fontSize: '15px' }}>
                {searchTerm ? '다른 검색어로 시도해보세요' : '첫 번째 하늘편지를 작성해보세요'}
              </p>
            </div>
          ) : (
            filteredLetters.map((letter, index) => {
              const letterId = letter.letterId; // 🔥 letterId를 변수로 저장
              const isExpanded = expandedLetters.has(letterId);
              const hasLongContent = isLongContent(letter.content);
              const bgColor = getBackgroundColor(index);
              
              // 🔥 letterId가 없으면 에러 로그
              if (!letterId) {
                console.error('Letter without letterId:', letter);
                return null;
              }
              
              // 🔥 본인이 작성한 편지인지 확인
              // API 응답에 hasModifyPermission, hasDeletePermission이 있음!
              const isMyLetter = letter.hasModifyPermission === true || letter.hasDeletePermission === true;
              
              // 드롭다운 표시 조건
              // 1. pageMode가 'edit' (owner/editor): 모든 편지 관리 가능
              // 2. isMyLetter: 본인이 작성한 편지만 관리 가능
              const showDropdown = pageMode === 'edit' || isMyLetter;

              return (
                <div
                  key={letterId}
                  className="position-relative p-4"
                  style={{
                    backgroundColor: bgColor,
                    borderRadius: '16px',
                    border: 'none',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    zIndex: openDropdownId === letterId ? 10002 : 1  // 🔥 드롭다운 열린 카드만 최상위
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
                  }}
                >
                  {/* Header */}
                  <div className="d-flex align-items-start justify-content-between mb-3">
                    <div className="d-flex align-items-center gap-3">
                      <div
                        style={{
                          width: '48px',
                          height: '48px',
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: '700',
                          fontSize: '18px',
                          color: '#374151',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}
                      >
                        {(letter.displayName || '?').charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h6 className="mb-1 fw-700" style={{ fontSize: '17px', color: '#1f2937' }}>
                          {letter.displayName}
                        </h6>
                        <p className="mb-0" style={{ fontSize: '13px', color: '#6b7280' }}>
                          {letter.createdAt}
                        </p>
                      </div>
                    </div>

                    {/* Actions Menu */}
                    {showDropdown && (
                      <div className="position-relative" style={{ zIndex: 'auto' }}>
                        <button
                          className="btn btn-sm p-0"
                          style={{
                            width: '36px',
                            height: '36px',
                            backgroundColor: 'rgba(255, 255, 255, 0.7)',
                            border: 'none',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s ease'
                          }}
                          onClick={(e) => {
                            console.log('Dropdown button clicked for letter:', letterId);
                            toggleDropdown(letterId, e);
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
                          }}
                        >
                          <MdMoreVert style={{ fontSize: '22px', color: '#374151' }} />
                        </button>
                        
                        {openDropdownId === letterId && (
                          <>
                            <div
                              className="position-absolute bg-white shadow-lg rounded"
                              style={{
                                top: '44px',
                                right: '0',
                                minWidth: '140px',
                                zIndex: 10003,  // 🔥 최상위로 변경
                                border: '1px solid #e5e7eb',
                                overflow: 'hidden'
                              }}
                            >
                              {/* 수정하기 버튼 */}
                              {(pageMode === 'edit' || letter.hasModifyPermission) && (
                                <button
                                  type="button"
                                  className="btn btn-sm w-100 text-start d-flex align-items-center gap-2 px-3 py-2"
                                  onMouseDown={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    console.log('🔥 Edit button MOUSEDOWN for:', letterId);
                                    handleEdit(letterId, e);
                                  }}
                                  style={{ 
                                    border: 'none', 
                                    borderRadius: '0',
                                    backgroundColor: 'white',
                                    color: '#374151',
                                    fontSize: '14px',
                                    cursor: 'pointer',
                                    userSelect: 'none'
                                  }}
                                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                >
                                  <MdEdit style={{ fontSize: '18px', pointerEvents: 'none' }} />
                                  <span style={{ pointerEvents: 'none' }}>수정하기</span>
                                </button>
                              )}
                              {/* 구분선 */}
                              {(pageMode === 'edit' || (letter.hasModifyPermission && letter.hasDeletePermission)) && (
                                <div style={{ height: '1px', backgroundColor: '#f3f4f6' }} />
                              )}
                              {/* 삭제하기 버튼 */}
                              {(pageMode === 'edit' || letter.hasDeletePermission) && (
                                <button
                                  type="button"
                                  className="btn btn-sm w-100 text-start d-flex align-items-center gap-2 px-3 py-2"
                                  onMouseDown={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    console.log('🔥 Delete button MOUSEDOWN for:', letterId);
                                    handleDelete(letterId, e);
                                  }}
                                  style={{ 
                                    border: 'none', 
                                    borderRadius: '0',
                                    backgroundColor: 'white',
                                    color: '#ef4444',
                                    fontSize: '14px',
                                    cursor: 'pointer',
                                    userSelect: 'none'
                                  }}
                                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fef2f2'}
                                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                >
                                  <MdDelete style={{ fontSize: '18px', pointerEvents: 'none' }} />
                                  <span style={{ pointerEvents: 'none' }}>삭제하기</span>
                                </button>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="position-relative">
                    <div
                      style={{
                        whiteSpace: 'pre-wrap',
                        lineHeight: '1.7',
                        color: '#1f2937',
                        fontSize: '15px',
                        overflow: !isExpanded && hasLongContent ? 'hidden' : 'visible',
                        display: !isExpanded && hasLongContent ? '-webkit-box' : 'block',
                        WebkitLineClamp: !isExpanded && hasLongContent ? 4 : 'unset',
                        WebkitBoxOrient: 'vertical'
                      }}
                    >
                      {letter.content}
                    </div>

                    {/* 더보기/접기 버튼 */}
                    {hasLongContent && (
                      <button
                        className="btn btn-sm mt-3 px-3 py-2 d-flex align-items-center gap-1"
                        onClick={() => toggleExpanded(letterId)}
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                          border: 'none',
                          borderRadius: '8px',
                          color: '#374151',
                          fontWeight: '600',
                          fontSize: '13px',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 1)';
                          e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      >
                        {isExpanded ? (
                          <>
                            <MdExpandLess style={{ fontSize: '18px' }} />
                            접기
                          </>
                        ) : (
                          <>
                            <MdExpandMore style={{ fontSize: '18px' }} />
                            더보기
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* 🔥 전역 백드롭 - 편지 영역 외부/내부 어디든 클릭 시 드롭다운 닫기 */}
      {openDropdownId && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10000,  // 🔥 편지 카드(zIndex:1)보다 높고, 드롭다운 열린 카드(zIndex:10002)보다 낮음
            backgroundColor: 'transparent'
          }}
          onClick={(e) => {
            e.stopPropagation();
            console.log('Global backdrop clicked - closing all dropdowns');
            setOpenDropdownId(null);
          }}
        />
      )}
    </div>
  );
};

export default LetterTab;