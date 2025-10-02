import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSelectProfile } from '@/api/memorial/memorialApi';

const useProfilePermission = (profileId, options = {}) => {
  const navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [showScreen, setShowScreen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(true);
  const [hasEditPermission, setHasEditPermission] = useState(false);
  const [shouldShowEditComponent, setShouldShowEditComponent] = useState(false);
  const [currentPermission, setCurrentPermission] = useState(null);

  const { shouldRedirect = true, nickname = null } = options;

  useEffect(() => {
    const fetchPermission = async () => {
      try {
        const res = await getSelectProfile(profileId);
        const { result } = res.data.data;

        const currentPath = window.location.pathname;

        // nickname 기반 URL인지 확인
        const isNicknameUrl = nickname && currentPath === `/${nickname}`;  // ✅ @ 제거

        const viewProfilePath = isNicknameUrl ? `/${nickname}` : `/profile/view/${profileId}`;
        const editProfilePath = isNicknameUrl ? `/${nickname}` : `/profile/edit/${profileId}`;

        setCurrentPermission(result);

        switch (result) {
          case 'NEED_TO_LOGIN':
            setIsLoginModalOpen(true);
            break;
          case 'PERMISSION_DENIED':
          case 'PERMISSION_DENIED_BUT_REQUESTED':
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
            setHasEditPermission(true);
            // nickname URL일 때는 URL 유지하고 edit 컴포넌트 표시
            if (isNicknameUrl) {
              setShouldShowEditComponent(true);
              setShowScreen(true);
            } else if (shouldRedirect && currentPath !== editProfilePath) {
              navigate(editProfilePath);
            } else {
              setShowScreen(true);
            }
            break;
          case 'PUBLIC_PROFILE_OWNER':
          case 'YOU_HAVE_OWNER_PERMISSION':
            setHasEditPermission(true);
            // nickname URL일 때는 URL 유지하고 edit 컴포넌트 표시
            if (isNicknameUrl) {
              setShouldShowEditComponent(true);
            }
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
    hasEditPermission,
    shouldShowEditComponent,
    currentPermission,
  };
};

export default useProfilePermission;