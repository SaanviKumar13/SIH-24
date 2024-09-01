"use client";

import { useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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
  math: "rgba(255, 99, 132, 0.5)",
  science: "rgba(54, 162, 235, 0.5)",
  history: "rgba(75, 192, 192, 0.5)",
  art: "rgba(255, 159, 64, 0.5)",
  present: "#4caf50",
  absent: "#f44336",
};

const studentPerformanceData: any = {
  "John Doe": {
    grades: [85, 90, 78, 92],
    weeklyAttendance: [5, 4, 6, 4],
  },
  "Jane Smith": {
    grades: [90, 85, 80, 88],
    weeklyAttendance: [6, 5, 4, 7],
  },
};

const labels = ["Week 1", "Week 2", "Week 3", "Week 4"];

const getStudentData = (student: string) => {
  const data = studentPerformanceData[student];
  return {
    grades: {
      labels,
      datasets: [
        {
          label: "Grades",
          data: data.grades,
          backgroundColor: [
            colors.math,
            colors.science,
            colors.history,
            colors.art,
          ],
          borderColor: colors.accent,
          borderWidth: 1,
        },
      ],
    },
    attendance: {
      labels,
      datasets: [
        {
          label: "Days Present",
          data: data.weeklyAttendance,
          backgroundColor: colors.present,
          borderColor: colors.accent,
          borderWidth: 1,
        },
      ],
    },
  };
};

export default function PerformanceTrackingPage() {
  const [selectedStudent, setSelectedStudent] = useState(
    Object.keys(studentPerformanceData)[0]
  );

  const studentNames = Object.keys(studentPerformanceData);

  return (
    <div className="min-h-screen bg-primary p-8">
      <h1 className="text-4xl font-bold text-secondary mb-6">
        Student Performance Tracking
      </h1>

      <div className="flex flex-col space-y-6">
        <div className="p-4 bg-white rounded-lg shadow-md flex flex-col space-y-4">
          <h2 className="text-xl font-bold mb-4 text-secondary">
            Select Student
          </h2>
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            className="p-2 rounded-lg border border-gray-300 bg-white text-secondary"
          >
            {studentNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-secondary">Grades</h2>
            <Bar
              data={getStudentData(selectedStudent).grades}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                    labels: {
                      color: colors.secondary,
                    },
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        return `${context.dataset.label}: ${context.raw}`;
                      },
                    },
                  },
                },
                scales: {
                  x: {
                    grid: {
                      color: colors.primary,
                    },
                    ticks: {
                      color: colors.secondary,
                    },
                  },
                  y: {
                    grid: {
                      color: colors.primary,
                    },
                    ticks: {
                      color: colors.secondary,
                      callback: (value) => `${value}%`,
                    },
                  },
                },
              }}
            />
          </div>

          <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-secondary">
              Attendance
            </h2>
            <Line
              data={getStudentData(selectedStudent).attendance}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                    labels: {
                      color: colors.secondary,
                    },
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        return `${context.dataset.label}: ${context.raw} days`;
                      },
                    },
                  },
                },
                scales: {
                  x: {
                    grid: {
                      color: colors.primary,
                    },
                    ticks: {
                      color: colors.secondary,
                    },
                  },
                  y: {
                    grid: {
                      color: colors.primary,
                    },
                    ticks: {
                      color: colors.secondary,
                      callback: (value) => `${value} days`,
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
