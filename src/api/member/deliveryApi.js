import axiosInstance from '@/api/axiosInstance';

export const getOnceAddress = async (id) => {

    try {
        const res = await axiosInstance.get(`/members/me/delivery-addresses/${id}`);
        return res;
    } catch (err) {
        console.error(err);
    }
};

//배송지 전체 조회
export const getMembersAddressList = async () => {

    try {
        const res = await axiosInstance.get('/members/me/delivery-addresses');
        return res;
    } catch (err) {
        console.error(err);
    }
};

//배송지주소 업데이트
export const putUpdateAddress = async (id, param) => {

    try {
        const res = await axiosInstance.put(`/members/me/delivery-addresses/${id}`, param);
        console.log(res);
        return res;
    } catch (err) {
        console.error(err);
    }
};

//배송지주소 추가
export const postAddAddress = async (param) => {
    try {
        const res = await axiosInstance.post('/members/me/delivery-addresses', param);
        return res;
    } catch (err) {
        console.error(err);
    }
};


//배송지주소 삭제
export const deleteAddress = async (id) => {

    try {
        const res = await axiosInstance.delete(`/members/me/delivery-addresses/${id}`);
        console.log(res);
        return res;
    } catch (err) {
        console.error(err);
        return err.response;
    }
};

//기본 배송지 지정
export const putDefaultAddress = async (id) => {

    try {
        const res = await axiosInstance.put(`/members/me/delivery-addresses/${id}/default`);
        console.log(res);
        return res;
    } catch (err) {
        console.error(err);
    }
};
