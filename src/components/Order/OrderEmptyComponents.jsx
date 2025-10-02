import { Link } from 'react-router-dom';
import Button from '@/components/common/Button/Button';

const OrderEmptyComponents = ({ message }) => {
  return (
    <>
      <div className="row row-cols-1 row-cols-lg-12 row-cols-sm-12 justify-content-center">
        <div className="col-12 text-center">
          <div className="feature-box pt-15 text-center overflow-hidden">
            <div className="feature-box-icon">
              <i className="line-icon-Shopping-Basket icon-extra-large text-medium-gray"></i>
            </div>
            <div className="feature-box-content last-paragraph-no-margin">
              <p className="text-dark-gray opacity-5">
                {message}에 담긴 상품이 없습니다.
              </p>
            </div>
          </div>
        </div>
        <div className="col-12 pt-8 text-center">
          <Link to="/">
            <Button
              size="large"
              radiusOn="radius-on"
              className="btn w-25 mt-60px mb-20px d-block"
            >
              홈으로
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default OrderEmptyComponents;
