import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GlobalAnimeHandler = () => {
  const location = useLocation(); // 현재 경로 가져오기

  useEffect(() => {
    const animeElements = document.querySelectorAll('[data-anime]');

    if (animeElements.length === 0) {
      console.warn('data-anime 속성이 있는 요소가 없습니다.');
      return;
    }

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const animationData = JSON.parse(el.getAttribute('data-anime'));

            // 애니메이션 적용
            el.style.opacity = animationData.opacity
              ? animationData.opacity[1]
              : 1;
            el.style.transform = `translateY(${
              animationData.translateY ? animationData.translateY[1] : 0
            }px)`;
            el.style.transition = 'all 0.6s ease-out';

            // 애니메이션 실행 후 옵저버 해제
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.2 } // 20% 이상 화면에 보여야 실행
    );

    animeElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [location.pathname]); // 🔥 페이지 경로가 바뀔 때마다 실행됨

  return null;
};

export default GlobalAnimeHandler;
