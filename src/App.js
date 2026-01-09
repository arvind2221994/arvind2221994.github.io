import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const Home = () => (
  <div style={{ padding: '20px' }}>
    <h1>Arvind's Minimalist Portfolio</h1>
    <p>Web Developer | React Specialist</p>
    <Link to="/terminal">Open Terminal →</Link>
  </div>
);

const TerminalPlaceholder = () => (
  <div style={{ padding: '20px', background: '#000', color: '#0f0', minHeight: '100vh' }}>
    <p> Terminal initialized. Logic goes here...</p>
    <Link to="/" style={{ color: '#fff' }}>Back Home</Link>
  </div>
);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/terminal" element={<TerminalPlaceholder />} />
      </Routes>
    </Router>
  );
};

export default App;