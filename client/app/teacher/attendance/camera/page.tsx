"use client";

import { useState, useRef } from "react";
import Webcam from "react-webcam";
import { Camera } from "lucide-react";
import toast from "react-hot-toast";

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

  const handleUpload = async () => {
    if (capturedImage) {
      const response = await fetch(capturedImage);
      const blob = await response.blob();
      const formData = new FormData();
      formData.append("photo", blob, "attendance.jpg");

      try {
        const response = await fetch("http://127.0.0.1:8000/take_attendance", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          toast.success("Image uploaded successfully");
        } else {
          toast.error("Error uploading image");
        }
      } catch (error) {
        toast.error("Error uploading image");
      }
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
              mirrored={true}
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
          <>
            <img
              src={capturedImage}
              alt="Captured"
              className="object-cover w-full h-full rounded-lg"
            />
            <button
              onClick={handleUpload}
              className="mt-4 p-4 rounded-lg bg-green-500 text-white flex items-center space-x-2"
            >
              <span>Upload</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
