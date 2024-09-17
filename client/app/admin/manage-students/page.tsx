"use client";
import { useState, useEffect } from "react";
import Papa from "papaparse";
import axios from "axios";
import { Upload, UserPlus, Eye } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  batch: string;
}

export default function AddStudentPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [batch, setBatch] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/students/66d43b7916f31c511bc6eb4e"
      );
      setStudents(response.data.data);
    } catch (error) {
      toast.error("Error fetching students");
    }
  };

  const handleSubmit = async () => {
    if (!name || !email || !phone || !address || !batch) {
      toast.error("Please fill in all fields");
      return;
    }

    const newStudent: Student = { id: "", name, email, phone, address, batch };

    try {
      await axios.post("http://127.0.0.1:8000/student", newStudent);
      toast.success("Student added successfully!");
      fetchStudents();
      setName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setBatch("");
    } catch (error) {
      toast.error("Error creating student");
    }
  };

  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse<Student>(file, {
      header: true,
      complete: (results) => {
        const parsedStudents = results.data;
        parsedStudents.forEach(async (student) => {
          try {
            await axios.post("http://127.0.0.1:8000/student", student);
            toast.success(`Uploaded: ${student.name}`);
          } catch (error) {
            toast.error(`Failed to upload: ${student.name}`);
          }
        });
        fetchStudents();
      },
    });
  };

  return (
    <div className="min-h-screen bg-primary p-8">
      <Toaster />
      <h1 className="text-4xl font-bold text-secondary mb-6">Add Students</h1>

      <div className="flex flex-col lg:flex-row lg:space-x-6">
        <div className="w-full lg:w-1/2 p-4 bg-white rounded-lg shadow-md space-y-4 mb-6 lg:mb-0">
          <h2 className="text-xl font-bold text-secondary flex items-center">
            <UserPlus className="mr-2" /> Add a New Student
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
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-300 bg-white text-secondary"
          />
          <input
            type="text"
            placeholder="Batch (e.g., 1-A, 2-B)"
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
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
            <Upload className="mr-2" /> Upload Students from CSV
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
          <Eye className="mr-2" /> View Students
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
              <th className="border-b-2 border-gray-200 p-2 text-left">
                Address
              </th>
              <th className="border-b-2 border-gray-200 p-2 text-left">
                Batch
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td className="border-b border-gray-200 p-2">{student.name}</td>
                <td className="border-b border-gray-200 p-2">
                  {student.email}
                </td>
                <td className="border-b border-gray-200 p-2">
                  {student.phone}
                </td>
                <td className="border-b border-gray-200 p-2">
                  {student.address}
                </td>
                <td className="border-b border-gray-200 p-2">
                  {student.batch}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
