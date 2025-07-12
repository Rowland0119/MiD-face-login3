import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import { web3Enable, web3Accounts } from '@polkadot/extension-dapp';

export default function MiDMVP() {
  const videoRef = useRef();
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [embedding, setEmbedding] = useState(null);
  const [step, setStep] = useState('face'); // 'face' | 'wallet' | 'done'
  const [wallet, setWallet] = useState(null);
  const [status, setStatus] = useState('');

  // 1. Load face-api.js models once
  useEffect(() => {
    const loadModels = async () => {
      setStatus('Loading models...');
      await Promise.all([
        faceapi.nets.tinyFaceDetector.load('/models'),
        faceapi.nets.faceRecognitionNet.load('/models'),
        faceapi.nets.faceLandmark68Net.load('/models'),
      ]);
      setModelsLoaded(true);
      setStatus('');
    };
    loadModels();
  }, []);

  // 2. Start webcam after models load
  useEffect(() => {
    if (!modelsLoaded) return;
    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    });
  }, [modelsLoaded]);

  // 3. Handle face registration
  const handleFaceRegister = async () => {
    setStatus('Detecting face...');
    const detections = await faceapi
      .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!detections) {
      setStatus('No face detected. Try again.');
      return;
    }
    setEmbedding(Array.from(detections.descriptor));
    setStatus('Face registered!');
    setStep('wallet');
  };

  // 4. Connect Polkadot.js wallet
  const handleWalletConnect = async () => {
    await web3Enable('MiD MVP');
    const accounts = await web3Accounts();
    if (accounts.length === 0) {
      setStatus('No Polkadot.js wallet found!');
      return;
    }
    const address = accounts[0].address;
    setWallet(address);
    // Save {address, embedding} locally
    localStorage.setItem('mid_identity', JSON.stringify({
      address,
      embedding,
    }));
    setStatus('Registration complete! Data is only in your browser.');
    setStep('done');
  };

  return (
    <div style={{ maxWidth: 420, margin: 'auto', padding: 20 }}>
      <h2>MiD MVP Demo</h2>
      {status && <p>{status}</p>}
      {step === 'face' && (
        <>
          <p>Step 1: Register your face.</p>
          <video ref={videoRef} autoPlay muted width={320} height={240} style={{ borderRadius: 8 }} />
          <br />
          <button onClick={handleFaceRegister} disabled={!modelsLoaded}>Register Face</button>
        </>
      )}
      {step === 'wallet' && (
        <>
          <p>Step 2: Connect your Polkadot.js wallet.</p>
          <button onClick={handleWalletConnect}>Connect Wallet</button>
        </>
      )}
      {step === 'done' && (
        <>
          <p>✅ Registration complete!</p>
          <p><b>Wallet:</b> {wallet}</p>
          <p style={{ fontSize: 12, color: '#888' }}>
            (Face embedding & wallet address securely stored in your browser's local storage. Nothing is sent to any server.)
          </p>
        </>
      )}
    </div>
  );
}