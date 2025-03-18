import VerticalCenterLineBg from '@/assets/images/vertical-center-line-bg.svg';
import FaqComponents from '@/components/Faq/FaqComponents';

const FaqPage = () => {
  return (
    <>
      <div className="col-xxl-10 col-lg-9 md-ps-15px md-mb-60px ">
        {/* <div className="col-12 col-xl-12 col-lg-12 text-start position-relative page-title-extra-large text-decoration-line-bottom mb-3">
          <h1 className="fw-600 text-dark-gray mb-10px">내 정보 변경</h1>
          <p className="fs-16 fw-400 text-dark-gray">
            공통적인 질문사항에 대한 대답
          </p>
        </div> */}

        <section
          className="background-position-center background-repeat p-0"
          style={{ backgroundImage: `url(${VerticalCenterLineBg})` }}
        >
          <div className="row mb-5 xs-mb-7">
            <div
              className="col-md-12 text-start"
              data-anime='{ "el": "childs", "translateY": [30, 0], "opacity": [0,1], "duration": 100, "delay": 700, "staggervalue": 300, "easing": "easeOutQuad" }'
            >
              <FaqComponents />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default FaqPage;
