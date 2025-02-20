import axios from 'axios';
import { API_BASE_URL } from '@/config';

export const API_SERVER_HOST = API_BASE_URL;
const prefix = `${API_SERVER_HOST}`;

const axiosInstance = axios.create({
    baseURL: prefix,
    withCredentials: true, // 쿠키 전송 허용
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        // console.log(config.headers['Authorization']);
        // console.log('Request Authorization Header:', config.headers['Authorization']);
        return config;
    });

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshResponse = await axiosInstance.post('/api/access-tokens.refresh');

                // 새 Access Token 설정
                const newAccessToken = refreshResponse.data.accessToken;
                // console.log('newAccessToken : ', newAccessToken);
                axiosInstance.defaults.headers.common['Authorization'] = `${newAccessToken}`;
                originalRequest.headers['Authorization'] = newAccessToken;

                // 원래 요청 재시도
                return axiosInstance(originalRequest);

            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

// 새로고침 후 Access Token 복원
export const restoreAuthorizationHeader = () => {
    const accessToken = localStorage.getItem('dev_accessToken');
    // console.log(accessToken);

    if (accessToken) {
        axiosInstance.defaults.headers.common['Authorization'] = `${accessToken}`;
        console.log('Authorization header restored');
    }
};

restoreAuthorizationHeader();

export default axiosInstance;
