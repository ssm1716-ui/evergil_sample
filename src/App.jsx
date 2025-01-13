import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/components/common/Layout';

import HomePage from '@/pages/Home/HomePage';
import AboutPage from '@/pages/About/AboutPage';
import ShopPage from '@/pages/Shop/ShopPage';
import ContactPage from '@/pages/Contact/ContactPage';
import SignInPage from '@/pages/Member/SignInPage';
import SignUpPage from '@/pages/Member/SignUpPage';
import ForgotPage from '@/pages/Password/ForgotPage';
import ProfilePage from '@/pages/Profile/ProfilePage';
import CartPage from '@/pages/Cart/CartPage';
import TermsPage from '@/pages/UserTerms/TermsPage';
import PrivacyPolicyPage from '@/pages/UserTerms/PrivacyPolicyPage';

import TestPage from './pages/TestPage';

const App = () => {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/forgot" element={<ForgotPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/test" element={<TestPage />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
};

export default App;
