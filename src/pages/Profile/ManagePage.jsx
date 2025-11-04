import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from '@/components/common/Button/Button';
import Modal from '@/components/common/Modal/Modal';
import Select from 'react-select';
import { FaEye, FaEyeSlash, FaLink, FaShareAlt, FaUserFriends, FaUserLock, FaEnvelope, FaUserShield, FaArrowLeft, FaQuestionCircle } from 'react-icons/fa';

import everlinkTop from '@/assets/images/evergil_contact.jpeg';
import UserGuideModal from '@/components/profile/ManagePage/UserGuideModal';

import useProfilePermission from '@/hooks/useProfilePermission';
import {
  postEmailInvitations,
  getInvitationsList,
  putInvitationPermissions,
  deleteInvitationPermissions,
  deleteInvitationCancel,
  putProfileScope,
  getPrivateProfileAccessRequests,
  putPrivateAccessRequests,
  getSelectProfile,
} from '@/api/memorial/memorialApi';

import { isValidEmail } from '@/utils/validators';

const options = [
  {
    value: 'PUBLIC',
    label: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <FaEye style={{ marginRight: 10 }} />
        전체공개
      </div>
    ),
  },
  {
    value: 'PRIVATE',
    label: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <FaEyeSlash style={{ marginRight: 10 }} />
        비공개
      </div>
    ),
  },
];

const initFormPrivateProfile = {
  name: '',
  memo: '',
};

