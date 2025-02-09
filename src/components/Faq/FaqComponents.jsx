import { useState } from 'react';
import faqImage from '@/assets/images/faq-icon.png';

const FaqComponents = () => {
  // 개별 아코디언 항목의 상태를 관리하는 useState
  const [openIndex, setOpenIndex] = useState(0); // 기본적으로 첫 번째 항목을 열어둠

  // 아코디언 토글 함수
  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index); // 같은 인덱스면 닫고, 다르면 열기
  };
  return (
    <div
      className="row align-items-center"
      data-anime='{ "translateY": [0, 0], "opacity": [0,1], "duration": 600, "delay": 0, "staggervalue": 300, "easing": "easeOutQuad" }'
    >
      <div className="col-12">
        <div className="bg-linen p-9 md-p-7 border-radius-6px overflow-hidden position-relative">
          <div className="position-absolute right-70px md-right-20px top-0 w-250px sm-w-180px xs-w-150px opacity-1">
            <img src={faqImage} alt="" />
          </div>
          <div className="bg-base-color d-inline-block mb-20px fw-600 text-white text-uppercase border-radius-30px ps-20px pe-20px fs-12">
            공통 질문
          </div>
          <h3 className="fw-700 text-dark-gray ls-minus-1px">FAQ</h3>
          <div
            className="accordion accordion-style-02"
            id="accordion-style-02"
            data-active-icon="icon-feather-minus"
            data-inactive-icon="icon-feather-plus"
          >
            <div
              className={`accordion-item ${
                openIndex === 0 ? 'active-accordion' : ''
              }`}
            >
              <div className="accordion-header border-bottom border-color-transparent-dark-very-light">
                <a
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#accordion-style-02-01"
                  data-bs-parent="#accordion-style-02"
                  onClick={() => toggleAccordion(0)}
                  aria-expanded={openIndex === 0}
                >
                  <div className="accordion-title mb-0 position-relative text-dark-gray pe-30px">
                    <i
                      className={`feather ${
                        openIndex === 0
                          ? 'icon-feather-minus'
                          : 'icon-feather-plus'
                      } fs-20`}
                    ></i>
                    <span className="fs-17 fw-600">치수가 어떻게 되나요?</span>
                  </div>
                </a>
              </div>
              <div
                id="accordion-style-02-01"
                className="accordion-collapse collapse show"
                data-bs-parent="#accordion-style-02"
              >
                <div className="accordion-body last-paragraph-no-margin border-bottom border-color-transparent-dark-very-light">
                  <p className="w-90 sm-w-95 xs-w-100">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    eiusmod tempor incididunt ut labore et dolore magna aliqua
                    enim ad minim veniam, quis nostrud exercitation.
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`accordion-item ${
                openIndex === 1 ? 'active-accordion' : ''
              }`}
            >
              <div className="accordion-header border-bottom border-color-transparent-dark-very-light">
                <a
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#accordion-style-02-02"
                  data-bs-parent="#accordion-style-02"
                  onClick={() => toggleAccordion(1)}
                  aria-expanded={openIndex === 1}
                >
                  <div className="accordion-title mb-0 position-relative text-dark-gray pe-30px">
                    <i
                      className={`feather ${
                        openIndex === 1
                          ? 'icon-feather-minus'
                          : 'icon-feather-plus'
                      } fs-20`}
                    ></i>
                    <span className="fs-17 fw-600">
                      구매시 포함되는 내용은 무엇인가요?
                    </span>
                  </div>
                </a>
              </div>
              <div
                id="accordion-style-02-02"
                className="accordion-collapse collapse"
                data-bs-parent="#accordion-style-02"
              >
                <div className="accordion-body last-paragraph-no-margin border-bottom border-color-transparent-dark-very-light">
                  <p className="w-90 sm-w-95 xs-w-100">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    eiusmod tempor incididunt ut labore et dolore magna aliqua
                    enim ad minim veniam, quis nostrud exercitation.
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`accordion-item ${
                openIndex === 2 ? 'active-accordion' : ''
              }`}
            >
              <div className="accordion-header border-bottom border-color-transparent">
                <a
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#accordion-style-02-03"
                  data-bs-parent="#accordion-style-02"
                  onClick={() => toggleAccordion(2)}
                  aria-expanded={openIndex === 2}
                >
                  <div className="accordion-title mb-0 position-relative text-dark-gray pe-30px">
                    <i
                      className={`feather ${
                        openIndex === 2
                          ? 'icon-feather-minus'
                          : 'icon-feather-plus'
                      } fs-20`}
                    ></i>
                    <span className="fs-17 fw-600">
                      지속적인 수수료가 있나요?
                    </span>
                  </div>
                </a>
              </div>
              <div
                id="accordion-style-02-03"
                className="accordion-collapse collapse"
                data-bs-parent="#accordion-style-02"
              >
                <div className="accordion-body last-paragraph-no-margin border-bottom border-color-transparent">
                  <p className="w-90 sm-w-95 xs-w-100">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    eiusmod tempor incididunt ut labore et dolore magna aliqua
                    enim ad minim veniam, quis nostrud exercitation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqComponents;
