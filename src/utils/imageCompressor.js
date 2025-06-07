import Compressor from 'compressorjs';

/**
 * 이미지 파일을 압축하는 유틸 함수
 * @param {File} file - 원본 이미지 파일
 * @param {Object} options - 압축 옵션
 * @returns {Promise<File>} - 압축된 파일 반환
 */
export const compressImage = (file, options = {}) => {
    const defaultOptions = {
        quality: 1,
        maxWidth: 900,
        maxHeight: 1000,
        mimeType: 'image/jpeg',
        convertSize: Infinity,
        preserveHeaders: true,
        colorSpace: 'srgb',
        strict: true,
        checkOrientation: true,
        resize: 'contain'
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


export const compressAndPreviewImage = async (file) => {
    const compressedFile = await compressImage(file);
    const preview = URL.createObjectURL(compressedFile);
    return {
        originalFile: compressedFile,
        preview,
    };
};