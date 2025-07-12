import React, { useState } from "react";
import { web3Enable, web3Accounts } from "@polkadot/extension-dapp";

export default function PolkadotWalletConnect({ onConnected }) {
  const [address, setAddress] = useState(null);
  const [error, setError] = useState(null);

  const connectWallet = async () => {
    setError(null);
    try {
      const extensions = await web3Enable("My Face Login Demo");
      if (!extensions.length) throw new Error("Polkadot.js extension not found or not authorized.");
      const accounts = await web3Accounts();
      if (!accounts.length) throw new Error("No accounts found in the Polkadot.js extension.");
      setAddress(accounts[0].address);
      if (onConnected) onConnected(accounts[0].address);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      {address ? (
        <div>Connected: {address}</div>
      ) : (
        <button onClick={connectWallet}>Connect Polkadot Wallet</button>
      )}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}