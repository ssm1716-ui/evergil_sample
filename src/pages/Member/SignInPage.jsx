import Button from '@/components/common/Button/Button';
import { Link } from 'react-router-dom';

const SignInPage = () => {
  return (
    <section className="bg-base-default-color">
      <div className="container">
        <div className="row row-cols-1 row-cols-lg-2 row-cols-md-1 g-0 justify-content-center overflow-hidden">
          <div className="col contact-form-style-04">
            <div className="pt-15 text-center">
              <h3 className="fw-600 text-dark-gray mb-8 ls-minus-1px">
                로그인
              </h3>
              <form action="#" method="post">
                <label className="text-dark-gray mb-10px fw-500 d-block text-start">
                  이메일<span className="text-red">*</span>
                </label>
                <input
                  className="mb-20px bg-very-light-white form-control required"
                  type="text"
                  name="name"
                  placeholder="이메일을 입력 하세요"
                />
                <label className="text-dark-gray mb-10px fw-500 d-block text-start">
                  비밀번호<span className="text-red">*</span>
                </label>
                <input
                  className="mb-20px bg-very-light-white form-control required"
                  type="password"
                  name="password"
                  placeholder="비밀번호를 입력하세요"
                />
                <input type="hidden" name="redirect" value="" />

                <Button
                  type="submit"
                  size="extra-large"
                  radiusOn="radius-on"
                  className="btn-large submit w-80 mt-60px mb-20px d-block"
                >
                  로그인
                </Button>
                <div className="form-results mt-20px d-none"></div>
              </form>
              <div className="pt-15 text-center">
                <Link to="/signup">회원가입</Link>
                <span className="px-5">|</span>
                <Link to="/forgot">비밀번호찾기</Link>
              </div>
              <div className="pt-15 text-center">
                <Button
                  type="submit"
                  size="extra-large"
                  color="google"
                  className="btn-large w-80 mt-20px mb-10px d-block btn-box-shadow"
                >
                  구글로 시작하기
                </Button>
                <Button
                  type="submit"
                  size="extra-large"
                  color="kakao"
                  className="btn-large w-80 mt-20px mb-10px d-block btn-box-shadow"
                >
                  카카오로 시작하기
                </Button>
                <Button
                  type="submit"
                  size="extra-large"
                  color="naver"
                  className="btn-large  w-80 mt-20px mb-10px d-block btn-box-shadow"
                >
                  네이버로 시작하기
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignInPage;
