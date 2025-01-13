import { useLocation } from 'react-router-dom';

import Header from '@/components/common/Header/Header';
import Footer from '@/components/common/Footer/Footer';

const Layout = ({ children }) => {
  const location = useLocation();

  const hideHeaderFooter = location.pathname === '/test';
  return (
    <>
      {!hideHeaderFooter && <Header />}
      <main>{children}</main>
      {!hideHeaderFooter && <Footer />}
    </>
  );
};

export default Layout;
