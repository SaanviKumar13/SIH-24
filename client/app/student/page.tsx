"use client";
import { useState, useEffect } from "react";
import { DeleteIcon } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { Notice } from "@/utils/types";

export default function Dashboard() {
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    const getAllNotices = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/notice");
        if (response.data.data && Array.isArray(response.data.data)) {
          setNotices(response.data.data);
          toast.success("Notices fetched successfully.");
        } else {
          toast.error("Unexpected data format received.");
        }
      } catch (error) {
        console.error("Error fetching notices:", error);
        toast.error("Failed to fetch notices.");
      }
    };

    getAllNotices();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Notice Board</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Notices</h2>
        <div className="space-y-4">
          {notices.length === 0 ? (
            <p className="text-gray-600">No notices available.</p>
          ) : (
            notices.map((notice) => (
              <div
                key={notice._id}
                className="p-4 bg-gray-50 rounded-lg flex justify-between items-center shadow-sm"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {notice.heading}
                  </h3>
                  <p className="text-gray-700">{notice.content}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
