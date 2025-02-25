import axiosInstance from './axiosInstance';

export const postRequestPresignedUrl = async () => {
    try {
        const res = await axiosInstance.post('/request-presigned-url', {
            mediaType: 'png'
        });
        return res;
    } catch (err) {
        console.error(err);
    }
};

