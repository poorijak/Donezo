"use client";

import InputForm from "@/components/shared/input-form";
import Modal from "@/components/shared/modal";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { taskSchema } from "../schema/task";
import { TaskType } from "@/types/task";
import { useGetTag } from "../hooks/useTask";
import { Label } from "@/components/ui/label";
import TagSelector from "./tag-selector";
import Calendar23 from "@/components/calendar-23";
import SubmitBtn from "@/components/shared/submit-btn";

interface CreateTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateTaskModal = ({ open, onOpenChange }: CreateTaskModalProps) => {
  const { data } = useGetTag();
  const [selected, setSelected] = useState<string[]>([]);

  console.log(selected);

  const form = useForm<TaskType>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      note: "",
      tag: [],
      duration: { start: new Date(), end: new Date() },
    },
    mode: "onSubmit",
  });

  return (
    <div>
      <Modal
        open={open}
        onOpenChange={onOpenChange}
        title="Create Task"
        desc="Add a new task with notes and details.  
        Pick a due date to keep things on schedule.  "
      >
        <Form {...form}>
          <form className="flex flex-col gap-3">
            <InputForm
              control={form.control}
              label="Task Title"
              placeholder="Enter your task title..."
              name="title"
              inputType="input"
            />
            <InputForm
              control={form.control}
              label="Task Title"
              placeholder="Enter your task note..."
              name="note"
              inputType="textArea"
            />
          </form>
          <TagSelector
            data={data}
            setSelected={setSelected}
            selected={selected}
          />
          <Calendar23 />
            <SubmitBtn title="Create new task" type="submit" />
        </Form>
      </Modal>
    </div>
  );
};

export default CreateTaskModal;
