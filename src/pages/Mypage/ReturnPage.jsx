import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Button from '@/components/common/Button/Button';
import CartImage1 from '@/assets/images/sample/cart-image1.jpg';

import {
  getOrdersDetail,
  postOrdersRefundRequest,
} from '@/api/orders/ordersApi';
import { formatNumber } from '@/utils/utils';

const ReturnPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderNumber = searchParams.get('orderNumber'); // ✅ URL에서 key 값 가져오기
  const [product, setProduct] = useState({});
  const [refund, setRefund] = useState({
    buyerExchangeReason: '',
    sellerExchangeReason: '',
    exchangeRequestDetails: '',
  });

  useEffect(() => {
    if (!orderNumber) {
      navigate(
        `/error?desc=${'접근 할 수 없는 페이지 입니다.'}&pageUrl=${'/checkout'}`
      );
      return;
    }

    const fetchOrder = async () => {
      try {
        const { status, data } = await getOrdersDetail(orderNumber);
        console.log(data);

        if (status !== 200) {
          alert('통신 에러가 발생했습니다.');
          return;
        }
        const order = data.data;
        setProduct(order.product);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrder();
  }, []);

  const handleRefundChange = (e) => {
    const { name, value } = e.target;
    setRefund((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRefundRequest = async (e) => {
    e.preventDefault();
    const res = await postOrdersRefundRequest(orderNumber, refund);

    if (res.status !== 200) {
      alert('반품 신청시 문제가 발생했습니다.');
      return;
    }
    alert('반품 신청 되었습니다.');
  };

  return (
    <>
      <div className="col-xxl-10 col-lg-9 md-ps-15px">
        <div className="col-12 col-xl-12 col-lg-12 text-start position-relative page-title-extra-large text-decoration-line-bottom mb-3">
          <h6 className="fw-600 text-dark-gray mb-10px">반품 신청</h6>
        </div>
        <section className="p-0">
          <div className="pt-1 border-bottom border-2 border-gray">
            <section className="p-0">
              <div className="ps-2">
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
                          <span className="row">{product.productName}</span>
                          <span className="row">
                            {formatNumber(product.amount + product.deliveryFee)}
                            원
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
        </section>

        <section className="p-0">
          <div className="pt-4">
            <h6 className="fs-22 fw-600 border-black text-start text-black mb-1">
              반품 사유
            </h6>
            <div className="row row-cols-1 row-cols-lg-2 row-cols-md-1 g-0 justify-content-start pt-1 ps-1 mb-20px">
              <div className="col contact-form-style-04">
                <div className="text-center fs-18 md-fs-16">
                  <label className="text-dark-gray fw-500 d-block text-start">
                    구매자 책임 사유
                  </label>

                  <div className="select">
                    <select
                      className="form-control"
                      name="buyerExchangeReason" // ✅ name 설정
                      value={refund.buyerExchangeReason}
                      onChange={handleRefundChange}
                    >
                      <option value="">
                        구매자 책임 사유를 선택해 주세요.
                      </option>
                      <option value="단순변심">단순변심</option>
                      <option value="보관 중 파손 또는 오염">
                        보관 중 파손 또는 오염
                      </option>
                      <option value="주문 옵션 실수">주문 옵션 실수</option>
                      <option value="기타 사유">기타 사유</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="row row-cols-1 row-cols-lg-2 row-cols-md-1 g-0 justify-content-start pt-1 ps-1 mb-20px">
              <div className="col contact-form-style-04">
                <div className="text-center fs-18 md-fs-16">
                  <label className="text-dark-gray fw-500 d-block text-start">
                    판매자 책임 사유
                  </label>

                  <div className="select">
                    {/* refund.sellerExchangeReason  */}
                    <select
                      className="form-control"
                      name="sellerExchangeReason" // ✅ name 설정
                      value={refund.sellerExchangeReason}
                      onChange={handleRefundChange}
                    >
                      <option value="">
                        판매자 책임 사유를 선택해 주세요.
                      </option>
                      <option value="제품 하자">제품 하자</option>
                      <option value="배송 중 파손된 제품 수령">
                        배송 중 파손된 제품 수령
                      </option>
                      <option value="주문된 제품과 다른 상품 수령">
                        주문된 제품과 다른 상품 수령
                      </option>
                      <option value="기타 사유">기타 사유</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 row row-cols-1 row-cols-lg-2 row-cols-md-1 g-0 justify-content-start pt-1 ps-1">
              <div className="text-center fs-18 md-fs-16">
                <label className="text-dark-gray fw-500 d-block text-start">
                  반품 사유
                </label>
                <textarea
                  className="border-radius-4px form-control"
                  cols="40"
                  rows="4"
                  name="exchangeRequestDetails" // ✅ name 설정
                  value={refund.exchangeRequestDetails}
                  onChange={handleRefundChange}
                  placeholder="반품 사유를 남겨주세요."
                ></textarea>
              </div>
            </div>

            <div className="col-12 text-center md-mt-40px sm-mt-10px">
              <Button
                name="eventSection"
                size="extra-large"
                radiusOn="radius-on"
                className="btn-large w-40 mt-60px md-mt-10px mb-5px d-inline-block"
                onClick={handleRefundRequest}
              >
                반품신청
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ReturnPage;
