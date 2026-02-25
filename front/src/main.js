import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
// Vercel Speed Insights
import { SpeedInsights } from '@vercel/speed-insights/react';
ReactDOM.createRoot(document.getElementById('root')).render(_jsx(React.StrictMode, { children: _jsx(DarkModeProvider, { children: _jsxs(Provider, { store: store, children: [_jsx(Toaster, { position: "top-right", reverseOrder: false }), _jsx(App, {}), _jsx(SpeedInsights, {})] }) }) }));
