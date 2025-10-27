import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '@/components/common/Modal/Modal';
import Button from '@/components/common/Button/Button';
import { formatDateRelace } from '@/utils/utils';
import {
  getSelectProfileList,
  getSelectProfileViewList,
  getSelectProfileBookmarksList,
  deleteEditorProfile,
  deleteViwerProfile,
  deleteBookmarksProfile,
} from '@/api/memorial/memorialApi';
import avatarImage from '@/assets/images/base-profile-image.png';
import { FaPlus, FaTrash, FaUser, FaBookmark } from 'react-icons/fa';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(false);
  const [profileState, setProfileState] = useState({
    profiles: [],
    page: 1,
    hasNext: true,
    initialized: false
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('My Profiles');
  const [profileId, setProfileId] = useState('');
  const prevScrollY = useRef(0);

  // 탭 변경 시 데이터 로드
  useEffect(() => {
    setProfileState(prev => ({
      ...prev,
      profiles: [],
      page: 1,
      hasNext: true,
      initialized: false
    }));
    fetchProfiles(1, false);
  }, [activeTab]);

  // 프로필 fetch
  const fetchProfiles = async (page = 1, append = false) => {
    try {
      setIsFetching(true);
      let res;
      const pageSize = 12;
      
      if (activeTab === 'My Profiles') {
        res = await getSelectProfileList(page, pageSize);
      } else if (activeTab === 'View') {
        res = await getSelectProfileViewList(page, pageSize);
      } else if (activeTab === 'Bookmark') {
        res = await getSelectProfileBookmarksList(page, pageSize);
      }

      if (res?.status === 200) {
        const { data } = res.data;
        prevScrollY.current = window.scrollY;
        setProfileState(prev => ({
          profiles: append ? [...prev.profiles, ...data] : data,
          page,
          hasNext: data.length === pageSize,
          initialized: true
        }));
      }
    } catch (error) {
      console.error('프로필 목록 로드 실패:', error);
    } finally {
      setIsFetching(false);
    }
  };

  // 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      if (!profileState.hasNext || isFetching) return;
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      const scrollPercent = (scrollY + viewportHeight) / fullHeight;

      if (scrollPercent >= 0.8) {
        fetchProfiles(profileState.page + 1, true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFetching, profileState.hasNext, profileState.page]);

  const handleMovePageProfile = (profileId, nickname) => {
    if (nickname) {
      navigate(`/@${nickname}`);
    } else {
      if (activeTab === 'My Profiles') {
        navigate(`/profile/edit-profile/${profileId}`);
        return;
      }
      navigate(`/profile/view-profile/${profileId}`);
    }
  };

  const handleRemoveConfirm = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    setProfileId(id);
    setIsModalOpen(true);
  };

  const handleRemoveProfile = async () => {
    try {
      let res;
      if (activeTab === 'My Profiles') {
        res = await deleteEditorProfile(profileId);
      } else if (activeTab === 'View') {
        res = await deleteViwerProfile(profileId);
      } else if (activeTab === 'Bookmark') {
        res = await deleteBookmarksProfile(profileId);
      }

      if (res.status === 200) {
        setIsModalOpen(false);
        setProfileState(prev => ({
          ...prev,
          profiles: [],
          page: 1,
          hasNext: true,
          initialized: false
        }));
        fetchProfiles(1, false);
      }
    } catch (error) {
      console.error('프로필 삭제 실패:', error);
      alert('프로필 삭제 중 오류가 발생했습니다.');
    }
  };

  const getModalMessage = () => {
    if (activeTab === 'My Profiles') {
      return {
        title: '프로필 편집 권한 삭제',
        description: '해당 프로필 편집 권한이 사라집니다. 삭제하시겠습니까?'
      };
    } else if (activeTab === 'View') {
      return {
        title: '프로필 View 권한 삭제',
        description: '해당 프로필 view 권한이 사라집니다. 삭제하시겠습니까?'
      };
    } else {
      return {
        title: '북마크 삭제',
        description: '북마크를 삭제하시겠습니까?'
      };
    }
  };

  // 권한 태그 렌더링 함수
  const renderPermissionBadge = (permission) => {
    if (permission === 'OWNER') {
      return <span className="profile-badge owner">소유자</span>;
    } else if (permission === 'EDITOR') {
      return <span className="profile-badge editor">편집자</span>;
    }
    return null;
  };

  return (
    <>
      <section className="profile-page-section">
        <div className="container">
          {/* Header */}
          <div className="profile-page-header">
            <div>
              <h1 className="profile-page-title">My Profiles</h1>
              <p className="profile-page-subtitle">권한에 따라 관리할 수 있는 프로필들입니다</p>
            </div>
            
            {/* PC에서만 버튼 표시 */}
            {activeTab === 'My Profiles' && profileState.profiles.length > 0 && (
              <Link to="/bridge-profile" className="btn-create-profile-desktop">
                <button className="btn-create-profile">
                  <FaPlus style={{ marginRight: 8 }} />
                  새로운 프로필 만들기
                </button>
              </Link>
            )}
          </div>

          {/* Tabs */}
          <div className="profile-tabs-wrapper">
            <div className="profile-tabs">
              {['My Profiles', 'View', 'Bookmark'].map((tab) => (
                <button
                  key={tab}
                  className={`profile-tab ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {activeTab === 'My Profiles' && profileState.profiles.length > 0 && (
            <div className="btn-create-profile-mobile-wrapper">
              <Link to="/bridge-profile">
                <button className="btn-create-profile btn-create-profile-mobile">
                  <FaPlus style={{ marginRight: 6 }} />
                  새로운 프로필 만들기
                </button>
              </Link>
            </div>
          )}

          {/* Profile Grid */}
          {profileState.profiles.length > 0 ? (
            <>
              <div className="profile-grid-uniform">
                {profileState.profiles.map((profile) => (
                  <div
                    key={profile.id}
                    className="profile-card-wrapper"
                    onClick={() => handleMovePageProfile(profile.id, profile.nickname)}
                  >
                    <div className="profile-card-uniform">
                      {/* 프로필 이미지 */}
                      <div className="profile-card-image-uniform">
                        <img
                          src={profile.profileImageUrl || avatarImage}
                          alt={profile.displayName}
                          onError={(e) => {
                            e.target.src = avatarImage;
                          }}
                        />
                      </div>

                      {/* 프로필 정보 */}
                      <div className="profile-card-body-uniform">
                        <div className="profile-card-header-uniform">
                          <h3 className="profile-card-name-uniform" title={profile.displayName}>
                            {profile.displayName}
                          </h3>
                          {/* 삭제 버튼 (소유자가 아닐 때만) */}
                          {profile.permission !== 'OWNER' && (
                            <button
                              className="profile-delete-btn"
                              onClick={(e) => handleRemoveConfirm(profile.id, e)}
                            >
                              <FaTrash />
                            </button>
                          )}
                        </div>

                        {/* 날짜 - 항상 고정 높이 유지 */}
                        <div className="profile-card-date-wrapper">
                          {(profile.birthday || profile.deathDate) ? (
                            <p className="profile-card-date-uniform">
                              {profile.birthday && formatDateRelace(profile.birthday)}
                              {profile.birthday && profile.deathDate && (
                                <span className="date-separator"> ~ </span>
                              )}
                              {profile.deathDate && formatDateRelace(profile.deathDate)}
                            </p>
                          ) : (
                            <p className="profile-card-date-uniform">&nbsp;</p>
                          )}
                        </div>

                        {/* 권한 배지 - 날짜 아래 고정 위치 */}
                        {renderPermissionBadge(profile.permission)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Loading */}
              {isFetching && (
                <div className="profile-loading">
                  <div className="spinner"></div>
                  <p>프로필을 불러오는 중...</p>
                </div>
              )}
            </>
          ) : (
            // Empty State
            <div className="profile-empty-state">
              {activeTab === 'My Profiles' && (
                <>
                  <div className="empty-icon-wrapper">
                    <FaPlus className="empty-icon" />
                  </div>
                  <h3 className="empty-title">새로운 프로필을 만들어보세요</h3>
                  <p className="empty-description">
                    소중한 사람의 추억을 영원히 간직하세요
                  </p>
                  <Link to="/bridge-profile">
                    <button className="btn-create-profile">
                      <FaPlus style={{ marginRight: 8 }} />
                      새로운 프로필 만들기
                    </button>
                  </Link>
                </>
              )}

              {activeTab === 'View' && (
                <>
                  <div className="empty-icon-wrapper">
                    <FaUser className="empty-icon" />
                  </div>
                  <h3 className="empty-title">View 권한을 가진 프로필이 없습니다</h3>
                  <p className="empty-description">
                    다른 사용자가 공유한 프로필이 여기에 표시됩니다
                  </p>
                </>
              )}

              {activeTab === 'Bookmark' && (
                <>
                  <div className="empty-icon-wrapper">
                    <FaBookmark className="empty-icon" />
                  </div>
                  <h3 className="empty-title">북마크한 프로필이 없습니다</h3>
                  <p className="empty-description">
                    관심있는 프로필을 북마크해보세요
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Delete Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="profile-delete-modal">
          <h3>{getModalMessage().title}</h3>
          <p>{getModalMessage().description}</p>
          <div className="modal-actions">
            <button
              className="action-btn secondary"
              onClick={() => setIsModalOpen(false)}
            >
              취소
            </button>
            <button
              className="action-btn primary delete-confirm"
              onClick={handleRemoveProfile}
            >
              삭제
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProfilePage;