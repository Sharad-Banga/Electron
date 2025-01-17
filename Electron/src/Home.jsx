import React from "react";
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
        <button className="btn-1" >Solana</button>
        <button className="btn-2">Ethereum</button>
      </div>
    </div>
  );
};