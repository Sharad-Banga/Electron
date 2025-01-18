import React, { useState } from "react";
import "./Solana.css";
import { generateMnemonic } from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english";

export const Ethereum = () => {
  const [mnemonic, setMnemonic] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);

  function generate() {
    
      const mn = generateMnemonic(wordlist);
      setMnemonic(mn);
      setIsGenerated(true);
  }

  return (
    <>
      <div className="solana-container">
        <h2>Your ETH Seed Phrase :</h2>
        <p className="mnemonic">{mnemonic || "Click the button to generate a seed phrase"}</p>
        { !isGenerated &&
        <button onClick={generate} className="generate-btn">Create Seed Phrase</button>
        }

        
      </div>
    </>
  );
};