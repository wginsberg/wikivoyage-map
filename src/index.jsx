import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import App from './App';
import Settings from './Settings';
import "./index.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="*" element={<App />} />
        <Route path="/settings" exact element={<Settings />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
