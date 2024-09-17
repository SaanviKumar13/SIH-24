"use client";
import { Card, Col, Row } from "antd";
import { useRouter } from "next/navigation";
import Chatbot from "../student/ailearn/page";

// Example student data
const students = [
  { id: "1", name: "Alice Johnson", className: "7-B" },
  { id: "2", name: "Bob Smith", className: "5-A" },
  { id: "3", name: "Charlie Brown", className: "10-D" },
];

const ParentDashboard = () => {
  const router = useRouter();

  const handleCardClick = (studentId: string) => {
    router.push(`/student`);
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        Your Children in School
      </h1>
      <Row gutter={16}>
        {students.map((student) => (
          <Col span={8} key={student.id}>
            <Card
              title={student.name}
              bordered={false}
              hoverable
              onClick={() => handleCardClick(student.id)}
              className="cursor-pointer"
            >
              <p>Class: {student.className}</p>
            </Card>
          </Col>
        ))}
      </Row>
      <Chatbot />
    </div>
  );
};

export default ParentDashboard;
