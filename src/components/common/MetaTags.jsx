import { useEffect } from 'react';
import { siteConfig } from '@/config/siteConfig';

const MetaTags = ({ 
  title, 
  description, 
  image, 
  url,
  type = 'website'
}) => {
  useEffect(() => {
    // 기본값 설정
    const metaTitle = title || siteConfig.share.title;
    const metaDescription = description || siteConfig.description;
    const metaUrl = url || siteConfig.domain;
    const metaImage = image || `${siteConfig.domain}${siteConfig.og.image}`;

    // 메타 태그 업데이트
    const updateMetaTag = (name, content) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    const updatePropertyTag = (property, content) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // 기본 메타 태그
    updateMetaTag('description', metaDescription);
    updateMetaTag('keywords', siteConfig.keywords);
    updateMetaTag('author', siteConfig.author);

    // Open Graph 태그
    updatePropertyTag('og:title', "에버길");
    updatePropertyTag('og:description', metaDescription);
    updatePropertyTag('og:url', metaUrl);
    updatePropertyTag('og:image', metaImage);
    updatePropertyTag('og:image:width', '512');
    updatePropertyTag('og:image:height', '512');
    updatePropertyTag('og:image:alt', '에버길 로고 - 소중한 사람들을 기억하는 추모페이지');
    updatePropertyTag('og:type', type);
    updatePropertyTag('og:site_name', siteConfig.og.siteName);
    updatePropertyTag('og:locale', siteConfig.og.locale);

    // Twitter Card 태그
    updatePropertyTag('twitter:card', 'summary_large_image');
    updatePropertyTag('twitter:title', metaTitle);
    updatePropertyTag('twitter:description', metaDescription);
    updatePropertyTag('twitter:image', metaImage);

    // 페이지 제목 업데이트
    document.title = metaTitle;

  }, [title, description, image, url, type]);

  return null; // 이 컴포넌트는 렌더링하지 않음
};

export default MetaTags; 