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

//추모 프로필 설정 수정
export const putModifyProfile = async (id, param) => {

    try {
        const res = await axiosInstance.put(`/memorial-profiles/${id}`, param);
        return res;
    } catch (err) {
        console.error(err);
    }
};



//추모 프로필 조회
export const getSelectProfileList = async (page = 1, pageSize = 20, mockResult = 0) => {

    try {
        const res = await axiosInstance.get('/members/me/memorial-profiles/my-everlinks', {
            params: {
                page, pageSize, mockResult
            },
        });
        return res;
    } catch (err) {
        console.error(err);
    }
};

//추모 view 조회
export const getSelectProfileViewList = async (page = 1, pageSize = 20, mockResult = 5) => {

    try {
        const res = await axiosInstance.get('/members/me/memorial-profiles/view', {
            params: {
                page, pageSize, mockResult
            },
        });
        return res;
    } catch (err) {
        console.error(err);
    }
};


//추모 bookmarks 조회
export const getSelectProfileBookmarksList = async (page = 1, pageSize = 20, mockResult = 5) => {

    try {
        const res = await axiosInstance.get('/members/me/memorial-profiles/bookmarks', {
            params: {
                page, pageSize, mockResult
            },
        });
        return res;
    } catch (err) {
        console.error(err);
    }
};


//추모 프로필 edit 권한 삭제
export const postRemoveProfileEditPermission = async (id) => {
    try {
        const res = await axiosInstance.delete(`/members/me/memorial-profiles/${id}/permissions/editor`);
        return res;
    } catch (err) {
        console.error(err);
    }
};



//추모 프로필 view 권한 삭제
export const postRemoveProfileViewPermission = async (id) => {
    try {
        const res = await axiosInstance.delete(`/members/me/memorial-profiles/${id}/permissions/viewer`);
        return res;
    } catch (err) {
        console.error(err);
    }
};


//북마크 삭제
export const postRemoveProfileBookmarks = async (id) => {
    try {
        const res = await axiosInstance.delete(`/bookmarks/memorial-profiles/${id}`);
        return res;
    } catch (err) {
        console.error(err);
    }
};


//북마크 지정
export const postAddProfileBookmark = async (id) => {
    try {
        const res = await axiosInstance.delete(`/bookmarks/memorial-profiles/${id}`);
        return res;
    } catch (err) {
        console.error(err);
    }
};
