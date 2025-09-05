import { client } from "@/lib/rpc";
import { TaskType } from "@/types/task";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

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

export const useCreateTask = () => {

  const queryClinet = useQueryClient()

  const mutate = useMutation({
    mutationFn: async ({ title, note, tag, duration }: TaskType) => {
      const res = await client.api.task["create-task"].$post({
        json: {
          title,
          note,
          tag,
          duration: {
            start: duration?.start,
            end: duration?.end,
          },
        },
      });

      if (!res.ok) {
        const data = (await res.json()) as { error?: string; message?: string };
        throw new Error(
          data.error || data.message || "Error creating new task"
        );
      }

      return res;
    },

    onSuccess: () => {
      toast.success("Create new task success");
      queryClinet.invalidateQueries({queryKey : ["task"]})
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return mutate
};
