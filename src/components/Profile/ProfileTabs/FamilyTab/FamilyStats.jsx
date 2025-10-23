import React from 'react';

const FamilyStats = ({ family }) => {
  const childrenCount = family.filter(m => 
    m.familyTitle && (m.familyTitle.includes('딸') || m.familyTitle.includes('아들'))
  ).length;

  return (
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
              {childrenCount}
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
  );
};

export default FamilyStats;