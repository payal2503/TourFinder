import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google'; // 👈 Import provider
import App from './App.jsx';
import './index.css';

const clientId = '125461439203-qrrdokv68hr0f1fgic6ul7o01sfh5bvp.apps.googleusercontent.com'; // 👈 Replace with your actual client ID

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={clientId}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </GoogleOAuthProvider>
);
