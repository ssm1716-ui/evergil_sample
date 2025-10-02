import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { debounce } from 'lodash';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-fullscreen.css';
import 'lightgallery/css/lg-zoom.css';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import Button from '@/components/common/Button/Button';
import Modal from '@/components/common/Modal/Modal';
import Confirm from '@/components/common/Modal/Confirm';
import WebShareButton from '@/components/Share/WebShareButton';
import { MdAddPhotoAlternate } from 'react-icons/md';
import { formatDateRelace, getFileType } from '@/utils/utils';
import { compressImage } from '@/utils/imageCompressor';
import { postRequestPresignedUrl } from '@/api/fileupload/uploadApi';
import useProfilePermission from '@/hooks/useProfilePermission';
import { suppressDeprecationWarnings } from '@/utils/consoleSuppression';
import '../../styles/profile-custom.css'

// 컴포넌트 imports
import ProfileImageModal from '@/components/Profile/Modals/ProfileImageModal';
import LetterModal from '@/components/Profile/Modals/LetterModal';
import ConfirmModals from '@/components/Profile/Modals/ConfirmModals';

import {
  getSelectProfile,
  postPrivateProfileAccessRequest,
  postAddProfileBookmark,
  deleteBookmarksProfile,
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
  deleteLetters,
  getFamilyProfile,
  putFamilyProfile,
  getProfileIdByNickname
} from '@/api/memorial/memorialApi';

import avatarImage from '@/assets/images/base-profile-image.png';

// ReactQuill 설정
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
  'header', 'bold', 'italic', 'underline', 'strike', 'list', 'bullet',
  'script', 'indent', 'color', 'background', 'align',
];

const initFormPrivateProfile = {
  name: '',
  memo: '',
};

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

