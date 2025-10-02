import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { postAddCart } from '@/api/member/cartApi';
import { getCart, removeLocalStorageCart } from '@/api/memberApi';
import { getTransformedCartData } from '@/utils/utils';

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

        const handleRedirect = async () => {
          await sendCartProduct();

          localStorage.removeItem('dev_invitation');
          localStorage.removeItem('dev_remberProfileUrl');
          localStorage.removeItem('redirectAfterLogin');

          if (invitationKey) {
            navigate(`/profile/invitation?key=${invitationKey}`, { replace: true });
          } else if (remberProfileUrl) {
            navigate(remberProfileUrl, { replace: true });
          } else if (redirectAfterLogin) {
             navigate(redirectAfterLogin, { replace: true });
          } else {
            navigate(redirectTo, { replace: true });
          }        
        };

        handleRedirect();
      }
    }
  }, [isAuthenticated, navigate, redirectTo, location, skipOnSignIn]);

  // 인증되지 않은 경우에만 children을 렌더링
  return !isAuthenticated ? children : null;
};

const sendCartProduct = async () => {
  const storedCart = getCart();
  if (storedCart.length <= 0) return;
  const transformedData = getTransformedCartData(storedCart);

  try {
    const res = await postAddCart(transformedData); 
    if (res.status !== 200) {
      console.log('not saved cart!');
    }
  } catch (error) {
    console.log('Error saving cart:', error);
  }
  removeLocalStorageCart();
};

export default AuthRedirect; 