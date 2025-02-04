import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Layout from '@/components/common/Layout';

import HomePage from '@/pages/Home/HomePage';
import AboutPage from '@/pages/About/AboutPage';
import ShopPage from '@/pages/Shop/ShopPage';
import ContactPage from '@/pages/Contact/ContactPage';
import SignInPage from '@/pages/Member/SignInPage';
import SignUpPage from '@/pages/Member/SignUpPage';
import ForgotPage from '@/pages/Password/ForgotPage';
import ProfilePage from '@/pages/Profile/ProfilePage';
import CreateProfilePage from '@/pages/Profile/CreateProfilePage';
import CartPage from '@/pages/Cart/CartPage';
import MyPage from '@/pages/Mypage/MyPage';
import CheckOutPage from './pages/Order/CheckOutPage';
import CompletePage from './pages/Order/CompletePage';
import TermsPage from '@/pages/UserTerms/TermsPage';
import PrivacyPolicyPage from '@/pages/UserTerms/PrivacyPolicyPage';

import ErrorBoundary from '@/components/common/ErrorBoundary';
import CheckPointPage from '@/pages/CheckPointPage';
import TestPage from '@/pages/TestPage';

const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/password-forgot" element={<ForgotPage />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-profile"
              element={
                <ProtectedRoute>
                  <CreateProfilePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/mypage"
              element={
                <ProtectedRoute>
                  <MyPage />
                </ProtectedRoute>
              }
            />
            {/* <Route path="/profile" element={<ProfilePage />} />
            <Route path="/create-profile" element={<CreateProfilePage />} />
            <Route path="/mypage" element={<MyPage />} /> */}

            <Route path="/contact" element={<ContactPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckOutPage />} />
            <Route path="/complete" element={<CompletePage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/check-point" element={<CheckPointPage />} />
            <Route path="/test" element={<TestPage />} />
          </Routes>
        </Layout>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
