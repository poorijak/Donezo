"use client";

import { Form } from "@/components/ui/form";
import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { signinSchema, signupSchema } from "../schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import InputForm from "@/components/shared/input-form";
import { AuthValue } from "@/type/auth";
import { CardContent, CardFooter } from "@/components/ui/card";
import SubmitBtn from "@/components/shared/submit-btn";
import AuthFooter from "./authFooter";

interface AuthFormProps {
  type: "signin" | "signup";
}

const AuthForm = ({ type }: AuthFormProps) => {
  const PLACEHOLDER = {
    email: "you@example.com",
    password: "Password",
    signup: {
      name: "Full name (e.g. John Doe)",
      password: "At least 8 characters • A-z, 0-9, symbol",
    },
  };

  const schema = useMemo(
    () => (type === "signin" ? signinSchema : signupSchema),
    [type]
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
        : { email: "", name: "", password: "" }
    );
  }, [type]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4">
        <CardContent>
          <div className="flex flex-col gap-5">
            <InputForm
              control={form.control}
              name="email"
              label="Email"
              placeholder={PLACEHOLDER.email}
              required
            />
            {type === "signup" && (
              <InputForm
                control={form.control}
                name="name"
                label="Name"
                placeholder={PLACEHOLDER.signup.name}
                required
              />
            )}
            <InputForm
              control={form.control}
              name="password"
              label="Password"
              placeholder={
                type === "signin"
                  ? PLACEHOLDER.password
                  : PLACEHOLDER.signup.password
              }
              required
            />
            <SubmitBtn name="Sign in" />
          </div>
        </CardContent>
        <CardFooter className="w-full">
          <AuthFooter />
        </CardFooter>
      </form>
    </Form>
  );
};

export default AuthForm;
