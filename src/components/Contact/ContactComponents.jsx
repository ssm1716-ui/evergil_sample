import Button from '@/components/common/Button/Button';
import { useState } from 'react';
import VerticalCenterLineBg from '@/assets/images/vertical-center-line-bg.svg';
import AnimatedSection from '@/components/AnimatedSection';

const ContactComponents = ({ message }) => {
  const [isMypage, setMypage] = useState(false);

  return (
    <>
      <AnimatedSection>
        <section
          className="background-position-center background-repeat position-relative p-0"
          style={{ backgroundImage: `url(${VerticalCenterLineBg})` }}
        >
          <div className="container position-relative m-0">
            <div className="row g-0">
              <div
                className="col-lg-12 md-mb-50px"
                data-anime='{ "el": "childs", "translateY": [0, 0], "opacity": [0,1], "duration": 1200, "delay": 0, "staggervalue": 150, "easing": "easeOutQuad" }'
              >
                <form className="contact-form-style-03">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label fs-14 text-uppercase text-dark-gray fw-600 mb-0"
                  >
                    이름
                  </label>
                  <div className="position-relative form-group mb-20px">
                    <span className="form-icon">
                      <i className="bi bi-emoji-smile"></i>
                    </span>
                    <input
                      className="ps-0 border-radius-0px border-color-dark-gray bg-transparent form-control required"
                      id="exampleInputEmail1"
                      type="text"
                      name="name"
                      placeholder="이름을 작성 해주세요."
                    />
                  </div>
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label fs-14 text-uppercase text-dark-gray fw-600 mb-0"
                  >
                    이메일
                  </label>
                  <div className="position-relative form-group mb-20px">
                    <span className="form-icon">
                      <i className="bi bi-envelope"></i>
                    </span>
                    <input
                      className="ps-0 border-radius-0px border-color-dark-gray bg-transparent form-control required"
                      id="exampleInputEmail2"
                      type="email"
                      name="email"
                      placeholder="이메일주소를 작성 해주세요."
                    />
                  </div>
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label fs-14 text-uppercase text-dark-gray fw-600 mb-0"
                  >
                    메시지
                  </label>
                  <div className="position-relative form-group form-textarea mb-0">
                    <textarea
                      className="ps-0 border-radius-0px border-color-dark-gray bg-transparent form-control"
                      name="comment"
                      placeholder="문의사항 내용을 작성 해주세요."
                      rows="3"
                    ></textarea>
                    <span className="form-icon">
                      <i className="bi bi-chat-square-dots"></i>
                    </span>
                  </div>
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
                        type="submit"
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
      </AnimatedSection>
    </>
  );
};

export default ContactComponents;
