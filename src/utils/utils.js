export const removeHyphens = (input) => {
    if (typeof input !== 'string') {
        throw new Error('Input must be a string');
    }

    return input.replace(/-/g, '');
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
