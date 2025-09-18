import { Badge } from "@/components/ui/badge";
import { columnType, TaskType } from "@/types/task";
import React from "react";
import TaskCard from "./task-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDroppable } from "@dnd-kit/core";
import SkeletonTask from "@/components/shared/skeleton-task";
import AddButton from "../add-button";

interface ColumnTaskProps {
  column: columnType;
  task: TaskType[] | undefined;
  isPending: boolean;
}

const ColumnTask = ({ column, task, isPending }: ColumnTaskProps) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  const taskCount = task?.length;

  return (
    <div className="flex flex-col items-center justify-center md:block">
      <div
        ref={setNodeRef}
        className="m-3 flex h-auto min-w-sm flex-col gap-4 p-2 md:w-auto"
      >
        <div className="flex items-center gap-3 rounded-md border bg-[#f5f6f7] px-4 py-4 shadow-sm">
          <p className="text-lg">{column.icon}</p>
          <h2 className="text-xl font-semibold">{column.title}</h2>
          <Badge className="bg-primary/40">{taskCount || "0"}</Badge>
        </div>

        {isPending ? (
          <>
            <SkeletonTask />
          </>
        ) : (
          <>
            {task && task.length > 0 ? (
              <>
                <ScrollArea className="h-[300px] w-full md:h-[450px]">
                  <div className="flex flex-col gap-3">
                    {task.map((t) => (
                      <div key={t.id} >
                        <TaskCard task={t} />
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </>
            ) : (
              <div className="flex w-full items-center justify-center rounded-md border-2 p-5">
                <p className="text-md text-muted-foreground font-semibold">
                  No task available
                </p>
              </div>
            )}
          </>
        )}

        <AddButton status={column.id} className="w-full" />
      </div>
    </div>
  );
};

export default ColumnTask;
