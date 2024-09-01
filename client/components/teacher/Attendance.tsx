"use client";

import { useState } from "react";
import Papa from "papaparse";
import { CSVLink } from "react-csv";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface AttendanceRecord {
  id: string;
  name: string;
  time: string;
  status: "Present" | "Absent";
}

const records: Record<string, AttendanceRecord[]> = {
  "2024-08-25": [
    { id: "1", name: "John Doe", time: "09:00 AM", status: "Present" },
    { id: "2", name: "Jane Smith", time: "09:15 AM", status: "Absent" },
    { id: "3", name: "Emily Johnson", time: "09:30 AM", status: "Present" },
    { id: "4", name: "Michael Brown", time: "09:45 AM", status: "Absent" },
  ],
  "2024-09-01": [
    { id: "1", name: "John Doe", time: "09:00 AM", status: "Absent" },
    { id: "2", name: "Jane Smith", time: "09:15 AM", status: "Present" },
    { id: "3", name: "Emily Johnson", time: "09:30 AM", status: "Present" },
    { id: "4", name: "Michael Brown", time: "09:45 AM", status: "Present" },
  ],
  "2024-09-02": [
    { id: "1", name: "John Doe", time: "09:00 AM", status: "Present" },
    { id: "2", name: "Jane Smith", time: "09:15 AM", status: "Absent" },
    { id: "3", name: "Emily Johnson", time: "09:30 AM", status: "Absent" },
    { id: "4", name: "Michael Brown", time: "09:45 AM", status: "Present" },
  ],
};

const getAttendanceRecordsForDate = (date: string): AttendanceRecord[] => {
  return records[date] || [];
};

export default function Attendance() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [csvData, setCsvData] = useState<AttendanceRecord[]>([]);

  const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (result) => {
          const newAttendanceRecords: AttendanceRecord[] = result.data.map(
            (row: any) => ({
              id: row.id,
              name: row.name,
              time: row.time,
              status: row.status === "Present" ? "Present" : "Absent",
            })
          );
          setCsvData(newAttendanceRecords);
          alert("Attendance data updated successfully!");
        },
      });
    }
  };

  const formattedDate = selectedDate
    ? selectedDate.toISOString().split("T")[0]
    : "";
  const attendanceRecords = getAttendanceRecordsForDate(formattedDate);

  const presentCount = attendanceRecords.filter(
    (record) => record.status === "Present"
  ).length;
  const absentCount = attendanceRecords.filter(
    (record) => record.status === "Absent"
  ).length;
  const absentees = attendanceRecords
    .filter((record) => record.status === "Absent")
    .map((record) => record.name)
    .join(", ");

  const exportData = attendanceRecords.map((record) => ({
    Name: record.name,
    Time: record.time,
    Status: record.status,
  }));

  return (
    <div className="min-h-screen bg-primary">
      <h1 className="text-4xl font-bold text-secondary mb-6">
        Class Attendance Tracking
      </h1>

      <div className="flex flex-col space-y-6">
        <div className="flex items-center gap-5">
          <h2 className="text-xl font-bold text-secondary">Select Date</h2>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="yyyy-MM-dd"
            className="p-2 rounded-lg border border-gray-300 bg-white text-secondary w-full"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1 p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-secondary">
              Attendance on {formattedDate}
            </h2>
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1 bg-green-100 p-4 rounded-lg text-green-800">
                <h3 className="text-lg font-bold">Present</h3>
                <p className="text-2xl font-semibold">{presentCount}</p>
              </div>
              <div className="mx-4 border-l border-gray-300 h-16"></div>
              <div className="flex-1 bg-red-100 p-4 rounded-lg text-red-800">
                <h3 className="text-lg font-bold">Absent</h3>
                <p className="text-2xl font-semibold">{absentCount}</p>
              </div>
            </div>
            {absentees && (
              <p className="text-lg mt-2">
                <span className="font-bold">Absentees:</span> {absentees}
              </p>
            )}
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Attendance Records</h2>
          <table className="min-w-full divide-y divide-gray-200">
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
              {attendanceRecords.map((entry) => (
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

        <div>
          <div className="mt-4 flex space-x-4">
            <CSVLink
              data={exportData}
              filename={"attendance_data.csv"}
              className="p-2 bg-blue-500 text-white rounded-lg shadow-md"
            >
              Export to CSV
            </CSVLink>
            <label className="p-2 bg-green-500 text-white rounded-lg shadow-md cursor-pointer">
              Upload New Attendance CSV
              <input
                type="file"
                accept=".csv"
                className="hidden"
                onChange={handleCSVUpload}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
