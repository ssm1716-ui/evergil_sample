import { getAccessToken } from '@/api/memberApi';
import { useEffect, useState } from 'react';

const CheckPointPage = () => {

  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const newToken = await getAccessToken();
        if (!newToken) {
          alert('토큰 통신에러가 발생하였습니다');
          return;
        }
        setAccessToken(newToken);
      } catch (error) {
        alert('토큰 가져오기 실패: ' + error);
      }
    };

    fetchToken();
  }, []);

  return <>
    <div>
      <span>Access Token 발행 테스트</span><br />
      <p>
        {accessToken}
      </p>
    </div>
  </>;
};

export default CheckPointPage;
