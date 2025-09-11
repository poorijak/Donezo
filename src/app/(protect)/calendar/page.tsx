import { Tabs } from "@/components/ui/tabs";
import CreateTaskBTN from "@/feature/task/components/create-task-btn";
import TaskPanel from "@/feature/task/components/tasl-panel";
import React from "react";

const CalendarPage = async () => {
  return (
    <div className="mx-5 md:mx-10">
      {/* <div className="mb-10 flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          Task{" "}
          <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
            Calendar
          </span>{" "}
          📅
        </h1>
      </div> */}
      <div className="mx-auto grid grid-cols-1 flex-col md:grid-cols-9 md:gap-8">
        <div className="col-span-3 flex flex-col gap-3">
          <CreateTaskBTN className="w-full" />

          <TaskPanel />
        </div>
        <div className="col-span-6">Calendar</div>
      </div>
    </div>
  );
};

export default CalendarPage;
