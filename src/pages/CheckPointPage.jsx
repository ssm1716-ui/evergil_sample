import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/state/slices/authSlices';

import { postAddCart } from '@/api/member/cartApi';
import { getCart, removeLocalStorageCart } from '@/api/memberApi';
import { getTransformedCartData } from '@/utils/utils';

const CheckPointPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('access_token');
  const dispatch = useDispatch();

  // 토큰 있는지 확인 후 로그인 처리
  useEffect(() => {
    const fetchToken = async () => {
      try {
        // const { status, token } = await getAccessToken();
        // if (status !== 200) {
        //   alert('토큰 통신에러가 발생하였습니다');
        //   return;
        // }
        // console.log(token);
        dispatch(loginSuccess({ token }));

        //로그인 후 장바구니 아이템 서버로 전송
        sendCartProduct();

        //초대하기로 전달받은 로그인 & 비공개 프로필
        profileBridge();

        navigate('/profile');
      } catch (error) {
        console.error('check-poing: ', error);
      }
    };

    fetchToken();
  }, []);

  const profileBridge = () => {
    //이메일로 전달받은 초대하기로 로그인 후 로컬스토리지에서 get
    const invitationKey = localStorage.getItem('dev_invitation');

    //비공개 프로필 -> 로그인 후 로컬스토리지 get
    const remberProfileUrl = localStorage.getItem('dev_remberProfileUrl');

    if (invitationKey) {
      localStorage.removeItem('dev_invitation');
      navigate(`/profile/invitation?key=${invitationKey}`);
      return;
    }
    if (remberProfileUrl) {
      localStorage.removeItem('dev_remberProfileUrl');
      navigate(`${remberProfileUrl}`);
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
  return (
    <>
      {/* <div>
        <span>Access Token 발행 테스트</span>
        <br />
        <p>{token}</p>
      </div> */}
    </>
  );
};

export default CheckPointPage;
