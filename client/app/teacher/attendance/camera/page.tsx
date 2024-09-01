"use client";

import { useState, useRef } from "react";
import Webcam from "react-webcam";
import { Camera } from "lucide-react";

export default function CameraPage() {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  const handleCapture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary p-8">
      <h1 className="text-4xl font-bold text-secondary mb-6">
        Capture Attendance
      </h1>
      <div className="relative w-full h-full flex flex-col items-center justify-center bg-black">
        {!capturedImage ? (
          <>
            <Webcam
              audio={false}
              height={"80%"}
              screenshotFormat="image/jpeg"
              width={"100%"}
              videoConstraints={videoConstraints}
              className="rounded-lg"
              ref={webcamRef}
            />
            <button
              onClick={handleCapture}
              className="mt-4 p-4 rounded-lg bg-blue-500 text-white flex items-center space-x-2"
            >
              <Camera className="w-6 h-6" />
              <span>Capture</span>
            </button>
          </>
        ) : (
          <img
            src={capturedImage}
            alt="Captured"
            className="object-cover w-full h-full rounded-lg"
          />
        )}
      </div>
    </div>
  );
}
