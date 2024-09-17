"use client";
import { useState } from "react";
import { Send } from "lucide-react";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold text-secondary mb-6">Chatbot</h1>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-5 flex flex-col">
        <div className="flex-grow overflow-y-auto space-y-4 mb-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${
                message.sender === "bot"
                  ? "bg-blue-100 text-blue-800 self-start"
                  : "bg-green-100 text-green-800 self-end"
              } max-w-xs`}
            >
              {message.text}
            </div>
          ))}
        </div>
        <div className="flex items-center">
          <input
            className="flex-grow p-2 border border-gray-300 rounded-l-lg outline-none focus:ring-2 focus:ring-blue-600"
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleSend();
            }}
          />
          <button
            className="p-2 bg-secondary text-white rounded-r-lg"
            onClick={handleSend}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
