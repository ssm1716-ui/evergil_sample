import Button from '@/components/common/Button/Button';

const ChangePhone = ({ onBack }) => (
  <div className="col-xxl-10 col-lg-9 md-ps-15px">
    <div className="col-12 col-xl-12 col-lg-12 text-start position-relative page-title-extra-large text-decoration-line-bottom mb-3">
      <h1 className="fw-600 text-dark-gray mb-10px">핸드폰 변경</h1>
    </div>

    <div className="row row-cols-1 row-cols-lg-2 row-cols-md-1 justify-content-center">
      <div className="col">
        <div className="row pt-5 text-center  d-flex align-items-baseline">
          <label className="text-dark-gray mb-10px fw-500 d-block text-start">
            휴대폰 번호 변경
          </label>
          <div className="row d-flex align-items-baseline justify-content-between">
            <input
              className="mb-20px bg-very-light-white form-control required w-75"
              type="password"
              name="password"
              placeholder="휴대폰 번호"
            />
            <Button
              size="large"
              radiusOn="radius-on"
              className="btn btn-large w-20 d-block"
            >
              인증 하기
            </Button>
            <input
              className="mb-20px bg-very-light-white form-control required w-100"
              type="password"
              name="password"
              placeholder="인증번호"
            />
            <input type="hidden" name="redirect" value="" />
          </div>

          <div className="col-12 text-center">
            <Button
              type="submit"
              size="extra-large"
              radiusOn="radius-on"
              className="btn-large submit w-50 mt-60px mb-20px d-block"
            >
              확인
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ChangePhone;
