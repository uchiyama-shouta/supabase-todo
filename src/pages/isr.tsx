import type { GetStaticProps, NextPage } from "next";
import type { Notice } from "types/notice";
import type { Task } from "types/task";

import { supabase } from "lib/supabase";
import Layout from "components/Layout";

type Props = {
  tasks: Task[];
  notices: Notice[];
};

const Ssg: NextPage<Props> = ({ tasks, notices }) => {
  return (
    <Layout title="ISR">
      <p className="mb-3 text-indigo-500">ISR</p>
      <ul className="mb-3">
        {tasks.map((task) => (
          <li key={task.id}>
            <p className="text-lg font-extralight">{task.title}</p>
          </li>
        ))}
      </ul>
      <ul className="mb-3">
        {notices.map((notice) => (
          <li key={notice.id}>
            <p className="text-lg font-extralight">{notice.content}</p>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Ssg;

export const getStaticProps: GetStaticProps = async () => {
  const { data: tasks } = await supabase
    .from("todos")
    .select("id,title")
    .order("created_at", {
      ascending: true,
    });
  const { data: notices } = await supabase
    .from("notices")
    .select("id,content")
    .order("created_at", {
      ascending: true,
    });
  return {
    props: {
      tasks,
      notices,
    },
    revalidate: 5,
  };
};
