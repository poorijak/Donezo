"use client";

import InputForm from "@/components/shared/input-form";
import Modal from "@/components/shared/modal";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { TaskInputValue, TaskOutputValue, taskSchema } from "../schema/task";
import { useCreateTask, useGetTag } from "../hooks/useTask";
import TagSelector from "./selection/tag-selector";
import SubmitBtn from "@/components/shared/submit-btn";
import DatePicker from "@/feature/task/components/selection/calendar";
import z from "zod";

interface CreateTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export type TasInferValue = z.infer<typeof taskSchema>;



// ดึง type ของ obj property
type durationInput = TaskInputValue["duration"];

const toDate = (v: unknown): Date | undefined =>
  v instanceof Date ? v : undefined;

const toDateRange = (d: durationInput) =>
  d ? { from: toDate(d.start), to: toDate(d.end) } : undefined;

const CreateTaskModal = ({ open, onOpenChange }: CreateTaskModalProps) => {
  const { mutate, isSuccess, isPending } = useCreateTask();
  const { data } = useGetTag();

  const form = useForm<TaskInputValue>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      note: "",
      tag: [],
      duration: undefined,
    },
    mode: "onSubmit",
  });

  const handleSubmit = async (raw: TaskInputValue) => {
    const value: TaskOutputValue = taskSchema.parse(raw);

    mutate({
      title: value.title,
      note: value.note,
      tag: value.tag,
      duration: {
        start: value.duration?.start,
        end: value.duration?.end,
      },
    });
  };

  useEffect(() => {
    if (isSuccess) {
      form.reset({
        title: "",
        note: "",
        tag: [],
        duration: undefined,
      });
      onOpenChange(false);
    }
  }, [isSuccess, onOpenChange, form]);

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
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            onChange={() => form.clearErrors()}
            className="flex flex-col gap-6"
          >
            <InputForm
              control={form.control}
              label="Task Title"
              placeholder="Enter your task title..."
              name="title"
              inputType="input"
            />
            <InputForm
              control={form.control}
              label="Task Note"
              placeholder="Enter your task note..."
              name="note"
              inputType="textArea"
            />
            <TagSelector
              data={data}
              setSelected={(val) =>
                form.setValue("tag", val, {
                  shouldValidate: true,
                  shouldDirty: true,
                  shouldTouch: true,
                })
              }
              selected={form.watch("tag")}
            />
            <DatePicker
              date={toDateRange(form.watch("duration"))}
              setDate={(range) => {
                form.setValue("duration", {
                  start: range?.from,
                  end: range?.to,
                });
              }}
            />
            <SubmitBtn
              title="Create new task"
              type="submit"
              disabled={isPending}
            />
          </form>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateTaskModal;
