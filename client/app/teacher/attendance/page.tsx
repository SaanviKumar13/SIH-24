"use client";

import { useState } from "react";
import { CSVLink } from "react-csv";
import { Camera, Download, Upload } from "lucide-react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const colors = {
  primary: "#f0f4f8",
  secondary: "#1a202c",
  accent: "#2d3748",
};

const mockAttendanceData = [
  { id: "1", name: "John Doe", time: "09:00 AM", status: "Present" },
  { id: "2", name: "Jane Smith", time: "09:15 AM", status: "Absent" },
  { id: "3", name: "Emily Johnson", time: "09:30 AM", status: "Present" },
  { id: "4", name: "Michael Brown", time: "09:45 AM", status: "Present" },
];

const attendanceTrends = {
  labels: ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM"],
  datasets: [
    {
      label: "Attendance",
      data: [50, 70, 80, 60, 90],
      borderColor: colors.accent,
      backgroundColor: "rgba(45, 55, 72, 0.2)",
      borderWidth: 2,
      tension: 0.1,
    },
  ],
};

export default function AttendancePage() {
  const [isFaceRecognitionEnabled, setFaceRecognitionEnabled] = useState(false);
  const [attendanceData, setAttendanceData] = useState<any>(mockAttendanceData);

  const handleFaceRecognitionToggle = () => {
    setFaceRecognitionEnabled((prev) => !prev);
  };

  const handleFaceRecognition = () => {
    console.log("Face recognition triggered");
  };

  const generateCSV = () => {
    return attendanceData.map((entry: any) => ({
      Name: entry.name,
      Time: entry.time,
      Status: entry.status,
    }));
  };

  return (
    <div className="min-h-screen bg-primary p-8">
      <h1 className="text-4xl font-bold text-secondary mb-6">
        Attendance Monitoring
      </h1>

      <div className="flex flex-col space-y-6">
        <div className="p-4 bg-white rounded-lg shadow-md flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Face Recognition</h2>
            <button
              onClick={handleFaceRecognitionToggle}
              className={`p-2 rounded-lg text-white ${
                isFaceRecognitionEnabled ? "bg-red-500" : "bg-green-500"
              }`}
            >
              {isFaceRecognitionEnabled ? "Disable" : "Enable"} Face Recognition
            </button>
          </div>

          {isFaceRecognitionEnabled && (
            <div className="relative w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg">
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <button
                  onClick={handleFaceRecognition}
                  className="p-2 rounded-lg bg-blue-500 text-white flex items-center space-x-2"
                >
                  <Camera className="w-5 h-5" />
                  <span>Start Face Recognition</span>
                </button>
              </div>

              <div className="w-full h-full bg-gray-800 rounded-lg"></div>
            </div>
          )}
        </div>

        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Attendance Trends</h2>
          <div className="h-64">
            <Line data={attendanceTrends} options={{ responsive: true }} />
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Attendance Records</h2>
          <table className="min-w-full divide-y divide-gray-200 mt-4">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {attendanceData.map((entry: any) => (
                <tr key={entry.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{entry.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{entry.time}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        entry.status === "Present"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {entry.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between p-4 bg-white rounded-lg shadow-md">
          <button
            onClick={() => console.log("Upload functionality")}
            className="p-2 rounded-lg bg-gray-500 text-white flex items-center space-x-2"
          >
            <Upload className="w-5 h-5" />
            <span>Upload Attendance</span>
          </button>
          <CSVLink
            data={generateCSV()}
            filename="attendance.csv"
            className="p-2 rounded-lg bg-green-500 text-white flex items-center space-x-2"
          >
            <Download className="w-5 h-5" />
            <span>Download CSV</span>
          </CSVLink>
        </div>
      </div>
    </div>
  );
}
