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

const OrderListPage = () => {
  return (
    <>
      <div className="col-xxl-10 col-lg-9 md-ps-15px md-mb-60px">
        <h6 className="mb-1 fs-40 fw-400 pb-2 border-bottom border-2 border-black text-start text-black">
          주문/배송 내역
        </h6>
        <div className="toolbar-wrapper d-flex flex-column flex-sm-row align-items-center w-100 md-mb-30px pt-2">
          <div className="col xs-mt-10px">
            <ul className="fs-15 d-flex justify-content-around ps-0">
              <li>
                <a href="#">
                  <span className="product-category-cb"></span>
                  전체 0
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="product-category-cb"></span>|
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="product-category-cb"></span>
                  입금/결제 0
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="product-category-cb"></span>|
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="product-category-cb"></span>
                  배송중 0
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="product-category-cb"></span>|
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="product-category-cb"></span>
                  배송완료 0
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="product-category-cb"></span>|
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="product-category-cb"></span>
                  구매확정 0
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="product-category-cb"></span>|
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="product-category-cb"></span>
                  교환 0
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="product-category-cb"></span>|
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="product-category-cb"></span>
                  환불 0
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="product-category-cb"></span>|
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="product-category-cb"></span>
                  취소 0
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="toolbar-wrapper d-flex flex-column flex-sm-row align-items-center w-100 mb-40px md-mb-30px">
          <div className="col xs-mt-10px">
            <ul className="fs-15 d-flex justify-content-start ps-0 gap-1">
              <li>
                <Button
                  className="position-static border"
                  variant="primary"
                  color="white"
                  size="small"
                  radiusOn="radius-on"
                >
                  전체기간
                </Button>
              </li>
              <li>
                <Button
                  className="position-static border"
                  variant="primary"
                  color="white"
                  size="small"
                  radiusOn="radius-on"
                >
                  1주일
                </Button>
              </li>
              <li>
                <Button
                  className="position-static border"
                  variant="primary"
                  color="white"
                  size="small"
                  radiusOn="radius-on"
                >
                  1개월
                </Button>
              </li>
              <li>
                <Button
                  className="position-static border"
                  variant="primary"
                  color="white"
                  size="small"
                  radiusOn="radius-on"
                >
                  3개월
                </Button>
              </li>
              <li>
                <div className="date-time row gutter-very-small ps-10px">
                  <div className="date-icon col-xl-6 lg-mb-25px">
                    <input
                      className="rounded-pill py-8px"
                      type="date"
                      name="date"
                      value="2024-02-01"
                      min="2024-02-01"
                      max="2099-12-31"
                    />
                  </div>
                  {/* <div className="col-xl-1 lg-mb-25px">~</div> */}
                  <div className="date-icon col-xl-6 lg-mb-25px">
                    <input
                      className="rounded-pill py-8px"
                      type="date"
                      name="date"
                      value="2024-02-29"
                      min="2024-02-29"
                      max="2099-12-31"
                    />
                  </div>
                </div>
              </li>
              <li className="flex-1">
                <div className="date-time row gutter-very-small ps-10px">
                  <div className="search-icon col-xl-12 lg-mb-25px">
                    <input
                      className="rounded-pill py-8px"
                      type="search"
                      name="search"
                      placeholder="검색어를 입력해주세요."
                    />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* <div className="row row-cols-1 row-cols-lg-12 row-cols-sm-12 justify-content-center">
              <div className="col-12 text-center">
                <div className="feature-box pt-10 pb-15 text-center overflow-hidden">
                  <div className="feature-box-icon">
                    <i className="bi bi-exclamation-circle icon-extra-large text-medium-gray"></i>
                  </div>
                  <div className="feature-box-content last-paragraph-no-margin pt-1">
                    <p className="text-dark-gray opacity-5">
                      주문하신 내역이 없습니다.
                    </p>
                  </div>
                </div>
              </div>
            </div> */}

        <div className="row align-items-start">
          <div className="col-lg-12 pe-50px md-pe-15px md-mb-50px xs-mb-35px">
            <div className="row align-items-center">
              <div className="col-12">
                <table className="table order-products">
                  <thead>
                    <tr>
                      <th scope="col" colSpan={2} className="fs-24">
                        2024.02.01
                      </th>
                      <th
                        scope="col"
                        className="text-end order-detail-text-icon"
                      >
                        <Link to="/mypage/order-detail">주문상세</Link>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="product-thumbnail">
                        <a href="#">
                          <img
                            className="cart-product-image"
                            src={CartImage1}
                            alt=""
                          />
                        </a>
                      </td>
                      <td className="product-name">
                        <a href="#" className="text-dark-gray fw-500 d-block">
                          qrcode1
                        </a>
                      </td>
                      <td className="product-btn text-end">
                        <div>
                          <Link
                            to="/mypage/exchage"
                            className="fs-20 fw-500 d-inline lh-initial ps-2"
                          >
                            <Button
                              size="small"
                              color="white"
                              className="btn mt-10px d-inline w-30"
                            >
                              교환
                            </Button>
                          </Link>
                          <Link
                            to="/mypage/return"
                            className="fs-20 fw-500 d-inline lh-initial ps-2"
                          >
                            <Button
                              size="small"
                              color="white"
                              className="btn w-10 mt-10px d-inline w-30"
                            >
                              환불
                            </Button>
                          </Link>
                        </div>
                        <div>
                          <a
                            href="#"
                            className="fs-20 fw-500 d-inline lh-initial ps-2"
                          >
                            <Button
                              size="small"
                              color="white"
                              className="btn w-10 mt-10px d-inline w-30"
                            >
                              배송 조회
                            </Button>
                          </a>
                          <a
                            href="#"
                            className="fs-20 fw-500 d-inline lh-initial ps-2"
                          >
                            <Button
                              size="small"
                              color="white"
                              className="btn w-10 mt-10px d-inline w-30"
                            >
                              구매 확정
                            </Button>
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="5" className="p-0">
                        <Label
                          text="배송확정"
                          className="mb-1 ps-1 w-100 bg-light-medium-gray fw-600 text-black border-radius-10px"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="product-thumbnail">
                        <a href="#">
                          <img
                            className="cart-product-image"
                            src={CartImage1}
                            alt=""
                          />
                        </a>
                      </td>
                      <td className="product-name">
                        <a href="#" className="text-dark-gray fw-500 d-block">
                          qrcode1
                        </a>
                      </td>
                      <td className="product-btn text-end">
                        <div>
                          <a
                            href="#"
                            className="fs-20 fw-500 d-inline lh-initial ps-2"
                          >
                            <Button
                              size="small"
                              color="white"
                              className="btn w-10 mt-10px d-inline w-30"
                            >
                              배송 조회
                            </Button>
                          </a>
                          <a
                            href="#"
                            className="fs-20 fw-500 d-inline lh-initial ps-2"
                          >
                            <Button
                              size="small"
                              color="white"
                              className="btn w-10 mt-10px d-inline w-30"
                            >
                              리뷰 보기
                            </Button>
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="5" className="p-0">
                        <Label
                          text="구매확정"
                          className="mb-1 ps-1 w-100 bg-light-medium-gray fw-600 text-black border-radius-10px"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="product-thumbnail">
                        <a href="#">
                          <img
                            className="cart-product-image"
                            src={CartImage1}
                            alt=""
                          />
                        </a>
                      </td>
                      <td className="product-name">
                        <a href="#" className="text-dark-gray fw-500 d-block">
                          qrcode1
                        </a>
                      </td>
                      <td className="product-btn text-end">
                        <div>
                          <a
                            href="#"
                            className="fs-20 fw-500 d-inline lh-initial ps-2"
                          >
                            <Button
                              size="small"
                              color="white"
                              className="btn mt-10px d-inline w-30"
                            >
                              결제 취소
                            </Button>
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="5" className="p-0">
                        <Label
                          text="결제 완료"
                          className="mb-1 ps-1 w-100 bg-light-medium-gray fw-600 text-black border-radius-10px"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table className="table order-products">
                  <thead>
                    <tr>
                      <th scope="col" colSpan={2} className="fs-24">
                        2024.02.02
                      </th>
                      <th
                        scope="col"
                        className="text-end order-detail-text-icon"
                      >
                        <Link to="/order-detail">주문상세</Link>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="product-thumbnail">
                        <a href="#">
                          <img
                            className="cart-product-image"
                            src={CartImage1}
                            alt=""
                          />
                        </a>
                      </td>
                      <td className="product-name">
                        <a href="#" className="text-dark-gray fw-500 d-block">
                          qrcode1
                        </a>
                      </td>
                      <td className="product-btn text-end">
                        <div>
                          <a
                            href="#"
                            className="fs-20 fw-500 d-inline lh-initial ps-2"
                          >
                            <Button
                              size="small"
                              color="white"
                              className="btn mt-10px d-inline w-30"
                            >
                              교환
                            </Button>
                          </a>
                          <a
                            href="#"
                            className="fs-20 fw-500 d-inline lh-initial ps-2"
                          >
                            <Button
                              size="small"
                              color="white"
                              className="btn w-10 mt-10px d-inline w-30"
                            >
                              환불
                            </Button>
                          </a>
                        </div>
                        <div>
                          <a
                            href="#"
                            className="fs-20 fw-500 d-inline lh-initial ps-2"
                          >
                            <Button
                              size="small"
                              color="white"
                              className="btn w-10 mt-10px d-inline w-30"
                            >
                              배송 조회
                            </Button>
                          </a>
                          <a
                            href="#"
                            className="fs-20 fw-500 d-inline lh-initial ps-2"
                          >
                            <Button
                              size="small"
                              color="white"
                              className="btn w-10 mt-10px d-inline w-30"
                            >
                              구매 확정
                            </Button>
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="5" className="p-0">
                        <Label
                          text="배송확정"
                          className="mb-1 ps-1 w-100 bg-light-medium-gray fw-600 text-black border-radius-10px"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="product-thumbnail">
                        <a href="#">
                          <img
                            className="cart-product-image"
                            src={CartImage1}
                            alt=""
                          />
                        </a>
                      </td>
                      <td className="product-name">
                        <a href="#" className="text-dark-gray fw-500 d-block">
                          qrcode1
                        </a>
                      </td>
                      <td className="product-btn text-end">
                        <div>
                          <a
                            href="#"
                            className="fs-20 fw-500 d-inline lh-initial ps-2"
                          >
                            <Button
                              size="small"
                              color="white"
                              className="btn w-10 mt-10px d-inline w-30"
                            >
                              배송 조회
                            </Button>
                          </a>
                          <a
                            href="#"
                            className="fs-20 fw-500 d-inline lh-initial ps-2"
                          >
                            <Button
                              size="small"
                              color="white"
                              className="btn w-10 mt-10px d-inline w-30"
                            >
                              리뷰 보기
                            </Button>
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="5" className="p-0">
                        <Label
                          text="구매확정"
                          className="mb-1 ps-1 w-100 bg-light-medium-gray fw-600 text-black border-radius-10px"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="product-thumbnail">
                        <a href="#">
                          <img
                            className="cart-product-image"
                            src={CartImage1}
                            alt=""
                          />
                        </a>
                      </td>
                      <td className="product-name">
                        <a href="#" className="text-dark-gray fw-500 d-block">
                          qrcode1
                        </a>
                      </td>
                      <td className="product-btn text-end">
                        <div>
                          <a
                            href="#"
                            className="fs-20 fw-500 d-inline lh-initial ps-2"
                          >
                            <Button
                              size="small"
                              color="white"
                              className="btn mt-10px d-inline w-30"
                            >
                              결제 취소
                            </Button>
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="5" className="p-0">
                        <Label
                          text="결제 완료"
                          className="mb-1 ps-1 w-100 bg-light-medium-gray fw-600 text-black border-radius-10px"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination element */}
        {/* <div className="w-100 d-flex mt-3 justify-content-center">
              <ul className="pagination pagination-style-01 fs-13 fw-500 mb-0">
                <li className="page-item">
                  <a className="page-link" href="#">
                    <i className="feather icon-feather-arrow-left fs-18 d-xs-none"></i>
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    01
                  </a>
                </li>
                <li className="page-item active">
                  <a className="page-link" href="#">
                    02
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    03
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    04
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    <i className="feather icon-feather-arrow-right fs-18 d-xs-none"></i>
                  </a>
                </li>
              </ul>
            </div> */}
      </div>
    </>
  );
};

export default OrderListPage;
