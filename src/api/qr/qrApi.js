import axiosInstance from '@/api/axiosInstance';

// QR key api

//상품 개별 리뷰 조회
export const getQrKeyVerify = async (key) => {

    try {
        const res = await axiosInstance.get(`/qr-keys.verify/${key}`);
        return res;
    } catch (err) {
        console.error(err);
    }
};