// 사이트 설정 정보
export const siteConfig = {
  // 기본 도메인 정보
  domain: import.meta.env.VITE_SITE_DOMAIN || 'https://www.evergil.kr',
  name: import.meta.env.VITE_SITE_NAME || 'Evergil',
  nameKr: import.meta.env.VITE_SITE_NAME_KR || '에버길',
  description: import.meta.env.VITE_SITE_DESCRIPTION || '에버길(Evergil) - 소중한 사람들을 기억하고 추모하는 온라인 추모페이지 서비스. QR코드 메모리태그로 의미있는 추억을 영원히 보존하고 사랑하는 이들을 기억하세요.',
  keywords: '에버길, Evergil, 추모, 추모페이지, 메모리태그, QR코드, 기억, 추억, 온라인 추모, 디지털 추모, 추모 서비스, 기념관, 추모관, 디지털 추모 서비스',
  author: '에버길(Evergil)',
  
  // 공유 설정
  share: {
    title: 'Evergil',
    text: '소중한 사람들을 기억하고 추모하는 온라인 추모페이지 서비스. 의미있는 추억을 영원히 보존하고 사랑하는 이들을 기억하세요.',
    url: import.meta.env.VITE_SITE_DOMAIN || 'https://www.evergil.kr'
  },
  
  // Open Graph 설정
  og: {
    image: '/favicon/android-chrome-512x512.png',
    type: 'website',
    siteName: '에버길 (Evergil)',
    locale: 'ko_KR'
  },
  
  // 소셜 미디어 정보
  social: {
    youtubeMainLink: 'https://www.youtube.com/embed/PRfZKYItOFs?si=Hx1afs72cLM4DLI1',
    youtube: 'https://www.youtube.com/@Evergil.official',
    instagram: 'https://www.instagram.com/evergil.official',
    kakao: 'https://pf.kakao.com/_jXMxfn'
  },
  
  // 연락처 정보
  contact: {
    phone: '010-5705-0716',
    email: 'support@evergil.kr',
    address: '(우)14441 경기도 부천시 오정구 오정로211번길 35-24,201호',
    detailAddress: '(오정동, ㈜예스테크)',
    representative: '전경아'
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