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
    }
};

//핸드폰번호 변경
export const putUpdatePhone = async (param) => {
    try {
        const res = await axiosInstance.put('/members/me/personal-info/phone-number/request', param);
        console.log(res);
        return res;
    } catch (err) {
        console.error(err);
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
    }
};


//이메일 변경
export const putUpdateEmail = async (param) => {
    try {
        const res = await axiosInstance.put('/members/me/personal-info/email/request', param);
        console.log(res);
        return res;
    } catch (err) {
        const message =
            err.response?.data?.message || '알 수 없는 오류가 발생했습니다.';
        alert(`[이메일 변경 실패] ${message}`);
        // 또는 throw 해서 상위에서 처리하도록 할 수도 있음
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
    }
};



//패스워드 확인 후 정보 변경 권한 획득
export const postMeReviews = async (param) => {
    try {
        const res = await axiosInstance.post('/members/me/reviews', param);
        return res;
    } catch (err) {
        console.error(err);

    }
};

