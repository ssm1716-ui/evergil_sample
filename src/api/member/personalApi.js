import axiosInstance from '@/api/axiosInstance';

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



//패스워드 변경
export const putUpdatePassword = async (param) => {
    try {
        const res = await axiosInstance.put('/members/me/personal-info/password', param);
        console.log(res);
        return res;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

//이름 변경
export const putUpdateDisplayName = async (param) => {
    try {
        const res = await axiosInstance.put('/members/me/personal-info/display-name', param);
        console.log(res);
        return res;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

//핸드폰번호 변경
export const putUpdatePhone = async (param) => {
    try {
        const res = await axiosInstance.put('/members/me/personal-info/phone-number/request', param);
        return res;
    } catch (err) {
        console.error(err);
        throw new Error(err.response?.data?.message || '처리 중 오류가 발생했습니다.');
    }
};

//핸드폰번호 인증번호
export const putPhoneAuthCodeConfirm = async (param) => {
    try {
        const res = await axiosInstance.put('/members/me/personal-info/phone-number/confirm', param);
        console.log(res);
        return res;
    } catch (err) {
        console.error(err);
        throw err; // 에러를 상위로 전달하여 처리할 수 있도록 함
    }
};


//이메일 변경
export const putUpdateEmail = async (param) => {
    try {
        const res = await axiosInstance.put('/members/me/personal-info/email/request', param);
        console.log(res);
        return res;
    } catch (err) {
        console.error(err);
        throw err;
    }
};



//이메일 인증번호
export const putEmailAuthCodeConfirm = async (param) => {
    try {
        const res = await axiosInstance.put('/members/me/personal-info/email/confirm', param);
        console.log(res);
        return res;
    } catch (err) {
        console.error(err);
        throw err;
    }
};



//패스워드 확인 후 정보 변경 권한 획득
export const postMeReviews = async (param) => {
    try {
        const res = await axiosInstance.post('/members/me/reviews', param);
        return res;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

