import type { FC, ReactNode } from "react";
import Head from "next/head";
import { BadgeCheckIcon } from "@heroicons/react/solid";

type Props = {
  title: string;
  children: ReactNode;
};

const Layout: FC<Props> = ({ children, title = "Todo App" }) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen font-mono text-gray-800">
      <Head>
        <title>{title}</title>
      </Head>
      <header></header>
      <main className="flex flex-col flex-1 justify-center items-center w-screen">
        {children}
      </main>
      <footer className="flex justify-center items-center w-full h-12 border-t">
        <BadgeCheckIcon className="w-6 h-6 text-blue-500" />
      </footer>
    </div>
  );
};

export default Layout;
