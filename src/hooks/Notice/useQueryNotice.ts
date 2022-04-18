import { supabase } from "lib/supabase";
import { useQuery } from "react-query";
import type { Notice } from "types/notice";

export const useQueryNotice = () => {
  const getNotice = async () => {
    const { data, error } = await supabase
      .from<Notice>("notices")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      throw new Error(error.message);
    }
    return data;
  };

  return useQuery<Notice[], Error>({
    queryKey: ["notices"],
    queryFn: getNotice,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
};
