import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { debounce } from 'lodash';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
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

// 컴포넌트 imports
import ProfileImageModal from '@/components/Profile/Modals/ProfileImageModal';
import LetterModal from '@/components/Profile/Modals/LetterModal';
import ConfirmModals from '@/components/Profile/Modals/ConfirmModals';
import ImageTab from '@/components/Profile/ProfileTabs/ImageTab';
import LetterTab from '@/components/Profile/ProfileTabs/LetterTab';
import FamilyTab from '@/components/Profile/ProfileTabs/FamilyTab/FamilyTab';
import ContentTabs from '@/components/Profile/ProfileTabs/ContentTabs';

import ProfileHeader from '@/components/Profile/ProfileInfo/ProfileHeader';
import ProfileDescription from '@/components/Profile/ProfileInfo/ProfileDescription';
import UploadOverlay from '@/components/Profile/ProfileActions/UploadOverlay';
import LoadingScreen from '@/components/Profile/ProfileActions/LoadingScreen';

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

  const [editingFamilyId, setEditingFamilyId] = useState(null);
  const [uploadingFamilyImages, setUploadingFamilyImages] = useState({});
  const [isAddingNewFamily, setIsAddingNewFamily] = useState(false);

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

  const currentUserId = useSelector((state) => state.auth.user?.id);
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

  // ===== 🔥 가족관계도 핸들러 함수들 =====
  const handleAddItem = () => {
    const newItem = { 
      displayName: '', 
      familyTitle: '', 
      isCustomInput: false,
      profileImage: '',
      id: `temp-${Date.now()}`
    };
    setFamily([newItem, ...family]);
    setEditingFamilyId(0);
    setIsAddingNewFamily(true);
    setFamilyDataLoaded(true);
  };

  const handleCancelAddFamily = () => {
    if (isAddingNewFamily) {
      setFamily(family.slice(1));
    }
    setIsAddingNewFamily(false);
    setEditingFamilyId(null);
  };

  const handleSaveFamily = (index) => {
    const member = family[index];
    if (!member.displayName.trim() || !member.familyTitle.trim()) {
      alert('이름과 관계를 모두 입력해주세요.');
      return;
    }
    setEditingFamilyId(null);
    setIsAddingNewFamily(false);
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
    if (isAddingNewFamily && index !== 0) {
      setFamily(family.slice(1));
      setIsAddingNewFamily(false);
      setEditingFamilyId(null);
      const updatedItems = family.slice(1).filter((_, i) => i !== index - 1);
      setFamily(updatedItems);
    } else {
      const updatedItems = family.filter((_, i) => i !== index);
      setFamily(updatedItems);
    }
  };
  
  const handleEditFamily = (index) => {
    if (isAddingNewFamily) {
      setFamily(family.slice(1));
    }
    setIsAddingNewFamily(false);
    setEditingFamilyId(index);
  };

  const getRelationshipBadgeStyle = (relationship) => {
    if (!relationship) return { backgroundColor: '#6c757d', color: 'white' };
    
    if (relationship.includes('할아버지') || relationship.includes('할머니')) {
      return { backgroundColor: '#6f42c1', color: 'white' };
    }
    if (relationship.includes('아버지') || relationship.includes('어머니')) {
      return { backgroundColor: '#0d6efd', color: 'white' };
    }
    if (relationship.includes('딸') || relationship.includes('아들')) {
      return { backgroundColor: '#198754', color: 'white' };
    }
    if (relationship.includes('남편') || relationship.includes('아내')) {
      return { backgroundColor: '#dc3545', color: 'white' };
    }
    return { backgroundColor: '#6c757d', color: 'white' };
  };

  const handleFamilyImageChange = (index, imageUrl) => {
    const updatedItems = family.map((item, i) =>
      i === index ? { ...item, profileImage: imageUrl } : item
    );
    setFamily(updatedItems);
  };

  const handleFamilyImageUpload = async (file, index) => {
    if (!file || !profileId) return;
    
    setUploadingFamilyImages(prev => ({ ...prev, [index]: true }));
    
    try {
      const compressedFile = await compressImage(file);
      const type = getFileType(file.type);
      const presignedResponse = await postRequestPresignedUrl(type);
      const { data } = presignedResponse.data;
      const url = data.completedUrl;
      
      const response = await fetch(data.url, {
        method: 'PUT',
        body: compressedFile,
        headers: { 'Content-Type': file.type },
      });
      
      if (!response.ok) throw new Error(`업로드 실패: ${file.name}`);
      
      handleFamilyImageChange(index, url);
      
    } catch (error) {
      console.error('가족 이미지 업로드 실패:', error);
      alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setUploadingFamilyImages(prev => ({ ...prev, [index]: false }));
    }
  };
  // ===== 가족관계도 핸들러 끝 =====

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
    return <LoadingScreen />;
  }

  const isOwner = result === 'PUBLIC_PROFILE_OWNER' || result === 'YOU_HAVE_OWNER_PERMISSION';
  const isEditor = result === 'PUBLIC_PROFILE_EDITOR' || result === 'YOU_HAVE_EDITOR_PERMISSION';

  return (
    <>
      {!showScreen && <div className="blur-overlay"></div>}
      
      {/* 배경 헤더 & 프로필 */}
     {!showScreen && <div className="blur-overlay"></div>}
  
      <ProfileHeader
        profile={profile}
        pageMode={pageMode}
        showScreen={showScreen}
        isOwner={isOwner}
        isEditor={isEditor}
        isBookmarks={isBookmarks}
        profileId={profileId}
        profileNickname={profile.nickname}
        onBackgroundImageClick={handleBackgroundImageClick}
        onProfileImageClick={handleProfileImageClick}
        onBackgroundUploadClick={handleBackUploadClick}
        onBookmarkToggle={handleBookmarkToggle}
        backImageInputRef={backImageInputRef}
      />

      {/* 설명 섹션 */}
       <ProfileDescription
        content={content}
        setContent={setContent}
        pageMode={pageMode}
        profileId={profileId}
        onBlur={handleBlur}
        profile={profile}
        saveDescription={saveDescription}
      />

      {/* 탭 섹션 */}
      {showScreen && (
        <ContentTabs
          activeTab={activeTab}
          tabs={tabList}
          onTabChange={setActiveTab}
          permission={pageMode}
          isLoggedIn={isAuthenticated}
        >
          {/* 이미지 탭 */}
          {activeTab === '이미지' && (
            <ImageTab
              imageState={imageState}
              pageMode={pageMode}
              galleryKey={galleryKey}
              lgRef={lgRef}
              fileInputRef={fileInputRef}
              onEdit={handleEdit}
              onDelete={handleImageDeleteConfirm}
              onUpload={handleFileChange}
              isUploading={isUploading}
            />
          )}

          {/* 하늘편지 탭 */}
          {activeTab === '하늘편지' && (
           <LetterTab
              letters={letters}
              pageMode={pageMode}
              isAuthenticated={isAuthenticated}
              isSearching={isSearching}
              currentUserId={currentUserId} // 🔥 추가
              onSearchInput={handleSearchInput}
              onRegisterClick={() => setIsRegisterModalOpen(true)}
              onModifyLetterConfirm={handleModifyLetterConfirm}
              onRemoveLetterConfirm={handleRemoveLetterConfirm}
            />
          )}

          {/* 가족관계도 탭 */}
          {activeTab === '가족관계도' && (
            <FamilyTab
              family={family}
              pageMode={pageMode}
              isLoadingFamilyData={isLoadingFamilyData}
              editingFamilyId={editingFamilyId}
              isAddingNewFamily={isAddingNewFamily}
              uploadingFamilyImages={uploadingFamilyImages}
              onDragEnd={onDragEnd}
              onAddItem={handleAddItem}
              onNameChange={handleNameChange}
              onSelectChange={handleSelectChange}
              onCustomInputChange={handleCustomInputChange}
              onImageUpload={handleFamilyImageUpload}
              onEditFamily={handleEditFamily}
              onDeleteFamily={handleFailyDelete}
              onSaveFamily={handleSaveFamily}
              onCancelAddFamily={handleCancelAddFamily}
              getRelationshipBadgeStyle={getRelationshipBadgeStyle}
            />
          )}
        </ContentTabs>
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