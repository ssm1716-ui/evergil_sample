import React, { useRef, useEffect } from 'react';
import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-fullscreen.css';
import 'lightgallery/css/lg-zoom.css';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import { MdAddPhotoAlternate } from 'react-icons/md';

const ImageTab = ({ 
  images = [], 
  pageMode = 'view',
  galleryKey = 0,
  onUpload,
  onEdit,
  onDelete,
  isUploading = false,
  imagesRef
}) => {
  const lgRef = useRef(null);
  const fileInputRef = useRef(null);

  // LightGallery 커스텀 버튼 스타일
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .lg-custom-btn {
        position: absolute;
        top: 0px;
        padding: 8px 15px;
        color: #999;
        background-color: unset;
        border: none;
        cursor: pointer;
        font-size: 14px;
        margin-left: 10px;
        z-index: 9999;
      }
      .lg-custom-btn:hover {
        color:#FFF
      }
      .lg-custom-modify {
        right: 100px
      }
      .lg-custom-remove {
        right: 50px
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // 현재 이미지 ID 가져오기
  const getCurrentImageId = () => {
    try {
      // 1. LightGallery 인스턴스에서 현재 인덱스 가져오기
      if (lgRef.current?.instance) {
        const currentIndex = lgRef.current.instance.index;
        if (currentIndex !== undefined && images[currentIndex]) {
          return images[currentIndex].id;
        }
      }
      
      // 2. 현재 활성 이미지의 src로 매칭
      const currentImg = document.querySelector('.lg-item.lg-current img');
      if (currentImg && currentImg.src) {
        const foundImage = images.find(image => {
          const cleanCurrentSrc = currentImg.src.split('?')[0];
          const cleanImageUrl = image.url.split('?')[0];
          return cleanCurrentSrc === cleanImageUrl;
        });
        
        if (foundImage) {
          return foundImage.id;
        }
      }
      
      return null;
    } catch (error) {
      console.error('getCurrentImageId 에러:', error);
      return null;
    }
  };

  // LightGallery 커스텀 버튼 추가
  const addCustomButtons = () => {
    const tryAddButtons = () => {
      const lgToolbar = document.querySelector('.lg-toolbar');
      if (lgToolbar && !document.getElementById('edit-button')) {
        const editButton = document.createElement('button');
        editButton.innerText = '수정';
        editButton.classList.add('lg-custom-btn', 'lg-custom-modify');
        editButton.id = 'edit-button';
        editButton.onclick = () => {
          const imageId = getCurrentImageId();
          if (imageId) {
            onEdit(imageId);
          } else {
            alert('수정할 이미지를 찾을 수 없습니다.');
          }
        };

        const deleteButton = document.createElement('button');
        deleteButton.innerText = '삭제';
        deleteButton.classList.add('lg-custom-btn', 'lg-custom-remove');
        deleteButton.id = 'delete-button';
        deleteButton.onclick = () => {
          const imageId = getCurrentImageId();
          if (imageId) {
            onDelete(imageId);
          } else {
            alert('삭제할 이미지를 찾을 수 없습니다.');
          }
        };

        lgToolbar.appendChild(editButton);
        lgToolbar.appendChild(deleteButton);
        return true;
      }
      return false;
    };

    if (tryAddButtons()) return;
    setTimeout(tryAddButtons, 100);
    setTimeout(tryAddButtons, 500);
  };

  // 갤러리 열림 이벤트 핸들러
  const handleGalleryOpen = () => {
    if (pageMode === 'edit') {
      addCustomButtons();
    }
    document.body.style.touchAction = 'none';
  };

  // 업로드 버튼 클릭
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // 파일 변경 이벤트
  const handleFileChange = (e) => {
    if (onUpload) {
      onUpload(e);
    }
  };

  return (
    <div className="w-100 sm-mt-10px xs-mb-8 my-5">
      <LightGallery
        key={galleryKey}
        speed={500}
        closable={true}
        download={false}
        controls={true}
        showCloseIcon={true}
        thumbnail={true}
        plugins={[lgThumbnail]}
        selector=".gallery-item"
        onAfterOpen={handleGalleryOpen}
        onClose={() => { document.body.style.touchAction = ''; }}
        onInit={pageMode === 'edit' ? addCustomButtons : undefined}
        ref={lgRef}
        mobileSettings={{ controls: true, showCloseIcon: true }}
      >
        <div className="gallery-grid">
          {/* 편집 모드에서만 업로드 버튼 표시 */}
          {pageMode === 'edit' && (
            <div
              onClick={handleUploadClick}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f0f0f0',
                cursor: 'pointer',
                border: '2px dashed #ccc',
              }}
              className={`gallery-grid-item ${!images.length ? 'gallery-item-first' : ''}`}
            >
              <MdAddPhotoAlternate size={70} color="#888" />
              <input
                type="file"
                accept="image/*"
                multiple={true}
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </div>
          )}
          
          {/* 이미지 목록 */}
          {images.map((image, index) => (
            <a
              href={image.url}
              key={image.id || index}
              className="gallery-item gallery-grid-item"
              data-src={image.url}
              data-id={image.id}
              data-page={Math.floor(index / 20) + 1}
              data-index={index}
            >
              <img 
                src={image.url} 
                loading="lazy" 
                alt="추모 이미지" 
                data-index={index} 
                data-id={image.id} 
              />
            </a>
          ))}
        </div>
      </LightGallery>
      
      {/* 이미지가 없을 때 */}
      {images.length === 0 && (
        <div className="col-12 text-center mt-100px pb-2 fs-24">
          <i className="feather icon-feather-camera align-middle icon-extra-large text-dark fs-50 md-fs-70 p-30px border border-4 border-dark border-radius-100px mb-1"></i>
          <p className="fs-30 fw-800 text-black">No Posts Yet</p>
        </div>
      )}
      
      {/* 업로딩 오버레이 */}
      {isUploading && (
        <div className="uploading-overlay">
          <div className="spinner" />
          <p>이미지를 업로드 중입니다...</p>
        </div>
      )}
    </div>
  );
};

export default ImageTab;