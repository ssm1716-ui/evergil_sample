import bgImage from '@/assets/images/vertical-center-line-bg-dark.svg';

const Footer = () => {
  //   const bgImage = './assets/images/vertical-center-line-bg-dark.svg';

  return (
    <footer
      className="bg-very-light-gray pb-50px sm-pt-20px xs-pb-30px background-repeat background-position-center sm-background-image-none"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="container">
        <div className="row overlap-section">
          <div className="col-12 text-center">
            <img
              className="rounded-circle"
              src="https://via.placeholder.com/171x171"
              alt=""
            />
          </div>
        </div>
        <div className="row justify-content-center mb-4">
          <div className="col-xl-6 col-lg-8 col-md-10 text-center">
            <h3 className="text-dark-gray alt-font ls-minus-2px fw-400 mb-40px xs-mb-30px w-80 xs-w-100 mx-auto">
              Get the amazing offers into your inbox!
            </h3>
            <div className="d-inline-block w-100 newsletter-style-03 position-relative mb-20px">
              <form
                action="email-templates/subscribe-newsletter.php"
                method="post"
                className="position-relative w-100"
              >
                <input
                  className="input-large bg-white border-color-transparent w-100 border-radius-100px box-shadow-extra-large form-control required"
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                />
                <input type="hidden" name="redirect" value="" />
                <button
                  className="btn btn-large text-dark-gray ls-0px left-icon submit text-uppercase fw-700"
                  aria-label="submit"
                >
                  <i className="icon feather icon-feather-mail icon-small text-base-color"></i>
                  <span>Subscribe</span>
                </button>
                <div className="form-results border-radius-100px pt-10px pb-10px ps-15px pe-15px fs-16 mt-10px w-100 text-center position-absolute d-none"></div>
              </form>
            </div>
            <p className="fs-16">
              We are committed to protecting your{' '}
              <a
                href="#"
                className="text-decoration-line-bottom text-dark-gray"
              >
                privacy policy.
              </a>
            </p>
          </div>
        </div>
        <div className="row row-cols-3 row-cols-lg-5 row-cols-sm-3 align-items-center justify-content-center mb-4 md-mb-50px xs-mb-40px instagram-follow-api position-relative">
          <div className="col instafeed-grid md-mb-30px xs-mb-15px">
            <figure className="border-radius-0px">
              <a href="https://www.instagram.com" target="_blank">
                <img
                  src="https://via.placeholder.com/600x600"
                  className="insta-image"
                  alt=""
                />
                <span className="insta-icon">
                  <i className="fa-brands fa-instagram"></i>
                </span>
              </a>
            </figure>
          </div>
          <div className="col instafeed-grid md-mb-30px xs-mb-15px">
            <figure className="border-radius-0px">
              <a href="https://www.instagram.com" target="_blank">
                <img
                  src="https://via.placeholder.com/600x600"
                  className="insta-image"
                  alt=""
                />
                <span className="insta-icon">
                  <i className="fa-brands fa-instagram"></i>
                </span>
              </a>
            </figure>
          </div>
          <div className="col instafeed-grid md-mb-30px xs-mb-15px">
            <figure className="border-radius-0px">
              <a href="https://www.instagram.com" target="_blank">
                <img
                  src="https://via.placeholder.com/600x600"
                  className="insta-image"
                  alt=""
                />
                <span className="insta-icon">
                  <i className="fa-brands fa-instagram"></i>
                </span>
              </a>
            </figure>
          </div>
          <div className="col instafeed-grid">
            <figure className="border-radius-0px">
              <a href="https://www.instagram.com" target="_blank">
                <img
                  src="https://via.placeholder.com/600x600"
                  className="insta-image"
                  alt=""
                />
                <span className="insta-icon">
                  <i className="fa-brands fa-instagram"></i>
                </span>
              </a>
            </figure>
          </div>
          <div className="col instafeed-grid">
            <figure className="border-radius-0px">
              <a href="https://www.instagram.com" target="_blank">
                <img
                  src="https://via.placeholder.com/600x600"
                  className="insta-image"
                  alt=""
                />
                <span className="insta-icon">
                  <i className="fa-brands fa-instagram"></i>
                </span>
              </a>
            </figure>
          </div>
          <div className="absolute-middle-center z-index-1 w-auto">
            <a
              href="https://www.instagram.com"
              target="_blank"
              className="btn btn-large btn-switch-text btn-white btn-rounded left-icon btn-box-shadow instagram-button"
            >
              <span>
                <span>
                  <i className="fa-brands fa-instagram text-base-color"></i>
                </span>
                <span className="btn-double-text" data-text="Follow crafto">
                  Follow crafto
                </span>
              </span>
            </a>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col-xl-3 col-sm-6 text-center text-sm-start last-paragraph-no-margin fs-15 order-3 order-md-1">
            <p>
              © Copyright 2024
              <a
                href="index.html"
                target="_blank"
                className="text-decoration-line-bottom text-dark-gray fw-500"
              >
                Crafto
              </a>
            </p>
          </div>
          <div className="col-xl-6 text-center lg-mt-10px sm-mt-0 sm-mb-10px order-1 order-xl-2 order-md-3">
            <ul className="footer-navbar fs-17 fw-600">
              <li className="nav-item active">
                <a href="demo-hotel-and-resort.html" className="nav-link">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="demo-hotel-and-resort-about-us.html"
                  className="nav-link"
                >
                  About us
                </a>
              </li>
              <li className="nav-item">
                <a href="demo-hotel-and-resort-rooms.html" className="nav-link">
                  Rooms
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="demo-hotel-and-resort-amenities.html"
                  className="nav-link"
                >
                  Amenities
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="demo-hotel-and-resort-bistro.html"
                  className="nav-link"
                >
                  Bistro
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="demo-hotel-and-resort-contact.html"
                  className="nav-link"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="col-xl-3 col-sm-6 position-relative text-center text-sm-end elements-social social-text-style-01 order-2 order-xl-3 xs-mb-10px">
            <ul className="fs-16 dark fw-600">
              <li>
                <a
                  className="facebook"
                  href="https://www.facebook.com/"
                  target="_blank"
                >
                  Fb.
                </a>
              </li>
              <li>
                <a
                  className="dribbble"
                  href="http://www.dribbble.com"
                  target="_blank"
                >
                  Dr.
                </a>
              </li>
              <li>
                <a
                  className="twitter"
                  href="http://www.twitter.com"
                  target="_blank"
                >
                  Tw.
                </a>
              </li>
              <li>
                <a
                  className="behance"
                  href="http://www.behance.com/"
                  target="_blank"
                >
                  Be.
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
