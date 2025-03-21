import { getFaq } from '@/api/guest/guestApi.js';
import { useEffect, useState } from 'react';
import faqImage from '@/assets/images/faq-icon.png';
import { motion } from 'framer-motion';

const FaqComponents = () => {
  // 개별 아코디언 항목의 상태를 관리하는 useState
  const [faq, setFaq] = useState([]);
  const [openIndex, setOpenIndex] = useState(0); // 기본적으로 첫 번째 항목을 열어둠

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const res = await getFaq();
        if (res.status === 200) {
          const { data } = res.data;
          setFaq(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchFaq();
  }, []);

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
        <div className="bg-linen md-p-7 border-radius-6px overflow-hidden position-relative">
          <div className="position-absolute right-70px md-right-20px top-0 w-250px sm-w-180px xs-w-150px opacity-1">
            <img src={faqImage} alt="" />
          </div>
          <div className="bg-base-color d-inline-block mb-10px fw-600 text-white text-uppercase border-radius-30px ps-20px pe-20px fs-12">
            공통 질문
          </div>
          <h6 className="fw-700 text-dark-gray ls-minus-1px pb-1 text-decoration-line-bottom">
            FAQ
          </h6>
          <div
            className="accordion accordion-style-02"
            id="accordion-style-02"
            data-active-icon="icon-feather-minus"
            data-inactive-icon="icon-feather-plus"
          >
            {(faq || []).map((f, index) => (
              <div
                key={index}
                className={`accordion-item ${
                  openIndex === index ? 'active-accordion' : ''
                }`}
              >
                <div
                  className="accordion-header border-bottom border-color-transparent-dark-very-light"
                  onClick={() => toggleAccordion(index)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="accordion-title mb-0 position-relative text-dark-gray pe-30px">
                    <i
                      className={`feather ${
                        openIndex === index
                          ? 'icon-feather-minus'
                          : 'icon-feather-plus'
                      } fs-20`}
                    ></i>
                    <span className="fs-17 fw-600">{f.question}</span>
                  </div>
                </div>
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={
                    openIndex === index
                      ? { height: 'auto', opacity: 1 }
                      : { height: 0, opacity: 0 }
                  }
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="accordion-collapse overflow-hidden"
                >
                  <div className="accordion-body last-paragraph-no-margin border-bottom border-color-transparent-dark-very-light">
                    <p
                      className="w-90 sm-w-95 xs-w-100"
                      style={{ whiteSpace: 'pre-line' }}
                    >
                      {f.answer}
                    </p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqComponents;
