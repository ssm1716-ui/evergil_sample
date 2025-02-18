import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Isotope from 'isotope-layout';
import imagesLoaded from 'imagesloaded';

import sampleImage1 from '@/assets/images/sample/demo-fashion-store-product-01.jpg';
import sampleImage2 from '@/assets/images/sample/demo-fashion-store-product-02.jpg';
import sampleImage3 from '@/assets/images/sample/demo-fashion-store-product-03.jpg';

const StorePage = () => {
  const gridRef = useRef(null);
  const [filterKey, setFilterKey] = useState('*'); // 기본 필터 값
  const [isotope, setIsotope] = useState(null);

  useEffect(() => {
    if (!gridRef.current) {
      console.error('gridRef.current가 존재하지 않습니다.');
      return;
    }

    imagesLoaded(gridRef.current, () => {
      const iso = new Isotope(gridRef.current, {
        itemSelector: '.grid-item',
        layoutMode: 'masonry',
        percentPosition: true,
        masonry: {
          columnWidth: '.grid-sizer', // 기준이 될 크기
        },
      });

      setIsotope(iso);
    });

    return () => {
      if (isotope) {
        isotope.destroy();
      }
    };
  }, []);

  // 필터 변경
  useEffect(() => {
    if (isotope) {
      isotope.arrange({ filter: filterKey });
    }
  }, [filterKey, isotope]);

  return (
    <>
      <section className="top-space-margin half-section">
        <div className="container">
          <div
            className="row align-items-center justify-content-center"
            data-anime='{ "el": "childs", "translateY": [-15, 0], "opacity": [0,1], "duration": 300, "delay": 0, "staggervalue": 200, "easing": "easeOutQuad" }'
          >
            <div className="col-12 col-xl-8 col-lg-10 text-center position-relative page-title-extra-large">
              <h1 className="fw-600 text-dark-gray mb-10px">쇼핑</h1>
            </div>
            <div className="col-12 breadcrumb breadcrumb-style-01 d-flex justify-content-center"></div>
          </div>
        </div>
      </section>

      <section className="pt-0 ps-6 pe-6 lg-ps-2 lg-pe-2 sm-ps-0 sm-pe-0">
        <div className="container-fluid">
          <div className="row flex-row-reverse">
            <div className="col-xxl-12 col-lg-12 md-ps-15px md-mb-60px">
              <ul
                className="shop-modern shop-wrapper grid grid-4col xl-grid-3col sm-grid-2col xs-grid-1col gutter-extra-large text-center"
                ref={gridRef}
              >
                <li className="grid-sizer"></li>

                <li className="grid-item new">
                  <div className="shop-box mb-10px">
                    <div className="shop-image mb-20px">
                      <Link to="/shop">
                        <img src={sampleImage1} alt="Product" />
                        <span className="lable new">New</span>
                        <div className="shop-overlay"></div>
                      </Link>
                    </div>
                    <div className="shop-footer text-center">
                      <a href="#" className="text-dark-gray fs-19 fw-500">
                        QR Code(부착용)
                      </a>
                      <div className="price lh-22 fs-16">
                        <del>100,000원</del> 80,000원
                      </div>
                    </div>
                  </div>
                </li>
                <li className="grid-item new">
                  <div className="shop-box mb-10px">
                    <div className="shop-image mb-20px">
                      <Link to="/shop">
                        <img src={sampleImage2} alt="Product" />
                        <span className="lable new">New</span>
                        <div className="shop-overlay"></div>
                      </Link>
                    </div>
                    <div className="shop-footer text-center">
                      <a href="#" className="text-dark-gray fs-19 fw-500">
                        QR Code(거치용)
                      </a>
                      <div className="price lh-22 fs-16">
                        <del>100,000원</del> 80,000원
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              {/* <div className="w-100 d-flex mt-4 justify-content-center md-mt-30px">
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
          </div>
        </div>
      </section>
    </>
  );
};

export default StorePage;
