"use client"

import React from "react";
import TaskPanel from "../task/components/tasl-panel";
import CalendarSection from "./calendar-section";
import { useSearchParams } from "next/navigation";
import { useGetTaskByStauts } from "../task/hooks/useTask";
import { status } from "@prisma/client";

const TaskCalendar = () => {
  const status = useSearchParams().get("status") as status;

  const { data, isPending } = useGetTaskByStauts(status);

  return (
    <div className="mx-5 md:mx-10">
      <div className="mb-10 flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          Task{" "}
          <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
            Calendar
          </span>{" "}
          📅
        </h1>
      </div>
      <div className="mx-auto grid grid-cols-1 flex-col md:grid-cols-9 min-h-96   md:gap-8">
        <div className="col-span-3 row-span-3 flex flex-col gap-3 mb-6 h-full">
          <TaskPanel task={data} isPending={isPending} status={status}  />
        </div>
        <div className="col-span-6  h-full">
          <CalendarSection task={data} />
        </div>
      </div>
    </div>
  );
};

export default TaskCalendar;
