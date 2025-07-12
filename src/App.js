import React, { useState } from "react";
import FaceScan from "./FaceScan";
import PolkadotWalletConnect from "./PolkadotWalletConnect";
import SensitiveActionSignature from "./SensitiveActionSignature";

const sensitiveActions = [
  "Sending funds",
  "Voting on referenda",
  "Staking",
  "Withdrawals",
  "Signing smart contracts",
  "Cross chain transfers",
  "Multisig"
];

function App() {
  const [step, setStep] = useState(0);
  const [walletAddress, setWalletAddress] = useState(null);
  const [selectedActions, setSelectedActions] = useState([]);

  const handleActionChange = (action) => {
    setSelectedActions((prev) =>
      prev.includes(action)
        ? prev.filter((a) => a !== action)
        : [...prev, action]
    );
  };

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif", maxWidth: 440, margin: "auto" }}>
      <h1>MiD Registration Flow</h1>

      {step === 0 && (
        <>
          <h2>Step 1: Register your face</h2>
          <FaceScan onFaceDetected={() => setStep(1)} />
        </>
      )}

      {step === 1 && (
        <>
          <h2>Step 2: Connect your Polkadot Wallet</h2>
          <PolkadotWalletConnect onConnected={address => {
            setWalletAddress(address);
            setStep(2);
          }} />
        </>
      )}

      {step === 2 && (
        <>
          <h2>Face registered successfully!</h2>
          <p>Your face is now connected to your wallet.</p>
          <h3>Step 3: Activate Wallet Signature for Sensitive Actions</h3>
          <p>
            Choose actions that require extra security (wallet signature). If you skip, your face will be used for all authorizations.
          </p>
          <div>
            {sensitiveActions.map(action => (
              <label key={action} style={{ display: "block", marginBottom: 6 }}>
                <input
                  type="checkbox"
                  checked={selectedActions.includes(action)}
                  onChange={() => handleActionChange(action)}
                />
                {action}
              </label>
            ))}
          </div>
          <button
            style={{ marginTop: 12 }}
            onClick={() => {
              if (selectedActions.length > 0) {
                setStep(3);
              } else {
                setStep(4);
              }
            }}
          >
            {selectedActions.length > 0
              ? "Activate Wallet Signature"
              : "Skip (Use Face for All)"}
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <h2>Activate Wallet Signature</h2>
          <SensitiveActionSignature
            address={walletAddress}
            actions={selectedActions}
            onSignatureDone={() => setStep(4)}
          />
        </>
      )}

      {step === 4 && (
        <>
          <h2>Setup Complete!</h2>
          {selectedActions.length > 0 ? (
            <p>
              Wallet signature activated for: <b>{selectedActions.join(", ")}</b>.<br />
              For other actions, your face will be used for authorization.
            </p>
          ) : (
            <p>
              Your face will be used for authorization for all actions.
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default App;