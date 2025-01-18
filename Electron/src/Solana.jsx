import React, { useState } from "react";
import "./Solana.css";
import { generateMnemonic } from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english";
export const Solana = () => {
  const [mnemonic, setMnemonic] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);

  function generate() {
    
      const mn = generateMnemonic(wordlist);
      setMnemonic(mn);
      setIsGenerated(true);
  }

  function handleInputChange(event) {
    setMnemonic(event.target.value);
  }

  function handleButton(){
    if(mnemonic.trim()===""){
      generate();
    }
    else{
      setIsGenerated(true);
    }
  }



  return (
    <>
      <div className="solana-container">

        <h2>Seed Phrase</h2>
        <p className="mnemonic">{ "Save these words in a safe place."}</p>

        {!isGenerated &&  <div className="input"><input placeholder="Enter your secret phrase(or leave it blank to generate)" type="password" value={mnemonic} onChange={handleInputChange}></input></div>}
       
        { !isGenerated &&
        
        <button  onClick={handleButton} className="generate-btn">Create Seed Phrase</button>

        }
      </div>
    </>
  );
};