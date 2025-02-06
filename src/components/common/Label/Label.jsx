const Label = ({ htmlFor, text, required = false, className = '', icon }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-dark-gray font-medium ${className}`}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {/* 아이콘이 있을 경우 추가 */}
      {text}
      {required && <span className="text-red-500 ml-1">*</span>}
      {/* 필수 표시 */}
    </label>
  );
};

export default Label;
