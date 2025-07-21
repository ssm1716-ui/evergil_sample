import { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Modal from '@/components/common/Modal/Modal';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-fullscreen.css';
import 'lightgallery/css/lg-zoom.css';
import lgZoom from 'lightgallery/plugins/zoom';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import Button from '@/components/common/Button/Button';
import WebShareButton from '@/components/Share/WebShareButton';
import { formatDateRelace } from '@/utils/utils';

import useProfilePermission from '@/hooks/useProfilePermission';
import {
  getSelectProfile,
  postPrivateProfileAccessRequest,
  postAddProfileBookmark,
  deleteBookmarksProfile,
  getPhotoSeletct,
  getFamilyProfile,
  deleteLetters,
  getLetters,
  getLetter,
  postLetters,
  putLetters,
  getProfileIdByNickname
} from '@/api/memorial/memorialApi';

import avatarImage from '@/assets/images/base-profile-image.png';

const initFormPrivateProfile = {
  name: '',
  memo: '',
};

const ViewProfilePage = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { profileId: urlProfileId, nickname } = useParams(); //URL에서 :profileId 값 가져오기
  const [profileId, setProfileId] = useState(urlProfileId);
  const initLetter = {
    displayName: '',
    content: '',
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  //하늘편지 추가시 모달 useState
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  //하늘편지 수정시 모달 useState
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  //하늘편지 삭제시 모달 useState
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  //북마크 지정
  const [isBookmarks, setIsBookmarks] = useState(false);

  const [profile, setProfile] = useState({});

  const [tabList, setTabList] = useState(['이미지', '하늘편지']);
  // const [tabList, setTabList] = useState(['이미지', '하늘편지', '가족관계도']);
  const [activeTab, setActiveTab] = useState('이미지');
  const [hasFamilyTree, setHasFamilyTree] = useState(false);

  //탭 이미지
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const [letterId, setLetterId] = useState('');
  const [letters, setLetters] = useState([]);
  const [family, setFamily] = useState([]);
  const [postLetter, setPostLetter] = useState(initLetter);
  const [isRequestCompletedModalOpen, setIsRequestCompletedModalOpen] =
    useState(false);
  const [formRequestPrivateProfile, setFormRequestPrivateProfile] = useState(
    initFormPrivateProfile
  );

  const lgRef = useRef(null);

  const {
    isLoginModalOpen,
    setIsLoginModalOpen,
    isRequestModalOpen,
    setIsRequestModalOpen,
    showScreen,
  } = useProfilePermission(profileId, { shouldRedirect: false, nickname });

  useEffect(() => {
    // 스타일 추가
    const styleElement = document.createElement('style');
    styleElement.innerHTML = customButtonStyle;
    document.head.appendChild(styleElement);
  }, []);

  useEffect(() => {
    const fetchProfileId = async () => {
      if (nickname) {
        try {
          if (!nickname.startsWith('@')) {
            navigate('/');
            return;
          }

          const cleanNickname = nickname.substring(1);
          const res = await getProfileIdByNickname(cleanNickname);
          if (res.status === 200) {
            setProfileId(res.data.data.profileId);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchProfileId();
  }, [nickname, navigate]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!profileId) return;
      
      try {
        let res = await getSelectProfile(profileId);
        console.log(res);
        if (res.status === 200) {
          const { profile, extension, result } = res.data.data;
          // PROFILE_INACTIVE 상태 확인
          if (result === 'PROFILE_INACTIVE') {
            navigate('/error-profile-inactive');
            return;
          }
          setProfile(profile);
          if (extension) {
            setIsBookmarks(extension.isBookmarked);
            setHasFamilyTree(extension.hasFamilyTree);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, [profileId]);

  // 탭 변경 시 데이터 로드 및 레이아웃 조정
  useEffect(() => {
    const fetchTabDate = async () => {
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
          console.log('하늘편지 : ', res);
          if (res.status === 200) {
            const { data } = res.data;
            setLetters(data);
          }
        }
        if (activeTab === '가족관계도') {
          res = await getFamilyProfile(profileId);
          console.log('가족관계도 : ', res);
          if (res.status === 200) {
            const { items } = res.data.data;
            console.log(items);
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

    if (showScreen) fetchTabDate();

    if (showScreen && activeTab === '이미지') {
      setPage(1);
      setHasNext(true);
      fetchImages(1, false);
    }
  }, [activeTab, showScreen]);

  useEffect(() => {
    if (page === 1) return; // 초기 fetch는 탭 전환에서 처리
    fetchImages(page, true);
  }, [page]);

  const fetchImages = async (currentPage = 1, append = false) => {
    try {
      const res = await getPhotoSeletct(profileId, 'edit', currentPage);
      if (res.status === 200) {
        const { data } = res.data;
        if (data.length < 11) setHasNext(false);

        setImages((prev) => (append ? [...prev, ...data] : data));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isFetching || !hasNext) return;

      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      const scrollPercent = (scrollY + viewportHeight) / fullHeight;

      if (scrollPercent >= 0.8) {
        // 80% 도달했을 때
        setIsFetching(true);
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFetching, hasNext]);

  //하늘편지 useEffect
  useEffect(() => {
    if (hasFamilyTree) {
      setTabList(['이미지', '하늘편지', '가족관계도']);
      return;
    }
    setTabList(['이미지', '하늘편지']);
  }, [hasFamilyTree]);

  // 현재 선택된 이미지의 index 찾기
  const getCurrentImageIndex = () => {
    const gallery = lgRef.current?.instance;
    if (gallery) {
      return gallery.index;
    }
    // fallback: 현재 활성화된 `.lg-current` 클래스의 index 찾기
    const currentSlide = document.querySelector('.lg-container .lg-current');
    if (currentSlide) {
      return [...document.querySelectorAll('.lg-container .lg-item')].indexOf(
        currentSlide
      );
    }
    return -1;
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

  //하늘편지 삭제 모달창
  const handleRemoveLetterConfirm = async (letterId) => {
    setLetterId(letterId);
    setIsDeleteModalOpen(true);
  };

  //하늘편지 개별 삭제
  const handleLetterRemove = async () => {
    let res;
    res = await deleteLetters(profileId, letterId);
    if (res.status === 200) {
      res = await getLetters(profileId);
      const { data } = res.data;
      setIsDeleteModalOpen(false);
      setLetters(data);
    }
    letterInit;
  };

  const letterInit = () => {
    setPostLetter(initLetter);
  };

  const handleBookmarkToggle = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      hasAuthenticated();
      return;
    }

    if (!profileId) return;
    let res;
    if (!isBookmarks) {
      res = await postAddProfileBookmark(profileId);
    } else {
      res = await deleteBookmarksProfile(profileId);
    }

    if (res.status === 200) {
      setIsBookmarks((prevIsBookmark) => !prevIsBookmark);
    }
  };

  const hasAuthenticated = () => {
    if (!isAuthenticated) {
      setIsModalOpen(true);
      return;
    }
  };

  //비공개 계정 모달창 로그인 버튼
  const handleLoginModalOpen = async () => {
    localStorage.removeItem('dev_remberProfileUrl');
    localStorage.setItem('dev_remberProfileUrl', window.location.pathname);
    localStorage.setItem('redirectAfterLogin', window.location.pathname);
    navigate('/signin');
  };

  // 비공개 접근권한 요청 입력 핸들러
  const handleFormRequestPrivateProfileChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
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

  return (
    <>
      {!showScreen && <div className="blur-overlay"></div>}
      <section
        className="top-space-margin page-title-big-typography cover-background position-relative p-0 border-radius-10px lg-no-border-radius"
        style={{ overflow: 'unset' }}
      >
        <div className="container">
          <div
            className="row small-screen bg-light-gray"
            style={{
              backgroundSize: 'cover',
              backgroundImage: `url(
          ${profile.backgroundImageUrl}
        )`,
            }}
          >
            <div
              className="col-lg-5 col-md-6 position-relative page-title-extra-large align-self-center"
              data-anime='{ "el": "childs", "translateY": [30, 0], "opacity": [0,1], "duration": 600, "delay": 0, "staggervalue": 300, "easing": "easeOutQuad" }'
            ></div>
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
                  <div className="d-inline-block position-absolute overflow-hidden border-radius-100 progress-image md-left-0px w-180px md-w-120px h-180px md-h-120px top-minus-90px sm-w-80px sm-h-80px sm-top-minus-50px md-start-0 cursor-pointer">
                    <img
                      src={
                        profile.profileImageUrl
                          ? profile.profileImageUrl
                          : avatarImage
                      }
                      alt=""
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
              <div className="col-9 offset-3 ps-2 md-ps-30px">
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
                  <div className="xs-mt-25px d-flex flex-lg-column flex-md-row justify-content-md-center gap-lg-0 gap-md-4 gap-sm-5 py-lg-0 py-md-4">
                    <WebShareButton />
                    <Link
                      className="btn btn-extra-large btn-switch-text btn-box-shadow btn-none-transform btn-white left-icon btn-round-edge border-0 me-5px xs-me-0 w-100 md-w-50 mb-5 md-mb-2"
                      onClick={handleBookmarkToggle}
                    >
                      <span>
                        <span>
                          {/* <i className="feather icon-feather-users"></i> */}
                          {!isBookmarks ? (
                            <i className="fa-regular fa-bookmark align-middle text-base-color"></i>
                          ) : (
                            <i className="fa-solid fa-bookmark align-middle text-base-color"></i>
                          )}
                        </span>
                        <span
                          className="btn-double-text ls-0px"
                          data-text="북마크"
                        >
                          북마크
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
      <section className="pt-50px md-pt-0 pb-2">
        <div className="container">
          {profile.description &&
            profile.description.replace(/<[^>]*>?/gm, '').trim() && (
              <div className="bottom-minus-60px end-0 z-index-1 pe-1">
                <div className="col col-sm-12 offset-md-0 fs-20 md-ps-25px sm-ps-0 sm-mt-20px custom-quill-wrapper">
                  <ReactQuill
                    className="w-60 sm-w-100 mx-center"
                    value={profile.description}
                    readOnly={true}
                    theme="snow"
                    modules={{ toolbar: false }} // 툴바 제거
                  />
                </div>
              </div>
            )}
        </div>
      </section>

      {showScreen && (
        <section id="tab" className="pt-0 sm-pt-40px md-pb-70px">
          <div className="container">
            <div className="row">
              <div className="col-12 tab-style-04">
                <ul className="nav nav-tabs border-0 justify-content-center fs-20">
                  {tabList.map((tab) => (
                    <li key={tab} className="nav-item text-center">
                      <button
                        className={`nav-link ${
                          activeTab === tab
                            ? 'active text-base-color d-inline-block'
                            : 'd-inline-block'
                        }`}
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
                  {activeTab === '이미지' && (
                    <div className="w-100 sm-mt-10px xs-mb-8 my-5">
                      <LightGallery
                        speed={500}
                        closable={true}
                        download={false}
                        mobileSettings={{
                          controls: true,
                          showCloseIcon: true,
                        }}
                        thumbnail={true}
                        plugins={[lgThumbnail]}
                        selector=".gallery-item"
                        // onInit={onInit}
                        // ref={lgRef}
                      >
                        <div className="gallery-grid">
                          {/* 이미지 썸네일 */}
                          {images.map((image, index) => (
                            <a
                              href={image.url}
                              key={index}
                              className="gallery-item gallery-grid-item"
                              data-src={image.url}
                            >
                              <img src={image.url} loading="lazy" />
                            </a>
                          ))}
                        </div>
                      </LightGallery>
                      {images.length <= 0 && (
                        <div className="col-12 text-center mt-100px pb-2 fs-24">
                          <i className="feather icon-feather-camera align-middle icon-extra-large text-dark fs-50 md-fs-70 p-30px border border-4 border-dark border-radius-100px mb-1"></i>
                          <p className="fs-30 fw-800 text-black">
                            No Posts Yet
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === '하늘편지' && (
                    <div className="w-100 sm-mt-10px xs-mb-8 my-5">
                      <div className="row m-0">
                        <div
                          className="col-12 md-p-0"
                          // data-anime='{ "el": "childs", "translateY": [30, 0], "opacity": [0,1], "duration": 600, "delay":0, "staggervalue": 300, "easing": "easeOutQuad" }'
                        >
                          <div
                            className="toolbar-wrapper w-100 mb-40px md-mb-30px"
                            // data-anime='{ "translateY": [0, 0], "opacity": [0,1], "duration": 600, "delay":50, "staggervalue": 150, "easing": "easeOutQuad" }'
                          >
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
                                        return;
                                      }
                                      hasAuthenticated();
                                    }}
                                  >
                                    <i className="fa-regular fa-comment-dots align-middle icon-small pe-10px"></i>
                                    add comment
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          {letters.length > 0 ? (
                            <>
                              {letters.map((letter, index) => (
                                <div
                                  className={`row border-color-dark-gray position-relative g-0 sm-border-bottom-0 md-p-5 ${
                                    index % 2
                                      ? 'paper-note-odd'
                                      : 'paper-note-even'
                                  }`}
                                  key={index}
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
                              ))}
                            </>
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
                      <div
                        className="container"
                        // data-anime='{ "el": "childs", "translateX": [-50, 0], "opacity": [0,1], "duration": 600, "delay": 0, "staggervalue": 100, "easing": "easeOutQuad" }'
                      >
                        {family.map((f, index) => (
                          <div
                            className="row row-cols-12 row-cols-lg-12 row-cols-sm-2 mt-1 text-center"
                            key={index}
                          >
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
                                  <span className="number position-relative z-index-1 fw-600 sm-w-100">
                                    {f.familyTitle}
                                  </span>
                                  <div className="box-overlay rounded-circle"></div>
                                </div>
                              </div>
                            </div>
                            <div className="col-6 text-center process-step-style-02 hover-box last-paragraph-no-margin">
                              <div className="process-step-icon-box position-relative mt-30px md-mt-10px">
                                <div className="process-step-icon d-flex justify-content-start align-items-center mx-auto h-80px w-60 md-w-60 sm-w-60 fs-18 rounded-circle text-dark-gray fw-500">
                                  <span className="number position-relative z-index-1 fw-600">
                                    {f.displayName}
                                  </span>
                                  <div className="box-overlay rounded-circle"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      <Modal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      >
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
                <div className="col-12 ">
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
                    className="btn btn-black btn-medium btn-box-shadow btn-round-edge border-0 submit me-1"
                    onClick={handleSendLetter}
                  >
                    남기기
                  </Button>

                  <Button
                    className="btn btn-white btn-medium btn-box-shadow btn-round-edge border-1 submit me-1"
                    onClick={() => {
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
      </Modal>

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="p-7 lg-p-5 sm-p-7 bg-gradient-very-light-gray">
              <div className="row justify-content-center mb-30px sm-mb-10px">
                <div className="col-md-9 text-center">
                  <h4 className="text-dark-gray fw-500 mb-15px">
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

                <div className="col-lg-112 text-center text-lg-center">
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

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
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
                        onClick={() => setIsDeleteModalOpen(false)}
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="w-100">
          <div className="modal-content p-0 rounded shadow-lg">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="p-10 sm-p-7 bg-white">
                  <div className="row justify-content-center">
                    <div className="col-md-9 text-center">
                      <h6 className="text-dark-gray fw-500 mb-15px fs-24">
                        회원가입 또는 로그인 해야 진행 가능합니다.
                      </h6>
                    </div>
                    <div className="col-lg-12 text-center text-lg-center pt-3">
                      <input type="hidden" name="redirect" value="" />
                      <button
                        className="btn btn-white btn-large btn-box-shadow btn-round-edge submit me-1"
                        onClick={() => {
                          setIsModalOpen(false);
                          navigate('/signup');
                        }}
                      >
                        회원 가입
                      </button>
                      <button
                        className="btn btn-white btn-large btn-box-shadow btn-round-edge submit me-1"
                        onClick={() => {
                          localStorage.setItem('redirectAfterLogin', window.location.pathname + window.location.search);
                          setIsModalOpen(false);
                          navigate('/signin');
                        }}
                      >
                        로그인
                      </button>
                      <button
                        className="btn btn-white btn-large btn-box-shadow btn-round-edge submit me-1"
                        onClick={() => {
                          setIsModalOpen(false);
                        }}
                      >
                        닫기
                      </button>
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
    </>
  );
};

// CSS 스타일
const galleryStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '10px',
};

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

export default ViewProfilePage;
