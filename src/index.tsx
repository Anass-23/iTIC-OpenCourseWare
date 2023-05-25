import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './hooks/AuthContext';
import { isCordova } from './utils';

const startApp = () => {
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );
  root.render(
    <React.StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </React.StrictMode>
  );
} 

if (isCordova()) {
  document.addEventListener('deviceready', startApp, false);
} else {
  startApp();
}

// // if (window.cordova) {  
// if ((window as any).cordova) {
//   document.addEventListener('deviceready', startApp, false);
// } else {
//   startApp();
// }