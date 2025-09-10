"use client";

import { Button } from "@/components/ui/button";
import { userType } from "@/types/user";
import React, { useState } from "react";
import CreateTaskModal from "./task-form";
import TaskForm from "./task-form";

interface CreateTaskBTNProps {
  user: userType | null;
}

const CreateTaskBTN = ({ user }: CreateTaskBTNProps) => {
  const [isOpen, setOpen] = useState(false);

  const handleCreateModal = () => {
    setOpen(true);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <div>
        <Button disabled={!user} onClick={handleCreateModal}>
          Click 🫵🏻 to add your task now!
        </Button>
        {!user && (
          <p className="text-red-500 text-xs">Please sign in to create task</p>
        )}
      </div>
      <TaskForm open={isOpen} onOpenChange={setOpen}  />
    </div>
  );
};

export default CreateTaskBTN;
