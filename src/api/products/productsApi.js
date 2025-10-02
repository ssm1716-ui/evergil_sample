import axiosInstance from '@/api/axiosInstance';

// 상품 API

//상품 리스트
export const getProductsSelected = async (page = 1, pageSize = 20) => {
    try {
        const res = await axiosInstance.get('/products', {
            params: {
                page,
                pageSize,
            },
            headers: {
                authRequired: false, // 👈 여기서 제대로!
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
        const res = await axiosInstance.get(`/products/${id}`, {
            headers: {
                authRequired: false, // ✅ 이건 config 내 headers
            },
        });
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
            headers: {
                authRequired: false, // ✅ 이건 config 내 headers
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
        throw new Error(err.response?.data?.message || '처리 중 오류가 발생했습니다.');
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


