import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLink, FaShareAlt, FaTimes } from 'react-icons/fa';

const WebShareButton = ({ 
  triggerElement, 
  positionConfig = {}, 
  shareUrl = window.location.href,
  shareTitle = document.title,
  shareText = '이 페이지를 공유해 보세요!'
}) => {
  // 기본값 설정
  const { left = '27%', bottom = '70px' } = positionConfig;

  const [showShareBox, setShowShareBox] = useState(false);
  const [copied, setCopied] = useState(false);
  const buttonRef = useRef(null);
  const shareBoxRef = useRef(null);

  // 모바일 환경 체크 함수
  const isMobile = () => {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  };

  // 공유 버튼 클릭 핸들러
  const handleShare = async (e) => {
    if (e?.preventDefault) e.preventDefault();

    if (isMobile() && navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
      } catch (error) {
        console.error('공유 실패:', error);
      }
    } else {
      setShowShareBox((prev) => !prev);
    }
  };

  // URL 복사 기능
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 공유 박스 외 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        shareBoxRef.current &&
        !shareBoxRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
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

  // 🔥 공유하기 버튼 - #8FC5B7 색상
  const defaultTrigger = (
    <Link
      className="btn btn-sm d-flex align-items-center gap-2"
      onClick={handleShare}
      ref={buttonRef}
      style={{
        backgroundColor: '#8FC5B7',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '8px 16px',
        fontSize: '14px',
        fontWeight: '500',
        whiteSpace: 'nowrap',
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
        textDecoration: 'none',
        width: '120px',
        justifyContent: 'center'
      }}
    >
      <i className="feather icon-feather-share-2" style={{ fontSize: '16px' }}></i>
      <span className="ls-0px">공유하기</span>
    </Link>
  );

  return (
    <>
      {/* 버튼: props로 받은 게 있으면 그걸, 없으면 기본 버튼 */}
      {triggerElement
        ? React.cloneElement(triggerElement, {
            onClick: handleShare,
            ref: buttonRef,
          })
        : defaultTrigger}

      {/* 공유 박스 (데스크톱에서만 버튼 아래 표시) */}
      {showShareBox && (
        <div
          ref={shareBoxRef}
          style={{
            position: 'absolute',
            bottom,
            left,
            transform: 'translateX(-50%)',
            width: '240px',
            background: '#fff',
            padding: '12px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
            zIndex: 9999,
            border: '1px solid #e0e0e0',
          }}
        >
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            width: '100%',
            marginBottom: '5px'
          }}>
            <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>
              공유하기
            </p>
            <button
              onClick={() => setShowShareBox(false)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#666',
                fontSize: '16px',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#f0f0f0';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              <FaTimes />
            </button>
          </div>

          {/* 소셜 공유 버튼 */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                shareUrl
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#1877F2', fontSize: '24px' }}
            >
              <FaFacebook />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                shareUrl
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#1DA1F2', fontSize: '24px' }}
            >
              <FaTwitter />
            </a>
          </div>

          {/* URL 복사 입력 필드 */}
          <div style={{ display: 'flex', width: '100%', gap: '5px' }}>
            <input
              type="text"
              value={shareUrl}
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

          {/* 복사 완료 메시지 */}
          {copied && (
            <span style={{ color: 'green', fontSize: '12px' }}>
              ✅ 링크가 복사되었습니다!
            </span>
          )}
        </div>
      )}
    </>
  );
};

export default WebShareButton;