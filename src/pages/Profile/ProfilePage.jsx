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
  const [profiles, setProfiles] = useState([]);
  const [viewProfiles, setViewProfiles] = useState([]);
  const [BookmarksProfiles, setBookmarksProfiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('My Everlinks');
  const [profileId, setProfileId] = useState('');

  // SNS 계정 여부와 이메일 존재 여부를 확인합니다.
  // SNS 계정이면 passwordInput에는 보통 빈 문자열을 전달하거나 API 사양에 맞게 값을 전달합니다.
  // const { isSnsAccount, hasEmail, loading, error } =
  //   useSnsAccountValidation('');

  // useEffect(() => {
  //   const fetchProfiles = async () => {
  //     try {
  //       const res = await getSelectProfileList();
  //       if (res.status === 200) {
  //         const { data } = res.data;
  //         setProfiles(data);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchProfiles();
  // }, []);

  // useEffect(() => {
  //   const fetchViewProfiles = async () => {
  //     try {
  //       const res = await getSelectProfileViewList();
  //       if (res.status === 200) {
  //         const { data } = res.data;
  //         setViewProfiles(data);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchViewProfiles();
  // }, []);

  // useEffect(() => {
  //   const fetchBookmarksProfiles = async () => {
  //     try {
  //       const res = await getSelectProfileBookmarksList();
  //       if (res.status === 200) {
  //         const { data } = res.data;
  //         setBookmarksProfiles(data);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchBookmarksProfiles();
  // }, []);

  // 📌 탭 변경 시 데이터 로드 및 레이아웃 조정
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        let res;
        console.log(activeTab);
        if (!activeTab) return;
        if (activeTab === 'My Everlinks') {
          res = await getSelectProfileList();
        }
        if (activeTab === 'View') {
          res = await getSelectProfileViewList();
        }
        if (activeTab === 'Bookmark') {
          res = await getSelectProfileBookmarksList();
        }

        if (res.status === 200) {
          const { data } = res.data;
          console.log(data);
          setProfiles(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfiles();
  }, [activeTab]);

  /** Isotope 초기화 및 레이아웃 적용 */
  useEffect(() => {
    if (!gridRef.current) return;

    imagesLoaded(gridRef.current, { background: true }, () => {
      const isoInstance = new Isotope(gridRef.current, {
        itemSelector: '.grid-item',
        layoutMode: 'fitRows', // ✅ masonry 사용
        percentPosition: true,
        masonry: {
          columnWidth: '.grid-sizer',
        },
      });

      setIsotope(isoInstance);
      isoInstance.layout(); // ✅ 레이아웃 강제 적용
    });

    return () => isotope?.destroy(); // ✅ Unmount 시 Isotope 정리
  }, [profiles]); // ✅ profiles 변경 시 재초기화

  //📌 데이터 변경 시 Isotope 레이아웃 업데이트
  useEffect(() => {
    if (isotopeInstance.current) {
      imagesLoaded(gridRef.current, () => {
        isotopeInstance.current.reloadItems();
        isotopeInstance.current.arrange();
      });
    }
  }, [profiles]);

  /** 필터 변경 시 적용 */
  useEffect(() => {
    if (isotope) {
      isotope.arrange({ filter: filterKey });
    }
  }, [filterKey]);

  const handleMovePageProfile = (profileId) => {
    if (activeTab === 'My Everlinks') {
      navigate(`/profile/edit-profile/${profileId}`);
      return;
    }
    navigate(`/profile/view-profile/${profileId}`);
  };
  const handleRemoveConfirm = (id) => {
    setProfileId(id);
    setIsModalOpen(true);
  };

  const handleRemoveProfile = async () => {
    let res;
    if (activeTab === 'My Everlinks') {
      res = await deleteEditorProfile(profileId);
    }
    if (activeTab === 'View') {
      res = await deleteViwerProfile(profileId);
    }
    if (activeTab === 'Bookmark') {
      res = await deleteBookmarksProfile(profileId);
    }

    if (res.status === 200) {
      setIsModalOpen(false);
      setActiveTab(activeTab);

      if (activeTab === 'My Everlinks') {
        res = await getSelectProfileList();
      }
      if (activeTab === 'View') {
        res = await getSelectProfileViewList();
      }
      if (activeTab === 'Bookmark') {
        res = await getSelectProfileBookmarksList();
      }

      if (res.status === 200) {
        const { data } = res.data;
        setProfiles(data);
      }
    }
  };

  return (
    <>
      <section className="top-space-margin big-section">
        <div className="container">
          <div className="row">
            <div className="col-12 tab-style-10">
              <ul className="nav nav-tabs border-0 justify-content-center fw-700 fs-26 md-fs-13 sm-fs-12 text-center">
                {['My Everlinks', 'View', 'Bookmark'].map((tab) => (
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
                {profiles.length > 0 ? (
                  <>
                    <div className="w-100 sm-mt-10px xs-mb-8 my-5 text-center">
                      {activeTab === 'My Everlinks' && (
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

                      {profiles.map((profile, index) => (
                        <li className="grid-item cursor-pointer" key={index}>
                          <div className="card border-0 border-radius-4px box-shadow-extra-large box-shadow-extra-large-hover">
                            <div
                              className="blog-image"
                              onClick={() => handleMovePageProfile(profile.id)}
                            >
                              <Link className="d-block">
                                <img
                                  src={
                                    profile.profileImageUrl
                                      ? profile.profileImageUrl
                                      : avatarImage
                                  }
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
                            <div className="card-body p-12 md-p-5">
                              <a className="card-title mb-15px sm-mb-5px fw-600 fs-18 lh-26 text-dark-gray text-dark-gray-hover d-block position-relative">
                                {profile.displayName}

                                {profile.permission === 'OWNER' ? (
                                  <i className="fa-solid fa-crown align-center icon-medium text-yellow ps-3 md-fs-20"></i>
                                ) : (
                                  <span
                                    className="cursor-pointer"
                                    onClick={() =>
                                      handleRemoveConfirm(profile.id)
                                    }
                                  >
                                    <i className="feather icon-feather-trash-2 align-top text-dark-gray icon-extra-medium position-absolute right-0px"></i>
                                  </span>
                                )}
                              </a>
                              <p className="fw-600 fs-16 md-fs-18 sm-fs-16 text-sm-start">
                                {formatDateRelace(`${profile.birthday}`)}
                                <span className="d-inline-block d-sm-block text-sm-center sm-pe-30px lh-10 sm-lh-5">
                                  ~
                                </span>
                                {formatDateRelace(`${profile.deathDate}`)}
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
                {profiles.length === 0 && (
                  <div className="text-center pt-12">
                    {activeTab === 'My Everlinks' && (
                      // <Link to="/profile/setting-profile">
                      <Link to="/bridge-profile">
                        <div className="pb-2">
                          <i className="fa-solid fa-circle-plus align-middle text-extra-medium-gray fs-250 md-fs-160"></i>
                        </div>
                        <Button
                          color="profile"
                          radiusOn="radius-on"
                          className="w-40 md-w-150px fs-24 mt-30px md-mt-10px mb-10px md-fs-16 md-p-0 md-h-25px"
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
              </div>
            </div>
          </div>
        </div>
      </section>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="w-40 md-w-70 sm-w-90">
          <div className="modal-content p-0 rounded shadow-lg">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="p-10 sm-p-7 bg-white">
                  <div className="row justify-content-center">
                    <div className="col-md-9 text-center">
                      <h6 className="text-dark-gray fw-500 fs-18 sm-fs-14 mb-15px">
                        해당 프로필
                        {activeTab === 'My Everlinks'
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
