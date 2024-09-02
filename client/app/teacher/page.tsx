"use client";
import { useState, useEffect } from "react";
import { DeleteIcon } from "lucide-react";
import toast from "react-hot-toast";
import { Notice } from "@/utils/types";
import axios from "axios";

export default function Dashboard() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [newNoticeHeading, setNewNoticeHeading] = useState<string>("");
  const [newNoticeContent, setNewNoticeContent] = useState<string>("");

  useEffect(() => {
    const getAllNotices = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/notice");
        console.log(response.data.data);
        setNotices(response.data.data);
        console.log(notices);
      } catch (error) {
        console.error("Error fetching notices:", error);
        toast.error("Failed to fetch notices.");
      }
    };

    getAllNotices();
  }, []);

  const handleAddNotice = async () => {
    if (newNoticeHeading.trim() && newNoticeContent.trim()) {
      try {
        const response = await fetch("http://127.0.0.1:8000/notice", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            heading: newNoticeHeading,
            content: newNoticeContent,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to add notice.");
        }

        const newNotice = await axios.get("http://127.0.0.1:8000/notice");
        setNotices(newNotice.data.data);
        setNewNoticeHeading("");
        setNewNoticeContent("");
        toast.success("Notice added successfully.");
      } catch (error) {
        console.error("Error adding notice:", error);
        toast.error("Failed to add notice.");
      }
    } else {
      toast.error("Please provide both heading and content.");
    }
  };

  const handleDeleteNotice = async (id: string) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/notice/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete notice.");
      }

      setNotices((prevNotices) =>
        prevNotices.filter((notice) => notice._id !== id)
      );
      toast.success("Notice deleted successfully.");
    } catch (error) {
      console.error("Error deleting notice:", error);
      toast.error("Failed to delete notice.");
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>

      <div className="mb-8 p-6 bg-white shadow-lg rounded-lg flex items-center space-x-4">
        <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold">
          T
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Teacher's Name
          </h2>
          <p className="text-gray-600">teacher@example.com</p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Notice Board
      </h2>
      <div className="p-6 bg-white shadow-lg rounded-lg border border-red-500">
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
                <button
                  onClick={() => handleDeleteNotice(notice._id)}
                  className="text-red-600 hover:text-red-800 font-semibold"
                >
                  <DeleteIcon className="text-red-600 hover:text-red-800" />
                </button>
              </div>
            ))
          )}
        </div>
        <div className="mt-6">
          <input
            type="text"
            placeholder="Notice heading..."
            value={newNoticeHeading}
            onChange={(e) => setNewNoticeHeading(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
          />
          <textarea
            placeholder="Notice content..."
            value={newNoticeContent}
            onChange={(e) => setNewNoticeContent(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
          ></textarea>
          <button
            onClick={handleAddNotice}
            className="w-fit bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold"
          >
            Add Notice
          </button>
        </div>
      </div>
    </div>
  );
}
