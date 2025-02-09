import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/common/Button/Button';
import { postPasswordRequest } from '@/api/guestApi';
import { isValidEmail } from '@/utils/validators';
import AboutImage1 from '@/assets/images/about-image-1.png';
import AboutImage2 from '@/assets/images/about-image-2.png';
import AboutImage3 from '@/assets/images/about-image-3.png';

import AnimatedSection from '@/components/AnimatedSection';

import VerticalCenterLineBg from '@/assets/images/vertical-center-line-bg.svg';

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
    <>
      <AnimatedSection>
        <section
          className="page-title-separate-breadcrumbs cover-background border-top border-4 border-color-base-color top-space-margin magic-cursor round-cursor"
          // style="background-image: url(https://via.placeholder.com/1920x526)"
        >
          <div className="opacity-full-dark bg-gradient-dark-transparent"></div>
          <div className="container position-relative">
            <div
              className="row align-items-start align-items-lg-end justify-content-end flex-column flex-lg-row extra-small-screen"
              data-anime='{ "el": "childs", "translateY": [15, 0], "opacity": [0,1], "duration": 400, "delay": 0, "staggervalue": 200, "easing": "easeOutQuad" }'
            >
              <div className="col-xxl-7 col-lg-6 col-md-10 position-relative page-title-large md-mb-15px xs-mb-5px">
                <h1 className="text-white fw-500 ls-minus-2px mb-0">
                  About us
                </h1>
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
          className="background-position-center background-repeat overlap-height pb-5"
          style={{ backgroundImage: `url(${VerticalCenterLineBg})` }}
        >
          <div
            className="container overlap-gap-section text-decoration-line-bottom"
            data-anime='{ "el": "childs", "translateX": [50, 0], "opacity": [0,1], "duration": 1200, "delay": 0, "staggervalue": 150, "easing": "easeOutQuad" }'
          >
            <div className="row pb-10">
              <div className="col-md-6 sm-mb-25px ">
                {/* <span className="mb-15px text-base-color fw-500 d-block">
                  Fabulous experience
                </span>
                <h3 className="text-dark-gray ls-minus-2px w-90 sm-w-100 mb-0">
                  The best people to take care of our most valuable asset is
                  you.
                </h3> */}
                <img src={AboutImage2} alt="" className="w-100" />
              </div>
              <div
                className="col-xl-5 col-md-6 offset-xl-1 last-paragraph-no-margin"
                data-anime='{ "el": "childs", "translateX": [-50, 0], "opacity": [0,1], "duration": 1200, "delay": 0, "staggervalue": 150, "easing": "easeOutQuad" }'
              >
                <h6 className="text-dark-gray mb-10px">Our Story</h6>
                <p className="w-100 lg-w-100">
                  Everlink(에버링크)는 2024년도에 시작하였습니다.
                  <br /> 지난 겨울 사랑하는 사람을 떠나보내면서 힘들 때 마다
                  <br />
                  사진을 꺼내 그 사람을 회상하며 버텨왔습니다.
                  <br />
                  추억이 담긴 사진들을 납골당 혹은 묘비에 전부 다 보관하는 것은
                  <br />
                  장소의 한계가 있다는 사실을 깨닫게 되었습니다. <br />
                  <br />
                  우리가 추구하는 Everlink(에버링크)는 <br />
                  신뢰할 수 있는 품질과 사랑하는 사람의 발자취를 평생 기억할 수
                  있는 가치,
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
        </section>

        <section
          className="cover-background position-relative overflow-visible"
          // style="background-image: url('https://via.placeholder.com/1920x796')"
        >
          <div className="container">
            <div className="row justify-content-center">
              <div
                className="col-xl-12 col-lg-10 text-center"
                data-anime='{ "el": "childs", "translateY": [50, 0], "opacity": [0,1], "duration": 1200, "delay": 0, "staggervalue": 150, "easing": "easeOutQuad" }'
              >
                <h6 className="text-dark-gray mb-10px">Our Mission</h6>
                <img src={AboutImage3} alt="" className="w-100" />
                <h5 className="alt-font text-dark-gray mb-4 xs-mb-30px w-90 xl-w-100 mx-auto"></h5>
                <p className="lg-w-100 mt-8 lh-24">
                  우리의 사명은 사랑하는 사람들이 영원히 기억되는 것입니다.
                  <br />
                  대부분 2-3세대가 지나면 사람들은 우리가 존재했다는 사실조차
                  기억하지 못할 것입니다. <br />
                  확실한 건 시간이 지나면 기억은 희미해집니다.
                  <br />
                  <br /> 우리는 사랑하는 사람을 기억하고,
                  <br />
                  그들과의 추억을 보존하고,
                  <br /> 그들을 평생 기억할 수 있는 플랫폼을 제공할 것입니다.
                </p>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </>
  );
};

export default AboutPage;
