import axiosInstance from '@/api/axiosInstance';

//주문 API

//주문 리스트
export const getOrdersList = async (param, page = 0, pageSize = 1) => {
    try {
        const res = await axiosInstance.get(`/orders?page=${page}&pageSize=${pageSize}`);
        return res;
    } catch (err) {
        console.error(err);
    }
};

//주문 상세
export const getOrdersDetail = async (param) => {
    try {
        const res = await axiosInstance.get(`/orders/${param}`);
        return res;
    } catch (err) {
        console.error(err);
    }
};



