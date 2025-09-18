import Landing from "@/feature/landing/landing";
import CreateTaskBTN from "@/feature/task/components/create-task-btn";
import TaskContainer from "@/feature/task/components/dnd/tasks-container";
import React from "react";

const page = async () => {
  return (
    <div className="h-screen">
      <Landing />
    </div>
  );
};

export default page;
