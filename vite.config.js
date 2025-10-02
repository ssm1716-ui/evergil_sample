import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'), // '@'를 src 폴더로 매핑
    },
  },
  define: {
    'process.env': process.env, // 환경 변수 자동 로드 설정
  },
  optimizeDeps: {
    include: ['sweetalert2-react-content'],
  }
  // server: {
  //   host: '0.0.0.0', // 네트워크의 모든 IP에서 접근 가능 (예: 모바일 디바이스에서 접근)
  //   port: 6173,       // 사용할 포트 번호
  // },
});


