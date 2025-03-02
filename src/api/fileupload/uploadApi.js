import axiosInstance from '../axiosInstance';

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



export const putFileUpload = async (s3Url, files) => {
    try {
        const res = await axiosInstance.put(s3Url, files);
        console.log('s3 - ', res);
        return res;
    } catch (err) {
        console.error(err);
    }
};



