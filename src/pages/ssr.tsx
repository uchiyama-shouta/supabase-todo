import type { GetServerSideProps, NextPage } from "next";
import type { Notice } from "types/notice";
import type { Task } from "types/task";

import { supabase } from "lib/supabase";
import Layout from "components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  tasks: Task[];
  notices: Notice[];
};

const Ssr: NextPage<Props> = ({ tasks, notices }) => {
  const router = useRouter();
  const handleClick = () => router.push("/ssg");
  return (
    <Layout title="SSR">
      <p className="mb-3 text-blue-500">SSR</p>
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
      <Link href="/ssg" prefetch={false}>
        <a className="my-3 text-sm">Link to SSG</a>
      </Link>
      <Link href="/isr" prefetch={false}>
        <a className="my-3 text-sm">Link to ISR</a>
      </Link>

      <button className="my-3 text-sm" onClick={handleClick}>
        Route to ISR
      </button>
    </Layout>
  );
};

export default Ssr;

export const getServerSideProps: GetServerSideProps = async () => {
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
  };
};
