import { status, Tag, Todo } from "@prisma/client";

export interface TaskInputType {
  title: string;
  note?: string;
  tag?: string[];
  duration?: {
    start?: Date;
    end?: Date;
  };
  status?: status;
}

export type TagType = Omit<Tag, "createAt" | "updatedAt">;

export type TaskType = Omit<Todo, "createdAt" | "updatedAt" | "userId"> & {
  tags?: TagType[];
};

export type columnType = {
  id: status;
  title: string;
  icon: string;
};
