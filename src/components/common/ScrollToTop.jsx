import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // 페이지 이동 시 맨 위로 스크롤
  }, [pathname]);

  return null;
};

export default ScrollToTop;
