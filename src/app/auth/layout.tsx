import { authCheck } from "@/lib/routeGuard";
import { redirect } from "next/navigation";
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = async ({ children }: AuthLayoutProps) => {
  const user = await authCheck();

  if (user) {
    redirect("/");
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-svh">
      <main>{children}</main>
    </div>
  );
};

export default AuthLayout;
