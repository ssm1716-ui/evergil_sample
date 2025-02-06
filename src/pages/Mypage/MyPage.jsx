import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
} from 'react-router-dom';
import Button from '@/components/common/Button/Button';
import Label from '@/components/common/Label/Label';

import OrderDetailPage from '@/pages/Mypage/OrderDetailPage';
import MyReviewPage from '@/pages/Mypage/MyReviewPage';
import ExchagePage from '@/pages/Mypage/ExchagePage';
import ReturnPage from '@/pages/Mypage/ReturnPage';

import CartImage1 from '@/assets/images/sample/cart-image1.jpg';

const MyPage = () => {
  return (
    <>
      <section className="pt-10 bg-base-white-color ps-6 pe-6 lg-ps-3 lg-pe-3 sm-ps-0 sm-pe-0">
        <div className="container-fluid">
          <div className="row flex-row-reverse">
            <Outlet />
            <div className="col-xxl-2 col-lg-3 shop-sidebar pt-4 ps-5">
              <div className="mb-30px">
                <span className="fw-600 fs-17 text-dark-gray d-block mt-10px">
                  마이페이지
                </span>
                <ul className="fs-15 shop-filter category-filter">
                  <li>
                    <Link to="order-list">
                      <span className="product-category-cb"></span>
                      주문/배송내역
                    </Link>
                  </li>
                  <li>
                    <Link to="address">
                      <span className="product-category-cb"></span>
                      배송지 관리
                    </Link>
                  </li>
                  <li>
                    <Link to="myinfo">
                      <span className="product-category-cb"></span>내 정보 변경
                    </Link>
                  </li>
                  <li>
                    <Link to="my-review">
                      <span className="product-category-cb"></span>
                      내가 쓴 리뷰
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mb-30px">
                <span className="fw-600 fs-17 text-dark-gray d-block mt-10px">
                  고객센터
                </span>
                <ul className="fs-15 shop-filter color-filter">
                  <li>
                    <Link to="my-contact">
                      <span className="product-category-cb"></span>
                      문의하기
                    </Link>
                  </li>
                  <li>
                    <Link to="faq">
                      <span className="product-category-cb"></span>
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MyPage;
