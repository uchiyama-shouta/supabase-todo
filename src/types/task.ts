export type Task = {
  id: string;
  created_at: string;
  title: string;
  user_id: string | undefined;
};

export type EditedTask = Omit<Task, "created_at" | "user_id">;
