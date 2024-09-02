"use client";

import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Modal, Form, Input, Radio, Button, Tabs, Table } from "antd";
import { Bolt, BookOpen, XCircle } from "lucide-react";
import toast from "react-hot-toast";

const { Group: RadioGroup, Button: RadioButton } = Radio;
const { TabPane } = Tabs;

interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
  type: string;
  teacher: string;
  lab: string;
  color: string;
}

interface Resource {
  id: string;
  name: string;
  status: string;
  usage: { teacher: string; class: string }[];
}

const eventTypeColors: { [key: string]: string } = {
  Class: "#4a90e2",
  Extracurricular: "#f5a623",
  Lab: "#7ed321",
  Other: "#d0021b",
};

const initialEvents: Event[] = [];
const initialResources: Resource[] = [
  { id: "1", name: "Projector", status: "Operational", usage: [] },
  {
    id: "2",
    name: "Whiteboard",
    status: "In Use",
    usage: [{ teacher: "John Doe", class: "Math 101" }],
  },
];

const ResourceManager = () => {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [resources, setResources] = useState<Resource[]>(initialResources);
  const [usageDetails, setUsageDetails] = useState<
    { teacher: string; class: string }[] | null
  >(null);

  const handleEventDrop = (info: any) => {
    const updatedEvent = {
      id: info.event.id,
      title: info.event.title,
      start: info.event.startStr,
      end: info.event.endStr,
      type: info.event.extendedProps.type,
      teacher: info.event.extendedProps.teacher,
      lab: info.event.extendedProps.lab,
      color: info.event.extendedProps.color,
    };

    const isConflict = events.some(
      (event) =>
        event.start < updatedEvent.end &&
        event.end > updatedEvent.start &&
        event.id !== updatedEvent.id
    );

    if (isConflict) {
      toast.error("Conflict detected! Cannot place this event here.");
    } else {
      setEvents((prev) => {
        if (!prev) return [updatedEvent];
        return [...prev.filter((e) => e.id !== updatedEvent.id), updatedEvent];
      });
      toast.success("Event updated successfully.");
    }
  };

  const handleSelectSlot = (info: any) => {
    setSelectedEvent({
      id: `${Date.now()}`,
      title: "",
      start: info.startStr,
      end: info.endStr,
      type: "Class",
      teacher: "",
      lab: "",
      color: eventTypeColors["Class"],
    });
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (selectedEvent) {
      setEvents((prev) => {
        if (!prev) return [selectedEvent];
        return [...prev, selectedEvent];
      });
      toast.success("Event added successfully.");
    }
    setIsModalVisible(false);
    setSelectedEvent(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedEvent(null);
  };

  const handleFormChange = (changedValues: any) => {
    if (selectedEvent) {
      const updatedEvent: Event = {
        ...selectedEvent,
        ...changedValues,
        color: eventTypeColors[changedValues.type] || selectedEvent.color,
      };
      setSelectedEvent(updatedEvent);
    }
  };

  const handleResourceMaintenance = (resourceId: string) => {
    setResources((prev) => {
      const updatedResources = prev.map((res) =>
        res.id === resourceId ? { ...res, status: "Needs Maintenance" } : res
      );
      toast.success("Resource maintenance status updated.");
      return updatedResources;
    });
  };

  const showUsageDetails = (resource: Resource) => {
    setUsageDetails(resource.usage);
  };

  const eventContent = (eventInfo: any) => {
    const { event } = eventInfo;
    const { extendedProps } = event;
    return (
      <div className="flex items-center">
        <div
          className="w-3 h-3 mr-2"
          style={{ backgroundColor: extendedProps.color }}
        ></div>
        <span>{event.title}</span>
        <span className="ml-2 text-sm text-gray-600">
          ({extendedProps.teacher}, {extendedProps.lab})
        </span>
      </div>
    );
  };

  const typeSelectRender = () => {
    return Object.entries(eventTypeColors).map(([type, color]) => (
      <RadioButton
        key={type}
        value={type}
        style={{
          backgroundColor: color,
          borderRadius: "4px",
          color: "#fff",
          margin: "0 8px 8px 0",
        }}
      >
        {type}
      </RadioButton>
    ));
  };

  const resourceColumns = [
    {
      title: "Resource",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string, record: Resource) => (
        <Button
          type="link"
          onClick={() => {
            if (status === "In Use") {
              showUsageDetails(record);
            }
          }}
        >
          {status}
        </Button>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Resource) => (
        <Button
          type="link"
          onClick={() => handleResourceMaintenance(record.id)}
        >
          Mark as Needs Maintenance
        </Button>
      ),
    },
  ];

  const getResourceSummary = () => {
    const summary = {
      operational: resources.filter((res) => res.status === "Operational")
        .length,
      inUse: resources.filter((res) => res.status === "In Use").length,
      needsMaintenance: resources.filter(
        (res) => res.status === "Needs Maintenance"
      ).length,
    };

    return summary;
  };

  const { operational, inUse, needsMaintenance } = getResourceSummary();

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        Resource Manager
      </h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Resource Manager" key="1">
          <div className="w-full p-4 bg-white rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-bold mb-4">Resource Summary</h2>
            <div className="flex items-center justify-evenly space-x-6 mb-6">
              <div className="flex items-center">
                <BookOpen className="text-green-500 mr-2" />
                <div>
                  <h3 className="text-lg font-semibold">Operational</h3>
                  <p className="text-gray-600">{operational}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Bolt className="text-blue-500 mr-2" />
                <div>
                  <h3 className="text-lg font-semibold">In Use</h3>
                  <p className="text-gray-600">{inUse}</p>
                </div>
              </div>
              <div className="flex items-center">
                <XCircle className="text-red-500 mr-2" />
                <div>
                  <h3 className="text-lg font-semibold">Needs Maintenance</h3>
                  <p className="text-gray-600">{needsMaintenance}</p>
                </div>
              </div>
            </div>
            <h2 className="text-xl font-bold mb-4">Resources</h2>
            <Table
              columns={resourceColumns}
              dataSource={resources}
              rowKey="id"
              pagination={false}
            />
          </div>
        </TabPane>
        <TabPane tab="Class Manager" key="2">
          <div className="w-full p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Weekly Calendar</h2>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="timeGridWeek"
              events={events.map((event) => ({
                id: event.id,
                title: event.title,
                start: event.start,
                end: event.end,
                extendedProps: {
                  type: event.type,
                  teacher: event.teacher,
                  lab: event.lab,
                  color: event.color,
                },
              }))}
              selectable
              select={handleSelectSlot}
              eventDrop={handleEventDrop}
              eventContent={eventContent}
            />
          </div>
        </TabPane>
      </Tabs>

      <Modal
        title="Add/Edit Event"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          initialValues={selectedEvent || undefined}
          onValuesChange={handleFormChange}
          layout="vertical"
        >
          <Form.Item
            name="title"
            label="Event Title"
            rules={[
              { required: true, message: "Please input the event title!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="type" label="Event Type">
            <RadioGroup>{typeSelectRender()}</RadioGroup>
          </Form.Item>
          <Form.Item name="teacher" label="Teacher">
            <Input />
          </Form.Item>
          <Form.Item name="lab" label="Lab">
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Usage Details"
        visible={!!usageDetails}
        onCancel={() => setUsageDetails(null)}
        footer={null}
      >
        {usageDetails && usageDetails.length > 0 ? (
          <Table
            columns={[
              { title: "Teacher", dataIndex: "teacher", key: "teacher" },
              { title: "Class", dataIndex: "class", key: "class" },
            ]}
            dataSource={usageDetails}
            rowKey="teacher"
            pagination={false}
          />
        ) : (
          <p>No usage details available.</p>
        )}
      </Modal>
    </div>
  );
};

export default ResourceManager;
