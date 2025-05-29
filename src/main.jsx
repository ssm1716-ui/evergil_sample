import { Provider } from 'react-redux'; // Provider 추가
import { PersistGate } from 'redux-persist/integration/react';
import { createRoot } from 'react-dom/client';
import { store } from '@/state/store'; // Redux Store 가져오기
import App from '@/App.jsx';

// src/main.jsx 또는 App.jsx 상단에 추가
import 'react-quill/dist/quill.snow.css';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-fullscreen.css';
import 'lightgallery/css/lg-zoom.css';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
