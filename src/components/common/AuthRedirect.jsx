import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';

const AuthRedirect = ({ children, redirectTo = '/profile', skipOnSignIn = false }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      // 로그인 페이지에서는 리다이렉트를 건너뛰고, SignInPage의 로직을 사용
      if (skipOnSignIn && location.pathname === '/signin') {
        // 인증된 사용자가 /signin에 직접 접속한 경우에만 /profile로 리다이렉트
        
        //이메일로 전달받은 초대하기로 로그인 후 로컬스토리지에서 get
        const invitationKey = localStorage.getItem('dev_invitation');

        //비공개 프로필 -> 로그인 후 로컬스토리지 get
        const remberProfileUrl = localStorage.getItem('dev_remberProfileUrl');

        //로그인 모달로 전달받은 리다이렉트 페이지
        const redirectAfterLogin = localStorage.getItem('redirectAfterLogin');

        if (invitationKey) {
          localStorage.removeItem('dev_invitation');
          localStorage.removeItem('dev_remberProfileUrl');
          localStorage.removeItem('redirectAfterLogin');
          navigate(`/profile/invitation?key=${invitationKey}`, { replace: true });
        } else if (remberProfileUrl) {
          localStorage.removeItem('dev_invitation');
          localStorage.removeItem('dev_remberProfileUrl');
          localStorage.removeItem('redirectAfterLogin');
          navigate(remberProfileUrl, { replace: true });
        } else if (redirectAfterLogin) {
          localStorage.removeItem('dev_invitation');
          localStorage.removeItem('dev_remberProfileUrl');
          localStorage.removeItem('redirectAfterLogin');
          navigate(redirectAfterLogin, { replace: true });
        } else {
          navigate(redirectTo, { replace: true });
        }        
      }
      
      // // URL 파라미터에서 returnTo 값을 확인
      // const urlParams = new URLSearchParams(location.search);
      // const returnTo = urlParams.get('returnTo');
      
      // if (returnTo) {
      //   // returnTo 파라미터가 있으면 해당 페이지로 이동
      //   navigate(returnTo, { replace: true });
      // } else {
      //   // 없으면 기본 리다이렉트 페이지로 이동
      //   navigate(redirectTo, { replace: true });
      // }
    }
  }, [isAuthenticated, navigate, redirectTo, location, skipOnSignIn]);

  // 인증되지 않은 경우에만 children을 렌더링
  return !isAuthenticated ? children : null;
};

export default AuthRedirect; 