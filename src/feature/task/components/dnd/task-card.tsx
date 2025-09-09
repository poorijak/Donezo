import { Badge } from "@/components/ui/badge";
import formatDate from "@/lib/format/formatDate";
import formatStatus from "@/lib/format/formatStatus";
import { cn, getStatusColor, getTagsColor } from "@/lib/utils";
import { TaskType } from "@/types/task";
import { useDraggable } from "@dnd-kit/core";
import { CalendarClock, GripVertical } from "lucide-react";
import React from "react";
import { CSS } from "@dnd-kit/utilities";
import { Separator } from "@/components/ui/separator";

type TaskCardProps = {
  task: TaskType;
};

const TaskCard = ({ task }: TaskCardProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  console.log(task);

  return (
    <div
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={style}
      className="bg-card flex cursor-grab items-center justify-between rounded-md border p-4 shadow-sm"
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <p
            className={cn(
              "inline-block rounded-sm px-2 py-1",
              getStatusColor(task.status),
            )}
          >
            {formatStatus(task.status)}
          </p>
          <Separator orientation="vertical" className="self-stretch" />

          {task.tags?.map((tt) => (
            <p
              className={cn(
                "flex items-center gap-2 rounded-sm px-2 py-1",
                getTagsColor(tt.slug),
              )}
              key={tt.id}
            >
              <span className="text-xs">{tt.icon}</span>
              {tt.title}
            </p>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-md font-semibold">{task.title}</h3>
          <div className="flex w-80 flex-col">
            {task.note ? (
              <p className="text-muted-foreground/80 line-clamp-2 text-sm font-medium break-words">
                {task.note}
              </p>
            ) : (
              <p className="text-muted-foreground/80 text-sm font-medium">
                No note provided 😢
              </p>
            )}
          </div>
          <div>
            <p className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
              <span>
                <CalendarClock size={16} />
              </span>
              {formatDate(task.end)}
            </p>
          </div>
        </div>
      </div>
      <Separator orientation="vertical" className="w-[2px] self-stretch" />
      <div className="flex justify-end">
        <GripVertical size={25} className="text-muted-foreground" />
      </div>
    </div>
  );
};

export default TaskCard;
