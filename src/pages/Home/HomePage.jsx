import { Link } from 'react-router-dom';

import FaqComponents from '@/components/Faq/FaqComponents';
import mainBannerImage from '@/assets/images/main-banner.png';
import mainSubImage1 from '@/assets/images/main-sub-image1.png';
import mainSubImage2 from '@/assets/images/main-sub-image2.png';
import mainSubImage3 from '@/assets/images/main-sub-image3.png';

import Button from '@/components/common/Button/Button';

const HomePage = () => {
  return (
    <>
      <section
        className="p-0 md-h-600px sm-h-500px border-top position-relative"
        data-parallax-background-ratio="0.3"
        style={{
          backgroundImage: `url(${mainBannerImage})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          height: '1100px',
        }}
      >
        <div></div>
      </section>
      <section>
        <div className="row pt-7">
          <div className="col-12">
            <div className="row align-items-center justify-content-center g-0">
              <div className="col-lg-4 offset-lg-1 md-mb-30px position-relative text-dark-gray">
                <h4 className="fw-600 mb-1">에버링크 QR</h4>
                <span className="text-light-gray fw-500 d-block mb-5">
                  납골당과 묘지 둘 다 사용이 가능합니다.
                </span>
                <p className="lg-w-100 mb-30px">
                  추모 페이지에 사랑하는 사람의 사진과 영상을 업로드 할 수
                  있습니다.
                  <br />
                  또한 가족들이 방문할 때 마다 추모페이지에서 하늘편지를 남기실
                  수 있습니다.
                  <br /> 평생동안 사랑하는 사람의 기억을 보관할 수 있는
                  추모페이지를 사용해보세요.
                </p>
                <p className="lg-w-100 mb-30px">
                  우리의 사명은 사랑하는 사람들이 영원히 기억되는 것 입니다.
                  <br />
                  대부분 2-3세대가 지나면 사람들은 우리가 존재했다는 사실조차
                  기억하지 못할 것입니다. <br />
                  확실한 건 시간이 지나면 기억은 희미해집니다.
                  <br /> 우리는 사랑하는 사람을 기억하고,그들과의 추억을
                  보존하고,
                  <br />
                  그들을 평생 기억할 수 있는 플랫폼을 제공할 것입니다.
                </p>
                <div className="offset-lg-3 mt-5 mb-15">
                  <Link to="/shop">
                    <Button
                      type="button"
                      size="medium"
                      radiusOn="radius-on"
                      color="white"
                      className="btn mt-70px mb-15px"
                    >
                      구매하러가기
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="col-lg-5">
                <img src={mainSubImage1} alt="" className="w-90" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="col-lg-12 text-center mb-10">
          <img src={mainSubImage2} alt="" className="w-25 lg-w-60" />
        </div>
        <div className="text-center text-dark">
          <h6 className="m-0 fs-24 fw-400 ls-minus-1px">가상 추모 페이지</h6>
          <h6 className="m-0 fs-24 fw-400 ls-minus-1px">
            구매하기 전 미리 보기
          </h6>
          <Link>
            <Button
              type="button"
              size="medium"
              radiusOn="radius-on"
              className="mt-1 mb-15px w-15 lg-w-60"
            >
              추모 페이지 미리보기
            </Button>
          </Link>
        </div>
      </section>
      <section>
        <div className="text-center text-dark">
          <h6 className="m-0 fs-24 fw-400 ls-minus-1px">
            프로필 설정부터 추모페이지 수정 등
          </h6>
          <h6 className="m-0 fs-24 fw-400 ls-minus-1px">
            단계 별 동영상으로 설명
          </h6>
          <Link>
            <div className="col-lg-12 text-center mb-2">
              <img src={mainSubImage3} alt="" className="w-35 lg-w-80" />
            </div>
          </Link>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="row row-cols-1 row-cols-lg-4 row-cols-sm-2 justify-content-center text-black">
            <div className="col icon-with-text-style-03">
              <div className="feature-box">
                <div className="feature-box-icon hover-box dark-hover feature-box-icon-rounded w-100px h-100px rounded-circle bg-everlink-default-color mb-25px">
                  <i className="line-icon-Big-Data icon-large text-white"></i>
                  <div className="feature-box-icon-hover bg-dark-gray rounded-circle"></div>
                </div>
                <div className="feature-box-content last-paragraph-no-margin">
                  <span className="d-block fs-22">무제한 저장 공간</span>
                  <p className="fs-11">
                    사랑하는 사람들의 소중한 기억을 모두 보관하세요.
                  </p>
                </div>
              </div>
            </div>

            <div className="col icon-with-text-style-03 md-mb-45px">
              <div className="feature-box">
                <div className="feature-box-icon hover-box dark-hover feature-box-icon-rounded w-100px h-100px rounded-circle bg-everlink-default-color mb-25px">
                  <i className="bi-shield-check icon-large text-white"></i>
                  <div className="feature-box-icon-hover bg-dark-gray rounded-circle"></div>
                </div>
                <div className="feature-box-content last-paragraph-no-margin">
                  <span className="d-block fs-22">데이터 보호</span>
                  <p className="fs-11">
                    에버링크를 볼 수 있는 사용자를 결정할 수 있습니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="col icon-with-text-style-03 xs-mb-45px">
              <div className="feature-box">
                <div className="feature-box-icon hover-box dark-hover feature-box-icon-rounded w-100px h-100px rounded-circle bg-everlink-default-color mb-25px">
                  <i className="ti-lock icon-large text-white"></i>
                  <div className="feature-box-icon-hover bg-dark-gray rounded-circle"></div>
                </div>
                <div className="feature-box-content last-paragraph-no-margin">
                  <span className="d-block fs-22">분실 시 보안</span>
                  <p className="fs-11">
                    에버링크를 도난당하거나 분실하면 즉시 교체할 수 있습니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="col icon-with-text-style-03">
              <div className="feature-box">
                <div className="feature-box-icon hover-box dark-hover feature-box-icon-rounded w-100px h-100px rounded-circle bg-everlink-default-color mb-25px">
                  <i className="bi-credit-card-2-back icon-large text-white"></i>
                  <div className="feature-box-icon-hover bg-dark-gray rounded-circle"></div>
                </div>
                <div className="feature-box-content last-paragraph-no-margin">
                  <span className="d-block fs-22">일회성 결제</span>
                  <p className="fs-11">
                    숨겨진 비용이나 구독이 없는 평생 서비스
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <FaqComponents />
      </section>
    </>
  );
};

export default HomePage;
