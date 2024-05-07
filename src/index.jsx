import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Main from '~pages/Main';
import Settings from '~/pages/Settings';
import About from "~/pages/About";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="*" element={<Main />} />
        <Route path="/settings" exact element={<Settings />} />
        <Route path="/about" exact element={<About />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
