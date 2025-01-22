import { useState } from 'react';
import FaqComponents from '@/components/Faq/FaqComponents';
import Button from '@/components/common/Button/Button';
import { postPasswordRequest } from '@/api/guestApi';
import { isValidEmail } from '@/utils/validators';
import ContactImage from '@/assets/images/contact-image.png';

const ContactPage = () => {
  const [email, setEmail] = useState('');

  //이메일 useState 로직
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  //이메일유효성 검사체크 로직
  const handleEmailCheck = async () => {
    if (!isValidEmail(email)) {
      alert('이메일을 다시 확인 해 주세요.');
      return;
    }

    const res = await postPasswordRequest(email);

    if (res === 200) {
      alert('이메일로 전송 하였습니다.');
    }
  };

  return (
    <section>
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
                  <form>
                    <div className="row">
                      <div className="col-lg-6 col-md-6 mb-50px">
                        <label className="fs-20 fw-400 mb-10px">이름</label>
                        <input
                          className="border-radius-10px input-medium"
                          type="text"
                          aria-label="text"
                          required
                        />
                      </div>
                      <div className="col-lg-6 col-md-6 mb-50px">
                        <label className="fs-20 fw-400 mb-10px">이메일</label>
                        <input
                          className="border-radius-10px input-medium"
                          type="text"
                          aria-label="text"
                          required
                        />
                      </div>
                      <div className="col-12">
                        <label className="fs-20 fw-400 mb-10px">메세지</label>
                        <textarea
                          className="border-radius-10px textarea-medium"
                          rows="5"
                          cols="5"
                        ></textarea>
                      </div>

                      <Button
                        type="submit"
                        size="extra-large"
                        className="btn-large submit w-100 mt-60px mb-20px d-block"
                      >
                        메시지 남기기
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        <FaqComponents />
      </div>
    </section>
  );
};

export default ContactPage;
