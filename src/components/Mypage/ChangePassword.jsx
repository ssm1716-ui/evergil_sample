import Button from '@/components/common/Button/Button';

const ChangePassword = ({ onBack }) => (
  <div className="col-xxl-10 col-lg-9 md-ps-15px md-mb-60px">
    <div className="col-12 col-xl-12 col-lg-12 text-start position-relative page-title-extra-large text-decoration-line-bottom mb-3">
      <h1 className="fw-600 text-dark-gray mb-10px">비밀번호 변경</h1>
    </div>

    <div className="row row-cols-1 row-cols-lg-2 row-cols-md-1 justify-content-center">
      <div className="col">
        <div className="row pt-5 text-center">
          <form>
            <label className="text-dark-gray mb-10px fw-500 d-block text-start">
              기존 비밀번호
            </label>
            <input
              className="mb-5px bg-very-light-white form-control required w-100"
              type="password"
              name="password"
              placeholder="기존 비밀번호를 입력하세요"
            />

            <label className="text-dark-gray mb-10px fw-500 d-block text-start">
              새로운 비밀번호
            </label>
            <input
              className="mb-5px bg-very-light-white form-control required w-100"
              type="password"
              name="newPassword"
              placeholder="비밀번호 영문,숫자,특수문자 포함 8자 이상 입력해 주세요."
            />

            <label className="text-dark-gray mb-10px fw-500 d-block text-start">
              새로운 비밀번호 확인
            </label>
            <input
              className="mb-5px bg-very-light-white form-control required w-100"
              type="password"
              name="newPasswordConfrim"
              placeholder="비밀번호 영문,숫자,특수문자 포함 8자 이상 입력해 주세요."
            />

            <div className="col-12 text-center">
              <Button
                type="submit"
                size="extra-large"
                radiusOn="radius-on"
                className="btn-large submit w-50 mt-60px mb-5px d-block"
              >
                비밀번호 변경 완료
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
);

export default ChangePassword;
