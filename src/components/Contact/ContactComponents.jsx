import Button from '@/components/common/Button/Button';
import { useState } from 'react';

const ContactComponents = ({ message }) => {
  const [isMypage, setMypage] = useState(false);

  return (
    <>
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
          <div className="col-12 text-center">
            {isMypage ? (
              <Button
                type="submit"
                size="extra-large"
                className="btn-large submit w-100 mt-60px mb-20px d-block"
              >
                메시지 남기기
              </Button>
            ) : (
              <Button
                type="submit"
                radiusOn="radius-on"
                size="extra-large"
                className="btn-large submit w-30 mt-60px mb-20px d-block text-center"
              >
                문의 하기
              </Button>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default ContactComponents;
