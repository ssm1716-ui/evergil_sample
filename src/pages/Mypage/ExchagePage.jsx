import { Link } from 'react-router-dom';
import Button from '@/components/common/Button/Button';
import Label from '@/components/common/Label/Label';
import CartImage1 from '@/assets/images/sample/cart-image1.jpg';

const ExchagePage = () => {
  return (
    <>
      <div className="col-xxl-10 col-lg-9 md-ps-15px">
        <div className="col-12 col-xl-12 col-lg-12 text-start position-relative page-title-extra-large text-decoration-line-bottom mb-3">
          <h6 className="fw-600 text-dark-gray mb-10px">교환신청</h6>
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
                          <span className="row">Textured sweater</span>
                          <span className="row">80,000원</span>
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
            <h6 className="fw-600 border-black text-start text-black mb-1">
              교환 사유
            </h6>
            <div className="row row-cols-1 row-cols-lg-2 row-cols-md-1 g-0 justify-content-start pt-1 ps-1">
              <div className="col contact-form-style-04">
                <div className="text-center fs-26 md-fs-16">
                  <label className="text-dark-gray fw-500 d-block text-start">
                    구매자 책임 사유
                  </label>

                  <div className="select">
                    <select
                      className="form-control "
                      name="select"
                      aria-label="select-doctor"
                    >
                      <option value="">교환 사유를 선택해 주세요.</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="row row-cols-1 row-cols-lg-2 row-cols-md-1 g-0 justify-content-start pt-1 ps-1">
              <div className="col contact-form-style-04">
                <div className="text-center fs-26 md-fs-16">
                  <label className="text-dark-gray fw-500 d-block text-start">
                    판매자 책임 사유
                  </label>

                  <div className="select">
                    <select
                      className="form-control "
                      name="select"
                      aria-label="select-doctor"
                    >
                      <option value="">교환 사유를 선택해 주세요.</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 text-center">
              <Button
                name="eventSection"
                size="extra-large"
                radiusOn="radius-on"
                className="btn-large w-40 mt-60px md-mt-10px mb-5px d-inline-block"
              >
                교환신청
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ExchagePage;
