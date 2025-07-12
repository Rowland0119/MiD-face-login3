import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";

export default function FaceScan({ onFaceDetected }) {
  const videoRef = useRef();
  const [status, setStatus] = useState("Loading models...");

  useEffect(() => {
    async function loadModels() {
      const MODEL_URL = "/models";
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL)
      ]);
      setStatus("Models loaded. Starting camera...");
      startCamera();
    }

    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        setStatus("Camera started. Look straight at the camera...");
      } catch (err) {
        setStatus("Camera access denied or not available.");
      }
    }

    loadModels();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleVideoPlay = () => {
    const interval = setInterval(async () => {
      if (!videoRef.current) return;
      const detection = await faceapi.detectSingleFace(
        videoRef.current,
        new faceapi.TinyFaceDetectorOptions()
      );
      if (detection) {
        setStatus("Face detected! You can continue.");
        clearInterval(interval);
        if (onFaceDetected) onFaceDetected();
      }
    }, 500);
  };

  return (
    <div>
      <div>{status}</div>
      <video
        ref={videoRef}
        autoPlay
        muted
        width={320}
        height={240}
        onPlay={handleVideoPlay}
        style={{ border: "1px solid #ccc", borderRadius: 8, marginTop: 10 }}
      />
    </div>
  );
}