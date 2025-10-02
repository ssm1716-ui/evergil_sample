import { useState, useEffect } from 'react';

const MobileBuyPanel = ({
  productName,
  productPrice,
  discountedPrice,
  quantity,
  handleMinus,
  handlePlus,
  handleCartAdd,
  handleBuyNow,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 모바일 여부 확인
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isMobile) return null;

  return (
    <>
      {/* ✅ 하단 고정 구매 버튼 */}
      <div className="mobile-buy-fixed">
        <button className="buy-btn" onClick={() => setIsOpen(true)}>
          구매하기
        </button>
      </div>

      {/* ✅ 상세 구매 영역 */}
      <div className={`mobile-buy-panel ${isOpen ? 'open' : ''}`}>
        <div className="panel-header">
          <button onClick={() => setIsOpen(false)}></button>
        </div>
        <div className="panel-content fs-13">
          <div className="panel-info">
            <p className="mb-2 fw-600 sm-fs-18">{productName}</p>
            <div className="d-flex justify-content-between align-items-baseline mt-10px">
              <div className="quantity me-10px xs-mb-15px order-1">
                <button
                  type="button"
                  className="qty-minus"
                  onClick={handleMinus}
                >
                  -
                </button>
                <input
                  className="qty-text"
                  type="text"
                  id="1"
                  value={quantity}
                  aria-label="qty-text"
                />
                <button type="button" className="qty-plus" onClick={handlePlus}>
                  +
                </button>
              </div>
              <div>
                <span className="fs-18">
                  {Number(productPrice - discountedPrice).toLocaleString()}원
                </span>
              </div>
            </div>
          </div>

          <p className="mb-2 fs-20 text-end text-red">
            총 합계
            <strong className="text-black">
              {' '}
              {(Number(productPrice - discountedPrice) * quantity).toLocaleString()}
            </strong>
          </p>
          <div className="action-btns">
            <button className="cart" onClick={handleCartAdd}>
              장바구니
            </button>
            <button className="buy" onClick={handleBuyNow}>
              바로구매
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileBuyPanel;
