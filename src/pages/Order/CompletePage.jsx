import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import Button from '@/components/common/Button/Button';
import { postInicisPaymentResult } from '@/api/payment/paymentApi';
import { formatNumber } from '@/utils/utils';
import useCopyToClipboard from '@/hooks/useCopyToClipboard';

const CompletePage = () => {
  const [paymentResult, setPaymentResult] = useState({});
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [vbankData, setVbankData] = useState({});
  const key = searchParams.get('key'); // ✅ URL에서 key 값 가져오기
  const copyToClipboard = useCopyToClipboard();

  useEffect(() => {
    if (!key) {
      navigate(
        `/error?desc=${'접근 할 수 없는 페이지 입니다.'}&pageUrl=${'/checkout'}`
      );
      return;
    }

    const fetcInicisPaymentResult = async () => {
      try {
        const { status, data } = await postInicisPaymentResult(key);

        if (status !== 200) {
          navigate(
            `/error?desc=${'결제 처리시 에러가 발생하였습니다.'}&pageUrl=${'/checkout'}`
          );
          return;
        }
        setPaymentResult(data.data);

        if (data.data.paymentType === 'VBANK') {
          setVbankData(data.data.vBankData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetcInicisPaymentResult();
  }, []);

  return (
    <>
      <section className="top-space-margin big-section">
        <div
          className="container"
          data-anime='{ "el": "childs", "translateY": [-15, 0], "opacity": [0,1], "duration": 300, "delay": 0, "staggervalue": 200, "easing": "easeOutQuad" }'
        >
          <div className="row align-items-center justify-content-center">
            <div className="col-12 col-xl-8 col-lg-10 text-center position-relative page-title-extra-large">
              <h6 className="fw-600 text-dark-gray mb-10px">
                주문이 정상적으로 완료되었습니다.
              </h6>
              <h6 className="mb-2 fs-26 md-fs-18 fw-400 pb-1 text-center text-black">
                주문번호 :
                <span className="ms-10px text-base-color text-keep-all">
                  {paymentResult.orderNumber}
                </span>
              </h6>
            </div>
            <div className="col-12 breadcrumb breadcrumb-style-01 d-flex justify-content-center me-15px xs-mb-15px">
              <Link
                to={`/mypage/order-detail?orderNumber=${paymentResult.orderNumber}`}
              >
                <Button
                  size="large"
                  color="black"
                  radiusOn="radius-on"
                  className="btn btn-white border-1 border-color-light-gray  d-table d-lg-inline-block lg-mb-15px me-10px"
                >
                  주문 상세보기
                </Button>
              </Link>
              <Link to="/profile">
                <Button
                  size="large"
                  radiusOn="radius-on"
                  className="btn btn-base-color d-table d-lg-inline-block lg-mb-15px"
                >
                  My Profiles
                </Button>
              </Link>
            </div>
          </div>

          {paymentResult.paymentType === 'VBANK' && (
            <div className="col pt-3">
              <div className="bg-very-light-gray border-radius-6px p-20px lg-p-25px your-order-box">
                <span className="fs-26 fw-600 text-dark-gray mb-5px d-block text-center py-3">
                  <span className="text-base-color">{vbankData.expiresAt}</span>
                  까지 입금을 완료해주세요.
                </span>

                <div className="p-40px bg-white border-radius-6px box-shadow-large mt-10px mb-30px sm-mb-25px checkout-accordion">
                  <div className="w-100" id="accordion-style-05">
                    <div className="row pb-1 border-bottom border-1 border-black fs-20">
                      <label className="col-6 mb-5px">
                        <span className="d-inline-block text-dark-gray">
                          입금 금액
                        </span>
                      </label>
                      <h6 className="col-6 mb-0 fs-20 text-end text-base-color">
                        {formatNumber(vbankData.amount)}원
                      </h6>
                    </div>
                    <div className="row pt-1 fs-20">
                      <label className="col-6 mb-5px">
                        <span className="d-inline-block text-dark-gray">
                          가상 계좌 정보
                        </span>
                      </label>
                      <h6 className="col-6 mb-0 fs-20 text-dark-gray text-end text-decoration-underline link-offset-1">
                        {vbankData.bankName} {vbankData.accountNumber}
                        <i
                          className="feather icon-feather-copy icon-small text-dark-gray ps-2"
                          role="button"
                          onClick={() =>
                            copyToClipboard(vbankData.accountNumber)
                          }
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
          )}
        </div>
      </section>

      {/* <section className="p-0">
          <div
            className="container"
            data-anime='{ "el": "childs", "translateY": [-15, 0], "opacity": [0,1], "duration": 300, "delay": 0, "staggervalue": 200, "easing": "easeOutQuad" }'
          >
            <div className="col-12">
              <table className="table cart-products">
                <tbody>
                  <tr>
                    <td className="product-thumbnail border-0">
                      <img
                        className="cart-product-image"
                        src={CartImage1}
                        alt=""
                      />
                    </td>
                    <td className="product-name border-0 fw-600 text-black ps-2">
                      <span className="row">Textured sweater</span>
                      <span className="row">80,000원</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section> */}

      <section className="p-0">
        <div
          className="container text-decoration-line-bottom"
          data-anime='{ "el": "childs", "translateY": [-15, 0], "opacity": [0,1], "duration": 300, "delay": 0, "staggervalue": 200, "easing": "easeOutQuad" }'
        >
          <h6 className="fs-40 fw-400 border-black text-start text-black m-0">
            배송지
          </h6>
          <div className="row row-cols-1 row-cols-lg-1 row-cols-md-1 g-0 justify-content-start pt-3">
            <div className="col contact-form-style-04">
              <div className="text-center">
                <div className="row d-flex align-items-baseline">
                  <label className="mb-10px fw-500 text-start w-15 sm-w-40">
                    받는분
                  </label>
                  <span className="text-black flex-1 text-start">
                    {paymentResult.recipient}
                  </span>
                </div>
                <div className="row ">
                  <label className="mb-10px fw-500 text-start w-15 sm-w-40">
                    주소
                  </label>
                  <span className="text-black flex-1 text-start">
                    {paymentResult.recipientZipcode}
                    {paymentResult.recipientAddress1}
                    {paymentResult.recipientAddress2}
                  </span>
                </div>
                <div className="row d-flex align-items-baseline">
                  <label className="mb-10px fw-500 text-start w-15 sm-w-40">
                    배송 메시지
                  </label>
                  <span className="text-black flex-1 text-start">
                    {paymentResult.deliveryMessage}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div
          className="container text-decoration-line-bottom"
          data-anime='{ "el": "childs", "translateY": [-15, 0], "opacity": [0,1], "duration": 300, "delay": 0, "staggervalue": 200, "easing": "easeOutQuad" }'
        >
          <h6 className="fs-40 fw-400 border-black text-start text-black m-0">
            최종 결제 정보
          </h6>
          <div className="row row-cols-1 row-cols-lg-2 row-cols-md-1 g-0 justify-content-start pt-3">
            <div className="col w-100">
              <div className="text-center">
                <div className="row d-flex align-items-baseline">
                  <label className="mb-10px fw-500 text-start w-15 sm-w-40">
                    상품 합계
                  </label>
                  <span className="flex-1 text-black text-end">
                    {formatNumber(paymentResult.totalPrice)}원
                  </span>
                </div>
                <div className="row d-flex align-items-baseline">
                  <label className="mb-10px fw-500 text-start w-15 sm-w-40">
                    배송비
                  </label>
                  <span className="flex-1 text-black text-end">
                    {formatNumber(paymentResult.totalDeliveryFee)}원
                  </span>
                </div>
                {/* <div className="row d-flex align-items-baseline">
                  <label className="mb-10px fw-500 text-start w-15 sm-w-40">
                    할인 합계
                  </label>
                  <span className="flex-1 text-black text-end">0원</span>
                </div> */}
                <div className="row d-flex align-items-baseline">
                  <label className="mb-10px fw-500 text-start w-15 sm-w-40 fw-600 text-black">
                    결제 금액
                  </label>
                  <span className="flex-1 text-end text-base-color">
                    {formatNumber(
                      paymentResult.totalPrice + paymentResult.totalDeliveryFee
                    )}
                    원
                  </span>
                </div>
                <div className="row d-flex align-items-baseline">
                  <label className="mb-10px fw-500 text-start w-15 sm-w-40">
                    결제 수단
                  </label>
                  <span className="flex-1 text-black text-end text-black fw-600">
                    {paymentResult.bankName}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CompletePage;
