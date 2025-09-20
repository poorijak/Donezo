import Modal from "@/components/shared/modal";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { useDeleteTask } from "../hooks/useTask";
import SubmitBtn from "@/components/shared/submit-btn";

interface DeleteTaskProps {
  taskId: string;
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const DeleteTask = ({ taskId, open, onOpenChange }: DeleteTaskProps) => {
  const { mutate , isSuccess , isPending } = useDeleteTask();

  const handleDeleteTask = () => {
    mutate(taskId);

  };

  useEffect(() => {
if (isSuccess) {
  onOpenChange(false)
}
  } , [onOpenChange , isSuccess])
  return (
    <div>
      <Modal
        title="Remove Task"
        desc="Are you sure to remove the task in donezo?"
        open={open}
        onOpenChange={onOpenChange}
      >
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <SubmitBtn title="Remove" pending={isPending} variant={"destructive"}  onClick={handleDeleteTask} />
        </div>
      </Modal>
    </div>
  );
};

export default DeleteTask;
