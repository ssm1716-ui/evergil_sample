import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  QrCode, 
  ShoppingCart, 
  HelpCircle, 
  Users, 
  Heart, 
  Link as LinkIcon 
} from 'lucide-react';
import Button from '@/components/common/Button/Button';
import Modal from '@/components/common/Modal/Modal';

const BridgePage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모바일 환경 체크 함수
  const isMobile = () => {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  };

  const handelIsMobile = () => {
    if (isMobile()) {
      navigate('/qr-scanner');
    } else {
      setIsModalOpen(true);
    }
  };

  const handleHelp = () => {
    // 도움말/문의 페이지로 이동
    navigate('/contact');
  };

  return (
    <>
      <div className="bridge-page">
        {/* 메인 콘텐츠 영역 */}
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-8">
              {/* 상단 여백 */}
              <div className="bridge-spacing-top"></div>

              {/* 메인 카드 */}
              <div className="bridge-main-card">
                {/* 아이콘 */}
                <div className="bridge-icon-wrapper">
                  <Heart className="bridge-icon-large icon-color-heart" />
                </div>

                {/* 제목 */}
                <h1 className="bridge-title">
                  추모페이지를 만들어보세요
                </h1>

                {/* 부제목 */}
                <p className="bridge-subtitle">
                  Evergil과 함께 소중한 추억을 영원히 간직하세요
                </p>

                {/* QR 스캔 섹션 */}
                <div className="bridge-scan-section">
                  <button
                    onClick={handelIsMobile}
                    className="btn btn-base-color btn-extra-large btn-round-edge btn-box-shadow bridge-scan-btn"
                  >
                    <i className="feather icon-feather-camera icon-small text-white"></i>
                    QR 코드 스캔하기
                  </button>
                  <p className="bridge-scan-hint">
                    카메라로 QR 코드를 스캔하여 연결하세요
                  </p>
                </div>

                {/* 구분선 */}
                <div className="bridge-divider">
                  <div className="bridge-divider-line"></div>
                  <div className="bridge-divider-text">또는</div>
                </div>

                {/* QR 제품 구매 안내 */}
                <div className="bridge-purchase-card">
                  <div className="d-flex flex-column flex-md-row align-items-center gap-4">
                    <div className="bridge-purchase-icon-wrapper">
                      <ShoppingCart className="bridge-purchase-icon icon-color-cart" />
                    </div>
                    <div className="flex-1 text-center text-md-start">
                      <h3 className="bridge-purchase-title">
                        아직 Evergil QR이 없으신가요?
                      </h3>
                      <p className="bridge-purchase-text">
                        지금 구매하고 소중한 사람을 위한 추모페이지를 만들어보세요.
                      </p>
                    </div>
                    <div className="bridge-purchase-btn-wrapper">
                      <Link to="/store" className="d-block">
                        <button className="btn btn-black btn-large btn-round-edge d-inline-flex align-items-center gap-2 bridge-purchase-btn">
                          <ShoppingCart className="icon-small" />
                          제품 구매하기
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* 도움말 카드 그리드 */}
              <div className="row mb-5 bridge-help-cards">
                <div className="col-12 col-md-6">
                  <div className="bridge-help-card">
                    <div className="d-flex align-items-start gap-3">
                      <div className="bridge-help-icon-wrapper">
                        <Users className="bridge-help-icon icon-color-users" />
                      </div>
                      <div className="flex-1">
                        <h4 className="bridge-help-card-title">
                          Evergil이란?
                        </h4>
                        <p className="bridge-help-card-text">
                          QR 코드 기반의 영구 추모 플랫폼으로, 소중한 사람들을 영원히 기억할 수 있습니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="bridge-help-card clickable" onClick={handleHelp}>
                    <div className="d-flex align-items-start gap-3">
                      <div className="bridge-help-icon-wrapper">
                        <HelpCircle className="bridge-help-icon icon-color-help" />
                      </div>
                      <div className="flex-1">
                        <h4 className="bridge-help-card-title">
                          도움이 필요하신가요?
                        </h4>
                        <p className="bridge-help-card-text">
                          자주 묻는 질문을 확인하거나 고객센터에 문의하세요. 언제든 도와드리겠습니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 사용 안내 섹션 */}
              <div className="bridge-guide-section">
                <h3 className="bridge-guide-title">
                  Evergil 시작하기
                </h3>

                <div className="row">
                  {/* Step 1 */}
                  <div className="col-12 col-md-4 mb-4 mb-md-0">
                    <div className="text-center">
                      <div className="bridge-step-number">
                        <span>1</span>
                      </div>
                      <h4 className="bridge-step-title">
                        제품 구매
                      </h4>
                      <p className="bridge-step-text">
                        QR 코드가 포함된 Evergil 제품을 선택하고 구매하세요.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="col-12 col-md-4 mb-4 mb-md-0">
                    <div className="text-center">
                      <div className="bridge-step-number">
                        <span>2</span>
                      </div>
                      <h4 className="bridge-step-title">
                        QR 스캔
                      </h4>
                      <p className="bridge-step-text">
                        제품에 있는 QR 코드를 스마트폰으로 스캔하세요.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="col-12 col-md-4">
                    <div className="text-center">
                      <div className="bridge-step-number">
                        <span>3</span>
                      </div>
                      <h4 className="bridge-step-title">
                        페이지 생성
                      </h4>
                      <p className="bridge-step-text">
                        추모페이지를 꾸미고 소중한 추억을 공유하세요.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 연결선 (데스크톱에서만 표시) */}
                <div className="d-none d-md-block bridge-step-connector">
                  <div className="d-flex justify-content-center align-items-center gap-5">
                    <div className="bridge-connector-line"></div>
                    <div style={{ width: '100px' }}></div>
                    <div className="bridge-connector-line"></div>
                  </div>
                </div>
              </div>

              {/* 특징 소개 */}
              <div className="row mb-5">
                <div className="col-12">
                  <div className="bridge-features-section">
                    <h3 className="bridge-guide-title">
                      Evergil의 특별함
                    </h3>

                    <div className="row">
                      <div className="col-12 col-md-4 mb-4 mb-md-0">
                        <div className="text-center">
                          <div className="bridge-feature-icon-wrapper">
                            <LinkIcon className="bridge-feature-icon icon-color-link" />
                          </div>
                          <h4 className="bridge-feature-title">
                            영구 보관
                          </h4>
                          <p className="bridge-feature-text">
                            클라우드에 안전하게 저장되어 언제 어디서나 접근 가능합니다.
                          </p>
                        </div>
                      </div>

                      <div className="col-12 col-md-4 mb-4 mb-md-0">
                        <div className="text-center">
                          <div className="bridge-feature-icon-wrapper">
                            <Users className="bridge-feature-icon icon-color-users" />
                          </div>
                          <h4 className="bridge-feature-title">
                            함께 추억
                          </h4>
                          <p className="bridge-feature-text">
                            가족과 친구들이 함께 사진과 메시지를 공유할 수 있습니다.
                          </p>
                        </div>
                      </div>

                      <div className="col-12 col-md-4">
                        <div className="text-center">
                          <div className="bridge-feature-icon-wrapper">
                            <Heart className="bridge-feature-icon icon-color-heart-feature" />
                          </div>
                          <h4 className="bridge-feature-title">
                            마음 전달
                          </h4>
                          <p className="bridge-feature-text">
                            하늘편지를 통해 그리운 마음을 언제든 전할 수 있습니다.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 하단 여백 */}
              <div className="bridge-spacing-bottom"></div>
            </div>
          </div>
        </div>
      </div>

      {/* 모바일 전용 모달 */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="w-100">
          <div className="modal-content p-0 rounded shadow-lg">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="p-10 sm-p-7 bg-white">
                  <div className="row justify-content-center">
                    <div className="col-md-9 text-center">
                      <h6 className="text-dark-gray fw-500 mb-15px fs-22 md-fs-16">
                        모바일에서만 스캔이 가능합니다.
                      </h6>
                    </div>
                    <div className="col-lg-12 text-center text-lg-center pt-3">
                      <input type="hidden" name="redirect" value="" />
                      <button
                        className="btn btn-white btn-large btn-box-shadow border-1 border-default me-1"
                        onClick={() => setIsModalOpen(false)}
                      >
                        확인
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BridgePage;