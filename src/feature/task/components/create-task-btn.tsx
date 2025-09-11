"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import TaskForm from "./task-form";

interface CreateTaskBTN {
  className?: string;
}

const CreateTaskBTN = ({ className }: CreateTaskBTN) => {
  const [isOpen, setOpen] = useState(false);

  const handleCreateModal = () => {
    setOpen(true);
  };

  return (
    <>
      <div>
        <Button onClick={handleCreateModal} className={className}>
          Click 🫵🏻 to add your task now!
        </Button>
      </div>
      <TaskForm open={isOpen} onOpenChange={setOpen} />
    </>
  );
};

export default CreateTaskBTN;
