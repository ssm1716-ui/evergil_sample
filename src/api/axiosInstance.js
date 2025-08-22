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

        // 네트워크 에러 등 response가 없는 경우
        if (!error.response) {
            // 네트워크 연결 상태 확인
            if (!navigator.onLine) {
                console.warn('네트워크 연결이 끊어졌습니다.');
                return Promise.reject(new Error('네트워크 연결을 확인해주세요.'));
            }
            
            // 서버 연결 실패 등의 경우 - 토큰은 유지하고 단순히 에러만 반환
            console.warn('서버 연결에 실패했습니다:', error.message);
            return Promise.reject(new Error('서버 연결에 실패했습니다. 잠시 후 다시 시도해주세요.'));
        }

        // 5xx 서버 에러 처리 - 토큰 유지
        if (error.response?.status >= 500) {
            console.error('서버 에러 발생:', error.response.status, error.response.data);
            return Promise.reject(new Error('서버에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.'));
        }

        // 4xx 클라이언트 에러 중 401만 특별 처리
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            
            // 현재 페이지가 인증이 필요한 페이지인 경우에만 리다이렉트
            const authRequiredPaths = ['/mypage', '/profile', '/order', '/cart'];
            const currentPath = window.location.pathname;
            const isAuthRequiredPage = authRequiredPaths.some(path => currentPath.startsWith(path));
            
            if (isAuthRequiredPage && currentPath !== '/signin' && currentPath !== '/signup') {
                // 사용자에게 알림 후 리다이렉트
                if (confirm('로그인이 만료되었습니다. 다시 로그인해주세요.')) {
                    window.location.href = '/signin';
                }
            }
            
            return Promise.reject(new Error('인증이 필요합니다. 다시 로그인해주세요.'));
        }

        // 403 Forbidden 에러 처리 - 권한 부족
        if (error.response?.status === 403) {
            console.warn('접근 권한이 없습니다:', error.response.data);
            return Promise.reject(new Error('접근 권한이 없습니다.'));
        }

        // 404 Not Found 에러 처리
        if (error.response?.status === 404) {
            console.warn('요청한 리소스를 찾을 수 없습니다:', error.response.data);
            return Promise.reject(new Error('요청한 리소스를 찾을 수 없습니다.'));
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
