import axiosInstance from '@/api/axiosInstance';

// 장바구니 API

//장바구니 갱신
export const putUpdateCart = async (param) => {

    try {
        const res = await axiosInstance.put('/members/me/cart', param);
        console.log(res);
        return res;
    } catch (err) {
        console.error(err);
    }
};

//장바구니 추가
export const postAddCart = async (param) => {
    try {
        const res = await axiosInstance.post('/members/me/cart', param);
        return res;
    } catch (err) {
        console.error(err);
    }
};

//장바구니 조회 
export const getSelectCart = async () => {

    try {
        const res = await axiosInstance.get('/members/me/cart');
        return res;
    } catch (err) {
        console.error(err);
    }
};

//장바구니 삭제
export const deleteCart = async (id) => {

    try {
        const res = await axiosInstance.delete(`/members/me/cart/${id}`);
        return res;
    } catch (err) {
        console.error(err);
        return err.response;
    }
};
