import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from '@/components/common/Button/Button';
import Modal from '@/components/common/Modal/Modal';
import Select from 'react-select';
import { FaEye, FaEyeSlash, FaLink, FaShareAlt } from 'react-icons/fa'; // 아이콘 가져오기

import everlinkTop from '@/assets/images/evergil_contact.jpeg';

import useProfilePermission from '@/hooks/useProfilePermission';
import {
  postEmailInvitations,
  postPrivateProfileAccessRequest,
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
  const { profileId } = useParams(); //URL에서 :profileId 값 가져오기
  const [receiverEmail, setReceiverEmail] = useState('');
  const [isError, setIsError] = useState(false);
  const [scope, setScope] = useState('PUBLIC');
  const [profile, setProfile] = useState({});
  const [invitations, setInvitations] = useState([]);
  const [privateRequests, setPrivateRequests] = useState([]);

  //Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCopyLinkOpen, setIsModalCopyLinkOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
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
    currentPermission,
  } = useProfilePermission(profileId, { shouldRedirect: false });

  // 프로필 데이터 가져오기
  const fetchProfile = async (id) => {
    try {
      const res = await getSelectProfile(id);
      if (res.status === 200) {
        const { profile, result } = res.data.data;
        // PROFILE_INACTIVE 상태 확인
        if (result === 'PROFILE_INACTIVE') {
          navigate('/error-profile-inactive');
          return;
        }
        setScope(profile.scope);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 초대된 계정 리스트 가져오기
  const fetchInvitations = async (id) => {
    try {
      const res = await getInvitationsList(id);
      if (res.status === 200) {
        const { items } = res.data.data;
        setInvitations(items);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 비공개 프로필 접근 요청 리스트 가져오기
  const fetchPrivateAccessRequests = async (id) => {
    try {
      const res = await getPrivateProfileAccessRequests(id);
      if (res.status === 200) {
        setPrivateRequests(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ `Promise.all()`로 병렬 API 호출 최적화
  const fetchAllData = async (id) => {
    try {
      const [profileRes, invitationsRes, privateAccessRes] = await Promise.all([
        getSelectProfile(id),
        getInvitationsList(id),
        getPrivateProfileAccessRequests(id),
      ]);

      if (profileRes.status === 200) {
        const { profile, result } = profileRes.data.data;
        // PROFILE_INACTIVE 상태 확인
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

  //초기 데이터 가져오기
  useEffect(() => {
    if (profileId && showScreen) {
      fetchAllData(profileId); // ✅ 병렬 호출로 성능 최적화
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

  //초대하기 발송
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
      profile.nickname && profile.nickname.trim() ? 
        window.location.origin + '/@' + profile.nickname : 
        window.location.origin + '/profile/view-profile/' + profileId
    );
    setIsModalCopyLinkOpen(true);
  };

  // 초대한 사용자 권한 변경 핸들러
  const handleInvitationsPermissionChange = async (invitationId, value) => {
    // let updatedItems;
    let res;
    let message = '';
    if (!value) return;
    if (value === 'DELETE') {
      const confirmed = window.confirm('정말로 삭제하시겠습니까?');
      if (!confirmed) return;
      res = await deleteInvitationPermissions(profileId, invitationId);
      // message = '초대한 사용자가 삭제되었습니다.';
    } else if (value && (value === 'EDITOR' || value === 'VIEWER')) {
      res = await putInvitationPermissions(profileId, invitationId, value);
      const permissionText = value === 'EDITOR' ? '편집 권한' : '보기 권한';
      message = `${permissionText}으로 변경되었습니다.`;
    } else if (value === 'CANCEL') {
      const confirmed = window.confirm('정말로 초대취소하시겠습니까?');
      if (!confirmed) return;
      res = await deleteInvitationCancel(profileId, invitationId);
      // message = '초대가 취소되었습니다.';
    }
    
    if (res && res.status === 200 && message) {
      setSuccessMessage(message);
      setIsSuccessModalOpen(true);
    }
    fetchInvitations(profileId);
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
  // 433f95be-7dc1-47a5-a7b4-974fd6d628e3 6049230d-fc41-4cbd-8327-3a84260dc937 DENY
  return (
    <>
      {!showScreen && <div className="blur-overlay"></div>}
      {showScreen ? (
        <>
          <section className="top-space-margin big-section pb-0 pt-5 md-pt-30px">
            <div className="container">
              <div
                className="row align-items-center justify-content-center"
                data-anime='{ "el": "childs", "translateY": [-15, 0], "opacity": [0,1], "duration": 300, "delay": 0, "staggervalue": 200, "easing": "easeOutQuad" }'
              >
                <div className="col-12 text-center position-relative page-title-extra-large">
                  <img src={everlinkTop} className='h-350px sm-h-150px' style={{ width: '100%', objectFit: 'cover' }} alt="everlinkTop" />
                </div>
                <div className="col-12 breadcrumb breadcrumb-style-01 d-flex justify-content-center"></div>
              </div>
            </div>
          </section>
          <section className="cover-background py-5">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12 col-xl-7 col-lg-8 col-md-10 text-center">
                  <h5 className="text-dark-gray fw-600 w-100 lg-w-90 md-w-100 mx-auto ls-minus-2px mb-3 md-mb-4 sm-fs-20">
                    초대 및 사용자 관리 페이지
                  </h5>
                  <Link onClick={handleCopylink}>
                    <h6 className="text-base-color fs-18 md-fs-16 fw-800 w-100 text-end pb-2">
                      <FaLink className="me-2" />
                      Copy link
                    </h6>
                  </Link>
                  <div className="d-inline-block w-100 newsletter-style-01 position-relative box-shadow mb-5">
                    <div>
                      <input
                        className="input-large md-input-medium border-1 bg-white border-color-gray form-control"
                        type="email"
                        name="email"
                        value={receiverEmail}
                        placeholder="Invite Email"
                        onChange={(e) => setReceiverEmail(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleInvitation(e);
                          }
                        }}
                      />
                      <input type="hidden" name="redirect" value="" />
                      <Button
                        className="btn btn-medium btn-base-color"
                        onClick={handleInvitation}
                      >
                        초대하기
                      </Button>
                      <div className="form-results border-radius-4px mt-15px pt-10px pb-10px ps-15px pe-15px fs-15 w-100 text-center position-absolute d-none"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="py-0">
            <div className="container pb-1">
              <div className="row align-items-start">
                <div className="col-lg-12 pe-50px md-pe-15px">
                  <div className="row align-items-center">
                    <div className="col-12">
                      <h6 className="text-dark-gray fw-600 w-100 lg-w-90 md-w-100 mx-auto ls-minus-2px mb-1 sm-fs-16">
                        초대된 계정
                      </h6>

                      {invitations.length > 0 ? (
                        <>
                          {/* 데스크탑 테이블 */}
                          <div className="d-none d-md-block">
                            <div className="table-responsive">
                              <table className="table invite-table md-fs-14">
                                <thead>
                                  <tr>
                                    <th scope="col" className="fw-600">
                                      이메일
                                    </th>
                                    <th scope="col" className="fw-600">
                                      회원정보
                                    </th>
                                    <th scope="col" className="fw-600">
                                      권한
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {invitations.map((invitation, index) => (
                                    <tr key={invitation.invitationId}>
                                      <td className="product-name">
                                        <a className="text-dark-gray fw-500 d-block">
                                          {isValidEmail(invitation.email) ? invitation.email : ''}
                                        </a>
                                      </td>
                                      <td>
                                        {invitation.memberDisplayName || ''}
                                      </td>
                                      <td>
                                        {invitation.isConfirmed ? (
                                          <div className="select">
                                            <select
                                              className="form-control select-invite"
                                              name="scope"
                                              value={invitation.permission}
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
                                          </div>
                                        ) : (
                                          <div className="select">
                                            <select
                                              className="form-control select-invite"
                                              name="scope"
                                              value={invitation.permission}
                                              onChange={(e) =>
                                                handleInvitationsPermissionChange(
                                                  invitation.invitationId,
                                                  e.target.value
                                                )
                                              }
                                            >
                                              <option value="">
                                                초대수락 대기중
                                              </option>
                                              <option value="CANCEL">초대취소</option>
                                            </select>
                                          </div>
                                        )}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>

                          {/* 모바일 카드 */}
                          <div className="d-block d-md-none">
                            {invitations.map((invitation, index) => (
                              <div key={invitation.invitationId} className="card mb-3 border border-1 border-color-gray">
                                <div className="card-body p-3">
                                  <div className="row">
                                                                         <div className="col-12 mb-2">
                                       <strong className="fs-14 text-base-color">이메일:</strong>
                                       <div className="text-dark-gray fw-500">
                                         {isValidEmail(invitation.email) ? invitation.email : ''}
                                       </div>
                                     </div>
                                     <div className="col-12 mb-2">
                                       <strong className="fs-14 text-base-color">회원정보:</strong>
                                       <div className="text-dark-gray">
                                         {invitation.memberDisplayName || ''}
                                       </div>
                                     </div>
                                    <div className="col-12">
                                      <strong className="fs-14 text-base-color">권한:</strong>
                                      <div className="mt-2">
                                        {invitation.isConfirmed ? (
                                          <select
                                            className="form-control form-select"
                                            name="scope"
                                            value={invitation.permission}
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
                                            className="form-control form-select"
                                            name="scope"
                                            value={invitation.permission}
                                            onChange={(e) =>
                                              handleInvitationsPermissionChange(
                                                invitation.invitationId,
                                                e.target.value
                                              )
                                            }
                                          >
                                            <option value="">
                                              초대수락 대기중
                                            </option>
                                            <option value="CANCEL">초대취소</option>
                                          </select>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      ) : (
                        <p>초대하신 사용자가 없습니다.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="p-0">
            <div className="container pb-3 md-pb-5">
              <div className="row row-cols-1 row-cols-lg-2 row-cols-md-1 g-0overflow-hidden">
                <div className="col contact-form-style-04">
                  <div className="text-left">
                    <form>
                      <label className="text-dark-gray  fw-500 d-block text-start">
                        일반 액세스
                      </label>
                      <div className="w-30 md-w-50">
                        <Select
                          className="md-input-medium p-0"
                          options={options}
                          onChange={handleOptionChange}
                          placeholder="선택하세요"
                          value={options.find(
                            (option) => option.value === scope
                          )}
                          isSearchable={false}
                          menuPlacement="auto"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="pt-0 ">
            <div className="container pb-3">
              <div className="row align-items-start">
                <div className="col-lg-12 pe-50px md-pe-15px md-mb-50px xs-mb-35px">
                  <div className="row align-items-center">
                    <div className="col-12">
                      <h6 className="text-dark-gray fw-600 w-100 lg-w-90 md-w-100 mx-auto ls-minus-2px mb-1 sm-fs-16">
                        비공개 계정 보기 요청
                      </h6>

                      {privateRequests.length > 0 ? (
                        <>
                          {/* 데스크탑 테이블 */}
                          <div className="d-none d-md-block">
                            <div className="table-responsive">
                              <table className="table nondisclosure-table md-fs-14">
                                <thead>
                                  <tr>
                                    <th scope="col" className="fw-600">
                                      회원정보
                                    </th>
                                    <th scope="col" className="fw-600">
                                      이름
                                    </th>
                                    <th scope="col" className="fw-600">
                                      메모
                                    </th>
                                    <th scope="col" className="fw-600">
                                      허용 여부
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {privateRequests.map((p, index) => (
                                    <tr key={index}>
                                      <td>
                                        {p.memberDisplayName}
                                        {p.memberEmail && isValidEmail(p.memberEmail) && (
                                          <>
                                            &nbsp;({p.memberEmail})
                                          </>
                                        )}
                                      </td>
                                      <td>{p.name}</td>
                                      <td>
                                        {p.memo ? p.memo.split('\n').map((line, index) => (
                                          <span key={index}>
                                            {line}
                                            {index < p.memo.split('\n').length - 1 && <br />}
                                          </span>
                                        )) : ''}
                                      </td>
                                      <td>
                                        <div className="d-flex">
                                          <Link
                                            className="btn btn-black btn-small w-40 border-radius-10px d-table d-lg-inline-block md-mx-auto mt-3 me-3"
                                            onClick={(e) =>
                                              handlePrivateRequests(p, 'ALLOW')
                                            }
                                          >
                                            허용
                                          </Link>
                                          <Link
                                            className="btn btn-white btn-small w-40 border-radius-10px d-table d-lg-inline-block md-mx-auto mt-3 me-3"
                                            onClick={(e) =>
                                              handlePrivateRequests(p, 'DENY')
                                            }
                                          >
                                            거부
                                          </Link>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>

                          {/* 모바일 카드 */}
                          <div className="d-block d-md-none">
                            {privateRequests.map((p, index) => (
                              <div key={index} className="card mb-3 border border-1 border-color-gray">
                                <div className="card-body p-3">
                                  <div className="row">
                                                                         <div className="col-12 mb-2">
                                       <strong className="fs-14 text-base-color">회원정보:</strong>
                                       <div className="text-dark-gray">
                                         {p.memberDisplayName}
                                         {p.memberEmail && isValidEmail(p.memberEmail) && (
                                           <>
                                             &nbsp;({p.memberEmail})
                                           </>
                                         )}
                                       </div>
                                     </div>
                                    <div className="col-12 mb-2">
                                      <strong className="fs-14 text-base-color">이름:</strong>
                                      <div className="text-dark-gray">{p.name}</div>
                                    </div>
                                    {p.memo && (
                                      <div className="col-12 mb-3">
                                        <strong className="fs-14 text-base-color">메모:</strong>
                                        <div className="text-dark-gray">
                                          {p.memo.split('\n').map((line, index) => (
                                            <span key={index}>
                                              {line}
                                              {index < p.memo.split('\n').length - 1 && <br />}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                    <div className="col-12">
                                      <strong className="fs-14 text-base-color">허용 여부:</strong>
                                      <div className="d-flex gap-2 mt-2">
                                        <button
                                          className="btn btn-black btn-small flex-fill border-radius-10px"
                                          onClick={(e) =>
                                            handlePrivateRequests(p, 'ALLOW')
                                          }
                                        >
                                          허용
                                        </button>
                                        <button
                                          className="btn btn-white btn-small flex-fill border-radius-10px"
                                          onClick={(e) =>
                                            handlePrivateRequests(p, 'DENY')
                                          }
                                        >
                                          거부
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      ) : (
                        <p>비공개로 요청한 사용자가 없습니다.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          <section className="top-space-margin big-section pb-0 pt-5 md-pt-10px">
            <div className="container">
              <div
                className="row align-items-center justify-content-center"
                data-anime='{ "el": "childs", "translateY": [-15, 0], "opacity": [0,1], "duration": 300, "delay": 0, "staggervalue": 200, "easing": "easeOutQuad" }'
              >
                <div className="col-12 text-center position-relative page-title-extra-large">
                  <img src={everlinkTop} alt="everlinkTop" />
                </div>
                <div className="col-12 breadcrumb breadcrumb-style-01 d-flex justify-content-center"></div>
              </div>
            </div>
          </section>
          <section className="cover-background py-5">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12 col-xl-7 col-lg-8 col-md-10 text-center">
                  <h5 className="text-dark-gray fw-600 w-100 lg-w-90 md-w-100 mx-auto ls-minus-2px mb-2  md-mb-5">
                    접근 할 수 없습니다.
                  </h5>
                  <Button
                    className="btn btn-large btn-base-color"
                    onClick={() => navigate('/profile')}
                  >
                    돌아가기
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="w-100">
          <div className="modal-content p-0 rounded shadow-lg">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="p-10 sm-p-7 bg-white">
                  <div className="row justify-content-center">
                    <div className="col-md-9 text-center">
                      <h6 className="text-dark-gray fw-500 mb-15px fs-22">
                        {!isError
                          ? '초대 메일 발송 하였습니다.'
                          : '이메일 형식으로 다시 작성 해주세요.'}
                      </h6>
                    </div>
                    <div className="col-lg-12 text-center text-lg-center pt-3">
                      <input type="hidden" name="redirect" value="" />
                      <button
                        className="btn btn-white btn-large btn-box-shadow btn-round-edge submit me-1"
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
      <Modal
        isOpen={isModalCopyLinkOpen}
        onClose={() => setIsModalCopyLinkOpen(false)}
      >
        <div className="w-100">
          <div className="modal-content p-0 rounded shadow-lg">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="p-10 sm-p-7 bg-white">
                  <div className="row justify-content-center">
                    <div className="col-md-9 text-center">
                      <h6 className="text-dark-gray fw-500 mb-15px fs-22 sm-fs-16">
                        프로필 링크가 복사 되었습니다.
                      </h6>
                    </div>
                    <div className="col-lg-12 text-center text-lg-center pt-3">
                      <input type="hidden" name="redirect" value="" />
                      <button
                        className="btn btn-white btn-large btn-box-shadow btn-round-edge submit me-1"
                        onClick={() => {
                          setIsModalCopyLinkOpen(false);
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
      <Modal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
      >
        <div className="100">
          <div className="modal-content p-0 rounded shadow-lg">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="p-5 sm-p-7 bg-white">
                  <div className="row justify-content-center">
                    <div className="col-md-9 text-center">
                      {currentPermission === 'PERMISSION_DENIED_BUT_REQUESTED' ? (
                        <>
                          <h6 className="text-dark-gray fw-500 mb-15px fs-22">
                            이미 요청된 프로필입니다.
                          </h6>
                          <p className="text-dark-gray mb-15px">
                            초대 승인을 기다려주세요
                          </p>
                          <p className="text-dark-gray mb-15px">
                            감사합니다.
                          </p>
                        </>
                      ) : (
                        <h6 className="text-dark-gray fw-500 mb-15px fs-22">
                          접근 할 수 없습니다.
                        </h6>
                      )}
                    </div>
                    <div className="col-lg-12 text-center text-lg-center pt-3">
                      <input type="hidden" name="redirect" value="" />

                      <Button
                        radiusOn="radius-on"
                        className="btn btn-base-color btn-large btn-box-shadow btn-round-edge me-1 w-50"
                        onClick={() => navigate('/profile')}
                      >
                        돌아가기
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
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      >
        <div className="w-100">
          <div className="modal-content p-0 rounded shadow-lg">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="p-10 sm-p-7 bg-white">
                  <div className="row justify-content-center">
                    <div className="col-md-9 text-center">
                      <h6 className="text-dark-gray fw-500 mb-15px fs-22 sm-fs-16">
                        {successMessage}
                      </h6>
                    </div>
                    <div className="col-lg-12 text-center text-lg-center pt-3">
                      <input type="hidden" name="redirect" value="" />
                      <button
                        className="btn btn-white btn-large btn-box-shadow btn-round-edge submit me-1"
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
    </>
  );
};

export default ManagePage;
