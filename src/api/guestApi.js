import axiosInstance from './axiosInstance';

//비밀번호 찾기 이메일 요청
export const postPasswordRequest = async (param) => {
    try {
        const res = await axiosInstance.post('/guest/password-reset/request', {
            email: param
        });
        return res.status;
    } catch (err) {
        console.error(err);
    }
};

