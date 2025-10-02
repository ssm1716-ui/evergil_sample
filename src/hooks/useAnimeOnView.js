import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';

const useAnimeOnView = (animationConfig) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 } // 20% 보일 때 트리거
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (isVisible && ref.current) {
            anime({
                targets: ref.current.children,
                ...animationConfig,
            });
        }
    }, [isVisible, animationConfig]);

    return ref;
};

export default useAnimeOnView;
