import { FC } from "react";
import Spinner from "components/Spinner";
import { useQueryNotice } from "hooks/Notice/useQueryNotice";
import NoticeItem from "components/Notice/NoticeItem";

const NoticeList: FC = () => {
  const { data: notices, status } = useQueryNotice();
  if (status === "loading") return <Spinner />;
  if (status === "error") return <p>Error</p>;
  return (
    <ul className="my-2">
      {notices?.map((notice) => (
        <NoticeItem
          key={notice.id}
          id={notice.id}
          content={notice.content}
          user_id={notice.user_id}
        />
      ))}
    </ul>
  );
};

export default NoticeList;
