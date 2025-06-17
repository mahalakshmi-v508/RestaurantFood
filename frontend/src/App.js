import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/HeaderItems/header';
import './App.css';
import Home from './components/Home';
import Help from './components/HeaderItems/Help';
import Menu from './pages/menu/menu';
import LoginRegister from './pages/Login/Login';
import Footer from './components/Footer/Footer';
import Buy from './pages/checkout/buy';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        {/* Page Content */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/help" element={<Help />} />
          <Route path="/Login" element={<LoginRegister />} />
          <Route path="/buy" element={<Buy />} />
        </Routes>

        {/* Footer always at bottom */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
