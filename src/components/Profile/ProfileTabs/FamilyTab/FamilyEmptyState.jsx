import React from 'react';

const FamilyEmptyState = ({ pageMode }) => {
  return (
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
  );
};

export default FamilyEmptyState;