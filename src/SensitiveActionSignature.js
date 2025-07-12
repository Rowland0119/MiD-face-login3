import React, { useState } from "react";
import { web3FromAddress } from "@polkadot/extension-dapp";
import { stringToHex } from "@polkadot/util";

export default function SensitiveActionSignature({ address, actions, onSignatureDone }) {
  const [signature, setSignature] = useState("");
  const [error, setError] = useState("");

  const requestSignature = async () => {
    setError("");
    try {
      const injector = await web3FromAddress(address);
      const message = `I authorize the following sensitive action(s):\n- ${actions.join("\n- ")}`;
      const signResult = await injector.signer.signRaw({
        address,
        data: stringToHex(message),
        type: "bytes"
      });
      setSignature(signResult.signature);
      if (onSignatureDone) onSignatureDone();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <p>
        Please sign this message in your wallet to activate extra security for:<br />
        <b>{actions.join(", ")}</b>
      </p>
      <button onClick={requestSignature}>Sign with Wallet</button>
      {signature && (
        <div>
          <strong>Signature:</strong>
          <pre style={{ wordBreak: "break-all" }}>{signature}</pre>
        </div>
      )}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}