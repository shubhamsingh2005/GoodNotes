import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';

// Styles
import './index.css';
import './styles/tailwind.css';

// Context Providers
import { DarkModeProvider } from './context/DarkModeContext';

// Redux
import { Provider } from 'react-redux';
import store from '@/redux/store'; // ✅ Use same store as in App.tsx

// Toasts
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DarkModeProvider>
      <Provider store={store}>
        <Toaster position="top-right" reverseOrder={false} />
        <App />
      </Provider>
    </DarkModeProvider>
  </React.StrictMode>
);
