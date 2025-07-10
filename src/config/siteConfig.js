// 사이트 설정 정보
export const siteConfig = {
  // 기본 도메인 정보
  domain: import.meta.env.VITE_SITE_DOMAIN || 'https://www.evergil.kr',
  name: import.meta.env.VITE_SITE_NAME || '에버길',
  description: import.meta.env.VITE_SITE_DESCRIPTION || '소중한 사람들을 기억하는 추모페이지',
  
  // 공유 설정
  share: {
    title: '에버길 - 소중한 사람들을 기억하는 추모페이지',
    text: '에버길과 함께 소중한 사람들을 기억하세요.',
    url: import.meta.env.VITE_SITE_DOMAIN || 'https://www.evergil.kr'
  },
  
  // Open Graph 설정
  og: {
    image: '/og-image.jpg',
    type: 'website'
  },
  
  // 소셜 미디어 정보
  social: {
    youtube: 'https://www.youtube.com/@Evergil.official',
    instagram: 'https://www.instagram.com/evergil.official',
    kakao: 'https://pf.kakao.com/_jXMxfn'
  },
  
  // 연락처 정보
  contact: {
    phone: '010-9291-8601',
    email: 'support@evergil.kr',
    address: '(우)14441 경기도 부천시 오정구 오정로211번길 35-24,201호',
    detailAddress: '(오정동, ㈜예스테크)'
  }
};

// 현재 도메인 가져오기 함수
export const getCurrentDomain = () => {
  return siteConfig.domain;
};

// 공유 URL 가져오기 함수
export const getShareUrl = () => {
  return siteConfig.share.url;
}; 