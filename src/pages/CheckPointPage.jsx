import { getAccessToken } from '@/api/memberApi';
import { useEffect } from 'react';

const CheckPointPage = () => {

  useEffect(() => {
    const restokenStats = getAccessToken();
    if (!restokenStats) {
      alert('토큰 통신에러가 발생하였습니다');
      return;
    }
  });

  return <></>;
};

export default CheckPointPage;
