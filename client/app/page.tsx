"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [role, setRole] = useState("");
  const router = useRouter();

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (role) {
      router.push(`/${role.toLowerCase()}`);
    } else {
      alert("Please select a role.");
    }
  };

  return (
    <div className="flex flex-col place-items-center md:flex-row min-h-screen bg-primary">
      <div className="md:w-[60vw] w-full flex items-start justify-center pt-12 md:pt-0 p-8">
        <h1 className="text-4xl md:text-6xl font-bold text-secondary">
          Smart Classroom <br />
          Management System
        </h1>
      </div>
      <div>
        <h2 className="ml-2 text-2xl md:text-3xl font-bold text-left text-secondary">
          Login
        </h2>
        <div className="md:w-[30vw] md:h-[50vh] w-full flex items-center justify-center rounded-lg bg-white shadow-md p-5">
          <div className="w-full max-w-md">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-600">Select Role</p>
                <div className="flex flex-wrap md:flex-row justify-start gap-3 md:gap-5 mt-4">
                  <div
                    className={`w-fit h-fit px-3 py-2 flex items-center justify-center border-2 rounded-md cursor-pointer transition-colors duration-200 ${
                      role === "Student"
                        ? "border-secondary bg-secondary text-white"
                        : "border-gray-300 bg-gray-100 hover:border-secondary"
                    }`}
                    onClick={() => setRole("Student")}
                  >
                    Student
                  </div>
                  <div
                    className={`w-fit h-fit px-3 py-2 flex items-center justify-center border-2 rounded-md cursor-pointer transition-colors duration-200 ${
                      role === "Parent"
                        ? "border-secondary bg-secondary text-white"
                        : "border-gray-300 bg-gray-100 hover:border-secondary"
                    }`}
                    onClick={() => setRole("Parent")}
                  >
                    Parent
                  </div>
                  <div
                    className={`w-fit h-fit px-3 py-2 flex items-center justify-center border-2 rounded-md cursor-pointer transition-colors duration-200 ${
                      role === "Teacher"
                        ? "border-secondary bg-secondary text-white"
                        : "border-gray-300 bg-gray-100 hover:border-secondary"
                    }`}
                    onClick={() => setRole("Teacher")}
                  >
                    Teacher
                  </div>
                  <div
                    className={`w-fit h-fit px-3 py-2 flex items-center justify-center border-2 rounded-md cursor-pointer transition-colors duration-200 ${
                      role === "Admin"
                        ? "border-secondary bg-secondary text-white"
                        : "border-gray-300 bg-gray-100 hover:border-secondary"
                    }`}
                    onClick={() => setRole("Admin")}
                  >
                    Admin
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-600"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:border-secondary focus:bg-white focus:outline-none"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-600"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:border-secondary focus:bg-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 font-bold text-white bg-secondary rounded-md hover:bg-secondary/85"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
