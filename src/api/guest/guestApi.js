import axiosInstance from '@/api/axiosInstance';

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


//FAQ 가져오기
export const getFaq = async () => {
    try {
        const res = await axiosInstance.get('/faq');
        return res;
    } catch (err) {
        console.error(err);
    }
};



//문의하기 요청
export const postInquiryRequest = async (param) => {
    try {
        const res = await axiosInstance.post('/guest/inquiry', param);
        return res.status;
    } catch (err) {
        console.error(err);
    }
};

