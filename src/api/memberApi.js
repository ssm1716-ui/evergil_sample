import axiosInstance from './axiosInstance';

//회원가입
export const postSignUp = async (param) => {
    try {
        const res = await axiosInstance.post('/sign-up', param);
        const emailVerificationCode = res.headers['x-email-verification-code'];
        localStorage.setItem('dev_emailVerificationCode', emailVerificationCode);
        return res.status;
    } catch (err) {
        console.error(err);
    }
};

//로그인
export const postSignIn = async (param) => {
    try {
        const res = await axiosInstance.post('/authenticate', param);
        const newAccessToken = res.headers['authorization'];


        if (newAccessToken) {
            // Axios 기본 헤더에 Authorization 설정/ 상태관리 / 로컬스토리지 설정
            axiosInstance.defaults.headers.common['Authorization'] = newAccessToken;
            // localStorage.setItem('dev_accessToken', newAccessToken);

            console.log('Authorization Header Set:', newAccessToken);
        }

        return { status: res.status, token: newAccessToken };
    } catch (err) {
        console.error(err);
        return { 
            status: err.response?.status || err.status, 
            message: err.response?.data?.message || err.response?.data || '로그인에 실패했습니다.'
        };
    }
};

//로그아웃
export const signLogout = async (param) => {
    try {
        localStorage.removeItem('dev_accessToken'); // Access Token 삭제
        delete axiosInstance.defaults.headers.common['Authorization']; // Axios 헤더 초기화
        console.log('User logged out');
    } catch (err) {
        console.error(err);
    }
};

//회원가입 후 이메일 인증코드로 계정 활성화
export const getVerificationCodeVerify = async (param) => {
    try {
        const res = await axiosInstance.get('/verification-codes.verify', {
            params: {
                code: param,
            },
        });

        console.log(res);
        localStorage.removeItem('dev_emailVerificationCode'); // emailVerificationCode 삭제
        return res.status;
    } catch (err) {
        console.error(err);
    }
};

//사용가능한 이메일인지 체크
export const getVerificationEmailVerify = async (param) => {
    try {
        const res = await axiosInstance.get('/verification-email.verify', {
            params: {
                email: param,
            },
        });

        return res;
    } catch (err) {
        console.error(err);
        return err.response ? err.response : { status: 500, data: 'Unknown error' };
    }
};

//이메일 인증코드 재발송 요청
export const getVerificationEmailResend = async (param) => {
    try {

        const emailVerificationCode = localStorage.getItem('dev_emailVerificationCode');
        const res = await axiosInstance.post('/verification-emails.resend', param, {
            headers:
                { 'X-Email-Verification-Code': emailVerificationCode }
        });

        return res.status;
    } catch (err) {
        console.error(err);
    }
};

//토큰 요청 -> localStorage 토큰 저장
export const getAccessToken = async () => {
    try {
        const res = await axiosInstance.get('/api/access-tokens.refresh');

        console.log(res);

        const newAccessToken = res.headers['authorization'];


        if (newAccessToken) {
            // Axios 기본 헤더에 Authorization 설정/ 상태관리 / 로컬스토리지 설정
            axiosInstance.defaults.headers.common['Authorization'] = newAccessToken;
            // localStorage.setItem('dev_accessToken', newAccessToken);

            console.log('Authorization Header Set:', newAccessToken);
        }

        return { status: res.status, token: newAccessToken };
    } catch (err) {
        console.error(err);
    }
};


//장바구니 상품 불러오기
export const getCart = () => {
    const storedCart = JSON.parse(localStorage.getItem('dev_cart')) || [];
    return storedCart;
};


//장바구니 추가시 로컬스토리지 저장
export const addCart = (newProduct) => {
    try {


        const product = convertProductForStorage(newProduct);
        const storedCart = JSON.parse(localStorage.getItem('dev_cart')) || []; // 기존 장바구니 불러오기

        const existingIndex = storedCart.findIndex(
            (item) => item.productId === product.productId
        ); // 2같은 productId가 있는지 확인

        if (existingIndex !== -1) {
            // 같은 상품이 존재하면 수량 합산
            storedCart[existingIndex].quantity += product.quantity;
        } else {
            // 새로운 상품이면 추가
            storedCart.push(product);
        }

        localStorage.setItem('dev_cart', JSON.stringify(storedCart));


    } catch (err) {
        console.error(err);
    }
};

//장바구니 수정후 로컬스토리지 저장
export const modifyCart = (products) => {
    try {

        const cartData = JSON.parse(localStorage.getItem('dev_cart')) || [];

        products.map((product, index) => {
            cartData[index] = { ...product, quantity: product.quantity };
        });

        localStorage.setItem('dev_cart', JSON.stringify(cartData));

    } catch (err) {
        console.error(err);
    }
};

//장바구니 삭제후 로컬스토리지 저장
export const removeCart = (products) => {
    try {

        localStorage.removeItem('dev_cart');
        localStorage.setItem('dev_cart', JSON.stringify(products));

    } catch (err) {
        console.error(err);
    }
};

//장바구니 로컬스토리지 삭제
export const removeLocalStorageCart = () => {
    try {

        localStorage.removeItem('dev_cart');

    } catch (err) {
        console.error(err);
    }

};

const convertProductForStorage = (product) => {
    return {
        ...product,
        productImage: Array.isArray(product.productImages)
            ? product.productImages[0] || '' // 첫 번째 이미지 또는 빈 문자열
            : product.productImages, // 이미 문자열이면 그대로
    };
};