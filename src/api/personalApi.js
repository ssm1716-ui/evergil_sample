import axiosInstance from './axiosInstance';

//패스워드 확인 후 정보 변경 권한 획득
export const postPasswordConfirm = async (param) => {
    try {
        const res = await axiosInstance.post('/members/me/personal-info/nonce.get', {
            password: param
        });
        return res;
    } catch (err) {
        console.error(err);
        return err.response ? err.response : { status: 500, data: 'Unknown error' };
    }
};

//회원가입 후 이메일 인증코드로 계정 활성화
export const getVerificationCodeVerify = async (param) => {
    try {
        const res = await axiosInstance.get('/verification-codes.verify', {
            params: {
                code: param,
            },
        });

        localStorage.removeItem('dev_emailVerificationCode'); // emailVerificationCode 삭제
        return res.status;
    } catch (err) {
        console.error(err);
    }
};