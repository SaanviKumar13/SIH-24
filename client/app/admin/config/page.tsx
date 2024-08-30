"use client";

import { useState } from "react";
import { Button, Input, Table, Tabs, message, Select } from "antd";
import { User, Book, Calendar, Settings, Plus, Trash } from "lucide-react";

const { TabPane } = Tabs;

const mockTeachers = [
  { id: "1", name: "John Doe", role: "Math Teacher" },
  { id: "2", name: "Jane Smith", role: "Science Teacher" },
];

const mockSubjects = [
  { id: "1", grade: "Grade 1", subjects: "Math, English" },
  { id: "2", grade: "Grade 2", subjects: "Science, History" },
];

const mockAssignments = [
  { id: "1", className: "Class A", teacher: "John Doe" },
  { id: "2", className: "Class B", teacher: "Jane Smith" },
];

const SystemConfigurationPage = () => {
  const [teachers, setTeachers] = useState<any>(mockTeachers);
  const [subjects, setSubjects] = useState<any>(mockSubjects);
  const [assignments, setAssignments] = useState<any>(mockAssignments);

  const [editingCell, setEditingCell] = useState<any>({});

  const handleSave = () => {
    message.success("Configuration saved successfully!");
  };

  const handleAddTeacher = () => {
    setTeachers([
      ...teachers,
      { id: Date.now().toString(), name: "New Teacher", role: "New Role" },
    ]);
  };

  const handleAddSubject = () => {
    setSubjects([
      ...subjects,
      {
        id: Date.now().toString(),
        grade: "New Grade",
        subjects: "New Subjects",
      },
    ]);
  };

  const handleAddAssignment = () => {
    setAssignments([
      ...assignments,
      {
        id: Date.now().toString(),
        className: "New Class",
        teacher: "New Teacher",
      },
    ]);
  };

  const handleEditCell = (id: string, key: string, value: string) => {
    const updateFunction = (data: any[], key: string, value: string) =>
      data.map((item) => (item.id === id ? { ...item, [key]: value } : item));

    if (editingCell.tab === "1") {
      setTeachers(updateFunction(teachers, key, value));
    } else if (editingCell.tab === "2") {
      setSubjects(updateFunction(subjects, key, value));
    } else if (editingCell.tab === "3") {
      setAssignments(updateFunction(assignments, key, value));
    }
  };

  const columnsForTab = (tab: string) => {
    if (tab === "1") {
      return [
        {
          title: "Name",
          dataIndex: "name",
          render: (text: string, record: any) => (
            <div
              onDoubleClick={() =>
                setEditingCell({ id: record.id, key: "name", tab })
              }
              className="editable-cell"
            >
              {editingCell.id === record.id && editingCell.key === "name" ? (
                <Input
                  defaultValue={text}
                  onBlur={(e) => {
                    handleEditCell(record.id, "name", e.target.value);
                    setEditingCell({});
                  }}
                  onPressEnter={(e: any) => {
                    handleEditCell(record.id, "name", e.target.value);
                    setEditingCell({});
                  }}
                />
              ) : (
                text
              )}
            </div>
          ),
        },
        {
          title: "Role",
          dataIndex: "role",
          render: (text: string, record: any) => (
            <div
              onDoubleClick={() =>
                setEditingCell({ id: record.id, key: "role", tab })
              }
              className="editable-cell"
            >
              {editingCell.id === record.id && editingCell.key === "role" ? (
                <Input
                  defaultValue={text}
                  onBlur={(e) => {
                    handleEditCell(record.id, "role", e.target.value);
                    setEditingCell({});
                  }}
                  onPressEnter={(e: any) => {
                    handleEditCell(record.id, "role", e.target.value);
                    setEditingCell({});
                  }}
                />
              ) : (
                text
              )}
            </div>
          ),
        },
        {
          title: "Actions",
          render: (text: string, record: any) => (
            <Button
              icon={<Trash />}
              onClick={() =>
                setTeachers(teachers.filter((t: any) => t.id !== record.id))
              }
              danger
            />
          ),
        },
      ];
    } else if (tab === "2") {
      return [
        {
          title: "Grade",
          dataIndex: "grade",
          render: (text: string, record: any) => (
            <div
              onDoubleClick={() =>
                setEditingCell({ id: record.id, key: "grade", tab })
              }
              className="editable-cell"
            >
              {editingCell.id === record.id && editingCell.key === "grade" ? (
                <Input
                  defaultValue={text}
                  onBlur={(e) => {
                    handleEditCell(record.id, "grade", e.target.value);
                    setEditingCell({});
                  }}
                  onPressEnter={(e: any) => {
                    handleEditCell(record.id, "grade", e.target.value);
                    setEditingCell({});
                  }}
                />
              ) : (
                text
              )}
            </div>
          ),
        },
        {
          title: "Subjects",
          dataIndex: "subjects",
          render: (text: string, record: any) => (
            <div
              onDoubleClick={() =>
                setEditingCell({ id: record.id, key: "subjects", tab })
              }
              className="editable-cell"
            >
              {editingCell.id === record.id &&
              editingCell.key === "subjects" ? (
                <Input
                  defaultValue={text}
                  onBlur={(e) => {
                    handleEditCell(record.id, "subjects", e.target.value);
                    setEditingCell({});
                  }}
                  onPressEnter={(e: any) => {
                    handleEditCell(record.id, "subjects", e.target.value);
                    setEditingCell({});
                  }}
                />
              ) : (
                text
              )}
            </div>
          ),
        },
        {
          title: "Actions",
          render: (text: string, record: any) => (
            <Button
              icon={<Trash />}
              onClick={() =>
                setSubjects(subjects.filter((s: any) => s.id !== record.id))
              }
              danger
            />
          ),
        },
      ];
    } else if (tab === "3") {
      return [
        {
          title: "Class Name",
          dataIndex: "className",
          render: (text: string, record: any) => (
            <div
              onDoubleClick={() =>
                setEditingCell({ id: record.id, key: "className", tab })
              }
              className="editable-cell"
            >
              {editingCell.id === record.id &&
              editingCell.key === "className" ? (
                <Input
                  defaultValue={text}
                  onBlur={(e) => {
                    handleEditCell(record.id, "className", e.target.value);
                    setEditingCell({});
                  }}
                  onPressEnter={(e: any) => {
                    handleEditCell(record.id, "className", e.target.value);
                    setEditingCell({});
                  }}
                />
              ) : (
                text
              )}
            </div>
          ),
        },
        {
          title: "Teacher",
          dataIndex: "teacher",
          render: (text: string, record: any) => (
            <div
              onDoubleClick={() =>
                setEditingCell({ id: record.id, key: "teacher", tab })
              }
              className="editable-cell"
            >
              {editingCell.id === record.id && editingCell.key === "teacher" ? (
                <Input
                  defaultValue={text}
                  onBlur={(e) => {
                    handleEditCell(record.id, "teacher", e.target.value);
                    setEditingCell({});
                  }}
                  onPressEnter={(e: any) => {
                    handleEditCell(record.id, "teacher", e.target.value);
                    setEditingCell({});
                  }}
                />
              ) : (
                text
              )}
            </div>
          ),
        },
        {
          title: "Actions",
          render: (text: string, record: any) => (
            <Button
              icon={<Trash />}
              onClick={() =>
                setAssignments(
                  assignments.filter((a: any) => a.id !== record.id)
                )
              }
              danger
            />
          ),
        },
      ];
    }
  };

  return (
    <div className="min-h-screen bg-primary p-8">
      <h1 className="text-4xl font-bold text-secondary mb-6">
        System Configuration
      </h1>

      <Tabs
        defaultActiveKey="1"
        className="mb-6"
        onChange={(key) => setEditingCell({})}
      >
        <TabPane
          tab={
            <span>
              <User /> Teacher Settings
            </span>
          }
          key="1"
        >
          <div className="flex flex-col space-y-4">
            <Button type="primary" icon={<Plus />} onClick={handleAddTeacher}>
              Add Teacher
            </Button>
            <Table
              dataSource={teachers}
              columns={columnsForTab("1")}
              rowKey="id"
              pagination={false}
              className="bg-white rounded-lg shadow-md"
            />
          </div>
        </TabPane>
        <TabPane
          tab={
            <span>
              <Book /> Subjects for Each Grade
            </span>
          }
          key="2"
        >
          <div className="flex flex-col space-y-4">
            <Button type="primary" icon={<Plus />} onClick={handleAddSubject}>
              Add Subject
            </Button>
            <Table
              dataSource={subjects}
              columns={columnsForTab("2")}
              rowKey="id"
              pagination={false}
              className="bg-white rounded-lg shadow-md"
            />
          </div>
        </TabPane>
        <TabPane
          tab={
            <span>
              <Calendar /> Class Assignments
            </span>
          }
          key="3"
        >
          <div className="flex flex-col space-y-4">
            <Button
              type="primary"
              icon={<Plus />}
              onClick={handleAddAssignment}
            >
              Assign Teacher
            </Button>
            <Table
              dataSource={assignments}
              columns={columnsForTab("3")}
              rowKey="id"
              pagination={false}
              className="bg-white rounded-lg shadow-md"
            />
          </div>
        </TabPane>
        <TabPane
          tab={
            <span>
              <Settings /> System Settings
            </span>
          }
          key="4"
        >
          <div className="flex flex-col space-y-4">
            <Button type="primary" icon={<Settings />} onClick={handleSave}>
              Save Settings
            </Button>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default SystemConfigurationPage;
