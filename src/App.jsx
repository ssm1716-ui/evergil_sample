import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ProtectedRoute from './ProtectedRoute';
import Layout from '@/components/common/Layout';
import MetaTags from '@/components/common/MetaTags';

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
import InvitationPage from '@/pages/Profile/InvitationPage';

import ProfilePage from '@/pages/Profile/ProfilePage';
import SettingProfilePage from '@/pages/Profile/SettingProfilePage';

// ✅ 새로 통합된 프로필 페이지
import UnifiedProfilePage from '@/pages/Profile/UnifiedProfilePage';

// 🔥 기존 3개 파일은 주석 처리 (나중에 삭제 예정)
// import EditProfilePage from '@/pages/Profile/EditProfilePage';
// import ViewProfilePage from '@/pages/Profile/ViewProfilePage';
import PreviewProfilePage from '@/pages/Profile/PreviewProfilePage';

import ManagePage from '@/pages/Profile/ManagePage';
import ProfileInactiveErrorPage from '@/pages/Profile/ProfileInactiveErrorPage';
import ProfileNotFoundPage from '@/pages/Profile/ProfileNotFoundPage';

import CartPage from '@/pages/Cart/CartPage';
import MyPage from '@/pages/Mypage/MyPage';
import OrderListPage from '@/pages/Mypage/OrderListPage';
import OrderDetailPage from '@/pages/Mypage/OrderDetailPage';
import MyReviewPage from '@/pages/Mypage/MyReviewPage';
import ExchangePage from '@/pages/Mypage/ExchangePage';
import ReturnPage from '@/pages/Mypage/ReturnPage';
import MyContactPage from '@/pages/Mypage/MyContactPage';
import FaqPage from '@/pages/Mypage/FaqPage';
import MyInfoPage from '@/pages/Mypage/MyInfoPage';
import AddressPage from '@/pages/Mypage/AddressPage';
import CheckOutPage from '@/pages/Order/CheckOutPage';
import PaymentResultPage from '@/pages/Order/PaymentResultPage';
import PaymentErrorPage from '@/pages/Order/PaymentErrorPage';
import CompletePage from '@/pages/Order/CompletePage';
import TermsPage from '@/pages/UserTerms/TermsPage';
import PrivacyPolicyPage from '@/pages/UserTerms/PrivacyPolicyPage';

import ScrollToTop from '@/components/common/ScrollToTop';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import AuthRedirect from '@/components/common/AuthRedirect';
import ErrorPage from '@/pages/ErrorPage';
import CheckPointPage from '@/pages/CheckPointPage';
import SnsSignUpPage from '@/pages/Member/SnsSignUpPage';
import TestPage from '@/pages/TestPage';
import QRScanner from '@/pages/QRScanner';
import QRCofirm from '@/pages/QRCofirm';
import ImageCompressor from '@/pages/ImageCompressor';

const App = () => {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <Router>
          <ScrollToTop />
          <MetaTags />
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/store" element={<StorePage />} />
              <Route path="/shop/:id" element={<ShopPage />} />
              <Route 
                path="/signin" 
                element={
                  <AuthRedirect redirectTo="/profile" skipOnSignIn={true}>
                    <SignInPage />
                  </AuthRedirect>
                } 
              />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/password-forgot" element={<ForgotPage />} />
              <Route path="/auth/token-validation" element={<ValidationPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckOutPage />} />
              <Route path="/payment/result" element={<PaymentResultPage />} />
              <Route path="/payment/error" element={<PaymentErrorPage />} />
              <Route path="/complete" element={<CompletePage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/check-point" element={<CheckPointPage />} />
              <Route path="/sns-signup" element={<SnsSignUpPage />} />
              <Route path="/error" element={<ErrorPage />} />
              <Route path="/error-profile-inactive" element={<ProfileInactiveErrorPage />} />
              <Route path="/error-profile-not-found" element={<ProfileNotFoundPage />} />

              {/* QR 스캐너 */}
              <Route
                path="/qr-scanner"
                element={
                  <ProtectedRoute>
                    <QRScanner key={Date.now()} />
                  </ProtectedRoute>
                }
              />
              <Route path="/qr-confirm/:key" element={<QRCofirm />} />

              {/* 프로필 영역 start */}
              <Route
                path="/bridge-profile"
                element={
                  <ProtectedRoute>
                    <BridgePage />
                  </ProtectedRoute>
                }
              />
              <Route path="/profile/invitation" element={<InvitationPage />} />

              {/* 프로필 리스트 페이지 */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              
              {/* 프로필 설정 페이지 */}
              <Route
                path="/profile/setting-profile"
                element={
                  <ProtectedRoute>
                    <SettingProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile/setting-profile/:profileId"
                element={
                  <ProtectedRoute>
                    <SettingProfilePage />
                  </ProtectedRoute>
                }
              />

              {/* ✅ 통합된 프로필 페이지 - 새로운 짧은 URL 패턴 */}
              <Route 
                path="/profile/:profileId" 
                element={<UnifiedProfilePage />} 
              />

              {/* 🔄 기존 URL 패턴 지원 (하위 호환성) */}
              <Route
                path="/profile/edit-profile/:profileId"
                element={<UnifiedProfilePage mode="edit" />}
              />
              <Route
                path="/profile/view-profile/:profileId"
                element={<UnifiedProfilePage mode="view" />}
              />
              <Route
                path="/profile/preview-profile/:profileId"
                element={<PreviewProfilePage mode="preview" />}
              />
              <Route 
                path="/:nickname/preview" 
                element={<PreviewProfilePage />} 
              />

              {/* 프로필 관리 페이지 */}
              <Route
                path="/profile/manage-profile/:profileId"
                element={
                  <ProtectedRoute>
                    <ManagePage />
                  </ProtectedRoute>
                }
              />

              {/* 프로필 영역 end */}

              {/* MyPAGE */}
              <Route
                path="/mypage"
                element={
                  <ProtectedRoute>
                    <MyPage />
                  </ProtectedRoute>
                }
              >
                <Route path="order-list" element={<OrderListPage />} />
                <Route path="order-detail" element={<OrderDetailPage />} />
                <Route path="my-review" element={<MyReviewPage />} />
                <Route path="exchange" element={<ExchangePage />} />
                <Route path="return" element={<ReturnPage />} />
                <Route path="my-contact" element={<MyContactPage />} />
                <Route path="faq" element={<FaqPage />} />
                <Route path="myinfo" element={<MyInfoPage />} />
                <Route path="address" element={<AddressPage />} />
              </Route>

              {/* ✅ 닉네임으로 접근하는 경우 - 자동 모드 감지 */}
              <Route 
                path="/:nickname" 
                element={<UnifiedProfilePage mode="auto" />} 
              />
            </Routes>
          </Layout>
        </Router>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default App;