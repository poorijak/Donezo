import Modal from "@/components/shared/modal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { formatDateToDDMMYY } from "@/lib/format/formatDate";
import formatStatus from "@/lib/format/formatStatus";
import { cn, getStatusColor, getTagsColor } from "@/lib/utils";
import { TaskType } from "@/types/task";
import { CalendarClock, Pencil, Trash2 } from "lucide-react";
import React from "react";

interface TaskDetailModal {
  task: TaskType | undefined;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TaskDetailModal = ({ task, onOpenChange, open }: TaskDetailModal) => {
  console.log(task);

  return (
    <div>
      <Modal title={task?.title} onOpenChange={onOpenChange} open={open}>
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
        <p className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
          <span>
            <CalendarClock size={16} />
          </span>
          {formatDateToDDMMYY(task?.start)} - {formatDateToDDMMYY(task?.end)}
        </p>
        <div className="flex flex-col gap-3">
          <Label>Note</Label>
          <div className="rounded-md text-sm border p-3">
            <p>{task?.note || "No note provided 😢"}</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <Button variant="destructive">
              <Trash2 />
            </Button>
          </div>
          <div>
            <Button variant="outline">
              <Pencil /> <span>Edit</span>
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TaskDetailModal;
