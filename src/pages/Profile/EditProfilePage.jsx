import { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { debounce } from 'lodash';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-fullscreen.css';
import 'lightgallery/css/lg-zoom.css';
import lgZoom from 'lightgallery/plugins/zoom';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import Button from '@/components/common/Button/Button';
import { MdAddPhotoAlternate } from 'react-icons/md';
import { getFileType, formatDateRelace } from '@/utils/utils';
import {
  compressImage,
  compressAndPreviewImage,
} from '@/utils/imageCompressor';
import { postRequestPresignedUrl } from '@/api/fileupload/uploadApi';
import Modal from '@/components/common/Modal/Modal';
import useProfilePermission from '@/hooks/useProfilePermission';
import WebShareButton from '@/components/Share/WebShareButton';
import { suppressDeprecationWarnings } from '@/utils/consoleSuppression';

import {
  getSelectProfile,
  postPrivateProfileAccessRequest,
  putProfileBackgroundImage,
  putProfileImage,
  putProfileDescription,
  getPhotoSeletct,
  postPhotoRegister,
  putPhotoModify,
  deletePhotoRemove,
  getLetters,
  getLetter,
  postLetters,
  putLetters,
  getFamilyProfile,
  putFamilyProfile,
  deleteLetters,
  getProfileIdByNickname
} from '@/api/memorial/memorialApi';

import avatarImage from '@/assets/images/base-profile-image.png';

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
  ],
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'list',
  'bullet',
  'script',
  'indent',
  'color',
  'background',
  'align',
];

