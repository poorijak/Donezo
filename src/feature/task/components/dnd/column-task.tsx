import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { columnType, TaskType } from "@/types/task";
import React from "react";
import TaskCard from "./task-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDroppable } from "@dnd-kit/core";

interface ColumnTaskProps {
  column: columnType;
  task: TaskType[] | undefined;
}

const ColumnTask = ({ column, task }: ColumnTaskProps) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <>
      <Card ref={setNodeRef}>
        <CardHeader>
          <CardTitle className="text-xl">{column.title}</CardTitle>
        </CardHeader>

        <ScrollArea className="h-[500px] w-full">
          <div className="flex flex-col gap-4">
            {task && task.length > 0 ? (
              <>
                {task.map((t) => (
                  <CardContent key={t.id}>
                    <TaskCard task={t} />
                  </CardContent>
                ))}
              </>
            ) : (
              <CardContent className="border mx-5 py-5 rounded-md">
                <div className="flex w-full justify-center items-center">
                  <p className="text-md font-semibold text-muted-foreground">
                    No task available
                  </p>
                </div>
              </CardContent>
            )}
          </div>
        </ScrollArea>
      </Card>
    </>
  );
};

export default ColumnTask;
