import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Layout from '@/components/common/Layout';

import HomePage from '@/pages/Home/HomePage';
import AboutPage from '@/pages/About/AboutPage';
import ShopPage from '@/pages/Shop/ShopPage';
import StorePage from '@/pages/Store/StorePage';
import ContactPage from '@/pages/Contact/ContactPage';
import SignInPage from '@/pages/Member/SignInPage';
import SignUpPage from '@/pages/Member/SignUpPage';
import ForgotPage from '@/pages/Password/ForgotPage';
import ValidationPage from '@/pages/Password/ValidationPage';
import ResetPasswordPage from '@/pages/Password/ResetPasswordPage';

import BridgePage from '@/pages/Profile/BridgePage';

import ProfilePage from '@/pages/Profile/ProfilePage';
import SettingProfilePage from '@/pages/Profile/SettingProfilePage';
import EditProfilePage from '@/pages/Profile/EditProfilePage';
import ViewProfilePage from '@/pages/Profile/ViewProfilePage';
import PreviewProfilePage from '@/pages/Profile/PreviewProfilePage';
import ManagePage from '@/pages/Profile/ManagePage';

import CartPage from '@/pages/Cart/CartPage';
import MyPage from '@/pages/Mypage/MyPage';
import OrderListPage from '@/pages/Mypage/OrderListPage';
import OrderDetailPage from '@/pages/Mypage/OrderDetailPage';
import MyReviewPage from '@/pages/Mypage/MyReviewPage';
import ExchagePage from '@/pages/Mypage/ExchagePage';
import ReturnPage from '@/pages/Mypage/ReturnPage';
import MyContactPage from '@/pages/Mypage/MyContactPage';
import FaqPage from '@/pages/Mypage/FaqPage';
import MyInfoPage from '@/pages/Mypage/MyInfoPage';
import AddressPage from '@/pages/Mypage/AddressPage';
import CheckOutPage from '@/pages/Order/CheckOutPage';
import CompletePage from '@/pages/Order/CompletePage';
import TermsPage from '@/pages/UserTerms/TermsPage';
import PrivacyPolicyPage from '@/pages/UserTerms/PrivacyPolicyPage';

import ScrollToTop from '@/components/common/ScrollToTop'; // 추가3
import ErrorBoundary from '@/components/common/ErrorBoundary';
import ErrorPage from '@/pages/ErrorPage';
import CheckPointPage from '@/pages/CheckPointPage';
import TestPage from '@/pages/TestPage';
import QRScanner from '@/pages/QRScanner';
import QRCofirm from '@/pages/QRCofirm';

const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/store" element={<StorePage />} />
            <Route path="/shop/:id" element={<ShopPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/password-forgot" element={<ForgotPage />} />
            <Route path="/auth/token-validation" element={<ValidationPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckOutPage />} />
            <Route path="/complete" element={<CompletePage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/check-point" element={<CheckPointPage />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="/test" element={<TestPage />} />

            {/* <Route path="/qr" element={<QRScanner />} />
            <Route path="/qr-confirm" element={<QRCofirm />} /> */}

            {/* qr 테스트*/}
            <Route
              path="/qr"
              element={
                <ProtectedRoute>
                  <QRScanner />
                </ProtectedRoute>
              }
            />

            {/* 프로필 영역 start*/}
            <Route
              path="/qr-confirm"
              element={
                <ProtectedRoute>
                  <QRCofirm />
                </ProtectedRoute>
              }
            />

            {/* 프로필 영역 start*/}
            <Route path="/bridge-profile" element={<BridgePage />} />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route path="/setting-profile" element={<SettingProfilePage />} />
            <Route
              path="/setting-profile/:profileId"
              element={<SettingProfilePage />}
            />
            <Route
              path="/edit-profile/:profileId"
              element={
                // <ProtectedRoute>
                <EditProfilePage />
                // </ProtectedRoute>
              }
            />

            {/* <Route path="/view-profile" element={<ViewProfilePage />} /> */}
            <Route
              path="/view-profile/:profileId"
              element={<ViewProfilePage />}
            />
            <Route
              path="/preview-profile/:profileId"
              element={<PreviewProfilePage />}
            />
            <Route path="/manage-profile" element={<ManagePage />} />

            {/* 프로필 영역 end*/}

            {/* 마이페이지 영억 start*/}
            <Route
              path="/mypage"
              element={
                // <ProtectedRoute>
                <MyPage />
                // </ProtectedRoute>
              }
            >
              <Route path="order-list" element={<OrderListPage />} />
              <Route path="order-detail" element={<OrderDetailPage />} />
              <Route path="my-review" element={<MyReviewPage />} />
              <Route path="exchage" element={<ExchagePage />} />
              <Route path="return" element={<ReturnPage />} />
              <Route path="my-contact" element={<MyContactPage />} />
              <Route path="faq" element={<FaqPage />} />
              <Route path="myinfo" element={<MyInfoPage />} />
              <Route path="address" element={<AddressPage />} />
            </Route>
            {/* 마이페이지 영억 end*/}
          </Routes>
        </Layout>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
