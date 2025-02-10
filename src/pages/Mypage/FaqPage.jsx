import VerticalCenterLineBg from '@/assets/images/vertical-center-line-bg.svg';
import AnimatedSection from '@/components/AnimatedSection';
import FaqComponents from '@/components/Faq/FaqComponents';

const FaqPage = () => {
  return (
    <>
      <div className="col-xxl-10 col-lg-9 md-ps-15px md-mb-60px">
        <h6 className="fs-40 fw-400  border-bottom border-2 border-black text-start text-black">
          FAQ
          <p className="fs-16 fw-400 text-dark-gray">
            공통적인 질문사항에 대한 대답
          </p>
        </h6>

        <section
          className="background-position-center background-repeat p-0"
          style={{ backgroundImage: `url(${VerticalCenterLineBg})` }}
        >
          <div className="row mb-5 xs-mb-7">
            <div
              className="col-md-12 text-start"
              // data-anime='{ "el": "childs", "translateY": [30, 0], "opacity": [0,1], "duration": 100, "delay": 700, "staggervalue": 300, "easing": "easeOutQuad" }'
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
