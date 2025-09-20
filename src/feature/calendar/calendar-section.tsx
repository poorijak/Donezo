"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { TaskType } from "@/types/task";
import { formatDateToYYYYMMDD } from "@/lib/format/formatDate";
import { StyleWrapper } from "./style-wrapper";
import TaskDetailModal from "./task-detail-modal";
import { EventClickArg } from "@fullcalendar/core/index.js";

interface CalendarSectionProp {
  task: TaskType[] | undefined;
}

const eventColors = [
  { bg: "#fff6ef", border: "#efe6d6", textColor: "#9c3722" },
  { bg: "#ebfcf2", border: "#ccebd8", textColor: "#0f643f" },
  { bg: "#f5f5f5", border: "#ededed", textColor: "#1f1f1f" },
  { bg: "#edf8ff", border: "#cee2eb", textColor: "#1a58c9" },
  { bg: "#edf3ff", border: "#d3d8ed", textColor: "#3f42a1" },
  { bg: "#fce7f3", border: "#febaff", textColor: "#ed68f0" },
  { bg: "#e9ffd2", border: "#dcf0c8", textColor: "#5db900" },
  { bg: "#fffaf0", border: "#f0e0c6", textColor: "#a0522d" },
];

const CalendarSection = ({ task }: CalendarSectionProp) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTask, setActiveTask] = useState<TaskType>();

  const handleTaskModal = (
    task: TaskType[] | undefined,
    agu: EventClickArg,
  ) => {
    const taskItem = task?.find((t) => t.title === agu.event.title);

    setActiveTask(taskItem);

    setIsOpen(true);
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <StyleWrapper>
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              events={task?.map((t, i) => {
                const pair = eventColors[i % eventColors.length];
                return {
                  title: t.title,
                  start: formatDateToYYYYMMDD(t.start),
                  end: formatDateToYYYYMMDD(t.end),
                  color: pair.bg,
                  borderColor: pair.border,
                  textColor: pair.textColor,
                };
              })}
              headerToolbar={{
                left: "title",
                center: "",
                right: "prev today next",
              }}
              titleFormat={{
                year: "numeric",
                month: "long",
                day: "numeric",
              }}
              eventClassNames={() => [
                "rounded-xl",
                "hover:scale-102",
                "transition",
                "px-1",
                "py-1",
                "custom-event-border",
                "font-semibold",
                "shadow-xs",
                "hover:cursor-pointer",
                "my-1",
              ]}
              eventClick={(agu) => {
                handleTaskModal(task, agu);
              }}
              fixedWeekCount={false}
              height={571}
            />
          </StyleWrapper>
        </CardContent>
      </Card>

      <TaskDetailModal
        onOpenChange={setIsOpen}
        open={isOpen}
        task={activeTask}
      />
    </div>
  );
};

export default CalendarSection;
