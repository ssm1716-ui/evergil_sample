import { useCallback } from 'react';

const useCopyToClipboard = () => {
    const copy = useCallback((text) => {
        if (!navigator.clipboard) {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        } else {
            navigator.clipboard.writeText(text).then(() => {
                alert('복사되었습니다.');
            });
        }
    }, []);

    return copy;
};

export default useCopyToClipboard;
