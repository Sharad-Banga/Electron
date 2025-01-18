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

export const Wallet = ({ phrase, pathType }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState([]);

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


        // const prvt =  child.privateKey.toString("hex");
        // const pblc = child.publicKey.toString("hex");
         const prvt =  Buffer.from(child.privateKey).toString("hex");
         const pblc = Buffer.from(child.publicKey).toString("hex");

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
        const seed = mnemonicToSeedSync(phrase);
        console.log("Seed (hex):", seed.toString("hex"));

        const root = HDKey.fromMasterSeed(seed);
        console.log("root",root);
        
        const childKey = root.derive(path);
        console.log("ck",childKey);
        
        const ethprvt =  Buffer.from(childKey.privateKey).toString("hex");
        const ethpblc = Buffer.from(childKey.publicKey).toString("hex");
        

        
        
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
      <button onClick={addWallet}>Add Wallet</button>
      {publicKeys.map((p, index) => (
        <div key={index}>
          <p>Public Key: {p.publicKey}</p>
          <p>Private Key: {p.privateKey}</p>
        </div>
      ))}
    </div>
  );
};
