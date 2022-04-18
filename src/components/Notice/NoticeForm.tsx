import { ChangeEventHandler, FormEvent, FC } from "react";
import { supabase } from "lib/supabase";
import { useMutateNotice } from "hooks/Notice/useMutateNotice";
import { useNotice } from "hooks/Notice/useNotice";

const NoticeForm: FC = () => {
  const { editedNotice, updateNotice } = useNotice();
  const { createNoticeMutation, updateNoticeMutation } = useMutateNotice();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editedNotice.id === "")
      createNoticeMutation.mutate({
        content: editedNotice.content,
        user_id: supabase.auth.user()?.id,
      });
    else {
      updateNoticeMutation.mutate({
        id: editedNotice.id,
        content: editedNotice.content,
      });
    }
  };

  const handleChangeText: ChangeEventHandler<HTMLInputElement> = (e) =>
    updateNotice({ ...editedNotice, content: e.target.value });

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="py-2 px-3 my-2 text-sm placeholder:text-gray-500  rounded border border-gray-300 focus:border-indigo-500 focus:outline-none"
        placeholder="New notice ?"
        value={editedNotice.content}
        onChange={handleChangeText}
      />
      <button
        type="submit"
        className="py-2 px-3 ml-2 text-sm font-medium text-white bg-indigo-600  hover:bg-indigo-700 rounded "
      >
        {editedNotice.id ? "Update" : "Create"}
      </button>
    </form>
  );
};

export default NoticeForm;
