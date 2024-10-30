import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import AppRouter from './App'; // Импорт AppRouter, а не App
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <AppRouter /> {/* Используем AppRouter */}
    </Router>
  </React.StrictMode>
);
