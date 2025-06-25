import { useState } from 'react';
import FaqComponents from '@/components/Faq/FaqComponents';
import ContactComponents from '@/components/Contact/ContactComponents';
import Modal from '@/components/common/Modal/Modal';
import { postInquiryRequest } from '@/api/guest/guestApi';
import { isValidEmail } from '@/utils/validators';
import VerticalCenterLineBg from '@/assets/images/vertical-center-line-bg.svg';

import everlinkTop from '@/assets/images/everlink-top.png';

const ContactPage = () => {
  const initialFormState = { writerName: '', writerEmail: '', message: '' };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactUs, setContactUs] = useState(initialFormState);
  const [errors, setErrors] = useState(initialFormState);

  //문의하기 정보 set
  const handleSetContactUs = (e) => {
    const { name, value } = e.target;
    setContactUs({
      ...contactUs,
      [name]: value,
    });

    // 실시간 유효성 검사
    if (value.trim() === '') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `${
          name === 'writerName'
            ? '이름을'
            : name === 'writerEmail'
              ? '이메일을'
              : '메시지를'
        } 입력해 주세요.`,
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    }

    if (name === 'writerEmail' && value && !isValidEmail(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        writerEmail: '올바른 이메일 주소를 입력해 주세요.',
      }));
    }
  };

  //문의사항 유효성 체크 후 전송
  const handleSendContactUs = async (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!contactUs.writerName.trim())
      newErrors.writerName = '이름을 입력해 주세요.';
    if (!contactUs.writerEmail.trim())
      newErrors.writerEmail = '이메일을 입력해 주세요.';
    if (contactUs.writerEmail && !isValidEmail(contactUs.writerEmail))
      newErrors.writerEmail = '올바른 이메일 주소를 입력해 주세요.';
    if (!contactUs.message.trim())
      newErrors.message = '메시지를 입력해 주세요.';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const res = await postInquiryRequest(contactUs);
    if (res === 201) {
      setIsModalOpen(true);
      setContactUs(initialFormState);
    }
  };

  // 모달 닫기 시 유효성 체크 초기화
  const handleModalClose = () => {
    setIsModalOpen(false);
    setContactUs(initialFormState); // 유효성 체크 로직 초기화
    setErrors({});
    
    // is-valid 클래스 제거
    const inputs = document.querySelectorAll('.contact-form-style-03 input, .contact-form-style-03 textarea');
    inputs.forEach(input => {
      input.classList.remove('is-valid', 'is-invalid');
    });
  };

  return (
    <>
      <section
        className="page-title-separate-breadcrumbs cover-background top-space-margin magic-cursor round-cursor text-center"
      >
        <div className="container position-relative">
          <div
            className="row align-items-start align-items-lg-end justify-content-end flex-column flex-lg-row"
            data-anime='{ "el": "childs", "translateY": [15, 0], "opacity": [0,1], "duration": 400, "delay": 0, "staggervalue": 200, "easing": "easeOutQuad" }'
          >
            <div className="col-12 position-relative page-title-large md-mb-15px xs-mb-5px">
              <img src={everlinkTop} alt="everlinkTop" />
            </div>
          </div>
        </div>
      </section>

      <section
        className="background-position-center background-repeat position-relative py-0"
        style={{ backgroundImage: `url(${VerticalCenterLineBg})` }}
      >
        <div className="container position-relative">
          <div className="row g-0">
            <div
              className="col-lg-12 md-mb-50px"
              data-anime='{ "el": "childs", "translateY": [0, 0], "opacity": [0,1], "duration": 1200, "delay": 0, "staggervalue": 150, "easing": "easeOutQuad" }'
            >
              {/* <h4 className="text-dark-gray ls-minus-2px mb-5px sm-fs-32">
                문의사항
              </h4> */}
              <h4 className="fw-700 text-dark-gray ls-minus-1px mb-5px">
                문의사항
              </h4>
              <span className="d-block text-base-color fw-500 mb-25px sm-fs-14">
                문의사항은 메세지로 남겨주세요
              </span>
              <ContactComponents
                contactUs={contactUs}
                errors={errors}
                handleSetContactUs={handleSetContactUs}
                handleSendContactUs={handleSendContactUs}
              />
            </div>
          </div>
        </div>
      </section>

      <section
        className="background-position-center background-repeat position-relative md-py-0"
        style={{ backgroundImage: `url(${VerticalCenterLineBg})` }}
      >
        <div className="container position-relative">
          <div className="row g-0">
            <div
              className="col-lg-12 md-mb-50px"
              data-anime='{ "el": "childs", "translateY": [30, 0], "opacity": [0,1], "duration": 100, "delay": 700, "staggervalue": 300, "easing": "easeOutQuad" }'
            >
              <FaqComponents />
            </div>
          </div>
        </div>
      </section>

      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <div className="w-100 h-50 md-h-50 sm-h-100">
          <div className="modal-content p-0 rounded shadow-lg">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="p-10 sm-p-7 bg-white">
                  <div className="row justify-content-center">
                    <div className="col-md-9 text-center">
                      <h6 className="text-dark-gray fw-500 mb-15px fs-22 md-fs-18">
                        전송되었습니다.
                      </h6>
                    </div>
                    <div className="col-lg-12 text-center text-lg-center pt-3">
                      <input type="hidden" name="redirect" value="" />
                      <button
                        className="btn btn-white btn-large btn-box-shadow btn-round-edge submit me-1"
                        onClick={handleModalClose}
                      >
                        확인
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ContactPage;
