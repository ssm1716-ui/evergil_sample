export const removeHyphens = (input) => {
    if (typeof input !== 'string') {
        throw new Error('Input must be a string');
    }

    return input.replace(/-/g, '');
};

//숫자와 하이픈만 허용
export const formatPhoneNumberInput = (value) => {
    return value.replace(/[^\d-]/g, '');
};

//단위 콤마
export const formatNumber = (number, locale = 'ko-KR') => {
    if (typeof number !== 'number') return '0';
    return new Intl.NumberFormat(locale).format(number);
};


export const formatDate = (dateString) => {
    if (!dateString) return ''; // dateString이 없을 경우 빈 문자열 반환
    return dateString.split(' ')[0]; // 공백을 기준으로 앞 부분(YYYY-MM-DD)만 반환
};

export const getFileType = (fileType) => {
    return fileType.replace('image/', '');
};


export const getTransformedCartData = (storedCart) => {
    let transformedData;
    if (storedCart.length > 0) {
        transformedData = {
            items: storedCart.map((item) => ({
                productId: item.productId,
                quantity: String(item.quantity),
            })),
        };
    }
    return transformedData;
};


//QR URL 마지막 path 가져오기
export const getLastPathSegment = (url) => {
    if (!url || typeof url !== 'string') return null;
    try {
        const parsed = new URL(url.startsWith('http') ? url : `https://${url}`);
        const segments = parsed.pathname.split('/').filter(Boolean);
        return segments.length > 0 ? segments.pop() : null;
    } catch {
        return null;
    }
};

// -를 .로 변경
export const formatDateRelace = (dateString) => {
    if (!dateString || typeof dateString !== 'string') return '';
    return dateString.replace(/-/g, '.');
};