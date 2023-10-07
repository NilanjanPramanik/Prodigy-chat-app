import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDUubxl3WxW_c96IacNG-N6IrmdWMy_wRA",
  authDomain: "chat-app-6b63c.firebaseapp.com",
  projectId: "chat-app-6b63c",
  storageBucket: "chat-app-6b63c.appspot.com",
  messagingSenderId: "931906555692",
  appId: "1:931906555692:web:1b87d4c689c233cb3f2689"
};

export const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
