import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { postTokenValidation } from '@/api/guest/guestApi';

const ValidationPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('key'); // ✅ URL에서 key 값 가져오기

  // navigate('/reset-password/:key'); // 로그아웃 후 로그인 페이지로 이동

  useEffect(() => {
    // 스타일 추가
    if (!token) {
      navigate(
        `/error?desc=${'접근 할 수 없는 페이지 입니다.'}&pageUrl=${'/signin'}`
      );
      return;
    }

    const fetchTokenValidation = async () => {
      try {
        const res = await postTokenValidation(token);
        console.log(token, res);

        if (!res || res.status !== 200) {
          navigate(
            `/error?desc=${'유효기간이 만료되었습니다.'}&pageUrl=${'/signin'}`
          );
          return;
        }
        navigate(`/reset-password?key=${token}`);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTokenValidation();
  }, []);

  return <></>;
};

export default ValidationPage;
