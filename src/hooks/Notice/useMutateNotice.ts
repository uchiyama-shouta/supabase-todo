import { useQueryClient, useMutation } from "react-query";
import { supabase } from "lib/supabase";
import { Notice, EditedNotice } from "types/notice";
import { useNotice } from "hooks/Notice/useNotice";

export const useMutateNotice = () => {
  const queryClient = useQueryClient();
  const { resetNotice } = useNotice();

  const createNoticeMutation = useMutation(
    async (notice: Omit<Notice, "id" | "created_at">) => {
      const { data, error } = await supabase.from("notices").insert(notice);
      if (error) throw new Error(error.message);
      return data;
    },
    {
      onSuccess: (res) => {
        const previousNotices = queryClient.getQueryData<Notice[]>(["notices"]);
        if (previousNotices) {
          queryClient.setQueryData(["notices"], [...previousNotices, res[0]]);
        }
        resetNotice();
      },
      onError: (err: any) => {
        alert(err.message);
        resetNotice();
      },
    },
  );
  const updateNoticeMutation = useMutation(
    async (notice: EditedNotice) => {
      const { data, error } = await supabase
        .from("notices")
        .update({ content: notice.content })
        .eq("id", notice.id);
      if (error) throw new Error(error.message);
      return data;
    },
    {
      onSuccess: (res, variables) => {
        const previousNotices = queryClient.getQueryData<Notice[]>(["notices"]);
        if (previousNotices) {
          queryClient.setQueryData(
            ["notices"],
            previousNotices.map((notice) =>
              notice.id === variables.id ? res[0] : notice,
            ),
          );
        }
        resetNotice();
      },
      onError: (err: any) => {
        alert(err.message);
        resetNotice();
      },
    },
  );
  const deleteNoticeMutation = useMutation(
    async (id: string) => {
      const { data, error } = await supabase
        .from("notices")
        .delete()
        .eq("id", id);
      if (error) throw new Error(error.message);
      return data;
    },
    {
      onSuccess: (_, variables) => {
        const previousNotices = queryClient.getQueryData<Notice[]>(["notices"]);
        if (previousNotices) {
          queryClient.setQueryData(
            ["notices"],
            previousNotices.filter((notice) => notice.id !== variables),
          );
        }
        resetNotice();
      },
      onError: (err: any) => {
        alert(err.message);
        resetNotice();
      },
    },
  );
  return { deleteNoticeMutation, createNoticeMutation, updateNoticeMutation };
};
