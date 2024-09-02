"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Upload, UserPlus, Eye } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Papa from "papaparse";

interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export default function AddTeacherPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/teacher");
      setTeachers(response.data);
    } catch (error) {
      toast.error("Error fetching teachers");
    }
  };

  const handleSubmit = async () => {
    if (!name || !email || !phone) {
      toast.error("Please fill in all fields");
      return;
    }

    const newTeacher: Teacher = { id: "", name, email, phone };

    try {
      await axios.post("http://127.0.0.1:8000/teacher", newTeacher);
      toast.success("Teacher added successfully!");
      fetchTeachers();
      setName("");
      setEmail("");
      setPhone("");
    } catch (error) {
      toast.error("Error creating teacher");
    }
  };

  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse<Teacher>(file, {
      header: true,
      complete: (results) => {
        const parsedTeachers = results.data;
        parsedTeachers.forEach(async (teacher) => {
          try {
            await axios.post("http://127.0.0.1:8000/teacher", teacher);
            toast.success(`Uploaded: ${teacher.name}`);
          } catch (error) {
            toast.error(`Failed to upload: ${teacher.name}`);
          }
        });
        fetchTeachers();
      },
    });
  };

  return (
    <div className="min-h-screen bg-primary p-8">
      <Toaster />
      <h1 className="text-4xl font-bold text-secondary mb-6">Add Teachers</h1>

      <div className="flex flex-col lg:flex-row lg:space-x-6">
        <div className="w-full lg:w-1/2 p-4 bg-white rounded-lg shadow-md space-y-4 mb-6 lg:mb-0">
          <h2 className="text-xl font-bold text-secondary flex items-center">
            <UserPlus className="mr-2" /> Add a New Teacher
          </h2>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-300 bg-white text-secondary"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-300 bg-white text-secondary"
          />
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-300 bg-white text-secondary"
          />
          <button
            onClick={handleSubmit}
            className="w-full p-2 bg-primary text-secondary rounded-lg"
          >
            Submit
          </button>
        </div>

        <div className="w-full lg:w-1/2 p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-secondary flex items-center">
            <Upload className="mr-2" /> Upload Teachers from CSV
          </h2>
          <input
            type="file"
            accept=".csv"
            onChange={handleCSVUpload}
            className="w-full p-2 rounded-lg border border-gray-300 bg-white text-secondary"
          />
        </div>
      </div>

      <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-secondary flex items-center">
          <Eye className="mr-2" /> View Teachers
        </h2>
        <table className="min-w-full mt-4 bg-white">
          <thead>
            <tr>
              <th className="border-b-2 border-gray-200 p-2 text-left">Name</th>
              <th className="border-b-2 border-gray-200 p-2 text-left">
                Email
              </th>
              <th className="border-b-2 border-gray-200 p-2 text-left">
                Phone
              </th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher.id}>
                <td className="border-b border-gray-200 p-2">{teacher.name}</td>
                <td className="border-b border-gray-200 p-2">
                  {teacher.email}
                </td>
                <td className="border-b border-gray-200 p-2">
                  {teacher.phone}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
