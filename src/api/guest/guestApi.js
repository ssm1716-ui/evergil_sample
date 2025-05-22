import axiosInstance from '@/api/axiosInstance';

//guest API

//비밀번호 찾기 이메일 요청
export const postPasswordRequest = async (param) => {
    try {
        const res = await axiosInstance.post('/guest/password-reset/request', {
            email: param
        });
        return res.status;
    } catch (err) {
        const message =
            err.response?.data?.message || '알 수 없는 오류가 발생했습니다.';
        alert(`[비밀번호 찾기 실패] ${message}`);
        // 또는 throw 해서 상위에서 처리하도록 할 수도 있음
        throw err;
    }
};

//비밀번호 토큰 검증
export const postTokenValidation = async (param) => {
    try {
        const res = await axiosInstance.post('/guest/password-reset/validate', {
            token: param
        });
        return res;
    } catch (err) {
        console.error(err);
    }
};

//비밀번호 재설정 
export const postResetPassword = async (param) => {
    try {
        const res = await axiosInstance.post('/guest/password-reset/confirm', param);
        return res;
    } catch (err) {
        console.error(err);
    }
};



//FAQ 가져오기
export const getFaq = async () => {
    try {
        const res = await axiosInstance.get('/faq', {
            headers: {
                authRequired: false,
            },
        });
        return res;
    } catch (err) {
        console.error(err);
    }
};



// 문의하기 요청
export const postInquiryRequest = async (param) => {
    try {
        const res = await axiosInstance.post(
            '/guest/inquiry',
            param, // ✅ 이건 요청 body
            {
                headers: {
                    authRequired: false, // ✅ 이건 config 내 headers
                },
            }
        );
        return res.status;
    } catch (err) {
        console.error(err);
    }
};

