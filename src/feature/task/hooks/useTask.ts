import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

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
