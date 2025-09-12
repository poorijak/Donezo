"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { TaskType } from "@/types/task";
import { formatDateToYYYYMMDD } from "@/lib/format/formatDate";

interface CalendarSectionProp {
  task: TaskType[] | undefined;
}

const CalendarSection = ({ task }: CalendarSectionProp) => {

  console.log();
  


  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={task?.map((t) => ({
              title: t.title,
              start: formatDateToYYYYMMDD(t.start),
              end: formatDateToYYYYMMDD(t.end),
            }))}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarSection;
