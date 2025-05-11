import axiosInstance from '@/api/axiosInstance';

//약관 조회 
//service - 이용 약관
//personal - 개인정보수집,이용동의
//advertisement - 광고성 정보 수신 동의
export const getPolicySelected = async (param) => {
    try {
        const res = await axiosInstance.get(`/policy/${param}`);
        return res;
    } catch (err) {
        console.error(err);
    }
};



