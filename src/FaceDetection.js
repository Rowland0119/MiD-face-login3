import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";

export default function FaceDetection() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);

  // Load models on mount
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + "/models";
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      ]);
      setModelsLoaded(true);
    };
    loadModels();
  }, []);

  // Start video once models are loaded
  useEffect(() => {
    if (!modelsLoaded) return;
    navigator.mediaDevices
      .getUserMedia({ video: {} })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error("Camera error:", err));
  }, [modelsLoaded]);

  // Run detection
  useEffect(() => {
    if (!modelsLoaded) return;
    let interval;
    const handleVideo = async () => {
      if (videoRef.current && canvasRef.current) {
        const result = await faceapi.detectAllFaces(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        ).withFaceLandmarks().withFaceDescriptors();
        canvasRef.current
          .getContext("2d")
          .clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        faceapi.matchDimensions(canvasRef.current, {
          width: videoRef.current.videoWidth,
          height: videoRef.current.videoHeight,
        });
        const resized = faceapi.resizeResults(result, {
          width: videoRef.current.videoWidth,
          height: videoRef.current.videoHeight,
        });
        faceapi.draw.drawDetections(canvasRef.current, resized);
        faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
      }
    };
    interval = setInterval(handleVideo, 200); // every 200ms
    return () => clearInterval(interval);
  }, [modelsLoaded]);

  return (
    <div>
      <h2>Face Detection Demo</h2>
      {!modelsLoaded && <p>Loading models...</p>}
      <div style={{ position: "relative", width: 640, height: 480 }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          width="640"
          height="480"
          style={{ position: "absolute" }}
        />
        <canvas
          ref={canvasRef}
          width="640"
          height="480"
          style={{ position: "absolute" }}
        />
      </div>
    </div>
  );
}