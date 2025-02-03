import { Link, useLocation } from 'react-router-dom';
import Button from '@/components/common/Button/Button';
import PaymentDue from '@/components/Order/PaymentDue';
import OrderEmptyComponents from '@/components/Order/OrderEmptyComponents';
import OrderListComponents from '@/components/Order/OrderListComponents';

import { useState } from 'react';

const CartPage = () => {
  const [order, setOrder] = useState(true);
  const location = useLocation();

  const getMessageByPath = (pathname) => {
    if (pathname.includes('/checkout')) {
      return '주문';
    } else {
      return '장바구니';
    }
  };

  return (
    <>
      <section className="pt-15">
        <div className="container">
          <h6 className="mb-1 fs-40 fw-400 pb-1 border-bottom border-2 border-black text-center text-black">
            장바구니
          </h6>
          {!order ? (
            <></>
          ) : (
            <div className="col-lg-12 px-4 md-pe-15px md-mb-50px xs-mb-35px">
              <div className="row d-flex align-items-baseline">
                <div className="col-6 mb-5px">
                  <div className="position-relative terms-condition-box text-start d-flex align-items-center">
                    <label>
                      <input
                        type="checkbox"
                        name="terms_condition"
                        id="terms_condition1"
                        value="1"
                        className="terms-condition check-box align-middle"
                      />
                      <span className="box">전체 선택 </span>
                    </label>
                  </div>
                </div>
                <div className="col-6 text-end">
                  <Button
                    size="extra-large"
                    radiusOn="radius-on"
                    color="white"
                    className="btn-small w-30 mt-30px mb-10px d-block  align-baseline"
                  >
                    선택 삭제
                  </Button>
                </div>
              </div>
            </div>
          )}

          {!order ? (
            <OrderEmptyComponents
              message={getMessageByPath(location.pathname)}
            />
          ) : (
            <OrderListComponents />
          )}
        </div>
      </section>

      {!order ? <></> : <PaymentDue />}
    </>
  );
};

export default CartPage;
