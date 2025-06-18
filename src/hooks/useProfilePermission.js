import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSelectProfile } from '@/api/memorial/memorialApi';

const useProfilePermission = (profileId, options = {}) => {
  const navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [showScreen, setShowScreen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(true);

  const { shouldRedirect = true } = options; // 기본값 true

  useEffect(() => {
    const fetchPermission = async () => {
      try {
        const res = await getSelectProfile(profileId);
        const { result } = res.data.data;

        const currentPath = window.location.pathname;
        const viewProfilePath = `/profile/view-profile/${profileId}`;
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
          if (currentPath !== viewProfilePath) {
            navigate(viewProfilePath);
          }
          setShowScreen(true);
          break;
        case 'PUBLIC_PROFILE_EDITOR':
        case 'YOU_HAVE_EDITOR_PERMISSION':
          if (shouldRedirect && currentPath !== editProfilePath) {
            navigate(editProfilePath);
          }
          setShowScreen(true);
          break;
        case 'PUBLIC_PROFILE_OWNER':
        case 'YOU_HAVE_OWNER_PERMISSION':
          setShowScreen(true);
          break;
        default:
          throw new Error('권한 에러 발생');
        }
      } catch (error) {
        setIsAuthorized(false);
      }
    };

    if (profileId) fetchPermission();
  }, [profileId, navigate, shouldRedirect]);

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
