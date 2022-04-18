import { FC, useEffect, useState } from "react";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import { Notice } from "types/notice";
import { useMutateNotice } from "hooks/Notice/useMutateNotice";
import { useNotice } from "hooks/Notice/useNotice";
import { supabase } from "lib/supabase";

const NoticeItem: FC<Omit<Notice, "created_at">> = ({
  id,
  content,
  user_id,
}) => {
  const [userId, setUserId] = useState<string | undefined>("");
  const { updateNotice } = useNotice();
  const { deleteNoticeMutation } = useMutateNotice();

  useEffect(() => {
    setUserId(supabase.auth.user()?.id);
  }, []);

  const handleUpdate = () => {
    updateNotice({
      id,
      content,
    });
  };
  const handleDelete = () => {
    deleteNoticeMutation.mutate(id);
  };

  return (
    <li className="my-3 text-lg font-extrabold">
      <span>{content}</span>
      {userId === user_id && (
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
      )}
    </li>
  );
};

export default NoticeItem;
