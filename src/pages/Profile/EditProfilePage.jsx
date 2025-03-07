import { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
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
import { FiUpload, FiImage } from 'react-icons/fi'; // 업로드 아이콘 사용
import { MdAddPhotoAlternate } from 'react-icons/md';

import {
  postRegisterProfile,
  getSelectProfile,
} from '@/api/memorial/memorialApi';

import avatarImage from '@/assets/images/base-profile-image.png';
import gallery1 from '@/assets/images/sample/gallery-1.jpg';
import gallery2 from '@/assets/images/sample/gallery-2.jpg';
import gallery3 from '@/assets/images/sample/gallery-3.jpg';

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['blockquote'],
    [{ script: 'sub' }, { script: 'super' }],
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
  'blockquote',
  'list',
  'bullet',
  'script',
  'indent',
  'color',
  'background',
  'align',
];

const images = [
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
];

const EditProfilePage = () => {
  const navigate = useNavigate();
  const { profileId } = useParams(); //URL에서 :profileId 값 가져오기
  const [content, setContent] = useState('test');
  const [profile, setProfile] = useState({});

  const [items, setItems] = useState([
    { id: '1', relation: '', name: '', isCustomInput: false },
  ]);

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

  const lgRef = useRef(null);
  const fileInputRef = useRef(null);

  // 업로드 버튼 클릭 시 파일 업로드 창 열기
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // 파일 업로드 핸들러
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const updatedImages = [...images];
      updatedImages[0] = { src: imageUrl, thumb: imageUrl }; // 첫 번째 이미지 변경
      setImages(updatedImages);
    }
  };

  useEffect(() => {
    // 스타일 추가
    const styleElement = document.createElement('style');
    styleElement.innerHTML = customButtonStyle;
    document.head.appendChild(styleElement);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getSelectProfile(profileId);
        console.log(res);
        if (res.status === 200) {
          const { profile } = res.data.data;
          setProfile(profile);
          console.log(profile.description);
          setContent(profile.description);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  const handleEdit = (index) => {
    alert(`이미지 ${index + 1} 수정하기`);
  };

  const handleDelete = (index) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      alert(`이미지 ${index + 1} 삭제됨`);
    }
  };

  const onInit = () => {
    setTimeout(() => {
      // const lgContainer = document.querySelector('.lg-container');
      const lgToolbar = document.getElementById('lg-toolbar-1');

      if (lgToolbar && !document.getElementById('edit-button')) {
        const editButton = document.createElement('button');
        editButton.innerText = '수정';
        editButton.classList.add('lg-custom-btn');
        editButton.classList.add('lg-custom-modify');
        editButton.id = 'edit-button';
        editButton.onclick = () => {
          const index = getCurrentImageIndex();
          handleEdit(index);
        };

        const deleteButton = document.createElement('button');
        deleteButton.innerText = '삭제';
        deleteButton.classList.add('lg-custom-btn');
        deleteButton.classList.add('lg-custom-remove');
        deleteButton.id = 'delete-button';
        deleteButton.onclick = () => {
          const index = getCurrentImageIndex();
          handleDelete(index);
        };

        lgToolbar.appendChild(editButton);
        lgToolbar.appendChild(deleteButton);
      }
    }, 100);
  };

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

  // 항목 추가 기능
  const handleAddItem = () => {
    const newItem = {
      id: `${items.length + 1}`,
      relation: '',
      name: '',
      isCustomInput: false,
    };
    setItems([...items, newItem]);
  };

  // 드래그 종료 시 순서 업데이트
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    setItems(newItems);
  };

  // 드롭다운 변경 핸들러
  const handleSelectChange = (index, value) => {
    const updatedItems = items.map((item, i) =>
      i === index
        ? {
            ...item,
            relation: value,
            isCustomInput: value === '직접 입력',
          }
        : item
    );
    setItems(updatedItems);
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

  const handleNavigate = (e) => {
    e.preventDefault();

    navigate(`/setting-profile/${profileId}`);
  };

  return (
    <>
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
              backgroundImage: `url(
            ${profile.profileImageUrl}
          )`,
            }}
          >
            <div
              className="col-lg-5 col-md-6 position-relative page-title-extra-large align-self-center"
              data-anime='{ "el": "childs", "translateY": [30, 0], "opacity": [0,1], "duration": 600, "delay": 0, "staggervalue": 300, "easing": "easeOutQuad" }'
            ></div>
            <div className="col-lg-7 col-md-6 position-relative d-md-block">
              <div className="w-85px h-85px border-radius-100 d-flex align-items-center justify-content-center position-absolute right-40px md-right-0px bottom-minus-70px mt-10 translate-middle-y">
                <div
                  className="video-icon-box video-icon-medium feature-box-icon-rounded w-65px md-w-50px h-65px md-h-50px rounded-circle d-flex align-items-center justify-content-center cursor-pointer"
                  style={{ backgroundColor: '#CDCDCD' }}
                >
                  <span>
                    <span className="video-icon">
                      {/* <i className="fa-solid fa-house-chimney-medical icon-icon-extra-medium text-white position-relative top-minus-2px m-0"></i> */}
                      <i className="feather icon-feather-edit-1 icon-extra-medium text-white position-relative top-minus-2px m-0"></i>
                      <span className="video-icon-sonar">
                        <span className="video-icon-sonar-bfr border border-1 border-red"></span>
                      </span>
                    </span>
                  </span>
                </div>
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
                  <div className="d-inline-block position-absolute overflow-hidden border-radius-100 progress-image w-180px md-w-120px h-180px md-h-120px top-minus-90px md-start-0 cursor-pointer">
                    <img
                      src={
                        profile.profileImageUrl
                          ? profile.profileImageUrl
                          : avatarImage
                      }
                      alt=""
                    />

                    <div
                      className="box-overlay"
                      style={{ backgroundColor: '#CDCDCD' }}
                    ></div>
                    <span className="number icon-extra-large text-text absolute-middle-center">
                      <i className="feather icon-feather-edit-1 icon-icon-extra-medium text-white"></i>
                    </span>
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
              <div className="row position-absolute md-position-initial bottom-minus-60px end-0 z-index-1 pe-1">
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
                  <Link className="btn btn-extra-large btn-switch-text btn-box-shadow btn-none-transform btn-white left-icon btn-round-edge border-0 me-5px xs-me-0 w-100 mb-5">
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
                modules={modules}
                formats={formats}
                className="w-700px md-w-95 lh-initial"
              />
            </div>
            <div className="mt-80px md-mt-100px sm-mt-90px d-flex justify-content-evenly justify-content-md-center gap-3">
              <Link
                className="btn btn-extra-large btn-switch-text btn-box-shadow btn-none-transform btn-gray left-icon btn-round-edge border-0 me-1 xs-me-0 w-20 md-w-45 mb-5"
                onClick={handleNavigate}
              >
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
            </div>
          </div>
        </div>
      </section>

      <section id="tab" className="pt-0 sm-pt-40px">
        <div className="container">
          <div className="row">
            <div className="col-12 tab-style-04">
              <ul className="nav nav-tabs border-0 justify-content-center fs-19">
                <li className="nav-item">
                  <a
                    data-bs-toggle="tab"
                    href="#tab_five1"
                    className="nav-link active"
                  >
                    이미지<span className="tab-border bg-dark-gray"></span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-bs-toggle="tab"
                    href="#tab_five2"
                  >
                    하늘편지
                    <span className="tab-border bg-dark-gray"></span>
                  </a>
                </li>
                <li className="nav-item">
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
                    onInit={onInit}
                    ref={lgRef}
                  >
                    <div style={galleryStyle}>
                      {/* 첫 번째 업로드 영역 */}
                      <div
                        onClick={handleUploadClick}
                        style={{
                          ...imageStyle,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#f0f0f0',
                          cursor: 'pointer',
                          border: '2px dashed #ccc',
                        }}
                      >
                        <MdAddPhotoAlternate size={200} color="#888" />
                        <input
                          type="file"
                          accept="image/*"
                          ref={fileInputRef}
                          style={{ display: 'none' }}
                          onChange={handleFileUpload}
                        />
                      </div>

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
                      className="col-12"
                      data-anime='{ "el": "childs", "translateY": [30, 0], "opacity": [0,1], "duration": 600, "delay":0, "staggervalue": 300, "easing": "easeOutQuad" }'
                    >
                      <div className="row border-bottom border-color-dark-gray position-relative g-0 sm-border-bottom-0 sm-pb-30px">
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
                        <div className="col-auto col-md-1 align-self-center text-end text-md-center sm-position-absolute right-5px">
                          <a href="#">
                            <i className="feather icon-feather-trash-2 align-middle text-dark-gray icon-extra-medium"></i>
                          </a>
                        </div>
                      </div>
                      <div className="row border-bottom border-color-dark-gray position-relative g-0 sm-pb-30px sm-pt-30px">
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
                        <div className="col-auto col-md-1 align-self-center text-end text-md-center sm-position-absolute right-5px">
                          <a href="#">
                            <i className="feather icon-feather-trash-2 align-middle text-dark-gray icon-extra-medium"></i>
                          </a>
                        </div>
                      </div>
                      <div className="row border-bottom border-color-dark-gray position-relative g-0 sm-pb-30px sm-pt-30px">
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
                        <div className="col-auto col-md-1 align-self-center text-end text-md-center sm-position-absolute right-5px">
                          <a href="#">
                            <i className="feather icon-feather-trash-2 align-middle text-dark-gray icon-extra-medium"></i>
                          </a>
                        </div>
                      </div>
                      <div className="row border-bottom border-color-dark-gray position-relative g-0 sm-pb-30px sm-pt-30px">
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
                        <div className="col-auto col-md-1 align-self-center text-end text-md-center sm-position-absolute right-5px">
                          <a href="#">
                            <i className="feather icon-feather-trash-2 align-middle text-dark-gray icon-extra-medium"></i>
                          </a>
                        </div>
                      </div>
                      <div className="row border-bottom border-color-dark-gray position-relative g-0 sm-pb-30px sm-pt-30px">
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
                        <div className="col-auto col-md-1 align-self-center text-end text-md-center sm-position-absolute right-5px">
                          <a href="#">
                            <i className="feather icon-feather-trash-2 align-middle text-dark-gray icon-extra-medium"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="tab-pane fade in" id="tab_five3">
                  <div className="row">
                    <div className="row align-items-center">
                      <div className="col-xl-12 col-lg-10 col-sm-5 form-results d-block mt-20px mb-0 text-center">
                        <p className="text-black fs-22">
                          아래 가족을 추가하고 드래그하세요.
                        </p>
                      </div>
                    </div>
                    <div className="row  align-items-center">
                      <div className="col-xl-10 col-lg-10 col-sm-5 text-end text-sm-center text-lg-end xs-mt-25px mb-25px pe-0">
                        <Button
                          className="btn btn-black btn-large btn-round-edge btn-box-shadow text-uppercase"
                          onClick={handleAddItem}
                        >
                          <i className="feather icon-feather-plus align-bottom text-white icon-extra-medium"></i>
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
                            {items.map((item, index) => (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
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
                                        {item.isCustomInput ? (
                                          <input
                                            className="border-color-transparent-dark-very-light form-control bg-transparent required"
                                            type="text"
                                            value={item.relation}
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
                                            value={item.relation}
                                            onChange={(e) =>
                                              handleSelectChange(
                                                index,
                                                e.target.value
                                              )
                                            }
                                          >
                                            <option value="">- 선택 -</option>
                                            <option value="아버지">
                                              아버지
                                            </option>
                                            <option value="어머니">
                                              어머니
                                            </option>
                                            <option value="아들">아들</option>
                                            <option value="딸">딸</option>
                                            <option value="직접 입력">
                                              직접 입력
                                            </option>
                                          </select>
                                        )}
                                      </div>

                                      {/* 이름 입력 필드 */}
                                      <div className="col-lg-6 col-md-7 last-paragraph-no-margin ps-30px pe-30px pe-30px pt-25px sm-pt-15px sm-pb-15px sm-px-0">
                                        <input
                                          className="mb-20px md-mb-0 border-color-transparent-dark-very-light form-control bg-transparent required md-pt-0 md-pb-0"
                                          type="text"
                                          placeholder="이름"
                                          value={item.name}
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
                                          onClick={() => handleDelete(index)}
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
              </div>
            </div>
          </div>
        </div>
      </section>
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

export default EditProfilePage;
