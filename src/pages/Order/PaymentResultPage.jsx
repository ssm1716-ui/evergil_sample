// PaymentResultProxy.tsx (React)

import { useEffect } from 'react';

export default function PaymentResultProxy() {
  useEffect(() => {
    // form으로 전달된 데이터를 그대로 전송
    const form = document.forms[0];
    const formData = new FormData(form);
    const data = new URLSearchParams();

    for (let [key, value] of formData.entries()) {
      data.append(key, value);
    }

    console.log(form);
    console.log(formData);
    console.log(data);
    return;

    fetch('https://dev-api.everlink.kr/api/payment/result-proxy', {
      method: 'POST',
      body: data,
    }).then(() => {
      window.location.href = '/payment/success'; // 성공 페이지
    });
  }, []);

  return <div>결제 결과 처리 중입니다...</div>;
}
