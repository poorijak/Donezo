import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = () => {
  const query = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await client.api.user["get-user"].$get();

      if (!res.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await res.json();

      if (!data) {
        throw new Error("User not found");
      }


      return data
    },
    retry : 1
  });

  return query.data
};
