"use client";

import { Form } from "@/components/ui/form";
import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { signinSchema, signupSchema } from "../schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import InputForm from "@/components/shared/input-form";
import { AuthValue, signinValue, signupValue } from "@/types/auth";
import { CardContent, CardFooter } from "@/components/ui/card";
import SubmitBtn from "@/components/shared/submit-btn";
import AuthFooter from "./auth-footer";
import {
  useSigninWithEmail,
  useSignupWithEmail,
} from "@/feature/auth/hooks/auth/useAuthQuery";

interface AuthFormProps {
  type: "signin" | "signup";
}
const PLACEHOLDER = {
  email: "you@example.com",
  password: "Password",
  signup: {
    name: "Full name (e.g. John Doe)",
    password: "At least 8 characters • A-z, 0-9, symbol",
  },
};

const AuthForm = ({ type }: AuthFormProps) => {
  const signin = useSigninWithEmail();
  const signup = useSignupWithEmail();

  const schema = useMemo(
    () => (type === "signin" ? signinSchema : signupSchema),
    [type],
  );

  const form = useForm<AuthValue>({
    resolver: zodResolver(schema),
    defaultValues:
      type === "signin"
        ? { email: "", password: "" }
        : { email: "", name: "", password: "" },
    mode: "onBlur",
  });

  useEffect(() => {
    form.reset(
      type === "signin"
        ? { email: "", password: "" }
        : { email: "", name: "", password: "" },
    );
  }, [type]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = (value: AuthValue) => {
    console.log(value);
    if (type === "signin") {
      signin.mutate(value as signinValue);
    } else if (type === "signup") {
      signup.mutate(value as signupValue);
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <CardContent>
          <div className="flex flex-col gap-5">
            <InputForm
              inputType="input"
              control={form.control}
              name="email"
              label="Email"
              placeholder={PLACEHOLDER.email}
              required
            />
            {type === "signup" && (
              <InputForm
                inputType="input"
                control={form.control}
                name="name"
                label="Name"
                placeholder={PLACEHOLDER.signup.name}
                required
              />
            )}
            <InputForm
              inputType="input"
              control={form.control}
              type="password"
              name="password"
              label="Password"
              placeholder={
                type === "signin"
                  ? PLACEHOLDER.password
                  : PLACEHOLDER.signup.password
              }
              required
            />
            <SubmitBtn
              title={type === "signin" ? "Sign in" : "sign up"}
              pending={signin.isPending || signup.isPending}
            />
          </div>
        </CardContent>
        <CardFooter className="w-full">
          <AuthFooter type={type} />
        </CardFooter>
      </form>
    </Form>
  );
};

export default AuthForm;
