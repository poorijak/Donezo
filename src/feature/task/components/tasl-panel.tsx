"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import React, { useState } from "react";
import { useGetTaskByStauts } from "../hooks/useTask";
import { useSearchParams } from "next/navigation";
import { status } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import TaskCard from "./dnd/task-card";
import { ScrollArea } from "@/components/ui/scroll-area";

const taskStatus = [
  { label: "Todo", value: "todo", href: "/calendar?status=pending" },
  {
    label: "In progress",
    value: "inProgress",
    href: "/calendar?status=inProgress",
  },
  { label: "Done", value: "done", href: "/calendar?status=done" },
];

const TaskPanel = () => {
  const status = useSearchParams().get("status") as status;

  const { data } = useGetTaskByStauts(status);

  console.log(data);

  return (
    <div>
      <Card>
        <CardHeader className="flex w-full items-center justify-between">
          <CardTitle className="text-xl font-semibold">My Task</CardTitle>
          <Tabs defaultValue="inProgress">
            <TabsList>
              {taskStatus.map((s, i) => (
                <TabsTrigger key={i} value={s.value} asChild>
                  <Link href={s.href}>{s.label}</Link>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </CardHeader>

        <Separator />

        <CardContent>
          <ScrollArea className="h-[500px]">
            <div className="flex flex-col gap-3">
              {data?.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskPanel;
