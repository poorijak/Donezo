"use client";

import { columnType, TaskType } from "@/types/task";
import React, { useState } from "react";
import { useGetTaskAll, useUpdateStatusTask } from "../../hooks/useTask";
import ColumnTask from "./column-task";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import TaskCard from "./task-card";

const column: columnType[] = [
  { id: "pending", title: "To do", icon: "💡" },
  { id: "inProgress", title: "In Progress", icon: "⏱️" },
  { id: "done", title: "Done", icon: "✅" },
];

const TaskContainer = () => {
  const { data } = useGetTaskAll();
  const { mutate } = useUpdateStatusTask();
  const [activeTask, setActiveTask] = useState<TaskType | null>();

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

  const handleDragStart = (event: DragStartEvent) => {
    const taskId = event.active.id as string;
    const task = data?.find((t) => t.id === taskId) || null;
    setActiveTask(task);
  };
 
  return (
    <div className="mx-auto min-w-fit md:min-w-7xl">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
          {column.map((c) => (
            <div key={c.id} className="">
              <ColumnTask
                column={c}
                task={data?.filter((t) => t.status === c.id)}
              />
            </div>
          ))}

          <DragOverlay>
            {activeTask ? (
              <div className="opacity-80 shadow-2xl">
                <TaskCard task={activeTask} />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
};

export default TaskContainer;
