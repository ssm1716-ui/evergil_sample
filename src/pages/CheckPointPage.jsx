import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/state/slices/authSlices';
import SuccessModal from '@/components/common/Modal/SuccessModal';

import { postAddCart } from '@/api/member/cartApi';
import { getCart, removeLocalStorageCart } from '@/api/memberApi';
import { getTransformedCartData } from '@/utils/utils';

const CheckPointPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('access_token');
  const error = searchParams.get('error');
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // error 파라미터 처리
  useEffect(() => {
    if (error === 'status') {
      setModalMessage('**로그인이 차단되었습니다**\n본 계정은 약관 위반 또는 의심스러운 활동으로 인해 비활성화되었습니다. 자세한 사항은 고객센터로 문의해 주세요.');
      setIsModalOpen(true);
    }
  }, [error]);

  // 토큰 있는지 확인 후 로그인 처리
  useEffect(() => {
    const fetchToken = async () => {
      try {
        dispatch(loginSuccess({ token }));

        //로그인 후 장바구니 아이템 서버로 전송
        sendCartProduct();

        //초대하기로 전달받은 로그인 & 비공개 프로필
        profileBridge();
      } catch (error) {
        console.error('check-poing: ', error);
      }
    };

    if (token && !error) {
      fetchToken();
    }
  }, [token, error]);

  const profileBridge = () => {
    //이메일로 전달받은 초대하기로 로그인 후 로컬스토리지에서 get
    const invitationKey = localStorage.getItem('dev_invitation');

    //비공개 프로필 -> 로그인 후 로컬스토리지 get
    const remberProfileUrl = localStorage.getItem('dev_remberProfileUrl');

    if (invitationKey) {
      localStorage.removeItem('dev_invitation');
      navigate(`/profile/invitation?key=${invitationKey}`);
      return;
    } else if (remberProfileUrl) {
      localStorage.removeItem('dev_remberProfileUrl');
      navigate(`${remberProfileUrl}`);
      return;
    } else {
      const redirectPath = localStorage.getItem('redirectAfterLogin') || '/profile';
      localStorage.removeItem('redirectAfterLogin');
      navigate(redirectPath);
      return;
    }
  };

  const sendCartProduct = async () => {
    const storedCart = getCart();
    console.log(storedCart);
    if (storedCart.length <= 0) return;
    const transformedData = getTransformedCartData(storedCart);

    const res = await postAddCart(transformedData);
    console.log(res);
    if (res.status !== 200) {
      console.log('not saved cart!');
    }
    removeLocalStorageCart();
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
    navigate('/signin');
  };

  return (
    <>
      <SuccessModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        message={modalMessage}
      />
    </>
  );
};

export default CheckPointPage;
