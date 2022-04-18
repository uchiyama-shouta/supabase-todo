import type { NextPage } from "next";
import Layout from "components/Layout";
import { useState } from "react";
import type { FormEvent } from "react";
import { useMutateAuth } from "hooks/Auth/useMutateAuth";
import { BadgeCheckIcon, ShieldCheckIcon } from "@heroicons/react/solid";

const Auth: NextPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const {
    email,
    handleChangeEmail,
    password,
    handleChangePassword,
    loginMutation,
    registerMutation,
  } = useMutateAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLogin) {
      loginMutation.mutate();
    } else {
      registerMutation.mutate();
    }
  };
  const handleToggleLogin = () => setIsLogin((isLogin) => !isLogin);

  return (
    <Layout title="Auth">
      <ShieldCheckIcon className="mb-6 w-12 h-12 text-blue-500" />
      <form onSubmit={handleSubmit}>
        <div>
          <input
            required
            className="py-2 px-3 my-2 text-sm placeholder:text-gray-500 rounded border border-gray-300 focus:border-indigo-500 focus:outline-none"
            placeholder="Email"
            value={email}
            onChange={handleChangeEmail}
          />
        </div>
        <div>
          <input
            type="password"
            required
            className="py-2 px-3 my-2 text-sm placeholder:text-gray-500 rounded border  border-gray-300 focus:border-indigo-500 focus:outline-none"
            placeholder="Password"
            value={password}
            onChange={handleChangePassword}
          />
        </div>
        <div className="flex justify-center items-center my-6 text-sm">
          <span
            onClick={handleToggleLogin}
            className="font-medium hover:text-indigo-500 cursor-pointer"
          >
            change mode ?
          </span>
        </div>
        <button
          type="submit"
          className="group flex relative justify-center py-2 px-4 w-full text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
        >
          <span className="flex absolute inset-y-0 left-0 items-center pl-3">
            <BadgeCheckIcon className="w-5 h-5" />
          </span>
          {isLogin ? "Login" : "Register"}
        </button>
      </form>
    </Layout>
  );
};

export default Auth;
