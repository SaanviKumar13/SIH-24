"use client";
import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Modal, Form, Input, Radio, Button, Tabs, Table, Checkbox } from "antd";
import { Bolt, BookOpen, XCircle, CheckCircle, Clock } from "lucide-react";
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

interface Ticket {
  id: string;
  title: string;
  description: string;
  className: string;
  completed: boolean;
  color: string;
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

const initialTickets: Ticket[] = [];

const ResourceManager = () => {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [resources, setResources] = useState<Resource[]>(initialResources);
  const [usageDetails, setUsageDetails] = useState<
    { teacher: string; class: string }[] | null
  >(null);
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [isTicketModalVisible, setIsTicketModalVisible] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

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

  const handleTicketChange = (changedValues: any) => {
    if (selectedTicket) {
      const updatedTicket: Ticket = {
        ...selectedTicket,
        ...changedValues,
        color: changedValues.completed ? "#4caf50" : "#d0021b",
      };
      setSelectedTicket(updatedTicket);
    }
  };

  const handleTicketOk = () => {
    if (selectedTicket) {
      setTickets((prev) => {
        if (!prev) return [selectedTicket];
        return [...prev, selectedTicket];
      });
      toast.success("Ticket added successfully.");
    }
    setIsTicketModalVisible(false);
    setSelectedTicket(null);
  };

  const handleTicketCancel = () => {
    setIsTicketModalVisible(false);
    setSelectedTicket(null);
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

  const ticketColumns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (title: string, record: Ticket) => (
        <div style={{ color: record.color }}>{title}</div>
      ),
    },
    {
      title: "Class Name",
      dataIndex: "className",
      key: "className",
    },
    {
      title: "Status",
      dataIndex: "completed",
      key: "completed",
      render: (completed: boolean) => (
        <div
          style={{
            color: completed ? "#4caf50" : "#d0021b",
            fontWeight: "bold",
          }}
        >
          {completed ? "Completed" : "Pending"}
        </div>
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
        <TabPane tab="Calendar" key="1">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            editable
            selectable
            events={events}
            eventContent={eventContent}
            select={handleSelectSlot}
            eventDrop={handleEventDrop}
          />
          <Modal
            title="Event Details"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Form
              layout="vertical"
              initialValues={selectedEvent}
              onValuesChange={handleFormChange}
            >
              <Form.Item label="Event Title" name="title">
                <Input />
              </Form.Item>
              <Form.Item label="Event Type" name="type">
                <RadioGroup>{typeSelectRender()}</RadioGroup>
              </Form.Item>
              <Form.Item label="Teacher Name" name="teacher">
                <Input />
              </Form.Item>
              <Form.Item label="Lab" name="lab">
                <Input />
              </Form.Item>
            </Form>
          </Modal>
        </TabPane>
        <TabPane tab="Resource List" key="2">
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
          </div>
          <Table
            dataSource={resources}
            columns={resourceColumns}
            rowKey="id"
            pagination={false}
          />
        </TabPane>
        <TabPane tab="Tickets" key="3">
          <Button
            type="primary"
            onClick={() => {
              setSelectedTicket({
                id: `${Date.now()}`,
                title: "",
                description: "",
                className: "",
                completed: false,
                color: "#d0021b",
              });
              setIsTicketModalVisible(true);
            }}
          >
            Raise Ticket
          </Button>
          <Table
            dataSource={tickets}
            columns={ticketColumns}
            rowKey="id"
            pagination={false}
            style={{ marginTop: 16 }}
          />
          <Modal
            title="Ticket Details"
            visible={isTicketModalVisible}
            onOk={handleTicketOk}
            onCancel={handleTicketCancel}
          >
            <Form
              layout="vertical"
              initialValues={selectedTicket}
              onValuesChange={handleTicketChange}
            >
              <Form.Item label="Ticket Title" name="title">
                <Input />
              </Form.Item>
              <Form.Item label="Description" name="description">
                <Input.TextArea />
              </Form.Item>
              <Form.Item label="Class Name" name="className">
                <Input />
              </Form.Item>
              <Form.Item label="Completed" name="completed">
                <Checkbox />
              </Form.Item>
              <Form.Item label="Ticket Color" name="color">
                <Input type="color" />
              </Form.Item>
            </Form>
          </Modal>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ResourceManager;
