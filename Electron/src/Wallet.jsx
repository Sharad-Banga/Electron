import "./Wallet.css";

import { useState } from "react";
import { mnemonicToSeedSync } from "@scure/bip39";
// import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import { ethers } from "ethers";
import bs58 from "bs58";
import * as bip32 from "bip32";
import { HDKey } from "@scure/bip32";

export const Wallet = ({ phrase, pathType ,coin }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState([]);

  const toHex = (buffer) => {
    return Array.from(buffer)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  };
  const clearWallet =()=>{
    setPublicKeys([]);
  }
  const dltprsnt = (p) => {
    const updatedTask = publicKeys.filter((val) => val !== p);
    setPublicKeys(updatedTask);
  }

  const pblicCopyToClipboard = async (text) => {
     await navigator.clipboard.writeText(text);
    alert("public key copied !!")

  };
  const prvtCopyToClipboard = async (text) => {
    await navigator.clipboard.writeText(text);
    alert("private key copied !!")

  };

  const addWallet = () => {
    try {
      const seed = mnemonicToSeedSync(phrase);
      console.log("Seed:", seed.toString("hex"));

      const path = `m/44'/${pathType}'/${currentIndex}'/0'`;

      


      let privateKeyEncoded, publicKeyEncoded;

      if (pathType === "501") {
        const root = HDKey.fromMasterSeed(seed);
        const child = root.derive(path);
        console.log("root",root);
        console.log("child",child);


        //  const prvt =  Buffer.from(child.privateKey).toString("hex");
        //  const pblc = Buffer.from(child.publicKey).toString("hex");


          const prvt = toHex(child.privateKey);
          const pblc = toHex(child.publicKey);



        setCurrentIndex(currentIndex + 1);
      setPublicKeys([
        ...publicKeys,
        {
          publicKey: prvt,
          privateKey: pblc,
        },
      ])

      } 
      
      else if (pathType === "60") {
        const root = HDKey.fromMasterSeed(seed);

        const child = root.derive(path);

        const ethprvt = toHex(child.privateKey);
        const wallet = new ethers.Wallet(`0x${ethprvt}`);
        const ethpblc = wallet.address;
        

        
        
        setCurrentIndex(currentIndex + 1);
      setPublicKeys([
        ...publicKeys,
        {
          publicKey: ethpblc,
          privateKey: ethprvt,
        },
      ])
        

      } else {
        throw new Error("Unsupported pathType");
      }

      ;
    } catch (error) {
      console.error("Error deriving key:", error.message);
    }
  };

  return (
    <div className="wallet-body">
      <div className="imp">
      <h1>{coin} Wallet</h1>
      <div className="buttons">
        <button className="add-btn" onClick={addWallet}>Add Wallet</button>
        <button className="dlt-btn" onClick={clearWallet}>Clear Wallets</button>
      </div>
      </div>
      {publicKeys.map((p, index) => (
        <div key={index}>
          <div className="wal">

            <div className="hd">
            <h3>Wallet {index+1}</h3>
            <button onClick={()=>dltprsnt(p)}>🗑</button>

            </div>
            <div className="key-cont">
              <h4>Public Key:<button onClick={()=>pblicCopyToClipboard(p.publicKey)}>⿻</button></h4>
              <p >{p.publicKey}</p>
              
              <h4>Private Key: <button onClick={()=>prvtCopyToClipboard(p.privateKey)}>⿻</button></h4>
              <p  >{p.privateKey}</p>
              
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
