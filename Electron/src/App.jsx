// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home } from "./Home";
import './App.css';

function App() {
  return (
    <div className="body">
    <Router >
      <div className="b">
        <nav className="nav">
          
          <div className="logoName">
              ELECTRON</div>
          <Link className="home-link" to="/">Home</Link>
        </nav>
        <br />

        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>

        <div className="footer">
            Developed and Designed By <Link className="footer-link" to="https://x.com/sharad_banga"> &nbsp;  sharad banga</Link>
        </div>
      </div>
    </Router>
    </div>
  );
}

export default App;