const UnifiedProfilePage = ({ mode = 'auto' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { profileId: urlProfileId, nickname } = useParams();
  
  const [profileId, setProfileId] = useState(urlProfileId);
  const [profile, setProfile] = useState({});
  const [result, setResult] = useState('');
  const [content, setContent] = useState('');
  const [activeTab, setActiveTab] = useState('이미지');
  const [tabList, setTabList] = useState(['이미지', '하늘편지']);
  const [hasFamilyTree, setHasFamilyTree] = useState(false);

  const [imageState, setImageState] = useState({
    images: [],
    page: 1,
    hasNext: true,
    initialized: false,
  });
  const [isFetching, setIsFetching] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [updatePhotoId, setUpdatePhotoId] = useState('');
  const [updatePhoto, setUpdatePhoto] = useState({});
  const [galleryKey, setGalleryKey] = useState(0);

  const initLetter = { displayName: '', content: '' };
  const [letters, setLetters] = useState([]);
  const [letterId, setLetterId] = useState('');
  const [postLetter, setPostLetter] = useState(initLetter);
  const [isSearching, setIsSearching] = useState(false);

  const [family, setFamily] = useState([]);
  const [isLoadingFamilyData, setIsLoadingFamilyData] = useState(false);
  const [familyDataLoaded, setFamilyDataLoaded] = useState(false);

  const [isBookmarks, setIsBookmarks] = useState(false);

  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isRequestCompletedModalOpen, setIsRequestCompletedModalOpen] = useState(false);
  const [formRequestPrivateProfile, setFormRequestPrivateProfile] = useState(initFormPrivateProfile);
  const [isBackgroundModalOpen, setIsBackgroundModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isProfileDeleteConfirmOpen, setIsProfileDeleteConfirmOpen] = useState(false);
  const [isImageDeleteConfirmOpen, setIsImageDeleteConfirmOpen] = useState(false);
  const [isBackgroundDeleteConfirmOpen, setIsBackgroundDeleteConfirmOpen] = useState(false);
  const [deleteImageId, setDeleteImageId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const lgRef = useRef(null);
  const fileInputRef = useRef(null);
  const backImageInputRef = useRef(null);
  const profileImageInputRef = useRef(null);
  const searchTimeoutRef = useRef(null);
  const hasMountedRef = useRef(false);
  const imagesRef = useRef([]);

  const {
    isLoginModalOpen,
    setIsLoginModalOpen,
    isRequestModalOpen,
    setIsRequestModalOpen,
    showScreen,
    currentPermission,
  } = useProfilePermission(profileId, { shouldRedirect: false, nickname });

  const handleSearchLetters = useCallback(async (searchValue) => {
    if (!profileId) return;
    setIsSearching(true);
    try {
      const res = await getLetters(profileId, searchValue);
      if (res.status === 200) {
        setLetters(res.data.data);
      }
    } catch (error) {
      console.error('하늘편지 검색 중 오류 발생:', error);
    } finally {
      setIsSearching(false);
    }
  }, [profileId]);

  const debouncedSaveFamily = useRef(
    debounce(async (profileId, familyData) => {
      if (!familyData || familyData.length === 0) return;
      const validFamily = familyData.filter(
        (item) => item.familyTitle.trim() !== '' && item.displayName.trim() !== ''
      );
      try {
        await putFamilyProfile(profileId, validFamily);
      } catch (error) {
        console.error(error);
      }
    }, 500)
  ).current;

  const getPageMode = () => {
    if (!showScreen) return 'loading';
    const isOwner = result === 'PUBLIC_PROFILE_OWNER' || result === 'YOU_HAVE_OWNER_PERMISSION';
    const isEditor = result === 'PUBLIC_PROFILE_EDITOR' || result === 'YOU_HAVE_EDITOR_PERMISSION';
    if (isOwner || isEditor) return 'edit';
    if (currentPermission === 'PUBLIC_PROFILE' || currentPermission === 'YOU_HAVE_VIEWER_PERMISSION') {
      return 'view';
    }
    return 'view';
  };

  const pageMode = getPageMode();

  useEffect(() => {
    suppressDeprecationWarnings();
  }, []);

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    imagesRef.current = imageState.images;
  }, [imageState.images]);

  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = customButtonStyle;
    document.head.appendChild(styleElement);
  }, []);

  useEffect(() => {
    const fetchProfileId = async () => {
      if (nickname) {
        try {
          const cleanNickname = nickname.startsWith('@') ? nickname.substring(1) : nickname;
          const res = await getProfileIdByNickname(cleanNickname);
          if (res && res.status === 200) {
            setProfileId(res.data.data.profileId);
          } else {
            navigate('/error-profile-not-found');
          }
        } catch (error) {
          console.error(error);
          navigate('/error-profile-not-found');
        }
      }
    };
    fetchProfileId();
  }, [nickname, navigate]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!profileId) return;
      try {
        const res = await getSelectProfile(profileId);
        if (res.status === 200) {
          const { profile, extension, result } = res.data.data;
          if (result === 'PROFILE_INACTIVE') {
            navigate('/error-profile-inactive');
            return;
          }
          setResult(result);
          setProfile(profile);
          setContent(profile.description || '');
          if (extension) {
            if (pageMode === 'view') {
              setIsBookmarks(extension.isBookmarked);
            }
            const isOwnerOrEditor = result === 'PUBLIC_PROFILE_OWNER' || 
                                    result === 'YOU_HAVE_OWNER_PERMISSION' ||
                                    result === 'PUBLIC_PROFILE_EDITOR' || 
                                    result === 'YOU_HAVE_EDITOR_PERMISSION';
            setHasFamilyTree(isOwnerOrEditor || extension.hasFamilyTree);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (showScreen && profileId) {
      fetchProfile();
    }
  }, [profileId, showScreen, navigate, location.pathname]);

  useEffect(() => {
    if (hasFamilyTree) {
      setTabList(['이미지', '하늘편지', '가족관계도']);
    } else {
      setTabList(['이미지', '하늘편지']);
    }
  }, [hasFamilyTree]);

  useEffect(() => {
    const fetchTabData = async () => {
      if (!profileId) return;
      try {
        let res;
        if (activeTab === '하늘편지') {
          res = await getLetters(profileId);
          if (res.status === 200) {
            setLetters(res.data.data);
          }
        }
        if (activeTab === '가족관계도') {
          setIsLoadingFamilyData(true);
          try {
            res = await getFamilyProfile(profileId);
            if (res.status === 200) {
              setFamily(res.data.data.items);
              setFamilyDataLoaded(true);
            }
          } finally {
            setIsLoadingFamilyData(false);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (showScreen && profileId) {
      fetchTabData();
    }
    if (showScreen && activeTab === '이미지' && profileId) {
      fetchImages(1, false);
    }
  }, [activeTab, showScreen, profileId]);

  useEffect(() => {
    const handleScroll = () => {
      if (!profileId || isFetching || !imageState.hasNext || activeTab !== '이미지') return;
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

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    if (profileId && !isLoadingFamilyData && familyDataLoaded) {
      debouncedSaveFamily(profileId, family);
    }
  }, [family, profileId, isLoadingFamilyData, familyDataLoaded]);

  const fetchImages = async (page = 1, append = false) => {
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
    }
  };

  const handleFileChange = async (e) => {
    const { files, name } = e.target;
    if (!files || files.length === 0) return;
    try {
      for (const file of Array.from(files)) {
        const compressedFile = await compressImage(file);
        const preview = URL.createObjectURL(compressedFile);
        const imageFile = { originalFile: compressedFile, preview };
        const imageType = name || 'photo';
        await handleGetFileUploadPath(imageType, imageFile);
      }
    } catch (error) {
      console.error('압축 또는 업로드 실패:', error);
    }
  };

  const handleGetFileUploadPath = async (imageType, file) => {
    if (!file || !file.originalFile || !(file.originalFile instanceof Blob)) {
      alert('유효하지 않은 파일입니다.');
      return;
    }
    try {
      setIsUploading(true);
      const type = getFileType(file.originalFile.type);
      const presignedResponse = await postRequestPresignedUrl(type);
      const { data } = presignedResponse.data;
      const url = data.completedUrl;
      const response = await fetch(data.url, {
        method: 'PUT',
        body: file.originalFile,
        headers: { 'Content-Type': file.originalFile.type },
      });
      if (!response.ok) throw new Error(`업로드 실패: ${file.originalFile.name}`);
      if (imageType !== 'photo' && imageType !== 'updatePhoto') {
        setProfile((prevProfile) => {
          const updatedProfile = { ...prevProfile };
          if (imageType === 'backgroundImageUrl') {
            updatedProfile.backgroundImageUrl = url;
          } else if (imageType === 'profileImageUrl') {
            updatedProfile.profileImageUrl = url;
          }
          return updatedProfile;
        });
      }
      let res;
      if (imageType === 'backgroundImageUrl') {
        res = await putProfileBackgroundImage(profileId, { backgroundImageUrl: url });
      } else if (imageType === 'profileImageUrl') {
        res = await putProfileImage(profileId, { profileImageUrl: url });
      } else if (imageType === 'photo') {
        res = await postPhotoRegister(profileId, { imageUrl: url });
        if (res.status === 200) {
          await fetchImages(1, false);
        }
      } else if (imageType === 'updatePhoto') {
        const photoId = file.updateId || updatePhotoId;
        if (!photoId) throw new Error('수정할 이미지 ID가 없습니다.');
        res = await putPhotoModify(photoId, { imageUrl: url });
        if (res.status === 200) {
          await fetchImages(1, false);
          setUpdatePhotoId('');
        }
      }
    } catch (error) {
      console.error('파일 업로드 중 오류 발생:', error);
      alert(error.message || '파일 업로드 중 오류 발생');
    } finally {
      setIsUploading(false);
    }
  };

  const handleUploadClick = () => fileInputRef.current?.click();
  const handleBackUploadClick = () => backImageInputRef.current?.click();
  const handleProfileUploadClick = () => profileImageInputRef.current?.click();

  const handleBackgroundImageClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (profile.backgroundImageUrl) {
      setIsBackgroundModalOpen(true);
    } else if (pageMode === 'edit' && backImageInputRef.current) {
      backImageInputRef.current.click();
    }
  };

  const handleProfileImageClick = () => {
    if (profile.profileImageUrl) {
      setIsProfileModalOpen(true);
    } else if (pageMode === 'edit' && profileImageInputRef.current) {
      profileImageInputRef.current.click();
    }
  };

  const handleProfileDeleteConfirm = () => setIsProfileDeleteConfirmOpen(true);
  const handleBackgroundDeleteConfirm = () => setIsBackgroundDeleteConfirmOpen(true);
  const handleImageDeleteConfirm = (id) => {
    setDeleteImageId(id);
    setIsImageDeleteConfirmOpen(true);
  };

  const handleProfileDelete = async () => {
    try {
      setIsUploading(true);
      const res = await putProfileImage(profileId, { profileImageUrl: '' });
      if (res.status === 200) {
        setProfile(prev => ({ ...prev, profileImageUrl: '' }));
        setIsProfileModalOpen(false);
        setIsProfileDeleteConfirmOpen(false);
      }
    } catch (error) {
      console.error('프로필 이미지 삭제 중 오류 발생:', error);
      alert('프로필 이미지 삭제 중 오류가 발생했습니다.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleBackgroundDelete = async () => {
    try {
      setIsUploading(true);
      const res = await putProfileBackgroundImage(profileId, { backgroundImageUrl: '' });
      if (res.status === 200) {
        setProfile(prev => ({ ...prev, backgroundImageUrl: '' }));
        setIsBackgroundModalOpen(false);
        window.location.reload();
      }
    } catch (error) {
      console.error('배경 이미지 삭제 중 오류 발생:', error);
      alert('배경 이미지 삭제 중 오류가 발생했습니다.');
    } finally {
      setIsUploading(false);
      setIsBackgroundDeleteConfirmOpen(false);
    }
  };

  const handleDelete = async (id) => {
    if (!id) return;
    try {
      setIsUploading(true);
      const res = await deletePhotoRemove(id);
      if (res.status === 200) {
        setImageState((prev) => ({
          ...prev,
          images: prev.images.filter((image) => image.id !== id),
        }));
        setGalleryKey((prev) => prev + 1);
      }
    } catch (error) {
      console.error('이미지 삭제 중 오류 발생:', error);
      alert('이미지 삭제 중 오류가 발생했습니다.');
    } finally {
      setIsUploading(false);
      setIsImageDeleteConfirmOpen(false);
    }
  };

  const handleBlur = () => {
    if (content.trim() !== '') {
      saveDescription(content);
    }
  };

  const saveDescription = async (content) => {
    if (!profileId) return;
    try {
      await putProfileDescription(profileId, { description: content });
    } catch (error) {
      console.error('저장 중 오류 발생:', error);
    }
  };

  const handleBookmarkToggle = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setIsModalOpen(true);
      return;
    }
    if (!profileId) return;
    try {
      const res = !isBookmarks
        ? await postAddProfileBookmark(profileId)
        : await deleteBookmarksProfile(profileId);
      if (res.status === 200) {
        setIsBookmarks((prev) => !prev);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLettersChange = (e) => {
    const { name, value } = e.target;
    setPostLetter({ ...postLetter, [name]: value });
  };

  const handleSendLetter = async (e) => {
    e.preventDefault();
    try {
      if (!postLetter.displayName.trim() || !postLetter.content.trim()) {
        alert('이름과 내용을 입력해주세요.');
        return;
      }
      const res = await postLetters(profileId, postLetter);
      if (res.status === 201) {
        setIsRegisterModalOpen(false);
        setPostLetter(initLetter);
        const letterRes = await getLetters(profileId);
        if (letterRes.status === 200) {
          setLetters(letterRes.data.data);
        }
      }
    } catch (err) {
      alert(`오류 발생: ${err.message}`);
    }
  };

  const handleSearchInput = (e) => {
    const value = e.target.value;
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    if (value.length >= 1 || value.length === 0) {
      if (value.length >= 1) setIsSearching(true);
      searchTimeoutRef.current = setTimeout(() => {
        handleSearchLetters(value);
      }, 500);
    } else {
      setIsSearching(false);
    }
  };

  const handleModifyLetterConfirm = async (letterId) => {
    setLetterId(letterId);
    const res = await getLetter(profileId, letterId);
    if (res.status === 200) {
      setPostLetter(res.data.data);
    }
    setIsEditModalOpen(true);
  };

  const handleUpdateAndSendLetter = async () => {
    try {
      if (!postLetter.displayName.trim() || !postLetter.content.trim()) {
        alert('이름과 내용을 입력해주세요.');
        return;
      }
      const res = await putLetters(profileId, letterId, postLetter);
      if (res.status === 200) {
        const letterRes = await getLetters(profileId);
        setLetters(letterRes.data.data);
        setIsEditModalOpen(false);
      }
      letterInit();
    } catch (err) {
      alert(`오류 발생: ${err.message}`);
    }
  };

  const handleRemoveLetterConfirm = (letterId) => {
    setLetterId(letterId);
    setIsModalOpen(true);
  };

  const handleLetterRemove = async () => {
    const res = await deleteLetters(profileId, letterId);
    if (res.status === 200) {
      const letterRes = await getLetters(profileId);
      setLetters(letterRes.data.data);
      setIsModalOpen(false);
    }
  };

  const letterInit = () => setPostLetter(initLetter);

  const handleAddItem = () => {
    const newItem = { displayName: '', familyTitle: '', isCustomInput: false };
    setFamily([...family, newItem]);
    setFamilyDataLoaded(true);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const newItems = Array.from(family);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    setFamily(newItems);
  };

  const handleSelectChange = (index, value) => {
    const updatedItems = family.map((item, i) =>
      i === index ? { ...item, familyTitle: value, isCustomInput: value === '직접 입력' } : item
    );
    setFamily(updatedItems);
  };

  const handleCustomInputChange = (index, value) => {
    const updatedItems = family.map((item, i) =>
      i === index ? { ...item, familyTitle: value } : item
    );
    setFamily(updatedItems);
  };

  const handleNameChange = (index, value) => {
    const updatedItems = family.map((item, i) =>
      i === index ? { ...item, displayName: value } : item
    );
    setFamily(updatedItems);
  };

  const handleFailyDelete = (index) => {
    const updatedItems = family.filter((_, i) => i !== index);
    setFamily(updatedItems);
  };

  const handleLoginModalOpen = () => {
    localStorage.setItem('redirectAfterLogin', window.location.pathname);
    navigate('/signin');
  };

  const handleFormRequestPrivateProfileChange = (e) => {
    const { name, value } = e.target;
    setFormRequestPrivateProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleRequestPrivateProfile = async () => {
    const res = await postPrivateProfileAccessRequest(profileId, formRequestPrivateProfile);
    if (res.status === 201) {
      setIsRequestModalOpen(false);
      setIsRequestCompletedModalOpen(true);
    }
  };

  const handleGalleryOpen = () => {
    if (pageMode === 'edit') addCustomButtons();
    document.body.style.touchAction = 'none';
  };

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
          if (imageId) handleEdit(imageId);
        };
        const deleteButton = document.createElement('button');
        deleteButton.innerText = '삭제';
        deleteButton.classList.add('lg-custom-btn', 'lg-custom-remove');
        deleteButton.id = 'delete-button';
        deleteButton.onclick = () => {
          const imageId = getCurrentImageId();
          if (imageId) handleImageDeleteConfirm(imageId);
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

  const getCurrentImageId = () => {
    try {
      if (lgRef.current?.instance) {
        const currentIndex = lgRef.current.instance.index;
        if (currentIndex !== undefined && imageState.images[currentIndex]) {
          return imageState.images[currentIndex].id;
        }
      }
      const currentImg = document.querySelector('.lg-item.lg-current img');
      if (currentImg && currentImg.src) {
        const foundImage = imageState.images.find(image => {
          const cleanCurrentSrc = currentImg.src.split('?')[0];
          const cleanImageUrl = image.url.split('?')[0];
          return cleanCurrentSrc === cleanImageUrl;
        });
        if (foundImage) return foundImage.id;
      }
      return null;
    } catch (error) {
      console.error('getCurrentImageId 에러:', error);
      return null;
    }
  };

  const handleEdit = (id) => {
    if (!id) {
      alert('수정할 이미지를 찾을 수 없습니다.');
      return;
    }
    setUpdatePhotoId(id);
    if (lgRef.current?.instance) lgRef.current.instance.destroy();
    setGalleryKey((prev) => prev + 1);
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    const handleFileChange = async (event) => {
      const file = event.target.files[0];
      if (!file) return;
      try {
        const compressedFile = await compressImage(file);
        const preview = URL.createObjectURL(compressedFile);
        const imageFile = { 
          originalFile: compressedFile, 
          preview,
          updateId: id
        };
        setUpdatePhoto(imageFile);
        await handleGetFileUploadPath('updatePhoto', imageFile);
        setGalleryKey((prev) => prev + 1);
        fileInput.removeEventListener('change', handleFileChange);
        fileInput.remove();
      } catch (error) {
        console.error(error);
        fileInput.removeEventListener('change', handleFileChange);
        fileInput.remove();
      }
    };
    fileInput.addEventListener('change', handleFileChange);
    document.body.appendChild(fileInput);
    fileInput.click();
  };

  if (pageMode === 'loading' || !profileId) {
    return (
      <>
        <div className="blur-overlay"></div>
        <div className="loading-container">
          <div className="spinner"></div>
          <p>프로필을 불러오는 중...</p>
        </div>
      </>
    );
  }

  const isOwner = result === 'PUBLIC_PROFILE_OWNER' || result === 'YOU_HAVE_OWNER_PERMISSION';
  const isEditor = result === 'PUBLIC_PROFILE_EDITOR' || result === 'YOU_HAVE_EDITOR_PERMISSION';

  return (
    <>
      {!showScreen && <div className="blur-overlay"></div>}
      
      {/* 배경 헤더 */}
      <section className="top-space-margin page-title-big-typography cover-background position-relative p-0 border-radius-10px lg-no-border-radius">
        <div className="container" style={{ position: 'relative' }}>
          <div
            className="row small-screen bg-light-gray"
            style={{
              backgroundSize: 'cover',
              backgroundImage: `url(${profile.backgroundImageUrl})`,
              cursor: pageMode === 'edit' || profile.backgroundImageUrl ? 'pointer' : 'default',
            }}
            onClick={handleBackgroundImageClick}
            role="button"
            tabIndex={0}
            title={profile.backgroundImageUrl ? '배경 이미지 전체화면 보기' : pageMode === 'edit' ? '배경 이미지 선택' : ''}
          >
          </div>
          
          {/* 편집 버튼을 .container 레벨로 이동 */}
          {pageMode === 'edit' && (
            <div 
              className="position-absolute" 
              style={{ 
                right: '20px', 
                bottom: '10px',
                zIndex: 10 
              }}
            >
              <div
                className="video-icon-box video-icon-medium feature-box-icon-rounded w-65px h-65px md-w-50px md-h-50px sm-w-40px sm-h-40px rounded-circle d-flex align-items-center justify-content-center cursor-pointer"
                style={{ backgroundColor: '#CDCDCD' }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (profile.backgroundImageUrl) {
                    setIsBackgroundModalOpen(true);
                  } else if (backImageInputRef.current) {
                    backImageInputRef.current.click();
                  }
                }}
              >
                <span>
                  <span className="video-icon">
                    <i className="feather icon-feather-edit-1 icon-extra-medium text-white position-relative top-minus-2px m-0"></i>
                  </span>
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 프로필 정보 섹션 */}
      <section className="p-0">
        <div className="container">
          <div className="row row-cols-1 row-cols-lg-4 row-cols-sm-2">
            <div className="col-lg-12 col-md-12 position-relative page-title-extra-large align-self-center">
              <div className="col-2 process-step-style-03 text-center last-paragraph-no-margin hover-box">
                <div className="process-step-icon-box position-relative mb-20px">
                  <div 
                    className="image-container d-inline-block position-absolute overflow-hidden border-radius-100 progress-image md-left-0px w-180px md-w-120px h-180px md-h-120px top-minus-90px sm-w-80px sm-h-80px sm-top-minus-50px md-start-0 cursor-pointer"
                    onClick={handleProfileImageClick}
                    role="button"
                    tabIndex={0}
                  >
                    <img src={profile.profileImageUrl || avatarImage} alt="" loading="lazy" />
                  </div>
                </div>
              </div>
              <div className="col-9 offset-3 ps-2 md-ps-30px sm-ps-20px">
                <h5 className="text-dark-gray mb-5px fw-600 sm-fs-20 ellipsis-name" title={profile.displayName}>
                  {profile.displayName}
                </h5>
                <h6 className="mb-0 sm-fs-18">
                  {profile.birthday ? formatDateRelace(profile.birthday) : ''}
                  {profile.birthday && profile.deathDate && ' ~ '}
                  {profile.deathDate ? formatDateRelace(profile.deathDate) : ''}
                </h6>
              </div>
              {showScreen && (
                <div className={profile.birthday && profile.deathDate
                  ? 'row position-absolute md-position-initial bottom-minus-60px end-0 z-index-1 pe-1'
                  : 'row position-absolute md-position-initial bottom-minus-95px end-0 z-index-1 pe-1'
                }>
                  {/* 액션 버튼들 */}
                  <div className="xs-mt-25px d-flex flex-lg-column flex-md-row justify-content-md-center gap-lg-0 gap-md-4 gap-sm-5 sm-px-20px py-lg-0 py-md-4">
                    <WebShareButton />
                    
                    {pageMode === 'edit' && isOwner && (
                      <Link
                        className="btn btn-extra-large btn-switch-text btn-box-shadow btn-none-transform btn-white left-icon btn-round-edge border-0 me-5px xs-me-0 w-100 md-w-50 mb-5 md-mb-2"
                        to={`/profile/manage-profile/${profileId}`}
                      >
                        <span>
                          <i className="feather icon-feather-users"></i>
                          <span className="btn-double-text ls-0px" data-text="초대하기">초대하기</span>
                        </span>
                      </Link>
                    )}
                    
                    {pageMode === 'view' && (isOwner || isEditor) && (
                      <Link
                        className="btn btn-extra-large btn-switch-text btn-box-shadow btn-none-transform btn-white left-icon btn-round-edge border-0 me-5px xs-me-0 w-100 md-w-50 mb-5 md-mb-2"
                        to={`/profile/edit/${profileId}`}
                      >
                        <span>
                          <i className="feather icon-feather-edit align-middle"></i>
                          <span className="btn-double-text ls-0px" data-text="편집하기">편집하기</span>
                        </span>
                      </Link>
                    )}
                    
                    {pageMode === 'view' && (
                      <button
                        className="btn btn-extra-large btn-switch-text btn-box-shadow btn-none-transform btn-white left-icon btn-round-edge border-0 me-5px xs-me-0 w-100 md-w-50 mb-5 md-mb-2"
                        onClick={handleBookmarkToggle}
                      >
                        <span>
                          <i className={`fa-${isBookmarks ? 'solid' : 'regular'} fa-bookmark align-middle text-base-color`}></i>
                          <span className="btn-double-text ls-0px" data-text="북마크">북마크</span>
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 설명 섹션 */}
      {pageMode === 'edit' ? (
        <section className="pt-60px md-pt-0 pb-0">
          <div className="container">
            <div className="row bottom-minus-60px end-0 z-index-1 pe-1 d-flex flex-column">
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
                  <span className="btn-double-text ls-0px" data-text="저장">저장</span>
                </Link>
              </div>
              <div className="mt-30px md-mt-20px sm-mt-20px d-flex justify-content-evenly justify-content-md-center gap-2">
                <Link
                  className="btn btn-extra-large btn-switch-text btn-box-shadow btn-none-transform btn-gray left-icon btn-round-edge border-0 xs-me-0 w-20 md-w-45 mb-5 border-radius-30px"
                  to={`/profile/setting-profile/${profileId}`}
                >
                  <span className="btn-double-text ls-0px" data-text="설정">설정</span>
                </Link>
                <Link
                  className="btn btn-extra-large btn-switch-text btn-box-shadow btn-none-transform btn-gray left-icon btn-round-edge border-0 xs-me-0 w-20 md-w-45 mb-5 border-radius-30px"
                  to={profile.nickname ? `/${profile.nickname}/preview` : `/profile/preview/${profileId}`}
                >
                  <span className="btn-double-text ls-0px" data-text="미리보기">미리보기</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : (
        profile.description && profile.description.replace(/<[^>]*>?/gm, '').trim() && (
          <section className="pt-50px md-pt-0 pb-2">
            <div className="container">
              <div className="bottom-minus-60px end-0 z-index-1 pe-1">
                <div className="col col-sm-12 offset-md-0 fs-20 md-ps-25px sm-ps-0 sm-mt-20px custom-quill-wrapper">
                  <ReactQuill
                    className="w-60 sm-w-100 mx-center"
                    value={profile.description}
                    readOnly={true}
                    theme="snow"
                    modules={{ toolbar: false }}
                  />
                </div>
              </div>
            </div>
          </section>
        )
      )}

      {/* 탭 섹션 */}
      {showScreen && (
        <section id="tab" className="pt-0 sm-pt-40px md-pb-70px">
          <div className="container">
            <div className="row">
              <div className="col-12 tab-style-04">
                <ul className="nav nav-tabs border-0 justify-content-center fs-20">
                  {tabList.map((tab) => (
                    <li key={tab} className="nav-item text-center">
                      <button
                        className={`nav-link ${activeTab === tab ? 'active text-base-color d-inline-block' : 'd-inline-block'}`}
                        onClick={() => setActiveTab(tab)}
                      >
                        {tab}
                        <span className="tab-border bg-base-color"></span>
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="mb-5 h-1px w-100 bg-extra-medium-gray xs-mb-8"></div>
                <div className="tab-content">
                  {/* 이미지 탭 */}
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
                        onClose={() => { document.body.style.touchAction = ''; }}
                        onInit={pageMode === 'edit' ? addCustomButtons : undefined}
                        ref={lgRef}
                        mobileSettings={{ controls: true, showCloseIcon: true }}
                      >
                        <div className="gallery-grid">
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
                              className={`gallery-grid-item ${!imageState.images.length ? 'gallery-item-frist' : ''}`}
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
                              <img src={image.url} loading="lazy" alt="추모 이미지" data-index={index} data-id={image.id} />
                            </a>
                          ))}
                        </div>
                      </LightGallery>
                      {imageState.images.length === 0 && (
                        <div className="col-12 text-center mt-100px pb-2 fs-24">
                          <i className="feather icon-feather-camera align-middle icon-extra-large text-dark fs-50 md-fs-70 p-30px border border-4 border-dark border-radius-100px mb-1"></i>
                          <p className="fs-30 fw-800 text-black">No Posts Yet</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* 하늘편지 탭 */}
                  {activeTab === '하늘편지' && (
                    <div className="w-100 sm-mt-10px xs-mb-8 my-5">
                      <div className="row m-0">
                        <div className="col-12 md-p-0">
                          {(pageMode === 'edit' || pageMode === 'view') && (
                            <div className="toolbar-wrapper w-100 mb-40px md-mb-30px">
                              <div className="mx-auto me-md-0 col tab-style-08">
                                <ul className="nav nav-tabs d-flex justify-content-between border-0 fs-18 fw-600 gap-2">
                                  <li className="nav-item">
                                    <div className="position-relative">
                                      <input
                                        className="border-1 nav-link w-400px md-w-100"
                                        type="text"
                                        name="keyword"
                                        onChange={handleSearchInput}
                                        placeholder="검색어를 입력 해주세요."
                                      />
                                      {isSearching ? (
                                        <i className="fa-solid fa-spinner fa-spin align-middle icon-small position-absolute z-index-1 search-icon fa-spinner"></i>
                                      ) : (
                                        <i className="feather icon-feather-search align-middle icon-small position-absolute z-index-1 search-icon"></i>
                                      )}
                                    </div>
                                  </li>
                                  {isAuthenticated && pageMode !== 'preview' && (
                                    <li className="nav-item">
                                      <a
                                        className="nav-link"
                                        data-bs-toggle="tab"
                                        href="#tab_sec2"
                                        onClick={() => setIsRegisterModalOpen(true)}
                                      >
                                        <i className="fa-regular fa-comment-dots align-middle icon-small pe-10px"></i>
                                        하늘 편지 쓰기
                                      </a>
                                    </li>
                                  )}
                                </ul>
                              </div>
                            </div>
                          )}
                          {letters.length > 0 ? (
                            letters.map((letter, index) => (
                              <div
                                key={letter.letterId}
                                className={`row border-color-dark-gray position-relative g-0 sm-border-bottom-0 md-p-5 ${
                                  index % 2 ? 'paper-note-odd' : 'paper-note-even'
                                }`}
                              >
                                <div className="col-12 d-flex justify-content-between align-items-center px-4 pt-2 pb-1">
                                  <span className="text-dark-gray fs-16 fw-600">{letter.displayName}</span>
                                  {pageMode === 'edit' && (
                                    <div className="d-flex">
                                      {letter.hasDeletePermission && (
                                        <span
                                          className="cursor-pointer me-4"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleRemoveLetterConfirm(letter.letterId);
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
                                            handleModifyLetterConfirm(letter.letterId);
                                          }}
                                        >
                                          <i className="ti-pencil align-middle text-dark-gray icon-extra-medium"></i>
                                        </span>
                                      )}
                                    </div>
                                  )}
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

                  {/* 가족관계도 탭 */}
                  {activeTab === '가족관계도' && (
                    <div className="w-100 sm-mt-10px xs-mb-8 my-5">
                      {pageMode === 'edit' ? (
                        <div className="row">
                          <div className="row align-items-center m-0">
                            <div className="col-xl-12 col-lg-10 col-md-12 col-sm-5 form-results d-block mt-20px mb-mt-0 sm-mt-0 mb-0 text-center">
                              <p className="text-black fs-18 md-fs-14 sm-fs-12">
                                가족 관계도<br />
                                아래 가족을 추가하고 드래그로 순서를 바꿔보세요.
                              </p>
                            </div>
                          </div>
                          <div className="row align-items-center">
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
                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                  {family.map((f, index) => (
                                    <Draggable key={index} draggableId={`draggable-${index}`} index={index}>
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
                                            <div className="col-12 col-md-3 text-md-center align-self-center pt-1">
                                              {f.isCustomInput ? (
                                                <input
                                                  className="border-color-transparent-dark-very-light form-control bg-transparent md-pt-0 md-pb-0 required"
                                                  type="text"
                                                  value={f.familyTitle === '직접 입력' ? '' : f.familyTitle}
                                                  placeholder="직접 입력"
                                                  onChange={(e) => handleCustomInputChange(index, e.target.value)}
                                                />
                                              ) : (
                                                <select
                                                  className="form-control border-color-transparent-dark-very-light bg-transparent md-pt-0 md-pb-0"
                                                  value={f.familyTitle}
                                                  onChange={(e) => handleSelectChange(index, e.target.value)}
                                                >
                                                  <option value="">- 선택 -</option>
                                                  <option value="아버지">아버지</option>
                                                  <option value="어머니">어머니</option>
                                                  <option value="아들">아들</option>
                                                  <option value="딸">딸</option>
                                                  <option value="직접 입력">직접 입력</option>
                                                </select>
                                              )}
                                            </div>
                                            <div className="col-lg-6 col-md-7 last-paragraph-no-margin ps-30px pe-30px pe-30px pt-10px sm-pt-15px sm-pb-15px sm-px-0">
                                              <input
                                                maxLength={10}
                                                className="md-mb-0 border-color-transparent-dark-very-light form-control bg-transparent required md-pt-0 md-pb-0"
                                                type="text"
                                                placeholder="이름을 입력해주세요."
                                                value={f.displayName}
                                                onChange={(e) => handleNameChange(index, e.target.value)}
                                              />
                                            </div>
                                            <div className="col-auto col-md-1 align-self-start align-self-md-center text-end text-md-center sm-position-absolute right-5px">
                                              <button onClick={() => handleFailyDelete(index)} className="btn btn-link">
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
                      ) : (
                        <div className="container">
                          {family.map((f, index) => (
                            <div className="row row-cols-12 row-cols-lg-12 row-cols-sm-2 mt-1 text-center" key={index}>
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
                                    <span className="number position-relative z-index-1 fw-600 sm-w-100">{f.familyTitle}</span>
                                    <div className="box-overlay rounded-circle"></div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-6 text-center process-step-style-02 hover-box last-paragraph-no-margin">
                                <div className="process-step-icon-box position-relative mt-30px md-mt-10px">
                                  <div className="process-step-icon d-flex justify-content-start align-items-center mx-auto h-80px w-60 md-w-60 sm-w-60 fs-18 rounded-circle text-dark-gray fw-500">
                                    <span className="number position-relative z-index-1 fw-600">{f.displayName}</span>
                                    <div className="box-overlay rounded-circle"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 모달들 */}
      <ProfileImageModal
        isBackgroundModalOpen={isBackgroundModalOpen}
        onBackgroundModalClose={() => setIsBackgroundModalOpen(false)}
        backgroundImageUrl={profile.backgroundImageUrl}
        
        isProfileModalOpen={isProfileModalOpen}
        onProfileModalClose={() => setIsProfileModalOpen(false)}
        profileImageUrl={profile.profileImageUrl}
        
        pageMode={pageMode}
        onBackgroundUpload={handleBackUploadClick}
        onBackgroundDelete={handleBackgroundDeleteConfirm}
        onProfileUpload={handleProfileUploadClick}
        onProfileDelete={handleProfileDeleteConfirm}
      />

      <LetterModal
        isRegisterModalOpen={isRegisterModalOpen}
        onRegisterModalClose={() => setIsRegisterModalOpen(false)}
        
        isEditModalOpen={isEditModalOpen}
        onEditModalClose={() => setIsEditModalOpen(false)}
        
        isDeleteModalOpen={isModalOpen}
        onDeleteModalClose={() => setIsModalOpen(false)}
        
        letter={postLetter}
        onLetterChange={handleLettersChange}
        
        onSendLetter={handleSendLetter}
        onUpdateLetter={handleUpdateAndSendLetter}
        onConfirmDelete={handleLetterRemove}
        onLetterInit={letterInit}
      />

      <ConfirmModals
        isProfileDeleteConfirmOpen={isProfileDeleteConfirmOpen}
        onProfileDeleteConfirmClose={() => setIsProfileDeleteConfirmOpen(false)}
        onProfileDeleteConfirm={handleProfileDelete}
        
        isBackgroundDeleteConfirmOpen={isBackgroundDeleteConfirmOpen}
        onBackgroundDeleteConfirmClose={() => setIsBackgroundDeleteConfirmOpen(false)}
        onBackgroundDeleteConfirm={handleBackgroundDelete}
        
        isImageDeleteConfirmOpen={isImageDeleteConfirmOpen}
        onImageDeleteConfirmClose={() => setIsImageDeleteConfirmOpen(false)}
        onImageDeleteConfirm={() => handleDelete(deleteImageId)}
        
        isLoginModalOpen={isLoginModalOpen}
        onLoginModalClose={() => setIsLoginModalOpen(false)}
        onLoginConfirm={handleLoginModalOpen}
        
        isRequestModalOpen={isRequestModalOpen}
        onRequestModalClose={() => setIsRequestModalOpen(false)}
        formRequestPrivateProfile={formRequestPrivateProfile}
        onFormRequestChange={handleFormRequestPrivateProfileChange}
        onRequestPrivateProfile={handleRequestPrivateProfile}
        currentPermission={currentPermission}
        
        isRequestCompletedModalOpen={isRequestCompletedModalOpen}
        onRequestCompletedModalClose={() => setIsRequestCompletedModalOpen(false)}
        
        isUploading={isUploading}
      />

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

      {isUploading && (
        <div className="uploading-overlay">
          <div className="spinner" />
          <p>이미지를 업로드 중입니다...</p>
        </div>
      )}
    </>
  );
};

export default UnifiedProfilePage;