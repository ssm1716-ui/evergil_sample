import { useState } from 'react';
import FaqComponents from '@/components/Faq/FaqComponents';
import ContactComponents from '@/components/Contact/ContactComponents';
import Modal from '@/components/common/Modal/Modal';
import { postInquiryRequest } from '@/api/guestApi';
import { isValidEmail } from '@/utils/validators';
import ContactImage from '@/assets/images/contact-image.png';
import VerticalCenterLineBg from '@/assets/images/vertical-center-line-bg.svg';

const ContactPage = () => {
  const initialFormState = { writerName: '', writerEmail: '', message: '' };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactUs, setContactUs] = useState(initialFormState);
  const [errors, setErrors] = useState(initialFormState);

  //문의하기 정보 set
  const handleSetContantUs = (e) => {
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
  const handleSendContantUs = async (e) => {
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

  return (
    <>
      {/* <section>
          <div className="mt-10 mb-minus-100px md-mb-minus-50px ls-minus-8px text-center">
            <img src={ContactImage} alt="" />
          </div>
          <div>
            <section className="bg-base-white-color py-5">
              <div className="container">
                <div className="row row-cols-1 row-cols-lg-2 row-cols-md-1 g-0 justify-content-center overflow-hidden text-dark">
                  <div className="col-lg-12 md-pe-15px md-mb-50px xs-mb-35px">
                    <div className="mt-5">
                      <div className="text-center">
                        <h3 className="fs-48 fw-600 ls-minus-1px">문의사항</h3>
                        <h6 className="fs-20 fw-400 mb-10 ls-minus-1px">
                          문의사항은 메세지로 남겨주세요.
                        </h6>
                      </div>
                      <ContactComponents />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section> */}

      <section
        className="page-title-separate-breadcrumbs cover-background border-top border-4 border-color-base-color top-space-margin magic-cursor round-cursor"
        // style="background-image: url(https://via.placeholder.com/1920x525)"
      >
        <div className="opacity-full-dark bg-gradient-dark-transparent"></div>
        <div className="container position-relative">
          <div
            className="row align-items-start align-items-lg-end justify-content-end flex-column flex-lg-row extra-small-screen"
            data-anime='{ "el": "childs", "translateY": [15, 0], "opacity": [0,1], "duration": 400, "delay": 0, "staggervalue": 200, "easing": "easeOutQuad" }'
          >
            <div className="col-xxl-7 col-lg-6 col-md-10 position-relative page-title-large md-mb-15px xs-mb-5px">
              <h1 className="text-white fw-500 ls-minus-2px mb-0">Contact</h1>
            </div>
            <div className="col-xxl-5 col-lg-6 col-md-10 last-paragraph-no-margin">
              {/* <p className="fs-20 text-white opacity-7 md-w-80 sm-w-100">
                  We are happy to offer our guests a truly fabulous experience
                  of a relaxing and memorable.
                </p> */}
            </div>
          </div>
        </div>
      </section>

      <section
        className="background-position-center background-repeat position-relative"
        style={{ backgroundImage: `url(${VerticalCenterLineBg})` }}
      >
        <div className="container position-relative">
          <div className="row g-0">
            <div
              className="col-lg-12 md-mb-50px"
              data-anime='{ "el": "childs", "translateY": [0, 0], "opacity": [0,1], "duration": 1200, "delay": 0, "staggervalue": 150, "easing": "easeOutQuad" }'
            >
              <h4 className="text-dark-gray ls-minus-2px mb-5px">문의사항</h4>
              <span className="d-block text-base-color fw-500 mb-25px">
                문의사항은 메세지로 남겨주세요
              </span>
              <form className="contact-form-style-03">
                <label
                  htmlFor="exampleInputEmail1"
                  className="form-label fs-14 text-uppercase text-dark-gray fw-600 mb-0"
                >
                  이름
                </label>
                <div className="position-relative form-group mb-5px">
                  <span className="form-icon">
                    <i className="bi bi-emoji-smile"></i>
                  </span>
                  <input
                    className="ps-0 border-radius-0px border-color-dark-gray bg-transparent form-control required"
                    id="exampleInputEmail1"
                    type="text"
                    name="writerName"
                    value={contactUs.writerName}
                    onChange={handleSetContantUs}
                    placeholder="이름을 작성 해주세요."
                  />
                </div>
                {errors.writerName && (
                  <p className="text-danger">{errors.writerName}</p>
                )}

                <label
                  htmlFor="exampleInputEmail1"
                  className="form-label fs-14 text-uppercase text-dark-gray fw-600 mb-0"
                >
                  이메일
                </label>
                <div className="position-relative form-group mb-5px">
                  <span className="form-icon">
                    <i className="bi bi-envelope"></i>
                  </span>
                  <input
                    className="ps-0 border-radius-0px border-color-dark-gray bg-transparent form-control required"
                    id="exampleInputEmail2"
                    type="email"
                    name="writerEmail"
                    value={contactUs.writerEmail}
                    onChange={handleSetContantUs}
                    placeholder="이메일주소를 작성 해주세요."
                  />
                </div>
                {errors.writerEmail && (
                  <p className="text-danger">{errors.writerEmail}</p>
                )}

                <label
                  htmlFor="exampleInputEmail1"
                  className="form-label fs-14 text-uppercase text-dark-gray fw-600 mb-0"
                >
                  메시지
                </label>
                <div className="position-relative form-group form-textarea mb-5px">
                  <textarea
                    className="ps-0 border-radius-0px border-color-dark-gray bg-transparent form-control required"
                    name="message"
                    value={contactUs.message}
                    onChange={handleSetContantUs}
                    placeholder="문의사항 내용을 작성 해주세요."
                    rows="3"
                  ></textarea>
                  <span className="form-icon">
                    <i className="bi bi-chat-square-dots"></i>
                  </span>
                </div>
                {errors.message && (
                  <p className="text-danger">{errors.message}</p>
                )}

                <div className="row mt-25px align-items-center">
                  <div className="col-xl-7 col-lg-12 col-sm-7 lg-mb-30px md-mb-0">
                    {/* <p className="mb-0 fs-14 lh-22 text-center text-sm-start">
                        We will never collect information about you without your
                        explicit consent.
                      </p> */}
                  </div>
                  <div className="col-xl-5 col-lg-12 col-sm-5 text-center text-sm-end text-lg-start text-xl-end xs-mt-25px">
                    <input
                      id="exampleInputEmail3"
                      type="hidden"
                      name="redirect"
                      value=""
                    />
                    <button
                      className="btn btn-base-color btn-small btn-round-edge btn-box-shadow text-uppercase submit"
                      onClick={handleSendContantUs}
                    >
                      메시지 남기기
                    </button>
                  </div>
                  <div className="col-12 form-results d-none mt-20px mb-0"></div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section
        className="background-position-center background-repeat"
        style={{ backgroundImage: `url(${VerticalCenterLineBg})` }}
      >
        <div className="container">
          <div className="row justify-content-center mb-5 xs-mb-7">
            <div
              className="col-md-12 text-start"
              data-anime='{ "el": "childs", "translateY": [30, 0], "opacity": [0,1], "duration": 100, "delay": 700, "staggervalue": 300, "easing": "easeOutQuad" }'
            >
              <FaqComponents />
            </div>
          </div>
        </div>
      </section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="w-40">
          <div className="modal-content p-0 rounded shadow-lg">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="p-10 sm-p-7 bg-white">
                  <div className="row justify-content-center">
                    <div className="col-md-9 text-center">
                      <h6 className="text-dark-gray fw-500 mb-15px">
                        전송되었습니다.
                      </h6>
                    </div>
                    <div className="col-lg-12 text-center text-lg-center pt-3">
                      <input type="hidden" name="redirect" value="" />
                      <button
                        className="btn btn-white btn-large btn-box-shadow btn-round-edge submit me-1"
                        onClick={() => setIsModalOpen(false)}
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
