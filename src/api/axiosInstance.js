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

// axiosInstance.js
// axiosInstance.interceptors.request.use((config) => {
//     if (config.headers?.authRequired === false) {
//         // ❗ 토큰 제거
//         delete config.headers['Authorization'];
//     } else {
//         const token = localStorage.getItem('token');
//         if (token) {
//             config.headers['Authorization'] = `${token}`;
//         }
//     }
//     return config;
// });

// axiosInstance.interceptors.response.use(
//     (res) => {
//         console.log('[✅ 응답 성공]', res);
//         return res;
//     },
//     async (error) => {
//         const originalRequest = error.config;

//         const isAuthRequired =
//             originalRequest?.headers?.authRequired !== false; // ❗ 기본값은 true처럼 작동하게

//         console.log('🔍 authRequired:', isAuthRequired);
//         console.log('🔍 error.response:', error.response);

//         if (error.response?.status === 403 && isAuthRequired && !originalRequest._retry) {
//             originalRequest._retry = true;

//             try {
//                 const refreshResponse = await axiosInstance.post('/api/access-tokens.refresh');
//                 const newAccessToken = refreshResponse.data.accessToken;

//                 localStorage.setItem('token', newAccessToken);
//                 axiosInstance.defaults.headers.common['Authorization'] = `${newAccessToken}`;
//                 originalRequest.headers['Authorization'] = newAccessToken;

//                 return axiosInstance(originalRequest); // 재시도
//             } catch (refreshError) {
//                 console.log('[❌ 리프레시 실패]', refreshError);
//                 return Promise.reject(refreshError);
//             }
//         }

//         return Promise.reject(error);
//     }
// );

axiosInstance.interceptors.request.use((config) => {
    if (config.headers?.authRequired === false) {
        // ❗ 토큰 제거
        delete config.headers['Authorization'];
    } else {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `${token}`;
        }
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (res) => res,
    async (error) => {

        console.log(error);
        console.log(error.response);

        // 401 Unauthorized 에러 처리
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/signin';
            return Promise.reject(error);
        }

        // 네트워크 에러 등 response가 없는 경우
        if (!error.response) {
            localStorage.removeItem('token');
            window.location.href = '/signin';
            return Promise.reject(error);
        }

        return Promise.reject(error);
    }
);

// 새로고침 후 Access Token 복원
export const restoreAuthorizationHeader = () => {
    const accessToken = localStorage.getItem('token');

    if (accessToken) {
        axiosInstance.defaults.headers.common['Authorization'] = `${accessToken}`;
    }
};

restoreAuthorizationHeader();

export default axiosInstance;
