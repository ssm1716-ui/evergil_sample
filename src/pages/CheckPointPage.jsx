import { getAccessToken } from '@/api/memberApi';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/state/slices/authSlices';

const CheckPointPage = () => {
  const [accessToken, setAccessToken] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 토큰 있는지 확인 후 로그인 처리
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const { status, token } = await getAccessToken();
        if (status !== 200) {
          alert('토큰 통신에러가 발생하였습니다');
          return;
        }
        dispatch(loginSuccess({ token }));
        navigate('/profile');
      } catch (error) {
        console.error('check-poing: ', error);
      }
    };

    fetchToken();
  }, []);

  return (
    <>
      <div>
        <span>Access Token 발행 테스트</span>
        <br />
        <p>{accessToken}</p>
      </div>
    </>
  );
};

export default CheckPointPage;
