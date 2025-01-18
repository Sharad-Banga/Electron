
import "./Seed.css";
import React, { useState } from "react";
export const SeedPhrase = ({ phrase }) => {

  const [show , setShow] = useState(false);


  const copyToClipboard = () => {
    navigator.clipboard.writeText(phrase);
    alert("copied !!")

  };

  function shownHandler(){
    setShow((show)=>!show)
  }

  return (
    
    <div className="seedphrase-container">
      <div className="header-seed"><h1>Seed Phrase</h1>
      <button onClick={shownHandler}>{show?"🐵":"🙈"}</button></div>
      {show ? (
        <div className="mnemonic-grid" onClick={copyToClipboard}>
          {phrase.split(" ").map((word, index) => (
            <div className="mnemonic-word" key={index}>
              {word}
            </div>
          ))}
          <p className="copy-info">&nbsp;Click To Copy</p>
        </div>
      ):
      ""
      }
    </div>
  );
};
