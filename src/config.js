
// export const API_BASE_URL = import.meta.env.local.VITE_API_BASE_URL;
export const API_BASE_URL = import.meta.env.VITE_API_URL;


// fetch(`https://dev-api.everlink.kr/backoffice/members/${'80ffaecf-90d8-43e6-a9c4-a833311d8a42'}`)
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(error => console.error('API 호출 실패:', error));


// // 전송할 데이터 객체
// const requestData = {
//     keyword: '',
//     page: 1,
//     pageSize: 10
// };

// // POST 요청 보내기
// fetch('https://dev-api.everlink.kr/backoffice/members', {
//     method: 'POST', // POST 요청 설정
//     headers: {
//         'Content-Type': 'application/json' // JSON 형식 명시
//     },
//     body: JSON.stringify(requestData) // 객체 데이터를 JSON 문자열로 변환
// })
//     .then((response) => {
//         if (!response.ok) {
//             throw new Error(`HTTP 오류! 상태: ${response.status}`);
//         }
//         return response.json(); // JSON 형태로 응답 받기
//     })
//     .then((data) => {
//         console.log('응답 데이터:', data);
//     })
//     .catch((error) => {
//         console.error('API 호출 실패:', error);
//     });