"use client";

import InputForm from "@/components/shared/input-form";
import Modal from "@/components/shared/modal";
import { Form, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TaskInputValue, TaskOutputValue, taskSchema } from "../schema/task";
import { useGetTag, useTaskMutation } from "../hooks/useTask";
import TagSelector from "./selector/tag-selector";
import SubmitBtn from "@/components/shared/submit-btn";
import DatePicker from "@/feature/task/components/selector/calendar";
import { status } from "@prisma/client";
import { TaskType } from "@/types/task";

interface TaskFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  status?: status;
  task?: TaskType | undefined;
}

// ดึง type ของ obj property
type durationInput = TaskInputValue["duration"];

const toDate = (v: unknown): Date | undefined =>
  v instanceof Date ? v : undefined;

const toDateRange = (d: durationInput) =>
  d ? { from: toDate(d.start), to: toDate(d.end) } : undefined;

const TaskForm = ({ open, onOpenChange, status, task }: TaskFormProps) => {
  const { mutate, isPending  } = useTaskMutation();

  const { data } = useGetTag();

  console.log(isPending);
  

  const form = useForm<TaskInputValue>({
    resolver: zodResolver(taskSchema),
    defaultValues: task
      ? {
          title: task.title,
          note: task.note ?? undefined,
          tag: task.tags?.map((tt) => tt.id) ?? [],
          duration: {
            start: task.start,
            end: task.end,
          },
          status: task.status,
        }
      : {
          note: "",
          title: "",
          tag: [],
          duration: undefined,
          status: "pending",
        },
    mode: "onSubmit",
  });

  const handleSubmit = async (raw: TaskInputValue) => {
    const value: TaskOutputValue = taskSchema.parse(raw);

    mutate(
      {
        taskId: task?.id,
        title: value.title,
        note: value.note,
        tag: value.tag,
        duration: { start: value.duration?.start, end: value.duration?.end },
        status: status ?? "inProgress",
      },
      {
        onSuccess: (_, variable) => {
          if (!variable.taskId) {
            form.reset({
              title: "",
              note: "",
              tag: [],
              duration: undefined,
              status: "pending",
            });
            onOpenChange(false);
          } else {
            onOpenChange(false);
          }
        },
      },
    );
  };

  return (
    <div>
      <Modal
        open={open}
        onOpenChange={onOpenChange}
        title={task ? "Edit Task" : "Create Task"}
        desc={
          task
            ? "Edit your task details, update tags or notes, and adjust the due date as needed."
            : "Add a new task with notes and details. Pick a due date to keep things on schedule."
        }
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
              selected={form.watch("tag")}
              setSelected={(val) =>
                form.setValue("tag", val, {
                  shouldValidate: true,
                  shouldDirty: true,
                  shouldTouch: true,
                })
              }
            />
            <FormMessage />
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
              title={task ? "Update Task" : "Create new task"}
              type="submit"
              pending={isPending || form.formState.isSubmitting}
            />
          </form>
        </Form>
      </Modal>
    </div>
  );
};

export default TaskForm;
