import { ChangeEventHandler, FormEvent, FC } from "react";
import { supabase } from "lib/supabase";
import { useMutateTask } from "hooks/Task/useMutateTask";
import { useTask } from "hooks/Task/useTask";

const TaskForm: FC = () => {
  const { editedTask, updateTask } = useTask();
  const { createTaskMutation, updateTaskMutation } = useMutateTask();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editedTask.id === "")
      createTaskMutation.mutate({
        title: editedTask.title,
        user_id: supabase.auth.user()?.id,
      });
    else {
      updateTaskMutation.mutate({
        id: editedTask.id,
        title: editedTask.title,
      });
    }
  };

  const handleChangeText: ChangeEventHandler<HTMLInputElement> = (e) =>
    updateTask({ ...editedTask, title: e.target.value });

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="py-2 px-3 my-2 text-sm placeholder:text-gray-500 rounded border  border-gray-300 focus:border-indigo-500 focus:outline-none"
        placeholder="New task ?"
        value={editedTask.title}
        onChange={handleChangeText}
      />
      <button
        type="submit"
        className="py-2 px-3 ml-2 text-sm font-medium text-white bg-indigo-600  hover:bg-indigo-700 rounded "
      >
        {editedTask.id ? "Update" : "Create"}
      </button>
    </form>
  );
};

export default TaskForm;