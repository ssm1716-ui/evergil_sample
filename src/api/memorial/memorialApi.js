import axiosInstance from '@/api/axiosInstance';

// 추모 프로필 API

//추모 프로필 이미지 URL 수정
export const putUpateProfileImage = async (id, param) => {

    try {
        const res = await axiosInstance.put(`/memorial-profiles/${id}/profile-image`, param);
        console.log(res);
        return res;
    } catch (err) {
        console.error(err);
    }
};

//추모 프로필 이미지 URL 수정
export const putUpateBackgroundImage = async (id, param) => {

    try {
        const res = await axiosInstance.put(`/memorial-profiles/${id}/background-image`, param);
        console.log(res);
        return res;
    } catch (err) {
        console.error(err);
    }
};



//추모 프로필 설명 문구 수정 
export const putUpateDescription = async (id, param) => {

    try {
        const res = await axiosInstance.put(`/memorial-profiles/${id}/description`, param);
        console.log(res);
        return res;
    } catch (err) {
        console.error(err);
    }
};



//추모 프로필 등록
export const postRegisterProfile = async (param) => {
    try {
        const res = await axiosInstance.post('/memorial-profiles', param);
        return res;
    } catch (err) {
        console.error(err);
    }
};

//추모 프로필 조회
export const getSelectProfile = async (id) => {

    try {
        const res = await axiosInstance.get(`/memorial-profiles/${id}`);
        return res;
    } catch (err) {
        console.error(err);
    }
};