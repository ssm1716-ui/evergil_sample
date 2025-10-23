import React from 'react';
import { Link } from 'react-router-dom';
import WebShareButton from '@/components/Share/WebShareButton';
import { formatDateRelace } from '@/utils/utils';
import avatarImage from '@/assets/images/base-profile-image.png';

const ProfileHeader = ({
  profile,
  pageMode,
  showScreen,
  isOwner,
  isEditor,
  isBookmarks,
  profileId,
  profileNickname,
  onBackgroundImageClick,
  onProfileImageClick,
  onBookmarkToggle,
  backImageInputRef,
}) => {
  return (
    <>
      {/* 배경 헤더 */}
      <section className="top-space-margin page-title-big-typography cover-background position-relative p-0 border-radius-10px lg-no-border-radius">
        <div className="container" style={{ position: 'relative' }}>
          <div
            className="row small-screen bg-light-gray"
            style={{
              backgroundSize: 'cover',
              backgroundImage: `url(${profile.backgroundImageUrl})`,
              cursor: pageMode === 'edit' || profile.backgroundImageUrl ? 'pointer' : 'default',
              position: 'relative',
            }}
            onClick={onBackgroundImageClick}
            role="button"
            tabIndex={0}
            title={
              profile.backgroundImageUrl
                ? '배경 이미지 전체화면 보기'
                : pageMode === 'edit'
                ? '배경 이미지 선택'
                : ''
            }
          >
            {/* 그라데이션 오버레이 */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
                pointerEvents: 'none'
              }}
            />
          </div>

          {/* 배너 변경 버튼 (edit 모드) */}
          {pageMode === 'edit' && (
            <div
              className="position-absolute"
              style={{
                right: '20px',
                top: '20px',
                zIndex: 10,
              }}
            >
              <button
                className="btn btn-sm d-flex align-items-center gap-2"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (profile.backgroundImageUrl) {
                    onBackgroundImageClick(e);
                  } else if (backImageInputRef?.current) {
                    backImageInputRef.current.click();
                  }
                }}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  color: '#374151',
                  fontSize: '14px',
                  fontWeight: '500',
                  padding: '8px 16px'
                }}
              >
                <i className="feather icon-feather-camera"></i>
                배너 변경
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 프로필 정보 섹션 */}
      <section className="p-0">
        <div className="container">
          <div className="row row-cols-1 row-cols-lg-4 row-cols-sm-2">
            <div className="col-lg-12 col-md-12 position-relative page-title-extra-large align-self-center">
              {/* 프로필 이미지 */}
              <div className="col-2 process-step-style-03 text-center last-paragraph-no-margin hover-box">
                <div className="process-step-icon-box position-relative mb-20px">
                  <div
                    className="image-container d-inline-block position-absolute overflow-hidden border-radius-100 progress-image md-left-0px w-180px md-w-120px h-180px md-h-120px top-minus-90px sm-w-80px sm-h-80px sm-top-minus-50px md-start-0 cursor-pointer"
                    onClick={onProfileImageClick}
                    role="button"
                    tabIndex={0}
                  >
                    <img src={profile.profileImageUrl || avatarImage} alt="" loading="lazy" />
                  </div>
                </div>
              </div>

              {/* 이름 및 날짜 */}
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

            {/* 액션 버튼들 - 반응형 개선 */}
            {showScreen && (
            <div
                className="row position-absolute md-position-initial end-0 z-index-1 pe-1"
                style={{
                // 날짜 둘 다 있을 때: -110px
                // 날짜 하나만 있거나 없을 때: -145px
                bottom: profile.birthday && profile.deathDate ? '-110px' : '-145px'
                }}
            >
                {/* 반응형 스타일 추가 */}
                <style>
                {`
                    /* PC & 태블릿 - 우측 정렬 */
                    .button-container-responsive {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    gap: 8px;
                    justify-content: flex-end;
                    max-width: 100%;
                    }
                    
                    /* 작은 모바일 (576px 이하) - 2개씩 2줄, 중앙 정렬 */
                    @media (max-width: 576px) {
                    .button-container-responsive {
                        justify-content: center !important;
                    }
                    .button-container-responsive > * {
                        width: calc(50% - 4px) !important;
                        min-width: calc(50% - 4px) !important;
                        flex: 0 0 calc(50% - 4px) !important;
                    }
                    /* 날짜 없을 때 버튼 위치 추가 조정 */
                    .row.position-absolute.no-dates {
                        bottom: -170px !important;
                    }
                    .row.position-absolute.has-dates {
                        bottom: -150px !important;
                    }
                    }
                    
                    /* 중간 크기 (577px~780px) - 2개씩 2줄, 중앙 정렬 */
                    @media (min-width: 577px) and (max-width: 780px) {
                    .button-container-responsive {
                        justify-content: center !important;
                    }
                    .button-container-responsive > * {
                        width: calc(50% - 4px) !important;
                        min-width: calc(50% - 4px) !important;
                        flex: 0 0 calc(50% - 4px) !important;
                        max-width: 200px !important;
                    }
                    /* 날짜 없을 때 버튼 위치 추가 조정 */
                    .row.position-absolute.no-dates {
                        bottom: -150px !important;
                    }
                    .row.position-absolute.has-dates {
                        bottom: -130px !important;
                    }
                    }
                    
                    /* 태블릿 (781px~991px) - 4개 1줄, 중앙 정렬 */
                    @media (min-width: 781px) and (max-width: 991px) {
                    .button-container-responsive {
                        justify-content: center !important;
                    }
                    .button-container-responsive > * {
                        width: 110px !important;
                        min-width: 110px !important;
                        padding: 8px 12px !important;
                        font-size: 13px !important;
                    }
                    .button-container-responsive span {
                        display: inline !important;
                    }
                    }
                `}
                </style>

                <div 
                className={`button-container-responsive xs-mt-25px sm-px-20px py-lg-0 py-md-4 ${
                    profile.birthday && profile.deathDate ? 'has-dates' : 'no-dates'
                }`}
                >
                {/* 공유하기 버튼 */}
                <WebShareButton />

                {/* Edit 모드 버튼들 */}
                {pageMode === 'edit' && isOwner && (
                    <>
                    {/* 초대하기 */}
                    <Link
                        to={`/profile/manage-profile/${profileId}`}
                        className="btn btn-sm d-flex align-items-center gap-2"
                        style={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        padding: '8px 16px',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#374151',
                        whiteSpace: 'nowrap',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                        textDecoration: 'none',
                        width: '120px',
                        justifyContent: 'center'
                        }}
                    >
                        <i className="feather icon-feather-users" style={{ fontSize: '16px' }}></i>
                        <span>초대하기</span>
                    </Link>

                    {/* 프로필 설정 */}
                    <Link
                        to={`/profile/setting-profile/${profileId}`}
                        className="btn btn-sm d-flex align-items-center gap-2"
                        style={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        padding: '8px 16px',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#374151',
                        whiteSpace: 'nowrap',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                        textDecoration: 'none',
                        width: '120px',
                        justifyContent: 'center'
                        }}
                    >
                        <i className="feather icon-feather-settings" style={{ fontSize: '16px' }}></i>
                        <span>프로필 설정</span>
                    </Link>

                    {/* 미리보기 */}
                    <Link
                        to={
                        profileNickname
                            ? `/${profileNickname}/preview`
                            : `/profile/preview/${profileId}`
                        }
                        className="btn btn-sm d-flex align-items-center gap-2"
                        style={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        padding: '8px 16px',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#374151',
                        whiteSpace: 'nowrap',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                        textDecoration: 'none',
                        width: '120px',
                        justifyContent: 'center'
                        }}
                    >
                        <i className="feather icon-feather-eye" style={{ fontSize: '16px' }}></i>
                        <span>미리보기</span>
                    </Link>
                    </>
                )}

                {/* View 모드 - 편집하기 버튼 (owner/editor) */}
                {pageMode === 'view' && (isOwner || isEditor) && (
                    <Link
                    to={`/profile/edit/${profileId}`}
                    className="btn btn-sm d-flex align-items-center gap-2"
                    style={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        padding: '8px 16px',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#374151',
                        whiteSpace: 'nowrap',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                        textDecoration: 'none',
                        width: '120px',
                        justifyContent: 'center'
                    }}
                    >
                    <i className="feather icon-feather-edit align-middle" style={{ fontSize: '16px' }}></i>
                    <span>편집하기</span>
                    </Link>
                )}

                {/* View 모드 - 북마크 버튼 */}
                {pageMode === 'view' && (
                    <button
                    onClick={onBookmarkToggle}
                    className="btn btn-sm d-flex align-items-center gap-2"
                    style={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        padding: '8px 16px',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#374151',
                        whiteSpace: 'nowrap',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                        width: '120px',
                        justifyContent: 'center'
                    }}
                    >
                    <i
                        className={`fa-${isBookmarks ? 'solid' : 'regular'} fa-bookmark align-middle`}
                        style={{ fontSize: '16px', color: isBookmarks ? '#3b82f6' : '#374151' }}
                    ></i>
                    <span>북마크</span>
                    </button>
                )}
                </div>
            </div>
            )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfileHeader;