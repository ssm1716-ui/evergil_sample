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

//구매확정
export const putOrdersPurchasesConfirm = async (param) => {
    try {
        const res = await axiosInstance.put(`/orders/${param}/purchases.confirm`);
        return res;
    } catch (err) {
        console.error(err);
    }
};

//반품신청
export const postOrdersRefundRequest = async (param) => {
    try {
        const res = await axiosInstance.post(`/orders/${param}/refund.request`);
        return res;
    } catch (err) {
        console.error(err);
    }
};


//교환신청
export const postOrdersExchangeRequest = async (id, param) => {
    try {
        const res = await axiosInstance.post(`/orders/${id}/exchange.request?buyerExchangeReason=${param.buyerExchangeReason}&sellerExchangeReason=${param.sellerExchangeReason}&exchangeRequestDetails=${param.exchangeRequestDetails}`);
        return res;
    } catch (err) {
        console.error(err);
    }
};




