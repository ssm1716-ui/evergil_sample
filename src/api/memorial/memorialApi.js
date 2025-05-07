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
        const res = await axiosInstance.post(`/bookmarks/memorial-profiles/${id}`);
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
export const getPhotoSeletct = async (id, type, page = 1, pageSize = type === 'edit' ? 11 : 12) => {

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

//프로필 컨텐츠 이미지 등록
export const postPhotoRegister = async (id, param) => {
    try {
        const res = await axiosInstance.post(`/memorial-profiles/${id}/photos`, param);
        return res;
    } catch (err) {
        console.error(err);
    }
};


//프로필 컨텐츠 이미지 변경
export const putPhotoModify = async (id, param) => {
    try {
        const res = await axiosInstance.put(`/memorial-profiles/photos/${id}`, param);
        return res;
    } catch (err) {
        console.error(err);
    }
};

//프로필 컨텐츠 이미지 삭제
export const deletePhotoRemove = async (id) => {
    try {
        const res = await axiosInstance.delete(`/memorial-profiles/photos/${id}`);
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

//추모 하늘편지 조회
export const getLetter = async (profileId, letterId) => {

    try {
        const res = await axiosInstance.get(`/memorial-profiles/${profileId}/letters/${letterId}`);
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

//추모 프로필 초대하기(이메일 초대 발송)
export const postEmailInvitations = async (profileId, params) => {

    try {
        console.log(params);
        const res = await axiosInstance.post(`/memorial-profiles/${profileId}/invitations`, {
            receiverEmail: params
        });
        console.log(res);
        return res;
    } catch (err) {
        console.error(err);
    }
};

//OWNER 권한으로 발송한 초대장 리스트
export const getInvitationsList = async (profileId, page = 1, pageSize = 10) => {

    try {
        const res = await axiosInstance.get(`/memorial-profiles/${profileId}/invitations`, {
            params: {
                profileId, page, pageSize
            },
        });
        return res;
    } catch (err) {
        console.error(err);
    }
};

//초대받은 계정의 권한 변경
export const putInvitationPermissions = async (profileId, invitationId, params) => {

    try {
        console.log(profileId, invitationId, params);

        const res = await axiosInstance.put(`/memorial-profiles/${profileId}/invitations/${invitationId}/permissions`, {
            permission: params
        });
        return res;
    } catch (err) {
        console.error(err);
    }
};

//초대받은 계정의 권한 삭제
export const deleteInvitationPermissions = async (profileId, invitationId, params) => {

    try {
        console.log(profileId, invitationId, params);

        const res = await axiosInstance.delete(`/memorial-profiles/${profileId}/invitations/${invitationId}/permissions`);
        return res;
    } catch (err) {
        console.error(err);
    }
};




//프로필 설정(공개/비공개) 변경
export const putProfileScope = async (profileId, params) => {

    try {
        console.log(params);
        const res = await axiosInstance.put(`/memorial-profiles/${profileId}/scope`, {
            scope: params
        });
        console.log(res);
        return res;
    } catch (err) {
        console.error(err);
    }
};

//비공개 프로필 접근 권한 요청 리스트
export const getPrivateProfileAccessRequests = async (profileId, page = 1, pageSize = 10) => {

    try {
        const res = await axiosInstance.get(`/memorial-profiles/${profileId}/requests`, {
            params: {
                profileId, page, pageSize
            },
        });
        console.log(res);
        return res;
    } catch (err) {
        console.error(err);
    }
};

//비공개 프로필 접근 권한 허용/거부 변경
export const putPrivateAccessRequests = async (profileId, requestId, status) => {
    try {
        const res = await axiosInstance.put(
            `/memorial-profiles/${profileId}/requests/${requestId}`,
            null, // 바디는 없음 (query string만 사용할 경우 null)
            {
                params: { status }, // ✅ 여기에 query string으로 전달
            }
        );
        console.log(res);
        return res;
    } catch (err) {
        console.error(err);
    }
};

//비공개 프로필의 소유자에게 초대하기 
export const postPrivateProfileAccessRequest = async (profileId, params) => {

    try {
        const res = await axiosInstance.post(`/memorial-profiles/${profileId}/requests`, params);
        console.log(res);
        return res;
    } catch (err) {
        console.error(err);
    }
};

//초대를 수락/거절하기 
export const putConfirmInvitation = async (params) => {

    try {
        const res = await axiosInstance.put('/memorial-profiles/invitations.resolve', params);
        console.log(res);
        return res;
    } catch (err) {
        console.error(err);
        return err.response ? err.response : { status: 500, data: 'Unknown error' };
    }
};

