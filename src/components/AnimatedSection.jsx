import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

const AnimatedSection = ({ children }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // data-anime 속성이 있는 모든 요소 선택
    const elements = sectionRef.current.querySelectorAll('[data-anime]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target;
            const animeProps = JSON.parse(element.getAttribute('data-anime'));

            anime({
              targets: element, // 해당 요소만 애니메이션 적용
              ...animeProps, // data-anime 속성 값을 적용
            });

            observer.unobserve(element); // 애니메이션 실행 후 해제
          }
        });
      },
      { threshold: 0.2 } // 20% 보이면 트리거
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="m-0 p-0" ref={sectionRef}>
      {children}
    </div>
  );
};

export default AnimatedSection;
