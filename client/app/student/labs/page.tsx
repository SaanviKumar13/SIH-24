"use client";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";

const labsData = [
  {
    title: "AR Lab",
    description: "Experience Augmented Reality with cutting-edge technology.",
    image: "",
  },
  {
    title: "VR Lab",
    description: "Dive into Virtual Reality with immersive experiences.",
    image: "",
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
              src={labsData[currentIndex].image}
              alt={labsData[currentIndex].title}
              width={300}
              height={200}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-bold text-secondary">
              {labsData[currentIndex].title}
            </h2>
            <p className="text-sm text-gray-600">
              {labsData[currentIndex].description}
            </p>
          </div>
          <button onClick={handleNext}>
            <ChevronRightIcon className="w-8 h-8 text-secondary" />
          </button>
        </div>
      </div>
    </div>
  );
}
