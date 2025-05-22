import React, { useState } from "react";

export default function App() {
  const [step, setStep] = useState(0);
  const [requireSignature, setRequireSignature] = useState(
    () => JSON.parse(localStorage.getItem("requireSignature")) || false
  );

  const handleSignatureToggle = () => {
    localStorage.setItem("requireSignature", JSON.stringify(!requireSignature));
    setRequireSignature(!requireSignature);
  };

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif", maxWidth: 420, margin: "auto" }}>
      <h1>MiD: My Decentralized Face Identity</h1>

      {/* Settings */}
      <div style={{ border: "1px solid #eee", borderRadius: 8, padding: 12, marginBottom: 24 }}>
        <h3>Settings</h3>
        <label>
          <input
            type="checkbox"
            checked={requireSignature}
            onChange={handleSignatureToggle}
          />{" "}
          Require wallet signature for sensitive actions
        </label>
        <p style={{ fontSize: 12, color: "#888" }}>
          This adds an extra security step for things like transferring funds or updating important data.
        </p>
      </div>

      {/* App Flow */}
      {step === 0 && (
        <>
          <p>
            Connect your face identity to your Polkadot wallet for passwordless login.<br/>
            Your face data (template) is stored only in your browser.
          </p>
          <button onClick={() => setStep(1)}>Get Started</button>
        </>
      )}
      {step === 1 && (
        <>
          <p><b>Step 1:</b> Scan your face (simulated)</p>
          <div style={{ background: "#eee", width: 160, height: 160, borderRadius: 80, margin: "20px auto" }}>
            <span role="img" aria-label="face" style={{ fontSize: 80, lineHeight: "160px", display: "block", textAlign: "center" }}>🙂</span>
          </div>
          <button onClick={() => setStep(2)}>Face Recognized</button>
        </>
      )}
      {step === 2 && (
        <>
          <p><b>Step 2:</b> Connect your Polkadot.js wallet</p>
          <button style={{ background: "#e6007a", color: "white" }} onClick={() => setStep(3)}>
            Connect Polkadot.js
          </button>
        </>
      )}
      {step === 3 && (
        <>
          <p>✅ Face linked to your wallet!</p>
          <button onClick={() => setStep(4)}>Try Logging in to a Dapp</button>
        </>
      )}
      {step === 4 && (
        <>
          <p><b>Demo Dapp:</b> Login with MiD</p>
          <button onClick={() => setStep(5)}>Login with Face</button>
        </>
      )}
      {step === 5 && (
        <>
          <p>🎉 Success! You’re logged into the Dapp with your face and Polkadot wallet.</p>
          <button onClick={() => setStep(6)}>Initiate Sensitive Action</button>
        </>
      )}
      {step === 6 && (
        <>
          <p>🔒 <b>Sensitive Action Detected</b></p>
          {requireSignature ? (
            <>
              <p>For security, please sign this action with your wallet.</p>
              <button style={{ background: "#e6007a", color: "white" }} onClick={() => setStep(7)}>
                Simulate Wallet Signature
              </button>
            </>
          ) : (
            <>
              <p><i>Wallet signature not required (as per your settings).</i></p>
              <button onClick={() => setStep(7)}>Proceed</button>
            </>
          )}
        </>
      )}
      {step === 7 && (
        <>
          <p>✅ Sensitive action completed {requireSignature && "with wallet signature"}!</p>
          <p>Your high-security operation is now complete.</p>
        </>
      )}

      <div style={{ marginTop: 40, fontSize: 13, color: "#888" }}>
        <hr/>
        <b>For Integration:</b> MiD can be added to other Dapps as a face-login module. Future plans: support more blockchains (cross-chain).
      </div>
    </div>
  );
}
