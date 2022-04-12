import { useEffect, useState } from "react";
import type { NextPage } from "next";
import type { Notice } from "types/notice";
import type { Task } from "types/task";

import { supabase } from "lib/supabase";
import Layout from "components/Layout";

const Csr: NextPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    const getTasks = async () => {
      const { data: tasks } = await supabase
        .from<Task>("todos")
        .select("id,title")
        .order("created_at", {
          ascending: true,
        });
      tasks && setTasks(tasks);
    };
    const getNotices = async () => {
      const { data: notices } = await supabase
        .from("notices")
        .select("id,content")
        .order("created_at", {
          ascending: true,
        });
      notices && setNotices(notices);
    };
    getTasks();
    getNotices();
  }, []);

  return (
    <Layout title="CSR">
      <p className="mb-3 text-blue-500">SSG + CSF</p>
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

export default Csr;
