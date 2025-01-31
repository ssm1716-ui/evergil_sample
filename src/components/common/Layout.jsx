import { useLocation } from 'react-router-dom';

import Header from '@/components/common/Header/Header';
import Footer from '@/components/common/Footer/Footer';

const Layout = ({ children }) => {
  const location = useLocation();

  // 특정 경로에서 Header와 Footer를 숨김
  const hideLayout = ['/check-point', '/test'].includes(location.pathname);

  return (
    <>
      {!hideLayout && <Header />}
      <main>{children}</main>
      {!hideLayout && <Footer />}
    </>
  );
};

export default Layout;