const initFormPrivateProfile = {
  name: '',
  memo: '',
};

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const EditProfilePage = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { profileId: urlProfileId, nickname } = useParams(); //URL에서 :profileId 값 가져오기
  const [profileId, setProfileId] = useState(urlProfileId);
  const lgRef = useRef(null);
  const [content, setContent] = useState('');
  const [profile, setProfile] = useState({});

  const [items, setItems] = useState([
    { displayName: '', familyTitle: '', isCustomInput: false },
  ]);
  const initLetter = {
    displayName: '',
    content: '',
  };
  //탭 - 이미지
  const [images, setImages] = useState([]);

  const [letterId, setLetterId] = useState('');
  const [letters, setLetters] = useState([]);
  const [family, setFamily] = useState([]);
  const [profileImage, setProfileImage] = useState({});
  const [backgroundImage, setBackgroundImage] = useState({});
  const [photo, setPhoto] = useState({});
  const [updatePhotoId, setUpdatePhotoId] = useState('');
  const [updatePhoto, setUpdatePhoto] = useState({});
  const [imagesId, setImagesId] = useState('');
  const [activeTab, setActiveTab] = useState('이미지');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [galleryKey, setGalleryKey] = useState(0);
  const [postLetter, setPostLetter] = useState(initLetter);

  // const lgRef = useRef(null);
  const imagesRef = useRef(images);
  const fileInputRef = useRef(null);
  const backImageInputRef = useRef(null);
  const profileImageInputRef = useRef(null);

  const [url, setUrl] = useState('');
  // const [isAuthorized, setIsAuthorized] = useState(false);
  // const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  // const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  // const [showScreen, setShowScreen] = useState(false);
  const [isRequestCompletedModalOpen, setIsRequestCompletedModalOpen] =
    useState(false);
  const [formRequestPrivateProfile, setFormRequestPrivateProfile] = useState(
    initFormPrivateProfile
  );
  const hasMountedRef = useRef(false); // mount 여부 저장
  const [isUploading, setIsUploading] = useState(false);

  const [imageState, setImageState] = useState({
    images: [],
    page: 1,
    hasNext: true,
    initialized: false,
  });
  const [isFetching, setIsFetching] = useState(false);

  const {
    isLoginModalOpen,
    setIsLoginModalOpen,
    isRequestModalOpen,
    setIsRequestModalOpen,
    showScreen,
  } = useProfilePermission(profileId, { shouldRedirect: true });

  const [isBackgroundModalOpen, setIsBackgroundModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  useEffect(() => {
    // 현재 페이지의 URL을 가져와 상태 업데이트
    setUrl(window.location.href);
    
    // DOMNodeInserted 경고 억제
    suppressDeprecationWarnings();
  }, []);

  useEffect(() => {
    if (nickname) {
      try {
        if (!nickname.startsWith('@')) {
          navigate('/');
          return;
        }

        const cleanNickname = nickname.substring(1);
        getProfileIdByNickname(cleanNickname).then(res => {
          if (res.status === 200) {
            setProfileId(res.data.data.profileId);
          }
        }).catch(error => {
          console.error(error);
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, [nickname, navigate]);

  // 업로드 버튼 클릭 시 파일 업로드 창 열기
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // 프로필 배경 파일 업로드 시 창 열기
  const handleBackUploadClick = () => {
    backImageInputRef.current.click();
  };

  // 프로필 이미지 파일 업로드 시 창 열기
  const handleProfileUploadClick = () => {
    profileImageInputRef.current.click();
  };

  // 프로필 이미지 클릭 시 모달 열기 또는 파일 선택
  const handleProfileImageClick = () => {
    if (profile.profileImageUrl) {
      setIsProfileModalOpen(true);
    } else {
      profileImageInputRef.current.click();
    }
  };

  // 프로필 이미지 삭제
  const handleProfileDelete = async () => {
    if (!window.confirm('프로필 이미지를 삭제하시겠습니까?')) return;
    
    try {
      setIsUploading(true);
      const res = await putProfileImage(profileId, {
        profileImageUrl: '',
      });

      if (res.status === 200) {
        setProfile(prev => ({
          ...prev,
          profileImageUrl: '',
        }));
        setProfileImage({});
        setIsProfileModalOpen(false);
      }
    } catch (error) {
      console.error('프로필 이미지 삭제 중 오류 발생:', error);
      alert('프로필 이미지 삭제 중 오류가 발생했습니다.');
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    imagesRef.current = imageState.images;
  }, [imageState.images]);

  useEffect(() => {
    // 스타일 추가
    const styleElement = document.createElement('style');
    styleElement.innerHTML = customButtonStyle;
    document.head.appendChild(styleElement);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!profileId) return; // profileId가 없으면 실행하지 않음
      
      try {
        const res = await getSelectProfile(profileId);
        if (res.status === 200) {
          const { profile, result } = res.data.data;
          // PROFILE_INACTIVE 상태 확인
          if (result === 'PROFILE_INACTIVE') {
            navigate('/error-profile-inactive');
            return;
          }
          setProfile(profile);
          setContent(profile.description);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, [profileId, navigate]);

  //  상태 변경 감지 후 자동 업로드
  useEffect(() => {
    if (backgroundImage && backgroundImage.originalFile instanceof Blob) {
      handleGetFileUploadPath('backgroundImageUrl', backgroundImage);
    }
  }, [backgroundImage]); // backgroundImage 값이 변경될 때 실행

  useEffect(() => {
    if (profileImage && profileImage.originalFile instanceof Blob) {
      handleGetFileUploadPath('profileImageUrl', profileImage);
    }
  }, [profileImage]); // profileImage 값이 변경될 때 실행

  useEffect(() => {
    if (photo && photo.originalFile instanceof Blob) {
      handleGetFileUploadPath('photo', photo);
    }
  }, [photo]); // 컨텐츠 이미지 업로드 photo 값이 변경될 때 실행

  useEffect(() => {
    if (updatePhoto && updatePhoto.originalFile instanceof Blob) {
      handleGetFileUploadPath('updatePhoto', updatePhoto);
    }
  }, [updatePhoto]); // 컨텐츠 이미지 업로드 수정시 updatePhoto 값이 변경될 때 실행

  // 탭 변경 시 데이터 로드 및 레이아웃 조정
  useEffect(() => {
    const fetchTabDate = async () => {
      if (!profileId) return; // profileId가 없으면 실행하지 않음
      
      try {
        let res;
        // if (activeTab === '이미지') {
        //   res = await getPhotoSeletct(profileId, 'edit');
        //   console.log('이미지 : ', res);
        //   if (res.status === 200) {
        //     const { data } = res.data;
        //     console.log(data);
        //     setImages(data);
        //   }
        // }
        if (activeTab === '하늘편지') {
          res = await getLetters(profileId);
          if (res.status === 200) {
            const { data } = res.data;
            setLetters(data);
          }
        }
        if (activeTab === '가족관계도') {
          res = await getFamilyProfile(profileId);
          if (res.status === 200) {
            const { items } = res.data.data;
            setFamily(items);
          }
        }

        // if (res.status === 200) {
        //   const { data } = res.data;
        //   setProfiles(data);
        // }
      } catch (error) {
        console.error(error);
      }
    };

    if (showScreen && profileId) fetchTabDate();

    // if (showScreen && activeTab === '이미지' && !imageState.initialized) {
    //   fetchImages(1, false);
    // }
    if (showScreen && activeTab === '이미지' && profileId) {
      fetchImages(1, false);
    }
  }, [activeTab, showScreen, profileId]);

  // 이미지 탭 재진입 시 스크롤 및 렌더 보정
  useEffect(() => {
    if (activeTab === '이미지' && imageState.initialized) {
      const checkHeight = () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = window.innerHeight;

        if (scrollHeight <= clientHeight + 100 && imageState.hasNext) {
          fetchImages(imageState.page + 1, true);
        }
      };
      setTimeout(checkHeight, 100);
    }
  }, [activeTab, imageState.initialized]);

  //이미지 탭일 때만 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      if (
        !profileId ||
        isFetching ||
        !imageState.hasNext ||
        activeTab !== '이미지'
      )
        return;

      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      const scrollPercent = (scrollY + viewportHeight) / fullHeight;

      if (scrollPercent >= 0.8) {
        setIsFetching(true);
        fetchImages(imageState.page + 1, true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFetching, imageState.hasNext, imageState.page, activeTab, profileId]);

  // 이미지 fetch 함수
  const fetchImages = async (page = 1, append = false) => {
    if (!profileId) return; // profileId가 없으면 실행하지 않음
    
    try {
      const res = await getPhotoSeletct(profileId, 'edit', page);
      if (res?.status === 200) {
        const { data } = res.data;
        setImageState((prev) => ({
          images: append ? [...prev.images, ...data] : data,
          page,
          hasNext: data.length > 0,
          initialized: true,
        }));
      }
    } catch (error) {
      console.error('이미지 로드 실패:', error);
    } finally {
      setIsFetching(false);
    }
  };

  // 디바운스된 저장 함수
  const debouncedSaveFamily = useRef(
    debounce(async (profileId, familyData) => {
      const validFamily = familyData.filter(
        (item) =>
          item.familyTitle.trim() !== '' && item.displayName.trim() !== ''
      );

      // if (validFamily.length === 0) return; // 전송할 항목이 없으면 호출하지 않음

      try {
        const res = await putFamilyProfile(profileId, validFamily);
        if (res.status !== 200) {
          alert('가족관계 업데이트 시 에러 발생');
        }
      } catch (error) {
        console.error(error);
      }
    }, 500)
  ).current;

  // 상태 변경 감지
  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    if (profileId) {
      debouncedSaveFamily(profileId, family);
    }
  }, [family, profileId]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        if (!imagesId || !profileId) return;
        const res = await getPhotoSeletct(profileId);
        if (res.status === 200) {
          const { data } = res.data;
          setImages(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchPhotos();
  }, [imagesId, profileId]);

  useEffect(() => {
    if (lgRef.current) {
      lgRef.current.addEventListener('lgAfterOpen', addCustomButtons);
    }

    return () => {
      if (lgRef.current) {
        lgRef.current.removeEventListener('lgAfterOpen', addCustomButtons);
      }
    };
  }, [galleryKey]);

  const closeLightGallery = () => {
    const closeBtn = document.querySelector("[id^='lg-close']"); // ✅ ID가 'lg-close-'로 시작하는 버튼 찾기
    if (closeBtn) {
      closeBtn.click(); // ✅ LightGallery 닫기 버튼 강제 클릭
    }
  };

  const handleEdit = (id) => {
    if (!id) return;
    setUpdatePhotoId(id);

    // ✅ LightGallery 완전 초기화
    if (lgRef.current?.instance) {
      lgRef.current.instance.destroy(); // 내부 상태 초기화
    }
    setGalleryKey((prev) => prev + 1); // 갤러리 재마운트 트리거

    // ✅ 기존 파일 입력 요소 제거
    const existingInput = document.getElementById('profile-edit-image-upload');
    if (existingInput) {
      existingInput.remove();
    }

    // ✅ 새로운 파일 업로드 input 생성
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    fileInput.setAttribute('id', 'profile-edit-image-upload');

    // ✅ 이벤트 리스너 함수 정의
    const handleFileChange = async (event) => {
      const file = event.target.files[0];
      if (!file) return;

      try {
        const compressedFile = await compressImage(file);
        const preview = URL.createObjectURL(compressedFile);
  
        const imageFile = {
          originalFile: compressedFile,
          preview,
        };

        setUpdatePhoto(imageFile);
        setGalleryKey((prev) => prev + 1); // 갤러리 다시 열기 위한 키 재갱신

        // ✅ 이벤트 리스너 제거
        fileInput.removeEventListener('change', handleFileChange);
        fileInput.remove();
      } catch (error) {
        console.error('이미지 압축 또는 처리 실패:', error);
        // ✅ 에러 발생 시에도 이벤트 리스너 제거
        fileInput.removeEventListener('change', handleFileChange);
        fileInput.remove();
      }
    };

    // ✅ 이벤트 리스너 추가
    fileInput.addEventListener('change', handleFileChange);
    document.body.appendChild(fileInput);
    fileInput.click();
  };

  const handleDelete = async (id) => {
    if (!id) return;
    
    if (!window.confirm('삭제하시겠습니까?')) return;

    try {
      setIsUploading(true);

      // 삭제할 이미지 요소 찾기
      const deletedImage = imageState.images.find(image => image.id === id);
      const imageElement = deletedImage ? 
        document.querySelector(`[data-src="${deletedImage.url}"]`) : null;
      
      // 삭제할 이미지의 위치 정보 저장
      const imageRect = imageElement?.getBoundingClientRect();
      const scrollTop = window.scrollY;
      const imageTop = imageRect?.top || 0;
      const absoluteImageTop = scrollTop + imageTop;

      const res = await deletePhotoRemove(id);

      if (res.status === 200) {
        // 갤러리 닫기
        closeLightGallery();
        
        // 갤러리 리렌더링
        setGalleryKey((prev) => prev + 1);

        // 현재 페이지의 이미지 목록에서 삭제된 항목 제거
        setImageState((prev) => {
          const updatedImages = prev.images.filter((image) => image.id !== id);
          
          // 삭제된 이미지가 있던 페이지 새로고침
          if (deletedImage) {
            const currentPage = imageElement?.getAttribute('data-page');
            if (currentPage) {
              // 이미지 로드 전에 스크롤 위치 조정
              const adjustScroll = () => {
                const newScrollTop = window.scrollY;
                const scrollDiff = newScrollTop - scrollTop;
                window.scrollTo(0, absoluteImageTop - scrollDiff);
              };

              // 이미지 로드 시작 전에 스크롤 조정
              adjustScroll();

              fetchImages(parseInt(currentPage), false).then(() => {
                // 이미지 로드 완료 후 한 번 더 스크롤 조정
                requestAnimationFrame(adjustScroll);
              });
            }
          }
          
          return {
            ...prev,
            images: updatedImages,
          };
        });
      } else {
        throw new Error('이미지 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('이미지 삭제 중 오류 발생:', error);
      alert('이미지 삭제 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsUploading(false);
    }
  };
  
  // ✅ LightGallery가 열린 후 실행되는 이벤트 핸들러
  const handleGalleryOpen = () => {
    addCustomButtons();
  };

  const addCustomButtons = () => {
    // 즉시 실행 후 지연 실행도 추가 (PC 환경에서 타이밍 이슈 대응)
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
            handleEdit(imageId);
          }
        };

        const deleteButton = document.createElement('button');
        deleteButton.innerText = '삭제';
        deleteButton.classList.add('lg-custom-btn', 'lg-custom-remove');
        deleteButton.id = 'delete-button';
        deleteButton.onclick = () => {
          const imageId = getCurrentImageId();
          if (imageId) {
            handleDelete(imageId);
          } else {
            alert('삭제할 이미지를 찾을 수 없습니다. 새로고침 후 다시 시도해주세요.');
          }
        };

        lgToolbar.appendChild(editButton);
        lgToolbar.appendChild(deleteButton);
        
        return true; // 성공
      }
      return false; // 실패
    };

    // 즉시 시도
    if (tryAddButtons()) return;

    // MutationObserver를 사용하여 DOM 변경 감지
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          if (tryAddButtons()) {
            observer.disconnect();
          }
        }
      });
    });

    // DOM 변경 감지 시작
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // 지연 시도 (PC 환경에서 추가 보장)
    setTimeout(() => {
      if (tryAddButtons()) {
        observer.disconnect();
      }
    }, 100);

    setTimeout(() => {
      if (tryAddButtons()) {
        observer.disconnect();
      }
    }, 500);

    // 3초 후 observer 해제 (타임아웃)
    setTimeout(() => {
      observer.disconnect();
    }, 3000);
  };

  const onInit = () => {
    addCustomButtons();
  };

  const getCurrentImageIndex = () => {
    // LightGallery 인스턴스에서 현재 인덱스 가져오기
    if (lgRef.current?.instance) {
      return lgRef.current.instance.index;
    }
    
    // fallback: 현재 활성화된 이미지 찾기
    const currentSlide = document.querySelector('.lg-item.lg-current img');
    if (currentSlide) {
      // 부모 요소에서 인덱스 찾기
      const lgItem = currentSlide.closest('.lg-item');
      const allItems = document.querySelectorAll('.lg-item');
      const index = Array.from(allItems).indexOf(lgItem);
      return index !== -1 ? index : -1;
    }

    return -1; // 활성화된 이미지가 없을 경우 -1 반환
  };

  // 현재 이미지의 ID를 안전하게 가져오는 함수
  const getCurrentImageId = () => {
    try {
      // 1. DOM에서 현재 활성화된 이미지의 data-id 속성 직접 가져오기 (최우선)
      const currentItem = document.querySelector('.lg-item.lg-current');
      if (currentItem) {
        // lg-item 내부의 img 요소에서 data-id 가져오기
        const imgElement = currentItem.querySelector('img');
        if (imgElement && imgElement.dataset.id) {
          return imgElement.dataset.id;
        }
      }
      
      // 2. LightGallery 인스턴스에서 현재 인덱스로 가져오기
      if (lgRef.current?.instance) {
        const currentIndex = lgRef.current.instance.index;
        if (currentIndex !== undefined && imagesRef.current[currentIndex]) {
          const imageId = imagesRef.current[currentIndex].id;
          return imageId;
        }
      }
      
      // 3. DOM에서 현재 활성화된 이미지 URL로 찾기 (fallback)
      const currentImg = document.querySelector('.lg-item.lg-current img');
      if (currentImg) {
        const currentImageUrl = currentImg.src;
        const foundImage = imagesRef.current.find(img => img.url === currentImageUrl);
        if (foundImage) {
          return foundImage.id;
        }
      }

      return null;
    } catch (error) {
      return null;
    }
  };

  // 가족관계도 항목 추가 기능
  const handleAddItem = () => {
    const newItem = {
      displayName: '',
      familyTitle: '',
      isCustomInput: false,
    };
    setFamily([...family, newItem]);
  };

  // 가족관계도 드래그 종료 시 순서 업데이트
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newItems = Array.from(family);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    setFamily(newItems);
  };

  // 가족관계도 드롭다운 변경 핸들러
  const handleSelectChange = (index, value) => {
    const updatedItems = family.map((item, i) =>
      i === index
        ? {
            ...item,
            familyTitle: value,
            isCustomInput: value === '직접 입력',
          }
        : item
    );
    setFamily(updatedItems);
  };

  // 가족관계도 직접 입력 필드 변경 핸들러
  const handleCustomInputChange = (index, value) => {
    const updatedItems = family.map((item, i) =>
      i === index ? { ...item, familyTitle: value } : item
    );
    setFamily(updatedItems);
  };

  // 가족관계도 이름 입력 필드 변경 핸들러
  const handleNameChange = (index, value) => {
    const updatedItems = family.map((item, i) =>
      i === index ? { ...item, displayName: value } : item
    );
    setFamily(updatedItems);
  };

  // 가족관계도 삭제 핸들러
  const handleFailyDelete = (index) => {
    const updatedItems = family.filter((_, i) => i !== index);
    setFamily(updatedItems);
  };

  //설정 페이지
  const handleNavigate = (e) => {
    e.preventDefault();

    navigate(`/profile/setting-profile/${profileId}`);
  };

  //미리보기 페이지
  const handlePreview = (e) => {
    e.preventDefault();

    navigate(`/profile/preview-profile/${profileId}`);
  };

  // 파일 선택 핸들러
  const handleFileChange = async (e) => {
    const { files, name } = e.target;
    
    // 파일이 선택되지 않은 경우 (취소 버튼 클릭 등) 아무 동작도 하지 않음
    if (!files || files.length === 0) {
      return;
    }

    // Handle file selection case - 동기적으로 순차 처리
    try {
      for (const file of Array.from(files)) {
        const compressedFile = await compressImage(file);
        const preview = URL.createObjectURL(compressedFile);

        const imageFile = {
          originalFile: compressedFile,
          preview,
        };

        // setState는 화면 preview 용
        if (name === 'backgroundImageUrl') setBackgroundImage(imageFile);
        else if (name === 'profileImageUrl') setProfileImage(imageFile);
        else setPhoto(imageFile);

        // 업로드를 순차적으로 수행 (동기 처리)
        await handleGetFileUploadPath(name, imageFile);
      }
    } catch (error) {
      console.error('압축 또는 업로드 실패:', error);
    }
  };

  // ✅ S3 파일 업로드 함수 (State 변경 감지하여 자동 실행)
  const handleGetFileUploadPath = async (imageType, file) => {
    let res, url, imageId;
    try {
      if (
        !file ||
        typeof file !== 'object' ||
        !file.originalFile ||
        !(file.originalFile instanceof Blob) // File도 Blob의 하위
      ) {
        alert('유효하지 않은 파일입니다.');
        return;
      }

      setIsUploading(true);

      // 1️⃣ Presigned URL 요청
      const type = getFileType(file.originalFile.type);
      const presignedResponse = await postRequestPresignedUrl(type);
      const { data } = presignedResponse.data;
      url = data.completedUrl; // 업로드 완료 후 접근할 URL
      imageId = updatePhotoId || '';

      // 2️⃣ S3에 파일 업로드
      const response = await fetch(data.url, {
        method: 'PUT',
        body: file.originalFile,
        headers: { 'Content-Type': file.originalFile.type },
      });

      if (!response.ok)
        throw new Error(`업로드 실패: ${file.originalFile.name}`);

      // ✅ State 업데이트 전, 최신 profile 가져오기
      if (imageType !== 'photo' || imageType !== 'updatePhoto') {
        setProfile((prevProfile) => {
          const updatedProfile = { ...prevProfile }; // 새로운 객체 생성

          if (imageType === 'backgroundImageUrl') {
            updatedProfile.backgroundImageUrl = url;
          } else if (imageType === 'profileImageUrl') {
            updatedProfile.profileImageUrl = url;
          }
          return updatedProfile; // 변경된 객체 반환
        });
      }

      if (imageType === 'backgroundImageUrl') {
        res = await putProfileBackgroundImage(profileId, {
          backgroundImageUrl: url,
        });
      } else if (imageType === 'profileImageUrl') {
        res = await putProfileImage(profileId, {
          profileImageUrl: url,
        });
      } else if (imageType === 'photo') {
        res = await postPhotoRegister(profileId, {
          imageUrl: url,
        });

        if (res.status === 200) {
          await fetchImages(1, false);
        }
      } else if (imageType === 'updatePhoto') {
        res = await putPhotoModify(imageId, {
          imageUrl: url,
        });
        if (res.status === 200) {
          // 선택한 이미지만 업데이트
          setImageState((prev) => ({
            ...prev,
            images: prev.images.map((image) =>
              image.id === imageId ? { ...image, url } : image
            ),
          }));
          setUpdatePhotoId('');
        }
      }
    } catch (error) {
      console.error('파일 업로드 중 오류 발생:', error);
      alert(error.message || '파일 업로드 중 오류 발생');
    } finally {
      setIsUploading(false); // 업로드 완료 표시
    }
  };

  // ReactQuill 포커스 아웃 시 이벤트 핸들러
  const handleBlur = () => {
    if (content.trim() !== '') {
      saveDescription(content); // API 호출
    }
  };

  // ReactQuill 변경 시 디바운스된 저장
  const debouncedSaveDescription = useRef(
    debounce(async (content) => {
      if (content.trim() !== '') {
        await saveDescription(content);
      }
    }, 2000) // 2초 대기
  ).current;

  // content 변경 시 디바운스된 저장 실행
  useEffect(() => {
    if (content && content.trim() !== '' && profileId) {
      debouncedSaveDescription(content);
    }
  }, [content, debouncedSaveDescription, profileId]);

  // 추모 프로필 설명 문구 저장
  const saveDescription = async (content) => {
    if (!profileId) return; // profileId가 없으면 실행하지 않음
    
    try {
      const res = await putProfileDescription(profileId, {
        description: content,
      });
    } catch (error) {
      console.error('🚨 저장 중 오류 발생:', error);
    }
  };

  //하늘편지 수정 모달창
  const handleModifyLetterConfirm = async (letterId) => {
    setLetterId(letterId);

    let res;
    res = await getLetter(profileId, letterId);
    if (res.status === 200) {
      const { data } = res.data;
      setPostLetter(data);
    }

    setIsEditModalOpen(true);
  };

  const handleUpdateAndSendLetter = async () => {
    try {
      // 이름과 내용이 공백인지 체크
      if (!postLetter.displayName.trim()) {
        alert('이름을 입력해주세요.');
        return;
      }
      if (!postLetter.content.trim()) {
        alert('내용을 입력해주세요.');
        return;
      }

      let res = await putLetters(profileId, letterId, postLetter);
      if (res.status === 200) {
        res = await getLetters(profileId);
        const { data } = res.data;
        setIsEditModalOpen(false);
        setLetters(data);
      }
      letterInit();
    } catch (err) {
      alert(`에러 발생: ${err.message}`);
    }
  };

  //하늘편지 개별 삭제 확인
  const handleRemoveLetterConfirm = async (letterId) => {
    setLetterId(letterId);
    setIsModalOpen(true);
  };

  //하늘편지 개별 삭제
  const handleLetterRemove = async () => {
    let res;
    res = await deleteLetters(profileId, letterId);
    if (res.status === 200) {
      res = await getLetters(profileId);
      const { data } = res.data;
      setIsModalOpen(false);
      setLetters(data);
    }
  };

  //비공개 계정 모달창 로그인 버튼
  const handleLoginModalOpen = async () => {
    localStorage.removeItem('dev_remberProfileUrl');
    localStorage.setItem('dev_remberProfileUrl', window.location.pathname);
    navigate('/signin');
  };

  // 비공개 접근권한 요청 입력 핸들러
  const handleFormRequestPrivateProfileChange = (e) => {
    const { name, value } = e.target;
    setFormRequestPrivateProfile((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  //비공개 프로필 접근 권한 요청
  const handleRequestPrivateProfile = async () => {
    const res = await postPrivateProfileAccessRequest(
      profileId,
      formRequestPrivateProfile
    );

    if (res.status === 201) {
      setIsRequestModalOpen(false);
      setIsRequestCompletedModalOpen(true);
    }
  };

  //하늘편지 검색
  const handleSearchLetters = async (e) => {
    const value = e.target.value;

    if (value.length > 1 || value.length === 0) {
      const res = await getLetters(profileId, value);
      if (res.status !== 200) {
        alert('하늘편지 검색 에러 발생');
      }
      const { data } = res.data;
      setLetters(data);
    }
  };

  const handleLettersChange = (e) => {
    const { name, value } = e.target;
    setPostLetter({
      ...postLetter,
      [name]: value,
    });
  };

  const handleSendLetter = async (e) => {
    e.preventDefault();
    try {
      // 이름과 내용이 공백인지 체크
      if (!postLetter.displayName.trim()) {
        alert('이름을 입력해주세요.');
        return;
      }
      if (!postLetter.content.trim()) {
        alert('내용을 입력해주세요.');
        return;
      }

      let res = await postLetters(profileId, postLetter);

      if (res.status === 201) {
        setIsRegisterModalOpen(false);
        setPostLetter(initLetter);
        res = await getLetters(profileId);
        if (res.status === 200) {
          const { data } = res.data;
          setLetters(data);
        }
        letterInit();
      }
    } catch (err) {
      alert(`에러 발생: ${err.message}`);
    }
  };

  const letterInit = () => {
    setPostLetter(initLetter);
  };

  const hasAuthenticated = () => {
    if (!isAuthenticated) {
      setIsModalOpen(true);
      return;
    }
  };

  // 배경 이미지 클릭 시 모달 열기 또는 파일 선택
  const handleBackgroundImageClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (profile.backgroundImageUrl) {
      setIsBackgroundModalOpen(true);
    } else if (backImageInputRef.current) {
      backImageInputRef.current.click();
    }
  };

  const handleBackgroundDelete = async () => {
    if (!window.confirm('배경 이미지를 삭제하시겠습니까?')) return;
    
    try {
      setIsUploading(true);
      const res = await putProfileBackgroundImage(profileId, {
        backgroundImageUrl: '',
      });

      if (res.status === 200) {
        setProfile(prev => ({
          ...prev,
          backgroundImageUrl: '',
        }));
        setBackgroundImage({});
        setIsBackgroundModalOpen(false);
        // 페이지 리로드
        window.location.reload();
      }
    } catch (error) {
      console.error('배경 이미지 삭제 중 오류 발생:', error);
      alert('배경 이미지 삭제 중 오류가 발생했습니다.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      {!showScreen && <div className="blur-overlay"></div>}
      <section
        className="top-space-margin page-title-big-typography cover-background position-relative p-0 border-radius-10px lg-no-border-radius"
        style={{
          overflow: 'unset',
        }}
      >
        <div className="container">
          <div
            className="row small-screen bg-light-gray"
            style={{
              backgroundSize: 'cover',
              backgroundImage: `url(${profile.backgroundImageUrl})`,
              cursor: 'pointer',
            }}
            onClick={handleBackgroundImageClick}
            role="button"
            tabIndex={0}
            title={profile.backgroundImageUrl ? '배경 이미지 전체화면 보기' : '배경 이미지 선택'}
          >
            <div
              className="col-lg-5 col-md-6 position-relative page-title-extra-large align-self-center"
              data-anime='{ "el": "childs", "translateY": [30, 0], "opacity": [0,1], "duration": 600, "delay": 0, "staggervalue": 300, "easing": "easeOutQuad" }'
            ></div>
            <div className="col-lg-7 col-md-6 position-relative d-md-block">
              <div className="w-85px h-85px border-radius-100 d-flex align-items-center justify-content-center position-absolute right-40px md-right-10px sm-right-5px bottom-minus-70px sm-bottom-minus-80px mt-10 translate-middle-y">
                {!profile.backgroundImageUrl && (
                  <div
                    className="video-icon-box video-icon-medium feature-box-icon-rounded w-65px h-65px md-w-50px md-h-50px sm-w-40px sm-h-40px  rounded-circle d-flex align-items-center justify-content-center cursor-pointer"
                    style={{ backgroundColor: '#CDCDCD' }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (backImageInputRef.current) {
                        backImageInputRef.current.click();
                      }
                    }}
                  >
                    <span>
                      <span className="video-icon">
                        <i className="feather icon-feather-edit-1 icon-extra-medium text-white position-relative top-minus-2px m-0"></i>
                        <span className="video-icon-sonar">
                          <span className="video-icon-sonar-bfr border border-1 border-red"></span>
                        </span>
                      </span>
                    </span>
                  </div>
                )}
                {profile.backgroundImageUrl && (
                  <div
                    className="video-icon-box video-icon-medium feature-box-icon-rounded w-65px h-65px md-w-50px md-h-50px sm-w-40px sm-h-40px  rounded-circle d-flex align-items-center justify-content-center cursor-pointer"
                    style={{ backgroundColor: '#CDCDCD' }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsBackgroundModalOpen(true);
                    }}
                  >
                    <span>
                      <span className="video-icon">
                        <i className="feather icon-feather-edit-1 icon-extra-medium text-white position-relative top-minus-2px m-0"></i>
                        <span className="video-icon-sonar">
                          <span className="video-icon-sonar-bfr border border-1 border-red"></span>
                        </span>
                      </span>
                    </span>
                  </div>
                )}
                {/* 숨겨진 파일 업로드 input */}
                <input
                  ref={backImageInputRef}
                  type="file"
                  name="backgroundImageUrl"
                  accept="image/*,"
                  onChange={handleFileChange}
                  className="input-file-background-upload"
                  style={{ display: 'none' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="p-0"
        // style="background-image: url(https://via.placeholder.com/1920x600)"
      >
        <div className="container ">
          <div className="row row-cols-1 row-cols-lg-4 row-cols-sm-2">
            <div
              className="col-lg-12 col-md-12 position-relative page-title-extra-large align-self-center"
              data-anime='{ "el": "childs", "translateY": [30, 0], "opacity": [0,1], "duration": 600, "delay": 0, "staggervalue": 300, "easing": "easeOutQuad" }'
            >
              <div className="col-2 process-step-style-03 text-center last-paragraph-no-margin hover-box">
                <div className="process-step-icon-box position-relative mb-20px">
                  <div className="d-inline-block position-absolute overflow-hidden border-radius-100 progress-image md-left-0px w-180px md-w-120px h-180px md-h-120px top-minus-90px sm-w-80px sm-h-80px sm-top-minus-50px md-start-0 cursor-pointer"
                    onClick={handleProfileImageClick}
                    title={profile.profileImageUrl ? '프로필 이미지 전체화면 보기' : '프로필 이미지 선택'}
                  >
                    <img
                      src={
                        profile.profileImageUrl
                          ? profile.profileImageUrl
                          : avatarImage
                      }
                      alt=""
                      loading="lazy"
                    />

                    { !profile.profileImageUrl && (
                      <>
                        <div
                          className="box-overlay"
                          style={{ backgroundColor: '#CDCDCD' }}
                        ></div>
                        <span className="number icon-extra-large text-text absolute-middle-center">
                          <i className="feather icon-feather-edit-1 icon-icon-extra-medium text-white"></i>
                        </span>
                      </>
                    )}
                    {/* 숨겨진 파일 업로드 input */}
                    <input
                      ref={profileImageInputRef}
                      type="file"
                      name="profileImageUrl"
                      accept="image/*,"
                      onChange={handleFileChange}
                      className="input-file-upload"
                      style={{ display: 'none' }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-9 offset-3 ps-2 md-ps-30px sm-ps-20px">
                <h5
                  className="text-dark-gray mb-5px fw-600 sm-fs-20 ellipsis-name"
                  title={profile.displayName}
                >
                  {profile.displayName}
                </h5>
                <h6 className="mb-0 sm-fs-18">
                  {profile.birthday ? formatDateRelace(profile.birthday) : ''}
                  {profile.birthday && profile.deathDate && ' ~ '}
                  {profile.deathDate ? formatDateRelace(profile.deathDate) : ''}
                </h6>
              </div>
              {showScreen && (
                <div
                  className={
                    profile.birthday && profile.deathDate
                      ? 'row position-absolute md-position-initial bottom-minus-60px end-0 z-index-1 pe-1'
                      : 'row position-absolute md-position-initial bottom-minus-95px end-0 z-index-1 pe-1'
                  }
                >
                  {/* <div className="col-xl-10 col-lg-12 col-sm-7 lg-mb-30px md-mb-0"></div> */}
                  <div
                    className="xs-mt-25px d-flex flex-lg-column flex-md-row justify-content-md-center gap-lg-0 gap-md-4 gap-sm-5 sm-px-20px py-lg-0 py-md-4"
                    style={{
                      display: 'inline-block',
                    }}
                  >
                    <WebShareButton />
                    <Link
                      className="btn btn-extra-large btn-switch-text btn-box-shadow btn-none-transform btn-white left-icon btn-round-edge border-0 me-5px xs-me-0 w-100 md-w-50 mb-5 md-mb-2"
                      to={`/profile/manage-profile/${profileId}`}
                    >
                      <span>
                        <span>
                          <i className="feather icon-feather-users"></i>
                        </span>
                        <span
                          className="btn-double-text ls-0px"
                          data-text="초대하기"
                        >
                          초대하기
                        </span>
                      </span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="pt-60px md-pt-0 pb-0">
        <div className="container">
          <div className="row bottom-minus-60px end-0 z-index-1 pe-1 d-flex flex-column">
            {/* <div className="col-xl-10 col-lg-12 col-sm-7 lg-mb-30px md-mb-0"></div> */}
            <div className="xs-mt-25px d-flex justify-content-center h-200px md-h-300px">
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                onBlur={handleBlur}
                modules={modules}
                formats={formats}
                className="w-700px md-w-95 md-h-450px lh-initial"
              />
            </div>
            <div className="mt-80px md-mt-0 sm-mt-30px text-center">
              <Link
                className="btn btn-extra-large btn-switch-text btn-box-shadow btn-none-transform btn-base-color left-icon xs-me-0 w-40 sm-w-95 border-radius-15px"
                onClick={handleBlur}
              >
                <span>
                  <span className="btn-double-text ls-0px" data-text="저장">
                    저장
                  </span>
                </span>
              </Link>
            </div>

            <div className="mt-30px md-mt-20px sm-mt-20px d-flex justify-content-evenly justify-content-md-center gap-2">
              <Link
                className="btn btn-extra-large btn-switch-text btn-box-shadow btn-none-transform btn-gray left-icon btn-round-edge border-0 xs-me-0 w-20 md-w-45 mb-5 border-radius-30px"
                onClick={handleNavigate}
              >
                <span>
                  <span className="btn-double-text ls-0px" data-text="설정">
                    설정
                  </span>
                </span>
              </Link>
              <Link
                className="btn btn-extra-large btn-switch-text btn-box-shadow btn-none-transform btn-gray left-icon btn-round-edge border-0 xs-me-0 w-20 md-w-45 mb-5 border-radius-30px"
                onClick={handlePreview}
              >
                <span>
                  <span className="btn-double-text ls-0px" data-text="미리보기">
                    미리보기
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {showScreen && (
        <section id="tab" className="pt-0 md-pt-20px md-pb-70px">
          <div className="container">
            <div className="row">
              <div className="col-12 tab-style-04">
                <ul className="nav nav-tabs border-0 justify-content-center fs-20">
                  {['이미지', '하늘편지', '가족관계도'].map((tab) => (
                    <li key={tab} className="nav-item text-center">
                      <button
                        className={`nav-link ${
                          activeTab === tab
                            ? 'active text-base-color d-inline-block'
                            : 'd-inline-block'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveTab(tab);
                        }}
                      >
                        {tab}
                        <span className="tab-border bg-base-color"></span>
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="mb-5 h-1px w-100 bg-extra-medium-gray xs-mb-8"></div>
                <div className="tab-content">
                  {activeTab === '이미지' && (
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
                        onInit={onInit}
                        ref={lgRef}
                        // 모바일에서 닫기 버튼 표시를 위한 설정 (다른 페이지와 동일)
                        mobileSettings={{
                          controls: true,
                          showCloseIcon: true,
                        }}
                        // DOM 조작 최소화를 위한 설정
                        allowMediaOverlap={false}
                        backdropDuration={400}
                        startAnimationDuration={400}
                        endAnimationDuration={400}
                      >
                        <div className="gallery-grid">
                          {/* 업로드 버튼 */}
                          <div
                            onClick={handleUploadClick}
                            style={{
                              // width: '30%',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor: '#f0f0f0',
                              cursor: 'pointer',
                              border: '2px dashed #ccc',
                              // marginBottom: '10px',
                            }}
                            className={`gallery-grid-item ${
                              !imageState.images.length
                                ? 'gallery-item-frist'
                                : ''
                            }`}
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

                          {/* 이미지 썸네일 */}
                          {imageState.images.map((image, index) => (
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
                    </div>
                  )}
                  {activeTab === '하늘편지' && (
                    <div className="w-100 sm-mt-10px xs-mb-8 my-5">
                      <div className="row m-0">
                        <div className="col-12 p-0">
                          {/* 검색창 + 추가 버튼 */}
                          <div className="toolbar-wrapper w-100 mb-40px md-mb-30px">
                            <div className="mx-auto me-md-0 col tab-style-08">
                              <ul className="nav nav-tabs d-flex justify-content-between border-0 fs-18 fw-600 gap-2">
                                <li className="nav-item">
                                  <div className="position-relative">
                                    <input
                                      className="border-1 nav-link w-400px md-w-100"
                                      type="text"
                                      name="keyword"
                                      onChange={handleSearchLetters}
                                      placeholder="검색어를 입력 해주세요."
                                    />
                                    <i className="feather icon-feather-search align-middle icon-small position-absolute z-index-1 search-icon"></i>
                                  </div>
                                </li>
                                <li className="nav-item">
                                  <a
                                    className="nav-link"
                                    data-bs-toggle="tab"
                                    href="#tab_sec2"
                                    onClick={() => {
                                      if (isAuthenticated) {
                                        setIsRegisterModalOpen(true);
                                      } else {
                                        hasAuthenticated();
                                      }
                                    }}
                                  >
                                    <i className="fa-regular fa-comment-dots align-middle icon-small pe-10px"></i>
                                    하늘 편지 쓰기
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>

                          {/* 하늘편지 리스트 */}
                          {letters.length > 0 ? (
                            letters.map((letter, index) => (
                              <div
                                key={letter.letterId}
                                className={`row border-color-dark-gray position-relative g-0 sm-border-bottom-0 md-p-5 ${
                                  index % 2
                                    ? 'paper-note-odd'
                                    : 'paper-note-even'
                                }`}
                              >
                                <div className="col-12 d-flex justify-content-between align-items-center px-4 pt-2 pb-1">
                                  <span className="text-dark-gray fs-16 fw-600">
                                    {letter.displayName}
                                  </span>
                                  <div className="d-flex">
                                    {letter.hasDeletePermission && (
                                      <span
                                        className="cursor-pointer me-4"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          handleRemoveLetterConfirm(
                                            letter.letterId
                                          );
                                        }}
                                      >
                                        <i className="feather icon-feather-trash-2 align-middle text-dark-gray icon-extra-medium"></i>
                                      </span>
                                    )}
                                    {letter.hasModifyPermission && (
                                      <span
                                        className="cursor-pointer"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          handleModifyLetterConfirm(
                                            letter.letterId
                                          );
                                        }}
                                      >
                                        <i className="ti-pencil align-middle text-dark-gray icon-extra-medium"></i>
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="col-12 px-4 pb-1">
                                  <span className="text-dark-gray fs-14">{letter.createdAt}</span>
                                </div>
                                <div className="col-12 px-4 pb-3">
                                  <p className="m-0" dangerouslySetInnerHTML={{ __html: letter.content.replace(/\n/g, '<br />') }}></p>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="col-12 text-center mt-100px pb-2 fs-24">
                              <i className="line-icon-Letter-Open align-middle icon-extra-large text-light-gray pb-1"></i>
                              <p>등록된 하늘편지가 없습니다.</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === '가족관계도' && (
                    <div className="w-100 sm-mt-10px xs-mb-8 my-5">
                      <div className="row">
                        <div className="row align-items-center m-0">
                          <div className="col-xl-12 col-lg-10 col-md-12 col-sm-5 form-results d-block mt-20px mb-mt-0 sm-mt-0 mb-0 text-center">
                            <p className="text-black fs-18 md-fs-14 sm-fs-12">
                              가족 관계도
                              <br />
                              아래 가족을 추가하고 드래그로 순서를 바꿔보세요.
                            </p>
                          </div>
                        </div>
                        <div className="row  align-items-center">
                          <div className="col-xl-10 col-lg-10 col-md-12 col-sm-5 text-end text-sm-center text-lg-end mb-25px pe-0">
                            <Button
                              className="btn btn-black btn-round-edge btn-box-shadow text-uppercase px-3 pt-5px pb-5px"
                              size="small"
                              onClick={handleAddItem}
                            >
                              <i className="feather icon-feather-plus align-sub text-white icon-extra-medium"></i>
                              가족 추가하기
                            </Button>
                          </div>
                        </div>

                        <DragDropContext onDragEnd={onDragEnd}>
                          <Droppable droppableId="list">
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                              >
                                {family.map((f, index) => (
                                  <Draggable
                                    key={index}
                                    draggableId={`draggable-${index}`} // 숫자가 아닌 문자열로 변환
                                    index={index}
                                  >
                                    {(provided) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className="sortable-item text-center list-item"
                                      >
                                        <div className="row border-color-dark-gray position-relative g-0 sm-border-bottom-0 sm-pb-5px ps-200px pe-200px md-ps-0 md-pe-0">
                                          <div className="col-auto col-md-1 text-md-center align-self-center">
                                            <i className="bi bi-grip-vertical align-middle icon-extra-medium text-gray md-fs-18"></i>
                                          </div>

                                          {/* 관계 선택 */}
                                          <div className="col-12 col-md-3 text-md-center align-self-center pt-1">
                                            {f.isCustomInput ? (
                                              <input
                                                className="border-color-transparent-dark-very-light form-control bg-transparent md-pt-0 md-pb-0 required"
                                                type="text"
                                                value={f.familyTitle}
                                                onChange={(e) =>
                                                  handleCustomInputChange(
                                                    index,
                                                    e.target.value
                                                  )
                                                }
                                              />
                                            ) : (
                                              <select
                                                className="form-control border-color-transparent-dark-very-light bg-transparent md-pt-0 md-pb-0"
                                                value={f.familyTitle}
                                                onChange={(e) =>
                                                  handleSelectChange(
                                                    index,
                                                    e.target.value
                                                  )
                                                }
                                              >
                                                <option value="">
                                                  - 선택 -
                                                </option>
                                                <option value="아버지">
                                                  아버지
                                                </option>
                                                <option value="어머니">
                                                  어머니
                                                </option>
                                                <option value="아들">
                                                  아들
                                                </option>
                                                <option value="딸">딸</option>
                                                <option value="직접 입력">
                                                  직접 입력
                                                </option>
                                              </select>
                                            )}
                                          </div>

                                          {/* 이름 입력 필드 */}
                                          <div className="col-lg-6 col-md-7 last-paragraph-no-margin ps-30px pe-30px pe-30px pt-10px sm-pt-15px sm-pb-15px sm-px-0">
                                            <input
                                              maxLength={10}
                                              className="md-mb-0 border-color-transparent-dark-very-light form-control bg-transparent required md-pt-0 md-pb-0"
                                              type="text"
                                              placeholder="이름을 입력해주세요."
                                              value={f.displayName}
                                              onChange={(e) =>
                                                handleNameChange(
                                                  index,
                                                  e.target.value
                                                )
                                              }
                                            />
                                          </div>

                                          {/* 삭제 아이콘 */}
                                          <div className="col-auto col-md-1 align-self-start align-self-md-center text-end text-md-center sm-position-absolute right-5px">
                                            <button
                                              onClick={() =>
                                                handleFailyDelete(index)
                                              }
                                              className="btn btn-link"
                                            >
                                              <i className="feather icon-feather-trash-2 align-middle text-dark-gray icon-extra-medium md-fs-18"></i>
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </Draggable>
                                ))}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        </DragDropContext>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="w-100">
          <div className="modal-content p-0 rounded shadow-lg">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="p-10 sm-p-7 bg-white">
                  <div className="row justify-content-center">
                    <div className="col-md-9 text-center">
                      <h6 className="text-dark-gray fw-500 mb-15px">
                        삭제 하시겠습니까?
                      </h6>
                    </div>
                    <div className="col-lg-12 text-center text-lg-center pt-3">
                      <input type="hidden" name="redirect" value="" />

                      <Button
                        className="btn btn-black btn-medium btn-box-shadow btn-round-edge submit me-1"
                        onClick={handleLetterRemove}
                      >
                        삭제
                      </Button>
                      <Button
                        className="btn btn-white btn-medium btn-box-shadow btn-round-edge submit me-1"
                        onClick={() => setIsModalOpen(false)}
                      >
                        닫기
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      >
        <div className="w-100">
          <div className="modal-content p-0 rounded shadow-lg">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="p-5 sm-p-7 bg-white">
                  <div className="row justify-content-center">
                    <div className="col-md-9 text-center">
                      <h6 className="text-dark-gray fw-500 mb-15px">
                        비공개 계정입니다.
                      </h6>
                      <p>로그인 후 프로필 초대 요청이 필요합니다.</p>
                    </div>
                    <div className="col-lg-12 text-center text-lg-center pt-3">
                      <input type="hidden" name="redirect" value="" />

                      <Button
                        radiusOn="radius-on"
                        className="btn btn-base-color btn-large btn-box-shadow btn-round-edge me-1 w-50"
                        onClick={handleLoginModalOpen}
                      >
                        로그인
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
      >
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="p-7 lg-p-5 sm-p-7 bg-gradient-very-light-gray">
              <div className="row justify-content-center mb-30px sm-mb-10px">
                <div className="col-md-9 text-center">
                  <h6 className="text-dark-gray fw-500 mb-15px">
                    비공개 계정 요청하기
                  </h6>
                  <button
                    type="button"
                    className="btn-close position-absolute top-10px right-10px"
                    onClick={() => setIsRequestModalOpen(false)}
                  ></button>
                </div>
              </div>
              <form className="row">
                <div className="col-12 mb-20px ">
                  <label className="fw-bold">이름</label>
                  <input
                    className="border-radius-15px input-large mb-5px"
                    type="text"
                    name="name"
                    placeholder="이름을 입력해 주세요."
                    value={formRequestPrivateProfile.name}
                    onChange={handleFormRequestPrivateProfileChange}
                    required
                  />
                  {/* {errors.displayName && (
                    <p className="text-danger text-start">
                      이름을 입력 하셔야 됩니다.
                    </p>
                  )} */}
                </div>
                <div className="col-12 mb-20px ">
                  <label className="fw-bold">메모</label>
                  <textarea
                    className="border-radius-15px form-control"
                    cols="40"
                    rows="4"
                    name="memo"
                    value={formRequestPrivateProfile.memo}
                    onChange={handleFormRequestPrivateProfileChange}
                    placeholder="비공개 계정 방문을 위해 본인을 알릴 수 있는 메모를 입력해 주세요."
                  ></textarea>
                  {/* {errors.memo && (
                    <p className="text-danger text-start">
                      받는분 이름을 추가 해주세요.
                    </p>
                  )} */}
                </div>

                <div className="col-lg-112 text-center text-lg-center">
                  <input type="hidden" name="redirect" value="" />

                  <Button
                    radiusOn="radius-on"
                    className="btn btn-base-color btn-medium btn-box-shadow btn-round-edge me-1 w-100 mb-3"
                    onClick={handleRequestPrivateProfile}
                  >
                    보내기
                  </Button>
                  <Button
                    radiusOn="radius-on"
                    className="btn btn-white btn-medium btn-box-shadow btn-round-edge me-1 w-100"
                    onClick={() => navigate('/profile')}
                  >
                    나의 프로필 리스트
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isRequestCompletedModalOpen}
        onClose={() => setIsRequestCompletedModalOpen(false)}
      >
        <div className="w-100">
          <div className="modal-content p-0 rounded shadow-lg">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="p-5 sm-p-7 bg-white">
                  <div className="row justify-content-center">
                    <div className="col-md-9 text-center">
                      <h6 className="text-dark-gray fw-500 mb-15px">
                        요청이 완료되었습니다.
                      </h6>
                      <p className="m-0">초대 승인을 기다려주세요.</p>
                      <p className="p-0">감사합니다.</p>
                    </div>
                    <div className="col-lg-12 text-center text-lg-center pt-3">
                      <input type="hidden" name="redirect" value="" />

                      <Button
                        radiusOn="radius-on"
                        className="btn btn-base-color btn-large btn-box-shadow btn-round-edge me-1 w-50"
                        onClick={() => navigate('/profile')}
                      >
                        접속하기
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      >
        <div className="w-100">
          <div className="modal-content p-0 rounded shadow-lg">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="p-7 lg-p-5 sm-p-7 bg-gradient-very-light-gray">
                  <div className="row justify-content-center mb-30px sm-mb-10px">
                    <div className="col-md-9 text-center">
                      <h4 className="text-dark-gray fw-500 mb-15px">
                        하늘편지 남기기
                      </h4>
                    </div>
                  </div>
                  <form className="row">
                    <div className="col-12 mb-20px ">
                      <label className="mb-10px">이름</label>
                      <input
                        className="border-radius-4px input-large mb-5px"
                        type="text"
                        name="displayName"
                        value={postLetter.displayName}
                        onChange={handleLettersChange}
                        required
                      />
                      {/* {errors.deliveryName && (
                    <p className="text-danger text-start">
                      배송지 이름을 추가 해주세요.
                    </p>
                  )} */}
                    </div>
                    <div className="col-12 mb-20px ">
                      <label className="mb-10px">내용</label>
                      <textarea
                        className="border-radius-4px textarea-small"
                        name="content"
                        rows="5"
                        cols="5"
                        value={postLetter.content}
                        onChange={handleLettersChange}
                        placeholder=""
                      ></textarea>
                      {/* {errors.recipientName && (
                    <p className="text-danger text-start">
                      받는분 이름을 추가 해주세요.
                    </p>
                  )} */}
                    </div>

                    <div className="col-lg-112 text-center text-lg-center">
                      <input type="hidden" name="redirect" value="" />

                      <Button
                        className="btn btn-black btn-box-shadow btn-round-edge border-0  me-1"
                        onClick={handleSendLetter}
                      >
                        남기기
                      </Button>

                      <Button
                        className="btn btn-white btn-box-shadow btn-round-edge border-1  me-1"
                        onClick={(e) => {
                          e.preventDefault();
                          setIsRegisterModalOpen(false);
                          letterInit();
                        }}
                      >
                        닫기
                      </Button>
                    </div>

                    {/* <AddressSearch onComplete={setSelectedAddress} />
                          <p>선택된 주소: {selectedAddress}</p> */}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="p-7 lg-p-5 sm-p-7 bg-gradient-very-light-gray">
              <div className="row justify-content-center mb-30px sm-mb-10px">
                <div className="col-md-9 text-center">
                  <h4 className="text-dark-gray fw-500 mb-5px">
                    하늘편지 수정하기
                  </h4>
                </div>
              </div>
              <form className="row">
                <div className="col-12">
                  <label className="mb-10px">이름</label>
                  <input
                    className="border-radius-4px input-large mb-5px"
                    type="text"
                    name="displayName"
                    value={postLetter.displayName}
                    onChange={handleLettersChange}
                    required
                  />
                  {/* {errors.deliveryName && (
                    <p className="text-danger text-start">
                      배송지 이름을 추가 해주세요.
                    </p>
                  )} */}
                </div>
                <div className="col-12">
                  <label className="mb-10px">내용</label>
                  <textarea
                    className="border-radius-4px textarea-small"
                    name="content"
                    rows="5"
                    cols="5"
                    value={postLetter.content}
                    onChange={handleLettersChange}
                    placeholder=""
                  ></textarea>
                  {/* {errors.recipientName && (
                    <p className="text-danger text-start">
                      받는분 이름을 추가 해주세요.
                    </p>
                  )} */}
                </div>

                <div className="col-lg-12 text-center text-lg-center">
                  <input type="hidden" name="redirect" value="" />

                  <Button
                    className="btn btn-black btn-medium btn-box-shadow btn-round-edge submit me-1"
                    onClick={handleUpdateAndSendLetter}
                  >
                    수정하기
                  </Button>

                  <Button
                    className="btn btn-white btn-medium btn-box-shadow btn-round-edge submit me-1"
                    onClick={() => {
                      setIsEditModalOpen(false);
                      letterInit();
                    }}
                  >
                    닫기
                  </Button>
                </div>

                {/* <AddressSearch onComplete={setSelectedAddress} />
                          <p>선택된 주소: {selectedAddress}</p> */}
              </form>
            </div>
          </div>
        </div>
      </Modal>
      {isUploading && (
        <div className="uploading-overlay">
          <div className="spinner" />
          <p>이미지를 업로드 중입니다...</p>
        </div>
      )}

      <Modal isOpen={isBackgroundModalOpen} onClose={() => setIsBackgroundModalOpen(false)}>
        <div style={{
          background: '#000',
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 99999,
          borderRadius: 0,
          padding: 0,
        }}>
          {/* LightGallery 스타일 상단 바 */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',
            height: '56px',
            background: 'rgba(34, 34, 34, 0.92)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '0 32px',
            zIndex: 100000,
            boxSizing: 'border-box',
          }}>
            <button
              onClick={handleBackUploadClick}
              style={{ background: 'none', color: '#fff', border: 'none', fontSize: '18px', cursor: 'pointer', marginRight: '24px', fontWeight: 500, letterSpacing: '1px' }}
            >
              수정
            </button>
            {/* 숨겨진 파일 업로드 input */}
            <input
              ref={backImageInputRef}
              type="file"
              name="backgroundImageUrl"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <button
              onClick={handleBackgroundDelete}
              style={{ background: 'none', color: '#fff', border: 'none', fontSize: '18px', cursor: 'pointer', marginRight: '24px', fontWeight: 500, letterSpacing: '1px' }}
            >
              삭제
            </button>
            <button
              onClick={() => setIsBackgroundModalOpen(false)}
              style={{ background: 'none', color: '#fff', border: 'none', fontSize: '28px', cursor: 'pointer', fontWeight: 700, lineHeight: 1 }}
              aria-label="닫기"
            >
              ×
            </button>
          </div>
          <img
            src={profile.backgroundImageUrl}
            alt="배경 전체 이미지"
            style={{
              maxWidth: '100vw',
              maxHeight: '100vh',
              objectFit: 'contain',
              borderRadius: 0,
              background: '#000',
              margin: 0,
              padding: 0,
              display: 'block',
            }}
          />
        </div>
      </Modal>

      {/* 프로필 이미지 모달 */}
      <Modal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)}>
        <div style={{
          background: '#000',
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 99999,
          borderRadius: 0,
          padding: 0,
        }}>
          {/* LightGallery 스타일 상단 바 */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',
            height: '56px',
            background: 'rgba(34, 34, 34, 0.92)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '0 32px',
            zIndex: 100000,
            boxSizing: 'border-box',
          }}>
            <button
              onClick={handleProfileUploadClick}
              style={{ background: 'none', color: '#fff', border: 'none', fontSize: '18px', cursor: 'pointer', marginRight: '24px', fontWeight: 500, letterSpacing: '1px' }}
            >
              수정
            </button>
            <button
              onClick={handleProfileDelete}
              style={{ background: 'none', color: '#fff', border: 'none', fontSize: '18px', cursor: 'pointer', marginRight: '24px', fontWeight: 500, letterSpacing: '1px' }}
            >
              삭제
            </button>
            <button
              onClick={() => setIsProfileModalOpen(false)}
              style={{ background: 'none', color: '#fff', border: 'none', fontSize: '28px', cursor: 'pointer', fontWeight: 700, lineHeight: 1 }}
              aria-label="닫기"
            >
              ×
            </button>
          </div>
          <img
            src={profile.profileImageUrl}
            alt="프로필 전체 이미지"
            style={{
              maxWidth: '100vw',
              maxHeight: '100vh',
              objectFit: 'contain',
              borderRadius: 0,
              background: '#000',
              margin: 0,
              padding: 0,
              display: 'block',
            }}
          />
        </div>
      </Modal>

      {/* Hidden file inputs */}
      <input
        type="file"
        ref={profileImageInputRef}
        onChange={handleFileChange}
        name="profileImageUrl"
        accept="image/*"
        style={{ display: 'none' }}
      />
      <input
        type="file"
        ref={backImageInputRef}
        onChange={handleFileChange}
        name="backgroundImageUrl"
        accept="image/*"
        style={{ display: 'none' }}
      />

      {/* Background Image Modal */}
      {isBackgroundModalOpen && (
        <div className="modal-overlay" onClick={() => setIsBackgroundModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>배경 이미지</h3>
              <button onClick={() => setIsBackgroundModalOpen(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="modal-image-container">
                <img src={profile.backgroundImageUrl} alt="Background" />
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={handleBackgroundDelete} disabled={isUploading}>
                {isUploading ? '삭제 중...' : '삭제'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// // CSS 스타일
// const galleryStyle = {
//   display: 'grid',
//   gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
//   gap: '10px',
// };

// const imageStyle = {
//   width: '100%',
//   height: 'auto',
//   cursor: 'pointer',
// };

// 버튼 스타일
const customButtonStyle = `
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

export default EditProfilePage;
