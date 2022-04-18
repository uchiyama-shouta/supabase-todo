import { supabase } from "lib/supabase";
import { useQuery } from "react-query";
import type { Task } from "types/task";

export const useQueryTasks = () => {
  const getTasks = async () => {
    const { data, error } = await supabase
      .from<Task>("todos")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      throw new Error(error.message);
    }
    return data;
  };

  return useQuery<Task[], Error>({
    queryKey: ["todos"],
    queryFn: getTasks,
    staleTime: Infinity,
  });
};
