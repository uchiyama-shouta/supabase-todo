import type { NextPage } from "next";
import {
  LogoutIcon,
  StatusOnlineIcon,
  DocumentTextIcon,
} from "@heroicons/react/solid";
import { useQueryClient } from "react-query";
import { supabase } from "lib/supabase";

import Layout from "components/Layout";
import TaskList from "components/Task/TaskList";
import TaskForm from "components/Task/TaskForm";
import NoticeForm from "components/Notice/NoticeForm";
import NoticeList from "components/Notice/NoticeList";

const Dashboard: NextPage = () => {
  const queryClient = useQueryClient();

  const handleSignOut = () => {
    supabase.auth.signOut();
    queryClient.removeQueries(["todos"]);
    queryClient.removeQueries(["notices"]);
  };
  return (
    <Layout title="dashboard">
      <LogoutIcon
        className="mb-6 w-6 h-6 text-blue-500 cursor-pointer"
        onClick={handleSignOut}
      />
      <div>
        <div className="flex justify-center my-3">
          <DocumentTextIcon className=" w-8 h-8 text-blue-500" />
        </div>
        <TaskForm />
        <TaskList />
      </div>
      <div>
        <div className="flex justify-center my-3 ">
          <StatusOnlineIcon className=" w-8 h-8 text-blue-500" />
        </div>
        <NoticeForm />
        <NoticeList />
      </div>
    </Layout>
  );
};

export default Dashboard;
