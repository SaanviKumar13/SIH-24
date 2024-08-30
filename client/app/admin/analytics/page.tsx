"use client";

import { Card, Col, Row, Typography } from "antd";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const { Title: AntTitle } = Typography;

const attendanceData = {
  labels: ["1st Grade", "2nd Grade", "3rd Grade", "4th Grade", "5th Grade"],
  datasets: [
    {
      label: "Attendance (%)",
      data: [92, 85, 88, 90, 93],
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
  ],
};

const marksData = {
  labels: ["1st Grade", "2nd Grade", "3rd Grade", "4th Grade", "5th Grade"],
  datasets: [
    {
      label: "Average Marks",
      data: [78, 82, 85, 88, 80],
      backgroundColor: "rgba(255, 159, 64, 0.2)",
      borderColor: "rgba(255, 159, 64, 1)",
      borderWidth: 1,
    },
  ],
};

const engagementData = {
  labels: ["1st Grade", "2nd Grade", "3rd Grade", "4th Grade", "5th Grade"],
  datasets: [
    {
      label: "Engagement Levels",
      data: [45, 30, 15, 10, 5],
      backgroundColor: ["#36a2eb", "#ff6384", "#ffcd56", "#4bc0c0", "#9966ff"],
    },
  ],
};

const expenditureData = {
  labels: ["1st Grade", "2nd Grade", "3rd Grade", "4th Grade", "5th Grade"],
  datasets: [
    {
      label: "Expenditure",
      data: [3000, 2500, 2000, 1500, 1000],
      backgroundColor: ["#ff6384", "#36a2eb", "#cc65fe", "#ffce56", "#4bc0c0"],
    },
  ],
};

const DataAnalyticsPage = () => {
  return (
    <div className="min-h-screen bg-primary p-8">
      <AntTitle className="text-4xl font-bold text-secondary mb-6">
        Data Analytics
      </AntTitle>

      <Row gutter={16}>
        <Col span={12}>
          <Card
            title="Attendance by Grade"
            className="bg-white rounded-lg shadow-md"
          >
            <Line
              data={attendanceData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "top" },
                  title: { display: true, text: "Attendance by Grade" },
                },
              }}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title="Average Marks per Grade"
            className="bg-white rounded-lg shadow-md"
          >
            <Bar
              data={marksData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "top" },
                  title: { display: true, text: "Average Marks per Grade" },
                },
              }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} className="mt-6">
        <Col span={12}>
          <Card
            title="Engagement Levels by Grade"
            className="bg-white rounded-lg shadow-md"
          >
            <Pie
              data={engagementData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "top" },
                  title: { display: true, text: "Engagement Levels by Grade" },
                },
              }}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title="Expenditure Breakdown by Grade"
            className="bg-white rounded-lg shadow-md"
          >
            <Pie
              data={expenditureData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "top" },
                  title: {
                    display: true,
                    text: "Expenditure Breakdown by Grade",
                  },
                },
              }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DataAnalyticsPage;
