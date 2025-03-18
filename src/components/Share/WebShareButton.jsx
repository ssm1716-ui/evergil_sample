import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLink, FaShareAlt } from 'react-icons/fa';

const WebShareButton = () => {
  const [showShareBox, setShowShareBox] = useState(false); // ✅ 공유 박스 상태
  const [copied, setCopied] = useState(false); // ✅ URL 복사 상태
  const buttonRef = useRef(null); // ✅ 버튼 참조
  const shareBoxRef = useRef(null); // ✅ 공유 박스 참조

  // ✅ 모바일 환경 체크 함수
  const isMobile = () => {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  };

  // ✅ 공유 버튼 클릭 핸들러
  const handleShare = async () => {
    if (isMobile() && navigator.share) {
      // ✅ 모바일 환경에서만 Web Share API 실행
      try {
        await navigator.share({
          title: document.title,
          text: '이 페이지를 공유해 보세요!',
          url: window.location.href,
        });
        console.log('공유 성공!');
      } catch (error) {
        console.error('공유 실패:', error);
      }
    } else {
      // ✅ 데스크톱에서는 공유 박스 표시
      setShowShareBox((prev) => !prev);
    }
  };

  // ✅ URL 복사 기능
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ✅ 공유 박스 외 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        shareBoxRef.current &&
        !shareBoxRef.current.contains(event.target) && // 공유 박스 외부 클릭 감지
        buttonRef.current &&
        !buttonRef.current.contains(event.target) // 공유 버튼 클릭이 아닐 때
      ) {
        setShowShareBox(false);
      }
    };

    if (showShareBox) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showShareBox]);

  return (
    <div
      style={{
        textAlign: 'center',
        position: 'relative',
        display: 'inline-block',
      }}
    >
      {/* ✅ 공유 버튼 */}
      <Link
        className="btn btn-extra-large btn-switch-text btn-box-shadow btn-none-transform btn-base-color left-icon btn-round-edge border-0 me-5px xs-me-0 w-100 mb-5"
        onClick={handleShare}
        ref={buttonRef} // ✅ 버튼 위치 참조
      >
        <span>
          <span>
            <i className="feather icon-feather-share-2"></i>
          </span>
          <span
            className="btn-double-text ls-0px position-relative"
            data-text="공유하기"
          >
            공유하기
          </span>
        </span>
      </Link>

      {/* ✅ 공유 박스 (데스크톱에서만 버튼 아래 표시) */}
      {showShareBox && (
        <div
          ref={shareBoxRef} // ✅ 공유 박스 참조
          style={{
            position: 'absolute',
            bottom: '-145px', // ✅ 버튼 바로 아래 위치
            left: '26%', // ✅ 버튼 중앙 정렬
            transform: 'translateX(-50%)',
            width: '240px', // ✅ 박스 크기 조정
            background: '#fff',
            padding: '12px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
            zIndex: 100,
          }}
        >
          <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>
            프로필 공유하기
          </p>

          {/* ✅ 소셜 공유 버튼 */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                window.location.href
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#1877F2', fontSize: '24px' }}
            >
              <FaFacebook />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                window.location.href
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#1DA1F2', fontSize: '24px' }}
            >
              <FaTwitter />
            </a>
          </div>

          {/* ✅ URL 복사 입력 필드 */}
          <div style={{ display: 'flex', width: '100%', gap: '5px' }}>
            <input
              type="text"
              value={window.location.href}
              readOnly
              style={{
                flex: 1,
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                backgroundColor: '#fff',
                textAlign: 'center',
              }}
            />
            <button
              onClick={copyToClipboard}
              style={{
                padding: '8px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              <FaLink />
            </button>
          </div>

          {/* ✅ 복사 완료 메시지 */}
          {copied && (
            <span style={{ color: 'green', fontSize: '12px' }}>
              ✅ 링크가 복사되었습니다!
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default WebShareButton;
