import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { formatDateToDDMMYY } from "@/lib/format/formatDate";
import formatStatus from "@/lib/format/formatStatus";
import { cn, getStatusColor, getTagsColor } from "@/lib/utils";
import { TaskType } from "@/types/task";
import { CalendarClock, Pencil, Trash2 } from "lucide-react";
import React, { useState } from "react";
import TaskForm from "../task/components/task-form";
import DeleteTask from "../task/components/delete-task-modal";

interface TaskDetailModal {
  task: TaskType | undefined;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TaskDetailModal = ({ task, onOpenChange, open }: TaskDetailModal) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleDeletaTask = () => {
    onOpenChange(false);
    setIsDeleteOpen(true);
  };
  const handleEditOpen = () => {
    onOpenChange(false);
    setIsEditOpen(true);
  };

  return (
    <div>
      <Dialog onOpenChange={onOpenChange} open={open}>
        <DialogContent>
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <p
              className={cn(
                "inline-block rounded-sm px-2 py-1",
                getStatusColor(task?.status),
              )}
            >
              {formatStatus(task?.status)}
            </p>

            {task?.tags && task.tags.length > 0 && (
              <Separator orientation="vertical" className="self-stretch" />
            )}
            {task?.tags?.map((tt) => (
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
          <DialogHeader className="mt-2">
            <DialogTitle className="flex w-full justify-start">
              {task?.title}
            </DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
            <span>
              <CalendarClock size={16} />
            </span>
            {formatDateToDDMMYY(task?.start)} - {formatDateToDDMMYY(task?.end)}
          </p>

          <div className="my-3 flex flex-col gap-3">
            <Label>Note</Label>
            <div className="rounded-md border bg-[#f5f7fa] p-3 text-sm">
              <p>{task?.note || "No note provided 😢"}</p>
            </div>
          </div>

          {/* Footer */}
          <DialogFooter>
            <div className="flex w-full items-center justify-between gap-3">
              <div>
                <Button variant="destructive" onClick={handleDeletaTask}>
                  <Trash2 />
                </Button>
              </div>
              <div>
                <Button variant="outline" onClick={handleEditOpen}>
                  <Pencil /> <span>Edit</span>
                </Button>
              </div>
            </div>
          </DialogFooter>

          {/* Footer */}
        </DialogContent>
      </Dialog>
      {task && (
        <>
          <DeleteTask
            open={isDeleteOpen}
            onOpenChange={setIsDeleteOpen}
            taskId={task.id}
          />
          <TaskForm
            open={isEditOpen}
            onOpenChange={setIsEditOpen}
            task={task}
            status={task.status}
          />
        </>
      )}
    </div>
  );
};

export default TaskDetailModal;
