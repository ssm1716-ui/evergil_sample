import axios from 'axios';

export const API_SERVER_HOST = 'https://dev-api.everlink.kr';

const prefix = `${API_SERVER_HOST}`;

const axiosInstance = axios.create({
    baseURL: prefix,
    withCredentials: true, // 쿠키 전송 허용
    headers: {
        'Content-Type': 'application/json',
    },
});

//회원가입
export const postSignUp = async (param) => {
    try {
        const res = await axiosInstance.post('/sign-up', param);
        return res.data;
    } catch (err) {
        console.error(err);
    }
};

//로그인
export const postSignIn = async (param) => {
    try {
        const res = await axiosInstance.post('/authenticate', param);
        return res.data;
    } catch (err) {
        console.error(err);
    }
};

//회원가입 후 이메일 인증코드로 계정 활성화
export const getVerificationCodeVerify = async (param) => {
    try {
        console.log(param);
        const res = await axiosInstance.get('/verification-codes.verify', {
            params: {
                code: param,
            },
        });
        console.log(res);
        return res.data;
    } catch (err) {
        console.error(err);
    }
};

//이메일 인증코드 재발송 요청
export const getVerificationEmailResend = async (param) => {
    try {
        const res = await axiosInstance.post('/verification-emails.resend', param);
        return res.data;
    } catch (err) {
        console.error(err);
    }
};

//이메일 인증후 토큰 값 가져오기 
export const getAccessToken = async (param) => {
    try {
        console.log(param);
        const res = await axiosInstance.get('/api/access-tokens.refresh');
        console.log(res);
        return res.data;
    } catch (err) {
        console.error(err);
    }
};





