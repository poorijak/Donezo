"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import React from "react";
import { status } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import TaskCard from "./dnd/task-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import SkeletonTask from "@/components/shared/skeleton-task";
import AddButton from "./add-button";
import { TaskType } from "@/types/task";

const taskStatus = [
  { label: "Todo", value: "todo", href: "/calendar?status=pending" },
  {
    label: "In progress",
    value: "inProgress",
    href: "/calendar?status=inProgress",
  },
  { label: "Done", value: "done", href: "/calendar?status=done" },
];

interface TaskPanelProps {
  task: TaskType[] | undefined;
  isPending: boolean;
  status : status
}

const TaskPanel = ({ task, isPending , status }: TaskPanelProps) => {
  return (
    <div>
      <Card className="relative">
        <CardHeader className="flex w-full items-center justify-between">
          <CardTitle className="text-xl font-semibold md:text-2xl">
            My Task
          </CardTitle>
          <Tabs defaultValue="inProgress">
            <TabsList>
              {taskStatus.map((s, i) => (
                <TabsTrigger className="p-3" key={i} value={s.value} asChild>
                  <Link href={s.href}>{s.label}</Link>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </CardHeader>

        <Separator />

        <CardContent>
          <div className="flex flex-col gap-3">
            {isPending ? (
              <>
                <SkeletonTask />
              </>
            ) : (
              <>
                <ScrollArea className="h-[350px] md:h-[500px]">
                  <div className="flex flex-col gap-3">
                    {task?.map((task) => (
                      <TaskCard key={task.id} task={task} calendarPage={true} />
                    ))}
                  </div>
                </ScrollArea>
              </>
            )}
            <div className="w-full">
              <AddButton status={status} className="w-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskPanel;
