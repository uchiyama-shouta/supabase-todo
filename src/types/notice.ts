export type Notice = {
  id: string;
  created_at: string;
  content: string;
  user_id: string | undefined;
};

export type EditedNotice = Omit<Notice, "created_at" | "user_id">;