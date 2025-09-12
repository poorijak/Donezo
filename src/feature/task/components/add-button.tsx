import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import TaskForm from "./task-form";
import { status } from "@prisma/client";
import { cn } from "@/lib/utils";

interface AddButtonStatus {
  status: status;
  className?: string;
}

const AddButton = ({ status, className }: AddButtonStatus) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCreateModal = () => {
    setIsOpen(true);
  };

  return (
    <div>
      <Button
        variant="outline"
        className={cn("text-xs font-medium", className)}
        onClick={handleCreateModal}
      >
        <Plus />
        Add Task
      </Button>

      <TaskForm onOpenChange={setIsOpen} open={isOpen} status={status} />
    </div>
  );
};

export default AddButton;
