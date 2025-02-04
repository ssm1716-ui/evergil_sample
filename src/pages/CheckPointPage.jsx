import { getAccessToken } from '@/api/memberApi';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckPointPage = () => {
  const [accessToken, setAccessToken] = useState('');
  const navigate = useNavigate();

  // 토큰 있는지 확인 후 로그인 처리
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const { status } = await getAccessToken();
        console.log(status);
        if (status !== 200) {
          alert('토큰 통신에러가 발생하였습니다');
          return;
        }

        navigate('/profile');
      } catch (error) {
        console.err('check-poing: ', error);
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
