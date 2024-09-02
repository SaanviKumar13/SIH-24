"use client";

import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Modal, Form, Input, Radio, Button } from "antd";
import toast from "react-hot-toast";

const { Group: RadioGroup, Button: RadioButton } = Radio;

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

const eventTypeColors: { [key: string]: string } = {
  Class: "#4a90e2",
  Extracurricular: "#f5a623",
  Lab: "#7ed321",
  Other: "#d0021b",
};

const initialEvents: Event[] = [];

const ResourceManager = () => {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        Resource Manager
      </h1>
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
            backgroundColor: event.color,
          }))}
          editable={true}
          selectable={true}
          select={handleSelectSlot}
          eventDrop={handleEventDrop}
          eventResize={handleEventDrop}
          eventContent={eventContent}
        />
      </div>

      <Modal
        title="Add Event"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Save"
        cancelText="Cancel"
      >
        <Form
          layout="vertical"
          onValuesChange={handleFormChange}
          initialValues={selectedEvent || {}}
        >
          <Form.Item
            name="title"
            label="Event Name"
            rules={[
              { required: true, message: "Please enter the event name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="type"
            label="Event Type"
            rules={[
              { required: true, message: "Please select the event type!" },
            ]}
          >
            <RadioGroup
              onChange={(e) => handleFormChange({ type: e.target.value })}
              value={selectedEvent?.type}
            >
              {typeSelectRender()}
            </RadioGroup>
          </Form.Item>
          <Form.Item
            name="teacher"
            label="Teacher Name"
            rules={[
              { required: true, message: "Please enter the teacher name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lab"
            label="Lab Name"
            rules={[{ required: true, message: "Please enter the lab name!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ResourceManager;
