import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Modal from '@/components/common/Modal/Modal';
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
import { FiUpload, FiImage } from 'react-icons/fi'; // 업로드 아이콘 사용
import { MdAddPhotoAlternate } from 'react-icons/md';

import {
  postRegisterProfile,
  getSelectProfile,
  putProfileBackgroundImage,
  putProfileImage,
  putProfileDescription,
  getPhotoProfile,
  getLettersProfile,
  getFamilyProfile,
  deleteLetters,
} from '@/api/memorial/memorialApi';

import avatarImage from '@/assets/images/sample/3d_avatar_10.png';

const ViewProfilePage = () => {
  const { profileId } = useParams(); //URL에서 :profileId 값 가져오기

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState('');
  const [profile, setProfile] = useState({});

  const [items, setItems] = useState([
    { id: '1', relation: '', name: '', isCustomInput: false },
  ]);
  const [activeTab, setActiveTab] = useState('이미지');

  const [images, setImages] = useState([
    {
      src: 'https://craftohtml.themezaa.com/images/gallery-14.jpg',
      thumb: 'https://craftohtml.themezaa.com/images/gallery-14.jpg',
    },
    {
      src: 'https://craftohtml.themezaa.com/images/gallery-08.jpg',
      thumb: 'https://craftohtml.themezaa.com/images/gallery-08.jpg',
    },
    {
      src: 'https://craftohtml.themezaa.com/images/gallery-07.jpg',
      thumb: 'https://craftohtml.themezaa.com/images/gallery-07.jpg',
    },
    {
      src: 'https://craftohtml.themezaa.com/images/gallery-01.jpg',
      thumb: 'https://craftohtml.themezaa.com/images/gallery-01.jpg',
    },
    {
      src: 'https://craftohtml.themezaa.com/images/gallery-02.jpg',
      thumb: 'https://craftohtml.themezaa.com/images/gallery-02.jpg',
    },
    {
      src: 'https://craftohtml.themezaa.com/images/gallery-03.jpg',
      thumb: 'https://craftohtml.themezaa.com/images/gallery-03.jpg',
    },
    {
      src: 'https://craftohtml.themezaa.com/images/gallery-04.jpg',
      thumb: 'https://craftohtml.themezaa.com/images/gallery-04.jpg',
    },
    {
      src: 'https://craftohtml.themezaa.com/images/gallery-05.jpg',
      thumb: 'https://craftohtml.themezaa.com/images/gallery-05.jpg',
    },
  ]);
  const [letters, setLetters] = useState([]);
  const [family, setFamily] = useState([]);

  const lgRef = useRef(null);

  useEffect(() => {
    // 스타일 추가
    const styleElement = document.createElement('style');
    styleElement.innerHTML = customButtonStyle;
    document.head.appendChild(styleElement);
  }, []);

  // 📌 탭 변경 시 데이터 로드 및 레이아웃 조정
  useEffect(() => {
    const fetchTabDate = async () => {
      try {
        let res;
        console.log(activeTab);
        if (!activeTab) return;
        if (activeTab === '이미지') {
          res = await getPhotoProfile(profileId);
          console.log('이미지 : ', res);
          if (res.status === 200) {
            const { data } = res.data;
            setImages(data);
          }
        }
        if (activeTab === '하늘편지') {
          res = await getLettersProfile(profileId);
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
      } catch (error) {
        console.error(error);
      }
    };

    fetchTabDate();
  }, [activeTab]);

  // const onInit = () => {
  //   setTimeout(() => {
  //     // const lgContainer = document.querySelector('.lg-container');
  //     const lgToolbar = document.getElementById('lg-toolbar-1');

  //     if (lgToolbar && !document.getElementById('edit-button')) {
  //       const editButton = document.createElement('button');
  //       editButton.innerText = '수정';
  //       editButton.classList.add('lg-custom-btn');
  //       editButton.classList.add('lg-custom-modify');
  //       editButton.id = 'edit-button';
  //       editButton.onclick = () => {
  //         const index = getCurrentImageIndex();
  //         handleEdit(index);
  //       };

  //       const deleteButton = document.createElement('button');
  //       deleteButton.innerText = '삭제';
  //       deleteButton.classList.add('lg-custom-btn');
  //       deleteButton.classList.add('lg-custom-remove');
  //       deleteButton.id = 'delete-button';
  //       deleteButton.onclick = () => {
  //         const index = getCurrentImageIndex();
  //         handleDelete(index);
  //       };

  //       lgToolbar.appendChild(editButton);
  //       lgToolbar.appendChild(deleteButton);
  //     }
  //   }, 100);
  // };

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

  // 드래그 종료 시 순서 업데이트
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    setItems(newItems);
  };

  // 직접 입력 필드 변경 핸들러
  const handleCustomInputChange = (index, value) => {
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, relation: value } : item
    );
    setItems(updatedItems);
  };

  // 이름 입력 필드 변경 핸들러
  const handleNameChange = (index, value) => {
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, name: value } : item
    );
    setItems(updatedItems);
  };

  // 삭제 핸들러
  const handleNameDelete = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  return (
    <>
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
                  <div className="d-inline-block position-absolute overflow-hidden border-radius-100 progress-image w-180px md-w-120px h-180px md-h-120px top-minus-90px md-start-0">
                    <img
                      src={
                        profile.profileImageUrl
                          ? profile.profileImageUrl
                          : avatarImage
                      }
                      alt=""
                    />
                    {/* <div
                      className="box-overlay"
                      style={{ backgroundColor: '#CDCDCD' }}
                    ></div>
                    <span className="number icon-extra-large text-text absolute-middle-center">
                      <i className="feather icon-feather-edit-1 icon-icon-extra-medium text-white"></i>
                    </span> */}
                  </div>
                </div>
              </div>
              <div className="col-9 offset-3 ps-2 md-ps-30px">
                <h5 className="text-dark-gray mb-5px fw-600">
                  {profile.displayName}
                </h5>
                <h6 className="mb-0">
                  {profile.birthday}~{profile.deathDate}
                </h6>
              </div>
              <div className="row position-absolute md-position-initial top-50px end-0 z-index-1 pe-1">
                {/* <div className="col-xl-10 col-lg-12 col-sm-7 lg-mb-30px md-mb-0"></div> */}
                <div className="xs-mt-25px d-flex flex-row flex-md-column gap-4 gap-md-0 md-ps-25px md-pe-25px">
                  <Link className="btn btn-extra-large btn-switch-text btn-box-shadow btn-none-transform btn-base-color left-icon btn-round-edge border-0 me-5px xs-me-0 w-100 mb-5">
                    <span>
                      <span>
                        <i className="feather icon-feather-share-2"></i>
                      </span>
                      <span
                        className="btn-double-text ls-0px"
                        data-text="공유하기"
                      >
                        공유하기
                      </span>
                    </span>
                  </Link>
                  {/* <Link className="btn btn-extra-large btn-switch-text btn-box-shadow btn-none-transform btn-white left-icon btn-round-edge border-0 me-5px xs-me-0 w-100 mb-5">
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
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pt-50px md-pt-0 pb-0">
        <div className="container">
          <div className="row bottom-minus-60px end-0 z-index-1 pe-1 ">
            {/* <div className="col-xl-6 col-lg-6 col-sm-7 lg-mb-30px md-mb-0"></div> */}
            <div className="col-xl-7 col-lg-9 offset-0 offset-md-3  xs-mt-25px text-start">
              <p>{profile.description}</p>
            </div>
            {/* <div className="mt-80px md-mt-100px sm-mt-90px d-flex justify-content-evenly justify-content-md-center gap-3">
              <Link className="btn btn-extra-large btn-switch-text btn-box-shadow btn-none-transform btn-gray left-icon btn-round-edge border-0 me-1 xs-me-0 w-20 md-w-45 mb-5">
                <span>
                  <span className="btn-double-text ls-0px" data-text="설정">
                    설정
                  </span>
                </span>
              </Link>
              <Link className="btn btn-extra-large btn-switch-text btn-box-shadow btn-none-transform btn-gray left-icon btn-round-edge border-0 xs-me-0 w-20 md-w-45 mb-5">
                <span>
                  <span className="btn-double-text ls-0px" data-text="미리보기">
                    미리보기
                  </span>
                </span>
              </Link>
            </div> */}
          </div>
        </div>
      </section>

      <section id="tab" className="pt-5">
        <div className="container">
          <div className="row">
            <div className="col-12 tab-style-04">
              <ul className="nav nav-tabs border-0 justify-content-center fs-19">
                <li className="nav-item px-5">
                  <a
                    data-bs-toggle="tab"
                    href="#tab_five1"
                    className="nav-link active"
                  >
                    이미지<span className="tab-border bg-dark-gray"></span>
                  </a>
                </li>
                <li className="nav-item px-5">
                  <a
                    className="nav-link"
                    data-bs-toggle="tab"
                    href="#tab_five2"
                  >
                    하늘편지
                    <span className="tab-border bg-dark-gray"></span>
                  </a>
                </li>
                <li className="nav-item px-5">
                  <a
                    className="nav-link"
                    data-bs-toggle="tab"
                    href="#tab_five3"
                  >
                    가족관계도
                    <span className="tab-border bg-dark-gray"></span>
                  </a>
                </li>
              </ul>
              <div className="mb-5 h-1px w-100 bg-extra-medium-gray sm-mt-10px xs-mb-8"></div>
              <div className="tab-content">
                <div className="tab-pane fade in active show" id="tab_five1">
                  <LightGallery
                    speed={500}
                    download={false}
                    thumbnail={true}
                    plugins={[lgThumbnail]}
                    selector=".gallery-item"
                    // onInit={onInit}
                    // ref={lgRef}
                  >
                    <div style={galleryStyle}>
                      {images.map((image, index) => (
                        <a
                          href={image.src}
                          key={index}
                          className="gallery-item"
                          data-src={image.src}
                        >
                          <img
                            src={image.thumb}
                            // alt={`Gallery Image ${index}`}
                            style={imageStyle}
                          />
                        </a>
                      ))}
                    </div>
                  </LightGallery>
                </div>

                <div className="tab-pane fade in" id="tab_five2">
                  <div className="row m-0">
                    <div
                      className="col-12 md-p-0"
                      data-anime='{ "el": "childs", "translateY": [30, 0], "opacity": [0,1], "duration": 600, "delay":0, "staggervalue": 300, "easing": "easeOutQuad" }'
                    >
                      <div
                        className="toolbar-wrapper w-100 mb-40px md-mb-30px"
                        data-anime='{ "translateY": [0, 0], "opacity": [0,1], "duration": 600, "delay":50, "staggervalue": 150, "easing": "easeOutQuad" }'
                      >
                        <div className="mx-auto me-md-0 col tab-style-08">
                          <ul className="nav nav-tabs d-flex justify-content-between border-0 fs-18 fw-600">
                            <li className="nav-item">
                              <div className="position-relative">
                                <input
                                  className="border-1 nav-link w-400px md-w-100"
                                  type="text"
                                  name="name"
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
                                onClick={() => setIsModalOpen(true)}
                              >
                                <i className="fa-regular fa-comment-dots align-middle icon-small pe-10px"></i>
                                add comment
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="row border-color-dark-gray position-relative g-0 sm-border-bottom-0 sm-pb-20px paper-note-odd md-ps-3">
                        <div className="col-12 col-md-1 text-md-center align-self-center">
                          <span className="text-dark-gray fs-14 fw-600">
                            김사랑
                          </span>
                        </div>
                        <div className="col-lg-8 col-md-7 last-paragraph-no-margin ps-30px pe-30px pe-30px pt-25px pb-25px sm-pt-15px sm-pb-15px sm-px-0">
                          <p className="sm-w-85">
                            하늘나라에서도 행복해야해~ 사랑해
                          </p>
                        </div>
                        <div className="col-lg-2 col-md-3 align-self-center text-md-end">
                          <span>{'2024/02/15 15:12'}</span>
                        </div>
                        {/* <div className="col-auto col-md-1 align-self-center text-end text-md-center sm-position-absolute right-5px">
                          <a href="#">
                            <i className="feather icon-feather-trash-2 align-middle text-dark-gray icon-extra-medium"></i>
                          </a>
                        </div> */}
                      </div>
                      <div className="row border-color-dark-gray position-relative g-0 sm-pb-20px sm-pt-30px paper-note-even md-ps-3">
                        <div className="col-12 col-md-1 text-md-center align-self-center">
                          <span className="text-dark-gray fs-14 fw-600">
                            김사랑
                          </span>
                        </div>
                        <div className="col-lg-8 col-md-7 last-paragraph-no-margin ps-30px pe-30px pe-30px pt-25px pb-25px sm-pt-15px sm-pb-15px sm-px-0">
                          <p className="sm-w-85">
                            하늘나라에서도 행복해야해~ 사랑해
                          </p>
                        </div>
                        <div className="col-lg-2 col-md-3 align-self-center text-md-end">
                          <span>{'2024/02/15 15:12'}</span>
                        </div>
                        {/* <div className="col-auto col-md-1 align-self-center text-end text-md-center sm-position-absolute right-5px">
                          <a href="#">
                            <i className="feather icon-feather-trash-2 align-middle text-dark-gray icon-extra-medium"></i>
                          </a>
                        </div> */}
                      </div>
                      <div className="row border-color-dark-gray position-relative g-0 sm-pb-20px sm-pt-30px paper-note-odd md-ps-3">
                        <div className="col-12 col-md-1 text-md-center align-self-center">
                          <span className="text-dark-gray fs-14 fw-600">
                            김사랑
                          </span>
                        </div>
                        <div className="col-lg-8 col-md-7 last-paragraph-no-margin ps-30px pe-30px pe-30px pt-25px pb-25px sm-pt-15px sm-pb-15px sm-px-0">
                          <p className="sm-w-85">
                            하늘나라에서도 행복해야해~ 사랑해
                          </p>
                        </div>
                        <div className="col-lg-2 col-md-3 align-self-center text-md-end">
                          <span>{'2024/02/15 15:12'}</span>
                        </div>
                        {/* <div className="col-auto col-md-1 align-self-center text-end text-md-center sm-position-absolute right-5px">
                          <a href="#">
                            <i className="feather icon-feather-trash-2 align-middle text-dark-gray icon-extra-medium"></i>
                          </a>
                        </div> */}
                      </div>
                      <div className="row border-color-dark-gray position-relative g-0 sm-pb-20px sm-pt-30px paper-note-even md-ps-3">
                        <div className="col-12 col-md-1 text-md-center align-self-center">
                          <span className="text-dark-gray fs-14 fw-600">
                            김사랑
                          </span>
                        </div>
                        <div className="col-lg-8 col-md-7 last-paragraph-no-margin ps-30px pe-30px pe-30px pt-25px pb-25px sm-pt-15px sm-pb-15px sm-px-0">
                          <p className="sm-w-85">
                            하늘나라에서도 행복해야해~ 사랑해
                          </p>
                        </div>
                        <div className="col-lg-2 col-md-3 align-self-center text-md-end">
                          <span>{'2024/02/15 15:12'}</span>
                        </div>
                        {/* <div className="col-auto col-md-1 align-self-center text-end text-md-center sm-position-absolute right-5px">
                          <a href="#">
                            <i className="feather icon-feather-trash-2 align-middle text-dark-gray icon-extra-medium"></i>
                          </a>
                        </div> */}
                      </div>
                      <div className="row border-color-dark-gray position-relative g-0 sm-pb-20px sm-pt-30px paper-note-odd md-ps-3">
                        <div className="col-12 col-md-1 text-md-center align-self-center">
                          <span className="text-dark-gray fs-14 fw-600">
                            김사랑
                          </span>
                        </div>
                        <div className="col-lg-8 col-md-7 last-paragraph-no-margin ps-30px pe-30px pe-30px pt-25px pb-25px sm-pt-15px sm-pb-15px sm-px-0">
                          <p className="sm-w-85">
                            하늘나라에서도 행복해야해~ 사랑해
                          </p>
                        </div>
                        <div className="col-lg-2 col-md-3 align-self-center text-md-end">
                          <span>{'2024/02/15 15:12'}</span>
                        </div>
                        {/* <div className="col-auto col-md-1 align-self-center text-end text-md-center sm-position-absolute right-5px">
                          <a href="#">
                            <i className="feather icon-feather-trash-2 align-middle text-dark-gray icon-extra-medium"></i>
                          </a>
                        </div> */}
                      </div>
                      <div className="row border-color-dark-gray position-relative g-0 sm-pb-20px sm-pt-30px paper-note-even md-ps-3">
                        <div className="col-12 col-md-1 text-md-center align-self-center">
                          <span className="text-dark-gray fs-14 fw-600">
                            김사랑
                          </span>
                        </div>

                        <div className="col-lg-8 col-md-7 last-paragraph-no-margin ps-30px pe-30px pt-25px pb-25px sm-pt-15px sm-pb-15px sm-px-0">
                          <p className="sm-w-85">
                            하늘나라에서도 행복해야해~ 사랑해1
                          </p>
                        </div>

                        <div className="col-lg-2 col-md-3 align-self-center text-md-end">
                          <span>{'2024/02/15 15:12'}</span>
                        </div>

                        {/* <div className="col-auto col-md-1 align-self-center text-end text-md-center sm-position-absolute right-5px">
                          <a href="#">
                            <i className="feather icon-feather-trash-2 align-middle text-dark-gray icon-extra-medium"></i>
                          </a>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="tab-pane fade in" id="tab_five3">
                  <div
                    className="container"
                    data-anime='{ "el": "childs", "translateX": [-50, 0], "opacity": [0,1], "duration": 600, "delay": 0, "staggervalue": 100, "easing": "easeOutQuad" }'
                  >
                    <div className="row row-cols-12 row-cols-lg-12 row-cols-sm-2 mt-6 md-mt-50px text-center">
                      <div className="col text-center process-step-style-02 hover-box last-paragraph-no-margin md-mb-50px">
                        <div className="process-step-icon-box position-relative mt-30px">
                          <span className="progress-step-separator bg-dark-gray opacity-1 w-30 separator-line-1px"></span>

                          <div className="process-step-icon d-flex justify-content-end align-items-center mx-auto h-80px w-60 md-w-80 fs-18 rounded-circle text-dark-gray fw-500">
                            <div className="process-step-icon d-flex justify-content-center align-items-center bg-black h-80px w-80px fs-18 rounded-circle text-dark-gray box-shadow-double-large fw-500">
                              <span className="number position-relative z-index-1 fw-600">
                                <i className="feather icon-feather-user align-middle icon-large text-white"></i>
                              </span>
                              <div className="box-overlay bg-black rounded-circle"></div>
                            </div>
                            <span className="number position-relative z-index-1 fw-600">
                              아버지
                            </span>
                            <div className="box-overlay rounded-circle"></div>
                          </div>
                        </div>
                      </div>

                      <div className="col text-center process-step-style-02 hover-box last-paragraph-no-margin md-mb-50px">
                        <div className="process-step-icon-box position-relative mt-30px">
                          <div className="process-step-icon d-flex justify-content-start align-items-center mx-auto h-80px w-60 fs-18 rounded-circle text-dark-gray fw-500">
                            <span className="number position-relative z-index-1 fw-600">
                              고길동
                            </span>
                            <div className="box-overlay rounded-circle"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
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
                    name="deliveryName"
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
                    rows="5"
                    cols="5"
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

                  <Button className="btn btn-black btn-small btn-box-shadow btn-round-edge submit me-1">
                    남기기
                  </Button>

                  <Button
                    className="btn btn-white btn-small btn-box-shadow btn-round-edge submit me-1"
                    onClick={() => setIsModalOpen(false)}
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
    </>
  );
};

// CSS 스타일
const galleryStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '10px',
};

const imageStyle = {
  width: '100%',
  height: 'auto',
  cursor: 'pointer',
};

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
