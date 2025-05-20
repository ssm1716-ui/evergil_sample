import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Isotope from 'isotope-layout';
import imagesLoaded from 'imagesloaded';

import { getProductsSelected } from '@/api/products/productsApi';

import sampleImage1 from '@/assets/images/sample/cef8956d119735502d0dcd07875c9c06d33ecb6220a4321b01b0fbe5163e.jpg';
import sampleImage2 from '@/assets/images/sample/7c44ec69af309222e12eff2678dde729535eeb6f025b3e3cd60c339c6852.jpg';
import sampleImage3 from '@/assets/images/sample/81eced237f6438f7abf32ff519203b74ab90be66ef083262fb9812815e00.jpg';

const sampleImages = [sampleImage1, sampleImage2, sampleImage3];

const StorePage = () => {
  const gridRef = useRef(null);
  const [filterKey, setFilterKey] = useState('*'); // 기본 필터 값
  const [isotope, setIsotope] = useState(null);
  const [products, setProducts] = useState([]);

  /** 🛍️ 제품 리스트 가져오기 */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { status, data } = await getProductsSelected();
        if (status !== 200)
          throw new Error('데이터를 불러오는데 실패했습니다.');
        console.log(data);

        setProducts(data.data || []); // 리스트 없을 경우 빈 배열 처리
      } catch (error) {
        alert('제품을 불러오는데 실패했습니다.');
      }
    };

    fetchProducts();
  }, []);

  /** Isotope 초기화 및 레이아웃 적용 */
  useEffect(() => {
    if (!gridRef.current) return;

    imagesLoaded(gridRef.current, { background: true }, () => {
      const isoInstance = new Isotope(gridRef.current, {
        itemSelector: '.grid-item',
        layoutMode: 'masonry', // ✅ masonry 사용
        percentPosition: true,
        masonry: {
          columnWidth: '.grid-sizer',
        },
      });

      setIsotope(isoInstance);
      isoInstance.layout(); // ✅ 레이아웃 강제 적용
    });

    return () => isotope?.destroy();
  }, []);

  /** 데이터 변경 시 Isotope 재정렬 */
  useEffect(() => {
    if (isotope && products.length > 0) {
      imagesLoaded(gridRef.current, () => {
        isotope.reloadItems();
        isotope.arrange();
        isotope.layout(); // ✅ 강제 레이아웃 적용
      });
    }
  }, [products, isotope]);

  /** 필터 변경 시 적용 */
  useEffect(() => {
    if (isotope) {
      isotope.arrange({ filter: filterKey });
    }
  }, [filterKey]);
  return (
    <>
      <section>
        <div className="container">
          <div
            className="row align-items-center justify-content-center"
            data-anime='{ "el": "childs", "translateY": [-15, 0], "opacity": [0,1], "duration": 300, "delay": 0, "staggervalue": 200, "easing": "easeOutQuad" }'
          >
            {/* <div className="col-12 col-xl-8 col-lg-10 text-center position-relative page-title-extra-large">
              <h1 className="fw-600 text-dark-gray mb-10px">쇼핑</h1>
            </div> */}
            <div className="col-12 breadcrumb breadcrumb-style-01 d-flex justify-content-center"></div>
          </div>
        </div>
      </section>

      <section className="pt-0 ps-6 pe-6 lg-ps-2 lg-pe-2 md-pt-5 sm-ps-0 sm-pe-0">
        <div className="container-fluid">
          <div className="row flex-row-reverse">
            <div className="col-xxl-12 col-lg-12 md-ps-15px md-mb-60px">
              <ul
                className="shop-modern shop-wrapper grid grid-3col xl-grid-3col sm-grid-2col xs-grid-1col gutter-extra-large text-center"
                ref={gridRef}
              >
                <li className="grid-sizer"></li>
                {products.map((product, index) => (
                  <li className="grid-item new" key={index}>
                    <div className="shop-image-wrapper">
                      <div className="shop-image mb-20px">
                        <Link to={`/shop/${product.productId}`}>
                          <img
                            src={product.productImage}
                            alt="Product"
                            className="product-main-image"
                          />
                          <div className="shop-overlay"></div>
                        </Link>
                      </div>
                      <div className="shop-footer text-center">
                        <a
                          href="#"
                          className="text-dark-gray fs-19 sm-fs-12 fw-500 sm-lh-20"
                        >
                          {product.productName}
                        </a>
                        <div className="price lh-22 md-lh-40 fs-18 md-fs-20 sm-fs-12">
                          <del className="me-10px">
                            {product.price.toLocaleString()}원
                          </del>
                          {product.discountedPrice.toLocaleString()}원
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StorePage;
