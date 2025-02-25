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
        console.log(res);
        return res;
    } catch (err) {
        console.error(err);
        return err.response ? err.response : { status: 500, data: 'Unknown error' };
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

// [
//     "oUrRhj5GdtMwWCn6",
//     "JLw54fbZvkakI6o5",
//     "UefCyiXDKfnrjShi",
//     "FU34EeajlZ1Zgtf0",
//     "y54GgUxyV9qWYAph",
//     "imB5vJ2myRwlscSU",
//     "fFvUuZTQQbm8siiU",
//     "E0qTNW8j8Zi7jMp2",
//     "n1zEIFgDN2tR6atc",
//     "LGdK5m8tQssaVn3R"
//   ]

// "8697b430-b852-4760-b92e-936bdc06864f"