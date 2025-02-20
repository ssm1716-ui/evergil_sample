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
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://dev-api.everlink.kr',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ''),
  //     },
  //   },
  // },
});


