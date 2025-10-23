import React from 'react';
import Modal from '@/components/common/Modal/Modal';
import { FaInfoCircle, FaEnvelope, FaUserFriends, FaEye, FaEdit, FaUserLock } from 'react-icons/fa';

import userGuide2 from '@/assets/images/userGuide2.jpeg';

const UserGuideModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="user-guide-modal-content">

        {/* 스크롤 가능한 컨텐츠 영역 */}
        <div className="user-guide-scroll-area">
            {/* 헤더 */}
            <div className="user-guide-header">
                <h2 className="user-guide-title">이용 가이드</h2>
                <p className="user-guide-subtitle">Evergil User Guide</p>
            </div>
          {/* 1. 초대 및 방문자 관리 */}
          <section className="guide-section">
            <h3 className="guide-section-title">
              <span className="guide-number">1</span>
              초대 및 방문자 관리
            </h3>
            <p className="guide-description">
              초대 및 방문자 관리 페이지는 프로필을 다른 사람과 공유하고, 권한을 관리하는 곳입니다.
            </p>
            <div className="guide-divider"></div>
          </section>

          {/* 2. 프로필 공개 여부 */}
          <section className="guide-section">
            <h3 className="guide-section-title">
              <span className="guide-number">2</span>
              프로필 공개 여부 (Profile Visibility)
            </h3>
            <div className="guide-info-box">
              <div className="guide-info-item">
                <FaEye className="guide-icon" />
                <div>
                  <span className="guide-label">공개 (Public):</span>
                  <span className="guide-text">누구나 승인 없이 추모관/프로필을 열람할 수 있습니다.</span>
                </div>
              </div>
              <div className="guide-info-item">
                <FaUserLock className="guide-icon" />
                <div>
                  <span className="guide-label">비공개 (Private):</span>
                  <span className="guide-text">초대받은 방문자만 열람할 수 있습니다. 초대받지 않은 방문자는 "보기 요청"을 보낼 수 있습니다.</span>
                </div>
              </div>
            </div>
            
            <div className="guide-image-placeholder">
              <img src={userGuide2} alt="Profile Visibility Illustration" style={{ width: '100%', height: 'auto', borderRadius: 8 }} />
            </div>
            <p className="guide-image-caption">프로필 공개/비공개 설정 화면 (빨간색 테두리가 중요한 영역을 표시)</p>
            <div className="guide-divider"></div>
          </section>

          {/* 3. 방문자 초대하기 */}
          <section className="guide-section">
            <h3 className="guide-section-title">
              <span className="guide-number">3</span>
              방문자 초대하기
            </h3>
            <div className="guide-steps">
              <h4 className="guide-steps-title">단계 / Steps:</h4>
              <ol className="guide-ordered-list">
                <li>초대할 방문자의 이메일 입력</li>
                <li>방문자가 초대 수락 대기</li>
                <li>방문자가 초대 수락시 초대된 계정 목록에서 권한 변경 가능</li>
              </ol>
            </div>

            <div className="guide-note-box">
              <p className="guide-note-title">참고 / Note:</p>
              <ul className="guide-note-list">
                <li>초대된 방문자는 기본적으로 보기권한(Viewer) 권한으로 설정됩니다.</li>
                <li>필요 시 편집(Editor) 권한으로 변경 가능합니다.</li>
              </ul>
            </div>

            <div className="guide-image-placeholder">
              {/* 이미지 자리 */}
              <div className="placeholder-content">
                <FaEnvelope size={48} />
                <p>방문자 초대 3단계</p>
                <span className="placeholder-note">(이미지 경로 추가 예정)</span>
              </div>
            </div>
            <p className="guide-image-caption">방문자 초대 3단계: 1️⃣ 이메일 입력 → 2️⃣ 초대 완료 → 3️⃣ 권한 설정</p>
            <div className="guide-divider"></div>
          </section>

          {/* 4. 권한 관리 */}
          <section className="guide-section">
            <h3 className="guide-section-title">
              <span className="guide-number">4</span>
              권한 관리 (Roles & Permissions)
            </h3>

            <h4 className="guide-subtitle">권한별 기능 비교:</h4>
            
            <div className="guide-permissions-grid">
              {/* 보기 권한 */}
              <div className="permission-card viewer">
                <h5 className="permission-title">
                  <FaEye />
                  보기 권한 (Viewer)
                </h5>
                <div className="guide-image-placeholder small">
                  <div className="placeholder-content">
                    <FaEye size={32} />
                    <p>보기 권한 이미지</p>
                  </div>
                </div>
                <p className="permission-description">추모관을 열람만 할 수 있습니다.</p>
                <div className="permission-note">
                  <strong>참고:</strong> 보기 권한은 비공개 프로필에서만 적용됩니다. 공개 프로필의 경우 모든 방문자가 열람 가능합니다.
                </div>
              </div>

              {/* 편집 권한 */}
              <div className="permission-card editor">
                <h5 className="permission-title">
                  <FaEdit />
                  편집 권한 (Editor)
                </h5>
                <div className="guide-image-placeholder small">
                  <div className="placeholder-content">
                    <FaEdit size={32} />
                    <p>편집 권한 이미지</p>
                  </div>
                </div>
                <p className="permission-description">사진 업로드, 가족트리 추가, 콘텐츠 편집이 가능합니다.</p>
              </div>
            </div>
            <p className="guide-image-caption">권한별 기능 비교: 보기 권한은 열람만, 편집 권한은 콘텐츠 수정 가능</p>
            <div className="guide-divider"></div>
          </section>

          {/* 5. 요청 관리 */}
          <section className="guide-section">
            <h3 className="guide-section-title">
              <span className="guide-number">5</span>
              요청 관리 (Managing Requests)
            </h3>
            <p className="guide-description">방문자가 비공개 계정 방문 요청 후</p>

            <div className="guide-info-box">
              <div className="guide-info-item">
                <span className="guide-bullet"></span>
                <span className="guide-text">비공개 계정 보기 요청에서 확인 가능.</span>
              </div>
              <div className="guide-info-item">
                <span className="guide-bullet"></span>
                <span className="guide-text">접근 요청 허용 또는 거절</span>
              </div>
            </div>

            <div className="guide-image-placeholder">
              <div className="placeholder-content">
                <FaUserFriends size={48} />
                <p>요청 관리 화면</p>
                <span className="placeholder-note">(이미지 경로 추가 예정)</span>
              </div>
            </div>
            <p className="guide-image-caption">비공개 계정 보기 요청 관리 화면</p>
            <div className="guide-divider"></div>
          </section>

          {/* 6. 이용 팁 */}
          <section className="guide-section">
            <h3 className="guide-section-title">
              <span className="guide-number">6</span>
              이용 팁 (Tips & Best Practices)
            </h3>
            <div className="guide-tips-box">
              <div className="guide-tip-item">
                <span className="tip-bullet"></span>
                <span>편집은 신뢰할 수 있는 가족으로 제한</span>
              </div>
              <div className="guide-tip-item">
                <span className="tip-bullet"></span>
                <span>프로필은 비공개로 유지 권장</span>
              </div>
              <div className="guide-tip-item">
                <span className="tip-bullet"></span>
                <span>권한은 언제든 변경 또는 삭제 가능</span>
              </div>
            </div>
            <div className="guide-divider"></div>
          </section>

          {/* 7. FAQ */}
          <section className="guide-section">
            <h3 className="guide-section-title">
              <span className="guide-number">7</span>
              FAQ (자주 묻는 질문)
            </h3>
            <div className="guide-faq-list">
              <div className="faq-item">
                <h5 className="faq-question">Q1. 초대 메일을 못 받았어요.</h5>
                <p className="faq-answer">→ 스팸메일함 확인, 필요 시 링크 복사 후 공유 가능</p>
              </div>
              <div className="faq-item">
                <h5 className="faq-question">Q2. Viewer와 Editor 차이가 뭔가요?</h5>
                <p className="faq-answer">→ 보기는 보기만 가능, 편집은 사진 업로드/가족트리 편집 가능</p>
              </div>
              <div className="faq-item">
                <h5 className="faq-question">Q3. 비공개 요청은 얼마나 보관되나요?</h5>
                <p className="faq-answer">→ 요청은 일정 기간 보관, 승인/거절될 때까지 유지</p>
              </div>
              <div className="faq-item">
                <h5 className="faq-question">Q4. 하늘편지를 받지 못했어요.</h5>
                <p className="faq-answer">→ 로그인하지 않은 경우 편지가 전달되지 않습니다.</p>
              </div>
            </div>
          </section>
        </div>

        {/* 닫기 버튼 */}
        <div className="user-guide-footer">
          <button className="user-guide-close-btn" onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UserGuideModal;