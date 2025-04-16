import { Link } from 'react-router-dom';
import Button from '@/components/common/Button/Button';
import Label from '@/components/common/Label/Label';
import CartImage1 from '@/assets/images/sample/cart-image1.jpg';

import ShopDetailImage3 from '@/assets/images/shop-detail-image3.png';

const MyPage = () => {
  return (
    <>
      <div className="col-xxl-10 col-lg-9 md-ps-15px">
        <div className="col-12 col-xl-12 col-lg-12 text-start position-relative page-title-extra-large text-decoration-line-bottom mb-3">
          <h6 className="fw-600 text-dark-gray mb-10px">주문/배송내역</h6>
        </div>
        <section className="pt-1 pb-1">
          <div>
            <div
              className="col-12"
              // data-anime='{ "el": "childs", "translateY": [15, 0], "opacity": [0,1], "duration": 800, "delay": 200, "staggervalue": 300, "easing": "easeOutQuad" }'
            >
              <div className="row mx-0 border-bottom border-2 border-color-dark-gray pb-50px mb-50px sm-pb-35px sm-mb-35px align-items-center d-block d-md-flex w-100 align-items-center position-relative">
                <div className="col-md-1 text-center text-lx-start text-md-start md-mb-15px">
                  <div className="w-300px md-w-250px sm-mb-10px">
                    <img src={ShopDetailImage3} className="w-120px" alt="" />
                  </div>
                </div>
                <div className="col-md-4 offset-0 offset-md-1 icon-with-text-style-01 md-mb-25px">
                  <div className="feature-box feature-box-left-icon-middle last-paragraph-no-margin text-center text-md-start">
                    <div className="feature-box-content ps-0 md-ps-25px sm-ps-0">
                      <span className="d-inline-block text-dark-gray mb-5px fs-20 ls-minus-05px">
                        QR Code
                      </span>
                      <p className="text-dark-gray mb-5px fs-20 ls-minus-05px">
                        80,000원
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 text-center text-md-end">
                  <div>
                    <Link
                      to="/mypage/exchage"
                      className="btn btn-white order-btn btn-large btn-switch-text border w-40 me-2 mt-2"
                    >
                      <span>
                        <span className="btn-double-text" data-text="교환">
                          교환
                        </span>
                      </span>
                    </Link>
                    <Link
                      to="/mypage/return"
                      className="btn btn-white order-btn btn-large btn-switch-text border w-40 me-2 mt-2"
                    >
                      <span>
                        <span className="btn-double-text" data-text="환불">
                          환불
                        </span>
                      </span>
                    </Link>
                  </div>

                  <div>
                    <a
                      href="#"
                      className="btn btn-white order-btn btn-large btn-switch-text border w-40 me-2 mt-2"
                    >
                      <span>
                        <span className="btn-double-text" data-text="배송조회">
                          배송조회
                        </span>
                      </span>
                    </a>
                    <a
                      href="#"
                      className="btn btn-white order-btn btn-large btn-switch-text border w-40 me-2 mt-2"
                    >
                      <span>
                        <span className="btn-double-text" data-text="구매확정">
                          구매확정
                        </span>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col pt-1">
              <div className="bg-very-light-gray border-radius-6px p-20px lg-p-25px your-order-box">
                <span className="fs-26 fw-600 text-dark-gray mb-5px d-block text-center py-3">
                  <span className="text-base-color">2024.12.06 23:59</span>
                  까지 입금을 완료해주세요.
                </span>

                <div className="p-40px lg-p-25px bg-white border-radius-6px box-shadow-large mt-10px mb-30px sm-mb-25px checkout-accordion">
                  <div className="w-100" id="accordion-style-05">
                    <div className="row pb-1 border-bottom fs-20">
                      <label className="col-6 mb-5px">
                        <span className="d-inline-block text-dark-gray">
                          입금 금액
                        </span>
                      </label>
                      <h6 className="col-6 mb-0 fs-20 text-end text-base-color">
                        80,000원
                      </h6>
                    </div>
                    <div className="row pt-1 fs-20">
                      <label className="col-6 mb-5px">
                        <span className="d-inline-block text-dark-gray">
                          가상 계좌 정보
                        </span>
                      </label>
                      <h6 className="col-6 mb-0 fs-20 text-dark-gray text-end text-decoration-underline link-offset-1">
                        신한은행 403123440444
                        <i
                          className="feather icon-feather-copy icon-small text-dark-gray ps-2"
                          role="button"
                        ></i>
                      </h6>
                    </div>
                    <div
                      id="style-5-collapse-1"
                      className="collapse show"
                      data-bs-parent="#accordion-style-05"
                    >
                      <div className="p-25px bg-very-light-gray mt-20px mb-20px fs-14 lh-24">
                        <ul className="mb-0">
                          <li>
                            입금이 완료되어야 주문이 확인되고 출고가 진행됩니다.
                          </li>

                          <li>
                            결제 금액은 1원 단위까지 정확히 입금해 주세요.
                          </li>
                          <li>
                            입금 전에 상품이 품절될 경우, 정해진 시간 내에
                            미입금 시 해당 주문은 자동으로 취소됩니다.
                          </li>
                          <li>
                            입금 후 확인까지 시간이 소요될 수 있으니 양해
                            부탁드립니다.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="p-0">
          <div className="pt-4  border-bottom border-2 border-black">
            <h6 className="fs-27 md-fs-29 fw-400 border-black text-start text-black m-0">
              배송지
            </h6>
            <div className="row row-cols-1 row-cols-lg-2 row-cols-md-1 g-0 justify-content-start pt-3">
              <div className="col contact-form-style-04">
                <div className="text-center">
                  <div className="row d-flex align-items-baseline">
                    <label className="mb-10px fw-500 text-start w-25">
                      받는분
                    </label>
                    <span className="text-black flex-1 text-start">손성민</span>
                  </div>
                  <div className="row d-flex align-items-baseline">
                    <label className="mb-10px fw-500 text-start w-25">
                      주소
                    </label>
                    <span className="text-black flex-1 text-start">
                      경기도 시흥시 비둘기공원 7길 10
                    </span>
                  </div>
                  <div className="row d-flex align-items-baseline">
                    <label className="mb-10px fw-500 text-start w-25">
                      배송 메시지
                    </label>
                    <span className="text-black flex-1 text-start">
                      문앞에 두고 가주세요.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="p-0">
          <div className="pt-4 mb-4 border-bottom border-2 border-black">
            <h6 className="fs-27 md-fs-29 fw-400 border-black text-start text-black m-0">
              최종 결제 정보
            </h6>
            <div className="row row-cols-1 row-cols-lg-2 row-cols-md-1 g-0 justify-content-start pt-3">
              <div className="col w-100">
                <div className="text-center">
                  <div className="row d-flex align-items-baseline">
                    <label className="mb-10px fw-500 text-start w-25">
                      상품 합계
                    </label>
                    <span className="flex-1 text-black text-end">80,000원</span>
                  </div>
                  <div className="row d-flex align-items-baseline">
                    <label className="mb-10px fw-500 text-start w-25">
                      배송비
                    </label>
                    <span className="flex-1 text-black text-end">3,000원</span>
                  </div>
                  <div className="row d-flex align-items-baseline">
                    <label className="mb-10px fw-500 text-start w-25">
                      할인 합계
                    </label>
                    <span className="flex-1 text-black text-end">0원</span>
                  </div>
                  <div className="row d-flex align-items-baseline">
                    <label className="mb-10px fw-500 text-start w-25 fw-600 text-black">
                      결제 금액
                    </label>
                    <span className="flex-1 text-end text-base-color">
                      80,000원
                    </span>
                  </div>
                  <div className="row d-flex align-items-baseline">
                    <label className="mb-10px fw-500 text-start w-25">
                      결제 수단
                    </label>
                    <span className="flex-1 text-black text-end text-black fw-600">
                      신한카드(일시불)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default MyPage;
