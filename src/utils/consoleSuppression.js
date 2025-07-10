// DOMNodeInserted 경고 억제 유틸리티
export const suppressDeprecationWarnings = () => {
  if (process.env.NODE_ENV === 'development') {
    // 원본 console.warn 저장
    const originalWarn = console.warn;
    
    // console.warn 재정의
    console.warn = (...args) => {
      const message = args[0];
      
      // DOMNodeInserted 관련 경고는 무시
      if (typeof message === 'string' && 
          (message.includes('DOMNodeInserted') || 
           message.includes('mutation event'))) {
        return;
      }
      
      // 다른 경고는 정상 출력
      originalWarn.apply(console, args);
    };
  }
};

// 경고 억제 해제
export const restoreConsoleWarnings = () => {
  if (process.env.NODE_ENV === 'development') {
    // 원본 console.warn으로 복원 (필요시)
    console.warn = console.warn;
  }
}; 