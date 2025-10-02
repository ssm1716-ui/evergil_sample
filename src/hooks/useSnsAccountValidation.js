import { useState, useEffect } from 'react';

import { getMemberSettingSelect } from '@/api/member/settingApi.js';
import { postPasswordConfirm } from '@/api/member/personalApi.js';

const useSnsAccountValidation = (passwordInput = '') => {
    const [isSnsAccount, setIsSnsAccount] = useState(false);
    const [hasEmail, setHasEmail] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const validateAccount = async () => {
            setLoading(true);
            try {
                // SNS 계정 여부 체크 (getMemberSettingSelect)
                const resSetting = await getMemberSettingSelect();
                if (resSetting && resSetting.status === 200) {
                    const { data } = resSetting.data;
                    const sns = data.platform !== 'LOCAL'; // LOCAL이 아니면 SNS 계정
                    setIsSnsAccount(sns);

                    if (sns) {
                        // SNS 계정인 경우 계정 정보 확인 (postPasswordConfirm)
                        // SNS 계정은 비밀번호가 없을 수 있으므로 passwordInput에 빈 문자열("") 등을 전달
                        const resAccount = await postPasswordConfirm(passwordInput);
                        if (resAccount && resAccount.status === 200) {
                            const { data: accountInfo } = resAccount.data;
                            // accountInfo.maskedEmail 값이 없다면 이메일 입력 필요
                            setHasEmail(accountInfo.maskedEmail ? true : false);

                        } else {
                            // API 호출 실패 시 이메일 정보가 없다고 가정
                            setHasEmail(false);
                        }
                    }
                }
            } catch (err) {
                console.error('SNS 계정 검증 중 오류 발생:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        validateAccount();
    }, [passwordInput]);

    return { isSnsAccount, hasEmail, loading, error };
};

export default useSnsAccountValidation;
