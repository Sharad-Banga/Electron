import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
export const Home = () => {
  return (
    <div className="home-cnt">
      
      <div className="home-text">
        <p>Generate & Import Wallet</p>
      <span>Choose a blockchain to get started:</span>
      </div>

        <br />
      <div className="home-btn">

        <Link className="button" to="/Solana">
          <button className="btn-1">Solana</button>
        </Link>
        <Link className="button" to="/ethereum">
          <button className="btn-2">Ethereum</button>
        </Link>

      </div>
    </div>
  );
};