import { Link, useLocation } from 'react-router-dom';

import Button from '@/components/common/Button/Button';
import CartImage1 from '@/assets/images/sample/cart-image1.jpg';
import PaymentDue from '@/components/Order/PaymentDue';
import OrderEmptyComponents from '@/components/Order/OrderEmptyComponents';
import OrderListComponents from '@/components/Order/OrderListComponents';

import { useState } from 'react';

const CheckOutPage = () => {
  const [order, setOrder] = useState(true);

  return (
    <>
      <section className="pt-15">
        <div className="container">
          <h6 className="mb-1 fs-40 fw-400 pb-1 border-bottom border-2 border-black text-center text-black">
            주문/결제
          </h6>
          {!order ? <OrderEmptyComponents /> : <OrderListComponents />}
        </div>
      </section>

      <section className="pt-1 pb-0">
        <div className="container pt-4 border-top border-2 border-black">
          <h6 className="fs-40 fw-400 ps-5 border-black text-start text-black m-0">
            배송지 정보
          </h6>
          <div className="row row-cols-1 row-cols-lg-2 row-cols-md-1 g-0 justify-content-center">
            <div className="col contact-form-style-04">
              <div className="text-center">
                <form className="mt-50px">
                  <div className="row d-flex align-items-baseline justify-content-end">
                    <label className="text-dark-gray mb-10px fw-500 text-start w-25"></label>
                    <Button
                      size="large"
                      radiusOn="radius-on"
                      color="black"
                      className="btn w-25 mb-20px d-block"
                    >
                      배송지 변경
                    </Button>
                  </div>
                  <div className="row d-flex align-items-baseline">
                    <label className="text-dark-gray mb-10px fw-500 text-start w-25">
                      이름<span className="text-red">*</span>
                    </label>
                    <input
                      className="mb-20px bg-very-light-white form-control flex-1 required"
                      type="text"
                      name="loginEmail"
                      placeholder=""
                    />
                  </div>
                  <div className="row d-flex align-items-baseline">
                    <label className="text-dark-gray mb-10px fw-500 text-start w-25">
                      휴대폰<span className="text-red">*</span>
                    </label>
                    <input
                      className="mb-20px bg-very-light-white form-control flex-1 required"
                      type="text"
                      name="loginEmail"
                      placeholder=""
                    />
                  </div>
                  <div className="row d-flex align-items-baseline">
                    <label className="text-dark-gray mb-10px fw-500 text-start w-25">
                      배송주소<span className="text-red">*</span>
                    </label>
                    <input
                      className="mb-20px bg-very-light-white form-control flex-1 me-20px required "
                      type="text"
                      name="loginEmail"
                      placeholder=""
                    />
                    <Button
                      size="large"
                      radiusOn="radius-on"
                      color="black"
                      className="btn w-25 mb-20px d-block"
                    >
                      주소 찾기
                    </Button>
                  </div>
                  <div className="row d-flex align-items-baseline">
                    <label className="text-dark-gray mb-10px fw-500 text-start w-25"></label>
                    <input
                      className="mb-20px bg-very-light-white form-control flex-1 required"
                      type="text"
                      name="loginEmail"
                      placeholder=""
                    />
                  </div>
                  <div className="row d-flex align-items-baseline">
                    <label className="text-dark-gray mb-10px fw-500 text-start w-25"></label>
                    <input
                      className="mb-20px bg-very-light-white form-control flex-1 required"
                      type="text"
                      name="loginEmail"
                      placeholder=""
                    />
                  </div>
                  <div className="row d-flex align-items-baseline position-relative terms-condition-box text-start d-flex align-items-center">
                    <label className="text-dark-gray mb-10px fw-500 text-start w-25"></label>
                    <div className="position-relative terms-condition-box w-auto p-0">
                      <label>
                        <input
                          type="checkbox"
                          name="terms_condition"
                          id="terms_condition1"
                          value="1"
                          className="terms-condition check-box align-middle"
                        />
                        <span className="box fs-700 text-black">
                          기본 배송지로 저장
                        </span>
                        <a
                          className="accordion-toggle"
                          data-bs-toggle="collapse"
                          data-bs-parent="#accordion1"
                          href="#collapseThree"
                        ></a>
                      </label>
                    </div>
                  </div>

                  <div className="row d-flex align-items-baseline">
                    <label className="text-dark-gray mb-10px fw-500 text-start w-25">
                      배송메시지
                    </label>
                    <textarea
                      className="border-radius-10px mt-3 flex-1"
                      rows="5"
                      cols="5"
                    ></textarea>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container pt-8   border-top border-2 border-black">
          <div className="row row-cols-1 row-cols-lg-4 row-cols-sm-2 justify-content-center">
            <div className="col icon-with-text-style-07 transition-inner-all md-mb-30px ">
              <div
                className="bg-white feature-box h-100 justify-content-start  box-shadow-quadruple-large-hover text-center p-17 sm-p-14 border border-2 border-black border-radius-10px"
                role="button"
              >
                <div className="feature-box-icon mb-30px">
                  <i className="line-icon-Credit-Card2 icon-large text-dark-gray"></i>
                </div>
                <div className="feature-box-content">
                  <span className="d-inline-block fw-600 text-dark-gray fs-18">
                    신용카드
                  </span>

                  <a
                    href="#"
                    className="btn btn-link btn-hover-animation-switch btn-extra-large text-base-color fw-600 text-uppercase-inherit"
                  ></a>
                </div>
              </div>
            </div>
            <div className="col icon-with-text-style-07 transition-inner-all md-mb-30px">
              <div
                className="bg-white feature-box h-100 justify-content-start box-shadow-quadruple-large-hover text-center p-17 sm-p-14 border border-2 border-black border-radius-10px"
                role="button"
              >
                <div className="feature-box-icon mb-30px">
                  <i className="line-icon-Bank icon-large text-dark-gray"></i>
                </div>
                <div className="feature-box-content">
                  <span className="d-inline-block fw-600 text-dark-gray fs-18 ls-minus-05px">
                    계좌이체
                  </span>

                  <a
                    href="#"
                    className="btn btn-link btn-hover-animation-switch btn-extra-large text-base-color fw-600 text-uppercase-inherit"
                  ></a>
                </div>
              </div>
            </div>
            <div className="col icon-with-text-style-07 transition-inner-all xs-mb-30px">
              <div
                className="bg-white feature-box h-100 justify-content-start box-shadow-quadruple-large-hover text-center p-17 sm-p-14 border border-2 border-black border-radius-10px"
                role="button"
              >
                <div className="feature-box-icon mb-30px">
                  <i className="line-icon-Money-2 icon-large text-dark-gray"></i>
                </div>
                <div className="feature-box-content">
                  <span className="d-inline-block fw-600 text-dark-gray fs-18 ls-minus-05px">
                    무통장입금
                  </span>

                  <a
                    href="#"
                    className="btn btn-link btn-hover-animation-switch btn-extra-large text-base-color fw-600 text-uppercase-inherit"
                  ></a>
                </div>
              </div>
            </div>
            <div className="col icon-with-text-style-07 transition-inner-all">
              <div
                className="bg-white feature-box h-100 justify-content-start box-shadow-quadruple-large-hover text-center p-17 sm-p-14 border border-2 border-black border-radius-10px"
                role="button"
              >
                <div className="feature-box-icon mb-30px">
                  <i className="line-icon-Smartphone-3 icon-large text-dark-gray"></i>
                </div>
                <div className="feature-box-content">
                  <span className="d-inline-block fw-600 text-dark-gray fs-18 ls-minus-05px">
                    휴대폰결제
                  </span>

                  <a
                    href="#"
                    className="btn btn-link btn-hover-animation-switch btn-extra-large text-base-color fw-600 text-uppercase-inherit"
                  ></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {!order ? <></> : <PaymentDue />}
    </>
  );
};

export default CheckOutPage;
