"use client";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default function PerformanceAnalytics() {
  const [performance, setPerformance] = useState<any>({
    subjects: ["Math", "Science", "English", "History", "Art"],
    marks: {
      Math: [85, 90, 88, 92],
      Science: [78, 82, 85, 87],
      English: [92, 89, 94, 90],
      History: [80, 84, 86, 88],
      Art: [95, 96, 94, 97],
    },
    teachersRemarks: {
      Math: "Consistent performance, needs to focus on problem-solving.",
      Science: "Improvement observed, keep it up.",
      English: "Excellent grasp of the subject.",
      History: "Good understanding, could participate more in discussions.",
      Art: "Outstanding creativity.",
    },
  });

  const downloadMarksheet = () => {
    const doc = new jsPDF();
    doc.text("Marksheet", 20, 20);
    autoTable(doc, {
      head: [["Subject", "Marks", "Remarks"]],
      body: Object.keys(performance.marks).map((subject: any) => [
        subject,
        performance.marks[subject].join(", "),
        performance.teachersRemarks[subject],
      ]),
    });
    doc.save("marksheet.pdf");
  };

  const data = {
    labels: ["Term 1", "Term 2", "Term 3", "Term 4"], // Example terms
    datasets: Object.keys(performance.marks).map((subject, index) => ({
      label: subject,
      data: performance.marks[subject],
      fill: false,
      backgroundColor: `rgba(${index * 50}, 70, 229, 0.8)`,
      borderColor: `rgba(${index * 50}, 70, 229, 1)`,
    })),
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold text-secondary mb-6">
        Performance Analytics
      </h1>

      {/* Graphical Progress */}
      <div className="w-full md:w-[60vw] bg-white rounded-lg shadow-md p-5 mb-8">
        <h2 className="text-2xl font-bold text-secondary mb-4">
          Progress Throughout the Year
        </h2>
        <Line data={data} />
      </div>

      {/* Table Format for Marks and Remarks */}
      <div className="w-full md:w-[60vw] bg-white rounded-lg shadow-md p-5 mb-8">
        <h2 className="text-2xl font-bold text-secondary mb-4">
          Marks & Remarks
        </h2>
        <table className="w-full text-left table-auto border-collapse">
          <thead>
            <tr>
              <th className="border-b-2 py-2 text-secondary">Subject</th>
              <th className="border-b-2 py-2 text-secondary">Marks</th>
              <th className="border-b-2 py-2 text-secondary">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(performance.marks).map((subject) => (
              <tr key={subject}>
                <td className="border-b py-2">{subject}</td>
                <td className="border-b py-2">
                  {performance.marks[subject].join(", ")}
                </td>
                <td className="border-b py-2">
                  {performance.teachersRemarks[subject]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Download Marksheet Button */}
      <button
        onClick={downloadMarksheet}
        className="px-4 py-2 font-bold text-white bg-secondary rounded-md hover:bg-secondary/85"
      >
        Download Marksheet
      </button>
    </div>
  );
}
