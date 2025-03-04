import axiosInstance from '@/api/axiosInstance';

// 상품 API

//상품 리스트
export const getProductsSelected = async (page = 1, pageSize = 20) => {

    try {
        const res = await axiosInstance.get('/products', {
            params: {
                page, pageSize
            },
        });
        return res;
    } catch (err) {
        console.error(err);
    }
};

//상품 상세조회 
export const getProductDetailSelected = async (id) => {

    try {
        const res = await axiosInstance.get(`/products/${id}`);
        return res;
    } catch (err) {
        console.error(err);
    }
};


//상품 리뷰 리스트 조회
export const getProductReviewsSelected = async (id, sortType, page = 1, pageSize = 10) => {
    console.log(sortType, page, pageSize);
    try {
        const res = await axiosInstance.get(`/products/${id}/reviews`, {
            params: {
                sortType, page, pageSize
            },
        });
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
        // return err.response ? err.response : { status: 500, data: 'Unknown error' };
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


