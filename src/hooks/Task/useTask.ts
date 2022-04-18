import { useAtom } from "jotai";
import { taskAtom } from "atoms/taskAtom";
import { EditedTask } from "types/task";

export const useTask = () => {
  const [editedTask, setEditedTask] = useAtom(taskAtom);
  const updateTask = ({ id, title }: EditedTask) => {
    setEditedTask({ id, title });
  };
  const resetTask = () => {
    setEditedTask(() => {
      return { id: "", title: "" };
    });
  };
  return {
    editedTask,
    updateTask,
    resetTask,
  };
};
