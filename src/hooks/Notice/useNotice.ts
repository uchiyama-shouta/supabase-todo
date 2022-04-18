import { useAtom } from "jotai";
import { noticeAtom } from "atoms/noticeAtom";
import { EditedNotice } from "types/notice";

export const useNotice = () => {
  const [editedNotice, setEditedNotice] = useAtom(noticeAtom);
  const updateNotice = ({ id, content }: EditedNotice) => {
    setEditedNotice({ id, content });
  };
  const resetNotice = () => {
    setEditedNotice(() => {
      return { id: "", content: "" };
    });
  };
  return {
    editedNotice,
    updateNotice,
    resetNotice,
  };
};
