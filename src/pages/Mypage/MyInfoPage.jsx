import { Link } from 'react-router-dom';
import Button from '@/components/common/Button/Button';
import Label from '@/components/common/Label/Label';
import CartImage1 from '@/assets/images/sample/cart-image1.jpg';

const MyInfoPage = () => {
  return (
    <>
      <div className="col-xxl-10 col-lg-9 md-ps-15px md-mb-60px">
        <h6 className="mb-1 fs-40 fw-400 pb-2 border-bottom border-2 border-black text-start text-black">
          내 정보 변경
        </h6>

        <div className="row row-cols-1 row-cols-lg-2 row-cols-md-1 justify-content-center">
          <div className="col">
            <div className="row pt-5 text-center">
              <label className="text-dark-gray mb-10px fw-500 d-block text-start">
                비밀번호
              </label>
              <input
                className="mb-20px bg-very-light-white form-control required w-100"
                type="password"
                name="password"
                placeholder="비밀번호를 입력하세요"
              />
              <input type="hidden" name="redirect" value="" />

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

        {/* <section className="p-0">
          <div className="pt-1">
            <section className="p-0">
              <div className="ps-2">
                <div className="col-12">
                  <table className="table cart-products">
                    <tbody>
                      <tr className="pb-2">
                        <td className="product-name border-bottom-2 border-gray fw-600 text-black ps-2 w-20">
                          <h6 className="fs-36 m-0 fw-600 ls-minus-1px">
                            비밀번호
                          </h6>
                        </td>
                        <td></td>
                        <td className="product-name border-bottom-2 border-gray pe-2 text-end">
                          <Button
                            variant="primary"
                            color="profile"
                            size="xs-small"
                            className="fw-700"
                          >
                            변경
                          </Button>
                        </td>
                      </tr>

                      <tr>
                        <td className="product-name border-bottom-2 border-gray fw-600 text-black ps-2">
                          <h6 className="fs-36 m-0 fw-600 ls-minus-1px">
                            이름
                          </h6>
                        </td>
                        <td className="product-name border-bottom-2 border-gray fw-600 text-black ps-2">
                          <h6 className="fs-32 m-0 fw-500 ls-minus-1px text-gray">
                            손*민
                          </h6>
                        </td>
                        <td className="product-name border-bottom-2 border-gray pe-2 text-end">
                          <Button
                            variant="primary"
                            color="profile"
                            size="xs-small"
                            className="fw-700"
                          >
                            변경
                          </Button>
                        </td>
                      </tr>

                      <tr>
                        <td className="product-name border-bottom-2 border-gray fw-600 text-black ps-2">
                          <h6 className="fs-36 m-0 fw-600 ls-minus-1px">
                            휴대폰
                          </h6>
                        </td>
                        <td className="product-name border-bottom-2 border-gray fw-600 text-black ps-2">
                          <h6 className="fs-32 m-0 fw-500 ls-minus-1px text-gray">
                            010-****-0000
                          </h6>
                        </td>
                        <td className="product-name border-bottom-2 border-gray pe-2 text-end">
                          <Button
                            variant="primary"
                            color="profile"
                            size="xs-small"
                            className="fw-700"
                          >
                            변경
                          </Button>
                        </td>
                      </tr>

                      <tr>
                        <td className="product-name border-bottom-2 border-gray fw-600 text-black ps-2">
                          <h6 className="fs-36 m-0 fw-600 ls-minus-1px">
                            이메일
                          </h6>
                        </td>
                        <td className="product-name border-bottom-2 border-gray fw-600 text-black ps-2">
                          <h6 className="fs-32 m-0 fw-500 ls-minus-1px text-gray">
                            te**@****.com
                          </h6>
                        </td>
                        <td className="product-name border-bottom-2 border-gray pe-2 text-end">
                          <Button
                            variant="primary"
                            color="profile"
                            size="xs-small"
                            className="fw-700"
                          >
                            변경
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
        </section> */}
      </div>

      {/* 비밀번호 변경 화면 */}
      {/* <div className="col-xxl-10 col-lg-9 md-ps-15px md-mb-60px">
        <h6 className="mb-1 fs-40 fw-400 pb-2 border-bottom border-2 border-black text-start text-black">
          비밀번호 변경
        </h6>

        <div className="row row-cols-1 row-cols-lg-2 row-cols-md-1 justify-content-center">
          <div className="col">
            <div className="row pt-5 text-center">
              <label className="text-dark-gray mb-10px fw-500 d-block text-start">
                기존 비밀번호
              </label>
              <input
                className="mb-20px bg-very-light-white form-control required w-100"
                type="password"
                name="password"
                placeholder="비밀번호를 입력하세요"
              />
              <input type="hidden" name="redirect" value="" />

              <label className="text-dark-gray mb-10px fw-500 d-block text-start">
                새로운 비밀번호
              </label>
              <input
                className="mb-20px bg-very-light-white form-control required w-100"
                type="password"
                name="password"
                placeholder="비밀번호를 입력하세요"
              />
              <input type="hidden" name="redirect" value="" />

              <label className="text-dark-gray mb-10px fw-500 d-block text-start">
                새로운 비밀번호 확인
              </label>
              <input
                className="mb-20px bg-very-light-white form-control required w-100"
                type="password"
                name="password"
                placeholder="비밀번호를 입력하세요"
              />
              <input type="hidden" name="redirect" value="" />

              <div className="col-12 text-center">
                <Button
                  type="submit"
                  size="extra-large"
                  radiusOn="radius-on"
                  className="btn-large submit w-50 mt-60px mb-20px d-block"
                >
                  비밀번호 변경 완료
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* 이름 변경 화면 */}
      {/* <div className="col-xxl-10 col-lg-9 md-ps-15px md-mb-60px">
        <h6 className="mb-1 fs-40 fw-400 pb-2 border-bottom border-2 border-black text-start text-black">
          이름 변경
        </h6>

        <div className="row row-cols-1 row-cols-lg-2 row-cols-md-1 justify-content-center">
          <div className="col">
            <div className="row pt-5 text-center">
              <label className="text-dark-gray mb-10px fw-500 d-block text-start">
                이름 변경
              </label>
              <input
                className="mb-20px bg-very-light-white form-control required w-100"
                type="text"
                name="text"
                placeholder="이름을 입력하세요"
              />
              <input type="hidden" name="redirect" value="" />

              <div className="col-12 text-center">
                <Button
                  type="submit"
                  size="extra-large"
                  radiusOn="radius-on"
                  className="btn-large submit w-50 mt-60px mb-20px d-block"
                >
                  이름 변경 완료
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* 이메일 변경 화면 */}
      {/* <div className="col-xxl-10 col-lg-9 md-ps-15px md-mb-60px">
        <h6 className="mb-1 fs-40 fw-400 pb-2 border-bottom border-2 border-black text-start text-black">
          이메일 변경
        </h6>

        <div className="row row-cols-1 row-cols-lg-2 row-cols-md-1 justify-content-center">
          <div className="col">
            <div className="row pt-5 text-center  d-flex align-items-baseline">
              <label className="text-dark-gray mb-10px fw-500 d-block text-start">
                이메일 변경
              </label>
              <div className="row d-flex align-items-baseline justify-content-between">
                <input
                  className="mb-20px bg-very-light-white form-control required w-75"
                  type="password"
                  name="password"
                  placeholder="이메일"
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
      </div> */}

      {/*휴대폰 변경 화면 */}
      {/* <div className="col-xxl-10 col-lg-9 md-ps-15px md-mb-60px">
        <h6 className="mb-1 fs-40 fw-400 pb-2 border-bottom border-2 border-black text-start text-black">
          휴대폰 번호 변경
        </h6>

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
      </div> */}
    </>
  );
};

export default MyInfoPage;
