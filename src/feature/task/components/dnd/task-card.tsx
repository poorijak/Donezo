import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import formatDate from "@/lib/format/formatDate";
import formatStatus from "@/lib/format/formatStatus";
import { cn, getStatusColor } from "@/lib/utils";
import { TaskType } from "@/types/task";
import { useDraggable } from "@dnd-kit/core";
import {
  Calendar1,
  CalendarClock,
  CalendarDays,
  GripVertical,
} from "lucide-react";
import React from "react";
import { CSS } from "@dnd-kit/utilities";

type TaskCardProps = {
  task: TaskType;
};

const TaskCard = ({ task }: TaskCardProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div {...attributes} {...listeners} ref={setNodeRef} style={style}>
      <Card>
        <CardContent className="flex items-center justify-between">
          <div className="relative pr-8 border-r-2">
            <div className="flex flex-col gap-1">
              <h3 className="font-semibold">{task.title}</h3>
              <div className="flex flex-col w-60">
                <p className="break-words font-medium line-clamp-1 text-muted-foreground">
                  {task.note}
                </p>
              </div>
              <div>
                <p className="flex gap-2 text-sm items-center font-medium text-muted-foreground">
                  <span>
                    <CalendarClock size={16} />
                  </span>
                  {formatDate(task.end)}
                </p>
              </div>
            </div>
            <Badge
              className={cn(
                "absolute top-0 right-3 text-xs",
                getStatusColor(task.status)
              )}
            >
              {formatStatus(task.status)}
            </Badge>
          </div>
          <div className="flex justify-end">
            <GripVertical size={20} className="text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskCard;
