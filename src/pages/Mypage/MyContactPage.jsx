import { useState } from 'react';
import FaqComponents from '@/components/Faq/FaqComponents';
import ContactComponents from '@/components/Contact/ContactComponents';
import Modal from '@/components/common/Modal/Modal';
import { postInquiryRequest } from '@/api/guest/guestApi';
import { isValidEmail } from '@/utils/validators';
import VerticalCenterLineBg from '@/assets/images/vertical-center-line-bg.svg';

const MyContactPage = () => {
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

  return (
    <>
      <div className="col-xxl-10 col-lg-9 md-ps-15px md-mb-60px ">
        <div className="col-12 col-xl-12 col-lg-12 text-start position-relative page-title-extra-large text-decoration-line-bottom mb-3">
          <h1 className="fw-600 text-dark-gray mb-10px">문의 하기</h1>
        </div>
        <section className="p-0">
          <div className="pt-1 text-black">
            <ContactComponents
              contactUs={contactUs}
              errors={errors}
              handleSetContactUs={handleSetContactUs}
              handleSendContactUs={handleSendContactUs}
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default MyContactPage;
