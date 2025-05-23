// 정규식을 사용한 이메일 유효성 검사
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// 정규식: 영문, 숫자, 특수문자 포함 8자 이상
export const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()[\]{};:'",.<>/?\\|`~\-_=+]).{8,}$/;
    return passwordRegex.test(password);
};

// 정규식: 한글 또는 영문, 길이 2~30자
export const isValidName = (name) => {
    const nameRegex = /^[가-힣a-zA-Z]{2,30}$/;
    return nameRegex.test(name);
};

// 정규식: 010으로 시작, 숫자 4자리, 숫자 4자리 (하이픈은 선택) - 총 11자리
export const isValidPhoneNumber = (phoneNumber) => {

    const phoneRegex = /^010[-]?\d{4}[-]?\d{4}$/;
    return phoneRegex.test(phoneNumber);
};

// 정수형 값 체크
export const isInteger = (value) => {
    return Number.isInteger(Number(value));
};