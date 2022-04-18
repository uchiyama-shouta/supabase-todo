import { useQueryClient, useMutation } from "react-query";
import { supabase } from "lib/supabase";
import { Task, EditedTask } from "types/task";
import { useTask } from "hooks/Task/useTask";

export const useMutateTask = () => {
  const queryClient = useQueryClient();
  const { resetTask } = useTask();

  const createTaskMutation = useMutation(
    async (task: Omit<Task, "id" | "created_at">) => {
      const { data, error } = await supabase.from("todos").insert(task);
      if (error) throw new Error(error.message);
      return data;
    },
    {
      onSuccess: (res) => {
        const previousTodos = queryClient.getQueryData<Task[]>(["todos"]);
        if (previousTodos) {
          queryClient.setQueryData(["todos"], [...previousTodos, res[0]]);
        }
        resetTask();
      },
      onError: (err: any) => {
        alert(err.message);
        resetTask();
      },
    },
  );
  const updateTaskMutation = useMutation(
    async (task: EditedTask) => {
      const { data, error } = await supabase
        .from("todos")
        .update({ title: task.title })
        .eq("id", task.id);
      if (error) throw new Error(error.message);
      return data;
    },
    {
      onSuccess: (res, variables) => {
        const previousTodos = queryClient.getQueryData<Task[]>(["todos"]);
        if (previousTodos) {
          queryClient.setQueryData(
            ["todos"],
            previousTodos.map((task) =>
              task.id === variables.id ? res[0] : task,
            ),
          );
        }
        resetTask();
      },
      onError: (err: any) => {
        alert(err.message);
        resetTask();
      },
    },
  );
  const deleteTaskMutation = useMutation(
    async (id: string) => {
      const { data, error } = await supabase
        .from("todos")
        .delete()
        .eq("id", id);
      if (error) throw new Error(error.message);
      return data;
    },
    {
      onSuccess: (_, variables) => {
        const previousTodos = queryClient.getQueryData<Task[]>(["todos"]);
        if (previousTodos) {
          queryClient.setQueryData(
            ["todos"],
            previousTodos.filter((task) => task.id !== variables),
          );
        }
        resetTask();
      },
      onError: (err: any) => {
        alert(err.message);
        resetTask();
      },
    },
  );
  return { deleteTaskMutation, createTaskMutation, updateTaskMutation };
};
