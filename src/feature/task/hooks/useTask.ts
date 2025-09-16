import { client } from "@/lib/rpc";
import { TaskType } from "@/types/task";
import { status } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import z from "zod";
import { TaskValue } from "../schema/task";

const taskWithTagsSchema = z.object({
  id: z.string(),
  title: z.string(),
  note: z
    .string()
    .nullable()
    .transform((val) => val ?? null),
  start: z.coerce
    .date()
    .nullable()
    .transform((val) => val ?? null),
  end: z.coerce
    .date()
    .nullable()
    .transform((val) => val ?? null),
  status: z.enum(status),
  tags: z
    .array(
      z.object({
        title: z.string(),
        id: z.string(),
        icon: z.string(),
        slug: z.string(),
        textColor: z.string(),
        bgColor: z.string(),
      }),
    )
    .optional(),
});

export const useGetTag = () => {
  const query = useQuery({
    queryKey: ["tag"],
    queryFn: async () => {
      const data = await client.api.task["get-tag"].$get();

      if (!data.ok) {
        throw new Error("Failed fetching tag");
      }

      const tag = await data.json();

      return tag;
    },
  });
  return query;
};

export const useGetTaskAll = () => {
  const query = useQuery({
    queryKey: ["Task"],
    queryFn: async () => {
      const data = await client.api.task["get-task-all"].$get();

      if (!data.ok) {
        throw new Error("Failed fetching task");
      }

      const task = await data.json();

      const todoTask = taskWithTagsSchema.array().parse(task);

      return todoTask;
    },
  });
  return query;
};

export const useTaskMutation = () => {
  const queryClinet = useQueryClient();

  const mutate = useMutation({
    mutationFn: async (data: TaskValue) => {
      let res: Response;

      if (data.taskId) {
        res = await client.api.task["update-task"].$patch({ json: data });
      } else {
        res = await client.api.task["create-task"].$post({ json: data });
      }

      if (!res.ok) {
        const data = (await res.json()) as { error?: string; message?: string };
        throw new Error(data.error || data.message);
      }

      return res;
    },

    onSuccess: () => {
      toast.success("Create new task success");
      queryClinet.invalidateQueries({ queryKey: ["Task"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return mutate;
};

export const useUpdateStatusTask = () => {
  const queryClinet = useQueryClient();

  const mutate = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: status }) => {
      const res = await client.api.task["udpate-status-taks"].$patch({
        json: {
          id,
          status,
        },
      });

      if (!res.ok) {
        throw new Error("Error updating task");
      }

      const data = await res.json();

      return data;
    },
    onMutate: async ({ id, status }) => {
      await queryClinet.cancelQueries({ queryKey: ["task"] });
      await queryClinet.cancelQueries({ queryKey: ["task", id] });

      const previousList = queryClinet.getQueryData<TaskType[]>(["task"]);
      const previousOne = queryClinet.getQueryData<TaskType>(["task", id]);

      if (previousList) {
        queryClinet.setQueryData<TaskType[]>(["task"], (old) =>
          old ? old.map((t) => (t.id === id ? { ...t, status } : t)) : old,
        );
      }

      if (previousOne) {
        queryClinet.setQueryData<TaskType>(["task", id], (old) =>
          old ? { ...old, status } : old,
        );
      }

      return { previousList, previousOne };
    },

    onError: (err, { id }, ctx) => {
      if (ctx?.previousList) {
        queryClinet.setQueryData<TaskType[]>(["task"], ctx.previousList);
      }

      if (ctx?.previousOne) {
        queryClinet.setQueryData<TaskType>(["task", id], ctx.previousOne);
      }
    },

    onSettled: (_data, _error, { id }) => {
      queryClinet.invalidateQueries({ queryKey: ["Task"] });
      queryClinet.invalidateQueries({ queryKey: ["Task", id] });
    },
  });

  return mutate;
};

export const useDeleteTask = () => {
  const queryClinet = useQueryClient();

  const mutate = useMutation({
    mutationFn: async (taskId: string) => {
      const res = await client.api.task["delete-task"].$delete({
        json: taskId,
      });

      if (!res.ok) {
        const data = (await res.json()) as { error?: string; message?: string };
        throw new Error(data.error || data.message);
      }
    },
    onSuccess: () => {
      toast.success("Remove task success");
      queryClinet.invalidateQueries({ queryKey: ["Task"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return mutate;
};

export const useGetTaskByStauts = (status: status) => {
  const query = useQuery({
    queryKey: ["Task", status],
    queryFn: async () => {
      const res = await client.api.task["get-task"].$get({
        query: { status: status ?? "inProgress" },
      });

      if (!res.ok) {
        const data = (await res.json()) as { error?: string; message?: string };
        throw new Error(data.error || data.message);
      }
      const data = await res.json();

      const todoTask = taskWithTagsSchema.array().parse(data);

      return todoTask;
    },
  });

  return query;
};
