import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import WebShareButton from '@/components/Share/WebShareButton';
import { formatDateRelace } from '@/utils/utils';
import useProfilePermission from '@/hooks/useProfilePermission';

// 컴포넌트 imports
import ContentTabs from '@/components/Profile/ProfileTabs/ContentTabs';
import ProfileImageModal from '@/components/Profile/Modals/ProfileImageModal';
import LetterModal from '@/components/Profile/Modals/LetterModal';
import ConfirmModals from '@/components/Profile/Modals/ConfirmModals';
import ImageTab from '@/components/Profile/ProfileTabs/ImageTab';
import LetterTab from '@/components/Profile/ProfileTabs/LetterTab';
import FamilyTab from '@/components/Profile/ProfileTabs/FamilyTab/FamilyTab';

// 🔥 추가: ProfileHeader와 ProfileDescription import
import ProfileHeader from '@/components/Profile/ProfileInfo/ProfileHeader';
import ProfileDescription from '@/components/Profile/ProfileInfo/ProfileDescription';

import {
  postPrivateProfileAccessRequest,
  getSelectProfile,
  getPhotoSeletct,
  getFamilyProfile,
  deleteLetters,
  getLetters,
  postLetters,
  getProfileIdByNickname,
} from '@/api/memorial/memorialApi';

import avatarImage from '@/assets/images/base-profile-image.png';

const initFormPrivateProfile = {
  name: '',
  memo: '',
};

