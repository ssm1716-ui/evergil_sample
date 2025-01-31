const Button = ({
  type = 'button', // 버튼 타입 (기본값: 'button')
  onClick, // 클릭 이벤트 핸들러
  children, // 버튼 내용 (텍스트 또는 JSX)
  className = '', // 추가 스타일 클래스
  disabled = false, // 비활성화 상태
  variant = 'default', // 버튼 스타일 변형 (default, primary, secondary 등)
  size = 'medium', // 버튼 크기 (very-small, small, medium, large, extra-large)
  color = 'base-color', // 버튼 색상(base, white, yellow, green)
  radiusOn, //border-radius 비활성화 상태
  ...props
}) => {
  return (
    <>
      <button
        type={type}
        className={`btn btn-${size} btn-${color} ${radiusOn} d-table d-lg-inline-block lg-mb-15px md-mx-auto ${className}`} // 동적 클래스 구성
        onClick={onClick}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
      {/* <div className="row row-cols-1 justify-content-center">
        <div className="col btn-dual text-center">
          <a
            href="#"
            className="btn btn-base-color btn-extra-large d-table d-lg-inline-block lg-mb-15px md-mx-auto"
          >
            Button Extra Large
          </a>
          <a
            href="#"
            className="btn btn-base-color btn-large d-table d-lg-inline-block lg-mb-15px md-mx-auto"
          >
            Button Large
          </a>
          <a
            href="#"
            className="btn btn-base-color btn-medium d-table d-lg-inline-block lg-mb-15px md-mx-auto"
          >
            Button Medium
          </a>
          <a
            href="#"
            className="btn btn-base-color btn-small d-table d-lg-inline-block lg-mb-15px md-mx-auto"
          >
            Button Small
          </a>
          <a
            href="#"
            className="btn btn-base-color btn-very-small d-table d-lg-inline-block lg-mb-15px md-mx-auto"
          >
            Very Small
          </a>
        </div>
      </div> */}
    </>
  );
};

export default Button;
