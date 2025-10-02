import axiosInstance from "@/api/axiosInstance";

//이니시스 주문 폼 생서 요청
export const postInicisPaymentForm = async (param) => {
  try {
    const res = await axiosInstance.post("/inicis/payment.form", param);
    return res;
  } catch (err) {
    console.error(err);
    return err.response ? err.response : { status: 500, data: "Unknown error" };
  }
};

//이니시스 지불 결과 전송
export const postInicisPaymentResult = async (param) => {
  try {
    const res = await axiosInstance.get(`/inicis/payment.result?key=${param}`);
    return res;
  } catch (err) {
    console.error(err);
  }
};
