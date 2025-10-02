import React from 'react';
import ImageTab from './ImageTab';
import LetterTab from './LetterTab';
import FamilyTab from './FamilyTab';

const ProfileTabs = ({ 
  // 탭 관련
  activeTab,
  tabList,
  onTabChange,
  
  // 이미지 탭 관련
  images,
  galleryKey,
  onImageUpload,
  onImageEdit,
  onImageDelete,
  isUploading,
  imagesRef,
  
  // 하늘편지 탭 관련
  letters,
  onLetterAdd,
  onLetterEdit,
  onLetterDelete,
  onLetterSearch,
  isSearching,
  
  // 가족관계도 탭 관련
  family,
  isLoadingFamilyData,
  familyDataLoaded,
  onFamilyDragEnd,
  onFamilyAddItem,
  onFamilySelectChange,
  onFamilyCustomInputChange,
  onFamilyNameChange,
  onFamilyDelete,
  
  // 공통
  pageMode = 'view'
}) => {
  return (
    <section id="tab" className="pt-1">
      <div className="container">
        <div className="row">
          <div className="col-12 tab-style-04">
            {/* 탭 네비게이션 */}
            <ul className="nav nav-tabs border-0 justify-content-center fs-19">
              {tabList.map((tab) => (
                <li key={tab} className="nav-item text-center">
                  <button
                    className={`nav-link ${
                      activeTab === tab
                        ? 'active text-base-color d-inline-block'
                        : 'd-inline-block'
                    }`}
                    onClick={() => onTabChange(tab)}
                  >
                    {tab}
                    <span className="tab-border bg-base-color"></span>
                  </button>
                </li>
              ))}
            </ul>
            
            <div className="mb-5 h-1px w-100 bg-extra-medium-gray xs-mb-8"></div>
            
            {/* 탭 콘텐츠 */}
            <div className="tab-content">
              {/* 이미지 탭 */}
              {activeTab === '이미지' && (
                <ImageTab
                  images={images}
                  pageMode={pageMode}
                  galleryKey={galleryKey}
                  onUpload={onImageUpload}
                  onEdit={onImageEdit}
                  onDelete={onImageDelete}
                  isUploading={isUploading}
                  imagesRef={imagesRef}
                />
              )}

              {/* 하늘편지 탭 */}
              {activeTab === '하늘편지' && (
                <LetterTab
                  letters={letters}
                  pageMode={pageMode}
                  onAdd={onLetterAdd}
                  onEdit={onLetterEdit}
                  onDelete={onLetterDelete}
                  onSearch={onLetterSearch}
                  isSearching={isSearching}
                />
              )}

              {/* 가족관계도 탭 */}
              {activeTab === '가족관계도' && (
                <FamilyTab
                  family={family}
                  pageMode={pageMode}
                  isLoadingFamilyData={isLoadingFamilyData}
                  familyDataLoaded={familyDataLoaded}
                  onDragEnd={onFamilyDragEnd}
                  onAddItem={onFamilyAddItem}
                  onSelectChange={onFamilySelectChange}
                  onCustomInputChange={onFamilyCustomInputChange}
                  onNameChange={onFamilyNameChange}
                  onDelete={onFamilyDelete}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileTabs;