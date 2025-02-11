import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
} from 'react-router-dom';
import Button from '@/components/common/Button/Button';
import Label from '@/components/common/Label/Label';
import AnimatedSection from '@/components/AnimatedSection';

import OrderDetailPage from '@/pages/Mypage/OrderDetailPage';
import MyReviewPage from '@/pages/Mypage/MyReviewPage';
import ExchagePage from '@/pages/Mypage/ExchagePage';
import ReturnPage from '@/pages/Mypage/ReturnPage';

import CartImage1 from '@/assets/images/sample/cart-image1.jpg';

const MyPage = () => {
  return (
    <>
      <AnimatedSection>
        <section className="top-space-margin half-section">
          <div className="container">
            <div className="row flex-row-reverse">
              <Outlet />
              <div
                className="col-xxl-2 col-lg-3 shop-sidebar"
                data-anime='{ "el": "childs", "translateY": [-15, 0], "opacity": [0,1], "duration": 300, "delay": 0, "staggervalue": 300, "easing": "easeOutQuad" }'
              >
                <div className="mb-30px">
                  <span className="fw-500 fs-19 text-dark-gray d-block mb-10px">
                    마이페이지
                  </span>
                  <ul className="shop-filter category-filter fs-16">
                    <li>
                      <Link to="order-list">주문/배송내역</Link>
                    </li>
                    <li>
                      <Link to="address">배송지 관리</Link>
                    </li>
                    <li>
                      <Link to="myinfo">내 정보 변경</Link>
                    </li>
                    <li>
                      <Link to="my-review">내가 쓴 리뷰</Link>
                    </li>
                  </ul>
                </div>
                <div className="mb-30px">
                  <span className="fw-500 fs-19 text-dark-gray d-block mb-10px">
                    고객센터
                  </span>
                  <ul className="shop-filter category-filter fs-16">
                    <li>
                      <Link to="my-contact">문의하기</Link>
                    </li>
                    <li>
                      <Link to="faq">FAQ</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </>
  );
};

export default MyPage;
