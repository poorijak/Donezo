"use client";

import { columnType, TaskType } from "@/types/task";
import React from "react";
import { useGetTaskAll, useUpdateStatusTask } from "../../hooks/useTask";
import ColumnTask from "./column-task";
import { Separator } from "@/components/ui/separator";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

const column: columnType[] = [
  { id: "pending", title: "To do 💡" },
  { id: "inProgress", title: "In Progress  ⏱️" },
  { id: "done", title: "Done  ✅" },
];

const TaskContainer = () => {
  const { data } = useGetTaskAll();
  const { mutate } = useUpdateStatusTask();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const TaskId = active.id as string;
    const newStatus = over.id as TaskType["status"];

    mutate({
      id: TaskId,
      status: newStatus,
    });
  };

  return (
    <div className="min-w-fit md:min-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-28">
        <DndContext onDragEnd={handleDragEnd}>
          {column.map((c) => (
            <div key={c.id} className="">
              <ColumnTask
                column={c}
                task={data?.filter((t) => t.status === c.id)}
              />
            </div>
          ))}
        </DndContext>
      </div>
    </div>
  );
};

export default TaskContainer;
