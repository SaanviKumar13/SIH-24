"use client";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const labsData = [
  {
    qr: "https://adobeaero.app.link/v0PEHiTXSHb",
    name: "Ultrasonic Sensor",
    cover: "/cover/cover/ultrasonic.jpg",
    description:
      "Ultrasonic sensor used to determine the distance between the sensor and an object",
  },
  {
    qr: "https://adobeaero.app.link/rAq7hzSBTHb",
    name: "Arduino and Proximity Sensor",
    cover: "/cover/cover/proximity_sensor.jpg",
    description:
      "Proximity sensor used to determine the distance between the sensor and an object",
  },
  {
    qr: "https://adobeaero.app.link/AdcDQI5QyMb",
    name: "Geometry",
    cover: "/cover/cover/cover1.png",
    description: "Learning 2d geometry",
  },
];
export default function LabsShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? labsData.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === labsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold text-secondary mb-6">Labs Showcase</h1>
      <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex items-center justify-center space-x-6">
          <button onClick={handlePrev}>
            <ChevronLeftIcon className="w-8 h-8 text-secondary" />
          </button>
          <div className="text-center p-4">
            <Image
              src={labsData[currentIndex].cover}
              alt={labsData[currentIndex].name}
              width={300}
              height={800}
              className="w-fit h-fit object-cover mx-auto rounded-lg mb-4"
            />
            <h2 className="text-2xl font-bold text-secondary">
              {labsData[currentIndex].name}
            </h2>
            <p className="text-sm text-gray-600">
              {labsData[currentIndex].description}
            </p>
            <Link
              target="_blank"
              href={labsData[currentIndex].qr}
              className="text-secondary hover:font-semibold"
            >
              View Lab
            </Link>
          </div>
          <button onClick={handleNext}>
            <ChevronRightIcon className="w-8 h-8 text-secondary" />
          </button>
        </div>
      </div>
    </div>
  );
}
