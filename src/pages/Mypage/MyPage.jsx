import { useEffect } from 'react';
import { useNavigate, Link, Outlet } from 'react-router-dom';

const MyPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // navigate('/mypage/order-list'); //mypage` 접근 시 자동 리다이렉트
  }, []);
  return (
    <>
      <section className="top-space-margin big-section">
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
    </>
  );
};

export default MyPage;
