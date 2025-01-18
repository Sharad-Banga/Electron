// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home } from "./Home";
import { Solana } from "./Solana";
import {Ethereum} from './Ethereum'

import './App.css';

function App() {
  return (
    <div className="body">
    <Router >
      <div className="b">
        <nav className="nav">
          
          <div className="logoName">
            <a href="/">ELECTRON</a>
              </div>
          <Link className="home-link" to="/">Home</Link>
        </nav>
        <br />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/solana" element={<Solana />} />
          <Route path="/ethereum" element={<Ethereum />} />

          

        </Routes>

        <div className="footer">
            Developed and Designed By <a className="footer-link" href="https://x.com/sharad_banga" target="_blank" rel="noopener noreferrer">&nbsp;  sharad banga</a>
        </div>
      </div>
    </Router>
    </div>
  );
}

export default App;
