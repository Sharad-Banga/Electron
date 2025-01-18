import React, { useState } from "react";
import "./Solana.css";
import { generateMnemonic, validateMnemonic } from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english";
import { SeedPhrase } from "./Seed";
import { Wallet } from "./Wallet";

export const Solana = () => {
  const [mnemonic, setMnemonic] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);
  const [error, setError] = useState("");

  const generate = () => {
    const mn = generateMnemonic(wordlist);
    setMnemonic(mn);
    setIsGenerated(true);
    setError("");
  };

  const handleInputChange = (event) => {
    setMnemonic(event.target.value);
    setError("");
  };

  const handleButton = () => {
    if (mnemonic.trim() === "") {
      generate();
    } else if (validateMnemonic(mnemonic, wordlist)) {
      setIsGenerated(true);
      setError("");
    } else {
      setError("Invalid mnemonic phrase. Please check and try again.");
    }
  };

  return (
    <div className="solana-container">
      {!isGenerated && (
        <>
          <h2>Seed Phrase</h2>
          <p className="mnemonic">Save these words in a safe place.</p>
          <div className="input">
            <input
              placeholder="Enter your secret phrase (or leave it blank to generate)"
              type="password"
              value={mnemonic}
              onChange={handleInputChange}
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button onClick={handleButton} className="generate-btn">
            Create Seed Phrase
          </button>
        </>
      )}

      {isGenerated && (
        <>
          <SeedPhrase phrase={mnemonic} />
          <Wallet phrase={mnemonic} pathType={"501"} coin={"Solana"} />
        </>
      )}
    </div>
  );
};
