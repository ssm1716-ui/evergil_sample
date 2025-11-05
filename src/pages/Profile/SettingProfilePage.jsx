import { useState, useEffect } from 'react';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';

import Button from '@/components/common/Button/Button';
import Modal from '@/components/common/Modal/Modal';
import {
  postRegisterProfile,
  getSelectProfile,
  putModifyProfile,
} from '@/api/memorial/memorialApi';

import { allowOnlyAlphaNumeric } from '@/utils/utils';

import checkCircle from '@/assets/images/check-circle-solid.png';

const SettingProfilePage = () => {
  const location = useLocation();
  const { profileId: urlProfileId } = useParams();
  const [profileId, setProfileId] = useState(urlProfileId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formProfile, setFormProfile] = useState({
    qrKey: '',
    memorialType: '',
    displayName: '',
    birthday: '',
    deathDate: '',
    nickname: '',
    scope: '',
  });

  const [errors, setErrors] = useState({
    memorialType: false,
    displayName: false,
    birthday: false,
    deathDate: false,
    nickname: false,
    scope: false,
  });
  const navigate = useNavigate();

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 120 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')); // '01', '02', ... '12'
  const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0')); // '01', '02', ... '31'

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getSelectProfile(profileId);
        if (res.status === 200) {
          const { data } = res.data;
          if (data.result === 'PROFILE_INACTIVE') {
            navigate('/error-profile-inactive');
            return;
          }
          
          // 🔥 날짜 형식 정규화 - DB에서 가져온 데이터의 날짜 형식 확인 및 변환
          const profile = { ...data.profile };
          
          // birthday 정규화
          if (profile.birthday) {
            const parts = profile.birthday.split('-');
            if (parts.length === 3) {
              const year = parts[0];
              const month = parts[1].padStart(2, '0');
              const day = parts[2].padStart(2, '0');
              profile.birthday = `${year}-${month}-${day}`;
            }
          }
          
          // deathDate 정규화
          if (profile.deathDate) {
            const parts = profile.deathDate.split('-');
            if (parts.length === 3) {
              const year = parts[0];
              const month = parts[1].padStart(2, '0');
              const day = parts[2].padStart(2, '0');
              profile.deathDate = `${year}-${month}-${day}`;
            }
          }
          
          setFormProfile(profile);
        }
      } catch (error) {
        console.error(error);
      }
    };
    
    if (profileId) {
      fetchProfile();
      return;
    }
    setFormProfile({ ...formProfile, qrKey: location.state?.qrKey });
  }, [profileId]);

  const handleProfileType = (type) => {
    setFormProfile({ ...formProfile, memorialType: type });
    setErrors((prev) => ({ ...prev, memorialType: false }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    if (name === 'nickname') {
      processedValue = allowOnlyAlphaNumeric(value);
    }

    setFormProfile({
      ...formProfile,
      [name]: processedValue,
    });
    
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      memorialType,
      displayName,
      scope,
    } = { ...formProfile };

    let hasError = false;
    const newErrors = {};

    if (memorialType.trim() === '') {
      newErrors.memorialType = true;
      hasError = true;
    }
    if (displayName.trim() === '') {
      newErrors.displayName = true;
      hasError = true;
    }
    if (scope.trim() === '') {
      newErrors.scope = true;
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    try {
      let res;
      if (profileId) {
        res = await putModifyProfile(profileId, formProfile);
      } else {
        res = await postRegisterProfile(formProfile);
        const newProfileId = res.data.data;
        setProfileId(newProfileId);
      }

      if (res.status === 200) {
        setIsModalOpen(true);
        return;
      }

      throw new Error('서버 응답이 올바르지 않습니다.');
    } catch (error) {
      alert(error.message);
    }
  };

  // 🔥 날짜 파싱 헬퍼 함수 - 안전하게 날짜 값을 가져옴
  const getDatePart = (dateString, partIndex, defaultValue = '') => {
    if (!dateString) return defaultValue;
    const parts = dateString.split('-');
    if (parts.length !== 3) return defaultValue;
    return parts[partIndex] || defaultValue;
  };

  return (
    <>
      <div className="container" style={{ maxWidth: '720px', margin: '0 auto', padding: '120px 20px' }}>
        {/* 헤더 */}
        <div className="page-header">
          <h1 className="page-title">프로필 설정</h1>
          <p className="page-subtitle">추모할 대상의 정보를 입력해주세요</p>
        </div>

        {/* 추모 대상 선택 카드 */}
        <div className="modern-card">
          <div className="modern-card-header">
            <i className="bi bi-heart-fill" style={{ color: '#ef4444', fontSize: '20px' }}></i>
            <h2 className="modern-card-title">추모 대상 선택</h2>
          </div>
          
          <div className="profile-type-group">
            <button
              type="button"
              className={`profile-type-btn ${formProfile.memorialType === 'HUMAN' ? 'active' : ''}`}
              onClick={() => handleProfileType('HUMAN')}
            >
              <i className="bi bi-person-fill"></i>
              사람
            </button>
            <button
              type="button"
              className={`profile-type-btn ${formProfile.memorialType === 'ANIMAL' ? 'active' : ''}`}
              onClick={() => handleProfileType('ANIMAL')}
            >
              <i className="bi bi-heart-fill"></i>
              반려동물
            </button>
          </div>
          
          {errors.memorialType && (
            <p className="error-message">사람 또는 반려동물을 선택해주세요.</p>
          )}
        </div>

        {/* 기본 정보 카드 */}
        <div className="modern-card">
          <div className="modern-card-header">
            <i className="bi bi-info-circle-fill" style={{ color: '#3b82f6', fontSize: '20px' }}></i>
            <h2 className="modern-card-title">기본 정보</h2>
          </div>

          <form onSubmit={handleSubmit}>
            {/* 이름 */}
            <div className="mb-4">
              <label className="modern-label">
                {formProfile.memorialType === 'ANIMAL' ? '반려동물 이름' : '이름'}
                <span className="required">*</span>
              </label>
              <input
                type="text"
                name="displayName"
                className={`modern-input ${errors.displayName ? 'error' : ''}`}
                placeholder={formProfile.memorialType === 'ANIMAL' ? '반려동물 이름을 입력해주세요' : '이름을 입력해주세요'}
                value={formProfile.displayName}
                onChange={handleChange}
              />
              {errors.displayName && (
                <p className="error-message">이름을 입력해주세요.</p>
              )}
            </div>

            {/* 🔥 생년월일 - 수정된 버전 */}
            <div className="mb-4">
              <label className="modern-label">생년월일 <span className="required">*</span></label>
              <div className="date-grid">
                <select 
                  name="birthYear" 
                  className="modern-select"
                  value={getDatePart(formProfile.birthday, 0)}
                  onChange={(e) => {
                    const year = e.target.value;
                    const month = getDatePart(formProfile.birthday, 1, '01');
                    const day = getDatePart(formProfile.birthday, 2, '01');
                    const newDate = year ? `${year}-${month}-${day}` : '';
                    handleChange({ target: { name: 'birthday', value: newDate }});
                  }}
                >
                  <option value="">연도</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}년</option>
                  ))}
                </select>
                <select 
                  name="birthMonth" 
                  className="modern-select"
                  value={getDatePart(formProfile.birthday, 1)}
                  onChange={(e) => {
                    const year = getDatePart(formProfile.birthday, 0, String(currentYear));
                    const month = e.target.value;
                    const day = getDatePart(formProfile.birthday, 2, '01');
                    const newDate = month ? `${year}-${month}-${day}` : '';
                    handleChange({ target: { name: 'birthday', value: newDate }});
                  }}
                >
                  <option value="">월</option>
                  {months.map(month => (
                    <option key={month} value={month}>{parseInt(month)}월</option>
                  ))}
                </select>
                <select 
                  name="birthDay" 
                  className="modern-select"
                  value={getDatePart(formProfile.birthday, 2)}
                  onChange={(e) => {
                    const year = getDatePart(formProfile.birthday, 0, String(currentYear));
                    const month = getDatePart(formProfile.birthday, 1, '01');
                    const day = e.target.value;
                    const newDate = day ? `${year}-${month}-${day}` : '';
                    handleChange({ target: { name: 'birthday', value: newDate }});
                  }}
                >
                  <option value="">일</option>
                  {days.map(day => (
                    <option key={day} value={day}>{parseInt(day)}일</option>
                  ))}
                </select>
              </div>
              {errors.birthday && (
                <p className="error-message">생년월일을 입력해주세요.</p>
              )}
            </div>

            {/* 🔥 기일 - 수정된 버전 */}
            <div className="mb-4">
              <label className="modern-label">기일 <span className="required">*</span></label>
              <div className="date-grid">
                <select 
                  name="deathYear" 
                  className="modern-select"
                  value={getDatePart(formProfile.deathDate, 0)}
                  onChange={(e) => {
                    const year = e.target.value;
                    const month = getDatePart(formProfile.deathDate, 1, '01');
                    const day = getDatePart(formProfile.deathDate, 2, '01');
                    const newDate = year ? `${year}-${month}-${day}` : '';
                    handleChange({ target: { name: 'deathDate', value: newDate }});
                  }}
                >
                  <option value="">연도</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}년</option>
                  ))}
                </select>
                <select 
                  name="deathMonth" 
                  className="modern-select"
                  value={getDatePart(formProfile.deathDate, 1)}
                  onChange={(e) => {
                    const year = getDatePart(formProfile.deathDate, 0, String(currentYear));
                    const month = e.target.value;
                    const day = getDatePart(formProfile.deathDate, 2, '01');
                    const newDate = month ? `${year}-${month}-${day}` : '';
                    handleChange({ target: { name: 'deathDate', value: newDate }});
                  }}
                >
                  <option value="">월</option>
                  {months.map(month => (
                    <option key={month} value={month}>{parseInt(month)}월</option>
                  ))}
                </select>
                <select 
                  name="deathDay" 
                  className="modern-select"
                  value={getDatePart(formProfile.deathDate, 2)}
                  onChange={(e) => {
                    const year = getDatePart(formProfile.deathDate, 0, String(currentYear));
                    const month = getDatePart(formProfile.deathDate, 1, '01');
                    const day = e.target.value;
                    const newDate = day ? `${year}-${month}-${day}` : '';
                    handleChange({ target: { name: 'deathDate', value: newDate }});
                  }}
                >
                  <option value="">일</option>
                  {days.map(day => (
                    <option key={day} value={day}>{parseInt(day)}일</option>
                  ))}
                </select>
              </div>
              {errors.deathDate && (
                <p className="error-message">기일을 입력해주세요.</p>
              )}
            </div>
          </form>
        </div>

        {/* 프로필 설정 카드 */}
        <div className="modern-card">
          <div className="modern-card-header">
            <i className="bi bi-gear-fill" style={{ color: '#8b5cf6', fontSize: '20px' }}></i>
            <h2 className="modern-card-title">프로필 설정</h2>
          </div>

          {/* 닉네임 */}
          <div className="mb-4">
            <label className="modern-label">닉네임 (프로필 URL)</label>
            <p className="helper-text mb-2">다른 사람들이 프로필에 접근할 때 사용할 짧은 URL입니다. 영문, 숫자, 언더바(_)만 사용 가능합니다.</p>
            <div className="url-input-group">
              <div className="url-prefix">
                https://evergil.kr/@
              </div>
              <input
                type="text"
                name="nickname"
                className={`modern-input ${errors.nickname ? 'error' : ''}`}
                placeholder="evergil"
                value={formProfile.nickname}
                onChange={handleChange}
              />
            </div>
            {formProfile.nickname && (
              <div className="url-preview-box">
                <i className="bi bi-check-circle-fill check-icon"></i>
                <p className="url-preview-text">
                  <strong>프로필 URL:</strong> https://evergil.kr/@{formProfile.nickname}
                </p>
              </div>
            )}
            {errors.nickname && (
              <p className="error-message">닉네임을 입력해주세요.</p>
            )}
          </div>

          {/* 공개 범위 */}
          <div className="mb-4">
            <label className="modern-label">
              공개 범위 <span className="required">*</span>
            </label>
            
            <div 
              className={`privacy-option ${formProfile.scope === 'PUBLIC' ? 'active' : ''}`}
              onClick={() => handleChange({ target: { name: 'scope', value: 'PUBLIC' }})}
            >
              <input
                type="radio"
                name="scope"
                value="PUBLIC"
                checked={formProfile.scope === 'PUBLIC'}
                onChange={handleChange}
                className="privacy-radio"
              />
              <div className="privacy-content">
                <p className="privacy-title">공개</p>
                <p className="privacy-description">누구나 이 프로필을 볼 수 있습니다</p>
              </div>
            </div>
            
            <div 
              className={`privacy-option ${formProfile.scope === 'PRIVATE' ? 'active' : ''}`}
              onClick={() => handleChange({ target: { name: 'scope', value: 'PRIVATE' }})}
            >
              <input
                type="radio"
                name="scope"
                value="PRIVATE"
                checked={formProfile.scope === 'PRIVATE'}
                onChange={handleChange}
                className="privacy-radio"
              />
              <div className="privacy-content">
                <p className="privacy-title">비공개</p>
                <p className="privacy-description">초대받은 사람만 이 프로필을 볼 수 있습니다</p>
              </div>
            </div>
            
            {errors.scope && (
              <p className="error-message">공개 범위를 선택해주세요.</p>
            )}
          </div>

          {/* 제출 버튼 */}
          <button type="submit" className="submit-btn" onClick={handleSubmit}>
            {profileId ? '수정하기' : '저장하기'}
          </button>
        </div>
      </div>

      {/* 완료 모달 */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Profile Complete"
      >
        <div className="row justify-content-center overflow-hidden bg-white">
          <div className="contact-form-style-04">
            <div className="py-5 text-center">
              <img src={checkCircle} alt="" className="sm-w-20 w-20" />
              <h4 className="text-dark-gray fw-500 mt-20px mb-15px fs-22 md-fs-18">
                추모페이지 {profileId ? '변경 완료' : '생성 완료'}
              </h4>
              <Link to={formProfile.nickname && formProfile.nickname.trim() ? `/@${formProfile.nickname}` : '/profile/edit-profile/' + profileId}>
                <Button
                  size="extra-large"
                  radiusOn="radius-on"
                  className="btn btn-extra-large w-40 mt-20px mb-5px"
                >
                  계속하기
                </Button>
              </Link>
              {!profileId && (
                <h6 className="mt-2 ls-minus-1px">추모페이지를 꾸며보세요.</h6>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SettingProfilePage;