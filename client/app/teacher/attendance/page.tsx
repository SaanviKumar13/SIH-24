"use client";

import { useState } from "react";
import Link from "next/link";
import Attendance from "@/components/teacher/Attendance"; // Make sure this path is correct

export default function AttendancePage() {
  return (
    <div className="min-h-screen bg-primary p-8">
      <h1 className="text-4xl font-bold text-secondary mb-6">
        Attendance Monitoring
      </h1>

      <div className="flex flex-col space-y-6">
        <div className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center">
          <h2 className="text-xl font-bold">Face Recognition</h2>
          <Link
            href="/teacher/attendance/camera"
            className="p-2 rounded-lg bg-blue-500 text-white"
          >
            Go to Camera
          </Link>
        </div>

        <Attendance />
      </div>
    </div>
  );
}
