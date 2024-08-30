"use client";

import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import toast from "react-hot-toast";
import { CalendarIcon, CheckCircle, ClockIcon } from "lucide-react";

const ITEM_TYPE = "RESOURCE";

interface Resource {
  id: string;
  name: string;
  type: string;
  color: string;
}

const resources: Resource[] = [
  { id: "1", name: "Math Class", type: "Class", color: "bg-blue-100" },
  { id: "2", name: "Science Exam", type: "Exam", color: "bg-red-100" },
  {
    id: "3",
    name: "Art Project Deadline",
    type: "Deadline",
    color: "bg-yellow-100",
  },
];

interface Event {
  id: string;
  title: string;
  start: string;
  extendedProps: { type: string; color: string };
}

export default function ResourceScheduler() {
  const [events, setEvents] = useState<Event[]>([]);
  const [draggedResource, setDraggedResource] = useState<Resource | null>(null);

  const handleOnDragEnd = (result: any) => {
    if (!result.destination || !draggedResource) {
      return;
    }

    const start = result.destination.droppableId;
    const isConflict = events.some(
      (event) =>
        event.start === start &&
        event.extendedProps.type !== draggedResource.type
    );

    if (isConflict) {
      toast.error("Conflict detected! Cannot place this resource here.");
    } else {
      setEvents((prev) => [
        ...prev,
        {
          id: draggedResource.id,
          title: draggedResource.name,
          start: start,
          extendedProps: {
            type: draggedResource.type,
            color: draggedResource.color,
          },
        },
      ]);
    }

    setDraggedResource(null);
  };

  const handleDragStart = (start: any) => {
    const resource = resources.find((r) => r.id === start.draggableId);
    setDraggedResource(resource || null);
  };

  const eventContent = (eventInfo: any) => {
    const { type, color } = eventInfo.event.extendedProps;
    return (
      <div className={`flex items-center space-x-2 p-1 rounded-md ${color}`}>
        {type === "Class" && <CalendarIcon className="w-4 h-4" />}
        {type === "Exam" && <CheckCircle className="w-4 h-4" />}
        {type === "Deadline" && <ClockIcon className="w-4 h-4" />}
        <span>{eventInfo.event.title}</span>
      </div>
    );
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd} onDragStart={handleDragStart}>
      <div className="min-h-screen bg-primary p-8">
        <h1 className="text-4xl font-bold text-secondary mb-6">
          Classroom Scheduler
        </h1>
        <div className="flex space-x-4">
          <Droppable droppableId="resources" type={ITEM_TYPE}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="w-1/3 p-4 bg-white rounded-lg shadow-md"
              >
                <h2 className="text-xl font-bold mb-4">Resources</h2>
                {resources.map((resource, index) => (
                  <Draggable
                    key={resource.id}
                    draggableId={resource.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`p-2 rounded mb-2 ${resource.color}`}
                      >
                        <div className="flex items-center space-x-2">
                          <span>{resource.name}</span>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <div className="w-2/3 p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Calendar</h2>
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={events}
              eventContent={eventContent}
              editable={true}
              droppable={true}
              selectable={true}
              drop={handleOnDragEnd}
            />
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}
