import {
  Link,
  useSearchParams,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import defaultLogo from '@/assets/images/header-logo.png';

const ErrorPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const desc = queryParams.get('desc');
  const pageUrl = queryParams.get('pageUrl');
  console.log(desc, pageUrl);
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg header-light bg-white center-logo header-reverse">
          <div className="container-fluid">
            <div className="menu-logo">
              <Link to="/" className="navbar-brand ps-0 md-ps-15px">
                <img
                  src={defaultLogo}
                  data-at2x="images/demo-hotel-and-resort-logo@2x.png"
                  alt=""
                  className="default-logo"
                />
                <img
                  src={defaultLogo}
                  data-at2x="images/demo-hotel-and-resort-logo@2x.png"
                  alt=""
                  className="alt-logo"
                />
                <img
                  src={defaultLogo}
                  data-at2x="images/demo-hotel-and-resort-logo@2x.png"
                  alt=""
                  className="mobile-logo"
                />
              </Link>
            </div>
            <div className="col-auto col-xl-12 col-lg-12 menu-order">
              <div
                className="collapse navbar-collapse justify-content-between"
                id="navbarNav"
              >
                <ul className="navbar-nav navbar-left justify-content-start"></ul>
                <ul className="navbar-nav navbar-right justify-content-end">
                  <li className="nav-item">
                    <Link to="/cart" className="nav-link feature-box"></Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <section
          className="cover-background full-screen ipad-top-space-margin md-h-550px"
          // style="background-image: url(images/404-bg.jpg);"
        >
          <div className="container h-100">
            <div className="row align-items-center justify-content-center h-100">
              <div
                className="col-12 col-xl-6 col-lg-7 col-md-9 text-center"
                data-anime='{ "el": "childs", "translateY": [50, 0], "opacity": [0,1], "duration": 600, "delay": 0, "staggervalue": 300, "easing": "easeOutQuad" }'
              >
                {/* <h6 className="text-dark-gray fw-600 mb-5px text-uppercase">
                  Ooops!
                </h6> */}
                <h4 className="text-dark-gray fw-600 sm-fs-22 mb-10px ls-minus-1px mb-10">
                  {desc}
                </h4>
                {/* <p className="mb-30px lh-28 sm-mb-30px w-55 md-w-80 sm-w-95 mx-auto">
                  The resource you are looking for doesn't exist or might have
                  been removed.
                </p> */}
                <Link
                  to={pageUrl}
                  className="btn btn-large left-icon btn-rounded btn-dark-gray btn-box-shadow text-transform-none"
                >
                  <i className="fa-solid fa-arrow-left"></i>돌아가기
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ErrorPage;
