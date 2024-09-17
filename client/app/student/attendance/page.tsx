"use client";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

export default function Attendance() {
  const [attendance, setAttendance] = useState({
    today: { date: "August 30, 2024", status: "Present" },
    monthly: [80, 85, 90, 70, 95, 100, 80, 85, 90, 95, 80, 100],
    overallPercentage: 90,
    unexcusedAbsences: 2,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [excuse, setExcuse] = useState("");

  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Attendance (%)",
        data: attendance.monthly,
        fill: true,
        backgroundColor: "rgba(79, 70, 229, 0.2)",
        borderColor: "rgba(79, 70, 229, 1)",
      },
    ],
  };

  const handleSubmitExcuse = () => {
    console.log("Excuse submitted:", excuse);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold text-secondary mb-6">Attendance</h1>
      <div className="w-full md:w-[60vw] flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
        <div className="w-full md:w-[30%] h-[10vw] bg-white rounded-lg shadow-md p-5">
          <div className="flex flex-col items-center">
            <p className="text-lg font-medium text-gray-600">
              Today&apos;s Date
            </p>
            <p className="text-xl font-bold text-secondary">
              {attendance.today.date}
            </p>
            <p
              className={`text-3xl font-bold mt-2 ${
                attendance.today.status === "Present"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {attendance.today.status}
            </p>
          </div>
        </div>

        <div className="w-full h-[10vw] md:w-[30%] bg-white rounded-lg shadow-md p-5">
          <div className="flex flex-col items-center">
            <p className="text-lg font-medium text-gray-600">
              Overall Attendance
            </p>
            <p
              className={`text-7xl font-bold ${
                attendance.overallPercentage >= 75
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {attendance.overallPercentage}%
            </p>
          </div>
        </div>

        <div className="w-full md:w-[30%] bg-white rounded-lg shadow-md p-5 flex flex-col items-center">
          <p className="text-lg font-medium text-gray-600">
            Unexcused Absences
          </p>
          <p
            className={`text-3xl font-bold ${
              attendance.unexcusedAbsences > 0
                ? "text-red-600"
                : "text-green-600"
            }`}
          >
            {attendance.unexcusedAbsences}
          </p>
          {attendance.unexcusedAbsences > 0 && (
            <div className="mt-4 w-full flex flex-col items-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full px-4 py-2 font-bold text-white bg-secondary rounded-md hover:bg-secondary/85"
              >
                Submit Excuse
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="w-full md:w-[60vw] bg-white rounded-lg shadow-md p-5 mb-8">
        <h2 className="text-2xl font-bold text-secondary mb-4">
          Monthly Attendance
        </h2>
        <Line data={data} />
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] md:w-[50%]">
            <h2 className="text-2xl font-bold text-secondary mb-4">
              Submit Excuse
            </h2>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md focus:border-secondary focus:outline-none"
              rows={4}
              placeholder="Enter your excuse..."
              value={excuse}
              onChange={(e) => setExcuse(e.target.value)}
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="mr-2 px-4 py-2 font-bold text-secondary border border-secondary rounded-md hover:bg-secondary hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitExcuse}
                className="px-4 py-2 font-bold text-white bg-secondary rounded-md hover:bg-secondary/85"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
