const RequestAccessModal = ({ profileId, onClose }) => {
  const handleRequest = async () => {
    try {
      // await requestProfileAccess(profileId); // ✅ 접근 요청 API 호출
      alert('요청이 완료되었습니다.');
      onClose();
    } catch (error) {
      console.error('요청 실패:', error);
    }
  };

  return (
    <div className="modal">
      <h2>비공개 계정 요청하기</h2>
      <input type="text" placeholder="이름 입력" />
      <textarea placeholder="요청 사유 입력"></textarea>
      <button onClick={handleRequest}>보내기</button>
    </div>
  );
};

export default RequestAccessModal;
