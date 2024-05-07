import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import App from './App';
import Settings from './Settings';
import About from "~/pages/About";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="*" element={<App />} />
        <Route path="/settings" exact element={<Settings />} />
        <Route path="/about" exact element={<About />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
