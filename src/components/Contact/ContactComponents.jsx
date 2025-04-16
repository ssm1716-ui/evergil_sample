import Button from '@/components/common/Button/Button';

const ContactComponents = ({
  contactUs,
  errors,
  handleSetContactUs,
  handleSendContactUs,
}) => {
  return (
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
          className="ps-0 md-py-0 border-radius-0px border-color-dark-gray bg-transparent form-control required"
          id="exampleInputEmail1"
          type="text"
          name="writerName"
          value={contactUs.writerName}
          onChange={handleSetContactUs}
          placeholder="이름을 작성 해주세요."
        />
      </div>
      {errors.writerName && <p className="text-danger">{errors.writerName}</p>}

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
          className="ps-0 md-py-0 border-radius-0px border-color-dark-gray bg-transparent form-control required"
          id="exampleInputEmail2"
          type="email"
          name="writerEmail"
          value={contactUs.writerEmail}
          onChange={handleSetContactUs}
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
          className="ps-0 md-py-0 border-radius-0px border-color-dark-gray bg-transparent form-control required"
          name="message"
          value={contactUs.message}
          onChange={handleSetContactUs}
          placeholder="문의사항 내용을 작성 해주세요."
          rows="3"
        ></textarea>
        <span className="form-icon">
          <i className="bi bi-chat-square-dots"></i>
        </span>
      </div>
      {errors.message && <p className="text-danger">{errors.message}</p>}

      <div className="row mt-25px md-mt-0 align-items-center">
        <div className="col-xl-7 col-lg-12 col-sm-7 lg-mb-30px md-mb-0"></div>
        <div className="col-xl-5 col-lg-12 col-sm-5 text-center text-sm-end text-lg-start text-xl-end md-mt-30px">
          <input
            id="exampleInputEmail3"
            type="hidden"
            name="redirect"
            value=""
          />
          <Button
            radiusOn="radius-on"
            className="btn btn-base-color btn-medium btn-round-edge btn-box-shadow text-uppercase submit"
            onClick={handleSendContactUs}
          >
            메시지 남기기
          </Button>
        </div>
        <div className="col-12 form-results d-none mt-20px mb-0"></div>
      </div>
    </form>
  );
};

export default ContactComponents;
