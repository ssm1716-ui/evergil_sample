import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/common/Button/Button';
import { postPasswordRequest } from '@/api/guest/guestApi';
import { isValidEmail } from '@/utils/validators';
import AboutImage1 from '@/assets/images/about-image-1.png';
import AboutImage2 from '@/assets/images/about-image-2.png';
import AboutImage3 from '@/assets/images/about-image-3.png';

import AnimatedSection from '@/components/AnimatedSection';

import VerticalCenterLineBg from '@/assets/images/vertical-center-line-bg.svg';
import aboutUsImage from '@/assets/images/about_us.png';

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
      <section className="page-title-separate-breadcrumbs cover-background top-space-margin magic-cursor round-cursor pb-0 text-center">
        {/* <div className="opacity-full-dark bg-gradient-dark-transparent"></div> */}
        <div className="container position-relative">
          <div
            className="row align-items-start align-items-lg-end justify-content-end flex-column flex-lg-row"
            data-anime='{ "el": "childs", "translateY": [15, 0], "opacity": [0,1], "duration": 400, "delay": 0, "staggervalue": 200, "easing": "easeOutQuad" }'
          >
            <div className="col-12 position-relative page-title-large md-mb-15px xs-mb-5px">
              <img
                src={aboutUsImage}
                alt="about_us"
                className="about_us_logo"
              />
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
            <div className="col-lg-5 col-sm-12 sm-mb-25px text-md-center">
              <img
                src={AboutImage2}
                alt=""
                className="w-100 about-img1 md-w-50 sm-w-100"
              />
            </div>
            <div
              className="col-xl-6 col-sm-12 offset-xl-1 last-paragraph-no-margin"
              data-anime='{ "el": "childs", "translateX": [-50, 0], "opacity": [0,1], "duration": 1200, "delay": 0, "staggervalue": 150, "easing": "easeOutQuad" }'
            >
              <h6 className="text-dark-gray mb-10px md-fs-28 text-md-center text-sm-center">
                Our Story
              </h6>
              <p className="w-100 lg-w-100 fs-18 md-fs-16 sm-fs-14 text-lg-start text-md-center text-sm-center text-keep-all">
                에버링크는 사랑하는 가족, 친구, 반려동물을 마음속에 오래도록
                간직할 수 있도록 돕는 공간입니다.
                <br /> 사랑하는 사람을 떠나보낸 후 기억들을 좀 더 오래, 좀 더
                의미 있게 간직하고 싶다는 바람에서 시작되었습니다.
                <br />그 마음으로 만든 것이 바로 에버링크의 “메모리태그” 입니다.
                <br />
                5cm x 5cm의 견고한 양극산화 알루미늄 명판에는 QR 코드가 새겨져
                있으며
                <br />
                이를 스캔하면 사진, 가족관계도, 하늘편지를 남길 수 있는 디지털
                추모 공간으로 연결됩니다.
                <br />
                에버링크는 2024년에 시작되어 지금까지, 추억을 지키는 가장 진심
                어린 방법을 고민해왔습니다.
                <br />
                납골당, 묘비, 혹은 가정에서 언제 어디서나 사랑하는 사람을 기억할
                수 있도록 정성과 품질을 담아 제작했습니다.
                <br />
                에버링크는 사랑을 추모하고, 기억을 공유하며, 세대를 넘어 마음을
                잇는 다리입니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cover-background position-relative overflow-visible pt-0 pb-150px">
        <div className="container">
          <div className="row justify-content-center">
            <div
              className="col-xl-12 col-lg-10 text-center"
              data-anime='{ "el": "childs", "translateY": [50, 0], "opacity": [0,1], "duration": 1200, "delay": 0, "staggervalue": 150, "easing": "easeOutQuad" }'
            >
              <h6 className="text-dark-gray mb-10px md-fs-28">Our Mission</h6>
              <img src={AboutImage3} alt="" className="w-100" />
              <h5 className="text-dark-gray mb-4 xs-mb-30px w-90 xl-w-100 mx-auto"></h5>
              <p className="lg-w-100 mt-8 lh-24 fs-18 md-fs-16 sm-fs-14  md-lh-30 text-keep-all">
                에버링크의 사명은 사랑하는 사람의 기억을 의미 있게,
                <br />
                오래도록 간직할 수 있도록 돕는 것입니다.
                <br />
                <br />
                전통적인 방식의 추모에는 한계가 있습니다.
                <br />
                사진은 바래고, 공간은 부족하며, 시간이 지나면 기억도 점점
                흐려집니다.
                <br />
                하지만 기억은 그 어떤 것보다 소중하기에, 더 나은 방법이
                필요했습니다.
                <br />
                <br />
                에버링크는 단순한 QR 명판이 아닙니다.
                <br />
                언제든지 스캔 한 번으로, 그 사람의 삶과 이야기,
                <br />
                가족의 사랑을 디지털 공간에 남길 수 있는 추모 플랫폼입니다.
                <br />
                <br />
                지금,사랑하는 사람의 이야기를 영원히 담을 수 있는 에버링크와
                함께하세요.
                <br /> 기억을 간직하는 가장 따뜻한 방법이 되어드리겠습니다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
