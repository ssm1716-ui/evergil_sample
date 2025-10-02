import axiosInstance from '@/api/axiosInstance';

// 사용자 설정 조회 API

//사용자 설정 조회
export const getMemberSettingSelect = async () => {
    try {
        const res = await axiosInstance.get('/members/me/settings');
        return res;
    } catch (err) {
        console.error(err);
    }
};
