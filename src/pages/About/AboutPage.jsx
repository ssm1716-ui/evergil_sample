import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/common/Button/Button';
import { postPasswordRequest } from '@/api/guestApi';
import { isValidEmail } from '@/utils/validators';
import AboutImage1 from '@/assets/images/about-image-1.png';
import AboutImage2 from '@/assets/images/about-image-2.png';
import AboutImage3 from '@/assets/images/about-image-3.png';

const AboutPage = () => {
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
        <img src={AboutImage1} alt="" />
      </div>
      <div>
        <section className="bg-base-white-color py-5 fs-22">
          <div className="container">
            <div className="row pt-7">
              <div className="col-12">
                <div className="row align-items-center justify-content-start g-1 text-decoration-line-bottom pb-13">
                  <div className="col-lg-5 p-0">
                    <img src={AboutImage2} alt="" className="w-100" />
                  </div>
                  <div className="col-lg-7 md-mb-30px position-relative text-dark-gray ps-50px">
                    <h4 className="fw-800 mb-7 text-light-gray">Our Story</h4>

                    <p className="lg-w-100 mb-30px lh-24">
                      Everlink(에버링크)는 2024년도에 시작하였습니다.
                      <br /> 지난 겨울 사랑하는 사람을 떠나보내면서 힘들 때 마다
                      <br />
                      사진을 꺼내 그 사람을 회상하며 버텨왔습니다.
                      <br />
                      추억이 담긴 사진들을 납골당 혹은 묘비에 전부 다 보관하는
                      것은
                      <br />
                      장소의 한계가 있다는 사실을 깨닫게 되었습니다. <br />
                      <br />
                      우리가 추구하는 Everlink(에버링크)는 <br />
                      신뢰할 수 있는 품질과 사랑하는 사람의 발자취를 평생 기억할
                      수 있는 가치,
                      <br />
                      그리고 고객과 함께 나아간다는 원칙을 통해
                      <br />
                      오늘도 진심으로 정성을 다해 움직입니다.
                      <br />
                      <br />
                      우리는 소중한 순간들을 우리의 마음 속에
                      <br />
                      영원히 남을 기억으로 바꾸고자 노력합니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row pt-12">
              <div className="col-12">
                <div className="row text-center pb-15">
                  <div className="col-lg-12 md-mb-30px text-dark-gray p-0">
                    <h4 className="fw-800 mb-3 text-light-gray">Our Mission</h4>
                    <div className="col-lg-12">
                      <img src={AboutImage3} alt="" className="w-100" />
                    </div>

                    <p className="lg-w-100 mt-8 lh-24">
                      우리의 사명은 사랑하는 사람들이 영원히 기억되는 것입니다.
                      <br />
                      대부분 2-3세대가 지나면 사람들은 우리가 존재했다는
                      사실조차 기억하지 못할 것입니다. <br />
                      확실한 건 시간이 지나면 기억은 희미해집니다.
                      <br />
                      <br /> 우리는 사랑하는 사람을 기억하고,
                      <br />
                      그들과의 추억을 보존하고,
                      <br /> 그들을 평생 기억할 수 있는 플랫폼을 제공할
                      것입니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default AboutPage;
