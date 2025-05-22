import axiosInstance from '@/api/axiosInstance';

//주문 API

//주문 리스트
export const getOrdersList = async (param = {}, page = 0, pageSize = 10) => {
    try {

        // 기본 페이지 정보 포함한 쿼리 파라미터 객체 생성
        const queryParams = new URLSearchParams({
            ...param,
            page,
            pageSize
        });
        const res = await axiosInstance.get(`/orders?${queryParams.toString()}`);
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

//결제 취소(카드결제 / 계좌이체 취소)
export const putOrdersPurchasesCancel = async (param) => {
    try {
        const res = await axiosInstance.put(`/orders/${param}/purchases.cancel`);
        return res;
    } catch (err) {
        const message =
            err.response?.data?.message || '알 수 없는 오류가 발생했습니다.';
        alert(`[결제취소 실패] ${message}`);
        // 또는 throw 해서 상위에서 처리하도록 할 수도 있음
        throw err;
    }
};

//결제 취소(가상계좌 환불 신청)
export const putOrdersVbankCancel = async (param) => {
    try {
        const res = await axiosInstance.put(`/orders/${param}/vbank.cancel`);
        return res;
    } catch (err) {
        const message =
            err.response?.data?.message || '알 수 없는 오류가 발생했습니다.';
        alert(`[결제취소 실패] ${message}`);
        // 또는 throw 해서 상위에서 처리하도록 할 수도 있음
        throw err;
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




