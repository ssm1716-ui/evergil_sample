import Compressor from 'compressorjs';

/**
 * 이미지 파일을 압축하는 유틸 함수
 * @param {File} file - 원본 이미지 파일
 * @param {Object} options - 압축 옵션
 * @returns {Promise<File>} - 압축된 파일 반환
 */
export const compressImage = (file, options = {}) => {
    const defaultOptions = {
        quality: 0.9,
        maxWidth: 800,
        maxHeight: 800,
        mimeType: 'image/webp',
        convertSize: Infinity,
    };

    return new Promise((resolve, reject) => {
        new Compressor(file, {
            ...defaultOptions,
            ...options,
            success: resolve,
            error: reject,
        });
    });
};