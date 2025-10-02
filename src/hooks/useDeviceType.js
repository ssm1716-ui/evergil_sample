import { useMemo } from 'react';

const useDeviceType = () => {
    const deviceType = useMemo(() => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;

        if (/android/i.test(userAgent)) return 'MOBILE';
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) return 'MOBILE';

        return 'WEB';
    }, []);

    return deviceType;
};

export default useDeviceType;
