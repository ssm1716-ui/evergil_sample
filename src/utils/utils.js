export const removeHyphens = (input) => {
    if (typeof input !== 'string') {
        throw new Error('Input must be a string');
    }

    return input.replace(/-/g, '');
};


export const formatDate = (dateString) => {
    if (!dateString) return ''; // dateString이 없을 경우 빈 문자열 반환
    return dateString.split(' ')[0]; // 공백을 기준으로 앞 부분(YYYY-MM-DD)만 반환
};

export const getFileType = (fileType) => {
    return fileType.replace('image/', '');
};
