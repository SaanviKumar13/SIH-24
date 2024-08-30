"use client";
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { CalendarIcon, CircleAlert, ClockIcon } from "lucide-react";
import { format } from "date-fns";

export default function ClassSchedule() {
  const [schedule] = useState<any>({
    classes: [
      {
        subject: "Math",
        time: "9:00 AM - 10:30 AM",
        type: "Class",
        day: "2024-09-02",
      },
      {
        subject: "Science",
        time: "11:00 AM - 12:30 PM",
        type: "Class",
        day: "2024-09-05",
      },
      {
        subject: "English",
        time: "1:00 PM - 2:30 PM",
        type: "Class",
        day: "2024-09-07",
      },
      {
        subject: "History Exam",
        time: "10:00 AM - 12:00 PM",
        type: "Exam",
        day: "2024-09-09",
      },
      {
        subject: "Art Project Deadline",
        time: "5:00 PM",
        type: "Deadline",
        day: "2024-09-11",
      },
    ],
  });

  const typeColors: any = {
    Class: "bg-blue-100",
    Exam: "bg-red-100",
    Deadline: "bg-yellow-100",
  };

  const events = schedule.classes.map((event: any) => ({
    title: `${event.subject} (${event.time})`,
    start: new Date(event.day),
    end: new Date(event.day),
    extendedProps: { type: event.type },
  }));

  const eventContent = (eventInfo: any) => {
    const { type } = eventInfo.event.extendedProps;
    return (
      <div
        className={`flex items-center space-x-2 p-1 rounded-md ${typeColors[type]} text-gray-800`}
      >
        {type === "Class" && <CalendarIcon className="w-4 h-4" />}
        {type === "Exam" && <CircleAlert className="w-4 h-4" />}
        {type === "Deadline" && <ClockIcon className="w-4 h-4" />}
        <span className="text-sm">{eventInfo.event.title}</span>
      </div>
    );
  };

  const handleDayCellMount = (info: any) => {
    const { date, el } = info;
    const formattedDate = format(date, "yyyy-MM-dd");
    const eventType = schedule.classes.find(
      (event: any) =>
        format(new Date(event.day), "yyyy-MM-dd") === formattedDate
    )?.type;
    if (eventType) {
      el.classList.add(typeColors[eventType]);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold text-secondary mb-6">Class Schedule</h1>
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-5">
        <h2 className="text-2xl font-bold text-secondary mb-4">
          Monthly Calendar
        </h2>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventContent={eventContent}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          dayCellDidMount={handleDayCellMount}
          contentHeight="auto"
        />
      </div>
    </div>
  );
}
