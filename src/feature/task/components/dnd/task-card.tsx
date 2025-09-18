import formatStatus from "@/lib/format/formatStatus";
import { cn, getStatusColor, getTagsColor } from "@/lib/utils";
import { TaskType } from "@/types/task";
import { useDraggable } from "@dnd-kit/core";
import { CalendarClock, Ellipsis, Pencil, Trash2 } from "lucide-react";
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
import ChangeStatusButton from "../change-status-button";
import { checkDueDate, formatDateToDDMMYY } from "@/lib/format/formatDate";
import "animate.css";

type TaskCardProps = {
  task: TaskType;
  calendarPage?: boolean;
};

const TaskCard = ({ task, calendarPage = false }: TaskCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div className="w-full">
      <div
        {...attributes}
        {...listeners}
        ref={setNodeRef}
        style={style}
        className="bg-card relative cursor-grab rounded-md border p-4 shadow-sm"
      >
        <div className="flex flex-col gap-3">
          {/* header */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <p
              className={cn(
                "inline-block rounded-sm px-2 py-1",
                getStatusColor(task.status),
              )}
            >
              {formatStatus(task.status)}
            </p>

            {task.tags && task.tags.length > 0 && (
              <Separator orientation="vertical" className="self-stretch" />
            )}
            {task.tags?.map((tt) => (
              <div key={tt.id}>
                <p
                  className={cn(
                    "flex items-center gap-2 rounded-sm px-2 py-1",
                    getTagsColor(tt.slug),
                  )}
                >
                  <span className="text-xs">{tt.icon}</span>
                  {tt.title}
                </p>
              </div>
            ))}
          </div>

          {/* content */}

          <div className="flex flex-col gap-2">
            <h3 className="text-md font-semibold">{task.title}</h3>
            <div className="flex w-full flex-col">
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
            <div className="flex justify-between">
              <p
                className={cn(
                  "text-muted-foreground flex items-center gap-2 text-sm font-medium",
                  checkDueDate(task.end) && "text-red-400",
                )}
              >
                <CalendarClock size={16} />
                <span>{formatDateToDDMMYY(task.end)}</span>
              </p>
              <div className="flex md:hidden">
                <ChangeStatusButton status={task.status} id={task.id} />
              </div>
              <div className="hidden md:flex">
                {calendarPage && (
                  <>
                    <ChangeStatusButton status={task.status} id={task.id} />
                  </>
                )}
              </div>
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
              <DropdownMenuItem
                className="text-red-400"
                onClick={() => setIsDeleteOpen(true)}
              >
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
