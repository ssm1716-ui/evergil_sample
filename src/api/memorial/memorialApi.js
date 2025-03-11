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
export const getSelectProfileViewList = async (page = 1, pageSize = 20, mockResult = 0) => {

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
export const getSelectProfileBookmarksList = async (page = 1, pageSize = 20, mockResult = 0) => {

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

//추모프로필 자신의 editor 권한 삭제
export const deleteEditorProfile = async (id) => {
    try {
        const res = await axiosInstance.delete(`/members/me/memorial-profiles/${id}/permissions/editor`);
        return res;
    } catch (err) {
        console.error(err);
    }
};

//추모프로필 자신의 viewer 권한 삭제
export const deleteViwerProfile = async (id) => {
    try {
        const res = await axiosInstance.delete(`/members/me/memorial-profiles/${id}/permissions/viewer`);
        return res;
    } catch (err) {
        console.error(err);
    }
};

//추모프로필 북마크 삭제
export const deleteBookmarksProfile = async (id) => {
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


//추모 프로필 배경 이미지 수정
export const putProfileBackgroundImage = async (id, param) => {

    try {
        const res = await axiosInstance.put(`/memorial-profiles/${id}/background-image`, param);
        return res;
    } catch (err) {
        console.error(err);
    }
};


//추모 프로필 프로필 이미지 수정
export const putProfileImage = async (id, param) => {

    try {
        const res = await axiosInstance.put(`/memorial-profiles/${id}/profile-image`, param);
        console.log(res);
        return res;
    } catch (err) {
        console.error(err);
    }
};


//추모 프로필 설명 문구 수정
export const putProfileDescription = async (id, param) => {

    try {
        const res = await axiosInstance.put(`/memorial-profiles/${id}/description`, param);
        console.log(res);
        return res;
    } catch (err) {
        console.error(err);
    }
};

//추모 이미지 리스트 조회
export const getPhotoProfile = async (id, page = 1, pageSize = 10) => {

    try {
        const res = await axiosInstance.get(`/memorial-profiles/${id}/photos`, {
            params: {
                page, pageSize
            },
        });
        console.log(res);
        return res;
    } catch (err) {
        console.error(err);
    }
};

//추모 하늘편지 리스트 조회 및 검색
export const getLetters = async (id, keyword = '', page = 1, pageSize = 10) => {

    try {
        const res = await axiosInstance.get(`/memorial-profiles/${id}/letters`, {
            params: {
                keyword, page, pageSize
            },
        });
        console.log(res);
        return res;
    } catch (err) {
        console.error(err);
    }
};

//추모 하늘편지 등록
export const postLetters = async (profileId, params) => {

    try {
        const res = await axiosInstance.post(`/memorial-profiles/${profileId}/letters`, params);
        console.log(res);
        return res;
    } catch (err) {
        console.error(err);
    }
};

//추모 하늘편지 수정
export const putLetters = async (profileId, letterId, params) => {

    try {
        const res = await axiosInstance.put(`/memorial-profiles/${profileId}/letters/${letterId}`, params);
        console.log(res);
        return res;
    } catch (err) {
        console.error(err);
    }
};




//추모 가족관계도 조회
export const getFamilyProfile = async (id) => {

    try {
        console.log(id);
        const res = await axiosInstance.get(`/memorial-profiles/${id}/family`);
        console.log(res);
        return res;
    } catch (err) {
        console.error(err);
    }
};

//추모 가족관계도 업데이트
export const putFamilyProfile = async (id, params) => {

    try {
        const res = await axiosInstance.put(`/memorial-profiles/${id}/family`, {
            items: params
        });
        console.log(res);
        return res;
    } catch (err) {
        console.error(err);
    }
};

//하늘편지 삭제
export const deleteLetters = async (profileId, lettersId) => {

    try {
        const res = await axiosInstance.delete(`/memorial-profiles/${profileId}/letters/${lettersId}`);
        console.log(res);
        return res;
    } catch (err) {
        console.error(err);
    }
};
