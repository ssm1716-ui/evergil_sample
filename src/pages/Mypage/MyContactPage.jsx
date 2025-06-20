import { useState } from 'react';
import FaqComponents from '@/components/Faq/FaqComponents';
import ContactComponents from '@/components/Contact/ContactComponents';
import Modal from '@/components/common/Modal/Modal';
import useIsMobile from '@/hooks/useIsMobile';
import { postInquiryRequest } from '@/api/guest/guestApi';
import { isValidEmail } from '@/utils/validators';
import everlinkTop from '@/assets/images/everlink-top.jpeg';
import everlinkTopMobile from '@/assets/images/everlink-top-mobile.jpeg';

const MyContactPage = () => {
  const initialFormState = { writerName: '', writerEmail: '', message: '' };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactUs, setContactUs] = useState(initialFormState);
  const [errors, setErrors] = useState(initialFormState);
  const isMobile = useIsMobile();

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

  return (
    <>
      <div className="col-xxl-10 col-lg-9 md-ps-15px">
        <section className="page-title-separate-breadcrumbs cover-background magic-cursor round-cursor text-center p-0 pb-5 mt-0">
          <div className="container position-relative">
            <div
              className="row align-items-start align-items-lg-end justify-content-end flex-column flex-lg-row"
              data-anime='{ "el": "childs", "translateY": [15, 0], "opacity": [0,1], "duration": 400, "delay": 0, "staggervalue": 200, "easing": "easeOutQuad" }'
            >
              <div className="col-12 position-relative page-title-large md-mb-15px xs-mb-5px">
                <img
                  src={isMobile ? everlinkTopMobile : everlinkTop}
                  alt="everlinkTop"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="background-position-center background-repeat position-relative py-0">
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
      </div>
    </>
  );
};

export default MyContactPage;
