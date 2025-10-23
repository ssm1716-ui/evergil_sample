import React from 'react';

const ContentTabs = ({ 
  activeTab,
  tabs,
  onTabChange,
  permission = 'owner', 
  isLoggedIn = true,
  children
}) => {
  return (
    <section className="pt-0 sm-pt-40px md-pb-70px">
      <div className="container">
        <div className="row">
          <div className="col-12">
            {/* 넓은 탭 디자인 */}
            <div className="d-flex justify-content-center mb-5">
              <div 
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${tabs.length}, 1fr)`,
                  width: '100%',
                  height: '35px',     // 🔥 48px → 56px로 높이 증가
                  padding: '2px',
                  backgroundColor: '#f3f4f6',
                  borderRadius: '8px',
                  gap: '4px'
                }}
              >
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => onTabChange(tab)}
                    style={{
                      fontSize: '1.0625rem',  // 🔥 1rem → 1.0625rem (17px)
                      fontWeight: '600',      // 🔥 500 → 600으로 강조
                      color: activeTab === tab ? '#111827' : '#6b7280',
                      backgroundColor: activeTab === tab ? '#ffffff' : 'transparent',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      padding: '0 1.5rem',   // 🔥 1rem → 1.5rem
                      whiteSpace: 'nowrap',
                      boxShadow: activeTab === tab ? '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)' : 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (activeTab !== tab) {
                        e.currentTarget.style.backgroundColor = '#e5e7eb';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeTab !== tab) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            
            {/* 탭 컨텐츠 영역 */}
            <div className="tab-content">
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentTabs;