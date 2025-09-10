import { Badge } from "@/components/ui/badge";
import formatDate from "@/lib/format/formatDate";
import formatStatus from "@/lib/format/formatStatus";
import { cn, getStatusColor, getTagsColor } from "@/lib/utils";
import { TaskType } from "@/types/task";
import { useDraggable } from "@dnd-kit/core";
import {
  CalendarClock,
  Ellipsis,
  GripVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import React, { useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TaskForm from "../task-form";
import DeleteTask from "../delete-task-modal";

type TaskCardProps = {
  task: TaskType;
};

const TaskCard = ({ task }: TaskCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div>
      <div
        {...attributes}
        {...listeners}
        ref={setNodeRef}
        style={style}
        className="bg-card relative flex cursor-grab items-center justify-between rounded-md border p-4 shadow-sm"
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
        <div className="absolute top-3 right-5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button type="button" className="p-1">
                <Ellipsis className="text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="text-xs"
              onPointerDown={(e) => e.stopPropagation()}
            >
              <DropdownMenuItem
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                <Pencil />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-400" onClick={() =>  setIsDeleteOpen(true)}>
                <Trash2 className="text-red-400" />
                Remove
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <TaskForm open={isOpen} onOpenChange={setIsOpen} task={task} />
      <DeleteTask
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        taskId={task.id}
      />
    </div>
  );
};

export default TaskCard;
