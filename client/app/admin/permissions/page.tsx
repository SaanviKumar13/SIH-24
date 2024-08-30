"use client";

import { useState } from "react";
import * as XLSX from "xlsx";
import { Button, Input, Modal, Table, message } from "antd";
import { Upload, Download, Edit, Trash2 } from "lucide-react";

const colors = {
  primary: "#f0f4f8",
  secondary: "#1a202c",
  accent: "#2d3748",
  edit: "#4caf50",
  delete: "#f44336",
};

const initialUsers = [
  { id: "1", name: "John Doe", email: "john.doe@example.com", role: "Teacher" },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Admin",
  },
];

const UserManagementPage = () => {
  const [users, setUsers] = useState(initialUsers);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const handleEdit = (user: any) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const handleSave = () => {
    setUsers(
      users.map((user) => (user.id === editingUser.id ? editingUser : user))
    );
    setShowModal(false);
    message.success("User details updated successfully!");
  };

  const handleDelete = (id: string) => {
    setUsers(users.filter((user) => user.id !== id));
    message.success("User deleted successfully!");
  };

  const handleFileUpload = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryStr = event.target?.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setUsers((prevUsers: any) => [...prevUsers, ...jsonData]);
      message.success("Users imported successfully!");
    };
    reader.readAsBinaryString(file);
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(users);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Users");
    XLSX.writeFile(wb, "users.xlsx");
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: string, record: any) => (
        <div className="flex space-x-2">
          <Button
            icon={<Edit />}
            style={{ color: colors.edit }}
            onClick={() => handleEdit(record)}
          />
          <Button
            icon={<Trash2 />}
            style={{ color: colors.delete }}
            onClick={() => handleDelete(record.id)}
          />
        </div>
      ),
    },
  ];

  const handleInputChange = (e: any, field: string) => {
    const value = e.target.value;
    setEditingUser({ ...editingUser, [field]: value });
  };

  return (
    <div className="min-h-screen bg-primary p-8">
      <h1 className="text-4xl font-bold text-secondary mb-6">
        User Management
      </h1>

      <div className="mb-6 flex space-x-4">
        <Button
          type="primary"
          icon={<Upload />}
          onClick={() => document.getElementById("fileUpload")?.click()}
        >
          Import
        </Button>
        <Button type="primary" icon={<Download />} onClick={exportToExcel}>
          Export
        </Button>
        <input
          id="fileUpload"
          type="file"
          accept=".xlsx"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>

      <Table
        dataSource={users}
        columns={columns}
        rowKey="id"
        pagination={false}
        className="bg-white rounded-lg shadow-md"
      />

      <Modal
        title="Edit User"
        visible={showModal}
        onOk={handleSave}
        onCancel={() => setShowModal(false)}
      >
        {editingUser && (
          <div>
            <Input
              placeholder="Name"
              value={editingUser.name}
              onChange={(e) => handleInputChange(e, "name")}
              className="mb-2"
            />
            <Input
              placeholder="Email"
              value={editingUser.email}
              onChange={(e) => handleInputChange(e, "email")}
              className="mb-2"
            />
            <Input
              placeholder="Role"
              value={editingUser.role}
              onChange={(e) => handleInputChange(e, "role")}
              className="mb-2"
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UserManagementPage;
