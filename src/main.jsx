import { Provider } from 'react-redux'; // Provider 추가
import { PersistGate } from 'redux-persist/integration/react';
import { createRoot } from 'react-dom/client';
import { store } from '@/state/store'; // Redux Store 가져오기
import App from '@/App.jsx';


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
