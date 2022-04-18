import { FC } from "react";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import { Task } from "types/task";
import { useMutateTask } from "hooks/Task/useMutateTask";
import { useTask } from "hooks/Task/useTask";

const TaskItem: FC<Omit<Task, "created_at" | "user_id">> = ({ id, title }) => {
  const { updateTask } = useTask();
  const { deleteTaskMutation } = useMutateTask();

  const handleUpdate = () => {
    updateTask({
      id: id,
      title: title,
    });
  };
  const handleDelete = () => {
    deleteTaskMutation.mutate(id);
  };

  return (
    <li className="my-3 text-lg font-extrabold">
      <span>{title}</span>
      <div className="flex float-right ml-20">
        <PencilAltIcon
          className="mx-1 w-5 h-5 text-blue-500 cursor-pointer"
          onClick={handleUpdate}
        />
        <TrashIcon
          className="w-5 h-5 text-blue-500 cursor-pointer"
          onClick={handleDelete}
        />
      </div>
    </li>
  );
};

export default TaskItem;
