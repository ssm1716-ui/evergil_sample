import axiosInstance from '@/api/axiosInstance';

// 리뷰 API

//상품 개별 리뷰 조회
export const getReviewSelected = async (id) => {

    try {
        const res = await axiosInstance.get(`/products/reviews/${id}`);
        return res;
    } catch (err) {
        console.error(err);
    }
};

//상품 리뷰 작성
export const postReviewRegister = async (id, param) => {
    try {
        const res = await axiosInstance.post(`/products/${id}/reviews`, param);
        return res;
    } catch (err) {
        console.error(err);
        throw err;
    }
};


//상품 리뷰 수정
export const postReviewModify = async (proudctId, reviewId, param) => {
    try {
        const res = await axiosInstance.put(`/products/${proudctId}/reviews/${reviewId}`, param);
        return res;
    } catch (err) {
        console.error(err);
        // return err.response ? err.response : { status: 500, data: 'Unknown error' };
    }
};



//상품 리뷰 삭제
export const postReviewRemove = async (id, param) => {
    try {
        const res = await axiosInstance.delete(`/products/reviews/${id}`);
        return res;
    } catch (err) {
        console.error(err);
        // return err.response ? err.response : { status: 500, data: 'Unknown error' };
    }
};


