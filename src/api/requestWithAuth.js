import axiosInstance from './axiosInstance';

export const requestWithAuth = async (requestFn) => {
    try {
        return await requestFn();
    } catch (error) {
        console.log(error);
        if (error.response?.status === 403) {
            console.log('🔁 토큰 만료됨, refresh 요청 시도');

            try {
                const refreshRes = await axiosInstance.post('/api/access-tokens.refresh');
                const newAccessToken = refreshRes.data.accessToken;

                localStorage.setItem('token', newAccessToken);
                axiosInstance.defaults.headers['Authorization'] = newAccessToken;

                return await requestFn(); // 원래 요청 재시도
            } catch (refreshError) {
                console.error('❌ 리프레시 실패');
                throw refreshError;
            }
        }

        throw error; // 다른 에러는 그대로 전달
    }
};