const ManagePage = () => {
  const navigate = useNavigate();
  const { profileId } = useParams();
  const [receiverEmail, setReceiverEmail] = useState('');
  const [isError, setIsError] = useState(false);
  const [scope, setScope] = useState('PUBLIC');
  const [profile, setProfile] = useState({});
  const [invitations, setInvitations] = useState([]);
  const [privateRequests, setPrivateRequests] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCopyLinkOpen, setIsModalCopyLinkOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isUserGuideModalOpen, setIsUserGuideModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [formRequestPrivateProfile, setFormRequestPrivateProfile] = useState(initFormPrivateProfile);

  const lgRef = useRef(null);

  const {
    isLoginModalOpen,
    setIsLoginModalOpen,
    isRequestModalOpen,
    setIsRequestModalOpen,
    showScreen,
    currentPermission,
  } = useProfilePermission(profileId, { shouldRedirect: false });

  const fetchAllData = async (id) => {
    try {
      const [profileRes, invitationsRes, privateAccessRes] = await Promise.all([
        getSelectProfile(id),
        getInvitationsList(id),
        getPrivateProfileAccessRequests(id),
      ]);

      if (profileRes.status === 200) {
        const { profile, result } = profileRes.data.data;
        if (result === 'PROFILE_INACTIVE') {
          navigate('/error-profile-inactive');
          return;
        }
        setProfile(profile);
        setScope(profile.scope);
      }

      if (invitationsRes.status === 200) {
        const { items } = invitationsRes.data.data;
        setInvitations(items);
      }
      if (privateAccessRes.status === 200) {
        const { items } = privateAccessRes.data.data;
        setPrivateRequests(items);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (profileId && showScreen) {
      fetchAllData(profileId);
    }
  }, [profileId, showScreen]);

  const handleOptionChange = async (selectedOption) => {
    let seletedText = selectedOption.value === 'PUBLIC' ? '전체공개' : '비공개';
    const confirmed = window.confirm(`${seletedText}로 변경 하시겠습니까?`);
    if (!confirmed) return;

    const optionVal = selectedOption.value;
    setScope(optionVal);

    const res = await putProfileScope(profileId, optionVal);
    if (res.status !== 200) {
      alert('일반 액세스 변경하는데 에러가 발생했습니다.');
    } else {
      setSuccessMessage(`일반 액세스가 ${seletedText}로 변경되었습니다.`);
      setIsSuccessModalOpen(true);
    }
    fetchAllData(profileId);
  };

  const handleInvitation = async (e) => {
    e.preventDefault();

    if (!profileId || !isValidEmail(receiverEmail)) {
      setIsError(true);
      setIsModalOpen(true);
      return;
    }

    try {
      const res = await postEmailInvitations(profileId, receiverEmail);
      if (res.status === 201) {
        setIsModalOpen(true);
        setReceiverEmail('');
        fetchAllData(profileId);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCopylink = () => {
    navigator.clipboard.writeText(
      profile.nickname && profile.nickname.trim()
        ? window.location.origin + '/@' + profile.nickname
        : window.location.origin + '/profile/view-profile/' + profileId
    );
    setIsModalCopyLinkOpen(true);
  };

  const handleInvitationsPermissionChange = async (invitationId, value) => {
    let res;
    let message = '';
    if (!value) return;
    if (value === 'DELETE') {
      const confirmed = window.confirm('정말로 삭제하시겠습니까?');
      if (!confirmed) return;
      res = await deleteInvitationPermissions(profileId, invitationId);
    } else if (value && (value === 'EDITOR' || value === 'VIEWER')) {
      res = await putInvitationPermissions(profileId, invitationId, value);
      const permissionText = value === 'EDITOR' ? '편집 권한' : '보기 권한';
      message = `${permissionText}으로 변경되었습니다.`;
    } else if (value === 'CANCEL') {
      const confirmed = window.confirm('정말로 초대취소하시겠습니까?');
      if (!confirmed) return;
      res = await deleteInvitationCancel(profileId, invitationId);
    }

    if (res && res.status === 200 && message) {
      setSuccessMessage(message);
      setIsSuccessModalOpen(true);
    }
    fetchAllData(profileId);
  };

  const handlePrivateRequests = async (obj, status) => {
    const { requestId } = obj;
    if (!requestId) return;

    const res = await putPrivateAccessRequests(profileId, requestId, status);
    if (res.status === 200) {
      const statusText = status === 'ALLOW' ? '허용' : '거부';
      setSuccessMessage(`비공개 계정 보기 요청이 ${statusText}되었습니다.`);
      setIsSuccessModalOpen(true);
      fetchAllData(profileId);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      {!showScreen && <div className="blur-overlay"></div>}
      {showScreen ? (
        <div className="manage-page-wrapper">
          {/* 뒤로가기 버튼 */}
          <button className="manage-back-button" onClick={handleGoBack}>
            <FaArrowLeft />
          </button>

          {/* 배너 이미지 */}
          <div className="manage-banner" style={{ backgroundImage: `url(${everlinkTop})` }}>
            <div className="manage-banner-overlay">
              <h1 className="manage-banner-title">초대 및 사용자 관리</h1>
              <p className="manage-banner-subtitle">프로필에 접근할 수 있는 사용자를 관리하세요</p>
            </div>
          </div>

          <div className="manage-content-container">
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "12px" }}>
              <button
                className="user-guide-trigger-btn"
                onClick={() => setIsUserGuideModalOpen(true)}
                style={{
                  border: "none",
                  background: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  boxShadow: "none",
                  fontSize: "16px"
                }}
              >
                <FaQuestionCircle style={{ marginRight: 4 }} />
                <span>이용가이드</span>
              </button>
            </div>
            {/* 이메일로 초대하기 섹션 */}
            <div className="manage-section manage-section-primary manage-section-invite">
              <div className="manage-section-header-with-guide">
                <div className="manage-section-header">
                  <div className="manage-section-icon">
                    <FaEnvelope />
                  </div>
                  <div>
                    <h2 className="manage-section-title">이메일로 초대하기</h2>
                    <p className="manage-section-description">이메일 주소를 입력하여 프로필 접근 권한을 부여하세요</p>
                  </div>
                </div>
              </div>
              <form onSubmit={handleInvitation} className="invite-form">
                <div className="invite-input-wrapper">
                  <input
                    type="email"
                    className="invite-input-field"
                    placeholder="이메일 주소를 입력하세요 (예: user@example.com)"
                    value={receiverEmail}
                    onChange={(e) => setReceiverEmail(e.target.value)}
                  />
                  <button type="submit" className="invite-submit-button">
                    <FaEnvelope />
                    <span>초대하기</span>
                  </button>
                </div>
              </form>
              
              <button className="copy-link-btn" onClick={handleCopylink}>
                <FaLink />
                <span>프로필 링크 복사</span>
              </button>
            </div>

            {/* 초대된 계정 섹션 */}
            <div className="manage-section manage-section-secondary manage-section-users">
              <div className="manage-section-header">
                <div className="manage-section-icon">
                  <FaUserFriends />
                </div>
                <div>
                  <h2 className="manage-section-title">초대된 계정</h2>
                  <p className="manage-section-description">초대한 사용자의 권한을 관리하세요</p>
                </div>
              </div>

              {invitations.length > 0 ? (
                <>
                  {/* 데스크톱 테이블 */}
                  <div className="manage-table-wrapper desktop-only">
                    <table className="manage-table">
                      <thead>
                        <tr>
                          <th>이메일</th>
                          <th>회원정보</th>
                          <th>권한</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invitations.map((invitation) => (
                          <tr key={invitation.invitationId}>
                            <td>
                              <div className="table-cell-with-icon">
                                <FaEnvelope className="table-icon" />
                                <span>{isValidEmail(invitation.email) ? invitation.email : '-'}</span>
                              </div>
                            </td>
                            <td>{invitation.memberDisplayName || '-'}</td>
                            <td>
                              {invitation.isConfirmed ? (
                                <select
                                  className="manage-select"
                                  value={invitation.permission || ""}
                                  onChange={(e) =>
                                    handleInvitationsPermissionChange(
                                      invitation.invitationId,
                                      e.target.value
                                    )
                                  }
                                >
                                  <option value="">선택하기</option>
                                  <option value="EDITOR">편집 권한</option>
                                  <option value="VIEWER">보기 권한</option>
                                  <option value="DELETE">삭제</option>
                                </select>
                              ) : (
                                <select
                                  className="manage-select"
                                  value={invitation.permission || ""}
                                  onChange={(e) =>
                                    handleInvitationsPermissionChange(
                                      invitation.invitationId,
                                      e.target.value
                                    )
                                  }
                                >
                                  <option value="">초대수락 대기중</option>
                                  <option value="CANCEL">초대취소</option>
                                </select>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* 모바일 카드 */}
                  <div className="mobile-only">
                    {invitations.map((invitation) => (
                      <div key={invitation.invitationId} className="manage-mobile-card">
                        <div className="mobile-card-row">
                          <span className="mobile-card-label">이메일</span>
                          <span className="mobile-card-value">
                            {isValidEmail(invitation.email) ? invitation.email : '-'}
                          </span>
                        </div>
                        <div className="mobile-card-row">
                          <span className="mobile-card-label">회원정보</span>
                          <span className="mobile-card-value">
                            {invitation.memberDisplayName || '-'}
                          </span>
                        </div>
                        <div className="mobile-card-row">
                          <span className="mobile-card-label">권한</span>
                          {invitation.isConfirmed ? (
                            <select
                              className="manage-select mobile"
                              value={invitation.permission || ""}
                              onChange={(e) =>
                                handleInvitationsPermissionChange(
                                  invitation.invitationId,
                                  e.target.value
                                )
                              }
                            >
                              <option value="">선택하기</option>
                              <option value="EDITOR">편집 권한</option>
                              <option value="VIEWER">보기 권한</option>
                              <option value="DELETE">삭제</option>
                            </select>
                          ) : (
                            <select
                              className="manage-select mobile"
                              value={invitation.permission || ""}
                              onChange={(e) =>
                                handleInvitationsPermissionChange(
                                  invitation.invitationId,
                                  e.target.value
                                )
                              }
                            >
                              <option value="">초대수락 대기중</option>
                              <option value="CANCEL">초대취소</option>
                            </select>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="manage-empty-state">
                  <div className="empty-state-icon">
                    <FaUserFriends />
                  </div>
                  <p className="empty-state-text">초대하신 사용자가 없습니다.</p>
                  <p className="empty-state-subtext">위의 입력창을 통해 사용자를 초대해보세요</p>
                </div>
              )}
            </div>

            {/* 일반 액세스 섹션 */}
            <div className="manage-section manage-section-tertiary manage-section-access">
              <div className="manage-section-header">
                <div className="manage-section-icon">
                  <FaUserShield />
                </div>
                <div>
                  <h2 className="manage-section-title">일반 액세스</h2>
                  <p className="manage-section-description">프로필의 공개 범위를 설정하세요</p>
                </div>
              </div>
              <div className="access-control-wrapper">
                <label className="access-control-label">
                  공개 설정
                </label>
                <Select
                  value={options.find((option) => option.value === scope)}
                  onChange={handleOptionChange}
                  options={options}
                  className="access-select"
                  classNamePrefix="select"
                  placeholder="공개 범위 선택"
                />
                <p className="access-control-hint">
                  {scope === 'PUBLIC' 
                    ? '✓ 모든 사용자가 이 프로필을 볼 수 있습니다' 
                    : '✓ 초대된 사용자만 이 프로필을 볼 수 있습니다'}
                </p>
              </div>
            </div>

            {/* 비공개 계정 보기 요청 섹션 */}
            <div className="manage-section manage-section-quaternary manage-section-requests">
              <div className="manage-section-header">
                <div className="manage-section-icon">
                  <FaUserLock />
                </div>
                <div>
                  <h2 className="manage-section-title">비공개 계정 보기 요청</h2>
                  <p className="manage-section-description">프로필 접근을 요청한 사용자를 관리하세요</p>
                </div>
              </div>

              {privateRequests.length > 0 ? (
                <>
                  {/* 데스크톱 테이블 */}
                  <div className="manage-table-wrapper desktop-only">
                    <table className="manage-table">
                      <thead>
                        <tr>
                          <th>회원정보</th>
                          <th>메모</th>
                          <th>허용 여부</th>
                        </tr>
                      </thead>
                      <tbody>
                        {privateRequests.map((p, index) => (
                          <tr key={index}>
                            <td>
                              <div className="member-info-cell">
                                <strong>{p.memberDisplayName}</strong>
                                {p.memberEmail && isValidEmail(p.memberEmail) && (
                                  <div className="member-email">{p.memberEmail}</div>
                                )}
                              </div>
                            </td>
                            <td>
                              <div className="memo-cell">
                                {p.memo
                                  ? p.memo.split('\n').map((line, idx) => (
                                      <span key={idx}>
                                        {line}
                                        {idx < p.memo.split('\n').length - 1 && <br />}
                                      </span>
                                    ))
                                  : '-'}
                              </div>
                            </td>
                            <td>
                              <div className="action-buttons">
                                <button
                                  className="action-btn primary"
                                  onClick={() => handlePrivateRequests(p, 'ALLOW')}
                                >
                                  허용
                                </button>
                                <button
                                  className="action-btn secondary"
                                  onClick={() => handlePrivateRequests(p, 'DENY')}
                                >
                                  거부
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* 모바일 카드 */}
                  <div className="mobile-only">
                    {privateRequests.map((p, index) => (
                      <div key={index} className="manage-mobile-card">
                        <div className="mobile-card-row">
                          <span className="mobile-card-label">회원정보</span>
                          <div className="mobile-card-value">
                            <strong>{p.memberDisplayName}</strong>
                            {p.memberEmail && isValidEmail(p.memberEmail) && (
                              <div className="member-email-small">{p.memberEmail}</div>
                            )}
                          </div>
                        </div>
                        {p.memo && (
                          <div className="mobile-card-row">
                            <span className="mobile-card-label">메모</span>
                            <div className="mobile-card-value memo">
                              {p.memo.split('\n').map((line, idx) => (
                                <span key={idx}>
                                  {line}
                                  {idx < p.memo.split('\n').length - 1 && <br />}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        <div className="mobile-card-row">
                          <span className="mobile-card-label">허용 여부</span>
                          <div className="action-buttons mobile">
                            <button
                              className="action-btn primary"
                              onClick={() => handlePrivateRequests(p, 'ALLOW')}
                            >
                              허용
                            </button>
                            <button
                              className="action-btn secondary"
                              onClick={() => handlePrivateRequests(p, 'DENY')}
                            >
                              거부
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="manage-empty-state">
                  <div className="empty-state-icon">
                    <FaUserLock />
                  </div>
                  <p className="empty-state-text">비공개로 요청한 사용자가 없습니다.</p>
                  <p className="empty-state-subtext">요청이 들어오면 여기에 표시됩니다</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="manage-access-denied-wrapper">
          <div className="manage-access-denied-card">
            <div className="access-denied-icon">🔒</div>
            <h3 className="access-denied-title">접근할 수 없습니다</h3>
            <p className="access-denied-text">이 페이지에 접근할 권한이 없습니다.</p>
            <button
              className="access-denied-button"
              onClick={() => navigate('/profile')}
            >
              돌아가기
            </button>
          </div>
        </div>
      )}

      {/* 초대 결과 모달 */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="w-100">
          <div className="modal-content p-0 rounded shadow-lg">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="p-10 sm-p-7 bg-white">
                  <div className="row justify-content-center">
                    <div className="col-md-9 text-center">
                      <div className="mb-4" style={{ fontSize: '48px' }}>
                        {!isError ? '✅' : '❌'}
                      </div>
                      <h6 className="text-dark-gray fw-500 mb-15px fs-22">
                        {!isError
                          ? '초대 메일을 발송했습니다!'
                          : '올바른 이메일 형식으로 입력해주세요'}
                      </h6>
                    </div>
                    <div className="col-lg-12 text-center text-lg-center pt-3">
                      <button
                        className="action-button primary"
                        onClick={() => {
                          setIsModalOpen(false);
                          setIsError(false);
                        }}
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
      </Modal>

      {/* 링크 복사 모달 */}
      <Modal isOpen={isModalCopyLinkOpen} onClose={() => setIsModalCopyLinkOpen(false)}>
        <div className="w-100">
          <div className="modal-content p-0 rounded shadow-lg">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="p-10 sm-p-7 bg-white">
                  <div className="row justify-content-center">
                    <div className="col-md-9 text-center">
                      <div className="mb-4" style={{ fontSize: '48px' }}>
                        📋
                      </div>
                      <h6 className="text-dark-gray fw-500 mb-15px fs-22 sm-fs-16">
                        프로필 링크가 복사되었습니다
                      </h6>
                    </div>
                    <div className="col-lg-12 text-center text-lg-center pt-3">
                      <button
                        className="action-button primary"
                        onClick={() => setIsModalCopyLinkOpen(false)}
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
      </Modal>

      {/* 요청 모달 */}
      <Modal isOpen={isRequestModalOpen} onClose={() => setIsRequestModalOpen(false)}>
        <div className="w-100">
          <div className="modal-content p-0 rounded shadow-lg">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="p-5 sm-p-7 bg-white">
                  <div className="row justify-content-center">
                    <div className="col-md-9 text-center">
                      {currentPermission === 'PERMISSION_DENIED_BUT_REQUESTED' ? (
                        <>
                          <div className="mb-4" style={{ fontSize: '48px' }}>
                            ⏳
                          </div>
                          <h6 className="text-dark-gray fw-500 mb-15px fs-22">
                            이미 요청된 프로필입니다
                          </h6>
                          <p className="text-dark-gray mb-15px">초대 승인을 기다려주세요</p>
                          <p className="text-dark-gray mb-15px">감사합니다.</p>
                        </>
                      ) : (
                        <>
                          <div className="mb-4" style={{ fontSize: '48px' }}>
                            🔒
                          </div>
                          <h6 className="text-dark-gray fw-500 mb-15px fs-22">
                            접근할 수 없습니다
                          </h6>
                        </>
                      )}
                    </div>
                    <div className="col-lg-12 text-center text-lg-center pt-3">
                      <button
                        className="action-button primary"
                        onClick={() => navigate('/profile')}
                      >
                        돌아가기
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* 성공 모달 */}
      <Modal isOpen={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)}>
        <div className="w-100">
          <div className="modal-content p-0 rounded shadow-lg">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="p-10 sm-p-7 bg-white">
                  <div className="row justify-content-center">
                    <div className="col-md-9 text-center">
                      <div className="mb-4" style={{ fontSize: '48px' }}>
                        ✅
                      </div>
                      <h6 className="text-dark-gray fw-500 mb-15px fs-22 sm-fs-16">
                        {successMessage}
                      </h6>
                    </div>
                    <div className="col-lg-12 text-center text-lg-center pt-3">
                      <button
                        className="action-button primary"
                        onClick={() => {
                          setIsSuccessModalOpen(false);
                          setSuccessMessage('');
                        }}
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
      </Modal>

      {/* 이용 가이드 모달 */}
      <UserGuideModal 
        isOpen={isUserGuideModalOpen} 
        onClose={() => setIsUserGuideModalOpen(false)} 
      />
    </>
  );
};

export default ManagePage;