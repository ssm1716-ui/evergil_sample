import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '@/components/common/Modal/Modal';
import Button from '@/components/common/Button/Button';
import { formatDateRelace } from '@/utils/utils';
import Isotope from 'isotope-layout';
import imagesLoaded from 'imagesloaded';

import {
  getSelectProfileList,
  getSelectProfileViewList,
  getSelectProfileBookmarksList,
  deleteEditorProfile,
  deleteViwerProfile,
  deleteBookmarksProfile,
} from '@/api/memorial/memorialApi';

import useSnsAccountValidation from '@/hooks/useSnsAccountValidation';

import avatarImage from '@/assets/images/base-profile-image.png';

const ProfilePage = () => {
  const navigate = useNavigate();
  const gridRef = useRef(null);
  const isotopeInstance = useRef(null);
  const [filterKey, setFilterKey] = useState('*'); // 기본 필터 값
  const [isotope, setIsotope] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [profileState, setProfileState] = useState({
    profiles: [],
    page: 1,
    hasNext: true,
    initialized: false
  });
  const [viewProfiles, setViewProfiles] = useState([]);
  const [BookmarksProfiles, setBookmarksProfiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('My Profiles');
  const [profileId, setProfileId] = useState('');
  const [isotopeReady, setIsotopeReady] = useState(false);
  const prevScrollY = useRef(0);

  // 📌 탭 변경 시 데이터 로드 및 레이아웃 조정
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

  /** Isotope 초기화 및 레이아웃 적용 */
  useEffect(() => {
    if (!gridRef.current || !profileState.profiles.length) return;

    const initIsotope = () => {
      const iso = new Isotope(gridRef.current, {
        itemSelector: '.grid-item',
        masonry: {
          columnWidth: '.grid-sizer',
        },
      });
      setIsotope(iso);
      setIsotopeReady(true);
    };

    // 이미지 로드 완료 후 Isotope 초기화
    const imgLoad = imagesLoaded(gridRef.current);
    imgLoad.on('done', () => {
      if (!isotopeInstance.current) {
        initIsotope();
      } else {
        // 기존 스크롤 위치 저장
        prevScrollY.current = window.scrollY;
        
        // 레이아웃 업데이트
        isotopeInstance.current.reloadItems();
        isotopeInstance.current.arrange();
        
        // 스크롤 위치 복원
        window.scrollTo(0, prevScrollY.current);
      }
    });

    return () => {
      if (isotopeInstance.current) {
        isotopeInstance.current.destroy();
        isotopeInstance.current = null;
      }
    };
  }, [profileState.profiles]);

  /** 필터 변경 시 적용 */
  useEffect(() => {
    if (isotope) {
      isotope.arrange({ filter: filterKey });
    }
  }, [filterKey]);

  // 프로필 fetch 함수
  const fetchProfiles = async (page = 1, append = false) => {
    try {
      setIsFetching(true);
      let res;
      const pageSize = 10;
      
      if (activeTab === 'My Profiles') {
        res = await getSelectProfileList(page, pageSize);
      } else if (activeTab === 'View') {
        res = await getSelectProfileViewList(page, pageSize);
      } else if (activeTab === 'Bookmark') {
        res = await getSelectProfileBookmarksList(page, pageSize);
      }

      if (res?.status === 200) {
        const { data } = res.data;
        
        // 현재 스크롤 위치 저장
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

  // 스크롤 감지하여 추가 데이터 로드
  useEffect(() => {
    const handleScroll = () => {
      if (!profileState.hasNext || isFetching || !isotopeReady) return;

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
  }, [isFetching, profileState.hasNext, profileState.page, isotopeReady]);

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
  const handleRemoveConfirm = (id) => {
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
        // 현재 페이지 데이터 다시 로드
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

  return (
    <>
      <section className="top-space-margin big-section">
        <div className="container">
          <div className="row">
            <div className="col-12 tab-style-10">
              <ul className="nav nav-tabs border-0 justify-content-center fw-700 fs-26 md-fs-13 sm-fs-12 text-center">
                {['My Profiles', 'View', 'Bookmark'].map((tab) => (
                  <li key={tab} className="nav-item sm-p-0">
                    <button
                      className={`w-100 nav-link text-center md-fs-20 sm-fs-16 ${
                        activeTab === tab ? 'active text-base-color' : ''
                      }`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                      <span className="tab-border bg-base-color"></span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="tab-content">
                {profileState.profiles.length > 0 ? (
                  <>
                    <div className="w-100 sm-mt-10px xs-mb-8 my-5 text-center">
                      {activeTab === 'My Profiles' && (
                        <div className="col text-lg-end text-md-center xs-mt-25px">
                          {/* <Link to="/profile/setting-profile"> */}
                          <Link to="/bridge-profile">
                            <Button
                              variant="primary"
                              color="base-color"
                              size="large"
                              className="w-20 md-w-30 sm-w-50 border-radius-20px"
                            >
                              <i className="feather icon-feather-plus align-top icon-small text-white"></i>
                              새로운 프로필 생성
                            </Button>
                          </Link>
                        </div>
                      )}
                    </div>
                    <ul
                      className="blog-grid blog-wrapper grid grid-3col xl-grid-3col sm-grid-2col xs-grid-2col gutter-extra-large mt-70px md-mt-10px"
                      ref={gridRef}
                    >
                      <li className="grid-sizer"></li>

                      {profileState.profiles.map((profile, index) => (
                        <li className="grid-item cursor-pointer" key={index}>
                          <div className="card border-0 border-radius-4px box-shadow-extra-large box-shadow-extra-large-hover h-100 d-flex flex-column"
                            onClick={() => handleMovePageProfile(profile.id, profile.nickname)}
                          >
                            <div className="blog-image image-container">
                              <Link className="d-block">
                                <img
                                  src={profile.profileImageUrl || avatarImage}
                                  alt="Profile"
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    display: 'block',
                                  }}
                                />
                              </Link>
                            </div>
                            <div className="card-body p-12 md-p-5 d-flex flex-column justify-content-between">
                              <a
                                className="card-title mb-15px sm-mb-5px fw-600 fs-18 lh-26 text-dark-gray text-dark-gray-hover d-flex align-items-center"
                                style={{ gap: '6px' }}
                              >
                                <span
                                  className="text-truncate"
                                  title={profile.displayName}
                                  style={{
                                    maxWidth:
                                      profile.displayName.length < 10
                                        ? '100%'
                                        : 'calc(100% - 24px)',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    display: 'inline-block',
                                  }}
                                >
                                  {profile.displayName}
                                </span>

                                {profile.permission === 'OWNER' ? (
                                  <i className="fa-solid fa-crown icon-medium text-yellow ms-2"></i>
                                ) : (
                                  <span
                                    className="cursor-pointer"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      handleRemoveConfirm(profile.id);
                                    }}
                                  >
                                    <i className="feather icon-feather-trash-2 text-dark-gray icon-extra-medium"></i>
                                  </span>
                                )}
                              </a>
                              <p className="fw-600 fs-16 md-fs-18 sm-fs-16 text-sm-start">
                                {profile.birthday
                                  ? formatDateRelace(profile.birthday)
                                  : ''}
                                {profile.birthday && profile.deathDate && (
                                  <span className="d-inline-block d-sm-block text-sm-left sm-ps-35px lh-10 sm-lh-5">
                                    ~
                                  </span>
                                )}
                                {profile.deathDate
                                  ? formatDateRelace(profile.deathDate)
                                  : ''}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  ''
                )}
                {profileState.profiles.length === 0 && (
                  <div className="text-center pt-12">
                    {activeTab === 'My Profiles' && (
                      // <Link to="/profile/setting-profile">
                      <Link to="/bridge-profile">
                        <div className="pb-2">
                          <i className="fa-solid fa-circle-plus align-middle text-extra-medium-gray fs-250 md-fs-160"></i>
                        </div>
                        <Button
                          color="profile"
                          radiusOn="radius-on"
                          className="w-40 md-w-150px fs-24 mt-30px md-mt-10px mb-10px md-fs-16 md-p-0 md-h-28px"
                        >
                          새로운 프로필 생성
                        </Button>
                      </Link>
                    )}

                    {activeTab === 'View' && (
                      <>
                        <div className="pb-2 fs-24">
                          <i className="fa-regular fa-circle-user align-middle icon-extra-large sm-icon-extra-large text-light-gray pb-1"></i>
                          <p className="md-pt-20px sm-fs-16">
                            View 권한을 가진 프로필이 없습니다.
                          </p>
                        </div>
                      </>
                    )}

                    {activeTab === 'Bookmark' && (
                      <>
                        <div className="pb-2 fs-24">
                          <i className="fa-regular fa-bookmark align-middle icon-extra-large sm-icon-extra-large text-light-gray pb-1"></i>
                          <p className="md-pt-20px sm-fs-16">
                            북마크한 프로필이 없습니다.
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                )}
                {isFetching && (
                  <div className="text-center mt-4 mb-4">
                    <div className="spinner-border text-base-color" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">프로필을 불러오는 중...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="w-100">
          <div className="modal-content p-0 rounded shadow-lg">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="p-10 sm-p-7 bg-white">
                  <div className="row justify-content-center">
                    <div className="col-md-9 text-center">
                      <h6 className="text-dark-gray fw-500 fs-18 sm-fs-14 mb-15px">
                        해당 프로필
                        {activeTab === 'My Profiles'
                          ? ' 편집 권한이 사라집니다.'
                          : activeTab === 'View'
                            ? ' view 권한이 사라집니다.'
                            : ' 북마크를 삭제 하시겠습니까?'}
                        <br />
                        {activeTab !== 'Bookmark' ? '삭제 하시겠습니까?' : ''}
                      </h6>
                    </div>
                    <div className="col-lg-12 text-center text-lg-center pt-3">
                      <input type="hidden" name="redirect" value="" />
                      <button
                        className="btn btn-white btn-large btn-box-shadow btn-round-edge submit me-1"
                        onClick={handleRemoveProfile}
                      >
                        삭제
                      </button>
                      <button
                        className="btn btn-white btn-large btn-box-shadow btn-round-edge submit me-1"
                        onClick={() => setIsModalOpen(false)}
                      >
                        취소
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* <Modal isOpen={!hasEmail} onClose={() => setIsModalOpen(false)}>
        <div className="w-40">
          <div className="modal-content p-0 rounded shadow-lg">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="p-10 sm-p-7 bg-white">
                  <div className="row justify-content-center">
                    <div className="col-md-9 text-center">
                      <h6 className="text-dark-gray fw-500 mb-15px">
                        (필수) 이메일 정보를 입력해 주세요.
                        <br />
                      </h6>
                    </div>
                    <div className="col-lg-12 text-center text-lg-center pt-3">
                      <input type="hidden" name="redirect" value="" />
                      <button
                        className="btn btn-white btn-large btn-box-shadow btn-round-edge submit me-1"
                        onClick={() => navigate('/mypage/myinfo')}
                      >
                        확인
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal> */}
    </>
  );
};

export default ProfilePage;
