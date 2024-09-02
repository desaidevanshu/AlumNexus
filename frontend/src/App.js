import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './pages/Auth';
import Donate from './pages/Donate';
import Events from './pages/Events';
import Header from './components/Header';
import Footer from './components/Footer';
import BlogPage from './pages/BlogPage';
import './App.css';
const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/events" element={<Events />} />
        <Route path="/blogs" element={<BlogPage />} />

      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
