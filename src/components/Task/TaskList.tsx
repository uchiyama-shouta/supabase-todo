import { FC } from "react";
import TaskItem from "components/Task/TaskItem";
import { useQueryTasks } from "hooks/Task/useQueryTasks";

const TaskList: FC = () => {
  const { data: tasks } = useQueryTasks();
  return (
    <ul className="my-2">
      {tasks?.map((task) => (
        <TaskItem key={task.id} id={task.id} title={task.title} />
      ))}
    </ul>
  );
};

export default TaskList;
