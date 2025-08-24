import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import React from "react";

interface AuthHeaderProp {
  type: "signup" | "signin";
  children: React.ReactNode;
}

const AuthHeader = ({ type, children }: AuthHeaderProp) => {
  let title = "";
  let desc = "";

  switch (type) {
    case "signup":
      title = "Sign up to Donezo ⏱️";
      desc = "Create your account to organize tasks and goals easily";
      break;
    case "signin":
      title = "Welcome back 👋";
      desc = "Sign in to manage your tasks and stay on track";
      break;
  }

  return (
    <div className="px-2 md:px-0 ">
      <Card className="min-w-xs sm:min-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {title}
          </CardTitle>
          <CardDescription className="text-center">{desc}</CardDescription>
        </CardHeader>
        {children}
      </Card>
    </div>
  );
};

export default AuthHeader;
