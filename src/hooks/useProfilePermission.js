import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSelectProfile } from '@/api/memorial/memorialApi';

const useProfilePermission = (profileId, options = {}) => {
  const navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [showScreen, setShowScreen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(true);

  const { shouldRedirect = true, nickname = null } = options; // nickname 옵션 추가

  useEffect(() => {
    const fetchPermission = async () => {
      try {
        const res = await getSelectProfile(profileId);
        const { result } = res.data.data;

        const currentPath = window.location.pathname;

        // nickname 기반 URL인지 확인
        const isNicknameUrl = nickname && currentPath.startsWith(`/${nickname}`);

        // nickname URL 형태와 일반 URL 형태 정의
        const viewProfilePath = isNicknameUrl ? `/${nickname}` : `/profile/view-profile/${profileId}`;
        // const editProfilePath = isNicknameUrl ? `/${nickname}/edit` : `/profile/edit-profile/${profileId}`;
        const editProfilePath = `/profile/edit-profile/${profileId}`;

        switch (result) {
          case 'NEED_TO_LOGIN':
            setIsLoginModalOpen(true);
            break;
          case 'PERMISSION_DENIED':
            setIsRequestModalOpen(true);
            break;
          case 'PUBLIC_PROFILE':
          case 'YOU_HAVE_VIEWER_PERMISSION':
            // nickname URL일 때는 URL 변경하지 않음
            if (!isNicknameUrl && currentPath !== viewProfilePath) {
              navigate(viewProfilePath);
            }
            setShowScreen(true);
            break;
          case 'PUBLIC_PROFILE_EDITOR':
          case 'YOU_HAVE_EDITOR_PERMISSION':
            // nickname URL일 때는 기존 edit 페이지로 리다이렉트 (/@nickname/edit 라우팅이 없으므로)
            if (shouldRedirect && isNicknameUrl) {
              navigate(`/profile/edit-profile/${profileId}`);
            } else if (shouldRedirect && !isNicknameUrl && currentPath !== editProfilePath) {
              navigate(editProfilePath);
            }
            setShowScreen(true);
            break;
          case 'PUBLIC_PROFILE_OWNER':
          case 'YOU_HAVE_OWNER_PERMISSION':
            setShowScreen(true);
            break;
          case 'PROFILE_INACTIVE':
            navigate('/error-profile-inactive');
            break;
          default:
            throw new Error('권한 에러 발생');
        }
      } catch (error) {
        setIsAuthorized(false);
      }
    };

    if (profileId) fetchPermission();
  }, [profileId, navigate, shouldRedirect, nickname]);

  return {
    isLoginModalOpen,
    setIsLoginModalOpen,
    isRequestModalOpen,
    setIsRequestModalOpen,
    showScreen,
    setShowScreen,
    isAuthorized,
    setIsAuthorized,
  };
};

export default useProfilePermission;
