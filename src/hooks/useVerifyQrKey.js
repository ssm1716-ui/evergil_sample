import { useNavigate } from 'react-router-dom';

import { getQrKeyVerify } from '@/api/qr/qrApi';

export const useVerifyQrKey = () => {
    const navigate = useNavigate();

    const verify = async (qrKey) => {
        try {
            const res = await getQrKeyVerify(qrKey);
            const { route, profileId } = res.data.data;

            switch (route) {
                case 'LOGIN_PAGE':
                    navigate('/signin');
                    break;
                case 'ERROR_PAGE':
                    navigate(
                        `/error?desc=${'유효한 QR코드 아닙니다.'}&pageUrl=${'/profile'}`
                    );
                    break;
                case 'CREATE_PROFILE_PAGE':
                    navigate('/profile/setting-profile', { state: { qrKey } });
                    break;
                case 'PROFILE_PAGE':
                    if (!profileId) { navigate('/profile'); return; }
                    navigate(`/profile/view-profile/${profileId}`);
                    break;
                default:
                    navigate(
                        `/error?desc=${'유효하지 않습니다.'}&pageUrl=${'/profile'}`
                    );
                    break;
            }
        } catch (err) {
            console.error('QR 확인 실패', err);
            `/error?desc=${'QR 검증에 실패하였습니다.'}&pageUrl=${'/profile'}`;
        }
    };

    return { verify };
};



