import { supabase } from "lib/supabase";
import { useState, useCallback } from "react";
import { ChangeEventHandler } from "react";
import { useMutation } from "react-query";

export const useMutateAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setEmail(e.target.value);
    },
    [setEmail],
  );

  const handleChangePassword: ChangeEventHandler<HTMLInputElement> =
    useCallback(
      (e) => {
        setPassword(e.target.value);
      },
      [setPassword],
    );

  const reset = () => {
    setEmail("");
    setPassword("");
  };

  const loginMutation = useMutation(
    async () => {
      const { error } = await supabase.auth.signIn({ email, password });
      if (error) throw new Error(error.message);
    },
    {
      onError: (err: any) => {
        alert(err.message);
        reset();
      },
    },
  );
  const registerMutation = useMutation(
    async () => {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw new Error(error.message);
    },
    {
      onError: (err: any) => {
        alert(err.message);
        reset();
      },
    },
  );

  return {
    email,
    // setEmail,
    handleChangeEmail,
    password,
    // setPassword,
    handleChangePassword,
    loginMutation,
    registerMutation,
  };
};
