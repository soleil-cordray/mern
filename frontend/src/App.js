import React from 'react';
import './App.css';

// import from react router dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from './pages/LoginPage';
import CardPage from './pages/CardPage';

function App() {
  // let computer decide routing
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" index element={<LoginPage />} />
      <Route path="/cards" index element={<CardPage />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;