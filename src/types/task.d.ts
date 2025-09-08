import { status, Tag, Todo } from "@prisma/client";

export interface TaskInputType {
  title: string;
  note?: string;
  tag?: string[];
  duration?: {
    start?: Date;
    end?: Date;
  };
}

export type TagType = Omit<Tag, "createdAt" | "updatedAt", "TodoTag">;

export type TaskType = Omit<Todo, "createdAt" | "updatedAt" | "userId"> & {
};

export type columnType = {
  id: status;
  title: string;
};
