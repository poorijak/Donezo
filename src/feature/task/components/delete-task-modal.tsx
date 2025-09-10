import Modal from "@/components/shared/modal";
import { Button } from "@/components/ui/button";
import React from "react";
import { useForm } from "react-hook-form";
import { useDeleteTask } from "../hooks/useTask";

interface DeleteTaskProps {
  taskId: string;
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const DeleteTask = ({ taskId, open, onOpenChange }: DeleteTaskProps) => {
  const { mutate } = useDeleteTask();

  const handleDeleteTask = () => {
    mutate(taskId);
  };
  return (
    <div>
      <Modal
        title="Remove Task"
        desc="Are you sure to delete the product?"
        open={open}
        onOpenChange={onOpenChange}
      >
        <div className="flex justify-end gap-4">
          <Button variant="destructive" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button variant="outline" onClick={handleDeleteTask}>
            Remove
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteTask;
