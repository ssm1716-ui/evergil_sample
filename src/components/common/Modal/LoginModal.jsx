const LoginModal = ({ onClose }) => {
  const handleLogin = () => {
    // 로그인 후 새로고침
    window.location.reload();
  };

  return (
    <div className="modal">
      <p>비공개 계정입니다.</p>
      <button onClick={handleLogin}>로그인</button>
    </div>
  );
};

export default LoginModal;