const ViewProfilePage = () => {
  const navigate = useNavigate();
  const { profileId: urlProfileId, nickname } = useParams();
  const [profileId, setProfileId] = useState(urlProfileId);
  const [profile, setProfile] = useState({});
  const [content, setContent] = useState(''); // 🔥 추가: ProfileDescription용
  const [activeTab, setActiveTab] = useState('이미지');
  const [tabList, setTabList] = useState(['이미지', '하늘편지']);
  const [hasFamilyTree, setHasFamilyTree] = useState(false);

  const initLetter = { displayName: '', content: '' };
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [letterId, setLetterId] = useState('');
  const [letters, setLetters] = useState([]);
  const [postLetter, setPostLetter] = useState(initLetter);
  const [isSearching, setIsSearching] = useState(false);

  const [family, setFamily] = useState([]);
  const [isLoadingFamilyData, setIsLoadingFamilyData] = useState(false);

  const [imageState, setImageState] = useState({
    images: [],
    page: 1,
    hasNext: true,
    initialized: false,
  });
  const [isFetching, setIsFetching] = useState(false);

  const [isRequestCompletedModalOpen, setIsRequestCompletedModalOpen] = useState(false);
  const [formRequestPrivateProfile, setFormRequestPrivateProfile] = useState(initFormPrivateProfile);
  const [isBackgroundModalOpen, setIsBackgroundModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const lgRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  const {
    isLoginModalOpen,
    setIsLoginModalOpen,
    isRequestModalOpen,
    setIsRequestModalOpen,
    showScreen,
    currentPermission,
  } = useProfilePermission(profileId, { shouldRedirect: false });

  // nickname으로 profileId 조회
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

  // 프로필 정보 조회
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
          setProfile(profile);
          setContent(profile.description || ''); // 🔥 추가: description 설정
          setHasFamilyTree(extension.hasFamilyTree);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (showScreen && profileId) {
      fetchProfile();
    }
  }, [profileId, showScreen, navigate]);

  // 탭 리스트 업데이트
  useEffect(() => {
    if (hasFamilyTree) {
      setTabList(['이미지', '하늘편지', '가족관계도']);
    } else {
      setTabList(['이미지', '하늘편지']);
    }
  }, [hasFamilyTree]);

  // 탭별 데이터 로드
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

  // 이미지 탭 스크롤 감지
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

  // 타이머 정리
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  const fetchImages = async (page = 1, append = false) => {
    try {
      const res = await getPhotoSeletct(profileId, 'view', page);
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

  const handleRemoveLetterConfirm = (letterId) => {
    setLetterId(letterId);
    setIsDeleteModalOpen(true);
  };

  const handleLetterRemove = async () => {
    const res = await deleteLetters(profileId, letterId);
    if (res.status === 200) {
      const letterRes = await getLetters(profileId);
      setLetters(letterRes.data.data);
      setIsDeleteModalOpen(false);
    }
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

  const handleBackgroundImageClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (profile.backgroundImageUrl) {
      setIsBackgroundModalOpen(true);
    }
  };

  const handleProfileImageClick = () => {
    if (profile.profileImageUrl) {
      setIsProfileModalOpen(true);
    }
  };

  const handleGalleryOpen = () => {
    document.body.style.touchAction = 'none';
  };

  const letterInit = () => setPostLetter(initLetter);

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

  return (
    <>
      {!showScreen && <div className="blur-overlay"></div>}
      
      {/* 🔥 ProfileHeader 컴포넌트로 교체 */}
      <ProfileHeader
        profile={profile}
        pageMode="view"
        showScreen={showScreen}
        isOwner={false}
        isEditor={false}
        isBookmarks={false}
        profileId={profileId}
        profileNickname={profile.nickname}
        onBackgroundImageClick={handleBackgroundImageClick}
        onProfileImageClick={handleProfileImageClick}
        onBookmarkToggle={() => {}}
        backImageInputRef={null}
      />

      {/* 🔥 ProfileDescription 컴포넌트로 교체 */}
      <ProfileDescription
        content={content}
        setContent={setContent}
        pageMode="view"
        isOwner={false}
        isEditor={false}
        profileId={profileId}
        profileNickname={profile.nickname}
        onBlur={() => {}}
        profile={profile}
        saveDescription={() => {}}
      />

      {/* 돌아가기 버튼 */}
      <section className="pt-50px md-pt-0 pb-0">
        <div className="container">
          <div className="bottom-minus-60px end-0 z-index-1 pe-1">
            <div className="mt-80px md-mt-100px sm-mt-30px d-flex justify-content-evenly justify-content-md-center gap-3">
              <Link
                className="btn btn-extra-large btn-switch-text btn-box-shadow btn-none-transform btn-gray left-icon btn-round-edge border-0 me-1 xs-me-0 w-20 md-w-45 mb-5"
                to={profile.nickname && profile.nickname.trim() 
                  ? `/@${profile.nickname}` 
                  : `/profile/edit-profile/${profileId}`
                }
              >
                <span>
                  <i className="fa-solid fa-backward align-middle"></i>
                  <span className="btn-double-text ls-0px" data-text="돌아가기">돌아가기</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 탭 섹션 - 기존 코드 유지 */}
      {showScreen && (
        <ContentTabs
          activeTab={activeTab}
          tabs={tabList}
          onTabChange={setActiveTab}
          permission="view"
          isLoggedIn={true}
        >
          {/* 이미지 탭 */}
          {activeTab === '이미지' && (
            <ImageTab
              imageState={imageState}
              pageMode="view"
              galleryKey={0}
              lgRef={lgRef}
              fileInputRef={null}
              onEdit={() => {}}
              onDelete={() => {}}
              onUpload={() => {}}
              isUploading={false}
            />
          )}

          {/* 하늘편지 탭 */}
          {activeTab === '하늘편지' && (
            <LetterTab
              letters={letters}
              pageMode="view"
              isAuthenticated={true}
              isSearching={isSearching}
              onSearchInput={handleSearchInput}
              onRegisterClick={() => setIsRegisterModalOpen(true)}
              onModifyLetterConfirm={() => {}}
              onRemoveLetterConfirm={handleRemoveLetterConfirm}
            />
          )}

          {/* 가족관계도 탭 */}
          {activeTab === '가족관계도' && (
            <FamilyTab
              family={family}
              pageMode="view"
              isLoadingFamilyData={isLoadingFamilyData}
              editingFamilyId={null}
              isAddingNewFamily={false}
              uploadingFamilyImages={{}}
              onDragEnd={() => {}}
              onAddItem={() => {}}
              onNameChange={() => {}}
              onSelectChange={() => {}}
              onCustomInputChange={() => {}}
              onImageUpload={() => {}}
              onEditFamily={() => {}}
              onDeleteFamily={() => {}}
              onSaveFamily={() => {}}
              onCancelAddFamily={() => {}}
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
        
        pageMode="view"
        onBackgroundUpload={() => {}}
        onBackgroundDelete={() => {}}
        onProfileUpload={() => {}}
        onProfileDelete={() => {}}
      />

      <LetterModal
        isRegisterModalOpen={isRegisterModalOpen}
        onRegisterModalClose={() => setIsRegisterModalOpen(false)}
        
        isEditModalOpen={isEditModalOpen}
        onEditModalClose={() => setIsEditModalOpen(false)}
        
        isDeleteModalOpen={isDeleteModalOpen}
        onDeleteModalClose={() => setIsDeleteModalOpen(false)}
        
        letter={postLetter}
        onLetterChange={handleLettersChange}
        
        onSendLetter={handleSendLetter}
        onUpdateLetter={() => {}}
        onConfirmDelete={handleLetterRemove}
        onLetterInit={letterInit}
      />

      <ConfirmModals
        isProfileDeleteConfirmOpen={false}
        onProfileDeleteConfirmClose={() => {}}
        onProfileDeleteConfirm={() => {}}
        
        isBackgroundDeleteConfirmOpen={false}
        onBackgroundDeleteConfirmClose={() => {}}
        onBackgroundDeleteConfirm={() => {}}
        
        isImageDeleteConfirmOpen={false}
        onImageDeleteConfirmClose={() => {}}
        onImageDeleteConfirm={() => {}}
        
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
        
        isUploading={false}
      />
    </>
  );
};

export default ViewProfilePage;