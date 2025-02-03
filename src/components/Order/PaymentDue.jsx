import { Link, useLocation } from 'react-router-dom';

import Button from '@/components/common/Button/Button';
import CartImage1 from '@/assets/images/sample/cart-image1.jpg';

const PaymentDue = ({ message }) => {
  const location = useLocation();

  const getMessageByPath = (pathname) => {
    if (pathname.includes('/checkout')) {
      return '결제하기';
    } else {
      return '주문하기';
    }
  };

  return (
    <>
      <section className="pt-3 ">
        <div className="container mb-15 py-4 border-top border-bottom border-2  border-color-base-color text-black">
          <div className="row">
            <h6 className="fs-16">결제 예정 금액 총 N건</h6>
          </div>

          <div className="row row-cols-12 row-cols-lg-12 row-cols-sm-12 justify-content-center align-items-baseline fs-12">
            <div className="col icon-with-text-style-03">
              <div className="feature-box p-8 text-center">
                <div className="feature-box-icon">
                  <h6 className="fs-24">180,000원</h6>
                </div>
                <div className="feature-box-content last-paragraph-no-margin">
                  <span className="d-inline-block fs-16 fw-500 mb-5px">
                    상품 금액
                  </span>
                </div>
              </div>
            </div>

            <div className="col icon-with-text-style-03 flex-0">
              <div className="feature-box p-8 text-center">
                <div className="feature-box-icon">
                  <h6 className="fs-24">+</h6>
                </div>
              </div>
            </div>

            <div className="col icon-with-text-style-03">
              <div className="feature-box p-8 text-center">
                <div className="feature-box-icon">
                  <h6 className="fs-24">0원</h6>
                </div>
                <div className="feature-box-content last-paragraph-no-margin">
                  <span className="d-inline-block fs-16 fw-500 mb-5px">
                    배송비
                  </span>
                </div>
              </div>
            </div>

            <div className="col icon-with-text-style-03 flex-0">
              <div className="feature-box p-8 text-center">
                <div className="feature-box-icon">
                  <h6 className="fs-24">-</h6>
                </div>
              </div>
            </div>

            <div className="col icon-with-text-style-03">
              <div className="feature-box p-8 text-center">
                <div className="feature-box-icon">
                  <h6 className="fs-24">20,000원</h6>
                </div>
                <div className="feature-box-content last-paragraph-no-margin">
                  <span className="d-inline-block fs-16 fw-500 mb-5px">
                    할인금액
                  </span>
                </div>
              </div>
            </div>

            <div className="col icon-with-text-style-03 flex-0">
              <div className="feature-box p-8 text-center">
                <div className="feature-box-icon">
                  <h6 className="fs-24">=</h6>
                </div>
              </div>
            </div>

            <div className="col icon-with-text-style-03">
              <div className="feature-box p-8 text-center">
                <div className="feature-box-icon">
                  <h6 className="fs-24">160,000원</h6>
                </div>
                <div className="feature-box-content last-paragraph-no-margin">
                  <span className="d-inline-block fs-16 fw-500 mb-5px">
                    총 주문 금액
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col text-center">
            <Link to="/checkout">
              <Button
                size="extra-large"
                className="btn-large w-30 mt-30px mb-10px d-block btn-box-shadow"
              >
                {getMessageByPath(location.pathname)}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default PaymentDue;
